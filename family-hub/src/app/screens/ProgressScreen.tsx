import React, { useState } from 'react';
import { X, Trophy, Star, Flame, Target, CheckCircle, Lock } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import CertificateGenerator from '../../components/CertificateGenerator';
import ProgressExport from '../../components/ProgressExport';
import { 
  BadgeFirstSteps, 
  BadgeExplorer, 
  BadgeStreak, 
  BadgeSpeedDemon,
  LockIcon 
} from '../../components/icons/ZoneIcons';

interface Badge {
  id: string;
  name: string;
  icon: string;
  IconComponent?: React.FC<{ size?: number; className?: string }>;
  description: string;
  earned: boolean;
  earnedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface PlayerProgress {
  level: number;
  totalXp: number;
  xpToNextLevel: number;
  currentXp: number;
  completedActivities: string[];
  dailyStreak: number;
  lastPlayedDate: string;
}

const allBadges: Badge[] = [
  { id: 'first-steps', name: 'First Steps', icon: '🎉', IconComponent: BadgeFirstSteps, description: 'Complete your first activity', earned: true, earnedAt: new Date().toISOString(), rarity: 'common' },
  { id: 'explorer', name: 'Explorer', icon: '🗺️', IconComponent: BadgeExplorer, description: 'Visit all adventure zones', earned: true, earnedAt: new Date().toISOString(), rarity: 'rare' },
  { id: 'streak-3', name: 'Consistent', icon: '🔥', IconComponent: BadgeStreak, description: 'Maintain a 3-day streak', earned: true, earnedAt: new Date().toISOString(), rarity: 'common' },
  { id: 'quiz-master', name: 'Quiz Master', icon: '🧠', description: 'Score 100% on a quiz', earned: false, rarity: 'rare' },
  { id: 'privacy-pro', name: 'Privacy Pro', icon: '🛡️', description: 'Complete all privacy activities', earned: false, rarity: 'epic' },
  { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', IconComponent: BadgeSpeedDemon, description: 'Complete an activity in under 2 minutes', earned: true, earnedAt: new Date().toISOString(), rarity: 'rare' },
  { id: 'perfectionist', name: 'Perfectionist', icon: '💎', description: 'Get 3 stars on 5 activities', earned: false, rarity: 'epic' },
  { id: 'legend', name: 'Privacy Legend', icon: '👑', description: 'Reach Level 20', earned: false, rarity: 'legendary' },
  { id: 'helper', name: 'Family Helper', icon: '🤝', description: 'Help 3 family members', earned: false, rarity: 'rare' },
  { id: 'collector', name: 'Badge Collector', icon: '📚', description: 'Earn 10 badges', earned: false, rarity: 'epic' },
  { id: 'streak-7', name: 'Weekly Warrior', icon: '💪', description: 'Maintain a 7-day streak', earned: false, rarity: 'epic' },
  { id: 'champion', name: 'Privacy Champion', icon: '🏆', description: 'Complete all activities with 3 stars', earned: false, rarity: 'legendary' },
];

const ProgressScreen: React.FC = () => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [showProgressExport, setShowProgressExport] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  
  const [playerProgress] = useLocalStorage<PlayerProgress>('pandagarde_player_progress', {
    level: 1,
    totalXp: 0,
    xpToNextLevel: 100,
    currentXp: 0,
    completedActivities: [],
    dailyStreak: 1,
    lastPlayedDate: new Date().toISOString().split('T')[0],
  });

  const earnedBadges = allBadges.filter(b => b.earned);
  const lockedBadges = allBadges.filter(b => !b.earned);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-amber-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100';
      case 'rare': return 'bg-blue-100';
      case 'epic': return 'bg-purple-100';
      case 'legendary': return 'bg-gradient-to-br from-amber-100 to-orange-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-20">🏆</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-20">⭐</div>
        </div>

        <div className="relative z-10 px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Rewards & Progress</h1>
              <p className="text-white/80 text-sm">Your achievements and badges</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{playerProgress.level}</div>
              <div className="text-xs text-white/80">Level</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{earnedBadges.length}</div>
              <div className="text-xs text-white/80">Badges</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <Flame className="w-5 h-5" />
                {playerProgress.dailyStreak}
              </div>
              <div className="text-xs text-white/80">Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowCertificates(true)}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-[0.98] border-2 border-transparent hover:border-amber-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl mb-3 shadow-lg">
              🎖️
            </div>
            <h3 className="font-bold text-gray-800">Certificates</h3>
            <p className="text-xs text-gray-500">Download your achievements</p>
          </button>

          <button
            onClick={() => setShowProgressExport(true)}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-[0.98] border-2 border-transparent hover:border-blue-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl mb-3 shadow-lg">
              📊
            </div>
            <h3 className="font-bold text-gray-800">Export Data</h3>
            <p className="text-xs text-gray-500">Save your progress</p>
          </button>
        </div>

        {/* Earned Badges */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-gray-800">Earned Badges ({earnedBadges.length})</h2>
          </div>

          <div className="badge-grid">
            {earnedBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`badge-item earned ${getRarityBg(badge.rarity)} transition-all hover:scale-110 hover:rotate-3`}
              >
                {badge.IconComponent ? (
                  <badge.IconComponent size={44} />
                ) : (
                  <span className="text-3xl">{badge.icon}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-gray-400" />
            <h2 className="font-bold text-gray-800">Locked Badges ({lockedBadges.length})</h2>
          </div>

          <div className="badge-grid">
            {lockedBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="badge-item locked transition-all hover:scale-105 relative"
              >
                {badge.IconComponent ? (
                  <badge.IconComponent size={44} />
                ) : (
                  <span className="text-3xl">{badge.icon}</span>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/30 rounded-2xl">
                  <LockIcon size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-500" />
            <h2 className="font-bold text-gray-800">Your Journey</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Activities Completed</span>
                <span className="font-bold text-gray-800">{playerProgress.completedActivities.length}/8</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(playerProgress.completedActivities.length / 8) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Badge Progress</span>
                <span className="font-bold text-gray-800">{earnedBadges.length}/{allBadges.length}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${(earnedBadges.length / allBadges.length) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">XP to Next Level</span>
                <span className="font-bold text-gray-800">{playerProgress.currentXp || 0}/{playerProgress.xpToNextLevel}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${((playerProgress.currentXp || 0) / playerProgress.xpToNextLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Badge Header */}
            <div className={`bg-gradient-to-br ${getRarityColor(selectedBadge.rarity)} p-8 text-center text-white`}>
              <div className={`mb-4 flex justify-center ${selectedBadge.earned ? 'animate-bounce-slow' : 'grayscale opacity-50'}`}>
                {selectedBadge.IconComponent ? (
                  <selectedBadge.IconComponent size={96} />
                ) : (
                  <span className="text-7xl">{selectedBadge.icon}</span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-1">{selectedBadge.name}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                selectedBadge.rarity === 'legendary' ? 'bg-white/30' :
                'bg-white/20'
              }`}>
                {selectedBadge.rarity}
              </span>
            </div>

            {/* Badge Details */}
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">{selectedBadge.description}</p>
              
              {selectedBadge.earned ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Earned!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Lock className="w-5 h-5" />
                  <span className="font-medium">Keep playing to unlock</span>
                </div>
              )}

              <button
                onClick={() => setSelectedBadge(null)}
                className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificates Modal */}
      {showCertificates && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setShowCertificates(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Certificate Generator
              </h2>
              <CertificateGenerator />
            </div>
          </div>
        </div>
      )}

      {/* Progress Export Modal */}
      {showProgressExport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setShowProgressExport(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Export Progress
              </h2>
              <ProgressExport onClose={() => setShowProgressExport(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressScreen;
