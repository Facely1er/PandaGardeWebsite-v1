import React from 'react';
import { Moon, Sun, Shield, HelpCircle, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Manage your app preferences and access help resources.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Theme Toggle - Enhanced */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl">
                {theme === 'dark' ? (
                  <Moon className="text-teal-600 dark:text-teal-400" size={18} />
                ) : (
                  <Sun className="text-teal-600 dark:text-teal-400" size={18} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Theme</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
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
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 min-h-[36px] sm:min-h-[44px] text-sm sm:text-base shadow-md hover:shadow-lg active:scale-95"
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Privacy Statement - Enhanced */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
            <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl">
              <Shield className="text-teal-600 dark:text-teal-400" size={18} />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Privacy</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
            Your privacy is important to us. All data is stored locally on your device and is never shared with third parties.
          </p>
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-xs sm:text-sm font-semibold transition-colors"
          >
            View Privacy Policy
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Help & Support - Enhanced */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
            <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl">
              <HelpCircle className="text-teal-600 dark:text-teal-400" size={18} />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Help & Support</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <a
              href="/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium text-sm sm:text-base">Frequently Asked Questions</span>
              <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/support"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium text-sm sm:text-base">Contact Support</span>
              <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

