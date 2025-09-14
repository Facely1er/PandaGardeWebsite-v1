import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { userService } from '../lib/database';
import { useToast } from '../hooks/useToast';

interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  profile_data?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
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
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const userData = await userService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData = await userService.getCurrentUser();
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        showError('Sign In Failed', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Ensure user profile exists
        await userService.upsertUser({
          id: data.user.id,
          email: data.user.email!,
          profile_data: {}
        });

        showSuccess('Welcome Back!', 'You have successfully signed in.');
        return { success: true };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      showError('Sign In Failed', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        showError('Sign Up Failed', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Create user profile
        await userService.upsertUser({
          id: data.user.id,
          email: data.user.email!,
          profile_data: {}
        });

        showSuccess('Account Created!', 'Please check your email to verify your account.');
        return { success: true };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (error) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      showError('Sign Up Failed', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        showError('Sign Out Failed', error.message);
        return;
      }

      setUser(null);
      showSuccess('Signed Out', 'You have been successfully signed out.');
    } catch (error) {
      console.error('Sign out error:', error);
      showError('Sign Out Failed', 'An error occurred while signing out.');
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) return false;

    try {
      const updatedUser = await userService.updateUser(user.id, updates);
      if (updatedUser) {
        setUser(updatedUser);
        showSuccess('Profile Updated', 'Your profile has been updated successfully.');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      showError('Update Failed', 'Failed to update profile. Please try again.');
      return false;
    }
  }, [user, showSuccess, showError]);

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};