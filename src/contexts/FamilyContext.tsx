import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from '../pages/family-hub/AuthWrapper';
import { supabase, TABLES } from '../lib/supabase';

interface FamilyMember {
  id: string;
  user_id: string;
  family_id: string;
  role: 'parent' | 'child';
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  profile_data?: {
    age?: number;
    grade?: string;
    preferences?: Record<string, unknown>;
  };
}

interface Family {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  members: FamilyMember[];
}

interface FamilyContextType {
  currentFamily: Family | null;
  familyMembers: FamilyMember[];
  loading: boolean;
  createFamily: (name: string) => Promise<{ family: Family | null; error: string | null }>;
  joinFamily: (familyId: string) => Promise<{ success: boolean; error: string | null }>;
  leaveFamily: () => Promise<{ success: boolean; error: string | null }>;
  addFamilyMember: (email: string, role: 'parent' | 'child', firstName: string, lastName: string) => Promise<{ success: boolean; error: string | null }>;
  removeFamilyMember: (memberId: string) => Promise<{ success: boolean; error: string | null }>;
  updateFamilyMember: (memberId: string, updates: Partial<FamilyMember>) => Promise<{ success: boolean; error: string | null }>;
  getFamilyProgress: () => Promise<{ totalActivities: number; completedActivities: number; progressPercentage: number }>;
  isParent: boolean;
  isChild: boolean;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
};

interface FamilyProviderProps {
  children: React.ReactNode;
}

export const FamilyProvider: React.FC<FamilyProviderProps> = ({ children }) => {
  // const { user, profile, isAuthenticated } = useAuth();
  const user = null;
  const profile = null;
  const isAuthenticated = false; // Main site works without authentication
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(false);

  // Load family data when user changes
  useEffect(() => {
    if (isAuthenticated && user && profile?.profile_data?.familyId) {
      loadFamilyData(profile.profile_data.familyId);
    } else if (isAuthenticated && user) {
      // Check if user is already part of a family
      checkExistingFamily();
    }
  }, [isAuthenticated, user, profile]);

  const checkExistingFamily = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .select(`
          *,
          families (
            id,
            name,
            created_by,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking existing family:', error);
        return;
      }

      if (data) {
        const family = data.families;
        setCurrentFamily(family);
        await loadFamilyMembers(family.id);
      }
    } catch (error) {
      console.error('Error checking existing family:', error);
    }
  };

  const loadFamilyData = async (familyId: string) => {
    setLoading(true);
    try {
      // Load family info
      const { data: familyData, error: familyError } = await supabase
        .from(TABLES.FAMILIES)
        .select('*')
        .eq('id', familyId)
        .single();

      if (familyError) {
        console.error('Error loading family:', familyError);
        return;
      }

      setCurrentFamily(familyData);
      await loadFamilyMembers(familyId);
    } catch (error) {
      console.error('Error loading family data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFamilyMembers = async (familyId: string) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .select('*')
        .eq('family_id', familyId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading family members:', error);
        return;
      }

      setFamilyMembers(data || []);
    } catch (error) {
      console.error('Error loading family members:', error);
    }
  };

  const createFamily = async (name: string) => {
    if (!user) {
      return { family: null, error: 'User not authenticated' };
    }

    setLoading(true);
    try {
      // Create family
      const { data: familyData, error: familyError } = await supabase
        .from(TABLES.FAMILIES)
        .insert({
          name,
          created_by: user.id
        })
        .select()
        .single();

      if (familyError) {
        return { family: null, error: familyError.message };
      }

      // Add creator as parent member
      const { error: memberError } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .insert({
          user_id: user.id,
          family_id: familyData.id,
          role: 'parent',
          first_name: profile?.profile_data?.firstName || user.email?.split('@')[0] || 'User',
          last_name: profile?.profile_data?.lastName || '',
          email: user.email!
        });

      if (memberError) {
        return { family: null, error: memberError.message };
      }

      // Update user profile with family ID
      await supabase
        .from(TABLES.USERS)
        .update({
          profile_data: {
            ...profile?.profile_data,
            familyId: familyData.id
          }
        })
        .eq('id', user.id);

      setCurrentFamily(familyData);
      await loadFamilyMembers(familyData.id);

      return { family: familyData, error: null };
    } catch (error) {
      console.error('Error creating family:', error);
      return { family: null, error: 'Failed to create family' };
    } finally {
      setLoading(false);
    }
  };

  const joinFamily = async (familyId: string) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    try {
      // Check if family exists
      const { data: familyData, error: familyError } = await supabase
        .from(TABLES.FAMILIES)
        .select('*')
        .eq('id', familyId)
        .single();

      if (familyError || !familyData) {
        return { success: false, error: 'Family not found' };
      }

      // Add user as family member
      const { error: memberError } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .insert({
          user_id: user.id,
          family_id: familyId,
          role: 'child', // Default to child, can be changed by parent
          first_name: profile?.profile_data?.firstName || user.email?.split('@')[0] || 'User',
          last_name: profile?.profile_data?.lastName || '',
          email: user.email!
        });

      if (memberError) {
        return { success: false, error: memberError.message };
      }

      // Update user profile with family ID
      await supabase
        .from(TABLES.USERS)
        .update({
          profile_data: {
            ...profile?.profile_data,
            familyId: familyId
          }
        })
        .eq('id', user.id);

      setCurrentFamily(familyData);
      await loadFamilyMembers(familyId);

      return { success: true, error: null };
    } catch (error) {
      console.error('Error joining family:', error);
      return { success: false, error: 'Failed to join family' };
    } finally {
      setLoading(false);
    }
  };

  const leaveFamily = async () => {
    if (!user || !currentFamily) {
      return { success: false, error: 'No family to leave' };
    }

    setLoading(true);
    try {
      // Remove user from family members
      const { error: memberError } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .delete()
        .eq('user_id', user.id)
        .eq('family_id', currentFamily.id);

      if (memberError) {
        return { success: false, error: memberError.message };
      }

      // Update user profile to remove family ID
      await supabase
        .from(TABLES.USERS)
        .update({
          profile_data: {
            ...profile?.profile_data,
            familyId: null
          }
        })
        .eq('id', user.id);

      setCurrentFamily(null);
      setFamilyMembers([]);

      return { success: true, error: null };
    } catch (error) {
      console.error('Error leaving family:', error);
      return { success: false, error: 'Failed to leave family' };
    } finally {
      setLoading(false);
    }
  };

  const addFamilyMember = async (email: string, role: 'parent' | 'child', firstName: string, lastName: string) => {
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      // Check if user exists
      const { data: userData, error: userError } = await supabase
        .from(TABLES.USERS)
        .select('id')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        return { success: false, error: 'User not found. They need to create an account first.' };
      }

      // Add as family member
      const { error: memberError } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .insert({
          user_id: userData.id,
          family_id: currentFamily.id,
          role,
          first_name: firstName,
          last_name: lastName,
          email
        });

      if (memberError) {
        return { success: false, error: memberError.message };
      }

      await loadFamilyMembers(currentFamily.id);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error adding family member:', error);
      return { success: false, error: 'Failed to add family member' };
    } finally {
      setLoading(false);
    }
  };

  const removeFamilyMember = async (memberId: string) => {
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .delete()
        .eq('id', memberId)
        .eq('family_id', currentFamily.id);

      if (error) {
        return { success: false, error: error.message };
      }

      await loadFamilyMembers(currentFamily.id);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error removing family member:', error);
      return { success: false, error: 'Failed to remove family member' };
    } finally {
      setLoading(false);
    }
  };

  const updateFamilyMember = async (memberId: string, updates: Partial<FamilyMember>) => {
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from(TABLES.FAMILY_MEMBERS)
        .update(updates)
        .eq('id', memberId)
        .eq('family_id', currentFamily.id);

      if (error) {
        return { success: false, error: error.message };
      }

      await loadFamilyMembers(currentFamily.id);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error updating family member:', error);
      return { success: false, error: 'Failed to update family member' };
    } finally {
      setLoading(false);
    }
  };

  const getFamilyProgress = async () => {
    if (!currentFamily) {
      return null;
    }

    try {
      // Get progress for all family members
      const { data, error } = await supabase
        .from(TABLES.PROGRESS)
        .select(`
          *,
          users (
            id,
            email,
            profile_data
          )
        `)
        .in('user_id', familyMembers.map(member => member.user_id));

      if (error) {
        console.error('Error loading family progress:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error loading family progress:', error);
      return null;
    }
  };

  const isParent = familyMembers.find(member => member.user_id === user?.id)?.role === 'parent';
  const isChild = familyMembers.find(member => member.user_id === user?.id)?.role === 'child';

  const value: FamilyContextType = {
    currentFamily,
    familyMembers,
    loading,
    createFamily,
    joinFamily,
    leaveFamily,
    addFamilyMember,
    removeFamilyMember,
    updateFamilyMember,
    getFamilyProgress,
    isParent,
    isChild
  };

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  );
};