import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, CheckCircle, BookOpen, Star, Users, Smartphone, Globe } from 'lucide-react';
import Logo from '../components/Logo';

interface Guide {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'advanced' | 'tools' | 'social';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  content: string[];
}

const PrivacyHandbookPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [completedGuides, setCompletedGuides] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const guides: Guide[] = [
    {
      id: 'password-basics',
      title: 'Password Protection Basics',
      description: 'Learn how to create and manage strong passwords that keep your accounts safe.',
      category: 'basics',
      difficulty: 'Beginner',
      duration: '15 mins',
      completed: false,
      icon: Lock,
      content: [
        'What makes a password strong?',
        'How to create memorable but secure passwords',
        'Using password managers safely',
        'Two-factor authentication explained',
        'What to do if your password is compromised'
      ]
    },
    {
      id: 'privacy-settings',
      title: 'Privacy Settings Mastery',
      description: 'Master the art of configuring privacy settings across different platforms and apps.',
      category: 'tools',
      difficulty: 'Intermediate',
      duration: '20 mins',
      completed: false,
      icon: Eye,
      content: [
        'Understanding privacy settings on social media',
        'Browser privacy configurations',
        'Mobile device privacy controls',
        'Location sharing best practices',
        'Data collection opt-out strategies'
      ]
    },
    {
      id: 'social-media-safety',
      title: 'Social Media Safety Guide',
      description: 'Navigate social media platforms safely while protecting your personal information.',
      category: 'social',
      difficulty: 'Intermediate',
      duration: '18 mins',
      completed: false,
      icon: Users,
      content: [
        'What information to never share publicly',
        'How to spot fake accounts and scams',
        'Managing your social media presence',
        'Dealing with cyberbullying and harassment',
        'Creating positive online relationships'
      ]
    },
    {
      id: 'data-protection',
      title: 'Personal Data Protection',
      description: 'Understand what data companies collect and how to protect your personal information.',
      category: 'advanced',
      difficulty: 'Advanced',
      duration: '25 mins',
      completed: false,
      icon: Shield,
      content: [
        'Understanding data collection practices',
        'Your rights under privacy laws',
        'How to request data deletion',
        'Protecting your digital footprint',
        'Using encryption and secure communication'
      ]
    },
    {
      id: 'mobile-privacy',
      title: 'Mobile Device Privacy',
      description: 'Secure your smartphone and tablet to protect your personal information on the go.',
      category: 'tools',
      difficulty: 'Intermediate',
      duration: '22 mins',
      completed: false,
      icon: Smartphone,
      content: [
        'App permissions and what they mean',
        'Securing your mobile device',
        'Safe app downloading practices',
        'Mobile payment security',
        'Protecting your location data'
      ]
    },
    {
      id: 'online-reputation',
      title: 'Managing Your Online Reputation',
      description: 'Build and maintain a positive digital presence that reflects your best self.',
      category: 'advanced',
      difficulty: 'Advanced',
      duration: '30 mins',
      completed: false,
      icon: Globe,
      content: [
        'Understanding digital reputation',
        'Monitoring your online presence',
        'Responding to negative content',
        'Building a positive digital identity',
        'Long-term reputation management'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Guides', icon: BookOpen },
    { id: 'basics', label: 'Basics', icon: Lock },
    { id: 'tools', label: 'Tools & Settings', icon: Eye },
    { id: 'social', label: 'Social Media', icon: Users },
    { id: 'advanced', label: 'Advanced', icon: Shield }
  ];

  const filteredGuides = activeCategory === 'all'
    ? guides
    : guides.filter(guide => guide.category === activeCategory);

  useEffect(() => {
    // Load completed guides from localStorage
    const savedCompleted = localStorage.getItem('privacy_handbook_completed');
    if (savedCompleted) {
      setCompletedGuides(JSON.parse(savedCompleted));
    }
  }, []);

  const handleGuideStart = (guide: Guide) => {
    setSelectedGuide(guide);
    setShowGuide(true);
  };

  const handleGuideComplete = (guideId: string) => {
    if (!completedGuides.includes(guideId)) {
      const newCompleted = [...completedGuides, guideId];
      setCompletedGuides(newCompleted);
      localStorage.setItem('privacy_handbook_completed', JSON.stringify(newCompleted));
    }
    setShowGuide(false);
    setSelectedGuide(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryInfo = categories.find(cat => cat.id === category);
    return categoryInfo ? categoryInfo.icon : BookOpen;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 relative overflow-hidden">
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
              <span className="text-sm font-semibold">PRIVACY PROTECTOR'S GUIDE</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Protector's Guide
              <span className="block text-yellow-300">Ages 9-12</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Hands-on projects and practical guides that teach tweens how to protect personal information
              and navigate online spaces safely. Become a digital privacy expert!
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 9-12</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>6 Comprehensive Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>Practical Skills</span>
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
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
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
              Your Learning Progress
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completedGuides.length}</div>
                <div className="text-sm text-gray-600">Guides Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{guides.length}</div>
                <div className="text-sm text-gray-600">Total Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round((completedGuides.length / guides.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-6 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: activeCategory === category.id ? 'var(--primary-light)' : undefined,
                    color: activeCategory === category.id ? 'white' : undefined
                  }}
                >
                  <Icon size={16} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => {
            const Icon = guide.icon;
            const CategoryIcon = getCategoryIcon(guide.category);
            const isCompleted = completedGuides.includes(guide.id);

            return (
              <div
                key={guide.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 ${
                  isCompleted ? 'border-green-500' : 'border-transparent'
                }`}
                style={{
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleGuideStart(guide)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    {isCompleted && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500 capitalize">{guide.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {guide.title}
                  </h3>

                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {guide.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {guide.duration}
                    </span>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGuideStart(guide);
                    }}
                  >
                    {isCompleted ? 'Review Guide' : 'Start Learning'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Guide Modal */}
      {showGuide && selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {selectedGuide.title}
                </h3>
                <button
                  onClick={() => setShowGuide(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-lg mb-6" style={{ color: 'var(--gray-600)' }}>
                  {selectedGuide.description}
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                    What You'll Learn:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                    {selectedGuide.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedGuide.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedGuide.difficulty)}`}>
                      {selectedGuide.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleGuideComplete(selectedGuide.id)}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
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
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Become a Privacy Protector?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey to becoming a digital privacy expert. Learn practical skills that will protect you and your family online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/privacy-explorers"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Shield size={20} />
              Try Privacy Explorers
            </Link>
            <Link to="/family-hub"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
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

export default PrivacyHandbookPage;