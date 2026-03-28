import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseAvailable } from '../../lib/supabase';
import { reportError } from '../../lib/sentry';
import { trackEvent, AnalyticsEvents, setUserId } from '../../lib/analytics';

// Local type definitions (replaces @supabase/supabase-js types)
interface User {
  id: string;
  email?: string;
  [key: string]: unknown;
}

interface Session {
  user: User;
  access_token: string;
  [key: string]: unknown;
}

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
  signUp: (email: string, password: string, profileData?: Partial<UserProfile['profile_data']>) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<{ error: any | null }>;
  updateProfile: (updates: Partial<UserProfile['profile_data']>) => Promise<{ error: any | null }>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  isAuthenticated: boolean;
  isParent: boolean;
  isChild: boolean;
  redirectToFamilyHub: () => void;
  /** True when no Supabase backend — Family Hub runs as a local demo */
  isFamilyHubDemo: boolean;
  /** Restore demo session after sign-out (no-backend mode only) */
  enterDemoSession: () => void;
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

const DEMO_USER_ID = 'local-demo-family-hub';

const buildDemoUser = (): User => ({
  id: DEMO_USER_ID,
  email: 'demo@pandagarde.local',
});

const buildDemoProfile = (): UserProfile => {
  const now = new Date().toISOString();
  return {
    id: DEMO_USER_ID,
    email: 'demo@pandagarde.local',
    created_at: now,
    updated_at: now,
    profile_data: {
      firstName: 'Demo',
      lastName: 'Family',
      role: 'parent',
    },
  };
};

const buildDemoSession = (): Session => ({
  user: buildDemoUser(),
  access_token: 'local-demo',
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const redirectToFamilyHub = useCallback(() => {
    navigate('/family-hub');
  }, [navigate]);

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) return;
    const { data, error } = await (supabase as any)
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (!error && data) {
      setProfile(data as UserProfile);
    }
  }, []);

  const applyDemoSession = useCallback(() => {
    setUser(buildDemoUser());
    setProfile(buildDemoProfile());
    setSession(buildDemoSession());
    setUserId(DEMO_USER_ID);
  }, []);

  useEffect(() => {
    if (!isSupabaseAvailable()) {
      applyDemoSession();
      setLoading(false);
      return;
    }

    (supabase as any).auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        setUserId(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = (supabase as any).auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        setUserId(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, applyDemoSession]);

  const signUp = useCallback(async (
    email: string,
    password: string,
    profileData?: Partial<UserProfile['profile_data']>
  ) => {
    if (!isSupabaseAvailable()) {
      return {
        error: {
          message:
            'Account creation needs the hosted app with sign-in enabled. Use “Continue with demo” to explore Family Hub locally.',
        },
      };
    }

    try {
      const { data, error } = await (supabase as any).auth.signUp({
        email,
        password,
        options: { data: profileData },
      });

      if (error) return { error };

      if (data.user) {
        await (supabase as any).from('profiles').upsert({
          id: data.user.id,
          email,
          profile_data: profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        trackEvent(AnalyticsEvents.USER_SIGNUP, {
          user_role: profileData?.role,
          signup_method: 'email',
        });
      }

      return { error: null };
    } catch (error) {
      reportError(error as Error, { action: 'signUp' });
      return { error: error as any };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseAvailable()) {
      return {
        error: {
          message:
            'Email sign-in needs the hosted app. Use “Continue with demo” to explore Family Hub without an account.',
        },
      };
    }

    try {
      const { error } = await (supabase as any).auth.signInWithPassword({ email, password });

      if (!error) {
        trackEvent(AnalyticsEvents.USER_LOGIN, { login_method: 'email' });
      }

      return { error: error ?? null };
    } catch (error) {
      reportError(error as Error, { action: 'signIn' });
      return { error: error as any };
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseAvailable()) {
      setUser(null);
      setProfile(null);
      setSession(null);
      trackEvent(AnalyticsEvents.USER_LOGOUT, {});
      return { error: null };
    }

    try {
      const { error } = await (supabase as any).auth.signOut();
      if (!error) {
        setUser(null);
        setProfile(null);
        setSession(null);
        trackEvent(AnalyticsEvents.USER_LOGOUT, {});
      }
      return { error: error ?? null };
    } catch (error) {
      return { error: error as any };
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile['profile_data']>) => {
    if (!user) return { error: { message: 'Not authenticated' } };

    if (!isSupabaseAvailable()) {
      const newProfileData = { ...profile?.profile_data, ...updates };
      setProfile(prev =>
        prev
          ? { ...prev, profile_data: newProfileData, updated_at: new Date().toISOString() }
          : { ...buildDemoProfile(), profile_data: newProfileData }
      );
      return { error: null };
    }

    try {
      const newProfileData = { ...profile?.profile_data, ...updates };
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ profile_data: newProfileData, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (!error) {
        setProfile(prev => prev ? { ...prev, profile_data: newProfileData } : null);
      }

      return { error: error ?? null };
    } catch (error) {
      return { error: error as any };
    }
  }, [user, profile]);

  const resetPassword = useCallback(async (email: string) => {
    if (!isSupabaseAvailable()) {
      return { error: { message: 'Password reset needs the hosted app with email enabled.' } };
    }

    try {
      const { error } = await (supabase as any).auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/family-hub/reset-password`,
      });
      return { error: error ?? null };
    } catch (error) {
      return { error: error as any };
    }
  }, []);

  const isAuthenticated = user !== null;
  const isParent = profile?.profile_data?.role === 'parent';
  const isChild = profile?.profile_data?.role === 'child';
  const isFamilyHubDemo = !isSupabaseAvailable();

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
    isChild,
    redirectToFamilyHub,
    isFamilyHubDemo,
    enterDemoSession: isFamilyHubDemo ? applyDemoSession : () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
