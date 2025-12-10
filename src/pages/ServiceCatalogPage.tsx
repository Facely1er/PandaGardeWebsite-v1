import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCatalog from '../components/ServiceCatalog';
import EmailCaptureInline from '../components/EmailCaptureInline';
import ServiceSetupProgress from '../components/ServiceSetupProgress';
import { Bell, Shield, BarChart3, FileText, ArrowRight, Star, AlertTriangle } from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';
import { personaServiceRecommendationEngine } from '../lib/personaServiceRecommendations';

const ServiceCatalogPage: React.FC = () => {
  const { familyMembers } = useFamily();
  const [showPersonaRecommendations, setShowPersonaRecommendations] = useState(true);

  // Get family persona from first parent member (or use stored persona)
  const familyPersona = React.useMemo(() => {
    // Check if persona is stored in localStorage or context
    const storedPersona = localStorage.getItem('pandagarde_family_persona');
    return storedPersona || null;
  }, []);

  // Get recommended and risky services for persona
  const recommendations = React.useMemo(() => {
    if (!familyPersona) return { recommended: [], toAvoid: [] };
    
    const recommended = personaServiceRecommendationEngine.getRecommendedServices(familyPersona);
    const toAvoid = personaServiceRecommendationEngine.getServicesToAvoid(familyPersona);
    
    return {
      recommended: recommended.slice(0, 6), // Top 6 recommendations
      toAvoid: toAvoid.slice(0, 3) // Top 3 to avoid
    };
  }, [familyPersona]);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Service Catalog
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Browse age-appropriate apps and platforms with Privacy Exposure Index ratings
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

          {/* Service Setup Progress */}
          <div className="mb-6">
            <ServiceSetupProgress compact={false} showCTA={true} />
          </div>

          {/* Persona-Based Recommendations */}
          {familyPersona && showPersonaRecommendations && (recommendations.recommended.length > 0 || recommendations.toAvoid.length > 0) && (
            <div className="mb-6 space-y-4">
              {/* Recommended Services */}
              {recommendations.recommended.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-bold text-green-900 dark:text-green-100">
                        Recommended for Your Family
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowPersonaRecommendations(false)}
                      className="text-sm text-green-700 dark:text-green-300 hover:underline"
                    >
                      Hide
                    </button>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                    Based on your family's privacy profile, these services offer the best balance of features and privacy protection.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recommendations.recommended.map(rec => (
                      <div
                        key={rec.service.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {rec.service.name}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            rec.exposureIndex < 30 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                              : rec.exposureIndex < 50
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                          }`}>
                            {rec.exposureIndex}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {rec.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services to Avoid */}
              {recommendations.toAvoid.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    <h3 className="text-lg font-bold text-red-900 dark:text-red-100">
                      Requires Extra Caution
                    </h3>
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                    These services may not align with your family's privacy values and require careful consideration.
                  </p>
                  <div className="space-y-2">
                    {recommendations.toAvoid.map(rec => (
                      <div
                        key={rec.service.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-200 dark:border-red-800"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {rec.service.name}
                          </h4>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                            {rec.exposureIndex}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {rec.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Banner */}
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
                View Family Footprint
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See your family's overall privacy exposure and get recommendations
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

