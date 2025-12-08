import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
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
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Takes approximately 5-10 minutes to complete</li>
            <li>• All answers are stored locally on your device</li>
            <li>• Results are private and not shared</li>
            <li>• You can retake the assessment anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAssessmentPage;

