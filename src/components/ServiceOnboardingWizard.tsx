import React, { useState } from 'react';
import { X, CheckCircle, ShoppingBag, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { childServiceCatalog } from '../data/childServiceCatalog';
import { calculatePrivacyExposureIndex, getExposureLevel } from '../lib/privacyExposureIndex';
import { getServiceLogoUrlWithBrandColor } from '../utils/serviceLogos';

interface ServiceOnboardingWizardProps {
  onComplete: (selectedServices: string[]) => void;
  onSkip?: () => void;
  minimumServices?: number;
}

const ServiceOnboardingWizard: React.FC<ServiceOnboardingWizardProps> = ({
  onComplete,
  onSkip,
  minimumServices = 3
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [ageGroup, setAgeGroup] = useState<string | null>(null);

  // Filter services by popularity and age appropriateness
  const popularServices = React.useMemo(() => {
    return childServiceCatalog
      .filter(s => !s.isHidden)
      .sort((a, b) => {
        // Sort by exposure index (lower first) and then by name
        const expA = calculatePrivacyExposureIndex(a);
        const expB = calculatePrivacyExposureIndex(b);
        if (expA !== expB) return expA - expB;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 20); // Show top 20 services
  }, []);

  const filteredServices = React.useMemo(() => {
    if (!ageGroup) return popularServices;
    
    const maxAge = ageGroup === '5-8' ? 8 : ageGroup === '9-12' ? 12 : 17;
    return popularServices.filter(s => s.minimumAge <= maxAge);
  }, [ageGroup, popularServices]);

  const steps = [
    { id: 'welcome', title: 'Welcome to Service Catalog' },
    { id: 'age', title: 'Select Age Group' },
    { id: 'services', title: 'Add Your Services' },
    { id: 'complete', title: 'Setup Complete!' }
  ];

  const handleServiceToggle = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(Array.from(selectedServices));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const canProceed = currentStep === 0 || 
                     (currentStep === 1 && ageGroup) || 
                     (currentStep === 2 && selectedServices.size >= minimumServices) ||
                     currentStep === 3;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <ShoppingBag size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {steps[currentStep].title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            {onSkip && currentStep !== 3 && (
              <button
                onClick={onSkip}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Close wizard"
              >
                <X size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={40} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Set Up Your Service Catalog
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                The Service Catalog is the foundation of PandaGarde. By adding the services your family uses, you'll unlock:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Digital Footprint
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    See your family's online presence
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Risk Analysis
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Privacy Exposure Index per service
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                  <div className="text-3xl mb-2">🔔</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Safety Alerts
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real-time privacy updates
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ⏱️ Takes only 5 minutes • 🔓 Unlocks all features
              </p>
            </div>
          )}

          {/* Step 1: Age Group Selection */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                What age group are your children?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We'll show you age-appropriate services to help you get started quickly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: '5-8', label: '5-8 years', emoji: '🎨', desc: 'Elementary school' },
                  { value: '9-12', label: '9-12 years', emoji: '📚', desc: 'Middle school' },
                  { value: '13-17', label: '13-17 years', emoji: '🎓', desc: 'High school' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAgeGroup(option.value)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      ageGroup === option.value
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                    }`}
                  >
                    <div className="text-4xl mb-3">{option.emoji}</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {option.label}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {option.desc}
                    </p>
                    {ageGroup === option.value && (
                      <CheckCircle size={20} className="text-blue-600 mx-auto mt-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Which services does your family use?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Select at least {minimumServices} services. Don't worry, you can add more later!
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Services selected: {selectedServices.size}/{minimumServices} minimum
                    </span>
                    {selectedServices.size >= minimumServices && (
                      <CheckCircle size={20} className="text-green-600" />
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {filteredServices.map(service => {
                  const exposureIndex = calculatePrivacyExposureIndex(service);
                  const exposureLevel = getExposureLevel(exposureIndex);
                  const isSelected = selectedServices.has(service.id);
                  const logoUrl = getServiceLogoUrlWithBrandColor(service.id);

                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {logoUrl ? (
                          <img src={logoUrl} alt={service.name} className="w-8 h-8 rounded" />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                            {service.name.charAt(0)}
                          </div>
                        )}
                        {isSelected && (
                          <CheckCircle size={20} className="text-blue-600" />
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {service.name}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        exposureLevel === 'Low' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : exposureLevel === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : exposureLevel === 'High'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {exposureIndex}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Complete */}
          {currentStep === 3 && (
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🎉 Setup Complete!
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                You've added {selectedServices.size} services to your catalog. You've now unlocked:
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <CheckCircle size={24} className="text-green-600" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    Digital Footprint Analysis
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <CheckCircle size={24} className="text-green-600" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    Privacy Risk Assessment
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <CheckCircle size={24} className="text-green-600" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    Safety Alerts & Notifications
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You can always add more services later from the Service Catalog page.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          {currentStep === 3 ? (
            <button
              onClick={handleComplete}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              <span>Start Using PandaGarde</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceOnboardingWizard;
