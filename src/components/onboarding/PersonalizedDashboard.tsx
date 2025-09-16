import React from 'react';
import { ArrowRight, Star, BookOpen, Download, Settings, Users } from 'lucide-react';
import { usePersonalizedContent } from '../../hooks/useOnboarding';
import { useSearch } from '../../contexts/SearchContext';

interface PersonalizedDashboardProps {
  className?: string;
}

const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({ className = '' }) => {
  const { getRecommendations, getWelcomeMessage } = usePersonalizedContent();
  const { performSearch } = useSearch();

  const recommendations = getRecommendations();
  const welcomeMessage = getWelcomeMessage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'page':
        return BookOpen;
      case 'activity':
        return Star;
      case 'resource':
        return Download;
      case 'guide':
        return Settings;
      default:
        return BookOpen;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20';
      case 'medium':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      case 'low':
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleRecommendationClick = (recommendation: any) => {
    // Navigate to the recommended content
    performSearch(recommendation.id);
  };

  if (recommendations.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        <div className="text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Tell us about yourself to get personalized recommendations
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recommended for You
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {welcomeMessage}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.slice(0, 6).map((recommendation, index) => {
          const IconComponent = getIcon(recommendation.type);
          const priorityColor = getPriorityColor(recommendation.priority);
          
          return (
            <button
              key={`${recommendation.type}-${recommendation.id}`}
              onClick={() => handleRecommendationClick(recommendation)}
              className={`w-full p-4 border rounded-lg text-left hover:shadow-md transition-all ${priorityColor}`}
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                    {recommendation.id.replace('-', ' ')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {recommendation.type} • {recommendation.priority} priority
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          );
        })}
      </div>

      {recommendations.length > 6 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            View all recommendations ({recommendations.length - 6} more)
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedDashboard;