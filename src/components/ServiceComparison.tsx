import React, { useState } from 'react';
import { X, Shield, AlertTriangle, Users, Clock, ChevronRight } from 'lucide-react';
import { childServiceCatalog, getServiceById, type ChildService } from '../data/childServiceCatalog';
import { calculatePrivacyExposureIndex, getExposureLevel } from '../lib/privacyExposureIndex';
import { getServiceLogoUrlWithBrandColor, hasServiceLogo } from '../utils/serviceLogos';
import { useTheme } from '../contexts/ThemeContext';

interface ServiceComparisonProps {
  onClose?: () => void;
  initialServices?: string[];
}

const ServiceComparison: React.FC<ServiceComparisonProps> = ({ 
  onClose,
  initialServices = [] 
}) => {
  const { theme } = useTheme();
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(initialServices);
  const [showServiceSelector, setShowServiceSelector] = useState(false);

  const selectedServices = selectedServiceIds
    .map(id => getServiceById(id))
    .filter((s): s is ChildService => s !== null);

  const handleAddService = (serviceId: string) => {
    if (!selectedServiceIds.includes(serviceId) && selectedServiceIds.length < 3) {
      setSelectedServiceIds([...selectedServiceIds, serviceId]);
    }
    setShowServiceSelector(false);
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServiceIds(selectedServiceIds.filter(id => id !== serviceId));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social-media': return Users;
      case 'messaging': return Users;
      case 'gaming': return Users;
      case 'streaming': return Users;
      case 'education': return Users;
      case 'creative': return Users;
      default: return Shield;
    }
  };

  if (selectedServices.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Compare Services
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select up to 3 services to compare their privacy exposure and features side-by-side.
        </p>
        <button
          onClick={() => setShowServiceSelector(true)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Add Services to Compare
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Service Comparison
        </h2>
        <div className="flex items-center space-x-2">
          {selectedServiceIds.length < 3 && (
            <button
              onClick={() => setShowServiceSelector(true)}
              className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Add Service
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Feature</th>
              {selectedServices.map(service => (
                <th key={service.id} className="text-center p-4 min-w-[200px]">
                  <div className="flex flex-col items-center space-y-2">
                    {hasServiceLogo(service.id) ? (
                      <img
                        src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                        alt={`${service.name} logo`}
                        className="w-12 h-12 rounded-lg object-contain"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          padding: '4px'
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{service.name}</div>
                      <button
                        onClick={() => handleRemoveService(service.id)}
                        className="text-xs text-red-600 hover:text-red-700 mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Privacy Exposure Index */}
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white">Privacy Exposure Index</td>
              {selectedServices.map(service => {
                const exposureIndex = calculatePrivacyExposureIndex(service.id);
                const exposureLevel = getExposureLevel(exposureIndex);
                return (
                  <td key={service.id} className="p-4 text-center">
                    {exposureIndex !== null ? (
                      <div>
                        <div className={`text-2xl font-bold ${exposureLevel.textColor} mb-1`}>
                          {exposureIndex}/100
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${exposureLevel.bgColor} ${exposureLevel.textColor}`}>
                          {exposureLevel.level}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${exposureLevel.barColor}`}
                            style={{ width: `${exposureIndex}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Risk Level */}
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white">Risk Level</td>
              {selectedServices.map(service => {
                const riskColors = {
                  low: 'bg-green-100 text-green-800 border-green-300',
                  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                  high: 'bg-orange-100 text-orange-800 border-orange-300',
                  'very-high': 'bg-red-100 text-red-800 border-red-300'
                };
                return (
                  <td key={service.id} className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${riskColors[service.riskLevel as keyof typeof riskColors] || 'bg-gray-100 text-gray-800'}`}>
                      {service.riskLevel === 'very-high' ? 'Very High' : service.riskLevel.charAt(0).toUpperCase() + service.riskLevel.slice(1)}
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* Minimum Age */}
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white">Minimum Age</td>
              {selectedServices.map(service => (
                <td key={service.id} className="p-4 text-center text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Age {service.minAge}+</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white">Category</td>
              {selectedServices.map(service => (
                <td key={service.id} className="p-4 text-center text-gray-700 dark:text-gray-300 capitalize">
                  {service.category.replace('-', ' ')}
                </td>
              ))}
            </tr>

            {/* Privacy Concerns Count */}
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white">Privacy Concerns</td>
              {selectedServices.map(service => (
                <td key={service.id} className="p-4 text-center text-gray-700 dark:text-gray-300">
                  {service.privacyConcerns?.length || 0} concern{(service.privacyConcerns?.length || 0) !== 1 ? 's' : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Service Selector Modal */}
      {showServiceSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowServiceSelector(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Select Service to Compare
              </h3>
              <button
                onClick={() => setShowServiceSelector(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {childServiceCatalog
                .filter(service => !selectedServiceIds.includes(service.id))
                .map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleAddService(service.id)}
                    className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {hasServiceLogo(service.id) ? (
                        <img
                          src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                          alt={`${service.name} logo`}
                          className="w-10 h-10 rounded-lg object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">{service.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {service.category.replace('-', ' ')} • Age {service.minAge}+
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceComparison;

