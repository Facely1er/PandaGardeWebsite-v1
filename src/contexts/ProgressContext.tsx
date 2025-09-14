import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { activityService, progressService } from '../lib/database';

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
  markActivityCompleted: (activityId: string, score?: number, timeSpent?: number) => Promise<void>;
  startActivity: (activityId: string) => Promise<void>;
  getActivityProgress: (activityId: string) => ActivityProgress | undefined;
  getOverallProgress: () => {
    completedCount: number;
    totalCount: number;
    percentage: number;
  };
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
  syncWithDatabase: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

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
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>({
    completedActivities: [],
    activityDetails: {},
    totalTimeSpent: 0,
    achievements: [],
    lastUpdated: new Date()
  });

  // Load progress from database or localStorage
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        // Load from database for authenticated users
        try {
          await syncWithDatabase();
        } catch (error) {
          console.error('Error loading progress from database:', error);
          // Fallback to localStorage
          loadFromLocalStorage();
        }
      } else {
        // Load from localStorage for anonymous users
        loadFromLocalStorage();
      }
    };

    const loadFromLocalStorage = () => {
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
    };

    loadProgress();
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markActivityCompleted = useCallback(async (activityId: string, score?: number, timeSpent?: number) => {
    if (!user) {
      // For anonymous users, just update local state
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
      return;
    }

    // For authenticated users, update database
    try {
      // Create activity record
      const activity = await activityService.createActivity({
        user_id: user.id,
        activity_type: activityId,
        activity_data: { score, timeSpent },
        completed_at: new Date().toISOString()
      });

      if (activity) {
        // Save progress record
        await progressService.saveProgress({
          user_id: user.id,
          activity_id: activity.id,
          progress_data: {
            score,
            timeSpent,
            completedAt: new Date().toISOString()
          }
        });

        // Update local state
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
      }
    } catch (error) {
      console.error('Error saving activity to database:', error);
      // Fallback to local state update
      setProgress(prev => {
        const isAlreadyCompleted = prev.completedActivities.includes(activityId);
        
        if (isAlreadyCompleted) {
          return prev;
        }

        return {
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
      });
    }
  }, [user]);

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

  const startActivity = useCallback(async (activityId: string) => {
    if (!user) return;

    try {
      await activityService.createActivity({
        user_id: user.id,
        activity_type: activityId,
        activity_data: { started: true },
        completed_at: null
      });
    } catch (error) {
      console.error('Error starting activity:', error);
    }
  }, [user]);

  const syncWithDatabase = useCallback(async () => {
    if (!user) return;

    try {
      const activities = await activityService.getUserActivities(user.id);
      const progressData = await progressService.getUserProgress(user.id);

      // Convert database data to local progress format
      const completedActivities = activities
        .filter(activity => activity.completed_at)
        .map(activity => activity.activity_type);

      const activityDetails: Record<string, ActivityProgress> = {};
      
      activities.forEach(activity => {
        if (activity.completed_at) {
          const progress = progressData.find(p => p.activity_id === activity.id);
          activityDetails[activity.activity_type] = {
            activityId: activity.activity_type,
            completed: true,
            score: progress?.progress_data?.score,
            completedAt: new Date(activity.completed_at),
            timeSpent: progress?.progress_data?.timeSpent
          };
        }
      });

      const totalTimeSpent = Object.values(activityDetails).reduce(
        (sum, activity) => sum + (activity.timeSpent || 0), 0
      );

      setProgress({
        completedActivities,
        activityDetails,
        totalTimeSpent,
        achievements: [], // TODO: Calculate from database
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error syncing with database:', error);
    }
  }, [user]);

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