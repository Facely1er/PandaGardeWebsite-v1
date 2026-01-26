import React, { useState, useEffect, Suspense, lazy, ErrorInfo, Component } from 'react';
import { createPortal } from 'react-dom';
import { Play, RotateCcw, AlertCircle } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { useToast } from '../../contexts/ToastContext';
// import { useAuth } from '../../contexts/AuthContext';

// Lazy load activity components
const ColoringActivity = lazy(() => import('./ColoringActivity'));
const DragDropActivity = lazy(() => import('./DragDropActivity'));
const MazeActivity = lazy(() => import('./MazeActivity'));
const WordSearchActivity = lazy(() => import('./WordSearchActivity'));
const ConnectDotsActivity = lazy(() => import('./ConnectDotsActivity'));
const MatchingActivity = lazy(() => import('./MatchingActivity'));
const MemoryGameActivity = lazy(() => import('./MemoryGameActivity'));
const QuizActivity = lazy(() => import('./QuizActivity'));

interface ActivityManagerProps {
  activityId: string;
  onClose: () => void;
  onComplete: (activityId: string, score?: number) => void;
}

// Error Boundary Component for Activities
class ActivityErrorBoundary extends Component<
  { children: React.ReactNode; activityName: string; onClose: () => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; activityName: string; onClose: () => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Activity Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="text-red-500 dark:text-red-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Activity Error
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
            Sorry, there was an error loading the {this.props.activityName} activity. Please try again or select a different activity.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
            >
              Reload Activity
            </button>
            <button
              onClick={this.props.onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ActivityManager: React.FC<ActivityManagerProps> = ({ activityId, onClose, onComplete }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { markActivityCompleted } = useProgress();
  const { showSuccess, showError } = useToast();

  const activityInstructions = {
    coloring: {
      title: "Privacy Panda Coloring Activity",
      description: "Color the Privacy Panda and learn about protecting your digital treasure! This activity teaches you about the importance of keeping your personal information safe online.",
      instructions: [
        "Choose a color from the palette",
        "Click and drag to color the panda and shield",
        "Adjust brush size if needed",
        "Click 'Check Complete' when you're done coloring",
        "Download your artwork to save it!"
      ],
      tips: "Take your time and be creative! The more you color, the better you'll understand privacy protection. The shield represents how we protect our personal information online."
    },
    sorting: {
      title: "Information Sorting Game",
      description: "Learn what information is safe to share and what should be kept private. This activity helps you understand the difference between public and private information.",
      instructions: [
        "Drag each item to the correct category",
        "Green zone: Safe to Share (things you can tell friends)",
        "Red zone: Keep Private (personal information to protect)",
        "Click 'Check Answer' when you're done sorting",
        "Try to get 100% correct!"
      ],
      tips: "Think about what information strangers could use to find you or pretend to be you. Personal details like your full name, address, and phone number should always be kept private."
    },
    maze: {
      title: "Safe Online Journey Maze",
      description: "Help Privacy Panda navigate safely through the digital world. Learn to identify online dangers and make safe choices.",
      instructions: [
        "Use arrow keys or touch to move the panda",
        "Avoid the red danger zones (like suspicious websites)",
        "Collect green privacy shields (safe practices)",
        "Reach the finish line safely",
        "Try to collect all shields for bonus points!"
      ],
      tips: "Move carefully and plan your path. Real online safety requires thinking ahead! The red zones represent dangerous websites or situations you should avoid."
    },
    wordsearch: {
      title: "Privacy Word Search",
      description: "Find important privacy words hidden in the puzzle. Learn key vocabulary that helps you understand online safety.",
      instructions: [
        "Look for the words listed below the puzzle",
        "Click and drag to highlight words",
        "Words can go in any direction",
        "Find all words to complete the activity",
        "Take your time - there's no rush!"
      ],
      tips: "These words are important for understanding digital privacy. Words like 'password', 'secure', and 'privacy' help you stay safe online!"
    },
    connectdots: {
      title: "Privacy Shield Connect-the-Dots",
      description: "Connect the dots to reveal Privacy Panda's protection shield. Learn about the importance of protecting your personal information.",
      instructions: [
        "Click on the dots in numerical order",
        "Start with dot 1 and work your way up",
        "Complete the shield outline",
        "Color the shield when you're done",
        "The shield represents your privacy protection!"
      ],
      tips: "Take your time and follow the numbers carefully. The shield represents how we protect our personal information from strangers online!"
    },
    matching: {
      title: "Privacy Symbol Matching",
      description: "Match privacy symbols with their meanings to learn digital safety signs. These symbols help you identify safe and secure websites.",
      instructions: [
        "Click on a symbol card to flip it",
        "Click on another card to see if they match",
        "Match all pairs to complete the activity",
        "Remember what each symbol means",
        "Try to complete it in as few moves as possible!"
      ],
      tips: "These symbols appear on websites and apps. The lock symbol means a website is secure, and the warning symbol means you should be careful!"
    },
    memory: {
      title: "Privacy Memory Game",
      description: "Test your memory by matching privacy symbols with their meanings! This game helps you remember important online safety concepts.",
      instructions: [
        "Click on cards to flip them and see what's underneath",
        "Find matching pairs of symbols and meanings",
        "Remember where cards are located",
        "Complete all pairs to win the game",
        "Try to finish in as few moves as possible!"
      ],
      tips: "This game helps you remember important privacy symbols and what they mean. The better you remember these symbols, the safer you'll be online!"
    },
    quiz: {
      title: "Privacy Knowledge Quiz",
      description: "Test your knowledge about online privacy and safety! This quiz helps you learn important concepts about staying safe online.",
      instructions: [
        "Read each question carefully",
        "Choose the best answer from the options",
        "You have 30 seconds per question",
        "Learn from the explanations after each answer",
        "Try to get as many correct as possible!"
      ],
      tips: "This quiz helps you learn important privacy concepts. Don't worry if you get some wrong - you'll learn from the explanations and become safer online!"
    }
  };

  const currentActivity = activityInstructions[activityId as keyof typeof activityInstructions];

  useEffect(() => {
    // Show instructions for new activities
    setShowInstructions(true);
    setStartTime(null);
  }, [activityId]);

  // Validate activity ID
  if (!currentActivity) {
    return (
      <>
        <div className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-40" onClick={onClose} />
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-scaleIn text-center">
            <AlertCircle className="text-red-500 dark:text-red-400 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Activity Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The activity "{activityId}" could not be found. Please try selecting a different activity.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors min-h-[44px]"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleComplete = async (score?: number) => {
    const timeSpent = startTime ? Math.round((Date.now() - startTime.getTime()) / 1000) : 0;
    
    try {
      await markActivityCompleted(activityId, score, timeSpent);
      const scoreMessage = score !== undefined ? ` You scored ${score}%!` : '';
      showSuccess('Activity Completed!', `Great job! Your progress has been saved.${scoreMessage}`);
      onComplete(activityId, score);
    } catch {
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
    const activityName = currentActivity?.title || 'activity';

    const LoadingFallback = () => (
      <div className="flex items-center justify-center min-h-[500px] w-full bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 dark:border-teal-400 mx-auto mb-4"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading activity...</span>
        </div>
      </div>
    );

    switch (activityId) {
      case 'coloring':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <ColoringActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      case 'sorting':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <DragDropActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      case 'maze':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <MazeActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      case 'wordsearch':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <WordSearchActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      case 'connectdots':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <ConnectDotsActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      case 'matching':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <MatchingActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      case 'memory':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <MemoryGameActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      case 'quiz':
        return (
          <ActivityErrorBoundary activityName={activityName} onClose={onClose}>
            <Suspense fallback={<LoadingFallback />}>
              <QuizActivity {...activityProps} />
            </Suspense>
          </ActivityErrorBoundary>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[500px] w-full bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <p className="text-lg font-semibold mb-2">Activity not found</p>
            <p className="text-sm">Please try selecting a different activity.</p>
            <p className="text-xs mt-2 text-gray-400">Activity ID: {activityId}</p>
          </div>
        );
    }
  };

  const activityContent = (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-[90]" onClick={onClose} />
      
      {/* Content */}
      <div className="fixed inset-0 flex flex-col z-[100] pointer-events-none">
        {showInstructions && currentActivity ? (
          <div className="pointer-events-auto bg-white dark:bg-gray-800 rounded-2xl mx-auto my-5 max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-scaleIn">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentActivity.title}</h2>
              <button 
                onClick={() => {
                  if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                  }
                  onClose();
                }} 
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl leading-none p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{currentActivity.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How to Play:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {currentActivity.instructions.map((instruction, index) => (
                    <li key={index} className="leading-relaxed">{instruction}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
                <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300 mb-2">💡 Tip:</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 italic leading-relaxed">{currentActivity.tips}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => {
                    if ('vibrate' in navigator) {
                      navigator.vibrate(15);
                    }
                    handleStart();
                  }} 
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 min-h-[44px]"
                  aria-label="Start the activity"
                >
                  <Play size={20} />
                  Start Activity
                </button>
                <button 
                  onClick={() => {
                    if ('vibrate' in navigator) {
                      navigator.vibrate(10);
                    }
                    onClose();
                  }} 
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-95 min-h-[44px]"
                  aria-label="Cancel and close activity"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="pointer-events-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 h-full w-full flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10 flex-shrink-0 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {currentActivity?.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    if ('vibrate' in navigator) {
                      navigator.vibrate(10);
                    }
                    handleRestart();
                  }} 
                  className="p-2.5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border border-gray-300/50 dark:border-gray-600/50 rounded-xl text-gray-700 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                  title="Restart Activity" 
                  aria-label="Restart the activity"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={() => {
                    if ('vibrate' in navigator) {
                      navigator.vibrate(10);
                    }
                    onClose();
                  }} 
                  className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 active:scale-95"
                  aria-label="Close activity"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50 min-h-0 w-full">
              <div className="w-full min-h-full">
                {renderActivity()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // Use portal to render at document root to avoid stacking context issues
  return createPortal(activityContent, document.body);
};

export default ActivityManager;