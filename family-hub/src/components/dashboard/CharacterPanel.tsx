import React from 'react';
import { Zap } from 'lucide-react';
import { PandaMascot, FireIcon, StarIcon, TrophyIcon } from '../icons/ZoneIcons';

interface CharacterPanelProps {
  name: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
  streak: number;
  badges: number;
  rank: string;
}

const CharacterPanel: React.FC<CharacterPanelProps> = ({
  name,
  level,
  currentXp,
  xpToNextLevel,
  totalXp,
  streak,
  badges,
  rank,
}) => {
  const xpProgress = (currentXp / xpToNextLevel) * 100;

  return (
    <div className="character-panel">
      {/* Header with Avatar and Level */}
      <div className="flex items-center gap-4 mb-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-xl overflow-hidden">
            <PandaMascot size={80} />
          </div>
          {/* Level Badge */}
          <div className="level-badge absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 text-sm">
            {level}
          </div>
        </div>

        {/* Name and Rank */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 drop-shadow-md">
            {name || 'Privacy Hero'}
          </h2>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {rank}
            </span>
            {streak > 1 && (
              <span className="flex items-center gap-1 bg-orange-500/30 px-2 py-1 rounded-full text-xs font-bold">
                <Flame className="w-3 h-3 streak-fire" />
                {streak} day streak!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="flex items-center gap-1.5 font-medium">
            <Zap className="w-4 h-4 text-yellow-300" />
            Experience Points
          </span>
          <span className="font-bold">
            {currentXp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-bar-container">
          <div 
            className="xp-bar-fill"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs mt-1.5 opacity-80">
          <span>Level {level}</span>
          <span>{Math.round(xpProgress)}% to Level {level + 1}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-badge">
          <div className="mb-1 flex justify-center">
            <FireIcon size={28} />
          </div>
          <div className="text-lg sm:text-xl font-bold">{streak}</div>
          <div className="text-xs opacity-80">Day Streak</div>
        </div>
        <div className="stat-badge">
          <div className="mb-1 flex justify-center">
            <StarIcon size={28} />
          </div>
          <div className="text-lg sm:text-xl font-bold">{totalXp.toLocaleString()}</div>
          <div className="text-xs opacity-80">Total XP</div>
        </div>
        <div className="stat-badge">
          <div className="mb-1 flex justify-center">
            <TrophyIcon size={28} />
          </div>
          <div className="text-lg sm:text-xl font-bold">{badges}</div>
          <div className="text-xs opacity-80">Badges</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPanel;

