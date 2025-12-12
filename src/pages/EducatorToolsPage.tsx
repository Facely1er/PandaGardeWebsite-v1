import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Download, CheckCircle, Clock, FileText, Presentation, Award } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import ResourceModal from '../components/ResourceModal';

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
  const navigate = useNavigate();
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
      id: 'classroom-activities',
      title: 'Privacy Panda Classroom Activities',
      description: 'Chapter-by-chapter activities aligned with "Privacy Panda and the Digital Bamboo Forest" story. Perfect for educators teaching digital privacy to children ages 5-8.',
      category: 'activities',
      gradeLevel: 'K-3',
      duration: '4-6 weeks',
      completed: false,
      icon: Presentation,
      downloadUrl: '/downloads/classroom-activities.pdf',
      preview: [
        '8 hands-on activities (2 per chapter)',
        'Chapter 1: Understanding Personal Information',
        'Chapter 2: Privacy Settings & Digital Footprints',
        'Chapter 3: Safe Sharing & Choosing What to Share',
        'Chapter 4: Being a Privacy Hero',
        'Assessment tools and cross-curricular connections',
        'Story connections and discussion prompts'
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
    // Special handling for classroom activities - navigate to dedicated page
    if (resource.id === 'classroom-activities') {
      navigate('/classroom-activities');
      return;
    }
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
      case 'K-3': return 'bg-green-100 text-green-800';
      case 'K-5': return 'bg-green-100 text-green-800';
      case '6-8': return 'bg-blue-100 text-blue-800';
      case '9-12': return 'bg-purple-100 text-purple-800';
      case 'All': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout
      title="Educator Tools"
      subtitle="Comprehensive resources and materials for teachers and educators to teach digital privacy and online safety in the classroom. Everything you need to educate the next generation!"
      icon={GraduationCap}
      badge="EDUCATOR TOOLS"
      breadcrumbs={true}
    >

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Progress Section */}
        <div className="py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8" style={{
            backgroundColor: 'var(--card-color)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Your Resource Library
              </h2>
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{completedResources.length}</div>
                  <div className="text-sm" style={{ color: 'var(--gray-600)' }}>Resources Used</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: 'var(--primary-light)' }}>{resources.length}</div>
                  <div className="text-sm" style={{ color: 'var(--gray-600)' }}>Total Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
                    {Math.round((completedResources.length / resources.length) * 100)}%
                  </div>
                  <div className="text-sm" style={{ color: 'var(--gray-600)' }}>Library Usage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
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
                        ? 'bg-green-600 text-white'
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
        </div>

        {/* Resources Grid */}
        <div className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white">
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
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
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
        </div>

        {/* Resource Modal */}
        <ResourceModal
          isOpen={showResource && selectedResource !== null}
          onClose={() => {
            setShowResource(false);
            setSelectedResource(null);
          }}
          title={selectedResource?.title || ''}
          description={selectedResource?.description || ''}
          preview={selectedResource?.preview}
          duration={selectedResource?.duration}
          gradeLevel={selectedResource?.gradeLevel}
          downloadUrl={selectedResource?.downloadUrl}
          onDownload={() => {
            if (selectedResource?.downloadUrl) {
              alert('Download would start here');
            }
          }}
          onComplete={() => {
            if (selectedResource) {
              handleResourceComplete(selectedResource.id);
            }
          }}
          completeButtonText="Mark as Used"
          getGradeLevelColor={getGradeLevelColor}
        />

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8 text-center mt-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Teach Digital Privacy?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Access our comprehensive educator resources and start teaching digital privacy and online safety in your classroom today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/family-hub"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Users size={20} />
              Family Hub
            </Link>
            <Link
              to="/contact"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
            >
              <Award size={20} />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EducatorToolsPage;