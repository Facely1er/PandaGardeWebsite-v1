import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Book, Settings, Award, TrendingUp, Clock, CheckCircle, ArrowLeft, User, Shield as Child, UserCheck, Star, Play, Download } from 'lucide-react';
import Logo from '../components/Logo';

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  avatar: string;
  progress: number;
  ageGroup: '5-8' | '9-12' | '13-17';
  currentActivity?: string;
  completedActivities: number;
  totalActivities: number;
}

interface Activity {
  id: string;
  title: string;
  type: 'story' | 'activity' | 'game' | 'assessment';
  ageGroups: string[];
  duration: string;
  completed: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const FamilyHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'activities' | 'progress' | 'resources'>('dashboard');

  // Sample family data - in real app this would come from API/database
  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Emma',
      age: 8,
      avatar: '👧',
      progress: 75,
      ageGroup: '5-8',
      currentActivity: 'Privacy Panda Coloring',
      completedActivities: 4,
      totalActivities: 6
    },
    {
      id: '2',
      name: 'Alex',
      age: 12,
      avatar: '🧒',
      progress: 60,
      ageGroup: '9-12',
      currentActivity: 'Digital Citizenship Academy',
      completedActivities: 6,
      totalActivities: 10
    },
    {
      id: '3',
      name: 'Jordan',
      age: 15,
      avatar: '👤',
      progress: 40,
      ageGroup: '13-17',
      currentActivity: 'Teen Privacy Handbook',
      completedActivities: 8,
      totalActivities: 15
    }
  ]);

  const recentActivities: Activity[] = [
    {
      id: '1',
      title: 'Privacy Panda Story',
      type: 'story',
      ageGroups: ['5-8', '9-12'],
      duration: '10 min',
      completed: true,
      icon: Book
    },
    {
      id: '2',
      title: 'Password Safety Game',
      type: 'activity',
      ageGroups: ['5-8'],
      duration: '15 min',
      completed: false,
      icon: Play
    },
    {
      id: '3',
      title: 'Social Media Privacy',
      type: 'activity',
      ageGroups: ['13-17'],
      duration: '20 min',
      completed: false,
      icon: Users
    }
  ];

  const quickActions = [
    {
      title: 'Start Learning Path',
      description: 'Begin age-appropriate privacy education',
      icon: Play,
      action: 'start-path',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'View Progress Report',
      description: 'See detailed progress for all family members',
      icon: TrendingUp,
      action: 'view-progress',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Download Resources',
      description: 'Get printable activities and guides',
      icon: Download,
      action: 'download',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'PrivacyPanda App',
      description: 'Access the full PrivacyPanda mobile application',
      icon: Star,
      action: 'app-link',
      color: 'from-orange-500 to-orange-600',
      url: 'https://www.hub.pandagarde.com'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getAgeGroupIcon = (ageGroup: string) => {
    switch (ageGroup) {
      case '5-8': return Child;
      case '9-12': return User;
      case '13-17': return UserCheck;
      default: return User;
    }
  };

  const getOverallProgress = () => {
    const totalCompleted = familyMembers.reduce((sum, member) => sum + member.completedActivities, 0);
    const totalActivities = familyMembers.reduce((sum, member) => sum + member.totalActivities, 0);
    return Math.round((totalCompleted / totalActivities) * 100);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 relative overflow-hidden">
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
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Panda
              <span className="block text-yellow-300">Family Hub</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Your central dashboard for family privacy education, progress tracking, and personalized learning paths.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{familyMembers.length} Family Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} />
                <span>{getOverallProgress()}% Overall Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Active Learning</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              style={{ color: 'var(--primary-light)' }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <nav className="flex items-center gap-8">
              {[
                { key: 'dashboard', label: 'Dashboard', icon: Users },
                { key: 'activities', label: 'Activities', icon: BookOpen },
                { key: 'progress', label: 'Progress', icon: TrendingUp },
                { key: 'resources', label: 'Resources', icon: Download }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as 'dashboard' | 'activities' | 'progress' | 'resources')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === key
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeTab === key ? 'var(--secondary)' : undefined,
                    color: activeTab === key ? 'var(--primary)' : undefined
                  }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12">

            {/* Family Members Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
                Family Progress Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {familyMembers.map((member) => {
                  const AgeIcon = getAgeGroupIcon(member.ageGroup);
                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      style={{ backgroundColor: 'var(--card-color)' }}
                      onClick={() => setSelectedMember(member.id)}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xl">
                          {member.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>
                            {member.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--gray-500)' }}>
                            <AgeIcon size={14} />
                            <span>Age {member.age}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--gray-600)' }}>
                            Progress
                          </span>
                          <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                            {member.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${member.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-sm" style={{ color: 'var(--gray-600)' }}>
                        <div className="flex items-center justify-between mb-1">
                          <span>Completed Activities</span>
                          <span className="font-medium">{member.completedActivities}/{member.totalActivities}</span>
                        </div>
                        {member.currentActivity && (
                          <div className="flex items-center gap-1 text-green-600 mt-2">
                            <Play size={12} />
                            <span className="text-xs">{member.currentActivity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;

                  if (action.url) {
                    return (
                      <a
                        key={index}
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-xl p-6 text-left hover:shadow-lg transition-all transform hover:scale-105 block"
                        style={{ backgroundColor: 'var(--card-color)' }}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                          <IconComponent size={24} />
                        </div>
                        <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                          {action.title}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                          {action.description}
                        </p>
                      </a>
                    );
                  }

                  return (
                    <button
                      key={index}
                      className="bg-white rounded-xl p-6 text-left hover:shadow-lg transition-all transform hover:scale-105"
                      style={{ backgroundColor: 'var(--card-color)' }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                        <IconComponent size={24} />
                      </div>
                      <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                        {action.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                        {action.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Recent Activities */}
            <section>
              <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
                Continue Learning
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                      style={{ backgroundColor: 'var(--card-color)' }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold" style={{ color: 'var(--primary)' }}>
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-500)' }}>
                            <Clock size={12} />
                            <span>{activity.duration}</span>
                            {activity.completed && <CheckCircle size={12} className="text-green-500" />}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        {activity.ageGroups.map((group) => (
                          <span
                            key={group}
                            className="px-2 py-1 bg-gray-100 rounded text-xs font-medium"
                            style={{ backgroundColor: 'var(--light)', color: 'var(--gray-600)' }}
                          >
                            Ages {group}
                          </span>
                        ))}
                      </div>

                      <button className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all">
                        {activity.completed ? 'Review' : 'Start Activity'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Learning Activities
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
                Explore our comprehensive library of age-appropriate privacy education activities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/activity-book" className="block">
                <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all transform hover:scale-105"
                     style={{ backgroundColor: 'var(--card-color)' }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    Interactive Activity Book
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                    6 interactive activities teaching privacy fundamentals
                  </p>
                  <div className="text-green-600 font-semibold">
                    Start Activities →
                  </div>
                </div>
              </Link>

              <Link to="/story" className="block">
                <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all transform hover:scale-105"
                     style={{ backgroundColor: 'var(--card-color)' }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Book size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                    Digital Bamboo Forest Story
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                    Follow Privacy Panda's adventure learning about digital safety
                  </p>
                  <div className="text-blue-600 font-semibold">
                    Read Story →
                  </div>
                </div>
              </Link>

              <div className="bg-white rounded-xl p-8 text-center"
                   style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                  Privacy Challenges
                </h3>
                <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                  Advanced challenges and assessments for older children
                </p>
                <div className="text-gray-400 font-semibold">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Family Progress Tracking
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
                Monitor learning progress and achievements across all family members.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                  Overall Family Progress
                </h3>
                <div className="w-32 h-32 mx-auto relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
                        {getOverallProgress()}%
                      </div>
                      <div className="text-sm" style={{ color: 'var(--gray-600)' }}>
                        Complete
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {familyMembers.map((member) => (
                  <div key={member.id} className="text-center">
                    <div className="text-2xl mb-2">{member.avatar}</div>
                    <h4 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                      {member.name}
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${member.progress}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--gray-600)' }}>
                      {member.completedActivities}/{member.totalActivities} activities
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Family Resources
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
                Additional materials to support your family's privacy education journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <a
                href="https://www.hub.pandagarde.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:scale-105 block"
                style={{ backgroundColor: 'var(--card-color)' }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Star size={24} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                  PrivacyPanda Mobile App
                </h3>
                <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                  Access the full PrivacyPanda mobile application with advanced features and offline capabilities.
                </p>
                <div className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                  Launch App →
                </div>
              </a>

              <div className="bg-white rounded-xl p-6" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Download size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                  Printable Activities
                </h3>
                <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                  Coloring sheets, certificates, and offline activities for screen-free learning.
                </p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Download Resources →
                </button>
              </div>

              <div className="bg-white rounded-xl p-6" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                  Discussion Guides
                </h3>
                <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                  Conversation starters and questions for family privacy discussions.
                </p>
                <Link to="/#parent-resources" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                  View Guides →
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                  Privacy Tools
                </h3>
                <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                  Practical tools and settings guides for family devices and apps.
                </p>
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  Access Tools →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FamilyHubPage;