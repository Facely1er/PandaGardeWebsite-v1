import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

interface NavTab {
  id: string;
  label: string;
  icon: string;
  path: string;
  gradient: string;
}

const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs: NavTab[] = [
    { id: 'dashboard', label: 'Home', icon: '🏠', path: '/app/dashboard', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'activities', label: 'Adventure', icon: '🗺️', path: '/app/activities', gradient: 'from-emerald-500 to-green-500' },
    { id: 'kids', label: 'Family', icon: '👨‍👩‍👧‍👦', path: '/app/kids', gradient: 'from-violet-500 to-purple-500' },
    { id: 'progress', label: 'Rewards', icon: '🏆', path: '/app/progress', gradient: 'from-amber-500 to-orange-500' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/app/settings', gradient: 'from-gray-500 to-slate-500' },
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
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      navigate(path);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Top Bar - Compact & Playful */}
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm sticky top-0 z-40">
        <div className="px-4 py-2.5">
          <div className="flex items-center justify-center gap-2.5">
            {/* Logo with bounce animation on hover */}
            <div className="relative group">
              <img 
                src="/LogoPandagarde.png" 
                alt="PandaGarde Logo" 
                className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight">
                PandaGarde
              </h1>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium -mt-0.5">
                Family Hub
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto overscroll-contain ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-opacity duration-200`}>
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation - Playful Style */}
      <nav className="playful-nav bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sticky bottom-0 z-40 safe-area-bottom">
        <div className="flex justify-around items-center h-20 px-2 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const active = isActive(tab.path);
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className="nav-button relative flex flex-col items-center gap-1 min-w-[56px] py-2 px-1 transition-all duration-300"
                aria-label={tab.label}
              >
                {/* Icon Container */}
                <div 
                  className={`
                    nav-icon w-11 h-11 rounded-2xl flex items-center justify-center text-xl
                    transition-all duration-300 ease-out
                    ${active 
                      ? `bg-gradient-to-br ${tab.gradient} shadow-lg -translate-y-2 scale-110` 
                      : 'bg-gray-100 dark:bg-gray-700'
                    }
                  `}
                >
                  <span className={`transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </span>
                </div>

                {/* Label */}
                <span className={`
                  text-[10px] font-semibold transition-all duration-300
                  ${active 
                    ? 'text-gray-900 dark:text-white scale-105' 
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {tab.label}
                </span>

                {/* Active Indicator Dot */}
                {active && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppShell;
