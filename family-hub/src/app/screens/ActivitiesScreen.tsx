import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Play, ArrowLeft } from 'lucide-react';
import ActivityManager from '../../components/activities/ActivityManager';

const ActivitiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const activities = [
    { id: 'maze', name: 'Safe Online Journey Maze', icon: '🎮', description: 'Navigate safely through the digital world' },
    { id: 'memory', name: 'Privacy Symbol Matching', icon: '🧩', description: 'Match privacy symbols with their meanings' },
    { id: 'quiz', name: 'Privacy Quiz', icon: '❓', description: 'Test your privacy knowledge' },
    { id: 'coloring', name: 'Privacy Panda Coloring', icon: '🎨', description: 'Color and learn about privacy protection' },
    { id: 'sorting', name: 'Information Sorting', icon: '📦', description: 'Learn what information is safe to share' },
    { id: 'wordsearch', name: 'Privacy Word Search', icon: '🔍', description: 'Find important privacy words' },
    { id: 'connectdots', name: 'Privacy Shield Connect-the-Dots', icon: '🔗', description: 'Connect dots to reveal the shield' },
    { id: 'matching', name: 'Privacy Symbol Matching', icon: '🎯', description: 'Match symbols with meanings' },
  ];

  const handleActivityComplete = (activityId: string, score?: number) => {
    setSelectedActivity(null);
    // Activity completion is handled by ActivityManager
  };

  if (selectedActivity) {
    return (
      <ActivityManager
        activityId={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onComplete={handleActivityComplete}
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
          Activities
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Play fun privacy games and activities to boost your family's privacy score!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activities.map((activity, index) => (
          <button
            key={activity.id}
            onClick={() => {
              if ('vibrate' in navigator) {
                navigator.vibrate(15);
              }
              setSelectedActivity(activity.id);
            }}
            className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 
                       hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300 text-left 
                       shadow-sm hover:shadow-xl hover:shadow-teal-500/10 min-h-[140px] flex flex-col justify-between
                       active:scale-[0.98] transform-gpu
                       hover:-translate-y-1"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-cyan-50/0 group-hover:from-teal-50/50 group-hover:to-cyan-50/50 dark:group-hover:from-teal-900/20 dark:group-hover:to-cyan-900/20 rounded-2xl transition-all duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                  {activity.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {activity.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {activity.description}
              </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-2 text-teal-600 dark:text-teal-400 group-hover:gap-3 transition-all duration-300">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-colors">
                <Play size={18} className="fill-current" />
              </div>
              <span className="text-sm font-semibold">Start Activity</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesScreen;

