import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, Gift, CheckCircle } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  xpReward: number;
  icon: string;
  completed: boolean;
}

interface DailyChallengeProps {
  challenges: Challenge[];
  timeRemaining: string;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ challenges, timeRemaining }) => {
  const navigate = useNavigate();
  const completedCount = challenges.filter(c => c.completed).length;
  const totalBonus = completedCount === challenges.length ? 100 : 0;

  return (
    <div className="daily-challenge relative overflow-hidden">
      {/* Sparkle decorations */}
      <div className="absolute top-2 right-2 text-2xl animate-sparkle">✨</div>
      <div className="absolute bottom-4 left-4 text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🎯</span>
            <h3 className="font-bold text-xl">Daily Challenges</h3>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            <span>Resets in {timeRemaining}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{completedCount}/{challenges.length}</div>
          <div className="text-xs text-white/80">Completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-white/60 rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / challenges.length) * 100}%` }}
        />
      </div>

      {/* Challenge List */}
      <div className="space-y-2">
        {challenges.map((challenge) => (
          <button
            key={challenge.id}
            onClick={() => navigate('/app/activities')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              challenge.completed 
                ? 'bg-white/10' 
                : 'bg-white/20 hover:bg-white/30 active:scale-[0.98]'
            }`}
          >
            <span className="text-2xl">{challenge.icon}</span>
            <div className="flex-1 text-left">
              <div className={`font-semibold text-sm ${challenge.completed ? 'line-through opacity-70' : ''}`}>
                {challenge.title}
              </div>
              <div className="text-xs text-white/70">
                {challenge.progress}/{challenge.total} • +{challenge.xpReward} XP
              </div>
            </div>
            {challenge.completed ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <ChevronRight className="w-5 h-5 text-white/60" />
            )}
          </button>
        ))}
      </div>

      {/* Bonus Reward */}
      {completedCount === challenges.length && (
        <div className="mt-4 p-3 bg-white/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">All Complete Bonus!</span>
          </div>
          <span className="font-bold text-yellow-300">+{totalBonus} XP</span>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;

