import React, { Suspense, useState } from 'react';
import { ArrowLeft, Play, Star, Target, Clock, Filter, Search, Trophy, Sparkles, Map, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFamilyProgress } from '../../contexts/FamilyProgressContext';
import { useActiveMember } from '../../utils/familyProgressIntegration';

// Lazy load game components
const PasswordStrengthLab = React.lazy(() => import('../games/PasswordStrengthLab'));
const SafeUnsafeSorting = React.lazy(() => import('../games/SafeUnsafeSorting'));
const PhishingDetective = React.lazy(() => import('../games/PhishingDetective'));
const DigitalRightsQuiz = React.lazy(() => import('../games/DigitalRightsQuiz'));
const PrivacyStoryAdventure = React.lazy(() => import('../games/PrivacyStoryAdventure'));
const PasswordPetCreator = React.lazy(() => import('../games/PasswordPetCreator'));
const PrivacySettingsTrainer = React.lazy(() => import('../games/PrivacySettingsTrainer'));
const SocialMediaAudit = React.lazy(() => import('../games/SocialMediaAudit'));
const DigitalFootprintVisualizer = React.lazy(() => import('../games/DigitalFootprintVisualizer'));
const SocialMediaSimulator = React.lazy(() => import('../games/SocialMediaSimulator'));
const PasswordFortressBuilder = React.lazy(() => import('../games/PasswordFortressBuilder'));
const PrivacyPolicyDecoder = React.lazy(() => import('../games/PrivacyPolicyDecoder'));

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ageGroup: 'elementary' | 'middle' | 'high' | 'all';
  color: string;
  duration: string;
  component: React.LazyExoticComponent<React.ComponentType<{ onBack: () => void }>>;
}

const games: Game[] = [
  {
    id: 'password-strength',
    name: 'Password Strength Lab',
    description: 'Learn to create super strong passwords!',
    icon: '🔐',
    difficulty: 'Easy',
    ageGroup: 'all',
    color: 'from-blue-500 to-cyan-500',
    duration: '5 min',
    component: PasswordStrengthLab
  },
  {
    id: 'password-pet',
    name: 'Password Pet Creator',
    description: 'Create a pet that grows stronger with your password!',
    icon: '🐾',
    difficulty: 'Easy',
    ageGroup: 'elementary',
    color: 'from-pink-500 to-rose-500',
    duration: '5 min',
    component: PasswordPetCreator
  },
  {
    id: 'safe-unsafe',
    name: 'Safe vs Unsafe Sorting',
    description: 'Sort online behaviors into safe and unsafe categories',
    icon: '✅',
    difficulty: 'Easy',
    ageGroup: 'all',
    color: 'from-green-500 to-emerald-500',
    duration: '8 min',
    component: SafeUnsafeSorting
  },
  {
    id: 'privacy-story',
    name: 'Privacy Story Adventure',
    description: 'Make choices in an interactive privacy story',
    icon: '📖',
    difficulty: 'Easy',
    ageGroup: 'elementary',
    color: 'from-yellow-500 to-orange-500',
    duration: '10 min',
    component: PrivacyStoryAdventure
  },
  {
    id: 'digital-footprint',
    name: 'Digital Footprint Visualizer',
    description: 'See how your online activities create a digital footprint',
    icon: '👣',
    difficulty: 'Medium',
    ageGroup: 'all',
    color: 'from-teal-500 to-cyan-500',
    duration: '8 min',
    component: DigitalFootprintVisualizer
  },
  {
    id: 'phishing-detective',
    name: 'Phishing Detective',
    description: 'Identify phishing emails and protect yourself from scams',
    icon: '🔍',
    difficulty: 'Medium',
    ageGroup: 'middle',
    color: 'from-orange-500 to-red-500',
    duration: '10 min',
    component: PhishingDetective
  },
  {
    id: 'privacy-settings',
    name: 'Privacy Settings Trainer',
    description: 'Learn to configure privacy settings on popular apps',
    icon: '⚙️',
    difficulty: 'Medium',
    ageGroup: 'all',
    color: 'from-gray-500 to-slate-600',
    duration: '8 min',
    component: PrivacySettingsTrainer
  },
  {
    id: 'social-media-audit',
    name: 'Social Media Audit',
    description: 'Review and improve your social media privacy settings',
    icon: '📱',
    difficulty: 'Medium',
    ageGroup: 'middle',
    color: 'from-indigo-500 to-purple-500',
    duration: '10 min',
    component: SocialMediaAudit
  },
  {
    id: 'social-simulator',
    name: 'Social Media Simulator',
    description: 'Practice safe social media habits in a simulation',
    icon: '🌐',
    difficulty: 'Medium',
    ageGroup: 'middle',
    color: 'from-blue-600 to-indigo-600',
    duration: '12 min',
    component: SocialMediaSimulator
  },
  {
    id: 'password-fortress',
    name: 'Password Fortress Builder',
    description: 'Build an impenetrable password fortress!',
    icon: '🏰',
    difficulty: 'Medium',
    ageGroup: 'all',
    color: 'from-amber-500 to-yellow-500',
    duration: '8 min',
    component: PasswordFortressBuilder
  },
  {
    id: 'digital-rights',
    name: 'Digital Rights Quiz',
    description: 'Test your knowledge of digital privacy rights',
    icon: '⚖️',
    difficulty: 'Hard',
    ageGroup: 'high',
    color: 'from-purple-500 to-pink-500',
    duration: '15 min',
    component: DigitalRightsQuiz
  },
  {
    id: 'privacy-decoder',
    name: 'Privacy Policy Decoder',
    description: 'Learn to understand privacy policies in plain language',
    icon: '📜',
    difficulty: 'Hard',
    ageGroup: 'high',
    color: 'from-red-500 to-rose-600',
    duration: '12 min',
    component: PrivacyPolicyDecoder
  }
];

const LearningHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterAge, setFilterAge] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { getMemberProgress } = useFamilyProgress();
  const { currentMemberId } = useActiveMember();

  // Get progress for current member
  const memberProgress = currentMemberId ? getMemberProgress(currentMemberId) : null;
  const completedGames = memberProgress?.activities.filter(a => a.activityType === 'game').map(a => a.activityId) || [];

  const filteredGames = games.filter(game => {
    const matchesDifficulty = filterDifficulty === 'all' || game.difficulty === filterDifficulty;
    const matchesAge = filterAge === 'all' || game.ageGroup === filterAge || game.ageGroup === 'all';
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesAge && matchesSearch;
  });

  const handleBack = () => {
    if (selectedGame) {
      setSelectedGame(null);
    } else {
      navigate('/family-hub');
    }
  };

  // If a game is selected, render it
  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    if (game) {
      const GameComponent = game.component;
      return (
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">{game.icon}</div>
              <p className="text-gray-600 dark:text-gray-300">Loading {game.name}...</p>
            </div>
          </div>
        }>
          <GameComponent onBack={handleBack} />
        </Suspense>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Teal Theme */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="mb-4 flex items-center space-x-2 text-teal-600 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-100 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Family Hub</span>
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-teal-800 dark:text-gray-100 flex items-center space-x-3">
                <Sparkles className="text-yellow-500" size={36} />
                <span>Learning Hub</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Play fun games and learn to protect your privacy! 🎮🔐
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-500" size={20} />
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {completedGames.length}/{games.length}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Games Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Age Filter */}
            <select
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="all">All Ages</option>
              <option value="elementary">Elementary (Ages 6-10)</option>
              <option value="middle">Middle School (Ages 11-13)</option>
              <option value="high">High School (Ages 14+)</option>
            </select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => {
            const isCompleted = completedGames.includes(game.id);
            
            return (
              <div
                key={game.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Game Header */}
                <div className={`bg-gradient-to-r ${game.color} p-6 text-white relative`}>
                  <div className="text-5xl mb-2">{game.icon}</div>
                  {isCompleted && (
                    <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                      <Star className="text-yellow-500" size={20} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1">{game.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{game.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.difficulty === 'Easy' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300' :
                      game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}>
                      <Target size={12} className="inline mr-1" />
                      {game.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      <Clock size={12} className="inline mr-1" />
                      {game.duration}
                    </span>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => setSelectedGame(game.id)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isCompleted
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        : `bg-gradient-to-r ${game.color} text-white hover:opacity-90`
                    }`}
                  >
                    <Play size={18} />
                    <span>{isCompleted ? 'Play Again' : 'Start Game'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No games found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Journey Hub Section - Teal Theme */}
        <div className="mt-8 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Map className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Privacy Journeys</h3>
                <p className="text-white/80 text-sm">
                  Structured learning paths designed for different age groups. Build skills step by step!
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/family-hub/journeys')}
              className="flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 hover:text-teal-800 transition-all w-full md:w-auto justify-center"
            >
              <span>Explore Journeys</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer Note - Teal Theme */}
        <div className="mt-8 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Learning Tips for Parents</h4>
              <p className="text-sm text-teal-700 dark:text-teal-300">
                These games are designed to be fun while teaching important privacy concepts. 
                Play together with your children to discuss the lessons and reinforce good online habits!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;

