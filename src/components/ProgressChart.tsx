import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Target, 
  BarChart3, 
  PieChart,
  Activity,
  Star,
  Zap,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Trophy,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';
import { localStorageManager } from '../utils/localStorageManager';

interface ProgressData {
  date: string;
  xp: number;
  missions: number;
  streak: number;
}

interface SkillData {
  category: string;
  level: number;
  maxLevel: number;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface CalendarDay {
  date: Date;
  xp: number;
  missions: number;
  hasActivity: boolean;
}

const ProgressChart: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const { familyMembers } = useFamily();

  // Generate sample progress data
  const generateProgressData = (memberId?: string): ProgressData[] => {
    const data: ProgressData[] = [];
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate realistic data with some randomness
      const baseXP = Math.random() * 50 + 10;
      const missions = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
      const streak = missions > 0 ? Math.min(Math.floor(Math.random() * 10) + 1, 30) : 0;
      
      data.push({
        date: date.toISOString().split('T')[0],
        xp: Math.floor(baseXP + (missions * 25)),
        missions,
        streak
      });
    }
    
    return data;
  };

  const progressData = generateProgressData(selectedMember);

  // Generate skill radar data
  const generateSkillData = (): SkillData[] => {
    return [
      { category: 'Privacy', level: 8, maxLevel: 10, color: '#10B981' },
      { category: 'Security', level: 6, maxLevel: 10, color: '#3B82F6' },
      { category: 'Digital Citizenship', level: 7, maxLevel: 10, color: '#8B5CF6' },
      { category: 'Communication', level: 5, maxLevel: 10, color: '#F59E0B' },
      { category: 'Critical Thinking', level: 9, maxLevel: 10, color: '#EF4444' },
      { category: 'Online Safety', level: 7, maxLevel: 10, color: '#06B6D4' }
    ];
  };

  const skillData = generateSkillData();

  // Generate achievements
  const generateAchievements = (): Achievement[] => {
    return [
      {
        id: 'first-mission',
        title: 'First Steps',
        description: 'Completed your first mission',
        icon: CheckCircle,
        unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'common'
      },
      {
        id: 'streak-master',
        title: 'Streak Master',
        description: 'Maintained a 7-day learning streak',
        icon: Zap,
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'rare'
      },
      {
        id: 'privacy-champion',
        title: 'Privacy Champion',
        description: 'Completed 10 privacy-focused missions',
        icon: Shield,
        unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'epic'
      },
      {
        id: 'level-10',
        title: 'Level 10 Achiever',
        description: 'Reached level 10',
        icon: Trophy,
        unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'legendary'
      },
      {
        id: 'family-leader',
        title: 'Family Leader',
        description: 'Led family in weekly challenges',
        icon: Users,
        unlockedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'epic'
      },
      {
        id: 'bookworm',
        title: 'Digital Bookworm',
        description: 'Spent 5+ hours learning',
        icon: BookOpen,
        unlockedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'rare'
      }
    ];
  };

  const achievements = generateAchievements();

  // Generate calendar data
  const generateCalendarData = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    const calendarDays: CalendarDay[] = [];
    
    // Add empty days for the start of the month
    for (let i = 0; i < startDay; i++) {
      calendarDays.push({
        date: new Date(year, month, i - startDay + 1),
        xp: 0,
        missions: 0,
        hasActivity: false
      });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const hasActivity = Math.random() > 0.6;
      const xp = hasActivity ? Math.floor(Math.random() * 100) + 10 : 0;
      const missions = hasActivity ? Math.floor(Math.random() * 3) + 1 : 0;
      
      calendarDays.push({
        date,
        xp,
        missions,
        hasActivity
      });
    }
    
    return calendarDays;
  };

  const calendarData = generateCalendarData();

  // Calculate category completion rates
  const categoryCompletion = useMemo(() => {
    const categories = [
      { name: 'Privacy', completed: 8, total: 12, color: '#10B981' },
      { name: 'Security', completed: 5, total: 10, color: '#3B82F6' },
      { name: 'Digital Citizenship', completed: 6, total: 8, color: '#8B5CF6' },
      { name: 'Communication', completed: 4, total: 7, color: '#F59E0B' },
      { name: 'Critical Thinking', completed: 7, total: 9, color: '#EF4444' }
    ];
    
    return categories.map(cat => ({
      ...cat,
      percentage: Math.round((cat.completed / cat.total) * 100)
    }));
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const maxXP = Math.max(...progressData.map(d => d.xp));
  const maxMissions = Math.max(...progressData.map(d => d.missions));

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Family Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Family Members</option>
              {familyMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* XP Over Time Graph */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
            XP Progress Over Time
          </h3>
          <TrendingUp size={24} className="text-green-600" />
        </div>
        
        <div className="h-64 flex items-end justify-between gap-2">
          {progressData.map((data, index) => {
            const height = (data.xp / maxXP) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-500 hover:from-green-600 hover:to-green-500"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                  title={`${data.date}: ${data.xp} XP`}
                />
                <div className="text-xs mt-2 text-center" style={{ color: 'var(--gray-500)' }}>
                  {new Date(data.date).getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between text-xs mt-4" style={{ color: 'var(--gray-500)' }}>
          <span>{progressData[0]?.date}</span>
          <span>{progressData[progressData.length - 1]?.date}</span>
        </div>
      </div>

      {/* Skill Radar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
            Skill Development
          </h3>
          <Target size={24} className="text-blue-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillData.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
                  {skill.category}
                </span>
                <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
                  {skill.level}/{skill.maxLevel}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(skill.level / skill.maxLevel) * 100}%`,
                    backgroundColor: skill.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
            Learning Streak Calendar
          </h3>
          <Calendar size={24} className="text-purple-600" />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h4 className="text-lg font-semibold">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h4>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-medium py-2" style={{ color: 'var(--gray-500)' }}>
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${
                day.hasActivity 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white font-medium' 
                  : 'bg-gray-100 text-gray-400'
              }`}
              title={day.hasActivity ? `${day.date.toLocaleDateString()}: ${day.xp} XP, ${day.missions} missions` : day.date.toLocaleDateString()}
            >
              {day.date.getDate()}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <span style={{ color: 'var(--gray-500)' }}>No activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded"></div>
            <span style={{ color: 'var(--gray-500)' }}>Learning activity</span>
          </div>
        </div>
      </div>

      {/* Achievement Gallery */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
            Achievement Gallery
          </h3>
          <Award size={24} className="text-yellow-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const AchievementIcon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <AchievementIcon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm" style={{ color: 'var(--primary)' }}>
                        {achievement.title}
                      </h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: 'var(--gray-600)' }}>
                      {achievement.description}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--gray-500)' }}>
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Completion Rates */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
            Category Completion Rates
          </h3>
          <PieChart size={24} className="text-indigo-600" />
        </div>
        
        <div className="space-y-4">
          {categoryCompletion.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
                  {category.name}
                </span>
                <span className="text-sm font-bold" style={{ color: category.color }}>
                  {category.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: category.color
                  }}
                />
              </div>
              <div className="flex justify-between text-xs" style={{ color: 'var(--gray-500)' }}>
                <span>{category.completed} completed</span>
                <span>{category.total} total</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;