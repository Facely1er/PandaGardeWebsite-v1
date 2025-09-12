import React, { createContext, useState, useEffect, useCallback } from 'react';

interface ActivityProgress {
  activityId: string;
  completed: boolean;
  score?: number;
  completedAt: Date;
  timeSpent?: number; // in minutes
}

interface UserProgress {
  completedActivities: string[];
  activityDetails: Record<string, ActivityProgress>;
  totalTimeSpent: number;
  achievements: string[];
  lastUpdated: Date;
}

interface ProgressContextType {
  progress: UserProgress;
  markActivityCompleted: (activityId: string, score?: number, timeSpent?: number) => void;
  getActivityProgress: (activityId: string) => ActivityProgress | undefined;
  getOverallProgress: () => {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = 'pandagarde_progress';

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>({
    completedActivities: [],
    activityDetails: {},
    totalTimeSpent: 0,
    achievements: [],
    lastUpdated: new Date()
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Convert date strings back to Date objects
        const processedProgress = {
          ...parsed,
          activityDetails: Object.fromEntries(
            Object.entries(parsed.activityDetails || {}).map(([key, value]: [string, ActivityProgress]) => [
              key,
              {
                ...value,
                completedAt: new Date(value.completedAt)
              }
            ])
          ),
          lastUpdated: new Date(parsed.lastUpdated)
        };
        setProgress(processedProgress);
      } catch (error) {
        console.error('Error loading progress from localStorage:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markActivityCompleted = useCallback((activityId: string, score?: number, timeSpent?: number) => {
    setProgress(prev => {
      const isAlreadyCompleted = prev.completedActivities.includes(activityId);
      
      if (isAlreadyCompleted) {
        return prev; // Don't update if already completed
      }

      const newProgress: UserProgress = {
        ...prev,
        completedActivities: [...prev.completedActivities, activityId],
        activityDetails: {
          ...prev.activityDetails,
          [activityId]: {
            activityId,
            completed: true,
            score,
            completedAt: new Date(),
            timeSpent
          }
        },
        totalTimeSpent: prev.totalTimeSpent + (timeSpent || 0),
        lastUpdated: new Date()
      };

      // Check for achievements
      const achievements = [...prev.achievements];
      
      if (newProgress.completedActivities.length === 1) {
        achievements.push('first_activity');
      }
      
      if (newProgress.completedActivities.length === 3) {
        achievements.push('getting_started');
      }
      
      if (newProgress.completedActivities.length === 6) {
        achievements.push('privacy_champion');
      }

      if (newProgress.totalTimeSpent >= 60) {
        achievements.push('dedicated_learner');
      }

      newProgress.achievements = [...new Set(achievements)]; // Remove duplicates

      return newProgress;
    });
  }, []);

  const getActivityProgress = useCallback((activityId: string) => {
    return progress.activityDetails[activityId];
  }, [progress.activityDetails]);

  const getOverallProgress = useCallback(() => {
    // Assuming there are 6 activities total
    const totalCount = 6;
    const completedCount = progress.completedActivities.length;
    const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    
    return {
      completedCount,
      totalCount,
      percentage
    };
  }, [progress.completedActivities]);

  const resetProgress = useCallback(() => {
    setProgress({
      completedActivities: [],
      activityDetails: {},
      totalTimeSpent: 0,
      achievements: [],
      lastUpdated: new Date()
    });
  }, []);

  const exportProgress = useCallback(() => {
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  const importProgress = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      const processedProgress = {
        ...parsed,
        activityDetails: Object.fromEntries(
          Object.entries(parsed.activityDetails || {}).map(([key, value]: [string, ActivityProgress]) => [
            key,
            {
              ...value,
              completedAt: new Date(value.completedAt)
            }
          ])
        ),
        lastUpdated: new Date(parsed.lastUpdated)
      };
      setProgress(processedProgress);
      return true;
    } catch (error) {
      console.error('Error importing progress:', error);
      return false;
    }
  }, []);

  const value: ProgressContextType = {
    progress,
    markActivityCompleted,
    getActivityProgress,
    getOverallProgress,
    resetProgress,
    exportProgress,
    importProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};