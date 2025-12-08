import React, { useState } from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import ChildSafetyAlerts from '../components/alerts/ChildSafetyAlerts';
import ServiceNotificationCenter from '../components/ServiceNotificationCenter';

const ChildSafetyAlertsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'notifications'>('notifications');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Safety Alerts & Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time alerts about privacy and safety updates for services your children use
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'notifications'
                  ? 'border-green-600 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Service Notifications</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'alerts'
                  ? 'border-green-600 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>RSS Safety Alerts</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'notifications' ? (
          <ServiceNotificationCenter />
        ) : (
          <ChildSafetyAlerts />
        )}
      </div>
    </div>
  );
};

export default ChildSafetyAlertsPage;

