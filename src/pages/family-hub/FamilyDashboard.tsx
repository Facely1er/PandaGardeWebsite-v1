import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Award, 
  Clock, 
  Calendar,
  Download,
  Upload,
  Activity,
  Star,
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Calendar as CalendarIcon,
  Zap,
  Trophy,
  User,
  UserCheck,
  Child as ChildIcon
} from 'lucide-react';
import { useFamily } from '../../contexts/FamilyContext';
import { useProgress } from '../../contexts/ProgressContext';
import { localStorageManager } from '../../utils/localStorageManager';

interface FamilyMemberCard {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  avatar: string;
  level: number;
  totalXP: number;
  completedMissions: number;
  currentStreak: number;
  lastActive: string;
  privacyScore: number;
  ageGroup: string;
}

interface ActivityFeedItem {
  id: string;
  memberName: string;
  action: string;
  timestamp: string;
  xpEarned?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  xpReward: number;
  isCompleted: boolean;
  category: string;
}

const FamilyDashboard: React.FC = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [storageUsage, setStorageUsage] = useState(0);
  
  const { 
    familyMembers, 
    currentFamily, 
    calculateFamilyPrivacyScore,
    exportFamilyData,
    importFamilyData,
    getFamilyStorageUsage
  } = useFamily();
  const { getOverallProgress } = useProgress();

  // Generate family member cards with enhanced data
  const generateFamilyMemberCards = (): FamilyMemberCard[] => {
    return familyMembers.map(member => {
      const progress = localStorageManager.getUserProgress(member.user_id);
      const ageGroup = member.profile_data?.age ? 
        (member.profile_data.age <= 8 ? '5-8' : 
         member.profile_data.age <= 12 ? '9-12' : '13-17') : '9-12';
      
      return {
        id: member.id,
        name: `${member.first_name} ${member.last_name}`,
        email: member.email,
        role: member.role,
        avatar: member.first_name.charAt(0),
        level: progress?.currentLevel || 1,
        totalXP: progress?.totalXP || 0,
        completedMissions: progress?.completedMissions.length || 0,
        currentStreak: progress?.currentStreak || 0,
        lastActive: progress?.lastActive || new Date().toISOString(),
        privacyScore: member.privacyScore || 0,
        ageGroup
      };
    });
  };

  const familyMemberCards = generateFamilyMemberCards();

  // Generate activity feed
  const generateActivityFeed = (): ActivityFeedItem[] => {
    const activities: ActivityFeedItem[] = [];
    
    familyMembers.forEach(member => {
      const progress = localStorageManager.getUserProgress(member.user_id);
      const memberName = `${member.first_name} ${member.last_name}`;
      
      // Add recent mission completions
      if (progress?.completedMissions.length) {
        progress.completedMissions.slice(-3).forEach(missionId => {
          activities.push({
            id: `mission-${missionId}-${member.id}`,
            memberName,
            action: `Completed mission: ${missionId}`,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            xpEarned: 50,
            icon: CheckCircle
          });
        });
      }
      
      // Add streak achievements
      if (progress?.currentStreak > 0) {
        activities.push({
          id: `streak-${member.id}`,
          memberName,
          action: `Maintained ${progress.currentStreak} day learning streak`,
          timestamp: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
          xpEarned: progress.currentStreak * 10,
          icon: Zap
        });
      }
      
      // Add level ups
      if (progress?.currentLevel > 1) {
        activities.push({
          id: `levelup-${member.id}`,
          memberName,
          action: `Reached level ${progress.currentLevel}`,
          timestamp: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
          xpEarned: 100,
          icon: Trophy
        });
      }
    });
    
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);
  };

  const activityFeed = generateActivityFeed();

  // Sample weekly challenges
  const weeklyChallenges: WeeklyChallenge[] = [
    {
      id: 'family-privacy-audit',
      title: 'Family Privacy Audit',
      description: 'Complete privacy settings review for all family devices',
      progress: 2,
      maxProgress: 4,
      xpReward: 100,
      isCompleted: false,
      category: 'privacy'
    },
    {
      id: 'learning-streak',
      title: 'Learning Streak',
      description: 'Maintain 7-day learning streak across family',
      progress: 5,
      maxProgress: 7,
      xpReward: 150,
      isCompleted: false,
      category: 'engagement'
    },
    {
      id: 'mission-master',
      title: 'Mission Master',
      description: 'Complete 10 missions as a family',
      progress: 7,
      maxProgress: 10,
      xpReward: 200,
      isCompleted: false,
      category: 'achievement'
    }
  ];

  const familyPrivacyScore = calculateFamilyPrivacyScore();

  useEffect(() => {
    setStorageUsage(getFamilyStorageUsage());
  }, [getFamilyStorageUsage]);

  const handleExportData = () => {
    const data = exportFamilyData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pandagarde-family-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handleImportData = () => {
    if (importData.trim()) {
      const success = importFamilyData(importData);
      if (success) {
        alert('Family data imported successfully!');
        setImportData('');
        setShowImportModal(false);
        // Refresh storage usage
        setStorageUsage(getFamilyStorageUsage());
      } else {
        alert('Failed to import data. Please check the format.');
      }
    }
  };

  const getAgeGroupIcon = (ageGroup: string) => {
    switch (ageGroup) {
      case '5-8': return ChildIcon;
      case '9-12': return User; 
      case '13-17': return UserCheck;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'parent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const getPrivacyScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatStorageSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              Family Dashboard
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
              Track your family's privacy education progress and achievements
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{familyMembers.length} Family Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span className={getPrivacyScoreColor(familyPrivacyScore)}>
                  {familyPrivacyScore}% Privacy Score
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>{getOverallProgress().percentage}% Overall Progress</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          
          {/* Family Member Cards */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
                Family Members
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Download size={16} />
                  Export Data
                </button>
                <button
                  onClick={() => setShowImportModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Upload size={16} />
                  Import Data
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {familyMemberCards.map((member) => {
                const AgeIcon = getAgeGroupIcon(member.ageGroup);
                const daysSinceActive = Math.floor((Date.now() - new Date(member.lastActive).getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div 
                    key={member.id}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>
                          {member.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-500)' }}>
                          <AgeIcon size={14} />
                          <span className="capitalize">{member.role}</span>
                          <span>•</span>
                          <span>Ages {member.ageGroup}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Level</span>
                        <span className="font-bold text-lg text-green-600">{member.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Total XP</span>
                        <span className="font-bold text-lg text-blue-600">{member.totalXP}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Missions</span>
                        <span className="font-bold text-lg text-purple-600">{member.completedMissions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Streak</span>
                        <span className="font-bold text-lg text-orange-600">{member.currentStreak} days</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm" style={{ color: 'var(--gray-600)' }}>Privacy Score</span>
                      <span className={`font-bold text-lg ${getPrivacyScoreColor(member.privacyScore)}`}>
                        {member.privacyScore}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--gray-500)' }}>
                      <span>Last active: {daysSinceActive === 0 ? 'Today' : `${daysSinceActive} days ago`}</span>
                      <span className={`px-2 py-1 rounded ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Family Privacy Score */}
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Family Privacy Score
            </h2>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getPrivacyScoreColor(familyPrivacyScore)}`}>
                        {familyPrivacyScore}%
                      </div>
                      <div className="text-sm" style={{ color: 'var(--gray-600)' }}>
                        Privacy Score
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
                  Your family's overall privacy awareness and safety practices score based on completed activities, 
                  learning streaks, and engagement levels.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                    Privacy Awareness
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    Based on completed privacy-focused missions and activities
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                    Learning Engagement
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    Measured by consistent learning streaks and activity completion
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={24} className="text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                    Achievement Progress
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    Calculated from unlocked achievements and skill development
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity Feed */}
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Recent Activity
            </h2>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                {activityFeed.length > 0 ? (
                  activityFeed.map((activity) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <ActivityIcon size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium" style={{ color: 'var(--primary)' }}>
                            {activity.memberName}
                          </p>
                          <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                            {activity.action}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm" style={{ color: 'var(--gray-500)' }}>
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </div>
                          {activity.xpEarned && (
                            <div className="text-sm font-medium text-green-600">
                              +{activity.xpEarned} XP
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Activity size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity to display</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Weekly Family Challenges */}
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Weekly Family Challenges
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weeklyChallenges.map((challenge) => (
                <div 
                  key={challenge.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Target size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>
                          {challenge.title}
                        </h3>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                    
                    {challenge.isCompleted && (
                      <CheckCircle size={20} className="text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                    {challenge.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span style={{ color: 'var(--gray-600)' }}>Progress</span>
                      <span className="font-medium">{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--gray-500)' }}>
                      <Star size={14} />
                      <span>{challenge.xpReward} XP Reward</span>
                    </div>
                    <button 
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        challenge.isCompleted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                      }`}
                    >
                      {challenge.isCompleted ? 'Completed' : 'View Challenge'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Storage Usage */}
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Data Management
            </h2>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4" style={{ color: 'var(--primary)' }}>
                    Storage Usage
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'var(--gray-600)' }}>Used Storage</span>
                      <span className="font-medium">{formatStorageSize(storageUsage)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((storageUsage / (5 * 1024 * 1024)) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-sm" style={{ color: 'var(--gray-500)' }}>
                      Estimated limit: 5MB (browser localStorage)
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-4" style={{ color: 'var(--primary)' }}>
                    Data Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Download size={16} />
                      Export All Data
                    </button>
                    <button
                      onClick={() => setShowImportModal(true)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Upload size={16} />
                      Import Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowExportModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Export Family Data
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--gray-600)' }}>
                This will download all your family's progress data, achievements, and settings as a JSON file.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleExportData}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Download Data
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowImportModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Import Family Data
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                Paste your exported JSON data to restore your family's progress.
              </p>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Paste your exported JSON data here..."
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleImportData}
                  disabled={!importData.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Import Data
                </button>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyDashboard;