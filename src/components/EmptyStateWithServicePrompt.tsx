import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Lock } from 'lucide-react';

interface EmptyStateWithServicePromptProps {
  feature: string;
  description: string;
  minimumServices?: number;
  icon?: React.ReactNode;
}

const EmptyStateWithServicePrompt: React.FC<EmptyStateWithServicePromptProps> = ({
  feature,
  description,
  minimumServices = 3,
  icon
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Lock Icon with Badge */}
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
              <Lock size={48} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
              <ShoppingBag size={20} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {feature} Requires Service Catalog
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              {icon && (
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  {icon}
                </div>
              )}
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Why Service Catalog?
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  The Service Catalog is the foundation of PandaGarde's privacy protection. 
                  By adding the services your family uses, you enable privacy risk analysis, 
                  digital footprint tracking, and personalized safety recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="text-left mb-8 max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Getting started is easy:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <p className="text-gray-700 dark:text-gray-300 pt-0.5">
                  Browse our catalog of 50+ popular apps and services
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <p className="text-gray-700 dark:text-gray-300 pt-0.5">
                  Add at least {minimumServices} services your family currently uses
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <p className="text-gray-700 dark:text-gray-300 pt-0.5">
                  Return here to unlock {feature} and other advanced features
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Link
              to="/service-catalog"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <ShoppingBag size={24} />
              <span>Set Up Service Catalog</span>
              <ArrowRight size={20} />
            </Link>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ⏱️ Takes only 5 minutes • 🔓 Unlocks all features • 🆓 100% Free
            </p>
          </div>

          {/* Secondary Link */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Want to learn more about the Service Catalog?
            </p>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
            >
              View Service Catalog Overview →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateWithServicePrompt;
