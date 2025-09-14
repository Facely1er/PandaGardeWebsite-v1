import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Users, Shield, Heart, Brain, CheckCircle, Star, Trophy, Clock, BookOpen, MessageCircle } from 'lucide-react';
import Logo from '../components/Logo';

interface Module {
  id: string;
  title: string;
  description: string;
  category: 'respect' | 'responsibility' | 'safety' | 'critical-thinking';
  duration: string;
  completed: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  lessons: string[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

const DigitalCitizenshipPage: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showModule, setShowModule] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const modules: Module[] = [
    {
      id: 'digital-respect',
      title: 'Digital Respect & Kindness',
      description: 'Learn how to be respectful and kind in online interactions, just like in real life.',
      category: 'respect',
      duration: '20 mins',
      completed: false,
      icon: Heart,
      lessons: [
        'Understanding digital communication',
        'Being respectful in online discussions',
        'Recognizing and preventing cyberbullying',
        'Building positive online relationships',
        'Handling disagreements online'
      ],
      quiz: [
        {
          question: 'What should you do if someone is being mean to you online?',
          options: ['Ignore them', 'Be mean back', 'Tell a trusted adult', 'Share it with everyone'],
          correct: 2
        },
        {
          question: 'Is it okay to share someone else\'s personal information without permission?',
          options: ['Yes, if it\'s funny', 'No, never', 'Only if they\'re mean', 'Only with close friends'],
          correct: 1
        }
      ]
    },
    {
      id: 'online-responsibility',
      title: 'Online Responsibility',
      description: 'Understand your responsibilities as a digital citizen and how your actions affect others.',
      category: 'responsibility',
      duration: '18 mins',
      completed: false,
      icon: Users,
      lessons: [
        'Understanding digital footprints',
        'Taking responsibility for your online actions',
        'Being honest and authentic online',
        'Respecting others\' privacy',
        'Contributing positively to online communities'
      ],
      quiz: [
        {
          question: 'What is a digital footprint?',
          options: ['Your shoe size', 'The trail of information you leave online', 'Your password', 'Your favorite website'],
          correct: 1
        },
        {
          question: 'Should you always be honest about who you are online?',
          options: ['No, it\'s safer to lie', 'Yes, but only sometimes', 'Yes, always be honest', 'It doesn\'t matter'],
          correct: 2
        }
      ]
    },
    {
      id: 'digital-safety',
      title: 'Digital Safety & Security',
      description: 'Learn how to protect yourself and others from online dangers and threats.',
      category: 'safety',
      duration: '25 mins',
      completed: false,
      icon: Shield,
      lessons: [
        'Recognizing online threats and scams',
        'Protecting personal information',
        'Safe sharing practices',
        'Understanding privacy settings',
        'Reporting inappropriate content'
      ],
      quiz: [
        {
          question: 'What should you do if a stranger asks for your personal information?',
          options: ['Give it to them', 'Ignore them and tell an adult', 'Ask them why they need it', 'Share it with friends first'],
          correct: 1
        },
        {
          question: 'Is it safe to meet someone you only know online?',
          options: ['Yes, if they seem nice', 'No, never meet online strangers alone', 'Only in public places', 'Only if your parents approve'],
          correct: 1
        }
      ]
    },
    {
      id: 'critical-thinking',
      title: 'Critical Thinking Online',
      description: 'Develop skills to evaluate information, spot fake news, and think critically about online content.',
      category: 'critical-thinking',
      duration: '22 mins',
      completed: false,
      icon: Brain,
      lessons: [
        'Identifying reliable sources',
        'Recognizing fake news and misinformation',
        'Questioning what you see online',
        'Fact-checking information',
        'Developing media literacy skills'
      ],
      quiz: [
        {
          question: 'How can you tell if information online is reliable?',
          options: ['If it has lots of likes', 'Check multiple sources and look for evidence', 'If it sounds exciting', 'If your friend shared it'],
          correct: 1
        },
        {
          question: 'What should you do if you see something that seems too good to be true?',
          options: ['Share it immediately', 'Question it and verify', 'Believe it anyway', 'Ignore it completely'],
          correct: 1
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Modules', icon: Globe },
    { id: 'respect', label: 'Respect & Kindness', icon: Heart },
    { id: 'responsibility', label: 'Responsibility', icon: Users },
    { id: 'safety', label: 'Safety & Security', icon: Shield },
    { id: 'critical-thinking', label: 'Critical Thinking', icon: Brain }
  ];

  const filteredModules = activeCategory === 'all'
    ? modules
    : modules.filter(module => module.category === activeCategory);

  useEffect(() => {
    // Load completed modules from localStorage
    const savedCompleted = localStorage.getItem('digital_citizenship_completed');
    if (savedCompleted) {
      setCompletedModules(JSON.parse(savedCompleted));
    }
  }, []);

  const handleModuleStart = (module: Module) => {
    setSelectedModule(module);
    setShowModule(true);
    setCurrentQuiz(0);
    setQuizAnswers([]);
    setShowQuiz(false);
  };

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId];
      setCompletedModules(newCompleted);
      localStorage.setItem('digital_citizenship_completed', JSON.stringify(newCompleted));
    }
    setShowModule(false);
    setSelectedModule(null);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (currentQuiz < (selectedModule?.quiz.length || 0) - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      // Quiz completed
      setShowQuiz(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryInfo = categories.find(cat => cat.id === category);
    return categoryInfo ? categoryInfo.icon : Globe;
  };

  const getQuizScore = () => {
    if (!selectedModule) return 0;
    let correct = 0;
    selectedModule.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / selectedModule.quiz.length) * 100);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 relative overflow-hidden">
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
              <Globe size={16} />
              <span className="text-sm font-semibold">DIGITAL CITIZENSHIP ACADEMY</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Digital Citizenship Academy
              <span className="block text-yellow-300">Ages 9-12</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Interactive modules about responsible online behavior, critical thinking,
              and evaluating digital information. Become a responsible digital citizen!
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 9-12</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>4 Learning Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>Interactive Quizzes</span>
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
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
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
              Your Academy Progress
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{completedModules.length}</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{modules.length}</div>
                <div className="text-sm text-gray-600">Total Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((completedModules.length / modules.length) * 100)}%
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
                      ? 'bg-purple-500 text-white'
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center text-white">
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
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {module.duration}
                    </span>
                    <span className="text-sm font-bold text-purple-600">
                      {module.lessons.length} lessons
                    </span>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all"
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
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                    What You'll Learn:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                    {selectedModule.lessons.map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                  </ul>
                </div>

                {!showQuiz ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {selectedModule.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {selectedModule.lessons.length} lessons
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all"
                      >
                        Take Quiz
                      </button>
                      <button
                        onClick={() => handleModuleComplete(selectedModule.id)}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Quiz: {currentQuiz + 1} of {selectedModule.quiz.length}
                    </h4>
                    <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                      {selectedModule.quiz[currentQuiz].question}
                    </p>
                    <div className="space-y-2">
                      {selectedModule.quiz[currentQuiz].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {currentQuiz === selectedModule.quiz.length - 1 && (
                      <div className="mt-4 text-center">
                        <p className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                          Quiz Complete! Score: {getQuizScore()}%
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Become a Digital Citizen?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey to becoming a responsible digital citizen. Learn how to navigate the online world safely and respectfully.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/privacy-handbook"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Shield size={20} />
              Privacy Handbook
            </Link>
            <Link
              to="/family-hub"
              className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors inline-flex items-center gap-2"
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

export default DigitalCitizenshipPage;