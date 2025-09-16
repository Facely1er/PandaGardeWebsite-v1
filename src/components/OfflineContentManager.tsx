import React, { useState, useEffect } from 'react';
import { Download, WifiOff, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { cacheContentForOffline, getOfflineStorageUsage, clearOfflineData } from '../lib/offlineManager';
import { useSearch } from '../contexts/SearchContext';

interface OfflineContentManagerProps {
  className?: string;
}

const OfflineContentManager: React.FC<OfflineContentManagerProps> = ({ className = '' }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [storageUsage, setStorageUsage] = useState({ used: 0, available: 0 });
  const [cachedContent, setCachedContent] = useState({
    stories: 0,
    activities: 0,
    resources: 0,
  });
  const { searchResults } = useSearch();

  useEffect(() => {
    updateStorageInfo();
  }, []);

  const updateStorageInfo = () => {
    const usage = getOfflineStorageUsage();
    setStorageUsage(usage);
    
    // Count cached content
    const stories = localStorage.getItem('pandagarde_offline_stories');
    const activities = localStorage.getItem('pandagarde_offline_activities');
    const resources = localStorage.getItem('pandagarde_offline_resources');
    
    setCachedContent({
      stories: stories ? JSON.parse(stories).length : 0,
      activities: activities ? JSON.parse(activities).length : 0,
      resources: resources ? JSON.parse(resources).length : 0,
    });
  };

  const downloadContentForOffline = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate downloading different content types
      const contentTypes = [
        { type: 'stories', data: searchResults.filter(r => r.type === 'page').slice(0, 5) },
        { type: 'activities', data: searchResults.filter(r => r.type === 'activity').slice(0, 10) },
        { type: 'resources', data: searchResults.filter(r => r.type === 'resource').slice(0, 8) },
      ];

      for (let i = 0; i < contentTypes.length; i++) {
        const { type, data } = contentTypes[i];
        await cacheContentForOffline(type as any, data);
        
        // Update progress
        const progress = ((i + 1) / contentTypes.length) * 100;
        setDownloadProgress(progress);
        
        // Simulate download delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      updateStorageInfo();
      console.log('Content downloaded for offline use');
    } catch (error) {
      console.error('Failed to download content:', error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const clearAllOfflineData = async () => {
    if (window.confirm('Are you sure you want to clear all offline content? This action cannot be undone.')) {
      await clearOfflineData();
      updateStorageInfo();
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStoragePercentage = () => {
    const total = storageUsage.used + storageUsage.available;
    return total > 0 ? (storageUsage.used / total) * 100 : 0;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <WifiOff className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Offline Content
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Download content to use without internet connection
          </p>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Storage Usage
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {formatBytes(storageUsage.used)} / {formatBytes(storageUsage.used + storageUsage.available)}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getStoragePercentage()}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {getStoragePercentage().toFixed(1)}% used
        </p>
      </div>

      {/* Cached Content Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {cachedContent.stories}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Stories</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {cachedContent.activities}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Activities</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {cachedContent.resources}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Resources</div>
        </div>
      </div>

      {/* Download Progress */}
      {isDownloading && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Downloading Content
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {downloadProgress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={downloadContentForOffline}
          disabled={isDownloading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-5 h-5" />
          {isDownloading ? 'Downloading...' : 'Download Content for Offline'}
        </button>

        {cachedContent.stories > 0 || cachedContent.activities > 0 || cachedContent.resources > 0 ? (
          <button
            onClick={clearAllOfflineData}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Clear All Offline Content
          </button>
        ) : null}
      </div>

      {/* Offline Features Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Offline Features
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Read cached stories and activities</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Track progress (synced when online)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Access downloaded resources</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span>Limited search functionality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineContentManager;