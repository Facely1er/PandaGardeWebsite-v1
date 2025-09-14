import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Shield, Lock, Eye, AlertTriangle, CheckCircle, Star, Trophy, Clock, BookOpen, Users, Globe, Settings } from 'lucide-react';
import Logo from '../components/Logo';

interface Chapter {
  id: string;
  title: string;
  description: string;
  category: 'social-media' | 'privacy' | 'security' | 'reputation' | 'rights' | 'tools';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  topics: string[];
  practicalTips: string[];
}

const TeenHandbookPage: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [showChapter, setShowChapter] = useState(false);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const chapters: Chapter[] = [
    {
      id: 'social-media-privacy',
      title: 'Social Media Privacy Mastery',
      description: 'Comprehensive guide to protecting your privacy on all major social media platforms.',
      category: 'social-media',
      difficulty: 'Intermediate',
      duration: '30 mins',
      completed: false,
      icon: Users,
      topics: [
        'Facebook privacy settings deep dive',
        'Instagram story and post privacy',
        'Twitter account security',
        'TikTok data collection and controls',
        'Snapchat privacy features',
        'LinkedIn professional privacy'
      ],
      practicalTips: [
        'Review your privacy settings monthly',
        'Use strong, unique passwords for each platform',
        'Enable two-factor authentication everywhere',
        'Be selective about friend/follower requests',
        'Regularly audit your posts and photos'
      ]
    },
    {
      id: 'data-rights',
      title: 'Understanding Your Data Rights',
      description: 'Learn about your rights under privacy laws and how to exercise them effectively.',
      category: 'rights',
      difficulty: 'Advanced',
      duration: '25 mins',
      completed: false,
      icon: Globe,
      topics: [
        'GDPR and your rights as a teen',
        'CCPA and California privacy rights',
        'COPPA and under-13 protections',
        'How to request your data',
        'Right to deletion and correction',
        'Opting out of data collection'
      ],
      practicalTips: [
        'Keep records of your data requests',
        'Use privacy rights request templates',
        'Understand what data companies collect',
        'Know when you can legally consent',
        'Document privacy violations'
      ]
    },
    {
      id: 'online-reputation',
      title: 'Online Reputation Management',
      description: 'Build and maintain a positive digital presence that reflects your best self.',
      category: 'reputation',
      difficulty: 'Intermediate',
      duration: '28 mins',
      completed: false,
      icon: Star,
      topics: [
        'Understanding digital reputation impact',
        'Google search result management',
        'Social media content strategy',
        'Handling negative content',
        'Building professional online presence',
        'Long-term reputation planning'
      ],
      practicalTips: [
        'Google yourself regularly',
        'Create positive content consistently',
                'Address negative content professionally',
        'Use privacy settings strategically',
        'Think before you post - always'
      ]
    },
    {
      id: 'privacy-tools',
      title: 'Advanced Privacy Tools',
      description: 'Master the tools and techniques that privacy experts use to protect their data.',
      category: 'tools',
      difficulty: 'Advanced',
      duration: '35 mins',
      completed: false,
      icon: Settings,
      topics: [
        'VPN setup and configuration',
        'Password manager implementation',
        'Encrypted messaging apps',
        'Private browsing techniques',
        'Ad blockers and tracking protection',
        'Secure file sharing methods'
      ],
      practicalTips: [
        'Use a reputable VPN service',
        'Generate unique passwords for everything',
        'Enable end-to-end encryption',
        'Regularly update all privacy tools',
        'Test your privacy setup regularly'
      ]
    },
    {
      id: 'cyber-security',
      title: 'Cybersecurity for Teens',
      description: 'Protect yourself from hackers, scammers, and other online threats.',
      category: 'security',
      difficulty: 'Intermediate',
      duration: '32 mins',
      completed: false,
      icon: Shield,
      topics: [
        'Recognizing phishing attempts',
        'Malware protection strategies',
        'Secure Wi-Fi practices',
        'Mobile device security',
        'Social engineering awareness',
        'Incident response planning'
      ],
      practicalTips: [
        'Never click suspicious links',
        'Keep all software updated',
        'Use public Wi-Fi cautiously',
        'Enable device encryption',
        'Have a security incident plan'
      ]
    },
    {
      id: 'privacy-fundamentals',
      title: 'Privacy Fundamentals for Teens',
      description: 'Core privacy concepts every teenager should understand in the digital age.',
      category: 'privacy',
      difficulty: 'Beginner',
      duration: '22 mins',
      completed: false,
      icon: Lock,
      topics: [
        'What is personal information?',
        'How data collection works',
        'Understanding privacy policies',
        'Consent and your rights',
        'Data sharing and third parties',
        'Privacy by design principles'
      ],
      practicalTips: [
        'Read privacy policies before signing up',
        'Minimize data sharing when possible',
        'Understand what you\'re agreeing to',
        'Ask questions about data use',
        'Be skeptical of "free" services'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Chapters', icon: BookOpen },
    { id: 'social-media', label: 'Social Media', icon: Users },
    { id: 'privacy', label: 'Privacy Basics', icon: Lock },
    { id: 'security', label: 'Cybersecurity', icon: Shield },
    { id: 'reputation', label: 'Reputation', icon: Star },
    { id: 'rights', label: 'Data Rights', icon: Globe },
    { id: 'tools', label: 'Privacy Tools', icon: Settings }
  ];

  const filteredChapters = activeCategory === 'all'
    ? chapters
    : chapters.filter(chapter => chapter.category === activeCategory);

  useEffect(() => {
    // Load completed chapters from localStorage
    const savedCompleted = localStorage.getItem('teen_handbook_completed');
    if (savedCompleted) {
      setCompletedChapters(JSON.parse(savedCompleted));
    }
  }, []);

  const handleChapterStart = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setShowChapter(true);
  };

  const handleChapterComplete = (chapterId: string) => {
    if (!completedChapters.includes(chapterId)) {
      const newCompleted = [...completedChapters, chapterId];
      setCompletedChapters(newCompleted);
      localStorage.setItem('teen_handbook_completed', JSON.stringify(newCompleted));
    }
    setShowChapter(false);
    setSelectedChapter(null);
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
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 relative overflow-hidden">
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
              <Smartphone size={16} />
              <span className="text-sm font-semibold">TEEN PRIVACY HANDBOOK</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Teen Privacy Handbook
              <span className="block text-yellow-300">Ages 13-17</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Comprehensive privacy guide for teenagers covering social media, data rights,
              online reputation, and advanced security concepts. Take control of your digital life!
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 13-17</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>6 Comprehensive Chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>Advanced Concepts</span>
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
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
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
              Your Learning Journey
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{completedChapters.length}</div>
                <div className="text-sm text-gray-600">Chapters Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{chapters.length}</div>
                <div className="text-sm text-gray-600">Total Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((completedChapters.length / chapters.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-purple-600"
                style={{ width: `${Math.round((completedChapters.length / chapters.length) * 100)}%` }}
              />
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
                      ? 'bg-indigo-500 text-white'
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

      {/* Chapters Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChapters.map((chapter) => {
            const Icon = chapter.icon;
            const CategoryIcon = getCategoryIcon(chapter.category);
            const isCompleted = completedChapters.includes(chapter.id);

            return (
              <div
                key={chapter.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 ${
                  isCompleted ? 'border-green-500' : 'border-transparent'
                }`}
                style={{
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleChapterStart(chapter)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    {isCompleted && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500 capitalize">{chapter.category.replace('-', ' ')}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {chapter.title}
                  </h3>

                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {chapter.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(chapter.difficulty)}`}>
                      {chapter.difficulty}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {chapter.duration}
                    </span>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChapterStart(chapter);
                    }}
                  >
                    {isCompleted ? 'Review Chapter' : 'Start Learning'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chapter Modal */}
      {showChapter && selectedChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {selectedChapter.title}
                </h3>
                <button
                  onClick={() => setShowChapter(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-lg mb-6" style={{ color: 'var(--gray-600)' }}>
                  {selectedChapter.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Topics Covered:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedChapter.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Practical Tips:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedChapter.practicalTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedChapter.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedChapter.difficulty)}`}>
                      {selectedChapter.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleChapterComplete(selectedChapter.id)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
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
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Privacy?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey to becoming a privacy-savvy teenager. Learn the skills you need to protect yourself and your data online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/privacy-tools"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Settings size={20} />
              Privacy Tools
            </Link>
            <Link
              to="/family-hub"
              className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors inline-flex items-center gap-2"
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

export default TeenHandbookPage;