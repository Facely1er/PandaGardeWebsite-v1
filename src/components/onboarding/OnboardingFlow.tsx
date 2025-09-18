import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Check, Star, Users, BookOpen, Target } from 'lucide-react';
import { trackEvent, AnalyticsEvents } from '../../lib/analytics';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  content: React.ReactNode;
  actionText?: string;
  skipText?: string;
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Privacy Panda!',
      description: 'Let\'s get you started with your privacy education journey',
      icon: Star,
      content: (
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <Star className="w-12 h-12 text-green-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Privacy Panda is your family's guide to understanding digital privacy and safety. 
            We'll help you learn about protecting personal information online.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>What you'll learn:</strong> Privacy basics, safe online behavior, 
              family digital agreements, and practical tools for protecting your data.
            </p>
          </div>
        </div>
      ),
      actionText: 'Get Started',
    },
    {
      id: 'role-selection',
      title: 'Tell us about yourself',
      description: 'Help us personalize your experience',
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Are you a parent looking to teach your children about privacy, or a child learning about digital safety?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleRoleSelection('parent')}
              className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
            >
              <Users className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Parent/Guardian</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I want to learn how to teach my children about privacy and digital safety
              </p>
            </button>
            <button
              onClick={() => handleRoleSelection('child')}
              className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
            >
              <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Child/Student</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I want to learn about privacy and how to stay safe online
              </p>
            </button>
          </div>
        </div>
      ),
      skipText: 'Skip for now',
    },
    {
      id: 'age-group',
      title: 'Select age group',
      description: 'Choose the most appropriate content for your family',
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Which age group best describes the children in your family?
          </p>
          <div className="space-y-3">
            {[
              { range: 'Ages 5-8', label: 'Privacy Explorers', description: 'Basic privacy concepts through fun activities' },
              { range: 'Ages 9-12', label: 'Privacy Handbook', description: 'Comprehensive privacy education and digital citizenship' },
              { range: 'Ages 13-17', label: 'Teen Privacy Tools', description: 'Advanced privacy tools and digital rights' },
            ].map((group) => (
              <button
                key={group.range}
                onClick={() => handleAgeGroupSelection(group.range)}
                className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{group.range}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{group.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{group.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      skipText: 'Skip for now',
    },
    {
      id: 'goals',
      title: 'What are your goals?',
      description: 'Help us recommend the best content for you',
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            What would you like to focus on? (You can select multiple)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'privacy-basics', label: 'Privacy Basics', description: 'Understanding personal information' },
              { id: 'online-safety', label: 'Online Safety', description: 'Staying safe on the internet' },
              { id: 'digital-citizenship', label: 'Digital Citizenship', description: 'Responsible online behavior' },
              { id: 'family-agreements', label: 'Family Agreements', description: 'Setting digital boundaries' },
              { id: 'privacy-tools', label: 'Privacy Tools', description: 'Practical privacy settings' },
              { id: 'data-protection', label: 'Data Protection', description: 'Protecting personal data' },
            ].map((goal) => (
              <label key={goal.id} className="flex items-start p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 mr-3"
                  onChange={(e) => handleGoalSelection(goal.id, e.target.checked)}
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{goal.label}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{goal.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      ),
      skipText: 'Skip for now',
    },
    {
      id: 'completion',
      title: 'You\'re all set!',
      description: 'Let\'s start your privacy education journey',
      icon: Check,
      content: (
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Welcome to Privacy Panda!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You're ready to start learning about privacy and digital safety. 
            We've personalized your experience based on your preferences.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Next steps:</strong> Explore the activity book, read Privacy Panda's story, 
              or check out the family hub to track your progress.
            </p>
          </div>
        </div>
      ),
      actionText: 'Start Learning',
    },
  ];

  const handleRoleSelection = (role: 'parent' | 'child') => {
    // Update user profile with role
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { role_selected: role });
    setCompletedSteps(prev => new Set([...prev, 'role-selection']));
    nextStep();
  };

  const handleAgeGroupSelection = (ageGroup: string) => {
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { age_group_selected: ageGroup });
    setCompletedSteps(prev => new Set([...prev, 'age-group']));
    nextStep();
  };

  const handleGoalSelection = (goalId: string, selected: boolean) => {
    // Track goal selection
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { 
      goal_selected: goalId, 
      goal_action: selected ? 'added' : 'removed' 
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipStep = () => {
    if (currentStep < steps.length - 1) {
      nextStep();
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { onboarding_completed: true });
    localStorage.setItem('pandagarde_onboarding_completed', 'true');
    onComplete();
  };

  const skipOnboarding = () => {
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { onboarding_skipped: true });
    localStorage.setItem('pandagarde_onboarding_completed', 'true');
    onSkip();
  };

  if (!isOpen) {return null;}

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        
        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentStepData.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentStepData.description}
                  </p>
                </div>
              </div>
              <button
                onClick={skipOnboarding}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {currentStepData.content}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            <div className="flex gap-3">
              {currentStepData.skipText && (
                <button
                  onClick={skipStep}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {currentStepData.skipText}
                </button>
              )}
              <button
                onClick={currentStepData.actionText ? nextStep : completeOnboarding}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                {currentStepData.actionText || 'Complete'}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;