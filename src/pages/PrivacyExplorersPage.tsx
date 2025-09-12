import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Star, Trophy, Clock, Users, BookOpen, Gamepad2 } from 'lucide-react';
import Logo from '../components/Logo';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  completed: boolean;
  points: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PrivacyExplorersPage: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const challenges: Challenge[] = [
    {
      id: 'password-strength',
      title: 'Password Fortress Challenge',
      description: 'Learn to create strong passwords and protect your accounts like a digital fortress.',
      difficulty: 'Easy',
      duration: '10 mins',
      completed: false,
      points: 50,
      icon: Lock
    },
    {
      id: 'privacy-settings',
      title: 'Privacy Settings Detective',
      description: 'Become a detective and learn how to find and adjust privacy settings on popular apps.',
      difficulty: 'Medium',
      duration: '15 mins',
      completed: false,
      points: 75,
      icon: Eye
    },
    {
      id: 'phishing-hunter',
      title: 'Phishing Hunter Mission',
      description: 'Spot fake emails and messages that try to trick you into giving away personal information.',
      difficulty: 'Hard',
      duration: '20 mins',
      completed: false,
      points: 100,
      icon: AlertTriangle
    },
    {
      id: 'digital-footprint',
      title: 'Digital Footprint Explorer',
      description: 'Discover what information you leave behind online and how to manage your digital trail.',
      difficulty: 'Medium',
      duration: '18 mins',
      completed: false,
      points: 80,
      icon: Shield
    },
    {
      id: 'social-media-safety',
      title: 'Social Media Safety Quest',
      description: 'Learn the dos and don\'ts of sharing on social media platforms safely.',
      difficulty: 'Easy',
      duration: '12 mins',
      completed: false,
      points: 60,
      icon: Users
    },
    {
      id: 'data-protection',
      title: 'Data Protection Warrior',
      description: 'Master the art of protecting your personal data from prying eyes.',
      difficulty: 'Hard',
      duration: '25 mins',
      completed: false,
      points: 120,
      icon: Shield
    }
  ];

  useEffect(() => {
    // Load user progress from localStorage
    const savedPoints = localStorage.getItem('privacy_explorers_points');
    const savedCompleted = localStorage.getItem('privacy_explorers_completed');
    
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints));
    }
    if (savedCompleted) {
      setCompletedChallenges(JSON.parse(savedCompleted));
    }
  }, []);

  const handleChallengeStart = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowChallenge(true);
  };

  const handleChallengeComplete = (challengeId: string) => {
    if (!completedChallenges.includes(challengeId)) {
      const challenge = challenges.find(c => c.id === challengeId);
      if (challenge) {
        const newPoints = userPoints + challenge.points;
        const newCompleted = [...completedChallenges, challengeId];
        
        setUserPoints(newPoints);
        setCompletedChallenges(newCompleted);
        
        // Save to localStorage
        localStorage.setItem('privacy_explorers_points', newPoints.toString());
        localStorage.setItem('privacy_explorers_completed', JSON.stringify(newCompleted));
      }
    }
    setShowChallenge(false);
    setSelectedChallenge(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalPoints = () => {
    return challenges.reduce((total, challenge) => total + challenge.points, 0);
  };

  const getCompletionPercentage = () => {
    return Math.round((completedChallenges.length / challenges.length) * 100);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 relative overflow-hidden">
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
              <Shield size={16} />
              <span className="text-sm font-semibold">PRIVACY EXPLORERS</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Explorers
              <span className="block text-yellow-300">Ages 9-12</span>
            </h1>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Interactive privacy challenges and games designed specifically for tweens. 
              Learn digital safety through exciting quests and missions!
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 9-12</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 size={16} />
                <span>6 Interactive Challenges</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>Earn Points & Badges</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            style={{ color: 'var(--primary-light)' }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Progress Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12" style={{ 
          backgroundColor: 'var(--card-color)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Your Explorer Progress
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{userPoints}</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completedChallenges.length}</div>
                <div className="text-sm text-gray-600">Challenges Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{getCompletionPercentage()}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-600"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
          </div>

          {getCompletionPercentage() === 100 && (
            <div className="text-center bg-yellow-50 border border-yellow-200 rounded-lg p-6" 
                 style={{ 
                   backgroundColor: 'var(--light)',
                   borderColor: 'var(--warning)'
                 }}>
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Congratulations! 🎉
              </h3>
              <p style={{ color: 'var(--gray-700)' }}>
                You've completed all Privacy Explorer challenges and earned your Digital Privacy Champion badge!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
            Privacy Challenges
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
            Complete these interactive challenges to become a Privacy Explorer. Each challenge teaches important digital safety skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            const isCompleted = completedChallenges.includes(challenge.id);
            
            return (
              <div
                key={challenge.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 ${
                  isCompleted ? 'border-green-500' : 'border-transparent'
                }`}
                style={{ 
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleChallengeStart(challenge)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    {isCompleted && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {challenge.title}
                  </h3>
                  
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {challenge.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {challenge.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-purple-600">
                      {challenge.points} points
                    </span>
                    <button 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChallengeStart(challenge);
                      }}
                    >
                      {isCompleted ? 'Play Again' : 'Start Challenge'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Challenge Modal */}
      {showChallenge && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {selectedChallenge.title}
                </h3>
                <button 
                  onClick={() => setShowChallenge(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-lg mb-4" style={{ color: 'var(--gray-600)' }}>
                  {selectedChallenge.description}
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                    Challenge Instructions:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1" style={{ color: 'var(--gray-600)' }}>
                    <li>Read all instructions carefully before starting</li>
                    <li>Take your time to understand each concept</li>
                    <li>Ask for help if you need clarification</li>
                    <li>Complete all tasks to earn your points</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => handleChallengeComplete(selectedChallenge.id)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Become a Privacy Explorer?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey to becoming a digital privacy champion. Complete challenges, earn points, and unlock new skills!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/activity-book"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen size={20} />
              Try Activity Book
            </Link>
            <Link 
              to="/family-hub"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center gap-2"
            >
              <Users size={20} />
              Family Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyExplorersPage;