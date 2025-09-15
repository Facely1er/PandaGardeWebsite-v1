import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

// Lazy load activity components
const ColoringActivity = lazy(() => import('./ColoringActivity'));
const DragDropActivity = lazy(() => import('./DragDropActivity'));
const MazeActivity = lazy(() => import('./MazeActivity'));
const WordSearchActivity = lazy(() => import('./WordSearchActivity'));
const ConnectDotsActivity = lazy(() => import('./ConnectDotsActivity'));
const MatchingActivity = lazy(() => import('./MatchingActivity'));

interface ActivityManagerProps {
  activityId: string;
  onClose: () => void;
  onComplete: (activityId: string) => void;
}

const ActivityManager: React.FC<ActivityManagerProps> = ({ activityId, onClose, onComplete }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { markActivityCompleted, getActivityProgress } = useProgress();
  const { showSuccess, showError } = useToast();
  const { user } = useAuth();

  const activityInstructions = {
    coloring: {
      title: "Privacy Panda Coloring Activity",
      description: "Color the Privacy Panda and learn about protecting your digital treasure!",
      instructions: [
        "Choose a color from the palette",
        "Click and drag to color the panda and shield",
        "Adjust brush size if needed",
        "Click 'Check Complete' when you're done coloring",
        "Download your artwork to save it!"
      ],
      tips: "Take your time and be creative! The more you color, the better you'll understand privacy protection."
    },
    sorting: {
      title: "Information Sorting Game",
      description: "Learn what information is safe to share and what should be kept private.",
      instructions: [
        "Drag each item to the correct category",
        "Green zone: Safe to Share (things you can tell friends)",
        "Red zone: Keep Private (personal information to protect)",
        "Click 'Check Answer' when you're done sorting",
        "Try to get 100% correct!"
      ],
      tips: "Think about what information strangers could use to find you or pretend to be you."
    },
    maze: {
      title: "Safe Online Journey Maze",
      description: "Help Privacy Panda navigate safely through the digital world.",
      instructions: [
        "Use arrow keys or touch to move the panda",
        "Avoid the red danger zones",
        "Collect green privacy shields",
        "Reach the finish line safely",
        "Try to collect all shields for bonus points!"
      ],
      tips: "Move carefully and plan your path. Real online safety requires thinking ahead!"
    },
    wordsearch: {
      title: "Privacy Word Search",
      description: "Find important privacy words hidden in the puzzle.",
      instructions: [
        "Look for the words listed below the puzzle",
        "Click and drag to highlight words",
        "Words can go in any direction",
        "Find all words to complete the activity",
        "Take your time - there's no rush!"
      ],
      tips: "These words are important for understanding digital privacy. Remember them!"
    },
    connectdots: {
      title: "Privacy Shield Connect-the-Dots",
      description: "Connect the dots to reveal Privacy Panda's protection shield.",
      instructions: [
        "Click on the dots in numerical order",
        "Start with dot 1 and work your way up",
        "Complete the shield outline",
        "Color the shield when you're done",
        "The shield represents your privacy protection!"
      ],
      tips: "Take your time and follow the numbers carefully. The shield protects your information!"
    },
    matching: {
      title: "Privacy Symbol Matching",
      description: "Match privacy symbols with their meanings to learn digital safety signs.",
      instructions: [
        "Click on a symbol card to flip it",
        "Click on another card to see if they match",
        "Match all pairs to complete the activity",
        "Remember what each symbol means",
        "Try to complete it in as few moves as possible!"
      ],
      tips: "These symbols appear on websites and apps. Knowing them helps you stay safe online!"
    }
  };

  const currentActivity = activityInstructions[activityId as keyof typeof activityInstructions];

  useEffect(() => {
    // Show instructions for new activities
    setShowInstructions(true);
  }, [activityId]);

  const handleComplete = async (score?: number) => {
    const timeSpent = startTime ? Math.round((Date.now() - startTime.getTime()) / 1000) : 0;
    
    try {
      await markActivityCompleted(activityId, score, timeSpent);
      showSuccess('Activity Completed!', 'Great job! Your progress has been saved.');
      onComplete(activityId);
    } catch (err) {
      showError('Error', 'Failed to save progress. Please try again.');
    }
  };

  const handleStart = async () => {
    setStartTime(new Date());
    setShowInstructions(false);
  };

  const handleRestart = () => {
    setShowInstructions(true);
  };

  const renderActivity = () => {
    const activityProps = { onComplete: handleComplete, onClose: onClose };

    switch (activityId) {
      case 'coloring':
        return (
          <Suspense fallback={<div className="loading-spinner">Loading coloring activity...</div>}>
            <ColoringActivity {...activityProps} />
          </Suspense>
        );
      case 'sorting':
        return (
          <Suspense fallback={<div className="loading-spinner">Loading sorting activity...</div>}>
            <DragDropActivity {...activityProps} />
          </Suspense>
        );
      case 'maze':
        return (
          <Suspense fallback={<div className="loading-spinner">Loading maze activity...</div>}>
            <MazeActivity {...activityProps} />
          </Suspense>
        );
      case 'wordsearch':
        return (
          <Suspense fallback={<div className="loading-spinner">Loading word search activity...</div>}>
            <WordSearchActivity {...activityProps} />
          </Suspense>
        );
      case 'connectdots':
        return (
          <Suspense fallback={<div className="loading-spinner">Loading connect dots activity...</div>}>
            <ConnectDotsActivity {...activityProps} />
          </Suspense>
        );
      case 'matching':
        return (
          <Suspense fallback={<div className="loading-spinner">Loading matching activity...</div>}>
            <MatchingActivity {...activityProps} />
          </Suspense>
        );
      default:
        return <div>Activity not found</div>;
    }
  };

  return (
    <div className="activity-manager">
      {showInstructions && currentActivity ? (
        <div className="activity-instructions">
          <div className="instructions-header">
            <h2 className="instructions-title">{currentActivity.title}</h2>
            <button onClick={onClose} className="close-button">×</button>
          </div>

          <div className="instructions-content">
            <div className="instructions-description">
              <p>{currentActivity.description}</p>
            </div>

            <div className="instructions-steps">
              <h3>How to Play:</h3>
              <ol>
                {currentActivity.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="instructions-tips">
              <h3>💡 Tip:</h3>
              <p>{currentActivity.tips}</p>
            </div>

            <div className="instructions-actions">
            <button onClick={handleStart} className="start-button" aria-label="Start the activity">
              <Play size={20} />
              Start Activity
            </button>
            <button onClick={onClose} className="cancel-button" aria-label="Cancel and close activity">
              Cancel
            </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="activity-container">
          <div className="activity-header">
            <h2 className="activity-title">{currentActivity?.title}</h2>
            <div className="activity-controls">
              <button onClick={handleRestart} className="restart-button" title="Restart Activity" aria-label="Restart the activity">
                <RotateCcw size={20} />
              </button>
              <button onClick={onClose} className="close-button" aria-label="Close activity">×</button>
            </div>
          </div>
          {renderActivity()}
        </div>
      )}

      <style jsx>{`
        .activity-manager {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .activity-instructions {
          background: white;
          margin: 20px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          margin: 20px auto;
        }

        .instructions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          background: #f8f9fa;
          border-radius: 12px 12px 0 0;
        }

        .instructions-title {
          margin: 0;
          color: #2C3E50;
          font-size: 24px;
        }

        .instructions-content {
          padding: 20px;
        }

        .instructions-description {
          margin-bottom: 20px;
        }

        .instructions-description p {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
        }

        .instructions-steps {
          margin-bottom: 20px;
        }

        .instructions-steps h3 {
          color: #2C3E50;
          margin-bottom: 10px;
        }

        .instructions-steps ol {
          padding-left: 20px;
        }

        .instructions-steps li {
          margin-bottom: 8px;
          color: #666;
          line-height: 1.5;
        }

        .instructions-tips {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .instructions-tips h3 {
          margin: 0 0 8px 0;
          color: #856404;
          font-size: 16px;
        }

        .instructions-tips p {
          margin: 0;
          color: #856404;
          font-style: italic;
        }

        .instructions-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .start-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .start-button:hover {
          background: #45a049;
        }

        .cancel-button {
          background: #f5f5f5;
          color: #666;
          border: 1px solid #ddd;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cancel-button:hover {
          background: #e0e0e0;
        }

        .activity-container {
          background: white;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        .activity-title {
          margin: 0;
          color: #2C3E50;
          font-size: 20px;
        }

        .activity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .restart-button {
          background: #f5f5f5;
          border: 1px solid #ddd;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          color: #666;
          transition: background 0.2s;
        }

        .restart-button:hover {
          background: #e0e0e0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 4px;
        }

        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          font-size: 16px;
          color: #666;
        }

        .loading-spinner::before {
          content: '';
          width: 20px;
          height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }

        @media (max-width: 768px) {
          .activity-instructions {
            margin: 10px;
            max-height: 90vh;
          }

          .instructions-header {
            padding: 15px;
          }

          .instructions-title {
            font-size: 20px;
          }

          .instructions-content {
            padding: 15px;
          }

          .instructions-actions {
            flex-direction: column;
          }

          .start-button,
          .cancel-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ActivityManager;