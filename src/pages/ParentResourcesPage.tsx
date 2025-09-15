import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen, Users, Shield, FileText, MessageCircle, Award, Clock, Star, CheckCircle, Eye, Heart, Brain, Target } from 'lucide-react';
import Logo from '../components/Logo';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'guides' | 'activities' | 'tools' | 'certificates' | 'posters' | 'worksheets';
  ageGroups: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  downloadUrl?: string;
  preview: string[];
  tips?: string[];
}

const ParentResourcesPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showResource, setShowResource] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: 'family-privacy-guide',
      title: 'Complete Family Privacy Guide',
      description: 'Comprehensive guide covering all aspects of digital privacy for families with children of all ages.',
      category: 'guides',
      ageGroups: ['All Ages'],
      duration: '45 min read',
      difficulty: 'beginner',
      icon: BookOpen,
      downloadUrl: '/downloads/family-privacy-guide.pdf',
      preview: [
        'Understanding digital privacy basics',
        'Age-appropriate privacy concepts',
        'Setting up safe digital environments',
        'Teaching children about online safety',
        'Managing family digital devices',
        'Creating family privacy rules',
        'Responding to privacy concerns',
        'Building digital citizenship skills'
      ],
      tips: [
        'Start conversations early and keep them ongoing',
        'Use age-appropriate language and examples',
        'Model good privacy practices yourself',
        'Make privacy education fun and engaging'
      ]
    },
    {
      id: 'conversation-starters',
      title: 'Privacy Conversation Starters',
      description: '50+ conversation starters and discussion prompts to help families talk about digital privacy.',
      category: 'guides',
      ageGroups: ['5-8', '9-12', '13-17'],
      duration: '30 min read',
      difficulty: 'beginner',
      icon: MessageCircle,
      downloadUrl: '/downloads/conversation-starters.pdf',
      preview: [
        'Age-specific conversation topics',
        'Real-world scenario discussions',
        'Question prompts for different situations',
        'Tips for active listening',
        'Follow-up question suggestions',
        'Handling difficult conversations',
        'Building trust and openness',
        'Celebrating privacy wins'
      ],
      tips: [
        'Choose the right time and place for conversations',
        'Listen more than you talk',
        'Use "what if" scenarios to explore concepts',
        'Keep conversations positive and supportive'
      ]
    },
    {
      id: 'device-setup-guide',
      title: 'Child-Safe Device Setup Guide',
      description: 'Step-by-step instructions for configuring devices with appropriate privacy and safety settings.',
      category: 'tools',
      ageGroups: ['All Ages'],
      duration: '20 min read',
      difficulty: 'intermediate',
      icon: Shield,
      downloadUrl: '/downloads/device-setup-guide.pdf',
      preview: [
        'iOS parental controls setup',
        'Android family link configuration',
        'Windows family safety settings',
        'Mac parental controls',
        'Router-level content filtering',
        'App permission management',
        'Screen time controls',
        'Location sharing settings'
      ],
      tips: [
        'Test settings before giving devices to children',
        'Regularly review and update controls',
        'Explain restrictions to children',
        'Balance safety with independence'
      ]
    },
    {
      id: 'privacy-activities-kit',
      title: 'Privacy Learning Activities Kit',
      description: '20 hands-on activities to teach privacy concepts through games, crafts, and interactive exercises.',
      category: 'activities',
      ageGroups: ['5-8', '9-12'],
      duration: 'Variable',
      difficulty: 'beginner',
      icon: Users,
      downloadUrl: '/downloads/privacy-activities-kit.pdf',
      preview: [
        'Privacy Panda puppet show script',
        'Password creation games',
        'Personal information sorting activity',
        'Digital footprint art project',
        'Privacy scavenger hunt',
        'Role-playing scenarios',
        'Privacy-themed board game',
        'Certificate creation activity'
      ],
      tips: [
        'Adapt activities to your child\'s interests',
        'Make learning hands-on and interactive',
        'Celebrate small wins and progress',
        'Repeat activities to reinforce learning'
      ]
    },
    {
      id: 'family-privacy-agreement',
      title: 'Family Privacy Agreement Template',
      description: 'Customizable template for creating family rules and agreements about digital privacy and online behavior.',
      category: 'tools',
      ageGroups: ['All Ages'],
      duration: '15 min',
      difficulty: 'beginner',
      icon: FileText,
      downloadUrl: '/downloads/family-privacy-agreement.pdf',
      preview: [
        'Personal information sharing rules',
        'Password and account guidelines',
        'Social media usage policies',
        'Device usage time limits',
        'Online communication rules',
        'Privacy violation consequences',
        'Regular review schedule',
        'Signature spaces for all family members'
      ],
      tips: [
        'Involve children in creating the agreement',
        'Make rules clear and specific',
        'Review and update regularly',
        'Lead by example'
      ]
    },
    {
      id: 'privacy-posters-set',
      title: 'Privacy Education Posters',
      description: 'Set of 12 colorful posters for home or classroom use, featuring key privacy concepts and reminders.',
      category: 'posters',
      ageGroups: ['All Ages'],
      duration: 'Print & Display',
      difficulty: 'beginner',
      icon: Eye,
      downloadUrl: '/downloads/privacy-posters-set.pdf',
      preview: [
        'Password Safety Rules',
        'Personal Information Protection',
        'Digital Footprint Awareness',
        'Online Stranger Danger',
        'App Permission Guidelines',
        'Social Media Safety',
        'Cyberbullying Prevention',
        'Privacy Settings Checklist'
      ],
      tips: [
        'Display posters at child\'s eye level',
        'Refer to posters during conversations',
        'Update posters as children grow',
        'Use posters as conversation starters'
      ]
    },
    {
      id: 'privacy-worksheets',
      title: 'Privacy Learning Worksheets',
      description: 'Educational worksheets and activity sheets for reinforcing privacy concepts through writing and drawing.',
      category: 'worksheets',
      ageGroups: ['5-8', '9-12'],
      duration: 'Variable',
      difficulty: 'beginner',
      icon: FileText,
      downloadUrl: '/downloads/privacy-worksheets.pdf',
      preview: [
        'Personal information identification',
        'Password strength assessment',
        'Digital footprint mapping',
        'Privacy setting checklist',
        'Online safety scenarios',
        'Privacy vocabulary matching',
        'Reflection journal prompts',
        'Goal setting worksheets'
      ],
      tips: [
        'Complete worksheets together',
        'Encourage creativity and expression',
        'Review completed worksheets regularly',
        'Celebrate effort and learning'
      ]
    },
    {
      id: 'achievement-certificates',
      title: 'Privacy Achievement Certificates',
      description: 'Printable certificates to celebrate children\'s privacy learning milestones and achievements.',
      category: 'certificates',
      ageGroups: ['All Ages'],
      duration: 'Print & Award',
      difficulty: 'beginner',
      icon: Award,
      downloadUrl: '/downloads/achievement-certificates.pdf',
      preview: [
        'Privacy Panda Certificate',
        'Password Protector Badge',
        'Digital Citizen Award',
        'Privacy Champion Certificate',
        'Online Safety Star',
        'Digital Footprint Expert',
        'Privacy Settings Master',
        'Cyber Safety Hero'
      ],
      tips: [
        'Present certificates with ceremony',
        'Display certificates proudly',
        'Use certificates to motivate learning',
        'Create custom certificates for special achievements'
      ]
    },
    {
      id: 'emergency-response-guide',
      title: 'Privacy Emergency Response Guide',
      description: 'Step-by-step guide for handling privacy breaches, cyberbullying, and other digital safety emergencies.',
      category: 'guides',
      ageGroups: ['All Ages'],
      duration: '25 min read',
      difficulty: 'advanced',
      icon: Shield,
      downloadUrl: '/downloads/emergency-response-guide.pdf',
      preview: [
        'Recognizing privacy breaches',
        'Immediate response steps',
        'Documenting incidents',
        'Reporting to authorities',
        'Supporting affected children',
        'Preventing future incidents',
        'Legal considerations',
        'Recovery and healing process'
      ],
      tips: [
        'Stay calm and supportive',
        'Document everything',
        'Seek professional help when needed',
        'Focus on healing and prevention'
      ]
    },
    {
      id: 'age-specific-guides',
      title: 'Age-Specific Privacy Guides',
      description: 'Tailored guides for different age groups, covering developmentally appropriate privacy concepts.',
      category: 'guides',
      ageGroups: ['5-8', '9-12', '13-17'],
      duration: '35 min read',
      difficulty: 'intermediate',
      icon: Target,
      downloadUrl: '/downloads/age-specific-guides.pdf',
      preview: [
        'Developmental milestones and privacy',
        'Age-appropriate concepts and language',
        'Common challenges by age group',
        'Teaching strategies for each age',
        'Technology recommendations',
        'Parental involvement levels',
        'Independence building',
        'Transition planning'
      ],
      tips: [
        'Understand your child\'s developmental stage',
        'Adjust expectations and approaches',
        'Respect growing independence',
        'Maintain open communication'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'guides', label: 'Guides', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Users },
    { id: 'tools', label: 'Tools', icon: Shield },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'posters', label: 'Posters', icon: Eye },
    { id: 'worksheets', label: 'Worksheets', icon: FileText }
  ];

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === activeCategory);

  const handleResourceStart = (resource: Resource) => {
    setSelectedResource(resource);
    setShowResource(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
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
              <Heart size={16} />
              <span className="text-sm font-semibold">PARENT RESOURCES</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Parent Resources
              <span className="block text-yellow-300">Supporting Your Family's Privacy Journey</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Comprehensive guides, activities, and tools to help you teach digital privacy and online safety 
              to your children. Everything you need to create a safe digital environment for your family.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>10 Resource Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={16} />
                <span>All Materials Downloadable</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Expert Reviewed</span>
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

      {/* Quick Stats */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12" style={{
          backgroundColor: 'var(--card-color)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Your Resource Library
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{resources.length}</div>
                <div className="text-sm text-gray-600">Total Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{categories.length - 1}</div>
                <div className="text-sm text-gray-600">Resource Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Free Downloads</div>
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
                      ? 'bg-blue-500 text-white'
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

      {/* Resources Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => {
            const Icon = resource.icon;
            const CategoryIcon = getCategoryIcon(resource.category);

            return (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 border-transparent"
                style={{
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleResourceStart(resource)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    <CategoryIcon size={16} className="text-gray-500" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500 capitalize">{resource.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {resource.title}
                  </h3>

                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {resource.duration}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResourceStart(resource);
                      }}
                    >
                      View Details
                    </button>
                    {resource.downloadUrl && (
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          // In a real app, this would trigger a download
                          alert('Download would start here');
                        }}
                      >
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Resource Modal */}
      {showResource && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {selectedResource.title}
                </h3>
                <button
                  onClick={() => setShowResource(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-lg mb-6" style={{ color: 'var(--gray-600)' }}>
                  {selectedResource.description}
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                    What's Included:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                    {selectedResource.preview.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {selectedResource.tips && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                      Pro Tips:
                    </h4>
                    <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                      {selectedResource.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedResource.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedResource.difficulty)}`}>
                      {selectedResource.difficulty}
                    </span>
                    <span className="text-sm">
                      Ages: {selectedResource.ageGroups.join(', ')}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {selectedResource.downloadUrl && (
                      <button
                        onClick={() => alert('Download would start here')}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    )}
                  </div>
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
            Ready to Start Your Family's Privacy Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Download our comprehensive resources and begin teaching your children about digital privacy and online safety today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/family-hub"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Users size={20} />
              Family Hub
            </Link>
            <Link
              to="/educator-tools"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center gap-2"
            >
              <Brain size={20} />
              Educator Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentResourcesPage;