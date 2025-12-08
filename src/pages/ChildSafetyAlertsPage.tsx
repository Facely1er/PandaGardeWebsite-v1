import React from 'react';
import ChildSafetyAlerts from '../components/alerts/ChildSafetyAlerts';

const ChildSafetyAlertsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Child Safety Alerts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time alerts about privacy and safety updates for services your children use
            </p>
          </div>
          <ChildSafetyAlerts />
        </div>
      </div>
  );
};

export default ChildSafetyAlertsPage;

