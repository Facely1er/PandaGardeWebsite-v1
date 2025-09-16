import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, userService } from '../../lib/database';
import { setUserContext, clearUserContext, reportError } from '../../lib/sentry';
import { trackEvent, AnalyticsEvents, setUserId } from '../../lib/analytics';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  profile_data?: {
    firstName?: string;
    lastName?: string;
    role?: 'parent' | 'child';
    familyId?: string;
    avatar?: string;
    preferences?: {
      theme?: 'light' | 'dark' | 'auto';
      notifications?: boolean;
      language?: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, profileData?: Partial<UserProfile['profile_data']>) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<UserProfile['profile_data']>) => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  isAuthenticated: boolean;
  isParent: boolean;
  isChild: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from database
  const loadUserProfile = useCallback(async (_userId: string) => {
    try {
      const userProfile = await userService.getCurrentUser();
      if (userProfile) {
        setProfile(userProfile as UserProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Check if supabase is configured before trying to access auth
        if (!supabase) {
          console.log('Supabase not configured, running in demo mode');
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            await loadUserProfile(currentSession.user.id);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes only if supabase is configured
    let subscription: { unsubscribe: () => void } | null = null;
    if (supabase) {
      const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (currentSession?.user) {
              await loadUserProfile(currentSession.user.id);
            } else {
              setProfile(null);
            }
          }
        }
      );
      subscription = authSubscription;
    }

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [loadUserProfile]);

  const signUp = useCallback(async (
    email: string, 
    password: string, 
    profileData?: Partial<UserProfile['profile_data']>
  ) => {
    try {
      if (!supabase) {
        return { error: { message: 'Authentication not available in demo mode' } as AuthError };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      // Create user profile
      if (data?.user) {
        const userProfile = await userService.upsertUser({
          id: data.user.id,
          email: data.user.email!,
          profile_data: profileData || {}
        });

        if (userProfile) {
          setProfile(userProfile as UserProfile);
          // Set user context in Sentry
          setUserContext({
            id: data.user.id,
            email: data.user.email!,
            name: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : undefined
          });
          // Track signup event
          trackEvent(AnalyticsEvents.USER_SIGNUP, {
            user_id: data.user.id,
            user_role: profileData?.role,
            signup_method: 'email'
          });
          setUserId(data.user.id);
          
          // Set signup time for onboarding
          localStorage.setItem('pandagarde_signup_time', Date.now().toString());
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      reportError(error as Error, { action: 'signUp', email });
      return { error: error as AuthError };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      if (!supabase) {
        return { error: { message: 'Authentication not available in demo mode' } as AuthError };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      // Load user profile
      if (data?.user) {
        await loadUserProfile(data.user.id);
        // Set user context in Sentry
        setUserContext({
          id: data.user.id,
          email: data.user.email!,
        });
        // Track login event
        trackEvent(AnalyticsEvents.USER_LOGIN, {
          user_id: data.user.id,
          login_method: 'email'
        });
        setUserId(data.user.id);
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      reportError(error as Error, { action: 'signIn', email });
      return { error: error as AuthError };
    }
  }, [loadUserProfile]);

  const signOut = useCallback(async () => {
    try {
      if (!supabase) {
        // In demo mode, just clear local state
        setUser(null);
        setProfile(null);
        setSession(null);
        return { error: null };
      }

      const { error } = await supabase.auth.signOut();
      
      if (!error) {
        setUser(null);
        setProfile(null);
        setSession(null);
        // Clear user context in Sentry
        clearUserContext();
        // Track logout event
        trackEvent(AnalyticsEvents.USER_LOGOUT);
      }

      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error as AuthError };
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile['profile_data']>) => {
    if (!user) {
      return { error: { message: 'No user logged in' } as AuthError };
    }

    try {
      const updatedProfile = await userService.updateUser(user.id, {
        profile_data: {
          ...profile?.profile_data,
          ...updates
        }
      });

      if (updatedProfile) {
        setProfile(updatedProfile as UserProfile);
        return { error: null };
      } else {
        return { error: { message: 'Failed to update profile' } as AuthError };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: error as AuthError };
    }
  }, [user, profile]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      if (!supabase) {
        return { error: { message: 'Password reset not available in demo mode' } as AuthError };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: error as AuthError };
    }
  }, []);

  const isAuthenticated = !!user && !!session;
  const isParent = profile?.profile_data?.role === 'parent';
  const isChild = profile?.profile_data?.role === 'child';

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    isAuthenticated,
    isParent,
    isChild
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};