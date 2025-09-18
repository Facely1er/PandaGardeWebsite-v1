import React from 'react';
import { Star, ArrowRight, Users, BookOpen, Target } from 'lucide-react';
import { useOnboarding, usePersonalizedContent } from '../../hooks/useOnboarding';

interface OnboardingBannerProps {
  onStartOnboarding: () => void;
}

const OnboardingBanner: React.FC<OnboardingBannerProps> = ({ onStartOnboarding }) => {
  const { isCompleted } = useOnboarding();
  const { getWelcomeMessage } = usePersonalizedContent();

  // Don't show banner if onboarding is completed
  if (isCompleted) {return null;}

  const welcomeMessage = getWelcomeMessage();

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">Welcome to Privacy Panda!</h2>
          </div>
          
          <p className="text-white/90 mb-4 max-w-2xl">
            {welcomeMessage} Let's personalize your experience with a quick setup.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onStartOnboarding}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button className="text-white/80 hover:text-white transition-colors">
              Maybe later
            </button>
          </div>
        </div>
        
        <div className="hidden md:block ml-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 p-3 rounded-lg text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs">Family</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs">Learning</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg text-center">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs">Goals</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick preview of what's included */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-sm text-white/80 mb-3">What you'll get:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Personalized content recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Age-appropriate activities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Progress tracking setup</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBanner;