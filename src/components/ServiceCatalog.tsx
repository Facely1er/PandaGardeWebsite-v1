import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Info,
  ExternalLink,
  Users,
  MessageCircle,
  Gamepad2,
  Film,
  GraduationCap,
  Palette,
  ChevronRight,
  Clock,
  Bell
} from 'lucide-react';
import { 
  childServiceCatalog, 
  getServicesByCategory, 
  type ServiceCategory,
  type ChildService
} from '../data/childServiceCatalog';
import { useFamily, type ServiceUsage } from '../contexts/FamilyContext';
import { calculatePrivacyExposureIndex, getExposureLevel } from '../lib/privacyExposureIndex';
import { getServiceLogoUrlWithBrandColor, hasServiceLogo } from '../utils/serviceLogos';
import { useTheme } from '../contexts/ThemeContext';
import ServiceRelationshipMap from './ServiceRelationshipMap';

interface ServiceCatalogProps {
  memberId?: string; // If provided, shows services for specific member
  onServiceSelect?: (serviceId: string) => void;
  showRequestButton?: boolean; // Show request button for children
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ 
  memberId, 
  onServiceSelect,
  showRequestButton = false 
}) => {
  const { familyMembers, requestService, isChild, addServiceToFamily, removeServiceFromFamily, getFamilyServices } = useFamily();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedExposureLevel, setSelectedExposureLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'exposure' | 'age'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedService, setSelectedService] = useState<ChildService | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [familyServices, setFamilyServices] = useState<string[]>(getFamilyServices());

  // Get member's current services
  const member = memberId ? familyMembers.find(m => m.id === memberId) : null;
  const memberServices = member?.services || [];

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let services = childServiceCatalog;

    // Filter by category
    if (selectedCategory !== 'all') {
      services = getServicesByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      services = services.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );
    }

    // Filter by risk level
    if (selectedRisk !== 'all') {
      services = services.filter(s => s.riskLevel === selectedRisk);
    }

    // Filter by exposure index level
    if (selectedExposureLevel !== 'all') {
      services = services.filter(s => {
        const exposureIndex = calculatePrivacyExposureIndex(s.id);
        if (exposureIndex === null) {return false;}
        
        switch (selectedExposureLevel) {
          case 'very-high':
            return exposureIndex >= 70;
          case 'high':
            return exposureIndex >= 50 && exposureIndex < 70;
          case 'medium':
            return exposureIndex >= 30 && exposureIndex < 50;
          case 'low':
            return exposureIndex < 30;
          default:
            return true;
        }
      });
    }

    // Sort services
    services = [...services].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'exposure': {
          const exposureA = calculatePrivacyExposureIndex(a.id) || 0;
          const exposureB = calculatePrivacyExposureIndex(b.id) || 0;
          comparison = exposureA - exposureB;
          break;
        }
        case 'age':
          comparison = a.minAge - b.minAge;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return services;
  }, [searchQuery, selectedCategory, selectedRisk, selectedExposureLevel, sortBy, sortOrder]);

  // Get category icon
  const getCategoryIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'social-media':
        return Users;
      case 'messaging':
        return MessageCircle;
      case 'gaming':
        return Gamepad2;
      case 'streaming':
        return Film;
      case 'education':
        return GraduationCap;
      case 'creative':
        return Palette;
      default:
        return Shield;
    }
  };

  // Get risk badge
  const getRiskBadge = (riskLevel: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800 border-green-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      'very-high': 'bg-red-100 text-red-800 border-red-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[riskLevel as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {riskLevel === 'very-high' ? 'Very High' : riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </span>
    );
  };

  // Check if service is already added
  const isServiceAdded = (serviceId: string): ServiceUsage | null => {
    return memberServices.find(s => s.serviceId === serviceId) || null;
  };

  // Handle service request
  const handleRequestService = async (serviceId: string) => {
    if (!memberId) {return;}
    
    setIsRequesting(true);
    try {
      const result = await requestService(memberId, serviceId);
      if (result.success) {
        alert('Service request sent to parent for approval!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error requesting service:', error);
      alert('Failed to request service');
    } finally {
      setIsRequesting(false);
    }
  };

  // Handle adding/removing service to/from family
  const handleToggleFamilyService = async (serviceId: string) => {
    setIsRequesting(true);
    try {
      if (familyServices.includes(serviceId)) {
        const result = await removeServiceFromFamily(serviceId);
        if (result.success) {
          setFamilyServices(getFamilyServices());
        } else {
          alert(`Error: ${result.error}`);
        }
      } else {
        const result = await addServiceToFamily(serviceId);
        if (result.success) {
          setFamilyServices(getFamilyServices());
        } else {
          alert(`Error: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Error toggling family service:', error);
      alert('Failed to update service');
    } finally {
      setIsRequesting(false);
    }
  };

  // Check if service is added to family
  const isServiceInFamily = (serviceId: string): boolean => {
    return familyServices.includes(serviceId);
  };

  // Get service status
  const getServiceStatus = (serviceId: string) => {
    const serviceUsage = isServiceAdded(serviceId);
    if (!serviceUsage) {return null;}
    
    return {
      status: serviceUsage.status,
      approvedAt: serviceUsage.approvedAt,
      notes: serviceUsage.notes
    };
  };

  return (
    <div className="service-catalog">
      {/* Only show header if not used in ServiceCatalogPage */}
      {!onServiceSelect && (
        <div className="catalog-header">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="catalog-title">Service Catalog</h2>
              <p className="catalog-subtitle">Browse age-appropriate apps and platforms</p>
            </div>
            <Link
              to="/safety-alerts"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Bell className="h-4 w-4" />
              <span>Safety Alerts</span>
            </Link>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="catalog-filters">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <Filter size={16} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'all')}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="social-media">Social Media</option>
            <option value="messaging">Messaging</option>
            <option value="gaming">Gaming</option>
            <option value="streaming">Streaming</option>
            <option value="education">Education</option>
            <option value="creative">Creative</option>
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="very-high">Very High Risk</option>
          </select>

          <select
            value={selectedExposureLevel}
            onChange={(e) => setSelectedExposureLevel(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Exposure Levels</option>
            <option value="very-high">Very High (70-100)</option>
            <option value="high">High (50-69)</option>
            <option value="medium">Medium (30-49)</option>
            <option value="low">Low (0-29)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'exposure' | 'age')}
            className="filter-select"
          >
            <option value="name">Sort by Name</option>
            <option value="exposure">Sort by Exposure Index</option>
            <option value="age">Sort by Age</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-sm font-medium transition-colors"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Service Grid */}
      <div className="services-grid">
        {filteredServices.map((service) => {
          const CategoryIcon = getCategoryIcon(service.category);
          const serviceStatus = getServiceStatus(service.id);
          const isAdded = !!serviceStatus;

          const inFamily = isServiceInFamily(service.id);
          
          return (
            <div
              key={service.id}
              className={`service-card ${isAdded ? 'service-added' : ''} ${inFamily ? 'in-family' : ''}`}
              onClick={() => setSelectedService(service)}
              style={inFamily ? { borderColor: '#4CAF50', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' } : {}}
            >
              <div className="service-card-header">
                {inFamily && (
                  <div 
                    className="in-family-badge"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#4CAF50',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle size={12} />
                    Added
                  </div>
                )}
                <div className="service-icon-wrapper" style={{ position: 'relative' }}>
                  {hasServiceLogo(service.id) ? (
                    <img
                      src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                      alt={`${service.name} logo`}
                      className="service-logo"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        padding: '6px'
                      }}
                      onError={(e) => {
                        // Fallback to category icon if logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.service-icon-fallback') as HTMLElement;
                        if (fallback) {fallback.style.display = 'block';}
                      }}
                    />
                  ) : null}
                  <CategoryIcon 
                    size={24} 
                    className="service-icon service-icon-fallback"
                    style={{ display: hasServiceLogo(service.id) ? 'none' : 'block' }}
                  />
                </div>
                <div className="service-header-content">
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>

              <div className="service-card-body">
                <div className="service-meta">
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>Age {service.minAge}+</span>
                  </div>
                  {getRiskBadge(service.riskLevel)}
                </div>

                {/* Privacy Exposure Index */}
                {(() => {
                  const exposureIndex = calculatePrivacyExposureIndex(service.id);
                  const exposureLevel = getExposureLevel(exposureIndex);
                  if (exposureIndex !== null) {
                    return (
                      <div className="mt-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Privacy Exposure
                          </span>
                          <span className={`text-xs font-semibold ${exposureLevel.textColor}`}>
                            {exposureIndex}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${exposureLevel.barColor}`}
                            style={{ width: `${exposureIndex}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {exposureLevel.level} - {exposureLevel.description}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}

                {serviceStatus && (
                  <div className="service-status">
                    {serviceStatus.status === 'approved' && (
                      <span className="status-badge approved">
                        <CheckCircle size={14} />
                        Approved
                      </span>
                    )}
                    {serviceStatus.status === 'requested' && (
                      <span className="status-badge pending">
                        <Clock size={14} />
                        Pending Approval
                      </span>
                    )}
                    {serviceStatus.status === 'denied' && (
                      <span className="status-badge denied">
                        <X size={14} />
                        Denied
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="service-card-footer">
                {showRequestButton && !isAdded && isChild && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequestService(service.id);
                    }}
                    disabled={isRequesting}
                    className="request-button"
                  >
                    Request Service
                  </button>
                )}
                {onServiceSelect && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onServiceSelect(service.id);
                    }}
                    className="select-button"
                  >
                    View Details
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="empty-state">
          <Shield size={48} className="empty-icon" />
          <p>No services found matching your filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedRisk('all');
              setSelectedExposureLevel('all');
            }}
            className="clear-filters-button"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section" style={{ display: 'flex', alignItems: 'center' }}>
                {hasServiceLogo(selectedService.id) ? (
                  <img
                    src={getServiceLogoUrlWithBrandColor(selectedService.id) || undefined}
                    alt={`${selectedService.name} logo`}
                    className="modal-logo"
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      borderRadius: '12px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      padding: '8px',
                      marginRight: '12px'
                    }}
                    onError={(e) => {
                      // Fallback to category icon if logo fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.modal-icon-fallback') as HTMLElement;
                      if (fallback) {fallback.style.display = 'block';}
                    }}
                  />
                ) : null}
                {(() => {
                  const CategoryIcon = getCategoryIcon(selectedService.category);
                  return (
                    <CategoryIcon 
                      size={32} 
                      className="modal-icon modal-icon-fallback"
                      style={{ display: hasServiceLogo(selectedService.id) ? 'none' : 'block', marginRight: '12px' }}
                    />
                  );
                })()}
                <div>
                  <h2 className="modal-title">{selectedService.name}</h2>
                  <p className="modal-subtitle">{selectedService.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="modal-close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* What Parents Need to Know Section */}
              <div className="modal-section" style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '2px solid #3b82f6' }}>
                <h3 className="section-title" style={{ color: '#1e40af', marginBottom: '1rem' }}>
                  <Info size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  What Parents Need to Know
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Shield size={16} style={{ color: '#3b82f6' }} />
                    <strong style={{ color: '#1e40af' }}>Privacy Safety Level:</strong>
                    <span style={{ color: '#1e40af' }}>{selectedService.riskLevel === 'very-high' ? 'Very High' : selectedService.riskLevel.charAt(0).toUpperCase() + selectedService.riskLevel.slice(1)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Users size={16} style={{ color: '#3b82f6' }} />
                    <strong style={{ color: '#1e40af' }}>Recommended Age:</strong>
                    <span style={{ color: '#1e40af' }}>Age {selectedService.minAge} and older</span>
                  </div>
                  {/* Privacy Exposure Index */}
                  {(() => {
                    const exposureIndex = calculatePrivacyExposureIndex(selectedService.id);
                    const exposureLevel = getExposureLevel(exposureIndex);
                    if (exposureIndex !== null) {
                      return (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <strong style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <AlertTriangle size={16} />
                              Privacy Exposure Index:
                            </strong>
                            <span style={{ fontWeight: 'bold', color: exposureLevel.textColor.replace('text-', '#').replace('-700', '').replace('-300', '') }}>
                              {exposureIndex}/100
                            </span>
                          </div>
                          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px', marginBottom: '0.5rem' }}>
                            <div
                              style={{
                                width: `${exposureIndex}%`,
                                height: '100%',
                                backgroundColor: exposureLevel.barColor.replace('bg-', '#').replace('-500', ''),
                                borderRadius: '4px',
                                transition: 'width 0.3s ease'
                              }}
                            />
                          </div>
                          <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>
                            <strong>{exposureLevel.level}</strong> - {exposureLevel.description}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
                {selectedService.privacyConcerns && selectedService.privacyConcerns.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <strong style={{ color: '#1e40af', display: 'block', marginBottom: '0.5rem' }}>Privacy Concerns:</strong>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#1e40af' }}>
                      {selectedService.privacyConcerns.slice(0, 3).map((concern, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>{concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="modal-section">
                <h3 className="section-title">Service Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Minimum Age:</span>
                    <span className="info-value">Age {selectedService.minAge}+</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Privacy Safety Level:</span>
                    {getRiskBadge(selectedService.riskLevel)}
                  </div>
                  {(() => {
                    const exposureIndex = calculatePrivacyExposureIndex(selectedService.id);
                    if (exposureIndex !== null) {
                      const exposureLevel = getExposureLevel(exposureIndex);
                      return (
                        <div className="info-item">
                          <span className="info-label">Privacy Exposure Index:</span>
                          <span className={`info-value ${exposureLevel.textColor} font-semibold`}>
                            {exposureIndex}/100 ({exposureLevel.level})
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  <div className="info-item">
                    <span className="info-label">Category:</span>
                    <span className="info-value capitalize">{selectedService.category.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>

              {/* Service Relationships */}
              <ServiceRelationshipMap 
                serviceId={selectedService.id}
                onServiceClick={(serviceId) => {
                  const service = childServiceCatalog.find(s => s.id === serviceId);
                  if (service) {
                    setSelectedService(service);
                  }
                }}
              />

              {/* Quick Decision Guide */}
              <div className="modal-section" style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', border: '2px solid #f59e0b' }}>
                <h3 className="section-title" style={{ color: '#92400e', marginBottom: '1rem' }}>
                  <AlertTriangle size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Quick Decision Guide
                </h3>
                <div style={{ color: '#92400e' }}>
                  {selectedService.riskLevel === 'low' && (
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                      <strong>This app is generally safe.</strong> It has low privacy risks. You can approve it, but still review privacy settings with your child.
                    </p>
                  )}
                  {selectedService.riskLevel === 'medium' && (
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                      <strong>This app has some privacy concerns.</strong> Review the privacy settings together with your child before approving. Make sure they understand what information is shared.
                    </p>
                  )}
                  {(selectedService.riskLevel === 'high' || selectedService.riskLevel === 'very-high') && (
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                      <strong>This app has significant privacy risks.</strong> Consider if your child really needs this app. If you approve it, set strict privacy settings and monitor their usage closely.
                    </p>
                  )}
                </div>
              </div>

              {selectedService.parentTips && selectedService.parentTips.length > 0 && (
                <div className="modal-section" style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', border: '2px solid #10b981' }}>
                  <h3 className="section-title" style={{ color: '#065f46', marginBottom: '1rem' }}>
                    <CheckCircle size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    How to Set Up Privacy Settings
                  </h3>
                  <ul className="tips-list" style={{ color: '#065f46', margin: 0, paddingLeft: '1.25rem' }}>
                    {selectedService.parentTips.map((tip, index) => (
                      <li key={index} style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.website && (
                <div className="modal-section">
                  <a
                    href={selectedService.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    <ExternalLink size={16} />
                    Visit Official Website
                  </a>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {/* Add/Remove Service Button - Always show */}
              <button
                onClick={() => handleToggleFamilyService(selectedService.id)}
                disabled={isRequesting}
                className={`modal-add-button ${isServiceInFamily(selectedService.id) ? 'added' : ''}`}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: isRequesting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: isServiceInFamily(selectedService.id) ? '#dc2626' : '#4CAF50',
                  color: 'white',
                  opacity: isRequesting ? 0.6 : 1
                }}
              >
                {isRequesting ? (
                  'Processing...'
                ) : isServiceInFamily(selectedService.id) ? (
                  <>
                    <X size={18} />
                    Remove from My Services
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Add to My Services
                  </>
                )}
              </button>
              
              {/* Request Button for children */}
              {showRequestButton && !isServiceAdded(selectedService.id) && isChild && (
                <button
                  onClick={() => {
                    if (memberId) {
                      handleRequestService(selectedService.id);
                      setSelectedService(null);
                    }
                  }}
                  disabled={isRequesting}
                  className="modal-request-button"
                  style={{ marginTop: '10px' }}
                >
                  Request Parental Approval
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .service-catalog {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .catalog-header {
          margin-bottom: 30px;
        }

        .catalog-title {
          font-size: 28px;
          font-weight: bold;
          color: #2C3E50;
          margin: 0 0 8px 0;
        }

        .catalog-subtitle {
          color: #666;
          font-size: 16px;
          margin: 0;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #2C3E50;
          margin: 0 0 12px 0;
        }

        .catalog-filters {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #999;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .filter-group {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .filter-select {
          padding: 10px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .filter-select:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .service-card:hover {
          border-color: #4CAF50;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .service-card.service-added {
          border-color: #4CAF50;
          background: #f0f9f0;
        }

        .service-card-header {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .service-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-icon {
          color: #4CAF50;
        }

        .service-header-content {
          flex: 1;
        }

        .service-name {
          font-size: 18px;
          font-weight: bold;
          color: #2C3E50;
          margin: 0 0 5px 0;
        }

        .service-description {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .service-card-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .service-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #666;
        }

        .service-status {
          margin-top: 5px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.approved {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        .status-badge.denied {
          background: #f8d7da;
          color: #721c24;
        }

        .service-card-footer {
          display: flex;
          gap: 10px;
        }

        .request-button,
        .select-button {
          flex: 1;
          padding: 10px 15px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .request-button {
          background: #4CAF50;
          color: white;
        }

        .request-button:hover:not(:disabled) {
          background: #45a049;
        }

        .request-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .select-button {
          background: #f0f0f0;
          color: #2C3E50;
        }

        .select-button:hover {
          background: #e0e0e0;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .empty-icon {
          margin: 0 auto 20px;
          color: #ccc;
        }

        .clear-filters-button {
          margin-top: 15px;
          padding: 10px 20px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .service-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .service-modal {
          background: white;
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 25px;
          border-bottom: 1px solid #e0e0e0;
        }

        .modal-title-section {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .modal-icon {
          color: #4CAF50;
        }

        .modal-title {
          font-size: 24px;
          font-weight: bold;
          color: #2C3E50;
          margin: 0 0 5px 0;
        }

        .modal-subtitle {
          color: #666;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 5px;
        }

        .modal-body {
          padding: 25px;
        }

        .modal-section {
          margin-bottom: 25px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: bold;
          color: #2C3E50;
          margin: 0 0 15px 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .info-label {
          font-size: 12px;
          color: #666;
        }

        .info-value {
          font-size: 14px;
          font-weight: 500;
          color: #2C3E50;
        }

        .concerns-list,
        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .concern-item,
        .tip-item {
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
          color: #666;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .tip-item {
          color: #2C3E50;
        }

        .tip-icon {
          color: #4CAF50;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .website-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #f0f0f0;
          border-radius: 8px;
          color: #2C3E50;
          text-decoration: none;
          transition: background 0.2s;
        }

        .website-link:hover {
          background: #e0e0e0;
        }

        .modal-footer {
          padding: 20px 25px;
          border-top: 1px solid #e0e0e0;
        }

        .modal-request-button {
          width: 100%;
          padding: 12px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .modal-request-button:hover:not(:disabled) {
          background: #45a049;
        }

        .modal-request-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .capitalize {
          text-transform: capitalize;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .filter-group {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-select {
            width: 100%;
          }
        }
      `}} />
    </div>
  );
};

export default ServiceCatalog;

