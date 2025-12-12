import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, ArrowLeft, Heart, Star, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import InteractiveStoryPlayer from '../components/story/InteractiveStoryPlayer';
import StoryProgress from '../components/story/StoryProgress';
import PageLayout from '../components/layout/PageLayout';
import Logo from '../components/Logo';
import { storyScenes, StorySceneData } from '../data/storyScenes';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

const InteractiveStoryPage: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [points, setPoints] = useState(0);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [achievements, setAchievements] = useState([
    {
      id: 'first-scene',
      name: 'Story Starter',
      description: 'Read your first scene',
      icon: '📖',
      unlocked: false
    },
    {
      id: 'privacy-learner',
      name: 'Privacy Learner',
      description: 'Learn about privacy concepts',
      icon: '🛡️',
      unlocked: false
    },
    {
      id: 'wise-choices',
      name: 'Wise Choices',
      description: 'Make 3 good decisions',
      icon: '🧠',
      unlocked: false
    },
    {
      id: 'story-complete',
      name: 'Story Master',
      description: 'Complete the entire story',
      icon: '🏆',
      unlocked: false
    }
  ]);


  const handleSceneChange = (sceneId: string) => {
    const sceneIndex = storyScenes.findIndex(scene => scene.id === sceneId);
    if (sceneIndex !== -1) {
      setCurrentSceneIndex(sceneIndex);
    }
  };

  const handleChoiceMade = (choice: { text: string; nextScene: string; consequence?: string }) => {
    // Save choice to localStorage
    const savedChoices = JSON.parse(localStorage.getItem('story-choices') || '[]');
    savedChoices.push({
      text: choice.text,
      nextScene: choice.nextScene,
      consequence: choice.consequence,
      timestamp: Date.now()
    });
    localStorage.setItem('story-choices', JSON.stringify(savedChoices));
    
    // Check for achievements
    checkChoiceAchievements();
  };

  const checkChoiceAchievements = () => {
    const savedChoices = JSON.parse(localStorage.getItem('story-choices') || '[]');
    const privacyChoices = savedChoices.filter((choice: any) => 
      choice.consequence && choice.consequence.includes('privacy')
    );
    
    // Unlock privacy learner achievement
    if (privacyChoices.length >= 2) {
      const wasUnlocked = achievements.find(a => a.id === 'privacy-learner')?.unlocked;
      if (!wasUnlocked) {
        setAchievements((prev: Achievement[]) => prev.map((a: Achievement) => 
          a.id === 'privacy-learner' ? { ...a, unlocked: true } : a
        ));
        showAchievementUnlocked('Privacy Learner', '🛡️', 'You\'ve learned about privacy concepts!');
      }
    }
    
    // Unlock wise choices achievement
    if (savedChoices.length >= 3) {
      const wasUnlocked = achievements.find(a => a.id === 'wise-choices')?.unlocked;
      if (!wasUnlocked) {
        setAchievements((prev: Achievement[]) => prev.map((a: Achievement) => 
          a.id === 'wise-choices' ? { ...a, unlocked: true } : a
        ));
        showAchievementUnlocked('Wise Choices', '🧠', 'You\'ve made 3 good decisions!');
      }
    }
  };

  const showAchievementUnlocked = (title: string, icon: string, description: string) => {
    const achievementElement = document.createElement('div');
    achievementElement.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(251, 191, 36, 0.4);
        z-index: 10000;
        max-width: 300px;
        animation: achievementSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid rgba(255, 255, 255, 0.2);
      ">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
          <span style="font-size: 2rem;">${icon}</span>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: bold;">Achievement Unlocked!</h3>
            <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">${title}</p>
          </div>
        </div>
        <p style="margin: 0; font-size: 0.85rem; opacity: 0.8;">${description}</p>
      </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes achievementSlideIn {
        0% { 
          opacity: 0; 
          transform: translateX(100%) scale(0.8); 
        }
        100% { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(achievementElement);
    
    setTimeout(() => {
      achievementElement.style.animation = 'achievementSlideOut 0.4s ease-in forwards';
      setTimeout(() => {
        document.body.removeChild(achievementElement);
        document.head.removeChild(style);
      }, 400);
    }, 4000);
    
    // Add slide out animation
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
      @keyframes achievementSlideOut {
        0% { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
        100% { 
          opacity: 0; 
          transform: translateX(100%) scale(0.8); 
        }
      }
    `;
    document.head.appendChild(slideOutStyle);
  };

  const handleStoryComplete = () => {
    const wasUnlocked = achievements.find(a => a.id === 'story-complete')?.unlocked;
    if (!wasUnlocked) {
      setAchievements((prev: Achievement[]) => prev.map((a: Achievement) => 
        a.id === 'story-complete' ? { ...a, unlocked: true } : a
      ));
      setPoints((prev: number) => prev + 50);
      
      // Show completion celebration
      showStoryCompletionCelebration();
    }
  };

  const showStoryCompletionCelebration = () => {
    // Create celebration overlay
    const celebrationOverlay = document.createElement('div');
    celebrationOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: celebrationFadeIn 0.8s ease-out;
    `;
    
    celebrationOverlay.innerHTML = `
      <div style="
        text-align: center;
        color: white;
        padding: 3rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: celebrationBounce 0.6s ease-out 0.3s both;
      ">
        <div style="font-size: 4rem; margin-bottom: 1rem; animation: celebrationSpin 2s ease-in-out infinite;">🏆</div>
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: bold;">Congratulations!</h2>
        <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">You've completed Privacy Panda's journey!</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Continue Learning
          </button>
        </div>
      </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes celebrationFadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes celebrationBounce {
        0% { 
          opacity: 0; 
          transform: scale(0.5) translateY(50px); 
        }
        100% { 
          opacity: 1; 
          transform: scale(1) translateY(0); 
        }
      }
      
      @keyframes celebrationSpin {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(10deg) scale(1.1); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(celebrationOverlay);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
      celebrationOverlay.style.animation = 'celebrationFadeOut 0.5s ease-in forwards';
      setTimeout(() => {
        document.body.removeChild(celebrationOverlay);
        document.head.removeChild(style);
      }, 500);
    }, 8000);
    
    // Add fade out animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
      @keyframes celebrationFadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(fadeOutStyle);
  };

  // Unlock first scene achievement
  useEffect(() => {
    if (currentSceneIndex === 0) {
      setAchievements((prev: any[]) => prev.map((a: any) => 
        a.id === 'first-scene' ? { ...a, unlocked: true } : a
      ));
    }
  }, [currentSceneIndex]);

  // Unlock privacy learner achievement
  useEffect(() => {
    if (currentSceneIndex >= 5) {
      setAchievements((prev: any[]) => prev.map((a: any) => 
        a.id === 'privacy-learner' ? { ...a, unlocked: true } : a
      ));
    }
  }, [currentSceneIndex]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('story-bookmarks');
    if (savedBookmarks) {
      try {
        const bookmarkArray = JSON.parse(savedBookmarks);
        setBookmarks(new Set(bookmarkArray));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('story-bookmarks', JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);


  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('story-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setCurrentSceneIndex(progress.sceneIndex || 0);
        setPoints(progress.points || 0);
        setAchievements(progress.achievements || achievements);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const progress = {
      sceneIndex: currentSceneIndex,
      points,
      achievements,
      timestamp: Date.now()
    };
    localStorage.setItem('story-progress', JSON.stringify(progress));
  }, [currentSceneIndex, points, achievements]);

  const toggleBookmark = (sceneId: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(sceneId)) {
        newBookmarks.delete(sceneId);
      } else {
        newBookmarks.add(sceneId);
      }
      return newBookmarks;
    });
  };

  const jumpToBookmark = (sceneId: string) => {
    const sceneIndex = storyScenes.findIndex(scene => scene.id === sceneId);
    if (sceneIndex !== -1) {
      setCurrentSceneIndex(sceneIndex);
      setShowBookmarks(false);
    }
  };

  // Keyboard navigation for main page
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'h':
          event.preventDefault();
          setShowKeyboardHelp(!showKeyboardHelp);
          break;
        case 'b':
          event.preventDefault();
          setShowBookmarks(!showBookmarks);
          break;
        case 'escape':
          if (showKeyboardHelp) {
            setShowKeyboardHelp(false);
          }
          if (showBookmarks) {
            setShowBookmarks(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showKeyboardHelp, showBookmarks]);

  return (
    <PageLayout
      title="Privacy Panda and the Digital Bamboo Forest"
      subtitle="Join Po the Panda on an interactive adventure through the Digital Bamboo Forest as he learns about privacy, sharing, and staying safe online. Make choices, unlock achievements, and become a privacy expert!"
      icon={Book}
      badge="INTERACTIVE STORY"
      breadcrumbs={true}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        {/* Intro Section with Feature Grid and CTA */}
        <div className="grid md:grid-cols-2 gap-6 items-center mb-8" style={{ marginTop: '2rem' }}>
          {/* Left Column - Feature Grid and CTA */}
          <div className="text-left">
            {/* Compact Feature Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <Star size={16} className="text-yellow-500" />
                <span className="font-semibold text-sm" style={{ color: 'var(--gray-800)' }}>Ages 5-12</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <Book size={16} className="text-blue-500" />
                <span className="font-semibold text-sm" style={{ color: 'var(--gray-800)' }}>Interactive</span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                <Heart size={16} className="text-red-500" />
                <span className="font-semibold text-sm" style={{ color: 'var(--gray-800)' }}>Educational</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                <span className="text-lg">🎮</span>
                <span className="font-semibold text-sm" style={{ color: 'var(--gray-800)' }}>Make Choices</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Play size={18} />
                Start Adventure
              </button>
              <button 
                onClick={() => setShowKeyboardHelp(true)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-semibold transition-all border border-gray-300"
              >
                Help
              </button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative hidden md:block">
            <div className="relative">
              {/* Main Panda Illustration Area */}
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
                <div className="text-center">
                  <div className="flex justify-center mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
                    <div style={{ width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100%', height: '100%' }}>
                        <Logo />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mb-4">
                    <span className="text-3xl animate-pulse">🛡️</span>
                    <span className="text-3xl animate-pulse" style={{ animationDelay: '0.2s' }}>🔒</span>
                    <span className="text-3xl animate-pulse" style={{ animationDelay: '0.4s' }}>⭐</span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>Ready to protect your digital privacy?</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 text-4xl opacity-50 animate-float">🌿</div>
              <div className="absolute -bottom-4 -left-4 text-4xl opacity-50 animate-float" style={{ animationDelay: '1s' }}>🎋</div>
            </div>
          </div>
        </div>


      {/* Story Controls Navigation */}
      <div id="main-content" className="bg-gray-50 border-b border-gray-200" style={{ backgroundColor: 'var(--light)', marginTop: '2rem', marginBottom: '2rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <div className="flex items-center justify-between flex-wrap gap-3">

            <div className="flex items-center gap-4 flex-wrap">
              {/* Compact Progress Indicator */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">{currentSceneIndex + 1}</span>
                </div>
                <span className="text-xs font-medium text-gray-600 hidden sm:inline">/{storyScenes.length}</span>
                <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden hidden md:block">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
                    style={{ width: `${((currentSceneIndex + 1) / storyScenes.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Compact Enhanced Controls */}
              <div className="flex items-center gap-1 bg-white rounded-full px-1 py-1 shadow-lg border border-gray-200" role="group" aria-label="Story Controls">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2.5 rounded-full transition-all transform hover:scale-110 ${
                    isPlaying 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                  title={isPlaying ? 'Pause (P)' : 'Play (P)'}
                  aria-label={isPlaying ? 'Pause story' : 'Play story'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                
                <div className="w-px h-6 bg-gray-300"></div>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-full transition-all transform hover:scale-110 ${
                    isMuted 
                      ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                
                <button
                  onClick={() => setCurrentSceneIndex(0)}
                  className="p-2.5 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all transform hover:scale-110 hidden sm:block"
                  title="Reset (R)"
                  aria-label="Reset story"
                >
                  <RotateCcw size={18} />
                </button>
                
                <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
                
                <button
                  onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                  className="p-2.5 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-all transform hover:scale-110"
                  title="Help (H)"
                  aria-label="Show keyboard shortcuts"
                >
                  <span className="text-xs font-bold">?</span>
                </button>
                
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className="p-2.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all transform hover:scale-110"
                  title="Bookmarks (B)"
                  aria-label="Show bookmarks"
                >
                  <span className="text-base">🔖</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Help Panel */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-labelledby="keyboard-help-title">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4" style={{ backgroundColor: 'var(--white)' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 id="keyboard-help-title" className="text-xl font-bold" style={{ color: 'var(--gray-800)' }}>Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close keyboard help"
              >
                ×
              </button>
            </div>
            <div className="space-y-3" style={{ color: 'var(--gray-700)' }}>
              <div className="flex justify-between">
                <span>Next scene:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">→</kbd>
              </div>
              <div className="flex justify-between">
                <span>Previous scene:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">←</kbd>
              </div>
              <div className="flex justify-between">
                <span>Play/Pause:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">P</kbd>
              </div>
              <div className="flex justify-between">
                <span>Mute/Unmute:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">M</kbd>
              </div>
              <div className="flex justify-between">
                <span>Reset story:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">R</kbd>
              </div>
              <div className="flex justify-between">
                <span>Select choice:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Enter</kbd>
              </div>
              <div className="flex justify-between">
                <span>Show this help:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">H</kbd>
              </div>
              <div className="flex justify-between">
                <span>Show bookmarks:</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">B</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Panel */}
      {showBookmarks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-labelledby="bookmarks-title">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-96 overflow-y-auto" style={{ backgroundColor: 'var(--white)' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 id="bookmarks-title" className="text-xl font-bold" style={{ color: 'var(--gray-800)' }}>Story Bookmarks</h2>
              <button
                onClick={() => setShowBookmarks(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close bookmarks"
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              {bookmarks.size === 0 ? (
                <p className="text-gray-500 text-center py-4">No bookmarks yet. Click the bookmark icon on any scene to save it!</p>
              ) : (
                Array.from(bookmarks).map(sceneId => {
                  const scene = storyScenes.find(s => s.id === sceneId);
                  return scene ? (
                    <div key={sceneId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" style={{ backgroundColor: 'var(--light)' }}>
                      <div className="flex-1">
                        <h3 className="font-semibold" style={{ color: 'var(--gray-800)' }}>{scene.title}</h3>
                        <p className="text-sm text-gray-600" style={{ color: 'var(--gray-600)' }}>
                          {scene.content.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => jumpToBookmark(sceneId)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          Go to
                        </button>
                        <button
                          onClick={() => toggleBookmark(sceneId)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>
      )}

        {/* Enhanced Progress Component */}
        <div style={{ marginBottom: '2rem' }}>
          <StoryProgress
            currentScene={currentSceneIndex + 1}
            totalScenes={storyScenes.length}
            points={points}
            achievements={achievements}
            showDetailedProgress={true}
          />
        </div>

        {/* Enhanced Interactive Story Player */}
        <div style={{ marginBottom: '2rem' }}>
          <InteractiveStoryPlayer
            scenes={storyScenes}
            currentSceneIndex={currentSceneIndex}
            onSceneIndexChange={setCurrentSceneIndex}
            onSceneChange={handleSceneChange}
            onStoryComplete={handleStoryComplete}
            onChoiceMade={handleChoiceMade}
            hideControls={true}
          />
        </div>

        {/* Enhanced Call to Action */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
            color: 'white',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '2rem' }}>🐼</div>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem' }}>🛡️</div>
              <div style={{ position: 'absolute', bottom: '1rem', left: '2rem', fontSize: '1.5rem' }}>⭐</div>
              <div style={{ position: 'absolute', bottom: '1rem', right: '2rem', fontSize: '2rem' }}>🌿</div>
            </div>
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem' }}>Continue Learning with Privacy Panda!</h2>
              <p style={{ fontSize: '1.125rem', opacity: 0.95, maxWidth: '42rem', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Explore more activities, games, and resources to help children learn about digital privacy and online safety.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <Link
                  to="/activity-book"
                  style={{
                    background: 'white',
                    color: '#16a34a',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <Book size={20} />
                  Activity Book
                </Link>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{
                    background: '#15803d',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#166534'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#15803d'}
                >
                  <ArrowLeft size={20} />
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InteractiveStoryPage;