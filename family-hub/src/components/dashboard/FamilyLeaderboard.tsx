import React from 'react';
import { Crown, TrendingUp, Medal } from 'lucide-react';
import { NavFamilyIcon } from '../icons/ZoneIcons';

interface FamilyMember {
  id: number;
  name: string;
  score: number;
  level: number;
  activitiesToday: number;
  avatar: string;
  trend: 'up' | 'down' | 'same';
}

interface FamilyLeaderboardProps {
  members: FamilyMember[];
}

const FamilyLeaderboard: React.FC<FamilyLeaderboardProps> = ({ members }) => {
  const sortedMembers = [...members].sort((a, b) => b.score - a.score);

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${position + 1}`;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <span className="w-4 h-4 text-gray-400">−</span>;
    }
  };

  if (members.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md text-center">
        <div className="mb-3 flex justify-center">
          <NavFamilyIcon size={48} />
        </div>
        <h3 className="font-bold text-gray-700 mb-2">No Family Members Yet</h3>
        <p className="text-sm text-gray-500">
          Add family members to see the leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6" />
          <h3 className="font-bold text-lg">Family Leaderboard</h3>
        </div>
        <p className="text-white/80 text-sm mt-1">
          Who's leading the privacy adventure?
        </p>
      </div>

      {/* Leaderboard List */}
      <div className="p-3">
        {sortedMembers.map((member, index) => (
          <div
            key={member.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              index === 0 
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200' 
                : 'hover:bg-gray-50'
            }`}
          >
            {/* Position */}
            <div className={`text-xl font-bold w-8 text-center ${
              index === 0 ? 'text-2xl' : ''
            }`}>
              {getMedalEmoji(index)}
            </div>

            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md ${
              index === 0 ? 'ring-4 ring-amber-300' : ''
            }`}>
              {member.avatar || member.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800 truncate">
                  {member.name}
                </span>
                {index === 0 && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                    Leader
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Level {member.level}</span>
                <span>•</span>
                <span>{member.activitiesToday} activities today</span>
              </div>
            </div>

            {/* Score & Trend */}
            <div className="text-right">
              <div className="font-bold text-gray-800">{member.score}</div>
              <div className="flex items-center gap-1 justify-end">
                {getTrendIcon(member.trend)}
                <span className="text-xs text-gray-500">pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyLeaderboard;

