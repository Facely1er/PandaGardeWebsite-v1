import React, { useState, useEffect } from 'react';
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

const InteractiveStoryPage: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [points, setPoints] = useState(0);
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

  const handleChoiceSelect = () => {
    setPoints(prev => prev + 10);
    
    // Check for achievements
    const choiceCount = achievements.find(a => a.id === 'wise-choices');
    if (choiceCount && !choiceCount.unlocked) {
      setAchievements(prev => prev.map(a => 
        a.id === 'wise-choices' ? { ...a, unlocked: true } : a
      ));
    }
  };

  const handleStoryComplete = () => {
    setAchievements(prev => prev.map(a => 
      a.id === 'story-complete' ? { ...a, unlocked: true } : a
    ));
    setPoints(prev => prev + 50);
  };

  const currentScene = storyScenes[currentSceneIndex];

  // Unlock first scene achievement
  useEffect(() => {
    if (currentSceneIndex === 0) {
      setAchievements(prev => prev.map(a => 
        a.id === 'first-scene' ? { ...a, unlocked: true } : a
      ));
    }
  }, [currentSceneIndex]);

  // Unlock privacy learner achievement
  useEffect(() => {
    if (currentSceneIndex >= 5) {
      setAchievements(prev => prev.map(a => 
        a.id === 'privacy-learner' ? { ...a, unlocked: true } : a
      ));
    }
  }, [currentSceneIndex]);

  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 mr-4">
              <Logo />
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Book size={16} />
              <span className="text-sm font-semibold">INTERACTIVE STORY</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Panda and the
              <span className="block text-yellow-300">Digital Bamboo Forest</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join Po the Panda on an interactive adventure through the Digital Bamboo Forest as he learns about privacy, sharing, and staying safe online.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 5-12</span>
              </div>
              <div className="flex items-center gap-2">
                <Book size={16} />
                <span>Interactive Story</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span>Educational Adventure</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              style={{ color: 'var(--primary-light)' }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={() => setCurrentSceneIndex(0)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Reset Story"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Progress Component */}
          <StoryProgress
            currentScene={currentSceneIndex + 1}
            totalScenes={storyScenes.length}
            points={points}
            achievements={achievements}
            showDetailedProgress={true}
          />

          {/* Interactive Story Player */}
          <div className="mt-8">
            <InteractiveStoryPlayer
              scenes={storyScenes}
              onSceneChange={handleSceneChange}
              onStoryComplete={handleStoryComplete}
            />
          </div>

          {/* Current Scene with Character and Choices */}
          <div className="mt-8">
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
                  <StoryCharacter
                    character={currentScene.character}
                    animation={currentScene.animation}
                    size="large"
                    isSpeaking={isPlaying}
                  />
                )}
                
                <div className="story-text-content mt-6">
                  <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
                    {currentScene.content}
                  </p>
                </div>

                {currentScene.choices && currentScene.choices.length > 0 && (
                  <div className="mt-8">
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
                      onChoiceSelect={handleChoiceSelect}
                      showConsequences={true}
                      showPoints={true}
                    />
                  </div>
                )}
              </div>
            </StoryScene>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Continue Learning with Privacy Panda!</h2>
              <p className="text-lg mb-6 opacity-90">
                Explore more activities, games, and resources to help children learn about digital privacy and online safety.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/activity-book"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <Book size={20} />
                  Activity Book
                </a>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InteractiveStoryPage;