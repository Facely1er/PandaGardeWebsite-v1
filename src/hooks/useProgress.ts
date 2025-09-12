import { useState, useEffect, useCallback } from 'react';

export interface ActivityProgress {
  activityId: string;
  completed: boolean;
  score?: number;
  completedAt?: Date;
  attempts: number;
  timeSpent: number; // in seconds
  lastAttempted?: Date;
}

export interface FamilyMember {
  id: string;
  name: string;
  ageGroup: string;
  avatar?: string;
  progress: ActivityProgress[];
  totalTimeSpent: number;
  achievements: string[];
  joinedAt: Date;
}

export interface FamilyProgress {
  members: FamilyMember[];
  totalActivitiesCompleted: number;
  totalTimeSpent: number;
  lastActivityDate?: Date;
}

const STORAGE_KEY = 'pandagarde-progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<FamilyProgress>({
    members: [],
    totalActivitiesCompleted: 0,
    totalTimeSpent: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        // Convert date strings back to Date objects
        const processedProgress = {
          ...parsed,
          members: parsed.members.map((member: any) => ({
            ...member,
            joinedAt: new Date(member.joinedAt),
            progress: member.progress.map((activity: any) => ({
              ...activity,
              completedAt: activity.completedAt ? new Date(activity.completedAt) : undefined,
              lastAttempted: activity.lastAttempted ? new Date(activity.lastAttempted) : undefined
            }))
          })),
          lastActivityDate: parsed.lastActivityDate ? new Date(parsed.lastActivityDate) : undefined
        };
        setProgress(processedProgress);
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving progress to localStorage:', error);
      }
    }
  }, [progress, isLoading]);

  // Add a new family member
  const addFamilyMember = useCallback((name: string, ageGroup: string, avatar?: string) => {
    const newMember: FamilyMember = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      ageGroup,
      avatar,
      progress: [],
      totalTimeSpent: 0,
      achievements: [],
      joinedAt: new Date()
    };

    setProgress(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));

    return newMember.id;
  }, []);

  // Update family member
  const updateFamilyMember = useCallback((memberId: string, updates: Partial<FamilyMember>) => {
    setProgress(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === memberId ? { ...member, ...updates } : member
      )
    }));
  }, []);

  // Remove family member
  const removeFamilyMember = useCallback((memberId: string) => {
    setProgress(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== memberId)
    }));
  }, []);

  // Start an activity
  const startActivity = useCallback((memberId: string, activityId: string) => {
    setProgress(prev => ({
      ...prev,
      members: prev.members.map(member => {
        if (member.id === memberId) {
          const existingActivity = member.progress.find(p => p.activityId === activityId);
          if (existingActivity) {
            // Update existing activity
            return {
              ...member,
              progress: member.progress.map(p =>
                p.activityId === activityId
                  ? { ...p, lastAttempted: new Date(), attempts: p.attempts + 1 }
                  : p
              )
            };
          } else {
            // Add new activity
            return {
              ...member,
              progress: [
                ...member.progress,
                {
                  activityId,
                  completed: false,
                  attempts: 1,
                  timeSpent: 0,
                  lastAttempted: new Date()
                }
              ]
            };
          }
        }
        return member;
      })
    }));
  }, []);

  // Complete an activity
  const completeActivity = useCallback((memberId: string, activityId: string, score?: number, timeSpent: number = 0) => {
    setProgress(prev => {
      const updatedProgress = {
        ...prev,
        members: prev.members.map(member => {
          if (member.id === memberId) {
            const updatedProgress = member.progress.map(p =>
              p.activityId === activityId
                ? {
                    ...p,
                    completed: true,
                    score,
                    completedAt: new Date(),
                    timeSpent: p.timeSpent + timeSpent
                  }
                : p
            );

            // Calculate total time spent
            const totalTimeSpent = updatedProgress.reduce((total, activity) => total + activity.timeSpent, 0);

            return {
              ...member,
              progress: updatedProgress,
              totalTimeSpent
            };
          }
          return member;
        })
      };

      // Calculate family totals
      const totalActivitiesCompleted = updatedProgress.members.reduce(
        (total, member) => total + member.progress.filter(p => p.completed).length,
        0
      );
      const totalTimeSpent = updatedProgress.members.reduce(
        (total, member) => total + member.totalTimeSpent,
        0
      );

      return {
        ...updatedProgress,
        totalActivitiesCompleted,
        totalTimeSpent,
        lastActivityDate: new Date()
      };
    });
  }, []);

  // Add time to an activity
  const addTimeToActivity = useCallback((memberId: string, activityId: string, timeSpent: number) => {
    setProgress(prev => ({
      ...prev,
      members: prev.members.map(member => {
        if (member.id === memberId) {
          const updatedProgress = member.progress.map(p =>
            p.activityId === activityId
              ? { ...p, timeSpent: p.timeSpent + timeSpent }
              : p
          );

          const totalTimeSpent = updatedProgress.reduce((total, activity) => total + activity.timeSpent, 0);

          return {
            ...member,
            progress: updatedProgress,
            totalTimeSpent
          };
        }
        return member;
      })
    }));
  }, []);

  // Add achievement
  const addAchievement = useCallback((memberId: string, achievement: string) => {
    setProgress(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === memberId
          ? {
              ...member,
              achievements: member.achievements.includes(achievement)
                ? member.achievements
                : [...member.achievements, achievement]
            }
          : member
      )
    }));
  }, []);

  // Get member progress
  const getMemberProgress = useCallback((memberId: string) => {
    return progress.members.find(member => member.id === memberId);
  }, [progress.members]);

  // Get activity progress for a member
  const getActivityProgress = useCallback((memberId: string, activityId: string) => {
    const member = getMemberProgress(memberId);
    return member?.progress.find(p => p.activityId === activityId);
  }, [getMemberProgress]);

  // Get completion percentage for a member
  const getCompletionPercentage = useCallback((memberId: string, totalActivities: number = 6) => {
    const member = getMemberProgress(memberId);
    if (!member) return 0;
    const completedActivities = member.progress.filter(p => p.completed).length;
    return Math.round((completedActivities / totalActivities) * 100);
  }, [getMemberProgress]);

  // Get family statistics
  const getFamilyStats = useCallback(() => {
    return {
      totalMembers: progress.members.length,
      totalActivitiesCompleted: progress.totalActivitiesCompleted,
      totalTimeSpent: progress.totalTimeSpent,
      averageCompletion: progress.members.length > 0
        ? Math.round(progress.members.reduce((total, member) => 
            total + getCompletionPercentage(member.id), 0) / progress.members.length)
        : 0,
      lastActivityDate: progress.lastActivityDate
    };
  }, [progress, getCompletionPercentage]);

  // Clear all progress (for testing or reset)
  const clearAllProgress = useCallback(() => {
    setProgress({
      members: [],
      totalActivitiesCompleted: 0,
      totalTimeSpent: 0
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Export progress data
  const exportProgress = useCallback(() => {
    const dataStr = JSON.stringify(progress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pandagarde-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [progress]);

  // Import progress data
  const importProgress = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setProgress(imported);
          resolve();
        } catch (error) {
          reject(new Error('Invalid file format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  return {
    progress,
    isLoading,
    addFamilyMember,
    updateFamilyMember,
    removeFamilyMember,
    startActivity,
    completeActivity,
    addTimeToActivity,
    addAchievement,
    getMemberProgress,
    getActivityProgress,
    getCompletionPercentage,
    getFamilyStats,
    clearAllProgress,
    exportProgress,
    importProgress
  };
};