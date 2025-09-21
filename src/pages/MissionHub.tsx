import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Clock, 
  Star, 
  Trophy, 
  Users, 
  Calendar,
  Target,
  Award,
  TrendingUp,
  BookOpen,
  Shield,
  Zap,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';
import { useProgress } from '../contexts/ProgressContext';
import { localStorageManager } from '../utils/localStorageManager';

interface Mission {
  id: string;
  title: string;
  description: string;
  ageGroups: string[];
  category: 'privacy' | 'security' | 'digital-citizenship' | 'communication';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  xpReward: number;
  isLocked: boolean;
  isCompleted: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  prerequisites?: string[];
  tags: string[];
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  expiresAt: string;
  category: string;
}

interface LeaderboardEntry {
  memberId: string;
  name: string;
  avatar: string;
  totalXP: number;
  level: number;
  completedMissions: number;
  streak: number;
}

const MissionHub: React.FC = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'missions' | 'challenges' | 'leaderboard'>('missions');
  
  const { familyMembers, currentFamily } = useFamily();
  const { getOverallProgress } = useProgress();

  // Sample missions data
  const missions: Mission[] = [
    {
      id: 'privacy-basics-1',
      title: 'Password Protection',
      description: 'Learn how to create strong passwords and keep them safe',
      ageGroups: ['5-8', '9-12'],
      category: 'privacy',
      difficulty: 'beginner',
      duration: 15,
      xpReward: 50,
      isLocked: false,
      isCompleted: false,
      icon: Shield,
      tags: ['passwords', 'security', 'basics']
    },
    {
      id: 'privacy-basics-2',
      title: 'Personal Information Safety',
      description: 'Understand what personal information is and how to protect it',
      ageGroups: ['5-8', '9-12'],
      category: 'privacy',
      difficulty: 'beginner',
      duration: 20,
      xpReward: 60,
      isLocked: false,
      isCompleted: false,
      icon: Shield,
      tags: ['personal-info', 'privacy', 'safety']
    },
    {
      id: 'social-media-privacy',
      title: 'Social Media Privacy Settings',
      description: 'Learn how to manage privacy settings on social media platforms',
      ageGroups: ['9-12', '13-17'],
      category: 'privacy',
      difficulty: 'intermediate',
      duration: 25,
      xpReward: 75,
      isLocked: false,
      isCompleted: false,
      icon: Users,
      tags: ['social-media', 'settings', 'privacy']
    },
    {
      id: 'online-strangers',
      title: 'Stranger Danger Online',
      description: 'Learn how to identify and handle interactions with strangers online',
      ageGroups: ['5-8', '9-12'],
      category: 'security',
      difficulty: 'beginner',
      duration: 18,
      xpReward: 55,
      isLocked: false,
      isCompleted: false,
      icon: Shield,
      tags: ['strangers', 'safety', 'online']
    },
    {
      id: 'digital-footprint',
      title: 'Understanding Digital Footprints',
      description: 'Learn about digital footprints and how to manage your online presence',
      ageGroups: ['9-12', '13-17'],
      category: 'digital-citizenship',
      difficulty: 'intermediate',
      duration: 30,
      xpReward: 80,
      isLocked: false,
      isCompleted: false,
      icon: Target,
      tags: ['digital-footprint', 'reputation', 'online-presence']
    },
    {
      id: 'cyberbullying-prevention',
      title: 'Cyberbullying Prevention',
      description: 'Learn how to prevent and respond to cyberbullying',
      ageGroups: ['9-12', '13-17'],
      category: 'communication',
      difficulty: 'intermediate',
      duration: 22,
      xpReward: 70,
      isLocked: false,
      isCompleted: false,
      icon: Shield,
      tags: ['cyberbullying', 'communication', 'safety']
    },
    {
      id: 'advanced-privacy-tools',
      title: 'Advanced Privacy Tools',
      description: 'Explore advanced privacy tools and techniques',
      ageGroups: ['13-17'],
      category: 'privacy',
      difficulty: 'advanced',
      duration: 35,
      xpReward: 100,
      isLocked: true,
      isCompleted: false,
      icon: Zap,
      prerequisites: ['privacy-basics-1', 'privacy-basics-2'],
      tags: ['advanced', 'tools', 'privacy']
    }
  ];

  // Sample daily challenges
  const dailyChallenges: DailyChallenge[] = [
    {
      id: 'daily-privacy-check',
      title: 'Daily Privacy Check',
      description: 'Review and update your privacy settings on one app or website',
      xpReward: 25,
      isCompleted: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      category: 'privacy'
    },
    {
      id: 'password-strength-audit',
      title: 'Password Strength Audit',
      description: 'Check the strength of your passwords and update weak ones',
      xpReward: 30,
      isCompleted: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      category: 'security'
    },
    {
      id: 'digital-citizenship-moment',
      title: 'Digital Citizenship Moment',
      description: 'Share a positive message or help someone online',
      xpReward: 20,
      isCompleted: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      category: 'communication'
    }
  ];

  // Generate leaderboard data
  const generateLeaderboard = (): LeaderboardEntry[] => {
    return familyMembers.map(member => {
      const progress = localStorageManager.getUserProgress(member.user_id);
      return {
        memberId: member.id,
        name: `${member.first_name} ${member.last_name}`,
        avatar: member.first_name.charAt(0),
        totalXP: progress?.totalXP || 0,
        level: progress?.currentLevel || 1,
        completedMissions: progress?.completedMissions.length || 0,
        streak: progress?.currentStreak || 0
      };
    }).sort((a, b) => b.totalXP - a.totalXP);
  };

  const leaderboard = generateLeaderboard();

  // Filter missions based on selected criteria
  const filteredMissions = missions.filter(mission => {
    const matchesAgeGroup = selectedAgeGroup === 'all' || mission.ageGroups.includes(selectedAgeGroup);
    const matchesCategory = selectedCategory === 'all' || mission.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesAgeGroup && matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'privacy': return Shield;
      case 'security': return Shield;
      case 'digital-citizenship': return Users;
      case 'communication': return Users;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgeGroupColor = (ageGroup: string) => {
    switch (ageGroup) {
      case '5-8': return 'bg-blue-100 text-blue-800';
      case '9-12': return 'bg-purple-100 text-purple-800';
      case '13-17': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Mission Hub
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
              Interactive missions to master digital privacy and safety skills
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Target size={16} />
                <span>{filteredMissions.length} Available Missions</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{dailyChallenges.length} Daily Challenges</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>{leaderboard.length} Family Members</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <ArrowRight size={16} className="rotate-180" />
              Back to Family Hub
            </a>
            
            <nav className="flex items-center gap-8">
              {[
                { key: 'missions', label: 'Missions', icon: Target },
                { key: 'challenges', label: 'Daily Challenges', icon: Calendar },
                { key: 'leaderboard', label: 'Leaderboard', icon: Trophy }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as 'missions' | 'challenges' | 'leaderboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === key 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
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
        
        {/* Missions Tab */}
        {activeTab === 'missions' && (
          <div className="space-y-8">
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search missions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={selectedAgeGroup}
                    onChange={(e) => setSelectedAgeGroup(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Ages</option>
                    <option value="5-8">Ages 5-8</option>
                    <option value="9-12">Ages 9-12</option>
                    <option value="13-17">Ages 13-17</option>
                  </select>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="privacy">Privacy</option>
                    <option value="security">Security</option>
                    <option value="digital-citizenship">Digital Citizenship</option>
                    <option value="communication">Communication</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Missions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.map((mission) => {
                const CategoryIcon = getCategoryIcon(mission.category);
                const MissionIcon = mission.icon;
                
                return (
                  <div 
                    key={mission.id}
                    className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${
                      mission.isLocked ? 'opacity-60' : 'cursor-pointer hover:scale-105'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          mission.isLocked ? 'bg-gray-200' : 'bg-gradient-to-r from-green-500 to-green-600'
                        }`}>
                          {mission.isLocked ? (
                            <Lock size={24} className="text-gray-400" />
                          ) : (
                            <MissionIcon size={24} className="text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>
                            {mission.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-500)' }}>
                            <CategoryIcon size={14} />
                            <span className="capitalize">{mission.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      {mission.isCompleted && (
                        <CheckCircle size={20} className="text-green-500" />
                      )}
                    </div>
                    
                    <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                      {mission.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mission.ageGroups.map((ageGroup) => (
                        <span 
                          key={ageGroup}
                          className={`px-2 py-1 rounded text-xs font-medium ${getAgeGroupColor(ageGroup)}`}
                        >
                          Ages {ageGroup}
                        </span>
                      ))}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                        {mission.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--gray-500)' }}>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{mission.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} />
                          <span>{mission.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        mission.isLocked 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : mission.isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                      }`}
                      disabled={mission.isLocked}
                    >
                      {mission.isLocked ? 'Locked' : mission.isCompleted ? 'Review' : 'Start Mission'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Daily Challenges
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
                Complete daily challenges to earn bonus XP and build consistent learning habits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyChallenges.map((challenge) => (
                <div 
                  key={challenge.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <Calendar size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>
                          {challenge.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-500)' }}>
                          <Clock size={14} />
                          <span>Expires in {Math.ceil((new Date(challenge.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60))} hours</span>
                        </div>
                      </div>
                    </div>
                    
                    {challenge.isCompleted && (
                      <CheckCircle size={20} className="text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                    {challenge.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--gray-500)' }}>
                      <Star size={14} />
                      <span>{challenge.xpReward} XP Reward</span>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                      {challenge.category}
                    </span>
                  </div>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                      challenge.isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                    }`}
                  >
                    {challenge.isCompleted ? 'Completed' : 'Start Challenge'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Family Leaderboard
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
                See how your family members are progressing in their privacy education journey.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={entry.memberId}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' :
                      index === 2 ? 'bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200' :
                      'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                        {entry.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold" style={{ color: 'var(--primary)' }}>
                          {entry.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--gray-500)' }}>
                          <span>Level {entry.level}</span>
                          <span>{entry.completedMissions} missions</span>
                          <span>{entry.streak} day streak</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {entry.totalXP}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--gray-500)' }}>
                        Total XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MissionHub;