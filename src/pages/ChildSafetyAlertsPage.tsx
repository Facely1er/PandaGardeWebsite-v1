import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, ShoppingBag, BarChart3, ArrowRight, Shield } from 'lucide-react';
import ChildSafetyAlerts from '../components/alerts/ChildSafetyAlerts';
import ServiceNotificationCenter from '../components/ServiceNotificationCenter';
import EmailCaptureInline from '../components/EmailCaptureInline';

const ChildSafetyAlertsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'notifications'>('notifications');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Safety Alerts & Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time alerts about privacy and safety updates for services your children use
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to="/service-catalog"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Service Catalog</span>
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

          {/* Service Catalog Requirement Banner */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                  Requires Service Catalog Setup
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                  Service notifications are generated for services added in your Service Catalog. 
                  Add services your family uses to receive personalized safety alerts and privacy updates.
                </p>
                <Link
                  to="/service-catalog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <ShoppingBag size={16} />
                  Set Up Service Catalog
                </Link>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Stay Informed About Your Services
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Notifications are automatically generated for services your family members use. 
                  High-priority alerts appear first. Click any notification to view service details in the catalog.
                </p>
              </div>
            </div>
          </div>
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

        {/* Email Capture for Safety Alerts */}
        <div className="mt-8">
          <EmailCaptureInline
            title="Stay Updated on Child Safety Alerts"
            description="Get notified immediately when new child safety alerts are published. We'll send you important updates about privacy concerns, data breaches, and safety recommendations."
            purpose="safety-alerts"
            compact={false}
          />
        </div>

        {/* Related Resources */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/service-catalog"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Browse Service Catalog
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add or update services to enable personalized safety alerts and notifications
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
              View Digital Footprint
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See your family's overall privacy exposure and high-risk services
            </p>
          </Link>

          <Link
            to="/privacy-assessment"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Privacy Assessment
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get personalized recommendations to improve your family's privacy
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChildSafetyAlertsPage;

