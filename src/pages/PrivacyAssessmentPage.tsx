import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, ShoppingBag, BarChart3, Bell, ArrowRight } from 'lucide-react';
import FamilyPrivacyAssessment from '../components/FamilyPrivacyAssessment';
import { type AssessmentResult } from '../lib/familyPrivacyAssessment';

const PrivacyAssessmentPage: React.FC = () => {
  const handleAssessmentComplete = (result: AssessmentResult) => {
    // Store results in localStorage for future reference
    const assessmentHistory = JSON.parse(
      localStorage.getItem('pandagarde_assessment_history') || '[]'
    );
    assessmentHistory.push({
      ...result,
      completedAt: new Date().toISOString()
    });
    localStorage.setItem('pandagarde_assessment_history', JSON.stringify(assessmentHistory));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/family-hub"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Back to Family Hub"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Family Privacy Assessment
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Evaluate your family's privacy practices and get personalized recommendations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Component */}
        <FamilyPrivacyAssessment onComplete={handleAssessmentComplete} />

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            About This Assessment
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
            This assessment evaluates your family's privacy practices across five key areas:
            data sharing, privacy settings, online behavior, device security, and parental controls.
            Your answers help us provide personalized recommendations to improve your family's
            digital privacy and safety.
          </p>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 mb-4">
            <li>• Takes approximately 5-10 minutes to complete</li>
            <li>• All answers are stored locally on your device</li>
            <li>• Results are private and not shared</li>
            <li>• You can retake the assessment anytime</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Tip:</strong> For more detailed privacy analysis, add services your family uses in the 
              <Link to="/service-catalog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium mx-1">
                Service Catalog
              </Link>
              to enable digital footprint analysis and risk exposure assessment.
            </p>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Related Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/service-catalog"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Service Catalog
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add services to enable digital footprint analysis and personalized risk assessments
              </p>
            </Link>

            <Link
              to="/digital-footprint"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Digital Footprint
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See your family's overall privacy exposure and high-risk services
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
                Safety Alerts
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get real-time notifications about privacy and safety updates
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAssessmentPage;

