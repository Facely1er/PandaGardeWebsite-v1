import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { activityService, progressService } from '../lib/database';
import { useAuth } from './AuthContext';

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
  markActivityCompleted: (memberId: string, activityId: string, score?: number, timeSpent?: number) => void;
  startActivity: (memberId: string, activityId: string) => void;
  getActivityProgress: (activityId: string) => ActivityProgress | undefined;
  getOverallProgress: () => {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
  syncWithDatabase: (memberId: string) => Promise<void>;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

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
  const { user } = useAuth();

  // Load progress from localStorage on mount and sync with database
  useEffect(() => {
    const loadProgress = async () => {
      // First load from localStorage for immediate UI update
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

      // Then sync with database if user is authenticated
      if (user?.id) {
        await syncWithDatabase(user.id);
      }
    };

    loadProgress();
  }, [user?.id]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const syncWithDatabase = useCallback(async (memberId: string) => {
    try {
      // Load activities from database
      const activities = await activityService.getUserActivities(memberId);
      const progressData = await progressService.getUserProgress(memberId);

      // Convert database data to local progress format
      const completedActivities = activities
        .filter(activity => activity.completed_at)
        .map(activity => activity.activity_type);

      const activityDetails: Record<string, ActivityProgress> = {};
      activities.forEach(activity => {
        if (activity.completed_at) {
          activityDetails[activity.activity_type] = {
            activityId: activity.activity_type,
            completed: true,
            score: activity.activity_data?.score,
            completedAt: new Date(activity.completed_at),
            timeSpent: activity.activity_data?.timeSpent
          };
        }
      });

      // Calculate achievements
      const achievements: string[] = [];
      if (completedActivities.length >= 1) achievements.push('first_activity');
      if (completedActivities.length >= 3) achievements.push('getting_started');
      if (completedActivities.length >= 6) achievements.push('privacy_champion');

      const totalTimeSpent = activities.reduce((total, activity) =>
        total + (activity.activity_data?.timeSpent || 0), 0
      );
      if (totalTimeSpent >= 60) achievements.push('dedicated_learner');

      const syncedProgress: UserProgress = {
        completedActivities,
        activityDetails,
        totalTimeSpent,
        achievements,
        lastUpdated: new Date()
      };

      setProgress(syncedProgress);
    } catch (error) {
      console.error('Error syncing with database:', error);
    }
  }, []);

  const markActivityCompleted = useCallback(async (memberId: string, activityId: string, score?: number, timeSpent?: number) => {
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

    // Save to database if user is authenticated
    if (memberId !== 'demo-user') {
      try {
        await activityService.createActivity({
          user_id: memberId,
          activity_type: activityId,
          activity_data: { score, timeSpent },
          completed_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error saving activity to database:', error);
      }
    }
  }, []);

  const startActivity = useCallback(async (memberId: string, activityId: string) => {
    // Save activity start to database if user is authenticated
    if (memberId !== 'demo-user') {
      try {
        await activityService.createActivity({
          user_id: memberId,
          activity_type: activityId,
          activity_data: { started: true }
        });
      } catch (error) {
        console.error('Error saving activity start to database:', error);
      }
    }
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
    startActivity,
    getActivityProgress,
    getOverallProgress,
    resetProgress,
    exportProgress,
    importProgress,
    syncWithDatabase
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};