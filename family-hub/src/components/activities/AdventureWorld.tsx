import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Star, Sparkles, ChevronRight, Trophy, Zap } from 'lucide-react';
import { useFamilyProgress } from '../../contexts/FamilyProgressContext';

interface Zone {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  activities: Activity[];
  unlockLevel: number;
}

interface Activity {
  id: string;
  name: string;
  icon: string;
  description: string;
  xpReward: number;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface AdventureWorldProps {
  onSelectActivity: (activityId: string) => void;
  currentLevel: number;
  totalXp: number;
}

const zones: Zone[] = [
  {
    id: 'forest',
    name: 'Privacy Forest',
    icon: '🌲',
    color: 'zone-forest',
    gradient: 'from-emerald-500 to-green-600',
    description: 'Learn to protect your personal information',
    unlockLevel: 1,
    activities: [
      { id: 'maze', name: 'Safe Journey Maze', icon: '🎮', description: 'Navigate safely through the digital world', xpReward: 50, duration: '5 min', difficulty: 'easy' },
      { id: 'wordsearch', name: 'Privacy Word Hunt', icon: '🔍', description: 'Find important privacy words', xpReward: 40, duration: '4 min', difficulty: 'easy' },
    ]
  },
  {
    id: 'castle',
    name: 'Password Castle',
    icon: '🏰',
    color: 'zone-castle',
    gradient: 'from-violet-500 to-purple-600',
    description: 'Master the art of strong passwords',
    unlockLevel: 2,
    activities: [
      { id: 'memory', name: 'Symbol Match', icon: '🧩', description: 'Match privacy symbols with meanings', xpReward: 60, duration: '6 min', difficulty: 'medium' },
      { id: 'matching', name: 'Security Pairs', icon: '🎯', description: 'Match security concepts', xpReward: 55, duration: '5 min', difficulty: 'medium' },
    ]
  },
  {
    id: 'ocean',
    name: 'Safe Surfing Sea',
    icon: '🌊',
    color: 'zone-ocean',
    gradient: 'from-blue-500 to-cyan-600',
    description: 'Ride the waves of internet safety',
    unlockLevel: 3,
    activities: [
      { id: 'quiz', name: 'Privacy Quiz', icon: '❓', description: 'Test your privacy knowledge', xpReward: 75, duration: '8 min', difficulty: 'medium' },
      { id: 'sorting', name: 'Info Sorter', icon: '📦', description: 'Learn what info is safe to share', xpReward: 65, duration: '6 min', difficulty: 'medium' },
    ]
  },
  {
    id: 'volcano',
    name: 'Danger Detection',
    icon: '🌋',
    color: 'zone-volcano',
    gradient: 'from-orange-500 to-red-500',
    description: 'Spot online dangers before they strike',
    unlockLevel: 4,
    activities: [
      { id: 'coloring', name: 'Privacy Panda Art', icon: '🎨', description: 'Color and learn about protection', xpReward: 45, duration: '10 min', difficulty: 'easy' },
      { id: 'connectdots', name: 'Shield Builder', icon: '🔗', description: 'Connect dots to build your shield', xpReward: 50, duration: '5 min', difficulty: 'easy' },
    ]
  }
];

const AdventureWorld: React.FC<AdventureWorldProps> = ({ onSelectActivity, currentLevel, totalXp }) => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const { getMemberProgress } = useFamilyProgress();
  
  // Get completion data for activities
  const getActivityCompletion = (activityId: string): number => {
    // This would check actual progress - returning mock data for now
    const completedActivities: Record<string, number> = {
      'maze': 3,
      'wordsearch': 2,
      'memory': 1,
      'matching': 0,
      'quiz': 2,
      'sorting': 1,
      'coloring': 3,
      'connectdots': 0,
    };
    return completedActivities[activityId] || 0;
  };

  const isZoneUnlocked = (zone: Zone) => currentLevel >= zone.unlockLevel;

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((star) => (
          <span
            key={star}
            className={`text-lg transition-all duration-300 ${
              count >= star 
                ? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]' 
                : 'text-white/30'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="adventure-world min-h-screen pb-24 relative">
      {/* Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="text-center mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            🗺️ Adventure World
          </h1>
          <p className="text-gray-600 text-sm">
            Explore zones and complete activities to level up!
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-gray-700">Level {currentLevel}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-gray-700">{totalXp} XP</span>
          </div>
        </div>
      </div>

      {/* Adventure Map - Zone Grid */}
      <div className="relative z-10 px-4 py-6">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {zones.map((zone, index) => {
            const unlocked = isZoneUnlocked(zone);
            const isHovered = hoveredZone === zone.id;
            
            return (
              <button
                key={zone.id}
                onClick={() => unlocked && setSelectedZone(zone)}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                disabled={!unlocked}
                className={`
                  adventure-island island-${zone.id} 
                  ${!unlocked ? 'island-locked' : ''}
                  p-4 sm:p-6 text-white text-left min-h-[160px] sm:min-h-[200px]
                  flex flex-col justify-between
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Zone Icon & Lock */}
                <div className="flex items-start justify-between">
                  <span className={`text-4xl sm:text-5xl ${unlocked ? 'animate-float' : ''}`}>
                    {zone.icon}
                  </span>
                  {!unlocked && (
                    <div className="bg-black/30 rounded-full p-2">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {unlocked && (
                    <div className="bg-white/20 rounded-full px-2 py-1">
                      <span className="text-xs font-bold">
                        {zone.activities.length} games
                      </span>
                    </div>
                  )}
                </div>

                {/* Zone Info */}
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-1 drop-shadow-md">
                    {zone.name}
                  </h3>
                  {unlocked ? (
                    <p className="text-white/80 text-xs sm:text-sm line-clamp-2">
                      {zone.description}
                    </p>
                  ) : (
                    <p className="text-white/60 text-xs sm:text-sm">
                      🔒 Unlock at Level {zone.unlockLevel}
                    </p>
                  )}
                </div>

                {/* Hover Indicator */}
                {unlocked && isHovered && (
                  <div className="absolute inset-0 bg-white/10 rounded-3xl pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Challenge Card */}
      <div className="relative z-10 px-4 mt-4">
        <div className="daily-challenge max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-lg">Daily Challenge</span>
              </div>
              <p className="text-white/90 text-sm">
                Complete 3 activities today for bonus XP!
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">1/3</div>
              <div className="text-xs text-white/80">+100 XP bonus</div>
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white/60 rounded-full w-1/3 transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* Zone Detail Modal */}
      {selectedZone && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setSelectedZone(null)}
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zone Header */}
            <div className={`bg-gradient-to-r ${selectedZone.gradient} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 text-8xl opacity-20 -translate-y-4 translate-x-4">
                {selectedZone.icon}
              </div>
              <div className="relative z-10">
                <span className="text-5xl mb-3 block">{selectedZone.icon}</span>
                <h2 className="text-2xl font-bold mb-1">{selectedZone.name}</h2>
                <p className="text-white/80">{selectedZone.description}</p>
              </div>
            </div>

            {/* Activities List */}
            <div className="p-4 space-y-3">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Activities ({selectedZone.activities.length})
              </h3>

              {selectedZone.activities.map((activity) => {
                const stars = getActivityCompletion(activity.id);
                
                return (
                  <button
                    key={activity.id}
                    onClick={() => {
                      setSelectedZone(null);
                      onSelectActivity(activity.id);
                    }}
                    className={`
                      activity-card card-${selectedZone.id} w-full text-left
                      flex items-center gap-4 p-4
                      hover:bg-gray-50 active:scale-[0.98] transition-all
                    `}
                  >
                    {/* Activity Icon */}
                    <div className={`
                      w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedZone.gradient}
                      flex items-center justify-center text-3xl flex-shrink-0
                      shadow-lg
                    `}>
                      {activity.icon}
                    </div>

                    {/* Activity Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-800 truncate">
                          {activity.name}
                        </h4>
                        {renderStars(stars)}
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-1 mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">
                          {activity.duration}
                        </span>
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                          +{activity.xpReward} XP
                        </span>
                      </div>
                    </div>

                    {/* Play Arrow */}
                    <ChevronRight className="w-6 h-6 text-gray-300 flex-shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Close Button */}
            <div className="p-4 border-t">
              <button
                onClick={() => setSelectedZone(null)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Panda Mascot */}
      <div className="panda-mascot">
        <div className="panda-avatar">
          🐼
        </div>
        <div className="panda-speech">
          <p className="font-medium text-gray-800">
            Ready for an adventure? Pick a zone! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdventureWorld;

