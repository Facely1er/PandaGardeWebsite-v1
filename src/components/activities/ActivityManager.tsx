import React, { useState } from 'react';
import ColoringActivity from './ColoringActivity';
import DragDropActivity from './DragDropActivity';
import MazeActivity from './MazeActivity';
import WordSearchActivity from './WordSearchActivity';
import ConnectDotsActivity from './ConnectDotsActivity';
import MatchingActivity from './MatchingActivity';

interface ActivityManagerProps {
  activityId: string;
  onClose: () => void;
  onComplete: (activityId: string) => void;
}

const ActivityManager: React.FC<ActivityManagerProps> = ({ activityId, onClose, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(activityId);
  };

  const renderActivity = () => {
    switch (activityId) {
      case 'coloring':
        return <ColoringActivity onComplete={handleComplete} onClose={onClose} />;
      case 'sorting':
        return <DragDropActivity onComplete={handleComplete} onClose={onClose} />;
      case 'maze':
        return <MazeActivity onComplete={handleComplete} onClose={onClose} />;
      case 'wordsearch':
        return <WordSearchActivity onComplete={handleComplete} onClose={onClose} />;
      case 'connectdots':
        return <ConnectDotsActivity onComplete={handleComplete} onClose={onClose} />;
      case 'matching':
        return <MatchingActivity onComplete={handleComplete} onClose={onClose} />;
      default:
        return <div>Activity not found</div>;
    }
  };

  return (
    <div className="activity-manager">
      {renderActivity()}
    </div>
  );
};

export default ActivityManager;