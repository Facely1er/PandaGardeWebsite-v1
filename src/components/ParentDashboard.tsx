import React, { useState } from 'react';
import { 
  Users, 
  Shield,
  AlertCircle,
  X,
  MessageCircle,
  Eye,
  TrendingUp,
  Zap,
  Bell
} from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';
import { getServiceById } from '../data/childServiceCatalog';
import ActionItemCard from './parent/ActionItemCard';
import ChildRiskCard from './parent/ChildRiskCard';
import ConversationStarterCard from './parent/ConversationStarter';
import ServiceCatalog from './ServiceCatalog';

interface ParentDashboardProps {
  progress: {
    completedActivities: string[];
    activityDetails: Record<string, {
      activityId: string;
      completed: boolean;
      score?: number;
      completedAt: Date;
      timeSpent?: number;
    }>;
    totalTimeSpent: number;
    achievements: string[];
    lastUpdated: Date;
  };
  onClose: () => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ progress, onClose }) => {
  const { 
    familyMembers, 
    getPendingServiceRequests, 
    approveService, 
    denyService, 
    calculateServiceRiskScore,
    getFamilyRiskScore,
    getActionableItems,
    getConversationStarters
  } = useFamily();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'children' | 'services' | 'insights' | 'quick-actions'>('overview');
  const [selectedMemberForServices, setSelectedMemberForServices] = useState<string | null>(null);

  const familyRiskScore = getFamilyRiskScore();
  const actionableItems = getActionableItems();
  const conversationStarters = getConversationStarters();
  const pendingRequests = getPendingServiceRequests();

  // Get children sorted by risk (highest first)
  const children = familyMembers
    .filter(m => m.role === 'child')
    .map(child => ({
      ...child,
      riskScore: calculateServiceRiskScore(child.id)
    }))
    .sort((a, b) => b.riskScore - a.riskScore);

  const handleApproveService = async (memberId: string, serviceId: string) => {
    await approveService(memberId, serviceId);
  };

  const handleDenyService = async (memberId: string, serviceId: string) => {
    await denyService(memberId, serviceId, 'Denied by parent');
  };

  const handleActionItemClick = (item: typeof actionableItems[0]) => {
    if (item.type === 'approval' && item.memberId && item.serviceId) {
      setActiveTab('services');
      setSelectedMemberForServices(item.memberId);
    } else if (item.type === 'high-risk' && item.memberId) {
      setActiveTab('children');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye, badge: actionableItems.length > 0 ? actionableItems.length : undefined },
    { id: 'children', label: 'Children', icon: Users, badge: children.length },
    { id: 'services', label: 'Services', icon: Shield, badge: pendingRequests.length > 0 ? pendingRequests.length : undefined },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'quick-actions', label: 'Quick Actions', icon: Zap }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2C3E50', margin: 0 }}>
              Your Privacy Control Center
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: '0.25rem 0 0 0' }}>
              See what your children do online, know their privacy risks, and take action
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#f3f4f6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            <X size={20} style={{ color: '#666' }} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8f9fa',
          padding: '0 2rem'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '1rem 1.5rem',
                  border: 'none',
                  backgroundColor: 'transparent',
                  borderBottom: isActive ? '3px solid #4CAF50' : '3px solid transparent',
                  color: isActive ? '#4CAF50' : '#666',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9375rem',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#4CAF50';
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#666';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={18} />
                {tab.label}
                {tab.badge !== undefined && (
                  <span style={{
                    backgroundColor: isActive ? '#4CAF50' : '#dc2626',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '0.125rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    marginLeft: '0.25rem'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '2rem'
        }}>
          {activeTab === 'overview' && (
            <div>
              {/* Hero Section - Family Risk Score */}
              <div style={{
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '2.5rem',
                marginBottom: '2rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                  Your Family's Privacy Safety Level
                </div>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {familyRiskScore}/100
                </div>
                <div style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                  {familyRiskScore >= 70 ? 'High Risk' : familyRiskScore >= 40 ? 'Medium Risk' : 'Low Risk'}
                </div>
              </div>

              {/* Action Items */}
              {actionableItems.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50' }}>
                      Action Items
                    </h3>
                    <span style={{ fontSize: '0.875rem', color: '#666' }}>
                      {actionableItems.length} {actionableItems.length === 1 ? 'item' : 'items'} need your attention
                    </span>
                  </div>
                  {actionableItems.slice(0, 5).map(item => (
                    <ActionItemCard
                      key={item.id}
                      id={item.id}
                      type={item.type}
                      priority={item.priority}
                      title={item.title}
                      description={item.description}
                      onClick={() => handleActionItemClick(item)}
                      icon={(item.type === 'approval' ? Bell : item.type === 'high-risk' ? AlertCircle : MessageCircle) as React.ElementType}
                    />
                  ))}
                </div>
              )}

              {/* Children Risk Cards */}
              {children.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1rem' }}>
                    Your Children
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {children.map(child => (
                      <ChildRiskCard
                        key={child.id}
                        child={child}
                        riskScore={child.riskScore}
                        onViewServices={() => {
                          setActiveTab('services');
                          setSelectedMemberForServices(child.id);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Conversation Starters */}
              {conversationStarters.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1rem' }}>
                    Conversation Starters
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {conversationStarters.map((starter, index) => (
                      <ConversationStarterCard
                        key={index}
                        childName={starter.childName}
                        service={starter.service}
                        topic={starter.topic}
                        script={starter.script}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <div style={{
                  backgroundColor: '#f0f9ff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #3b82f6'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                    {actionableItems.length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Action Items
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #10b981'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                    {progress.achievements.length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Achievements
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#fef3c7',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #f59e0b'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                    {children.length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Children
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'children' && (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1.5rem' }}>
                Your Children's Privacy Status
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {children.map(child => (
                  <ChildRiskCard
                    key={child.id}
                    child={child}
                    riskScore={child.riskScore}
                    onViewServices={() => {
                      setActiveTab('services');
                      setSelectedMemberForServices(child.id);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1.5rem' }}>
                Service Management
              </h3>
              
              {/* Pending Requests */}
              {pendingRequests.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#2C3E50', marginBottom: '1rem' }}>
                    Pending Service Requests ({pendingRequests.length})
                  </h4>
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '2px solid #dc2626',
                    borderRadius: '12px',
                    padding: '1.5rem'
                  }}>
                    {pendingRequests.map((request, index) => {
                      const member = familyMembers.find(m => 
                        m.services?.some(s => s.serviceId === request.serviceId && s.status === 'requested')
                      );
                      const service = getServiceById(request.serviceId);
                      if (!member || !service) return null;
                      
                      return (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            marginBottom: index < pendingRequests.length - 1 ? '1rem' : 0
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#2C3E50', marginBottom: '0.25rem' }}>
                              {service.name}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#666' }}>
                              Requested by {member.first_name} {member.last_name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
                              Risk Level: {service.riskLevel}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleApproveService(member.id, request.serviceId)}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: '0.875rem'
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDenyService(member.id, request.serviceId)}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: '0.875rem'
                              }}
                            >
                              Deny
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Service Catalog */}
              {selectedMemberForServices ? (
                <div>
                  <button
                    onClick={() => setSelectedMemberForServices(null)}
                    style={{
                      marginBottom: '1rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    ← Back to All Services
                  </button>
                  <ServiceCatalog
                    memberId={selectedMemberForServices}
                    onServiceSelect={() => {}}
                    showRequestButton={false}
                  />
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#2C3E50', marginBottom: '1rem' }}>
                    Select a child to view their services
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => setSelectedMemberForServices(child.id)}
                        style={{
                          padding: '1.5rem',
                          backgroundColor: '#f8f9fa',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#4CAF50';
                          e.currentTarget.style.backgroundColor = '#f0fdf4';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }}
                      >
                        <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#2C3E50', marginBottom: '0.5rem' }}>
                          {child.first_name} {child.last_name}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>
                          {child.services?.filter(s => s.status === 'approved').length || 0} active services
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'insights' && (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1.5rem' }}>
                Privacy Insights
              </h3>
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <TrendingUp size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
                <p style={{ color: '#666', fontSize: '1rem' }}>
                  Risk trend visualization coming soon. Track how your family's privacy improves over time.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'quick-actions' && (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1.5rem' }}>
                Quick Actions
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#f0f9ff',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <Bell size={24} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#2C3E50' }}>
                    Review Service Requests
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                    {pendingRequests.length} pending
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('children')}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#fef2f2',
                    border: '2px solid #dc2626',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <AlertCircle size={24} style={{ color: '#dc2626', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#2C3E50' }}>
                    Check High-Risk Children
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                    {children.filter(c => c.riskScore >= 70).length} need attention
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#f0fdf4',
                    border: '2px solid #10b981',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <MessageCircle size={24} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#2C3E50' }}>
                    Get Conversation Starters
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                    {conversationStarters.length} available
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
