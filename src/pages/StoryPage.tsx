import React, { useState, useEffect } from 'react';
import { Book, ArrowLeft, Heart, Star, Play, Pause, Volume2, VolumeX, RotateCcw, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const StoryPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const resetStory = () => {
    setCurrentPage(0);
    setReadingProgress(0);
    setIsPlaying(false);
    scrollToTop();
  };

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        window.scrollBy(0, 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

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
              <span className="text-sm font-semibold">DIGITAL PRIVACY STORY</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Panda and the
              <span className="block text-yellow-300">Digital Bamboo Forest</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join Po the Panda on an adventure through the Digital Bamboo Forest as he learns about privacy, sharing, and staying safe online.
            </p>

            {/* Interactive Story CTA */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={24} className="text-yellow-300" />
                <h3 className="text-xl font-bold">Experience the Interactive Story!</h3>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Choose Po's path, make decisions, and unlock achievements as you follow his journey from shy panda to Privacy Panda expert.
              </p>
              <Link
                to="/story"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Play size={20} />
                Start Interactive Adventure
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 5-12</span>
              </div>
              <div className="flex items-center gap-2">
                <Book size={16} />
                <span>10 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span>Educational Story</span>
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

            {/* Interactive Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                <button
                  onClick={togglePlay}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button
                  onClick={resetStory}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Reset Story"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {/* Reading Progress */}
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--gray-600)' }}>
                  {Math.round(readingProgress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Story Introduction */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-12 rounded-r-lg"
               style={{
                 backgroundColor: 'var(--light)',
                 borderLeftColor: 'var(--primary-light)'
               }}>
            <h2 className="text-2xl font-bold text-green-800 mb-3" style={{ color: 'var(--primary)' }}>
              About This Story
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
              This story teaches children about digital privacy through the adventures of Po the Panda.
              It covers important concepts like protecting personal information, understanding privacy settings,
              and being careful about what we share online. Perfect for reading together with children ages 5-12.
            </p>
          </div>

          {/* Story Text */}
          <article className="prose prose-lg max-w-none">
            <div className="story-content space-y-6 text-lg leading-relaxed" style={{ color: 'var(--gray-800)' }}>
              {/* Interactive Story Elements */}
              <div className="story-interactive-elements mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-400"
                   style={{
                     backgroundColor: 'var(--light)',
                     borderLeftColor: 'var(--primary-light)'
                   }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                  🎮 Interactive Story Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">🎵</div>
                    <p className="text-sm font-medium">Audio Narration</p>
                    <p className="text-xs text-gray-600">Click play to hear the story</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">📖</div>
                    <p className="text-sm font-medium">Auto-Scroll</p>
                    <p className="text-xs text-gray-600">Watch the story unfold</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm font-medium">Progress Tracking</p>
                    <p className="text-xs text-gray-600">See how much you've read</p>
                  </div>
                </div>
              </div>
              <p className="text-xl font-semibold text-green-700 italic" style={{ color: 'var(--primary-light)' }}>
                Deep in the lush Bamboo Digital Forest lived a panda named Po. He was different from the other pandas because instead of munching on regular bamboo all day, he loved to play with digital bamboo tablets. These magical tablets could connect to all parts of the forest, letting animals share stories, photos, and messages.
              </p>

              <p>
                Po was the shyest animal in the forest. He would hide behind the tallest bamboo stalks whenever other animals came near. Even though he loved his digital tablet, he rarely shared anything with others.
              </p>

              <p>
                "What if they don't like my photos?" he would worry. "What if they laugh at my stories?"
              </p>

              <p>
                So Po kept to himself, quietly exploring the digital pathways of the forest while staying hidden in the shadows.
              </p>

              <p>
                One sunny morning, Po was so excited about a new game on his tablet that he accidentally pressed the wrong button. Suddenly, a message appeared:
              </p>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg my-6"
                   style={{
                     backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2',
                     borderColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.3)' : '#FECACA'
                   }}>
                <p className="text-red-700 font-semibold text-center"
                   style={{ color: theme === 'dark' ? '#F87171' : '#B91C1C' }}>
                  "All your information has been shared with the entire forest!"
                </p>
              </div>

              <p>
                Po gasped! His secret diary, his collection of embarrassing bamboo dance videos, and even his personal information like where he slept and what times he ate – everything was now visible to every animal in the forest!
              </p>

              <p>
                "Oh no!" cried Po, hiding his face behind his paws.
              </p>

              <p>
                Soon, messages started popping up on his tablet.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-300 p-4 my-6"
                   style={{
                     backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#EFF6FF',
                     borderLeftColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : '#93C5FD'
                   }}>
                <p className="text-blue-800 mb-2" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                  "Hey Po, I didn't know you lived in the East Grove!" wrote Miki the Monkey.
                </p>
                <p className="text-blue-800 mb-2" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                  "I've seen you collecting bamboo near my stream," messaged Billy the Beaver.
                </p>
                <p className="text-blue-800" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                  "I love your dancing videos! Can I come watch you practice?" asked Ruby the Rabbit.
                </p>
              </div>

              <p>
                Po was terrified. He turned off his tablet and hid in his den for days, too embarrassed to come out.
              </p>

              <p>
                After a week, there was a gentle knock at his door. It was wise old Turtle, the eldest animal in the forest.
              </p>

              <p>
                "Po," said Turtle softly, "may I come in?"
              </p>

              <p>
                Po reluctantly let Turtle inside.
              </p>

              <p>
                "I know what happened," Turtle said. "And I'm here to help you understand something important about our Digital Forest."
              </p>

              <p>
                Turtle showed Po a special shield he carried.
              </p>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8 text-center"
                   style={{
                     backgroundColor: 'var(--light)',
                     borderColor: 'var(--secondary)'
                   }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--secondary)' }}>
                  <span className="text-2xl">🛡️</span>
                </div>
                <p className="font-semibold text-green-800" style={{ color: 'var(--primary)' }}>
                  "This is a Privacy Shield. It helps protect what we share in the Digital Forest. Let me teach you how to use it."
                </p>
              </div>

              <p>
                Over the next few days, Turtle taught Po many important lessons:
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6"
                   style={{
                     backgroundColor: theme === 'dark' ? 'rgba(251, 191, 36, 0.1)' : '#FFFBEB',
                     borderLeftColor: 'var(--warning)'
                   }}>
                <h3 className="font-bold text-yellow-800 mb-3" style={{ color: theme === 'dark' ? '#FCD34D' : '#92400E' }}>
                  Important Privacy Lessons:
                </h3>
                <ul className="space-y-2 text-yellow-800" style={{ color: theme === 'dark' ? '#FCD34D' : '#92400E' }}>
                  <li>"Information once shared is hard to take back. That's why we must be careful what we share from the beginning."</li>
                  <li>"We can use special privacy settings. These are like fences around your digital bamboo garden."</li>
                  <li>"Most importantly, you have the right to protect your information, just like you protect your home."</li>
                </ul>
              </div>

              <p>
                Po listened carefully and practiced using the Privacy Shield. He learned how to share only what he wanted to share, with only the animals he wanted to see it. He discovered special locks for his diary and how to check if games and apps were safe before using them.
              </p>

              <p>
                As Po became more confident, something unexpected happened. Forest animals began coming to him with questions:
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-300 p-4 my-6"
                   style={{
                     backgroundColor: theme === 'dark' ? 'rgba(147, 51, 234, 0.1)' : '#FAF5FF',
                     borderLeftColor: theme === 'dark' ? 'rgba(147, 51, 234, 0.5)' : '#C4B5FD'
                   }}>
                <p className="text-purple-800 mb-2" style={{ color: theme === 'dark' ? '#C4B5FD' : '#6B21A8' }}>
                  "Po, how do I stop strangers from seeing my photos?" asked Owen the Owl.
                </p>
                <p className="text-purple-800" style={{ color: theme === 'dark' ? '#C4B5FD' : '#6B21A8' }}>
                  "Po, someone is pretending to be me online! What should I do?" worried Fiona the Fox.
                </p>
              </div>

              <p>
                With each question, Po realized he could use what he had learned to help others. He started wearing his Privacy Shield proudly and carried his digital bamboo tablet everywhere he went.
              </p>

              <p>
                Soon, Po wasn't shy anymore. He became known as "Privacy Panda" – the forest's expert on staying safe in the digital world. He created fun games to teach young animals about online safety and held special classes under the tallest bamboo tree.
              </p>

              <div className="bg-green-100 border border-green-300 p-6 rounded-lg my-8"
                   style={{
                     backgroundColor: 'var(--tertiary)',
                     borderColor: 'var(--secondary)'
                   }}>
                <p className="text-green-800 font-semibold text-center text-xl" style={{ color: 'var(--primary)' }}>
                  "Remember, in the Digital Bamboo Forest, we must be as careful with our information as we are with our real bamboo treasures!"
                </p>
              </div>

              <p>
                The animals loved learning from Privacy Panda. His gentle voice and kind smile made even scary topics feel manageable. And whenever a new animal joined the forest, Privacy Panda was the first to greet them, Privacy Shield in hand, ready to guide them safely through their digital adventures.
              </p>

              <p>
                As the seasons changed and the Digital Bamboo Forest grew larger and more complex, Privacy Panda continued his important work. He never forgot how it felt to have his private information exposed, and that memory made him an even better teacher.
              </p>

              <div className="bg-blue-100 border border-blue-300 p-6 rounded-lg my-8"
                   style={{
                     backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#DBEAFE',
                     borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : '#93C5FD'
                   }}>
                <p className="text-blue-800 font-semibold text-center text-xl" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                  "The Digital Forest can be wonderful, but only when we explore it with knowledge and care."
                </p>
              </div>

              <p>
                And so, Privacy Panda protected the forest one animal at a time, teaching them to navigate the digital wilderness with confidence, safety, and a little bit of bamboo-powered wisdom.
              </p>

              <p className="text-center font-bold text-2xl text-green-700 mt-12" style={{ color: 'var(--primary-light)' }}>
                The End
              </p>
            </div>
          </article>

          {/* Discussion Questions */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8" style={{ backgroundColor: 'var(--light)' }}>
            <h2 className="text-3xl font-bold mb-6 text-green-800" style={{ color: 'var(--primary)' }}>
              Discussion Questions
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1"
                      style={{ backgroundColor: 'var(--primary-light)' }}>1</span>
                <p className="text-gray-700" style={{ color: 'var(--gray-700)' }}>
                  What happened when Po accidentally shared all his information? How do you think he felt?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1"
                      style={{ backgroundColor: 'var(--primary-light)' }}>2</span>
                <p className="text-gray-700" style={{ color: 'var(--gray-700)' }}>
                  What are some examples of personal information that should be kept private?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1"
                      style={{ backgroundColor: 'var(--primary-light)' }}>3</span>
                <p className="text-gray-700" style={{ color: 'var(--gray-700)' }}>
                  How did Privacy Panda help other animals in the forest? What made him a good teacher?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1"
                      style={{ backgroundColor: 'var(--primary-light)' }}>4</span>
                <p className="text-gray-700" style={{ color: 'var(--gray-700)' }}>
                  What can you do to create your own "Privacy Shield" when using devices or apps?
                </p>
              </div>
            </div>
          </div>

          {/* Family Hub Integration */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-8" style={{
            backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#F0F9FF',
            borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : '#BFDBFE'
          }}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                Join Our Family Hub Community
              </h3>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                Connect with other families learning about digital privacy together. Share experiences, track progress, and access exclusive resources.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Heart size={24} className="text-red-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Community Support</h4>
                <p className="text-sm text-gray-600">Connect with other families on the same journey</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Sparkles size={24} className="text-purple-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Exclusive Resources</h4>
                <p className="text-sm text-gray-600">Access special content and activities</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Star size={24} className="text-yellow-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your family's learning journey</p>
              </div>
            </div>
            
            <div className="text-center">
              <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Users size={20} />
                Join Family Hub
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Continue Learning with Privacy Panda!</h2>
              <p className="text-lg mb-6 opacity-90">
                Explore more activities, games, and resources to help children learn about digital privacy and online safety.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/activity-book"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <Book size={20} />
                  Activity Book
                </Link>
                <Link
                  to="/story"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
                >
                  <Play size={20} />
                  Interactive Story
                </Link>
                <button
                  onClick={scrollToTop}
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

export default StoryPage;