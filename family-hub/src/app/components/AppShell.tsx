import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Gamepad2, Award, Settings } from 'lucide-react';

const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
    { id: 'kids', label: 'Kids', icon: Users, path: '/app/kids' },
    { id: 'activities', label: 'Activities', icon: Gamepad2, path: '/app/activities' },
    { id: 'progress', label: 'Progress', icon: Award, path: '/app/progress' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/app/dashboard') {
      return location.pathname === '/app/dashboard' || location.pathname === '/app' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleTabClick = (path: string) => {
    if (location.pathname !== path) {
      setIsTransitioning(true);
      // Simulate haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      navigate(path);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 safe-area-inset overflow-hidden">
      {/* Top Bar - Enhanced Native Style */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm safe-area-top sticky top-0 z-40">
        <div className="px-4 py-3 max-w-full">
          <div className="flex items-center justify-center gap-2.5">
            <img 
              src="/LogoPandagarde.png" 
              alt="PandaGarde Logo" 
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              PandaGarde
            </h1>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 hidden sm:inline font-medium">
              Family Hub
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area - Enhanced with smooth transitions */}
      <main className={`flex-1 overflow-y-auto overscroll-contain pb-safe ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="min-h-full">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Bottom Navigation Tabs - Enhanced Native Style */}
      <nav className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-bottom sticky bottom-0 z-40">
        <div className="grid grid-cols-5 h-16 max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={`
                  relative flex flex-col items-center justify-center gap-0.5
                  min-h-[64px] min-w-[64px] touch-manipulation
                  transition-all duration-300 ease-out
                  ${active
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-500 dark:text-gray-400'
                  }
                  active:scale-90
                  hover:scale-105
                `}
                aria-label={tab.label}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-teal-600 dark:bg-teal-400 rounded-b-full" />
                )}
                <div className={`
                  relative transition-all duration-300
                  ${active ? 'scale-110' : 'scale-100'}
                `}>
                  <Icon 
                    size={24} 
                    className={active ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400'} 
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                <span className={`
                  text-[10px] sm:text-xs font-semibold transition-all duration-300
                  ${active 
                    ? 'text-teal-600 dark:text-teal-400 scale-105' 
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppShell;

