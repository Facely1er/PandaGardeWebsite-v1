import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface StoryScene {
  id: string;
  title: string;
  content: string;
  character?: string;
  animation?: string;
  choices?: Array<{
    text: string;
    nextScene: string;
    consequence?: string;
  }>;
  audioUrl?: string;
  duration?: number;
}

interface InteractiveStoryPlayerProps {
  scenes: StoryScene[];
  onSceneChange?: (sceneId: string) => void;
  onStoryComplete?: () => void;
}

const InteractiveStoryPlayer: React.FC<InteractiveStoryPlayerProps> = ({
  scenes,
  onSceneChange,
  onStoryComplete
}) => {
  const { theme } = useTheme();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const currentScene = scenes[currentSceneIndex];

  // Auto-advance functionality
  useEffect(() => {
    if (isPlaying && autoAdvance && currentScene.duration) {
      const timer = setTimeout(() => {
        nextScene();
      }, currentScene.duration * 1000 / readingSpeed);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, autoAdvance, currentScene.duration, readingSpeed]);

  // Audio playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = readingSpeed;
      if (isMuted) {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = 0.7;
      }
    }
  }, [readingSpeed, isMuted]);

  // Character animation
  useEffect(() => {
    if (currentScene.animation && animationRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScene.animation]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const resetStory = () => {
    setCurrentSceneIndex(0);
    setIsPlaying(false);
    setSelectedChoice(null);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const nextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      setSelectedChoice(null);
      onSceneChange?.(scenes[currentSceneIndex + 1].id);
    } else {
      onStoryComplete?.();
    }
  };

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
      setSelectedChoice(null);
      onSceneChange?.(scenes[currentSceneIndex - 1].id);
    }
  };

  const handleChoice = (choice: { text: string; nextScene: string; consequence?: string }) => {
    setSelectedChoice(choice.text);
    const nextSceneIndex = scenes.findIndex(scene => scene.id === choice.nextScene);
    if (nextSceneIndex !== -1) {
      setTimeout(() => {
        setCurrentSceneIndex(nextSceneIndex);
        onSceneChange?.(choice.nextScene);
      }, 1000);
    }
  };

  const progress = ((currentSceneIndex + 1) / scenes.length) * 100;

  return (
    <div className="interactive-story-player">
      {/* Audio element */}
      {currentScene.audioUrl && (
        <audio
          ref={audioRef}
          src={currentScene.audioUrl}
          loop={false}
          onEnded={() => {
            if (autoAdvance) {
              nextScene();
            } else {
              setIsPlaying(false);
            }
          }}
        />
      )}

      {/* Header with controls */}
      <div className="story-header">
        <div className="story-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">
            Scene {currentSceneIndex + 1} of {scenes.length}
          </span>
        </div>

        <div className="story-controls">
          <button
            onClick={prevScene}
            disabled={currentSceneIndex === 0}
            className="control-btn"
            title="Previous Scene"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={togglePlay}
            className="control-btn play-btn"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={nextScene}
            disabled={currentSceneIndex === scenes.length - 1}
            className="control-btn"
            title="Next Scene"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={toggleMute}
            className="control-btn"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="control-btn"
            title="Settings"
          >
            <Settings size={20} />
          </button>

          <button
            onClick={resetStory}
            className="control-btn"
            title="Reset Story"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="story-settings">
          <div className="setting-group">
            <label>Reading Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={readingSpeed}
              onChange={(e) => setReadingSpeed(parseFloat(e.target.value))}
            />
            <span>{readingSpeed}x</span>
          </div>
          <div className="setting-group">
            <label>
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
              />
              Auto-advance
            </label>
          </div>
        </div>
      )}

      {/* Story content */}
      <div className="story-content">
        <div className="story-scene">
          <h2 className="scene-title">{currentScene.title}</h2>
          
          {/* Character animation area */}
          {currentScene.character && (
            <div 
              ref={animationRef}
              className={`character-display ${isAnimating ? 'animating' : ''}`}
            >
              <div className="character-icon">
                {currentScene.character === 'panda' && '🐼'}
                {currentScene.character === 'turtle' && '🐢'}
                {currentScene.character === 'monkey' && '🐵'}
                {currentScene.character === 'beaver' && '🦫'}
                {currentScene.character === 'rabbit' && '🐰'}
                {currentScene.character === 'owl' && '🦉'}
                {currentScene.character === 'fox' && '🦊'}
              </div>
            </div>
          )}

          {/* Story text */}
          <div 
            ref={textRef}
            className="story-text"
            style={{ 
              animationDuration: `${2 / readingSpeed}s`,
              color: theme === 'dark' ? 'var(--gray-200)' : 'var(--gray-800)'
            }}
          >
            {currentScene.content}
          </div>

          {/* Interactive choices */}
          {currentScene.choices && currentScene.choices.length > 0 && (
            <div className="story-choices">
              <h3>What should happen next?</h3>
              <div className="choices-grid">
                {currentScene.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className={`choice-btn ${selectedChoice === choice.text ? 'selected' : ''}`}
                    disabled={selectedChoice !== null}
                  >
                    {choice.text}
                    {choice.consequence && (
                      <span className="choice-consequence">{choice.consequence}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .interactive-story-player {
          max-width: 800px;
          margin: 0 auto;
          background: ${theme === 'dark' ? 'var(--gray-800)' : 'white'};
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .story-header {
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .story-progress {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: white;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .story-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .play-btn {
          background: rgba(255, 255, 255, 0.3);
          padding: 0.75rem;
        }

        .story-settings {
          background: ${theme === 'dark' ? 'var(--gray-700)' : 'var(--light)'};
          padding: 1rem;
          border-top: 1px solid ${theme === 'dark' ? 'var(--gray-600)' : 'var(--gray-200)'};
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .setting-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .setting-group label {
          font-weight: 500;
          color: ${theme === 'dark' ? 'var(--gray-200)' : 'var(--gray-700)'};
        }

        .setting-group input[type="range"] {
          width: 100px;
        }

        .story-content {
          padding: 2rem;
        }

        .story-scene {
          text-align: center;
        }

        .scene-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .character-display {
          margin: 2rem 0;
          transition: transform 0.3s ease;
        }

        .character-display.animating {
          animation: bounce 0.6s ease-in-out;
        }

        .character-icon {
          font-size: 4rem;
          display: inline-block;
        }

        .story-text {
          font-size: 1.2rem;
          line-height: 1.8;
          margin: 2rem 0;
          text-align: left;
          animation: fadeInUp 0.8s ease-out;
        }

        .story-choices {
          margin-top: 2rem;
          text-align: left;
        }

        .story-choices h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }

        .choices-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .choice-btn {
          background: ${theme === 'dark' ? 'var(--gray-700)' : 'white'};
          border: 2px solid var(--primary-light);
          color: ${theme === 'dark' ? 'var(--gray-200)' : 'var(--gray-800)'};
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .choice-btn:hover:not(:disabled) {
          background: var(--primary-light);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .choice-btn.selected {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .choice-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .choice-consequence {
          font-size: 0.9rem;
          opacity: 0.8;
          font-style: italic;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .story-header {
            flex-direction: column;
            align-items: stretch;
          }

          .story-controls {
            justify-content: center;
          }

          .story-settings {
            flex-direction: column;
            gap: 1rem;
          }

          .choices-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveStoryPlayer;