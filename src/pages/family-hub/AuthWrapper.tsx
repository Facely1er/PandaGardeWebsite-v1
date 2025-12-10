import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// Frontend-only mode - no authentication dependencies
import { useNavigate } from 'react-router-dom';
import { reportError } from '../../lib/sentry';
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
  user: any | null;
  profile: UserProfile | null;
  session: any | null;
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
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(false); // No loading needed in frontend-only mode

  // Redirect to internal family hub route
  const navigate = useNavigate();
  const redirectToFamilyHub = useCallback(() => {
    // Use internal route since Family Hub is integrated
    navigate('/family-hub');
  }, [navigate]);

  // Initialize auth state - frontend-only mode
  useEffect(() => {
    console.log('Frontend-only mode: AuthProvider initialized - no authentication');
    // In frontend-only mode, we don't need to initialize any auth state
    setLoading(false);
  }, []);

  const signUp = useCallback(async (
    email: string, 
    password: string, 
    profileData?: Partial<UserProfile['profile_data']>
  ) => {
    try {
      console.log('Frontend-only mode: Sign up attempt - redirecting to family hub', { email, profileData });
      
      // Track signup attempt
      trackEvent(AnalyticsEvents.USER_SIGNUP, {
        user_email: email,
        user_role: profileData?.role,
        signup_method: 'email',
        redirect_to_family_hub: true
      });
      
      // Redirect to external family hub for authentication
      redirectToFamilyHub();
      
      return { error: { message: 'Redirecting to family hub for authentication' } };
    } catch (error) {
      console.error('Sign up error:', error);
      reportError(error as Error, { action: 'signUp', email });
      return { error: error as any };
    }
  }, [redirectToFamilyHub]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.log('Frontend-only mode: Sign in attempt - redirecting to family hub', { email });
      
      // Track login attempt
      trackEvent(AnalyticsEvents.USER_LOGIN, {
        user_email: email,
        login_method: 'email',
        redirect_to_family_hub: true
      });
      
      // Redirect to external family hub for authentication
      redirectToFamilyHub();
      
      return { error: { message: 'Redirecting to family hub for authentication' } };
    } catch (error) {
      console.error('Sign in error:', error);
      reportError(error as Error, { action: 'signIn', email });
      return { error: error as any };
    }
  }, [redirectToFamilyHub]);

  const signOut = useCallback(async () => {
    try {
      console.log('Frontend-only mode: Sign out - clearing local state');
      
      // Clear local state
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Track logout event
      trackEvent(AnalyticsEvents.USER_LOGOUT, {
        frontend_only_mode: true
      });
      
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error as any };
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile['profile_data']>) => {
    console.log('Frontend-only mode: Update profile attempt - redirecting to family hub', updates);
    
    // Redirect to external family hub for profile management
    redirectToFamilyHub();
    
    return { error: { message: 'Redirecting to family hub for profile management' } };
  }, [redirectToFamilyHub]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      console.log('Frontend-only mode: Reset password attempt - redirecting to family hub', { email });
      
      // Redirect to external family hub for password reset
      redirectToFamilyHub();
      
      return { error: { message: 'Redirecting to family hub for password reset' } };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: error as any };
    }
  }, [redirectToFamilyHub]);

  const isAuthenticated = false; // Always false in frontend-only mode
  const isParent = false; // Always false in frontend-only mode
  const isChild = false; // Always false in frontend-only mode

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
    redirectToFamilyHub
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};