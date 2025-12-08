import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCatalog from '../components/ServiceCatalog';
import { Bell, Shield, AlertTriangle } from 'lucide-react';

const ServiceCatalogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Service Catalog
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Browse age-appropriate apps and platforms with privacy exposure ratings
              </p>
            </div>
            <Link
              to="/safety-alerts"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span>View Safety Alerts</span>
            </Link>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Privacy Exposure Index
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Each service includes a Privacy Exposure Index (0-100) that helps you understand the privacy risks. 
                  Higher scores indicate services that require more parental supervision and privacy controls.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Catalog Component */}
        <ServiceCatalog />
      </div>
    </div>
  );
};

export default ServiceCatalogPage;

