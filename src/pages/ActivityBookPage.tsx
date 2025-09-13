import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  ArrowLeft, 
  Palette, 
  Puzzle, 
  MapPin, 
  Search, 
  Target, 
  Link as LinkIcon,
  Award,
  Users,
  Play,
  Download,
  CheckCircle,
  Star,
  Filter,
  SortAsc,
  Clock,
  TrendingUp,
  Sparkles,
  Zap
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { useProgress } from '../contexts/ProgressContext';
import Logo from '../components/Logo';
import ActivityManager from '../components/activities/ActivityManager';

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  ageGroup: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  completed?: boolean;
}

const ActivityBookPage: React.FC = () => {
  const { theme } = useTheme();
  const { showSuccess } = useToast();
  const { progress, markActivityCompleted, getOverallProgress } = useProgress();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showActivity, setShowActivity] = useState(false);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'duration'>('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ completed: 0, total: 0 });

  const activities: Activity[] = [
    {
      id: 'coloring',
      title: 'Privacy Password Coloring',
      description: 'Color Privacy Panda guarding the treasure chest with a password lock! Learn about keeping passwords safe.',
      icon: Palette,
      ageGroup: '5-8',
      difficulty: 'Easy',
      duration: '10 mins',
    },
    {
      id: 'sorting',
      title: 'Information Sorting Game',
      description: 'Sort information into "safe to share" and "keep private" categories. Learn what information to protect.',
      icon: Puzzle,
      ageGroup: '5-8',
      difficulty: 'Easy',
      duration: '8 mins',
    },
    {
      id: 'maze',
      title: 'Safe Online Journey Maze',
      description: 'Help Privacy Panda navigate through the digital world safely, avoiding privacy dangers.',
      icon: MapPin,
      ageGroup: '6-10',
      difficulty: 'Medium',
      duration: '12 mins',
    },
    {
      id: 'wordsearch',
      title: 'Privacy Word Search',
      description: 'Find important privacy words hidden in the puzzle. Learn key privacy vocabulary.',
      icon: Search,
      ageGroup: '7-12',
      difficulty: 'Medium',
      duration: '15 mins',
    },
    {
      id: 'connectdots',
      title: 'Privacy Shield Connect-the-Dots',
      description: 'Connect the dots to reveal Privacy Panda\'s protection shield, then color it in!',
      icon: Target,
      ageGroup: '5-8',
      difficulty: 'Easy',
      duration: '10 mins',
    },
    {
      id: 'matching',
      title: 'Privacy Symbol Matching',
      description: 'Match privacy symbols with their meanings. Learn to recognize important digital safety signs.',
      icon: LinkIcon,
      ageGroup: '6-10',
      difficulty: 'Medium',
      duration: '8 mins',
    },
  ];


  const handleActivityStart = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowActivity(true);
  };

  const handleActivityClose = () => {
    setShowActivity(false);
    setSelectedActivity(null);
  };

  const handleActivityComplete = (activityId: string) => {
    markActivityCompleted(activityId);
    const activity = activities.find(a => a.id === activityId);
    showSuccess('Activity Completed!', `Great job completing "${activity?.title}"! Keep up the great work!`);
    setShowActivity(false);
    setSelectedActivity(null);
  };

  const overallProgress = getOverallProgress();

  // Animate stats on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        completed: overallProgress.completedCount,
        total: overallProgress.totalCount
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [overallProgress]);

  // Filter and sort activities
  const filteredActivities = activities
    .filter(activity => {
      const matchesFilter = filter === 'all' || activity.difficulty.toLowerCase() === filter;
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Book size={16} />
              <span className="text-sm font-semibold">INTERACTIVE ACTIVITY BOOK</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Panda
              <span className="block text-yellow-300">Activity Book</span>
            </h1>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Interactive privacy education activities designed for children ages 5-12. 
              Learn about digital safety through fun games, coloring, and puzzles!
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 5-12</span>
              </div>
              <div className="flex items-center gap-2">
                <Play size={16} />
                <span>6 Interactive Activities</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Family Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            style={{ color: 'var(--primary-light)' }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
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
              Your Progress
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-600"
                style={{ width: `${overallProgress.percentage}%` }}
              />
            </div>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              {animatedStats.completed} of {animatedStats.total} activities completed
            </p>
          </div>

          {overallProgress.percentage === 100 && (
            <div className="text-center bg-yellow-50 border border-yellow-200 rounded-lg p-6" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? 'rgba(251, 191, 36, 0.1)' : '#FFFBEB',
                   borderColor: 'var(--warning)'
                 }}>
              <Award className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Congratulations! 🎉
              </h3>
              <p style={{ color: 'var(--gray-700)' }}>
                You've completed all activities and earned your Privacy Champion certificate!
              </p>
              <button className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
                <Award size={20} className="inline mr-2" />
                Get Certificate
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Activities Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
            Choose Your Activity
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--gray-600)' }}>
            Click on any activity to start learning about digital privacy through interactive games and exercises.
          </p>
          
          {/* Interactive Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8" style={{ backgroundColor: 'var(--card-color)' }}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    style={{ backgroundColor: 'var(--white)' }}
                  />
                </div>
              </div>
              
              {/* Filter and Sort */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Filter size={16} />
                  Filter
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'difficulty' | 'duration')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  style={{ backgroundColor: 'var(--white)' }}
                >
                  <option value="name">Sort by Name</option>
                  <option value="difficulty">Sort by Difficulty</option>
                  <option value="duration">Sort by Duration</option>
                </select>
              </div>
            </div>
            
            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    All Activities
                  </button>
                  <button
                    onClick={() => setFilter('easy')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => setFilter('medium')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'medium' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setFilter('hard')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'hard' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Hard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                No activities found
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredActivities.map((activity) => {
            const Icon = activity.icon;
            const isCompleted = progress.completedActivities.includes(activity.id);
            
            return (
              <div
                key={activity.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 ${
                  isCompleted ? 'border-green-500' : 'border-transparent'
                }`}
                style={{ 
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleActivityStart(activity)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    {isCompleted && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {activity.title}
                  </h3>
                  
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {activity.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
                      Ages {activity.ageGroup}
                    </span>
                    <button 
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActivityStart(activity);
                      }}
                    >
                      {isCompleted ? 'Play Again' : 'Start'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
          )}
        </div>
      </section>

      {/* Interactive Activity */}
      {showActivity && selectedActivity && (
        <ActivityManager
          activityId={selectedActivity.id}
          onClose={handleActivityClose}
          onComplete={handleActivityComplete}
        />
      )}

      {/* Parent Resources Section */}
      <section className="bg-gray-50 py-16" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              For Parents & Educators
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
              Additional resources to support privacy education and continue the learning at home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Download size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Printable Activities
              </h3>
              <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                Download coloring sheets, certificates, and offline activities to continue learning away from screens.
              </p>
              <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                Download Resources →
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Discussion Guides
              </h3>
              <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                Conversation starters and questions to discuss privacy concepts with your children after activities.
              </p>
              <Link to="/#parent-resources" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                View Guides →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Book size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Privacy Panda Story
              </h3>
              <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                Read the full Digital Bamboo Forest story that teaches privacy concepts through storytelling.
              </p>
              <Link to="/story" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                Read Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Continue Your Privacy Learning Journey
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Explore more age-appropriate resources and activities designed to build strong privacy habits for life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/#age-groups"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Users size={20} />
              Explore Age Groups
            </Link>
            <Link 
              to="/story"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
            >
              <Book size={20} />
              Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivityBookPage;