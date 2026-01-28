import React, { useState } from 'react';
import { ChevronRight, Trophy, Zap } from 'lucide-react';
import { 
  ForestIcon, 
  CastleIcon, 
  OceanIcon, 
  VolcanoIcon,
  MazeIcon,
  WordSearchIcon,
  MemoryIcon,
  QuizIcon,
  SortingIcon,
  ColoringIcon,
  ConnectDotsIcon,
  MatchingIcon,
  PandaMascot,
  LockIcon,
  AdventureMapIcon,
  SparkleIcon,
  StarDecorativeIcon,
  CelebrationIcon
} from '../icons/ZoneIcons';

interface Zone {
  id: string;
  name: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  gradient: string;
  bgGradient: string;
  description: string;
  activities: Activity[];
  unlockLevel: number;
}

interface Activity {
  id: string;
  name: string;
  Icon: React.FC<{ size?: number; className?: string }>;
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
    Icon: ForestIcon,
    color: 'zone-forest',
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-400 via-green-500 to-emerald-600',
    description: 'Learn to protect your personal information',
    unlockLevel: 1,
    activities: [
      { id: 'maze', name: 'Safe Journey Maze', Icon: MazeIcon, description: 'Navigate safely through the digital world', xpReward: 50, duration: '5 min', difficulty: 'easy' },
      { id: 'wordsearch', name: 'Privacy Word Hunt', Icon: WordSearchIcon, description: 'Find important privacy words', xpReward: 40, duration: '4 min', difficulty: 'easy' },
    ]
  },
  {
    id: 'castle',
    name: 'Password Castle',
    Icon: CastleIcon,
    color: 'zone-castle',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-400 via-purple-500 to-violet-600',
    description: 'Master the art of strong passwords',
    unlockLevel: 2,
    activities: [
      { id: 'memory', name: 'Symbol Match', Icon: MemoryIcon, description: 'Match privacy symbols with meanings', xpReward: 60, duration: '6 min', difficulty: 'medium' },
      { id: 'matching', name: 'Security Pairs', Icon: MatchingIcon, description: 'Match security concepts', xpReward: 55, duration: '5 min', difficulty: 'medium' },
    ]
  },
  {
    id: 'ocean',
    name: 'Safe Surfing Sea',
    Icon: OceanIcon,
    color: 'zone-ocean',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-400 via-cyan-500 to-blue-600',
    description: 'Ride the waves of internet safety',
    unlockLevel: 3,
    activities: [
      { id: 'quiz', name: 'Privacy Quiz', Icon: QuizIcon, description: 'Test your privacy knowledge', xpReward: 75, duration: '8 min', difficulty: 'medium' },
      { id: 'sorting', name: 'Info Sorter', Icon: SortingIcon, description: 'Learn what info is safe to share', xpReward: 65, duration: '6 min', difficulty: 'medium' },
    ]
  },
  {
    id: 'volcano',
    name: 'Danger Detection',
    Icon: VolcanoIcon,
    color: 'zone-volcano',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-400 via-red-500 to-orange-600',
    description: 'Spot online dangers before they strike',
    unlockLevel: 4,
    activities: [
      { id: 'coloring', name: 'Privacy Panda Art', Icon: ColoringIcon, description: 'Color and learn about protection', xpReward: 45, duration: '10 min', difficulty: 'easy' },
      { id: 'connectdots', name: 'Shield Builder', Icon: ConnectDotsIcon, description: 'Connect dots to build your shield', xpReward: 50, duration: '5 min', difficulty: 'easy' },
    ]
  }
];

const AdventureWorld: React.FC<AdventureWorldProps> = ({ onSelectActivity, currentLevel, totalXp }) => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  
  // Get completion data for activities
  const getActivityCompletion = (activityId: string): number => {
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
          <svg
            key={star}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={count >= star ? '#FBBF24' : 'rgba(255,255,255,0.3)'}
            className="transition-all duration-300"
            style={{
              filter: count >= star ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))' : 'none'
            }}
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating clouds */}
        <div className="absolute top-[5%] left-[-100px] w-24 h-10 bg-white/80 rounded-full animate-[cloud-float_25s_linear_infinite]" />
        <div className="absolute top-[15%] left-[-150px] w-36 h-12 bg-white/70 rounded-full animate-[cloud-float_35s_linear_infinite_10s]" />
        <div className="absolute top-[8%] left-[-80px] w-20 h-8 bg-white/90 rounded-full animate-[cloud-float_30s_linear_infinite_5s]" />
        
        {/* Sparkles */}
        <div className="absolute top-[20%] right-[10%] text-yellow-400 text-2xl animate-sparkle">✦</div>
        <div className="absolute top-[40%] left-[5%] text-yellow-300 text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>✦</div>
        <div className="absolute top-[60%] right-[15%] text-yellow-400 text-lg animate-sparkle" style={{ animationDelay: '1s' }}>✦</div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="text-center mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 flex items-center justify-center gap-2">
            <AdventureMapIcon size={32} />
            Adventure World
          </h1>
          <p className="text-gray-600 text-sm">
            Explore zones and complete activities to level up!
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-yellow-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FBBF24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="font-bold text-gray-700">Level {currentLevel}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-amber-200">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
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
            const ZoneIcon = zone.Icon;
            
            return (
              <button
                key={zone.id}
                onClick={() => unlocked && setSelectedZone(zone)}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                disabled={!unlocked}
                className={`
                  relative rounded-3xl overflow-hidden
                  ${!unlocked ? 'grayscale brightness-75 cursor-not-allowed' : 'cursor-pointer'}
                  p-4 sm:p-5 text-white text-left min-h-[180px] sm:min-h-[220px]
                  flex flex-col justify-between
                  transition-all duration-400 ease-out
                  ${unlocked && isHovered ? 'transform -translate-y-2 scale-[1.02]' : ''}
                  shadow-xl hover:shadow-2xl
                `}
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${zone.bgGradient}`} />
                
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
                                      radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                  }} />
                </div>

                {/* Zone Icon & Lock */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className={`${unlocked ? 'animate-float' : ''}`}>
                    <ZoneIcon size={56} className="drop-shadow-lg" />
                  </div>
                  {!unlocked && (
                    <div className="bg-black/40 rounded-full p-2 backdrop-blur-sm">
                      <LockIcon size={20} className="text-white" />
                    </div>
                  )}
                  {unlocked && (
                    <div className="bg-white/25 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <span className="text-xs font-bold">
                        {zone.activities.length} games
                      </span>
                    </div>
                  )}
                </div>

                {/* Zone Info */}
                <div className="relative z-10 mt-auto">
                  <h3 className="font-bold text-lg sm:text-xl mb-1 drop-shadow-md">
                    {zone.name}
                  </h3>
                  {unlocked ? (
                    <p className="text-white/90 text-xs sm:text-sm line-clamp-2">
                      {zone.description}
                    </p>
                  ) : (
                    <p className="text-white/70 text-xs sm:text-sm flex items-center gap-1.5">
                      <LockIcon size={14} />
                      Unlock at Level {zone.unlockLevel}
                    </p>
                  )}
                </div>

                {/* Hover glow effect */}
                {unlocked && isHovered && (
                  <div className="absolute inset-0 bg-white/10 pointer-events-none" />
                )}
                
                {/* Bottom shadow for depth */}
                <div className="absolute bottom-0 left-[10%] right-[10%] h-4 bg-black/20 blur-xl rounded-full transform translate-y-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Challenge Card */}
      <div className="relative z-10 px-4 mt-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-5 text-white max-w-2xl mx-auto shadow-xl">
          {/* Sparkle decorations */}
          <div className="absolute top-2 right-3 animate-sparkle">
            <SparkleIcon size={24} />
          </div>
          <div className="absolute bottom-3 left-3 animate-sparkle" style={{ animationDelay: '0.5s' }}>
            <StarDecorativeIcon size={20} />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 6L12 12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="font-bold text-lg">Daily Challenge</span>
              </div>
              <p className="text-white/90 text-sm">
                Complete 3 activities today for bonus XP!
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">1/3</div>
              <div className="text-xs text-white/80">+100 XP bonus</div>
            </div>
          </div>
          <div className="relative z-10 mt-4 h-3 bg-white/25 rounded-full overflow-hidden">
            <div className="h-full bg-white/70 rounded-full w-1/3 transition-all duration-500" />
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
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto animate-slide-up shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zone Header */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${selectedZone.bgGradient} p-6 text-white`}>
              {/* Large decorative icon in background */}
              <div className="absolute top-0 right-0 opacity-20 transform translate-x-8 -translate-y-4">
                <selectedZone.Icon size={120} />
              </div>
              <div className="relative z-10">
                <div className="mb-3">
                  <selectedZone.Icon size={64} className="drop-shadow-lg" />
                </div>
                <h2 className="text-2xl font-bold mb-1">{selectedZone.name}</h2>
                <p className="text-white/85">{selectedZone.description}</p>
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
                const ActivityIcon = activity.Icon;
                
                return (
                  <button
                    key={activity.id}
                    onClick={() => {
                      setSelectedZone(null);
                      onSelectActivity(activity.id);
                    }}
                    className="w-full text-left flex items-center gap-4 p-4 bg-gray-50 rounded-2xl
                      hover:bg-gray-100 active:scale-[0.98] transition-all border-2 border-transparent
                      hover:border-gray-200 shadow-sm hover:shadow-md"
                  >
                    {/* Activity Icon */}
                    <div className="flex-shrink-0">
                      <ActivityIcon size={56} />
                    </div>

                    {/* Activity Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-bold text-gray-800">
                          {activity.name}
                        </h4>
                        {renderStars(stars)}
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-1 mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">
                          {activity.duration}
                        </span>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
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
      <div className="fixed bottom-24 right-4 z-40 hidden sm:block">
        <div className="relative">
          <div className="animate-bounce-slow">
            <PandaMascot size={70} />
          </div>
          <div className="absolute bottom-[80px] right-0 bg-white p-3 rounded-2xl shadow-lg max-w-[180px] animate-pop-in">
            <p className="font-medium text-gray-800 text-sm">
              Ready for an adventure? Pick a zone! 🎉
            </p>
            <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-white transform rotate-45 shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureWorld;
