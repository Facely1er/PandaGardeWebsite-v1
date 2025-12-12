import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, ArrowLeft, Heart, Star, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import InteractiveStoryPlayer from '../components/story/InteractiveStoryPlayer';
import StoryProgress from '../components/story/StoryProgress';
import PageLayout from '../components/layout/PageLayout';
import Logo from '../components/Logo';

interface StorySceneData {
  id: string;
  title: string;
  content: string;
  character?: 'panda' | 'turtle' | 'monkey' | 'beaver' | 'rabbit' | 'owl' | 'fox';
  animation?: 'bounce' | 'wave' | 'nod' | 'shake' | 'dance' | 'hide' | 'appear';
  background?: 'forest' | 'cave' | 'meadow' | 'river' | 'mountain' | 'village' | 'digital';
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  weather?: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
  mood?: 'happy' | 'mysterious' | 'tense' | 'peaceful' | 'exciting' | 'scary';
  choices?: Array<{
    text: string;
    nextScene: string;
    consequence?: string;
  }>;
  audioUrl?: string;
  duration?: number;
}

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

  const storyScenes: StorySceneData[] = [
    {
      id: 'intro',
      title: 'The Digital Bamboo Forest',
      content: 'Deep in the lush Bamboo Digital Forest lived a panda named Po. He was different from the other pandas because instead of munching on regular bamboo all day, he loved to play with digital bamboo tablets. These magical tablets could connect to all parts of the forest, letting animals share stories, photos, and messages.',
      character: 'panda',
      animation: 'appear',
      background: 'forest',
      timeOfDay: 'morning',
      weather: 'sunny',
      mood: 'peaceful',
      duration: 8
    },
    {
      id: 'shy-panda',
      title: 'Po the Shy Panda',
      content: 'Po was the shyest animal in the forest. He would hide behind the tallest bamboo stalks whenever other animals came near. Even though he loved his digital tablet, he rarely shared anything with others. "What if they don\'t like my photos?" he would worry. "What if they laugh at my stories?" So Po kept to himself, quietly exploring the digital pathways of the forest while staying hidden in the shadows.',
      character: 'panda',
      animation: 'hide',
      background: 'forest',
      timeOfDay: 'afternoon',
      weather: 'cloudy',
      mood: 'mysterious',
      duration: 10
    },
    {
      id: 'accident',
      title: 'The Accidental Share',
      content: 'One sunny morning, Po was so excited about a new game on his tablet that he accidentally pressed the wrong button. Suddenly, a message appeared: "All your information has been shared with the entire forest!" Po gasped! His secret diary, his collection of embarrassing bamboo dance videos, and even his personal information like where he slept and what times he ate – everything was now visible to every animal in the forest!',
      character: 'panda',
      animation: 'shake',
      background: 'digital',
      timeOfDay: 'morning',
      weather: 'sunny',
      mood: 'tense',
      choices: [
        {
          text: 'Turn off the tablet and hide',
          nextScene: 'hiding',
          consequence: 'Po becomes more isolated'
        },
        {
          text: 'Try to fix the settings',
          nextScene: 'trying-to-fix',
          consequence: 'Po learns about privacy controls'
        }
      ],
      duration: 12
    },
    {
      id: 'hiding',
      title: 'Hiding in Fear',
      content: 'Po turned off his tablet and hid in his den for days, too embarrassed to come out. He felt terrible about what had happened and didn\'t know how to face the other animals. Meanwhile, messages started popping up on his tablet from curious forest friends who had seen his shared information.',
      character: 'panda',
      animation: 'hide',
      background: 'cave',
      timeOfDay: 'evening',
      weather: 'rainy',
      mood: 'scary',
      duration: 8
    },
    {
      id: 'trying-to-fix',
      title: 'Learning to Fix Things',
      content: 'Po decided to try to understand what went wrong. He carefully looked through his tablet settings and discovered privacy controls he never knew existed. He learned about sharing permissions and how to control who could see his information. This gave him a little bit of hope.',
      character: 'panda',
      animation: 'nod',
      background: 'digital',
      timeOfDay: 'afternoon',
      weather: 'sunny',
      mood: 'peaceful',
      duration: 10
    },
    {
      id: 'turtle-visit',
      title: 'Wise Old Turtle\'s Visit',
      content: 'After a week, there was a gentle knock at his door. It was wise old Turtle, the eldest animal in the forest. "Po," said Turtle softly, "may I come in?" Po reluctantly let Turtle inside. "I know what happened," Turtle said. "And I\'m here to help you understand something important about our Digital Forest."',
      character: 'turtle',
      animation: 'wave',
      background: 'cave',
      timeOfDay: 'evening',
      weather: 'foggy',
      mood: 'peaceful',
      duration: 12
    },
    {
      id: 'privacy-shield',
      title: 'The Privacy Shield',
      content: 'Turtle showed Po a special shield he carried. "This is a Privacy Shield. It helps protect what we share in the Digital Forest. Let me teach you how to use it." Over the next few days, Turtle taught Po many important lessons about protecting personal information and using privacy settings wisely.',
      character: 'turtle',
      animation: 'appear',
      background: 'meadow',
      timeOfDay: 'morning',
      weather: 'sunny',
      mood: 'exciting',
      choices: [
        {
          text: 'Listen carefully to Turtle\'s lessons',
          nextScene: 'learning-lessons',
          consequence: 'Po becomes a privacy expert'
        },
        {
          text: 'Ask questions about privacy',
          nextScene: 'asking-questions',
          consequence: 'Po learns even more'
        }
      ],
      duration: 15
    },
    {
      id: 'learning-lessons',
      title: 'Important Privacy Lessons',
      content: 'Po listened carefully and learned: "Information once shared is hard to take back. That\'s why we must be careful what we share from the beginning." "We can use special privacy settings. These are like fences around your digital bamboo garden." "Most importantly, you have the right to protect your information, just like you protect your home."',
      character: 'panda',
      animation: 'nod',
      background: 'meadow',
      timeOfDay: 'afternoon',
      weather: 'sunny',
      mood: 'happy',
      duration: 12
    },
    {
      id: 'asking-questions',
      title: 'Curious Questions',
      content: 'Po asked many questions: "How do I know if an app is safe?" "What should I do if someone asks for my personal information?" "How can I help my friends stay safe too?" Turtle was impressed by Po\'s curiosity and answered each question patiently, helping Po become even more knowledgeable about digital safety.',
      character: 'panda',
      animation: 'bounce',
      background: 'meadow',
      timeOfDay: 'afternoon',
      weather: 'sunny',
      mood: 'exciting',
      duration: 14
    },
    {
      id: 'becoming-teacher',
      title: 'Privacy Panda Emerges',
      content: 'As Po became more confident, something unexpected happened. Forest animals began coming to him with questions: "Po, how do I stop strangers from seeing my photos?" asked Owen the Owl. "Po, someone is pretending to be me online! What should I do?" worried Fiona the Fox. With each question, Po realized he could use what he had learned to help others.',
      character: 'panda',
      animation: 'dance',
      background: 'village',
      timeOfDay: 'afternoon',
      weather: 'sunny',
      mood: 'happy',
      duration: 15
    },
    {
      id: 'privacy-panda',
      title: 'The Forest\'s Privacy Expert',
      content: 'Soon, Po wasn\'t shy anymore. He became known as "Privacy Panda" – the forest\'s expert on staying safe in the digital world. He created fun games to teach young animals about online safety and held special classes under the tallest bamboo tree. The animals loved learning from Privacy Panda. His gentle voice and kind smile made even scary topics feel manageable.',
      character: 'panda',
      animation: 'wave',
      background: 'forest',
      timeOfDay: 'morning',
      weather: 'sunny',
      mood: 'happy',
      duration: 16
    },
    {
      id: 'conclusion',
      title: 'A Safer Digital Forest',
      content: 'As the seasons changed and the Digital Bamboo Forest grew larger and more complex, Privacy Panda continued his important work. He never forgot how it felt to have his private information exposed, and that memory made him an even better teacher. And so, Privacy Panda protected the forest one animal at a time, teaching them to navigate the digital wilderness with confidence, safety, and a little bit of bamboo-powered wisdom.',
      character: 'panda',
      animation: 'appear',
      background: 'forest',
      timeOfDay: 'evening',
      weather: 'sunny',
      mood: 'peaceful',
      duration: 18
    }
  ];

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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='bamboo' width='20' height='40' patternUnits='userSpaceOnUse'><rect x='8' y='0' width='4' height='40' fill='rgba(255,255,255,0.1)'/><rect x='6' y='5' width='8' height='2' fill='rgba(255,255,255,0.05)'/><rect x='6' y='15' width='8' height='2' fill='rgba(255,255,255,0.05)'/><rect x='6' y='25' width='8' height='2' fill='rgba(255,255,255,0.05)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23bamboo)'/></svg>")`
          }} />
        </div>
        
        {/* Enhanced Floating Elements with More Variety */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="floating-panda">🐼</div>
          <div className="floating-leaf">🍃</div>
          <div className="floating-star">⭐</div>
          <div className="floating-shield">🛡️</div>
          <div className="floating-bamboo">🎋</div>
          <div className="floating-lock">🔒</div>
          <div className="floating-heart">💚</div>
        </div>

        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
          {/* Compact Logo and Badge Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 animate-bounce">
              <Logo />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full shadow-lg animate-pulse">
              <Book size={14} className="animate-spin-slow" />
              <span className="text-xs font-bold tracking-wider">INTERACTIVE STORY</span>
            </div>
          </div>

          {/* Main Content Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="block text-white drop-shadow-lg mb-1">Privacy Panda</span>
                <span className="block text-yellow-300 drop-shadow-lg animate-glow">and the Digital Bamboo Forest</span>
              </h1>

              <p className="text-base md:text-lg opacity-95 mb-6 leading-relaxed">
                Join Po the Panda on an interactive adventure through the Digital Bamboo Forest as he learns about privacy, sharing, and staying safe online.
              </p>

              {/* Compact Feature Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg">
                  <Star size={16} className="text-yellow-300" />
                  <span className="font-semibold text-sm">Ages 5-12</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg">
                  <Book size={16} className="text-blue-300" />
                  <span className="font-semibold text-sm">Interactive</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg">
                  <Heart size={16} className="text-red-300" />
                  <span className="font-semibold text-sm">Educational</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg">
                  <span className="text-lg">🎮</span>
                  <span className="font-semibold text-sm">Make Choices</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Play size={18} />
                  Start Adventure
                </button>
                <button 
                  onClick={() => setShowKeyboardHelp(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg font-semibold transition-all border border-white/30"
                >
                  Help
                </button>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative hidden md:block">
              <div className="relative">
                {/* Main Panda Illustration Area */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
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
                    <p className="text-sm opacity-90 font-medium">Ready to protect your digital privacy?</p>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 text-4xl opacity-50 animate-float">🌿</div>
                <div className="absolute -bottom-4 -left-4 text-4xl opacity-50 animate-float" style={{ animationDelay: '1s' }}>🎋</div>
              </div>
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
            onSceneChange={handleSceneChange}
            onStoryComplete={handleStoryComplete}
            onChoiceMade={handleChoiceMade}
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