import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCatalog from '../components/ServiceCatalog';
import EmailCaptureInline from '../components/EmailCaptureInline';
import { Bell, Shield, BarChart3, FileText, ArrowRight, Unlock, CheckCircle, Sparkles, Target } from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';

const ServiceCatalogPage: React.FC = () => {
  const { getFamilyServices } = useFamily();
  const [servicesCount, setServicesCount] = useState(0);
  
  // Update count when services change
  useEffect(() => {
    const updateCount = () => {
      setServicesCount(getFamilyServices().length);
    };
    updateCount();
    
    // Poll for changes (since localStorage doesn't trigger re-renders)
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, [getFamilyServices]);

  const progressPercent = Math.min((servicesCount / 5) * 100, 100);
  const isReadyForAnalysis = servicesCount >= 3;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator - Fixed at top when scrolling */}
        {servicesCount > 0 && (
          <div className={`mb-6 p-4 rounded-xl border-2 transition-all ${
            isReadyForAnalysis 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 dark:border-blue-700'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isReadyForAnalysis ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {isReadyForAnalysis ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Target className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                      isReadyForAnalysis ? 'text-green-900 dark:text-green-100' : 'text-blue-900 dark:text-blue-100'
                    }`}>
                      {servicesCount} Service{servicesCount !== 1 ? 's' : ''} Added
                    </span>
                    {isReadyForAnalysis && (
                      <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles size={12} />
                        Ready for Analysis!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isReadyForAnalysis ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className={`text-sm ${
                      isReadyForAnalysis ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'
                    }`}>
                      {isReadyForAnalysis ? 'Analysis ready' : `${Math.max(0, 3 - servicesCount)} more to unlock analysis`}
                    </span>
                  </div>
                </div>
              </div>
              {isReadyForAnalysis && (
                <Link
                  to="/digital-footprint"
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>View Analysis</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Service Catalog
                </h1>
                {servicesCount === 0 && (
                  <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Unlock size={12} />
                    Get Started
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {servicesCount === 0 
                  ? 'Add the apps and services your family uses to enable Digital Footprint Analysis and get personalized privacy recommendations.'
                  : 'Manage your family\'s apps and services. Add more to improve your privacy analysis accuracy.'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to="/safety-alerts"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span>Safety Alerts</span>
              </Link>
              <Link
                to="/digital-footprint"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Footprint</span>
              </Link>
            </div>
          </div>

          {/* Foundation Banner - Only show if no services added */}
          {servicesCount === 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Unlock className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  How It Works
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Click "Add to My Services" on any service below. Add at least 3 services to unlock your Digital Footprint Analysis.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Digital Footprint Analysis</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">See your family's privacy exposure</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Risk Assessment</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Understand privacy risks per service</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Personalized Tips</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Get actionable recommendations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Privacy Exposure Index Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Privacy Exposure Index
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  Each service includes a Privacy Exposure Index (0-100) that helps you understand the privacy risks. 
                  Higher scores indicate services that require more parental supervision and privacy controls.
                </p>
                <div className="flex items-center space-x-4 text-xs text-blue-700 dark:text-blue-300">
                  <span>• Very High (70-100): Requires close supervision</span>
                  <span>• High (50-69): Needs active monitoring</span>
                  <span>• Medium (30-49): Moderate concerns</span>
                  <span>• Low (0-29): Generally safe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link
              to="/digital-footprint"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                View Digital Footprint Analysis
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See your family's privacy exposure across all services and get personalized recommendations
              </p>
            </Link>

            <Link
              to="/safety-alerts"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Check Safety Alerts
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get real-time notifications about privacy and safety updates
              </p>
            </Link>

            <Link
              to="/privacy-assessment"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Take Privacy Assessment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evaluate your family's privacy practices and get personalized recommendations
              </p>
            </Link>
          </div>
        </div>

        {/* Service Catalog Component */}
        <ServiceCatalog />
        
        {/* Email Capture for Service Updates */}
        <div className="mt-8 max-w-4xl mx-auto">
          <EmailCaptureInline
            title="Get Service Privacy Updates"
            description="Stay informed about privacy policy changes, data breaches, and security updates for services your family uses."
            purpose="updates"
            compact={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalogPage;

