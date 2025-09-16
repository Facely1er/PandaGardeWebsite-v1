import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { useAuth } from './AuthContext';
import { progressService, activityService } from '../lib/database';

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
  // const { isAuthenticated, user } = useAuth();
  const isAuthenticated = false;
  const user = null; // Progress works without authentication
  const [progress, setProgress] = useState<UserProgress>({
    completedActivities: [],
    activityDetails: {},
    totalTimeSpent: 0,
    achievements: [],
    lastUpdated: new Date()
  });
  const [loading, setLoading] = useState(false);

  // Load progress from database or localStorage
  useEffect(() => {
    const loadProgress = async () => {
      if (isAuthenticated && user) {
        setLoading(true);
        try {
          // Load from database
          const dbProgress = await progressService.getUserProgress(user.id);
          const dbActivities = await activityService.getUserActivities(user.id);
          
          // Convert database progress to local format
          const completedActivities = dbActivities
            .filter(activity => activity.completed_at)
            .map(activity => activity.id);
          
          const activityDetails = Object.fromEntries(
            dbProgress.map(progress => [
              progress.activity_id,
              {
                activityId: progress.activity_id,
                completed: true,
                score: progress.progress_data?.score,
                completedAt: new Date(progress.created_at),
                timeSpent: progress.progress_data?.timeSpent
              }
            ])
          );

          const totalTimeSpent = Object.values(activityDetails)
            .reduce((total, activity) => total + (activity.timeSpent || 0), 0);

          const achievements = dbProgress
            .filter(p => p.progress_data?.achievements)
            .flatMap(p => p.progress_data.achievements || []);

          setProgress({
            completedActivities,
            activityDetails,
            totalTimeSpent,
            achievements: [...new Set(achievements)],
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error('Error loading progress from database:', error);
          // Fallback to localStorage
          loadFromLocalStorage();
        } finally {
          setLoading(false);
        }
      } else {
        // Load from localStorage for non-authenticated users
        loadFromLocalStorage();
      }
    };

    const loadFromLocalStorage = () => {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
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
  }, [isAuthenticated, user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markActivityCompleted = useCallback(async (activityId: string, score?: number, timeSpent?: number) => {
    if (!user) {
      // For non-authenticated users, just update local state
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
        
        if (newProgress.completedActivities.length === 8) {
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

    // For authenticated users, save to database
    try {
      // Create activity record
      await activityService.createActivity({
        user_id: user.id,
        activity_type: 'interactive',
        activity_data: { activityId, score, timeSpent },
        completed_at: new Date().toISOString()
      });

      // Save progress
      await progressService.saveProgress({
        user_id: user.id,
        activity_id: activityId,
        progress_data: { score, timeSpent, completedAt: new Date().toISOString() }
      });

      // Update local state
      setProgress(prev => {
        const isAlreadyCompleted = prev.completedActivities.includes(activityId);
        
        if (isAlreadyCompleted) {
          return prev;
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
        
        if (newProgress.completedActivities.length === 8) {
          achievements.push('privacy_champion');
        }

        if (newProgress.totalTimeSpent >= 60) {
          achievements.push('dedicated_learner');
        }

        newProgress.achievements = [...new Set(achievements)];

        return newProgress;
      });
    } catch (error) {
      console.error('Error saving progress to database:', error);
      // Still update local state even if database save fails
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
    // Updated to include 8 activities total
    const totalCount = 8;
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