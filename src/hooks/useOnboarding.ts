import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { trackEvent, AnalyticsEvents } from '../lib/analytics';

interface OnboardingState {
  isCompleted: boolean;
  isOpen: boolean;
  currentStep: number;
  userPreferences: {
    role?: 'parent' | 'child';
    ageGroup?: string;
    goals?: string[];
  };
}

interface OnboardingActions {
  openOnboarding: () => void;
  closeOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  updatePreferences: (preferences: Partial<OnboardingState['userPreferences']>) => void;
  resetOnboarding: () => void;
}

export const useOnboarding = (): OnboardingState & OnboardingActions => {
  const [state, setState] = useState<OnboardingState>({
    isCompleted: false,
    isOpen: false,
    currentStep: 0,
    userPreferences: {},
  });

  const { user, profile, updateProfile } = useAuth();

  // Check if onboarding is completed on mount and load preferences
  useEffect(() => {
    const isCompleted = localStorage.getItem('pandagarde_onboarding_completed') === 'true';
    setState(prev => ({ ...prev, isCompleted }));
    
    // Load preferences from Supabase if user is authenticated
    if (user && profile?.profile_data?.preferences) {
      const supabasePreferences = profile.profile_data.preferences;
      const localPreferences = localStorage.getItem('pandagarde_user_preferences');
      const localPrefs = localPreferences ? JSON.parse(localPreferences) : {};
      
      // Merge Supabase preferences with local preferences (Supabase takes precedence)
      const mergedPreferences = { ...localPrefs, ...supabasePreferences };
      localStorage.setItem('pandagarde_user_preferences', JSON.stringify(mergedPreferences));
      
      setState(prev => ({
        ...prev,
        userPreferences: mergedPreferences
      }));
    }
  }, [user, profile]);

  // Load preferences from Supabase when user logs in
  useEffect(() => {
    if (user && profile?.profile_data?.preferences) {
      const supabasePreferences = profile.profile_data.preferences;
      setState(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, ...supabasePreferences }
      }));
      
      // Update localStorage to sync with Supabase
      localStorage.setItem('pandagarde_user_preferences', JSON.stringify(supabasePreferences));
    }
  }, [user, profile]);

  // Auto-open onboarding for new users
  useEffect(() => {
    if (user && !state.isCompleted && !state.isOpen) {
      // Check if user just signed up (within last 5 minutes)
      const signupTime = localStorage.getItem('pandagarde_signup_time');
      if (signupTime) {
        const timeDiff = Date.now() - parseInt(signupTime);
        if (timeDiff < 5 * 60 * 1000) { // 5 minutes
          openOnboarding();
        }
      }
    }
  }, [user, state.isCompleted, state.isOpen, openOnboarding]);

  const openOnboarding = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { onboarding_opened: true });
  }, []);

  const closeOnboarding = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isCompleted: true, 
      isOpen: false 
    }));
    
    localStorage.setItem('pandagarde_onboarding_completed', 'true');
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { onboarding_completed: true });
  }, []);

  const skipOnboarding = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isCompleted: true, 
      isOpen: false 
    }));
    
    localStorage.setItem('pandagarde_onboarding_completed', 'true');
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { onboarding_skipped: true });
  }, []);

  const updatePreferences = useCallback(async (preferences: Partial<OnboardingState['userPreferences']>) => {
    setState(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, ...preferences }
    }));
    
    // Save to localStorage for immediate access
    const savedPreferences = localStorage.getItem('pandagarde_user_preferences');
    const currentPreferences = savedPreferences ? JSON.parse(savedPreferences) : {};
    const updatedPreferences = { ...currentPreferences, ...preferences };
    localStorage.setItem('pandagarde_user_preferences', JSON.stringify(updatedPreferences));
    
    // If user is authenticated, also save to Supabase profile
    if (user && profile) {
      try {
        await updateProfile({
          preferences: {
            ...profile.profile_data?.preferences,
            ...preferences
          }
        });
      } catch (error) {
        console.error('Failed to save preferences to Supabase:', error);
        // Continue with localStorage fallback
      }
    }
    
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { 
      preferences_updated: Object.keys(preferences) 
    });
  }, [user, profile, updateProfile]);

  const resetOnboarding = useCallback(() => {
    setState({
      isCompleted: false,
      isOpen: false,
      currentStep: 0,
      userPreferences: {},
    });
    
    localStorage.removeItem('pandagarde_onboarding_completed');
    localStorage.removeItem('pandagarde_user_preferences');
    localStorage.removeItem('pandagarde_signup_time');
    
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, { onboarding_reset: true });
  }, []);

  return {
    ...state,
    openOnboarding,
    closeOnboarding,
    completeOnboarding,
    skipOnboarding,
    updatePreferences,
    resetOnboarding,
  };
};

// Hook for onboarding progress tracking
export const useOnboardingProgress = () => {
  const trackProgress = useCallback((step: string, action: string, data?: any) => {
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, {
      onboarding_step: step,
      onboarding_action: action,
      ...data,
    });
  }, []);

  const trackCompletion = useCallback((completedSteps: string[], skippedSteps: string[]) => {
    trackEvent(AnalyticsEvents.USER_PROFILE_UPDATE, {
      onboarding_completed_steps: completedSteps,
      onboarding_skipped_steps: skippedSteps,
      onboarding_completion_rate: completedSteps.length / (completedSteps.length + skippedSteps.length),
    });
  }, []);

  return { trackProgress, trackCompletion };
};

// Hook for personalized recommendations based on onboarding
export const usePersonalizedContent = () => {
  const getRecommendations = useCallback(() => {
    const preferences = localStorage.getItem('pandagarde_user_preferences');
    if (!preferences) return [];

    const { role, ageGroup, goals } = JSON.parse(preferences);
    const recommendations = [];

    // Role-based recommendations
    if (role === 'parent') {
      recommendations.push(
        { type: 'page', id: 'family-hub', priority: 'high' },
        { type: 'guide', id: 'device-setup', priority: 'high' },
        { type: 'resource', id: 'family-agreement', priority: 'medium' }
      );
    } else if (role === 'child') {
      recommendations.push(
        { type: 'page', id: 'activity-book', priority: 'high' },
        { type: 'page', id: 'story', priority: 'high' },
        { type: 'activity', id: 'coloring-activity', priority: 'medium' }
      );
    }

    // Age group-based recommendations
    if (ageGroup === 'Ages 5-8') {
      recommendations.push(
        { type: 'page', id: 'privacy-explorers', priority: 'high' },
        { type: 'activity', id: 'coloring-activity', priority: 'high' },
        { type: 'resource', id: 'coloring-sheets', priority: 'medium' }
      );
    } else if (ageGroup === 'Ages 9-12') {
      recommendations.push(
        { type: 'page', id: 'privacy-handbook', priority: 'high' },
        { type: 'page', id: 'digital-citizenship', priority: 'high' },
        { type: 'activity', id: 'matching-activity', priority: 'medium' }
      );
    } else if (ageGroup === 'Ages 13-17') {
      recommendations.push(
        { type: 'page', id: 'teen-handbook', priority: 'high' },
        { type: 'page', id: 'privacy-tools', priority: 'high' },
        { type: 'page', id: 'digital-rights', priority: 'medium' }
      );
    }

    // Goal-based recommendations
    if (goals) {
      goals.forEach((goal: string) => {
        switch (goal) {
          case 'privacy-basics':
            recommendations.push({ type: 'page', id: 'privacy-explorers', priority: 'medium' });
            break;
          case 'online-safety':
            recommendations.push({ type: 'guide', id: 'app-selection', priority: 'medium' });
            break;
          case 'digital-citizenship':
            recommendations.push({ type: 'page', id: 'digital-citizenship', priority: 'medium' });
            break;
          case 'family-agreements':
            recommendations.push({ type: 'resource', id: 'family-agreement', priority: 'medium' });
            break;
          case 'privacy-tools':
            recommendations.push({ type: 'page', id: 'privacy-tools', priority: 'medium' });
            break;
          case 'data-protection':
            recommendations.push({ type: 'guide', id: 'privacy-concerns', priority: 'medium' });
            break;
        }
      });
    }

    // Remove duplicates and sort by priority
    const uniqueRecommendations = recommendations.filter((rec, index, self) => 
      index === self.findIndex(r => r.type === rec.type && r.id === rec.id)
    );

    return uniqueRecommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  }, []);

  const getWelcomeMessage = useCallback(() => {
    const preferences = localStorage.getItem('pandagarde_user_preferences');
    if (!preferences) return 'Welcome to Privacy Panda!';

    const { role, ageGroup } = JSON.parse(preferences);
    
    if (role === 'parent') {
      return `Welcome! We've prepared content to help you teach your children about privacy and digital safety.`;
    } else if (role === 'child') {
      return `Hi there! Ready to learn about privacy and staying safe online? Let's start with some fun activities!`;
    }
    
    return 'Welcome to Privacy Panda!';
  }, []);

  return { getRecommendations, getWelcomeMessage };
};