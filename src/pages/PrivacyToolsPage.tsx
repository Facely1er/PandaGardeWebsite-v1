import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench, Shield, Lock, Eye, Download, CheckCircle, Star, Trophy, Clock, Settings, Smartphone, Globe, Key } from 'lucide-react';
import Logo from '../components/Logo';

interface Tool {
  id: string;
  title: string;
  description: string;
  category: 'passwords' | 'browsing' | 'messaging' | 'vpn' | 'encryption' | 'privacy';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  steps: string[];
  benefits: string[];
  recommendations: string[];
}

const PrivacyToolsPage: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showTool, setShowTool] = useState(false);
  const [completedTools, setCompletedTools] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const tools: Tool[] = [
    {
      id: 'password-manager',
      title: 'Password Manager Setup',
      description: 'Learn how to set up and use a password manager to create and store strong, unique passwords.',
      category: 'passwords',
      difficulty: 'Beginner',
      duration: '20 mins',
      completed: false,
      icon: Key,
      steps: [
        'Choose a reputable password manager (Bitwarden, 1Password, or LastPass)',
        'Create a strong master password',
        'Enable two-factor authentication',
        'Import existing passwords',
        'Generate new passwords for all accounts',
        'Set up browser extensions',
        'Create secure notes for sensitive information'
      ],
      benefits: [
        'Generate unique passwords for every account',
        'Automatically fill passwords on websites',
        'Secure storage of sensitive information',
        'Easy password sharing with family',
        'Protection against password reuse attacks'
      ],
      recommendations: [
        'Bitwarden (free, open-source)',
        '1Password (premium, user-friendly)',
        'LastPass (popular, feature-rich)',
        'KeePass (free, local storage)'
      ]
    },
    {
      id: 'vpn-setup',
      title: 'VPN Configuration',
      description: 'Set up a Virtual Private Network to encrypt your internet traffic and hide your location.',
      category: 'vpn',
      difficulty: 'Intermediate',
      duration: '25 mins',
      completed: false,
      icon: Shield,
      steps: [
        'Research and choose a privacy-focused VPN provider',
        'Sign up and download the VPN client',
        'Configure connection settings',
        'Set up kill switch functionality',
        'Choose optimal server locations',
        'Test connection and speed',
        'Configure auto-connect on untrusted networks'
      ],
      benefits: [
        'Encrypt all internet traffic',
        'Hide your real IP address',
        'Access geo-restricted content safely',
                'Protect data on public Wi-Fi',
        'Prevent ISP tracking'
      ],
      recommendations: [
        'ProtonVPN (privacy-focused, free tier)',
        'NordVPN (fast, reliable)',
        'ExpressVPN (premium, easy to use)',
        'Mullvad (anonymous, no logs)'
      ]
    },
    {
      id: 'encrypted-messaging',
      title: 'Encrypted Messaging Apps',
      description: 'Switch to secure messaging apps that protect your conversations with end-to-end encryption.',
      category: 'messaging',
      difficulty: 'Beginner',
      duration: '15 mins',
      completed: false,
      icon: Lock,
      steps: [
        'Choose an encrypted messaging app',
        'Download and install the app',
        'Verify your phone number securely',
        'Set up a strong PIN or passphrase',
        'Enable disappearing messages',
        'Verify contacts\' security codes',
        'Configure privacy settings'
      ],
      benefits: [
        'End-to-end encryption for all messages',
        'Self-destructing messages',
        'No data collection by the service',
        'Secure voice and video calls',
        'Protection against surveillance'
      ],
      recommendations: [
        'Signal (gold standard for privacy)',
        'WhatsApp (popular, owned by Meta)',
        'Telegram (feature-rich, optional encryption)',
        'Element (decentralized, open-source)'
      ]
    },
    {
      id: 'privacy-browser',
      title: 'Privacy-Focused Browser Setup',
      description: 'Configure your browser with privacy extensions and settings to minimize tracking.',
      category: 'browsing',
      difficulty: 'Intermediate',
      duration: '30 mins',
      completed: false,
      icon: Globe,
      steps: [
        'Choose a privacy-focused browser (Firefox, Brave, or Tor)',
        'Install essential privacy extensions',
        'Configure browser privacy settings',
        'Set up DNS over HTTPS',
        'Disable unnecessary permissions',
        'Configure search engine to privacy-focused option',
        'Set up bookmark sync securely'
      ],
      benefits: [
        'Block tracking cookies and scripts',
        'Prevent fingerprinting',
        'Encrypt DNS queries',
        'Block ads and malware',
        'Minimize data collection'
      ],
      recommendations: [
        'Firefox with privacy settings',
        'Brave browser (built-in privacy)',
        'Tor Browser (maximum anonymity)',
        'Safari with privacy features'
      ]
    },
    {
      id: 'file-encryption',
      title: 'File Encryption Tools',
      description: 'Learn to encrypt sensitive files and folders to protect your data from unauthorized access.',
      category: 'encryption',
      difficulty: 'Advanced',
      duration: '35 mins',
      completed: false,
      icon: Lock,
      steps: [
        'Choose encryption software (VeraCrypt, 7-Zip, or Cryptomator)',
        'Create encrypted containers or volumes',
        'Set strong encryption passwords',
        'Encrypt existing sensitive files',
        'Set up automatic encryption for new files',
        'Create secure backups',
        'Test encryption and decryption processes'
      ],
      benefits: [
        'Protect sensitive files from theft',
        'Secure cloud storage uploads',
        'Create encrypted backups',
        'Hide sensitive data from others',
        'Comply with privacy regulations'
      ],
      recommendations: [
        'VeraCrypt (free, open-source)',
        'Cryptomator (cloud-friendly)',
        '7-Zip (simple file encryption)',
        'Boxcryptor (cloud integration)'
      ]
    },
    {
      id: 'privacy-settings',
      title: 'Device Privacy Settings',
      description: 'Configure privacy settings on your devices to minimize data collection and tracking.',
      category: 'privacy',
      difficulty: 'Beginner',
      duration: '40 mins',
      completed: false,
      icon: Settings,
      steps: [
        'Review and disable location tracking',
        'Turn off personalized ads',
        'Limit app permissions',
        'Disable analytics and diagnostics',
        'Configure privacy settings in social media',
        'Set up two-factor authentication',
        'Enable automatic security updates'
      ],
      benefits: [
        'Reduce data collection by companies',
        'Minimize targeted advertising',
        'Protect location privacy',
        'Limit app access to personal data',
        'Improve overall device security'
      ],
      recommendations: [
        'iOS: Settings > Privacy & Security',
        'Android: Settings > Privacy',
        'Windows: Settings > Privacy',
        'macOS: System Preferences > Security & Privacy'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Tools', icon: Wrench },
    { id: 'passwords', label: 'Password Management', icon: Key },
    { id: 'browsing', label: 'Private Browsing', icon: Globe },
    { id: 'messaging', label: 'Encrypted Messaging', icon: Lock },
    { id: 'vpn', label: 'VPN & Networking', icon: Shield },
    { id: 'encryption', label: 'File Encryption', icon: Lock },
    { id: 'privacy', label: 'Privacy Settings', icon: Settings }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  useEffect(() => {
    // Load completed tools from localStorage
    const savedCompleted = localStorage.getItem('privacy_tools_completed');
    if (savedCompleted) {
      setCompletedTools(JSON.parse(savedCompleted));
    }
  }, []);

  const handleToolStart = (tool: Tool) => {
    setSelectedTool(tool);
    setShowTool(true);
  };

  const handleToolComplete = (toolId: string) => {
    if (!completedTools.includes(toolId)) {
      const newCompleted = [...completedTools, toolId];
      setCompletedTools(newCompleted);
      localStorage.setItem('privacy_tools_completed', JSON.stringify(newCompleted));
    }
    setShowTool(false);
    setSelectedTool(null);
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
    return categoryInfo ? categoryInfo.icon : Wrench;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 relative overflow-hidden">
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
              <Wrench size={16} />
              <span className="text-sm font-semibold">PRIVACY TOOLS WORKSHOP</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Tools Workshop
              <span className="block text-yellow-300">Ages 13-17</span>
            </h1>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Hands-on tutorials for privacy tools and settings that real privacy experts use. 
              Learn to protect your data with professional-grade tools!
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Ages 13-17</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench size={16} />
                <span>6 Tool Tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>Professional Tools</span>
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
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
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
              Your Tool Mastery Progress
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{completedTools.length}</div>
                <div className="text-sm text-gray-600">Tools Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{tools.length}</div>
                <div className="text-sm text-gray-600">Total Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((completedTools.length / tools.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-orange-500 to-red-600"
                style={{ width: `${Math.round((completedTools.length / tools.length) * 100)}%` }}
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
                      ? 'bg-orange-500 text-white'
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

      {/* Tools Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const CategoryIcon = getCategoryIcon(tool.category);
            const isCompleted = completedTools.includes(tool.id);
            
            return (
              <div
                key={tool.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 ${
                  isCompleted ? 'border-green-500' : 'border-transparent'
                }`}
                style={{ 
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleToolStart(tool)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    {isCompleted && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500 capitalize">{tool.category.replace('-', ' ')}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {tool.title}
                  </h3>
                  
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tool.difficulty)}`}>
                      {tool.difficulty}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {tool.duration}
                    </span>
                  </div>
                  
                  <button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToolStart(tool);
                    }}
                  >
                    {isCompleted ? 'Review Tutorial' : 'Start Tutorial'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tool Modal */}
      {showTool && selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {selectedTool.title}
                </h3>
                <button 
                  onClick={() => setShowTool(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-lg mb-6" style={{ color: 'var(--gray-600)' }}>
                  {selectedTool.description}
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Step-by-Step Setup:
                    </h4>
                    <ol className="list-decimal pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedTool.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Benefits:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedTool.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Recommended Tools:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedTool.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedTool.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedTool.difficulty)}`}>
                      {selectedTool.difficulty}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleToolComplete(selectedTool.id)}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
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
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Master Privacy Tools?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your journey to becoming a privacy expert. Learn the tools that professionals use to protect their data and privacy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/teen-handbook"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen size={20} />
              Teen Handbook
            </Link>
            <Link 
              to="/family-hub"
              className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors inline-flex items-center gap-2"
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

export default PrivacyToolsPage;