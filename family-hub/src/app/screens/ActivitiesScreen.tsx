import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ActivityManager from '../../components/activities/ActivityManager';
import AdventureWorld from '../../components/activities/AdventureWorld';

interface PlayerProgress {
  level: number;
  totalXp: number;
  xpToNextLevel: number;
  completedActivities: string[];
  dailyStreak: number;
  lastPlayedDate: string;
}

const ActivitiesScreen: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [playerProgress, setPlayerProgress] = useLocalStorage<PlayerProgress>('pandagarde_player_progress', {
    level: 1,
    totalXp: 0,
    xpToNextLevel: 100,
    completedActivities: [],
    dailyStreak: 1,
    lastPlayedDate: new Date().toISOString().split('T')[0],
  });

  // XP required per level (increases each level)
  const getXpForLevel = (level: number) => 100 + (level - 1) * 50;

  const addXp = (amount: number) => {
    let newXp = playerProgress.totalXp + amount;
    let newLevel = playerProgress.level;
    let xpNeeded = getXpForLevel(newLevel);

    // Level up logic
    while (newXp >= xpNeeded) {
      newXp -= xpNeeded;
      newLevel++;
      xpNeeded = getXpForLevel(newLevel);
    }

    // Update daily streak
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = playerProgress.dailyStreak;
    
    if (playerProgress.lastPlayedDate === yesterday) {
      newStreak++;
    } else if (playerProgress.lastPlayedDate !== today) {
      newStreak = 1;
    }

    setPlayerProgress({
      ...playerProgress,
      totalXp: newXp,
      level: newLevel,
      xpToNextLevel: xpNeeded,
      dailyStreak: newStreak,
      lastPlayedDate: today,
    });
  };

  const handleActivityComplete = (activityId: string, score?: number) => {
    // Calculate XP based on score
    const baseXp = 50;
    const bonusXp = score ? Math.floor(score / 2) : 0;
    const totalXpEarned = baseXp + bonusXp;
    
    addXp(totalXpEarned);
    
    // Track completed activity
    if (!playerProgress.completedActivities.includes(activityId)) {
      setPlayerProgress(prev => ({
        ...prev,
        completedActivities: [...prev.completedActivities, activityId],
      }));
    }

    setSelectedActivity(null);
  };

  if (selectedActivity) {
    return (
      <ActivityManager
        activityId={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onComplete={handleActivityComplete}
      />
    );
  }

  return (
    <AdventureWorld
      onSelectActivity={setSelectedActivity}
      currentLevel={playerProgress.level}
      totalXp={playerProgress.totalXp}
    />
  );
};

export default ActivitiesScreen;
