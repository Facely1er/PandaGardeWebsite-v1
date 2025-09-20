import React from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  label?: string;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  maxScore = 100,
  label = 'Score',
  showIcon = true,
  size = 'medium',
  animated = false
}) => {
  const percentage = Math.min((score / maxScore) * 100, 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = () => {
    if (percentage >= 90) return <Trophy className="w-5 h-5" />;
    if (percentage >= 70) return <Star className="w-5 h-5" />;
    if (percentage >= 50) return <Target className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'text-sm',
          score: 'text-lg',
          icon: 'w-4 h-4'
        };
      case 'large':
        return {
          container: 'text-lg',
          score: 'text-3xl',
          icon: 'w-8 h-8'
        };
      default:
        return {
          container: 'text-base',
          score: 'text-2xl',
          icon: 'w-6 h-6'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={`flex items-center gap-3 ${sizeClasses.container} ${animated ? 'animate-pulse' : ''}`}>
      {showIcon && (
        <div className={`${getScoreColor()} ${sizeClasses.icon}`}>
          {getScoreIcon()}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className={`font-bold ${getScoreColor()} ${sizeClasses.score}`}>
          {score}
          {maxScore && (
            <span className="text-gray-400 text-sm ml-1">
              /{maxScore}
            </span>
          )}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="flex-1 max-w-xs">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              percentage >= 80 ? 'bg-green-500' :
              percentage >= 60 ? 'bg-yellow-500' :
              percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          {Math.round(percentage)}%
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;