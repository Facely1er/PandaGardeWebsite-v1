import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';

interface ServiceSetupProgressProps {
  compact?: boolean;
  showCTA?: boolean;
  minimumServices?: number;
}

const ServiceSetupProgress: React.FC<ServiceSetupProgressProps> = ({
  compact = false,
  showCTA = true,
  minimumServices = 3
}) => {
  const { familyMembers } = useFamily();

  // Calculate total services
  const totalServices = React.useMemo(() => {
    let count = 0;
    familyMembers.forEach(member => {
      const memberServices = (member as any).services || [];
      count += memberServices.length;
    });
    return count;
  }, [familyMembers]);

  const progress = Math.min((totalServices / minimumServices) * 100, 100);
  const isComplete = totalServices >= minimumServices;
  const servicesRemaining = Math.max(minimumServices - totalServices, 0);

  // Compact version for sidebar/dashboard
  if (compact) {
    return (
      <Link
        to="/service-catalog"
        className="block bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-600 transition-colors p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={20} className={isComplete ? "text-green-600" : "text-blue-600"} />
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              Service Catalog
            </h3>
          </div>
          {isComplete ? (
            <CheckCircle size={20} className="text-green-600" />
          ) : (
            <Lock size={20} className="text-amber-500" />
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                isComplete ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600 dark:text-gray-400">
            {totalServices}/{minimumServices} services
          </span>
          {isComplete ? (
            <span className="text-green-600 font-medium">✓ Complete</span>
          ) : (
            <span className="text-amber-600 font-medium">
              +{servicesRemaining} needed
            </span>
          )}
        </div>
      </Link>
    );
  }

  // Full version for main content areas
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isComplete 
              ? 'bg-green-600' 
              : 'bg-blue-600'
          }`}>
            {isComplete ? (
              <CheckCircle size={28} className="text-white" />
            ) : (
              <ShoppingBag size={28} className="text-white" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Service Catalog Setup
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isComplete 
                ? 'All features unlocked!' 
                : 'Add services to unlock advanced features'
              }
            </p>
          </div>
        </div>
        {isComplete && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
            Complete
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress: {totalServices}/{minimumServices} services
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              isComplete 
                ? 'bg-gradient-to-r from-green-500 to-green-600' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Feature Unlock Status */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          {totalServices >= 3 ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <Lock size={16} className="text-gray-400" />
          )}
          <span className={totalServices >= 3 ? "text-green-700 dark:text-green-300 font-medium" : "text-gray-600 dark:text-gray-400"}>
            Digital Footprint Analysis
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          {totalServices >= 3 ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <Lock size={16} className="text-gray-400" />
          )}
          <span className={totalServices >= 3 ? "text-green-700 dark:text-green-300 font-medium" : "text-gray-600 dark:text-gray-400"}>
            Privacy Risk Assessment
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          {totalServices >= 1 ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <Lock size={16} className="text-gray-400" />
          )}
          <span className={totalServices >= 1 ? "text-green-700 dark:text-green-300 font-medium" : "text-gray-600 dark:text-gray-400"}>
            Safety Alerts & Notifications
          </span>
        </div>
      </div>

      {/* CTA */}
      {showCTA && !isComplete && (
        <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {servicesRemaining === 1 
              ? `Add ${servicesRemaining} more service to unlock all features!`
              : `Add ${servicesRemaining} more services to unlock all features!`
            }
          </p>
          <Link
            to="/service-catalog"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ShoppingBag size={20} />
            <span>Add Services Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {isComplete && showCTA && (
        <div className="pt-4 border-t border-green-200 dark:border-green-800">
          <p className="text-sm text-green-700 dark:text-green-300 mb-3">
            🎉 Great job! You've unlocked all advanced privacy features.
          </p>
          <Link
            to="/digital-footprint"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <span>View Digital Footprint</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceSetupProgress;
