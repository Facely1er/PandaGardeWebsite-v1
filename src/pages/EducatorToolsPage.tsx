import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, BookOpen, Users, Download, CheckCircle, Star, Trophy, Clock, FileText, Presentation, Award } from 'lucide-react';
import Logo from '../components/Logo';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'curriculum' | 'activities' | 'assessments' | 'presentations' | 'handouts' | 'training';
  gradeLevel: string;
  duration: string;
  completed: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  downloadUrl?: string;
  preview: string[];
}

const EducatorToolsPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showResource, setShowResource] = useState(false);
  const [completedResources, setCompletedResources] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: 'k-5-curriculum',
      title: 'K-5 Privacy Curriculum',
      description: 'Complete curriculum guide for teaching digital privacy to elementary students.',
      category: 'curriculum',
      gradeLevel: 'K-5',
      duration: 'Full Year',
      completed: false,
      icon: BookOpen,
      downloadUrl: '/downloads/k-5-curriculum.pdf',
      preview: [
        '30 lesson plans aligned with Common Core standards',
        'Age-appropriate activities for each grade level',
        'Assessment rubrics and progress tracking',
        'Parent engagement materials',
        'Digital citizenship integration'
      ]
    },
    {
      id: 'middle-school-curriculum',
      title: '6-8 Privacy Curriculum',
      description: 'Comprehensive middle school privacy education program.',
      category: 'curriculum',
      gradeLevel: '6-8',
      duration: 'Full Year',
      completed: false,
      icon: BookOpen,
      downloadUrl: '/downloads/middle-school-curriculum.pdf',
      preview: [
        '40 lesson plans with hands-on activities',
        'Social media safety modules',
        'Critical thinking exercises',
        'Peer-to-peer learning activities',
        'Real-world case studies'
      ]
    },
    {
      id: 'high-school-curriculum',
      title: '9-12 Privacy Curriculum',
      description: 'Advanced privacy education for high school students.',
      category: 'curriculum',
      gradeLevel: '9-12',
      duration: 'Full Year',
      completed: false,
      icon: BookOpen,
      downloadUrl: '/downloads/high-school-curriculum.pdf',
      preview: [
        '50 lesson plans covering advanced topics',
        'Privacy law and digital rights education',
        'Career preparation and digital literacy',
        'Research projects and presentations',
        'Community engagement activities'
      ]
    },
    {
      id: 'interactive-activities',
      title: 'Interactive Activity Library',
      description: 'Collection of engaging activities for classroom use.',
      category: 'activities',
      gradeLevel: 'All',
      duration: 'Variable',
      completed: false,
      icon: Presentation,
      downloadUrl: '/downloads/activity-library.zip',
      preview: [
        'Privacy Panda story activities',
        'Digital citizenship games',
        'Role-playing scenarios',
        'Group discussion prompts',
        'Creative project ideas'
      ]
    },
    {
      id: 'assessment-tools',
      title: 'Assessment & Evaluation Tools',
      description: 'Comprehensive assessment materials for measuring student learning.',
      category: 'assessments',
      gradeLevel: 'All',
      duration: 'Variable',
      completed: false,
      icon: FileText,
      downloadUrl: '/downloads/assessment-tools.pdf',
      preview: [
        'Pre and post-assessment quizzes',
        'Performance-based assessments',
        'Portfolio evaluation rubrics',
        'Self-reflection worksheets',
        'Peer evaluation forms'
      ]
    },
    {
      id: 'teacher-training',
      title: 'Teacher Training Materials',
      description: 'Professional development resources for educators.',
      category: 'training',
      gradeLevel: 'All',
      duration: '8 hours',
      completed: false,
      icon: GraduationCap,
      downloadUrl: '/downloads/teacher-training.pdf',
      preview: [
        'Privacy education best practices',
        'Classroom management strategies',
        'Parent communication guides',
        'Technology integration tips',
        'Ongoing support resources'
      ]
    },
    {
      id: 'presentation-slides',
      title: 'Presentation Slides',
      description: 'Ready-to-use PowerPoint presentations for each lesson.',
      category: 'presentations',
      gradeLevel: 'All',
      duration: 'Variable',
      completed: false,
      icon: Presentation,
      downloadUrl: '/downloads/presentation-slides.zip',
      preview: [
        'Visual lesson presentations',
        'Interactive slide activities',
        'Video integration examples',
        'Discussion prompts',
        'Assessment checkpoints'
      ]
    },
    {
      id: 'student-handouts',
      title: 'Student Handouts & Worksheets',
      description: 'Printable materials for student use in lessons.',
      category: 'handouts',
      gradeLevel: 'All',
      duration: 'Variable',
      completed: false,
      icon: FileText,
      downloadUrl: '/downloads/student-handouts.zip',
      preview: [
        'Vocabulary worksheets',
        'Reflection journals',
        'Activity sheets',
        'Reference guides',
        'Certificate templates'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Presentation },
    { id: 'assessments', label: 'Assessments', icon: FileText },
    { id: 'presentations', label: 'Presentations', icon: Presentation },
    { id: 'handouts', label: 'Handouts', icon: FileText },
    { id: 'training', label: 'Training', icon: GraduationCap }
  ];

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === activeCategory);

  useEffect(() => {
    // Load completed resources from localStorage
    const savedCompleted = localStorage.getItem('educator_tools_completed');
    if (savedCompleted) {
      setCompletedResources(JSON.parse(savedCompleted));
    }
  }, []);

  const handleResourceStart = (resource: Resource) => {
    setSelectedResource(resource);
    setShowResource(true);
  };

  const handleResourceComplete = (resourceId: string) => {
    if (!completedResources.includes(resourceId)) {
      const newCompleted = [...completedResources, resourceId];
      setCompletedResources(newCompleted);
      localStorage.setItem('educator_tools_completed', JSON.stringify(newCompleted));
    }
    setShowResource(false);
    setSelectedResource(null);
  };

  const getCategoryIcon = (category: string) => {
    const categoryInfo = categories.find(cat => cat.id === category);
    return categoryInfo ? categoryInfo.icon : BookOpen;
  };

  const getGradeLevelColor = (gradeLevel: string) => {
    switch (gradeLevel) {
      case 'K-5': return 'bg-green-100 text-green-800';
      case '6-8': return 'bg-blue-100 text-blue-800';
      case '9-12': return 'bg-purple-100 text-purple-800';
      case 'All': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 relative overflow-hidden">
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
              <GraduationCap size={16} />
              <span className="text-sm font-semibold">EDUCATOR TOOLS</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Educator Tools
              <span className="block text-yellow-300">For Teachers & Schools</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Comprehensive resources and materials for teachers and educators to teach digital privacy
              and online safety in the classroom. Everything you need to educate the next generation!
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>K-12 Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>8 Resource Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>Standards Aligned</span>
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
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
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
              Your Resource Library
            </h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{completedResources.length}</div>
                <div className="text-sm text-gray-600">Resources Used</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{resources.length}</div>
                <div className="text-sm text-gray-600">Total Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((completedResources.length / resources.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Library Usage</div>
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
                      ? 'bg-emerald-500 text-white'
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
            const isCompleted = completedResources.includes(resource.id);

            return (
              <div
                key={resource.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer border-2 ${
                  isCompleted ? 'border-green-500' : 'border-transparent'
                }`}
                style={{
                  backgroundColor: 'var(--card-color)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onClick={() => handleResourceStart(resource)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    {isCompleted && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500 capitalize">{resource.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    {resource.title}
                  </h3>

                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeLevelColor(resource.gradeLevel)}`}>
                      {resource.gradeLevel}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {resource.duration}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResourceStart(resource);
                      }}
                    >
                      {isCompleted ? 'Review' : 'View Details'}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedResource.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeLevelColor(selectedResource.gradeLevel)}`}>
                      {selectedResource.gradeLevel}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {selectedResource.downloadUrl && (
                      <button
                        onClick={() => alert('Download would start here')}
                        className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-all flex items-center gap-2"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    )}
                    <button
                      onClick={() => handleResourceComplete(selectedResource.id)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
                    >
                      Mark as Used
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Teach Digital Privacy?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Access our comprehensive educator resources and start teaching digital privacy and online safety in your classroom today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/family-hub"
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Users size={20} />
              Family Hub
            </Link>
            <Link
              to="/contact"
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors inline-flex items-center gap-2"
            >
              <Award size={20} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducatorToolsPage;