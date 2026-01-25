import React from 'react';
import { Moon, Sun, Shield, HelpCircle, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Manage your app preferences and access help resources.
        </p>
      </div>

      <div className="space-y-4">
        {/* Theme Toggle - Enhanced */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl">
                {theme === 'dark' ? (
                  <Moon className="text-teal-600 dark:text-teal-400" size={24} />
                ) : (
                  <Sun className="text-teal-600 dark:text-teal-400" size={24} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Theme</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if ('vibrate' in navigator) {
                  navigator.vibrate(10);
                }
                toggleTheme();
              }}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-300 min-h-[44px] shadow-lg hover:shadow-xl active:scale-95"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Privacy Statement - Enhanced */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl">
              <Shield className="text-teal-600 dark:text-teal-400" size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Privacy</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Your privacy is important to us. All data is stored locally on your device and is never shared with third parties.
          </p>
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-semibold transition-colors"
          >
            View Privacy Policy
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Help & Support - Enhanced */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl">
              <HelpCircle className="text-teal-600 dark:text-teal-400" size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Help & Support</h3>
          </div>
          <div className="space-y-3">
            <a
              href="/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium">Frequently Asked Questions</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/support"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium">Contact Support</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

