import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, ArrowLeft, Heart, Star, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import Logo from '../components/Logo';
import InteractiveStoryPlayer from '../components/story/InteractiveStoryPlayer';
import StoryCharacter from '../components/story/StoryCharacter';
import StoryScene from '../components/story/StoryScene';
import StoryChoices from '../components/story/StoryChoices';
import StoryProgress from '../components/story/StoryProgress';

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
  title: string;
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
  const [userAgeGroup, setUserAgeGroup] = useState<'ages-5-8' | 'ages-9-12' | 'ages-13-17' | null>(null);
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

  const handleChoiceSelect = (choiceIndex: number, consequence?: string) => {
    setPoints((prev: number) => prev + 10);
    
    // Add visual feedback for choice selection
    const feedbackElement = document.createElement('div');
    feedbackElement.textContent = '+10 Points!';
    feedbackElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: bold;
      font-size: 1.2rem;
      z-index: 10000;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
      animation: pointsFeedback 2s ease-out forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pointsFeedback {
        0% { 
          opacity: 0; 
          transform: translate(-50%, -50%) scale(0.5) translateY(20px); 
        }
        20% { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1.1) translateY(0); 
        }
        80% { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1) translateY(-20px); 
        }
        100% { 
          opacity: 0; 
          transform: translate(-50%, -50%) scale(0.8) translateY(-40px); 
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(feedbackElement);
    
    setTimeout(() => {
      document.body.removeChild(feedbackElement);
      document.head.removeChild(style);
    }, 2000);
    
    // Track choice for privacy learning
    const choiceData = {
      sceneId: currentScene.id,
      choiceIndex,
      consequence,
      timestamp: Date.now()
    };
    
    // Save choice to localStorage for analytics
    const savedChoices = JSON.parse(localStorage.getItem('story-choices') || '[]');
    savedChoices.push(choiceData);
    localStorage.setItem('story-choices', JSON.stringify(savedChoices));
    
    // Check for achievements based on choices
    checkChoiceAchievements(choiceIndex, consequence);
  };

  const checkChoiceAchievements = (choiceIndex: number, consequence?: string) => {
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

  // Get age-appropriate story content
  const getAgeAppropriateContent = (content: string, ageGroup: string | null): string => {
    if (!ageGroup) {return content;}
    
    // Simple content adaptation based on age group
    const adaptations = {
      'ages-5-8': {
        'digital tablet': 'magic tablet',
        'privacy settings': 'special buttons',
        'personal information': 'secrets',
        'online safety': 'staying safe'
      },
      'ages-9-12': {
        'magic tablet': 'digital tablet',
        'special buttons': 'privacy settings',
        'secrets': 'personal information'
      },
      'ages-13-17': {
        // Keep original content for teens
      }
    };
    
    let adaptedContent = content;
    const ageAdaptations = adaptations[ageGroup as keyof typeof adaptations];
    
    if (ageAdaptations) {
      Object.entries(ageAdaptations).forEach(([original, adapted]) => {
        adaptedContent = adaptedContent.replace(new RegExp(original, 'gi'), adapted);
      });
    }
    
    return adaptedContent;
  };

  const currentScene = storyScenes[currentSceneIndex];

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

  // Determine user age group
  useEffect(() => {
    const savedVerification = localStorage.getItem('pandagarde-age-verification');
    if (savedVerification) {
      try {
        const { age } = JSON.parse(savedVerification);
        if (age >= 5 && age <= 8) {
          setUserAgeGroup('ages-5-8');
        } else if (age >= 9 && age <= 12) {
          setUserAgeGroup('ages-9-12');
        } else if (age >= 13 && age <= 17) {
          setUserAgeGroup('ages-13-17');
        }
      } catch (error) {
        console.error('Error parsing age verification:', error);
      }
    }
  }, []);

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
    <div className="min-h-screen bg-white" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50"
        style={{ 
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: 'var(--primary)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          textDecoration: 'none',
          zIndex: 50,
          transition: 'top 0.3s'
        }}
        onFocus={(e) => e.target.style.top = '6px'}
        onBlur={(e) => e.target.style.top = '-40px'}
      >
        Skip to main content
      </a>

      {/* Enhanced Header */}
      <header className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-24 relative overflow-hidden" role="banner">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='bamboo' width='20' height='40' patternUnits='userSpaceOnUse'><rect x='8' y='0' width='4' height='40' fill='rgba(255,255,255,0.1)'/><rect x='6' y='5' width='8' height='2' fill='rgba(255,255,255,0.05)'/><rect x='6' y='15' width='8' height='2' fill='rgba(255,255,255,0.05)'/><rect x='6' y='25' width='8' height='2' fill='rgba(255,255,255,0.05)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23bamboo)'/></svg>")`
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-panda">🐼</div>
          <div className="floating-leaf">🍃</div>
          <div className="floating-star">⭐</div>
          <div className="floating-shield">🛡️</div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 mr-4 animate-bounce">
              <Logo />
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-6 py-3 rounded-full mb-8 shadow-lg animate-pulse">
              <Book size={18} className="animate-spin-slow" />
              <span className="text-sm font-bold tracking-wider">INTERACTIVE STORY</span>
            </div>

            <h1 className="text-6xl font-bold mb-8 leading-tight animate-fade-in-up">
              <span className="block text-white drop-shadow-lg">Privacy Panda</span>
              <span className="block text-yellow-300 drop-shadow-lg animate-glow">and the Digital Bamboo Forest</span>
            </h1>

            <p className="text-xl opacity-95 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay">
              Join Po the Panda on an interactive adventure through the Digital Bamboo Forest as he learns about privacy, sharing, and staying safe online. Make choices, unlock achievements, and become a privacy expert!
            </p>

            {/* Enhanced Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <Star size={16} className="text-yellow-300" />
                <span className="font-semibold">Ages 5-12</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <Book size={16} className="text-blue-300" />
                <span className="font-semibold">Interactive Story</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <Heart size={16} className="text-red-300" />
                <span className="font-semibold">Educational Adventure</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-lg">🎮</span>
                <span className="font-semibold">Make Choices</span>
              </div>
            </div>

            {/* Interactive Preview */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🐼</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Ready to Start?</h3>
                  <p className="text-sm opacity-90">Click below to begin Po's journey</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Adventure
                </button>
                <button 
                  onClick={() => setShowKeyboardHelp(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                >
                  Help
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CSS for animations and mobile responsiveness */}
        <style>{`
          .floating-panda {
            position: absolute;
            top: 20%;
            left: 10%;
            font-size: 2rem;
            animation: float 6s ease-in-out infinite;
            opacity: 0.7;
          }
          
          .floating-leaf {
            position: absolute;
            top: 30%;
            right: 15%;
            font-size: 1.5rem;
            animation: float 4s ease-in-out infinite reverse;
            opacity: 0.6;
          }
          
          .floating-star {
            position: absolute;
            top: 60%;
            left: 20%;
            font-size: 1.2rem;
            animation: twinkle 3s ease-in-out infinite;
            opacity: 0.8;
          }
          
          .floating-shield {
            position: absolute;
            top: 40%;
            right: 25%;
            font-size: 1.8rem;
            animation: float 5s ease-in-out infinite;
            opacity: 0.5;
          }
          
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
          
          .animate-glow {
            animation: glow 2s ease-in-out infinite alternate;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }
          
          .animate-fade-in-up-delay {
            animation: fadeInUp 1s ease-out 0.3s both;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes glow {
            from { text-shadow: 0 0 10px rgba(255, 255, 0, 0.5); }
            to { text-shadow: 0 0 20px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.6); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          /* Mobile Responsiveness Enhancements */
          @media (max-width: 768px) {
            .floating-panda {
              top: 15%;
              left: 5%;
              font-size: 1.5rem;
            }
            
            .floating-leaf {
              top: 25%;
              right: 10%;
              font-size: 1.2rem;
            }
            
            .floating-star {
              top: 70%;
              left: 15%;
              font-size: 1rem;
            }
            
            .floating-shield {
              top: 45%;
              right: 20%;
              font-size: 1.4rem;
            }

            /* Enhanced mobile header */
            header {
              padding: 3rem 1rem !important;
            }

            h1 {
              font-size: 2.5rem !important;
              line-height: 1.2 !important;
            }

            /* Mobile navigation improvements */
            .container {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }

            /* Mobile controls */
            .story-controls {
              flex-wrap: wrap;
              gap: 0.5rem;
            }

            .control-btn {
              min-width: 44px;
              min-height: 44px;
              padding: 0.75rem;
            }

            /* Mobile story content */
            .story-text-wrapper {
              padding: 1.5rem !important;
              margin: 1rem !important;
            }

            .story-text-wrapper p {
              font-size: 1.1rem !important;
              line-height: 1.6 !important;
            }

            /* Mobile choices */
            .choices-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }

            .choice-btn {
              padding: 1.25rem !important;
              font-size: 1rem !important;
              min-height: 60px !important;
            }

            /* Mobile call to action */
            .bg-gradient-to-br {
              padding: 2rem 1rem !important;
              margin: 1rem !important;
            }

            .bg-gradient-to-br h2 {
              font-size: 1.75rem !important;
            }

            .bg-gradient-to-br p {
              font-size: 1rem !important;
            }

            .bg-gradient-to-br a,
            .bg-gradient-to-br button {
              padding: 0.75rem 1.5rem !important;
              font-size: 0.9rem !important;
            }
          }

          @media (max-width: 480px) {
            /* Extra small mobile devices */
            .floating-panda,
            .floating-leaf,
            .floating-star,
            .floating-shield {
              display: none; /* Hide floating elements on very small screens */
            }

            header {
              padding: 2rem 0.5rem !important;
            }

            h1 {
              font-size: 2rem !important;
            }

            .container {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }

            .story-text-wrapper {
              padding: 1rem !important;
              margin: 0.5rem !important;
            }

            .story-text-wrapper p {
              font-size: 1rem !important;
            }

            .choice-btn {
              padding: 1rem !important;
              font-size: 0.9rem !important;
            }

            .bg-gradient-to-br {
              padding: 1.5rem 0.75rem !important;
              margin: 0.5rem !important;
            }

            .bg-gradient-to-br h2 {
              font-size: 1.5rem !important;
            }
          }
        `}</style>
      </header>

      {/* Enhanced Navigation */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 text-green-600 hover:text-green-700 font-semibold transition-all transform hover:scale-105 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
              style={{ color: 'var(--primary-light)' }}
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>

            <div className="flex items-center gap-6">
              {/* Progress Indicator */}
              <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">{currentSceneIndex + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">of {storyScenes.length}</span>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
                    style={{ width: `${((currentSceneIndex + 1) / storyScenes.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Enhanced Controls */}
              <div className="flex items-center gap-2 bg-white rounded-full px-2 py-2 shadow-lg border border-gray-200" role="group" aria-label="Story Controls">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-3 rounded-full transition-all transform hover:scale-110 ${
                    isPlaying 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                  title={isPlaying ? 'Pause story (P)' : 'Play story (P)'}
                  aria-label={isPlaying ? 'Pause story' : 'Play story'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="w-px h-8 bg-gray-300"></div>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-all transform hover:scale-110 ${
                    isMuted 
                      ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                  title={isMuted ? 'Unmute audio (M)' : 'Mute audio (M)'}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                
                <button
                  onClick={() => setCurrentSceneIndex(0)}
                  className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all transform hover:scale-110"
                  title="Reset story to beginning (R)"
                  aria-label="Reset story to beginning"
                >
                  <RotateCcw size={20} />
                </button>
                
                <div className="w-px h-8 bg-gray-300"></div>
                
                <button
                  onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                  className="p-3 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-all transform hover:scale-110"
                  title="Show keyboard shortcuts (H)"
                  aria-label="Show keyboard shortcuts"
                >
                  <span className="text-sm font-bold">?</span>
                </button>
                
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className="p-3 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all transform hover:scale-110"
                  title="Show bookmarks (B)"
                  aria-label="Show bookmarks"
                >
                  <span className="text-lg">🔖</span>
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

      {/* Enhanced Main Content */}
      <main id="main-content" style={{ minHeight: '100vh', paddingTop: '80px' }} role="main" aria-label="Interactive Story Content">
        {/* Back Navigation */}
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
        
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Progress Component */}
          <div className="mb-12">
            <StoryProgress
              currentScene={currentSceneIndex + 1}
              totalScenes={storyScenes.length}
              points={points}
              achievements={achievements}
              showDetailedProgress={true}
            />
          </div>

          {/* Enhanced Interactive Story Player */}
          <div className="mb-12">
            <InteractiveStoryPlayer
              scenes={storyScenes}
              onSceneChange={handleSceneChange}
              onStoryComplete={handleStoryComplete}
            />
          </div>

          {/* Enhanced Current Scene with Character and Choices */}
          <div className="mb-12">
            {currentScene && (
              <div className="scene-container">
                <StoryScene
                  sceneId={currentScene.id}
                  title={currentScene.title}
                  background={currentScene.background}
                  timeOfDay={currentScene.timeOfDay}
                  weather={currentScene.weather}
                  mood={currentScene.mood}
                >
                  <div className="text-center">
                    {currentScene.character && (
                      <div className="character-section mb-8">
                        <StoryCharacter
                          character={currentScene.character}
                          animation={currentScene.animation}
                          size="large"
                          isSpeaking={isPlaying}
                        />
                      </div>
                    )}
                    
                    <div className="story-text-content mt-6 relative">
                      <button
                        onClick={() => toggleBookmark(currentScene.id)}
                        className="absolute top-0 right-0 p-3 hover:bg-gray-100 rounded-full transition-all transform hover:scale-110 bg-white shadow-sm"
                        title={bookmarks.has(currentScene.id) ? 'Remove bookmark' : 'Add bookmark'}
                        aria-label={bookmarks.has(currentScene.id) ? 'Remove bookmark' : 'Add bookmark'}
                      >
                        <span className={`text-2xl transition-all ${bookmarks.has(currentScene.id) ? 'text-yellow-500 animate-pulse' : 'text-gray-400 hover:text-yellow-500'}`}>
                          🔖
                        </span>
                      </button>
                      <div className="story-text-wrapper bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                        <p className="text-xl leading-relaxed text-center max-w-4xl mx-auto pr-16 font-medium">
                          {getAgeAppropriateContent(currentScene.content, userAgeGroup)}
                        </p>
                      </div>
                    </div>

                    {currentScene.choices && currentScene.choices.length > 0 && (
                      <div className="mt-12">
                        <div className="choices-header mb-6">
                          <h3 className="text-2xl font-bold text-green-700 mb-2">What should happen next?</h3>
                          <p className="text-gray-600">Choose wisely - your decision will affect Po's journey!</p>
                        </div>
                        <StoryChoices
                          choices={currentScene.choices.map((choice, index) => ({
                            id: `choice-${index}`,
                            text: choice.text,
                            description: choice.consequence,
                            nextScene: choice.nextScene,
                            icon: '🤔',
                            difficulty: 'medium' as const,
                            points: 10
                          }))}
                          onChoiceSelect={(choiceIndex: number, consequence?: string) => {
                            handleChoiceSelect(choiceIndex, consequence);
                            handleSceneChange(currentScene.choices![choiceIndex].nextScene);
                          }}
                          showConsequences={true}
                          showPoints={true}
                        />
                      </div>
                    )}
                  </div>
                </StoryScene>
              </div>
            )}
          </div>

          {/* Enhanced Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-4xl">🐼</div>
                <div className="absolute top-4 right-4 text-3xl">🛡️</div>
                <div className="absolute bottom-4 left-8 text-3xl">⭐</div>
                <div className="absolute bottom-4 right-8 text-4xl">🌿</div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Continue Learning with Privacy Panda!</h2>
                <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                  Explore more activities, games, and resources to help children learn about digital privacy and online safety.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="/activity-book"
                    className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
                  >
                    <Book size={24} />
                    Activity Book
                  </a>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-800 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
                  >
                    <ArrowLeft size={24} />
                    Back to Top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CSS for better visual engagement */}
        <style>{`
          .scene-container {
            position: relative;
            animation: sceneSlideIn 0.8s ease-out;
          }
          
          .character-section {
            animation: characterAppear 1s ease-out 0.3s both;
          }
          
          .story-text-wrapper {
            animation: textFadeIn 0.8s ease-out 0.6s both;
            position: relative;
          }
          
          .story-text-wrapper::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #10b981, #059669, #047857, #065f46);
            border-radius: 24px;
            z-index: -1;
            opacity: 0.1;
          }
          
          .choices-header {
            animation: choicesSlideUp 0.8s ease-out 0.9s both;
          }
          
          @keyframes sceneSlideIn {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes characterAppear {
            from {
              opacity: 0;
              transform: scale(0.8) translateY(30px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes textFadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes choicesSlideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        </div>
      </main>
  );
};

export default InteractiveStoryPage;