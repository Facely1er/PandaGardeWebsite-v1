import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [speechVoice, setSpeechVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentScene = scenes[currentSceneIndex];

  const nextScene = useCallback(() => {
    if (currentSceneIndex < scenes.length - 1) {
      setIsLoading(true);
      const nextIndex = currentSceneIndex + 1;
      
      // Clear any existing skip timeout
      if (skipTimeoutRef.current) {
        clearTimeout(skipTimeoutRef.current);
      }
      
      // Show skip button after 2 seconds
      setShowSkipButton(true);
      skipTimeoutRef.current = setTimeout(() => {
        setShowSkipButton(false);
      }, 5000);
      
      // Simulate loading time for better UX
      setTimeout(() => {
        setCurrentSceneIndex(nextIndex);
        setSelectedChoice(null);
        setIsLoading(false);
        setShowSkipButton(false);
        onSceneChange?.(scenes[nextIndex].id);
      }, 800);
    } else {
      onStoryComplete?.();
    }
  }, [currentSceneIndex, scenes, onSceneChange, onStoryComplete]);

  // Auto-advance functionality
  useEffect(() => {
    if (isPlaying && autoAdvance && currentScene?.duration) {
      const timer = setTimeout(() => {
        nextScene();
      }, currentScene.duration * 1000 / readingSpeed);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, autoAdvance, currentScene?.duration, readingSpeed, nextScene]);

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
    if (currentScene?.animation && animationRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScene?.animation]);

  // Text-to-speech functionality
  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      utterance.volume = isMuted ? 0 : 0.8;
      
      if (speechVoice) {
        utterance.voice = speechVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [speechRate, speechPitch, speechVoice, isMuted]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Auto-speak when scene changes
  useEffect(() => {
    if (currentScene?.content && isPlaying) {
      speakText(currentScene.content);
    }
    
    return () => {
      stopSpeaking();
    };
  }, [currentScene?.content, isPlaying, speakText, stopSpeaking]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const minSwipeDistance = 50;
    
    // Horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - previous scene
        prevScene();
      } else {
        // Swipe left - next scene (if no choices)
        if (!currentScene?.choices || currentScene.choices.length === 0) {
          nextScene();
        }
      }
    }
    
    // Vertical swipe up - toggle play/pause
    if (deltaY < -minSwipeDistance && Math.abs(deltaY) > Math.abs(deltaX)) {
      togglePlay();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isLoading) return;
      
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          if (currentScene?.choices && currentScene.choices.length > 0) {
            // Don't auto-advance if there are choices
            return;
          }
          nextScene();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevScene();
          break;
        case 'Enter':
          event.preventDefault();
          if (currentScene?.choices && currentScene.choices.length > 0) {
            // Select first choice if available
            const firstChoice = currentScene.choices[0];
            if (firstChoice) {
              handleChoice(firstChoice);
            }
          } else {
            nextScene();
          }
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          togglePlay();
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          toggleMute();
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          resetStory();
          break;
        case 's':
        case 'S':
          event.preventDefault();
          setShowSettings(!showSettings);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLoading, currentScene, nextScene, prevScene, togglePlay, toggleMute, resetStory, showSettings]);

  const togglePlay = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    
    if (audioRef.current) {
      if (newIsPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    
    // Handle text-to-speech
    if (currentScene?.content) {
      if (newIsPlaying) {
        speakText(currentScene.content);
      } else {
        stopSpeaking();
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

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      const prevIndex = currentSceneIndex - 1;
      setCurrentSceneIndex(prevIndex);
      setSelectedChoice(null);
      onSceneChange?.(scenes[prevIndex].id);
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
      {currentScene?.audioUrl && (
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
          <div className="setting-group">
            <label>Speech Rate</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            />
            <span>{speechRate}x</span>
          </div>
          <div className="setting-group">
            <label>Speech Pitch</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechPitch}
              onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
            />
            <span>{speechPitch}x</span>
          </div>
          <div className="setting-group">
            <label>Voice</label>
            <select
              value={speechVoice?.name || ''}
              onChange={(e) => {
                const voices = window.speechSynthesis.getVoices();
                const selectedVoice = voices.find(v => v.name === e.target.value);
                setSpeechVoice(selectedVoice || null);
              }}
            >
              <option value="">Default</option>
              {window.speechSynthesis.getVoices().map((voice, index) => (
                <option key={index} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
          <div className="setting-group">
            <button
              onClick={() => currentScene?.content && speakText(currentScene.content)}
              disabled={isSpeaking}
              className="speech-button"
            >
              {isSpeaking ? 'Speaking...' : 'Test Speech'}
            </button>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="speech-button stop"
              >
                Stop
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading next scene...</p>
          </div>
        </div>
      )}

      {/* Skip button */}
      {showSkipButton && !isLoading && (
        <div className="skip-button-container">
          <button
            onClick={nextScene}
            className="skip-button"
            title="Skip to next scene (Space or →)"
          >
            Skip Scene
          </button>
        </div>
      )}

      {/* Mobile gesture hint */}
      <div className="mobile-gesture-hint">
        <div className="gesture-hint-content">
          <span className="gesture-icon">👆</span>
          <span className="gesture-text">Swipe left/right to navigate</span>
        </div>
      </div>

      {/* Story content */}
      <div 
        className="story-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentScene && (
          <div className="story-scene">
            <h2 className="scene-title">{currentScene.title}</h2>
            
            {/* Character animation area */}
            {currentScene.character && (
              <div 
                ref={animationRef}
                className={`character-display ${isAnimating ? 'animating' : ''} ${isSpeaking ? 'speaking' : ''}`}
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
                {isSpeaking && (
                  <div className="speaking-indicator">
                    <div className="speech-bubble">
                      <div className="bubble-dot"></div>
                      <div className="bubble-dot"></div>
                      <div className="bubble-dot"></div>
                    </div>
                  </div>
                )}
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
        )}
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

        .setting-group select {
          padding: 0.25rem 0.5rem;
          border: 1px solid ${theme === 'dark' ? 'var(--gray-600)' : 'var(--gray-300)'};
          border-radius: 4px;
          background: ${theme === 'dark' ? 'var(--gray-700)' : 'white'};
          color: ${theme === 'dark' ? 'var(--gray-200)' : 'var(--gray-800)'};
          font-size: 0.9rem;
        }

        .speech-button {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .speech-button:hover:not(:disabled) {
          background: var(--primary-light);
        }

        .speech-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .speech-button.stop {
          background: var(--error);
          margin-left: 0.5rem;
        }

        .speech-button.stop:hover {
          background: #dc2626;
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

        .character-display.speaking {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .speaking-indicator {
          position: absolute;
          top: -10px;
          right: -10px;
        }

        .speech-bubble {
          display: flex;
          gap: 2px;
          animation: wave 1s infinite;
        }

        .bubble-dot {
          width: 4px;
          height: 4px;
          background: var(--primary);
          border-radius: 50%;
          animation: wave 1.5s infinite;
        }

        .bubble-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .bubble-dot:nth-child(3) {
          animation-delay: 0.4s;
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

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loading-spinner {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--gray-200);
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .skip-button-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
        }

        .skip-button {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
          animation: pulse 2s infinite;
        }

        .skip-button:hover {
          background: var(--primary-light);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .mobile-gesture-hint {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          opacity: 0.8;
          animation: fadeInOut 3s ease-in-out;
        }

        .gesture-hint-content {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .gesture-icon {
          font-size: 1.2rem;
        }

        .gesture-text {
          font-weight: 500;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          20%, 80% { opacity: 0.8; transform: translateX(-50%) translateY(0); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .story-header {
            flex-direction: column;
            align-items: stretch;
            padding: 0.75rem;
          }

          .story-controls {
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.25rem;
          }

          .control-btn {
            padding: 0.75rem;
            min-width: 44px;
            min-height: 44px;
          }

          .story-settings {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .setting-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .setting-group input[type="range"] {
            width: 100%;
            max-width: 200px;
          }

          .choices-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .choice-btn {
            padding: 1.25rem;
            font-size: 1rem;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .skip-button-container {
            bottom: 10px;
            right: 10px;
          }

          .skip-button {
            padding: 0.75rem 1.25rem;
            font-size: 0.9rem;
            min-width: 44px;
            min-height: 44px;
          }

          .story-content {
            padding: 1rem;
            touch-action: pan-y;
          }

          .story-scene {
            text-align: center;
          }

          .scene-title {
            font-size: 1.75rem;
            margin-bottom: 1rem;
          }

          .story-text {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 1.5rem 0;
            text-align: left;
          }

          .character-icon {
            font-size: 3rem;
          }

          .story-choices h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 480px) {
          .story-header {
            padding: 0.5rem;
          }

          .story-controls {
            gap: 0.125rem;
          }

          .control-btn {
            padding: 0.5rem;
            min-width: 40px;
            min-height: 40px;
          }

          .story-content {
            padding: 0.75rem;
          }

          .scene-title {
            font-size: 1.5rem;
          }

          .story-text {
            font-size: 1rem;
          }

          .character-icon {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveStoryPlayer;