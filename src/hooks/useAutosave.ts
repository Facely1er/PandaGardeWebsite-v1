import { useEffect, useRef, useCallback } from 'react';
import { useProgress } from './useProgress';
import { progressService } from '../lib/database';

interface AutosaveOptions {
  interval?: number; // milliseconds between autosaves
  enabled?: boolean;
  onSave?: (success: boolean) => void;
}

export const useAutosave = (options: AutosaveOptions = {}) => {
  const { progress, user } = useProgress();
  const { interval = 30000, enabled = true, onSave } = options; // Default 30 seconds
  const lastSavedRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);

  const saveProgress = useCallback(async () => {
    if (!enabled || isSavingRef.current || !user) {
      return;
    }

    // Check if progress has actually changed
    const currentProgressString = JSON.stringify(progress);
    if (currentProgressString === lastSavedRef.current) {
      return;
    }

    isSavingRef.current = true;
    
    try {
      await progressService.saveProgress({
        user_id: user.id,
        completed_activities: progress.completedActivities,
        activity_details: progress.activityDetails,
        total_score: progress.totalScore,
        achievements: progress.achievements,
        preferences: progress.preferences,
        last_activity: new Date().toISOString()
      });
      
      lastSavedRef.current = currentProgressString;
      onSave?.(true);
    } catch (error) {
      console.warn('Autosave failed, will retry:', error);
      onSave?.(false);
    } finally {
      isSavingRef.current = false;
    }
  }, [progress, user, enabled, onSave]);

  // Set up periodic autosave
  useEffect(() => {
    if (!enabled || !user) {
      return;
    }

    const scheduleNextSave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        saveProgress().finally(() => {
          scheduleNextSave(); // Schedule the next save
        });
      }, interval);
    };

    scheduleNextSave();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [saveProgress, interval, enabled, user]);

  // Save immediately when progress changes (for authenticated users)
  useEffect(() => {
    if (!enabled || !user) {
      return;
    }

    // Debounce immediate saves to avoid too frequent database calls
    const timeoutId = setTimeout(() => {
      saveProgress();
    }, 2000); // 2 second debounce

    return () => clearTimeout(timeoutId);
  }, [progress, saveProgress, enabled, user]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user && !isSavingRef.current) {
        // Use sendBeacon for reliable saving on page unload
        const progressData = JSON.stringify({
          user_id: user.id,
          completed_activities: progress.completedActivities,
          activity_details: progress.activityDetails,
          total_score: progress.totalScore,
          achievements: progress.achievements,
          preferences: progress.preferences,
          last_activity: new Date().toISOString()
        });

        // Try to save via sendBeacon if available
        if (navigator.sendBeacon) {
          try {
            navigator.sendBeacon('/api/save-progress', progressData);
          } catch (error) {
            console.warn('SendBeacon failed, using localStorage fallback');
          }
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [progress, user]);

  return {
    saveProgress,
    isSaving: isSavingRef.current
  };
};

export default useAutosave;