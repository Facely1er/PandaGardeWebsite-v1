import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Globe, Shield, BookOpen, CheckCircle, Star, Trophy, Clock, Users, AlertTriangle, FileText } from 'lucide-react';
import Logo from '../components/Logo';

interface LawModule {
  id: string;
  title: string;
  description: string;
  category: 'privacy-laws' | 'data-rights' | 'consent' | 'international' | 'enforcement' | 'future';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  keyPoints: string[];
  realWorldExamples: string[];
  yourRights: string[];
}

const DigitalRightsPage: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<LawModule | null>(null);
  const [showModule, setShowModule] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const modules: LawModule[] = [
    {
      id: 'gdpr-basics',
      title: 'GDPR: Your Privacy Rights in Europe',
      description: 'Understand the General Data Protection Regulation and how it protects your personal data.',
      category: 'privacy-laws',
      difficulty: 'Intermediate',
      duration: '25 mins',
      completed: false,
      icon: Globe,
      keyPoints: [
        'GDPR applies to anyone in the EU, regardless of citizenship',
        'You have the right to access your personal data',
        'You can request deletion of your data ("right to be forgotten")',
        'Companies must get clear consent before collecting data',
        'You can object to automated decision-making',
        'Data breaches must be reported within 72 hours'
      ],
      realWorldExamples: [
        'Requesting your data from Facebook or Google',
        'Asking a company to delete your account and data',
        'Opting out of targeted advertising',
        'Getting a copy of your school records',
        'Challenging automated decisions in college admissions'
      ],
      yourRights: [
        'Right to be informed about data collection',
        'Right of access to your personal data',
        'Right to rectification of inaccurate data',
        'Right to erasure ("right to be forgotten")',
        'Right to restrict processing',
        'Right to data portability',
        'Right to object to processing',
        'Rights related to automated decision-making'
      ]
    },
    {
      id: 'ccpa-california',
      title: 'CCPA: California Consumer Privacy Act',
      description: 'Learn about California\'s privacy law and how it affects your rights as a consumer.',
      category: 'privacy-laws',
      difficulty: 'Intermediate',
      duration: '22 mins',
      completed: false,
      icon: Scale,
      keyPoints: [
        'CCPA applies to California residents, regardless of age',
        'You have the right to know what personal information is collected',
        'You can opt out of the sale of personal information',
        'You have the right to delete personal information',
        'You cannot be discriminated against for exercising your rights',
        'Businesses must provide clear privacy notices'
      ],
      realWorldExamples: [
        'Opting out of data sales on websites',
        'Requesting what data companies have about you',
        'Asking companies to delete your information',
        'Understanding why you\'re seeing certain ads',
        'Exercising rights without fear of retaliation'
      ],
      yourRights: [
        'Right to know what personal information is collected',
        'Right to know whether personal information is sold',
        'Right to say no to the sale of personal information',
        'Right to access your personal information',
        'Right to equal service and price',
        'Right to delete personal information'
      ]
    },
    {
      id: 'coppa-under-13',
      title: 'COPPA: Protection for Kids Under 13',
      description: 'Understand how the Children\'s Online Privacy Protection Act protects younger users.',
      category: 'consent',
      difficulty: 'Beginner',
      duration: '18 mins',
      completed: false,
      icon: Shield,
      keyPoints: [
        'COPPA protects children under 13 years old',
        'Parental consent is required for data collection',
        'Companies cannot collect more data than necessary',
        'Parents have the right to review and delete data',
        'No behavioral advertising to children under 13',
        'Companies must have clear privacy policies'
      ],
      realWorldExamples: [
        'Why some apps require parental permission',
        'How schools handle student data collection',
        'Why some websites block users under 13',
        'Parental controls on devices and apps',
        'Educational apps and data protection'
      ],
      yourRights: [
        'Right to have parental consent before data collection',
        'Right to have data deleted by parents',
        'Right to not be targeted with ads',
        'Right to age-appropriate privacy protections',
        'Right to have data used only for stated purposes'
      ]
    },
    {
      id: 'international-laws',
      title: 'International Privacy Laws',
      description: 'Explore privacy laws around the world and how they affect global internet users.',
      category: 'international',
      difficulty: 'Advanced',
      duration: '30 mins',
      completed: false,
      icon: Globe,
      keyPoints: [
        'Different countries have different privacy standards',
        'Some countries have stronger protections than others',
        'Cross-border data transfers have special rules',
        'Some countries require data to stay within borders',
        'International companies must comply with multiple laws',
        'Privacy laws are constantly evolving'
      ],
      realWorldExamples: [
        'How TikTok handles data differently in different countries',
        'Why some apps aren\'t available in certain regions',
        'Data localization requirements in some countries',
        'Cross-border data transfer agreements',
        'International privacy law enforcement cooperation'
      ],
      yourRights: [
        'Right to know which laws apply to you',
        'Right to data protection regardless of location',
        'Right to understand cross-border data flows',
        'Right to complain to international authorities',
        'Right to consistent privacy protections'
      ]
    },
    {
      id: 'enforcement-complaints',
      title: 'How to Enforce Your Rights',
      description: 'Learn how to file complaints and take action when your privacy rights are violated.',
      category: 'enforcement',
      difficulty: 'Intermediate',
      duration: '28 mins',
      completed: false,
      icon: AlertTriangle,
      keyPoints: [
        'You can file complaints with privacy authorities',
        'Keep records of privacy violations',
        'Many violations can be resolved directly with companies',
        'Legal action may be possible for serious violations',
        'Privacy authorities can investigate and fine companies',
        'You have the right to compensation for damages'
      ],
      realWorldExamples: [
        'Filing a complaint with your country\'s data protection authority',
        'Contacting companies directly about privacy violations',
        'Using privacy rights request templates',
        'Documenting evidence of privacy violations',
        'Seeking legal advice for serious violations'
      ],
      yourRights: [
        'Right to file complaints with authorities',
        'Right to seek legal remedies',
        'Right to compensation for damages',
        'Right to have violations investigated',
        'Right to be informed of investigation outcomes'
      ]
    },
    {
      id: 'future-privacy-laws',
      title: 'The Future of Privacy Law',
      description: 'Explore emerging privacy laws and trends that will shape digital rights in the future.',
      category: 'future',
      difficulty: 'Advanced',
      duration: '32 mins',
      completed: false,
      icon: FileText,
      keyPoints: [
        'New privacy laws are being proposed worldwide',
        'AI and machine learning raise new privacy questions',
        'Biometric data protection is becoming more important',
        'Privacy by design is becoming a legal requirement',
        'Cross-border data flows are being renegotiated',
        'Individual privacy rights are being strengthened'
      ],
      realWorldExamples: [
        'Proposed federal privacy laws in the US',
        'New biometric data protection laws',
        'AI regulation and privacy implications',
        'Privacy-focused technology developments',
        'International privacy law harmonization efforts'
      ],
      yourRights: [
        'Right to participate in privacy law development',
        'Right to be informed about new privacy protections',
        'Right to benefit from stronger privacy laws',
        'Right to have your voice heard in policy debates',
        'Right to expect continued privacy protection'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Modules', icon: BookOpen },
    { id: 'privacy-laws', label: 'Privacy Laws', icon: Scale },
    { id: 'consent', label: 'Consent & Age', icon: Shield },
    { id: 'international', label: 'International', icon: Globe },
    { id: 'enforcement', label: 'Enforcement', icon: AlertTriangle },
    { id: 'future', label: 'Future Trends', icon: FileText }
  ];

  const filteredModules = activeCategory === 'all'
    ? modules
    : modules.filter(module => module.category === activeCategory);

  useEffect(() => {
    // Load completed modules from localStorage
    const savedCompleted = localStorage.getItem('digital_rights_completed');
    if (savedCompleted) {
      setCompletedModules(JSON.parse(savedCompleted));
    }
  }, []);

  const handleModuleStart = (module: LawModule) => {
    setSelectedModule(module);
    setShowModule(true);
  };

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId];
      setCompletedModules(newCompleted);
      localStorage.setItem('digital_rights_completed', JSON.stringify(newCompleted));
    }
    setShowModule(false);
    setSelectedModule(null);
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
      <header className="bg-gradient-to-r from-slate-600 to-gray-700 text-white py-20 relative overflow-hidden">
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
              <Scale size={16} />
              <span className="text-sm font-semibold">DIGITAL RIGHTS & LAW</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Digital Rights & Law
              <span className="block text-yellow-300">Ages 13-17</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Understanding privacy legislation and digital rights. Learn about laws that protect your data
              and how to exercise your rights as a digital citizen.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 13-17</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>6 Legal Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>Know Your Rights</span>
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
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700 font-medium transition-colors"
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
              Your Legal Knowledge Progress
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600">{completedModules.length}</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">{modules.length}</div>
                <div className="text-sm text-gray-600">Total Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((completedModules.length / modules.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-slate-500 to-gray-600"
                style={{ width: `${Math.round((completedModules.length / modules.length) * 100)}%` }}
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
                      ? 'bg-slate-500 text-white'
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

      {/* Modules Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module) => {
            const Icon = module.icon;
            const CategoryIcon = getCategoryIcon(module.category);
            const isCompleted = completedModules.includes(module.id);

            return (
              <div
                key={module.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 ${
                  isCompleted ? 'border-green-500' : 'border-transparent'
                }`}
                style={{
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleModuleStart(module)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-500 to-gray-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    {isCompleted && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500 capitalize">{module.category.replace('-', ' ')}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {module.title}
                  </h3>

                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {module.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {module.duration}
                    </span>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-slate-500 to-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-slate-600 hover:to-gray-700 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleStart(module);
                    }}
                  >
                    {isCompleted ? 'Review Module' : 'Start Learning'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Module Modal */}
      {showModule && selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {selectedModule.title}
                </h3>
                <button
                  onClick={() => setShowModule(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-lg mb-6" style={{ color: 'var(--gray-600)' }}>
                  {selectedModule.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Key Points:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedModule.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Real-World Examples:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedModule.realWorldExamples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Your Rights:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedModule.yourRights.map((right, index) => (
                        <li key={index}>{right}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedModule.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedModule.difficulty)}`}>
                      {selectedModule.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleModuleComplete(selectedModule.id)}
                    className="bg-gradient-to-r from-slate-500 to-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-slate-600 hover:to-gray-700 transition-all"
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
      <section className="bg-gradient-to-r from-slate-600 to-gray-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Know Your Digital Rights?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey to understanding privacy laws and digital rights. Learn how to protect yourself and exercise your rights as a digital citizen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/teen-handbook"
              className="bg-white text-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen size={20} />
              Teen Handbook
            </Link>
            <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer"
              className="bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              <Users size={20} />
              Family Hub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalRightsPage;