import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// Frontend-only mode - no authentication or database dependencies

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
  // Frontend-only mode - no authentication
  const user = null;
  const profile = null;
  const isAuthenticated = false;
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFamilyMembers = useCallback(async (familyId: string) => {
    console.log('Frontend-only mode: loadFamilyMembers() - operation skipped', familyId);
    // In frontend-only mode, return empty array
    setFamilyMembers([]);
  }, []);

  const loadFamilyData = useCallback(async (familyId: string) => {
    console.log('Frontend-only mode: loadFamilyData() - operation skipped', familyId);
    setLoading(false);
    // In frontend-only mode, no family data is loaded
  }, []);

  const checkExistingFamily = useCallback(async () => {
    console.log('Frontend-only mode: checkExistingFamily() - operation skipped');
    // In frontend-only mode, no family checking is done
  }, []);

  // Load family data when user changes - Frontend-only mode
  useEffect(() => {
    console.log('Frontend-only mode: No family data loading needed');
    // In frontend-only mode, no family data is loaded
  }, []);

  const createFamily = async (name: string) => {
    console.log('Frontend-only mode: createFamily() - operation skipped', name);
    return { family: null, error: 'Family management is handled by the external Family Hub project' };
  };

  const joinFamily = async (familyId: string) => {
    console.log('Frontend-only mode: joinFamily() - operation skipped', familyId);
    return { success: false, error: 'Family management is handled by the external Family Hub project' };
  };

  const leaveFamily = async () => {
    console.log('Frontend-only mode: leaveFamily() - operation skipped');
    return { success: false, error: 'Family management is handled by the external Family Hub project' };
  };

  const addFamilyMember = async (email: string, role: 'parent' | 'child', firstName: string, lastName: string) => {
    console.log('Frontend-only mode: addFamilyMember() - operation skipped', { email, role, firstName, lastName });
    return { success: false, error: 'Family management is handled by the external Family Hub project' };
  };

  const removeFamilyMember = async (memberId: string) => {
    console.log('Frontend-only mode: removeFamilyMember() - operation skipped', memberId);
    return { success: false, error: 'Family management is handled by the external Family Hub project' };
  };

  const updateFamilyMember = async (memberId: string, updates: Partial<FamilyMember>) => {
    console.log('Frontend-only mode: updateFamilyMember() - operation skipped', { memberId, updates });
    return { success: false, error: 'Family management is handled by the external Family Hub project' };
  };

  const getFamilyProgress = async () => {
    console.log('Frontend-only mode: getFamilyProgress() - operation skipped');
    return null;
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