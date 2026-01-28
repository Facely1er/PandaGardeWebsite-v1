import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useFamilyProgress } from '../../contexts/FamilyProgressContext';
import CharacterPanel from '../../components/dashboard/CharacterPanel';
import QuickActions from '../../components/dashboard/QuickActions';
import DailyChallenge from '../../components/dashboard/DailyChallenge';
import FamilyLeaderboard from '../../components/dashboard/FamilyLeaderboard';
import RecentAchievements from '../../components/dashboard/RecentAchievements';
import { PandaMascot, GamepadIcon, BrainIcon, HelpIcon } from '../../components/icons/ZoneIcons';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PlayerProgress {
  level: number;
  totalXp: number;
  xpToNextLevel: number;
  currentXp: number;
  completedActivities: string[];
  dailyStreak: number;
  lastPlayedDate: string;
}

interface FamilyMember {
  id: number;
  name: string;
  age: number;
  role: string;
  privacyScore: number;
  completedActivities: number;
  badges: string[];
  lastActive: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  xpEarned: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { calculateMemberScore } = useFamilyProgress();
  
  const [playerProgress] = useLocalStorage<PlayerProgress>('pandagarde_player_progress', {
    level: 1,
    totalXp: 0,
    xpToNextLevel: 100,
    currentXp: 0,
    completedActivities: [],
    dailyStreak: 1,
    lastPlayedDate: new Date().toISOString().split('T')[0],
  });

  const [familyMembers] = useLocalStorage<FamilyMember[]>('pandagarde_family', []);
  
  const [achievements] = useLocalStorage<Achievement[]>('pandagarde_achievements', [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first activity',
      icon: '🎉',
      earnedAt: new Date().toISOString(),
      xpEarned: 25,
      rarity: 'common',
    },
    {
      id: '2',
      title: 'Privacy Explorer',
      description: 'Explore all adventure zones',
      icon: '🗺️',
      earnedAt: new Date(Date.now() - 86400000).toISOString(),
      xpEarned: 50,
      rarity: 'rare',
    },
  ]);

  // Calculate time remaining until daily reset (midnight)
  const getTimeRemaining = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m`;
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock daily challenges
  const dailyChallenges = [
    {
      id: 'daily-1',
      title: 'Complete 2 activities',
      description: 'Play any 2 games',
      progress: 1,
      total: 2,
      xpReward: 30,
      icon: '🎮',
      IconComponent: GamepadIcon,
      completed: false,
    },
    {
      id: 'daily-2',
      title: 'Score 80%+ on a quiz',
      description: 'Ace a quiz challenge',
      progress: 0,
      total: 1,
      xpReward: 50,
      icon: '🧠',
      IconComponent: BrainIcon,
      completed: false,
    },
    {
      id: 'daily-3',
      title: 'Help a family member',
      description: 'Complete an activity together',
      progress: 1,
      total: 1,
      xpReward: 40,
      icon: '👨‍👩‍👧',
      IconComponent: HelpIcon,
      completed: true,
    },
  ];

  // Get rank based on level
  const getRank = (level: number) => {
    if (level >= 20) return 'Privacy Master';
    if (level >= 15) return 'Security Expert';
    if (level >= 10) return 'Privacy Champion';
    if (level >= 5) return 'Safety Scout';
    return 'Privacy Rookie';
  };

  // Transform family members for leaderboard
  const leaderboardMembers = familyMembers.map(member => ({
    id: member.id,
    name: member.name,
    score: calculateMemberScore(member.id),
    level: Math.floor(calculateMemberScore(member.id) / 20) + 1,
    activitiesToday: Math.floor(Math.random() * 5),
    avatar: member.name.charAt(0).toUpperCase(),
    trend: Math.random() > 0.5 ? 'up' : 'same' as 'up' | 'down' | 'same',
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-white pb-24">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative z-10 px-4 pt-4 pb-6">
          {/* Greeting */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md mb-3">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Welcome back, Privacy Hero!
              </span>
            </div>
          </div>

          {/* Character Panel */}
          <CharacterPanel
            name="Privacy Hero"
            level={playerProgress.level}
            currentXp={playerProgress.currentXp || playerProgress.totalXp % (playerProgress.xpToNextLevel || 100)}
            xpToNextLevel={playerProgress.xpToNextLevel}
            totalXp={playerProgress.totalXp}
            streak={playerProgress.dailyStreak}
            badges={achievements.length}
            rank={getRank(playerProgress.level)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-6">
        {/* Quick Actions */}
        <QuickActions />

        {/* Daily Challenges */}
        <DailyChallenge 
          challenges={dailyChallenges}
          timeRemaining={timeRemaining}
        />

        {/* Two Column Layout for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Family Leaderboard */}
          <FamilyLeaderboard members={leaderboardMembers} />

          {/* Recent Achievements */}
          <RecentAchievements 
            achievements={achievements}
            onViewAll={() => navigate('/app/progress')}
          />
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="absolute top-0 right-0 text-8xl opacity-20">🐼</div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Ready for an Adventure?</h3>
            <p className="text-white/80 text-sm mb-4">
              Explore the Privacy World and complete activities to level up!
            </p>
            <button
              onClick={() => navigate('/app/activities')}
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Start Adventure
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Panda Mascot */}
      <div className="fixed bottom-24 right-4 z-40 hidden sm:block">
        <div className="animate-bounce-slow drop-shadow-xl">
          <PandaMascot size={70} />
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
