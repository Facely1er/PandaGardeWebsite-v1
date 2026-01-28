import React from 'react';
import { Award, Clock, ChevronRight } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  xpEarned: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface RecentAchievementsProps {
  achievements: Achievement[];
  onViewAll?: () => void;
}

const RecentAchievements: React.FC<RecentAchievementsProps> = ({ achievements, onViewAll }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-amber-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-amber-400 animate-pulse-glow';
      default: return 'border-gray-300';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (achievements.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md text-center">
        <div className="text-4xl mb-3">🏆</div>
        <h3 className="font-bold text-gray-700 mb-2">No Achievements Yet</h3>
        <p className="text-sm text-gray-500">
          Complete activities to earn awesome badges!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          <h3 className="font-bold text-gray-700">Recent Achievements</h3>
        </div>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Achievement List */}
      <div className="p-3 space-y-2">
        {achievements.slice(0, 4).map((achievement, index) => (
          <div
            key={achievement.id}
            className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 border-2 ${getRarityBorder(achievement.rarity)} transition-all hover:shadow-md`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} flex items-center justify-center text-3xl shadow-lg`}>
              {achievement.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-800 truncate">
                {achievement.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-1">
                {achievement.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                  achievement.rarity === 'legendary' ? 'bg-amber-100 text-amber-700' :
                  achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                  achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {achievement.rarity}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(achievement.earnedAt)}
                </span>
              </div>
            </div>

            {/* XP Badge */}
            <div className="text-right">
              <span className="text-sm font-bold text-yellow-600">
                +{achievement.xpEarned}
              </span>
              <div className="text-xs text-gray-400">XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAchievements;

