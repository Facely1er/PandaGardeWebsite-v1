import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// Frontend-only mode - no authentication or database dependencies
import { localStorageManager, UserProgress } from '../utils/localStorageManager';
import { getServiceById, getRiskScore } from '../data/childServiceCatalog';

export interface ServiceUsage {
  serviceId: string;
  firstUsed: string;
  lastUsed: string;
  status: 'approved' | 'pending' | 'denied' | 'requested';
  requestedBy?: string; // user_id who requested
  approvedBy?: string; // user_id who approved
  approvedAt?: string;
  notes?: string; // Parent notes about the service
}

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
  // Local storage specific fields
  progress?: UserProgress;
  privacyScore?: number;
  // Service tracking (inspired by SocialCaution)
  services?: ServiceUsage[]; // Services this member uses
  serviceRiskScore?: number; // Aggregate risk score from services
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
  getFamilyProgress: () => Promise<{ totalActivities: number; completedActivities: number; progressPercentage: number } | null>;
  isParent: boolean;
  isChild: boolean;
  // New methods for localStorage and privacy
  calculateFamilyPrivacyScore: () => number;
  exportFamilyData: () => Promise<string>;
  importFamilyData: (jsonData: string) => Promise<boolean>;
  getFamilyStorageUsage: () => number;
  clearFamilyData: () => void;
  // Service management methods (inspired by SocialCaution)
  requestService: (memberId: string, serviceId: string) => Promise<{ success: boolean; error: string | null }>;
  approveService: (memberId: string, serviceId: string, notes?: string) => Promise<{ success: boolean; error: string | null }>;
  denyService: (memberId: string, serviceId: string, reason?: string) => Promise<{ success: boolean; error: string | null }>;
  removeService: (memberId: string, serviceId: string) => Promise<{ success: boolean; error: string | null }>;
  getPendingServiceRequests: () => ServiceUsage[];
  calculateServiceRiskScore: (memberId: string) => number;
  // New parent-focused methods
  getFamilyRiskScore: () => number;
  getActionableItems: () => Array<{
    id: string;
    type: 'approval' | 'high-risk' | 'conversation' | 'education';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    memberId?: string;
    serviceId?: string;
  }>;
  getConversationStarters: () => Array<{
    childName: string;
    service: any;
    topic: string;
    script: string;
  }>;
  recordRiskTrend: (memberId: string, score: number) => void;
  getRiskTrends: (memberId: string, days: number) => Array<{ date: string; score: number }>;
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
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate a simple user ID for demo purposes
  const getCurrentUserId = () => {
    let userId = localStorage.getItem('pandagarde_current_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('pandagarde_current_user_id', userId);
    }
    return userId;
  };

  // Calculate service risk score for a member (inspired by SocialCaution's Privacy Exposure Index)
  const calculateServiceRiskScore = (memberId: string): number => {
    const member = familyMembers.find(m => m.id === memberId);
    if (!member || !member.services || member.services.length === 0) {
      return 0; // No services = no risk
    }

    // Only count approved services
    const approvedServices = member.services.filter(s => s.status === 'approved');
    if (approvedServices.length === 0) {
      return 0;
    }

    // Calculate average risk score from services
    let totalRisk = 0;
    approvedServices.forEach(serviceUsage => {
      const service = getServiceById(serviceUsage.serviceId);
      if (service) {
        totalRisk += getRiskScore(service.riskLevel);
      }
    });

    return Math.round(totalRisk / approvedServices.length);
  };

  // Calculate privacy score for a family member (enhanced with service risk)
  const calculateMemberPrivacyScore = (member: FamilyMember, progress?: UserProgress): number => {
    let score = 100; // Start with perfect score

    // Deduct points for incomplete profile
    if (!member.first_name || !member.last_name) {
      score -= 10;
    }
    if (!member.email) {
      score -= 15;
    }
    if (!member.profile_data?.age) {
      score -= 5;
    }

    // Deduct points for lack of progress data
    if (!progress) {
      score -= 20;
    } else {
      // Deduct points for inactive users
      const lastActive = new Date(progress.lastActive);
      const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceActive > 7) {
        score -= 10;
      }
      if (daysSinceActive > 30) {
        score -= 20;
      }

      // Bonus points for active users
      if (progress.currentStreak > 0) {
        score += Math.min(progress.currentStreak * 2, 20);
      }
      if (progress.completedMissions.length > 0) {
        score += Math.min(progress.completedMissions.length * 3, 15);
      }
    }

    // Deduct points for high-risk services (inspired by SocialCaution)
    if (member.services && member.services.length > 0) {
      const serviceRisk = calculateServiceRiskScore(member.id);
      // Convert service risk (0-100) to deduction (0-30 points)
      // Higher risk = more deduction from privacy score
      const riskDeduction = Math.round(serviceRisk * 0.3);
      score -= riskDeduction;
    }

    return Math.max(0, Math.min(100, score));
  };

  const loadFamilyMembers = useCallback(async (familyId: string) => {
    console.log('Frontend-only mode: loadFamilyMembers() - using localStorage', familyId);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);
      if (familyData && familyData.id === familyId) {
        const members = familyData.members || [];
        
        // Load progress data for each member (use getAllUsersWithKey for encrypted data)
        const allProgress = await localStorageManager.getAllUsersWithKey(currentUserId);
        const membersWithProgress = await Promise.all(members.map(async (member: FamilyMember) => {
          const progress = allProgress[member.user_id] || await localStorageManager.getUserProgress(member.user_id);
          const memberWithProgress: FamilyMember = {
            ...member,
            services: member.services || [],
            serviceRiskScore: 0
          };
          // Add progress if it exists
          if (progress) {
            memberWithProgress.progress = progress;
          }
          // Calculate service risk score
          memberWithProgress.serviceRiskScore = calculateServiceRiskScore(member.id);
          // Calculate privacy score (includes service risk)
          memberWithProgress.privacyScore = calculateMemberPrivacyScore(memberWithProgress, progress || undefined);
          return memberWithProgress;
        }));
        
        setFamilyMembers(membersWithProgress);
      } else {
        setFamilyMembers([]);
      }
    } catch (error) {
      console.error('Error loading family members:', error);
      setFamilyMembers([]);
    }
  }, []);

  const checkExistingFamily = useCallback(async () => {
    console.log('Frontend-only mode: checkExistingFamily() - using localStorage');
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);
      
      if (familyData && familyData.members) {
        const userMember = familyData.members.find((member: FamilyMember) => member.user_id === currentUserId);
        if (userMember) {
          setCurrentFamily(familyData);
          await loadFamilyMembers(familyData.id);
        }
      }
    } catch (error) {
      console.error('Error checking existing family:', error);
    }
  }, [loadFamilyMembers]);

  // Load family data when component mounts - Frontend-only mode
  useEffect(() => {
    console.log('Frontend-only mode: Loading family data from localStorage');
    checkExistingFamily();
  }, [checkExistingFamily]);

  const createFamily = async (name: string) => {
    console.log('Frontend-only mode: createFamily() - using localStorage', name);
    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyId = `family_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();

      // Create family data
      const familyData: Family = {
        id: familyId,
        name,
        created_by: currentUserId,
        created_at: now,
        updated_at: now,
        members: []
      };

      // Create creator as parent member
      const creatorMember: FamilyMember = {
        id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: currentUserId,
        family_id: familyId,
        role: 'parent',
        first_name: 'Parent',
        last_name: 'User',
        email: 'parent@example.com',
        created_at: now,
        updated_at: now
      };

      familyData.members = [creatorMember];

      // Save family data
      await localStorageManager.saveFamilyData(familyData, currentUserId);

      // Create user progress if it doesn't exist
      let progress = await localStorageManager.getUserProgress(currentUserId);
      if (!progress) {
        progress = await localStorageManager.createUserProgress(currentUserId, 'Parent User', '13-17');
      }

      setCurrentFamily(familyData);
      await loadFamilyMembers(familyId);

      return { family: familyData, error: null };
    } catch (error) {
      console.error('Error creating family:', error);
      return { family: null, error: 'Failed to create family' };
    } finally {
      setLoading(false);
    }
  };

  const joinFamily = async (familyId: string) => {
    console.log('Frontend-only mode: joinFamily() - using localStorage', familyId);
    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== familyId) {
        return { success: false, error: 'Family not found' };
      }

      // Check if user is already a member
      const existingMember = familyData.members.find((member: FamilyMember) => member.user_id === currentUserId);
      if (existingMember) {
        return { success: false, error: 'Already a member of this family' };
      }

      // Add user as family member
      const newMember: FamilyMember = {
        id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: currentUserId,
        family_id: familyId,
        role: 'child', // Default to child, can be changed by parent
        first_name: 'Child',
        last_name: 'User',
        email: 'child@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      familyData.members.push(newMember);
      familyData.updated_at = new Date().toISOString();

      // Save updated family data
      await localStorageManager.saveFamilyData(familyData, currentUserId);

      // Create user progress if it doesn't exist
      let progress = await localStorageManager.getUserProgress(currentUserId);
      if (!progress) {
        progress = await localStorageManager.createUserProgress(currentUserId, 'Child User', '9-12');
      }

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
    console.log('Frontend-only mode: leaveFamily() - using localStorage');
    if (!currentFamily) {
      return { success: false, error: 'No family to leave' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      // Remove user from family members
      familyData.members = familyData.members.filter((member: FamilyMember) => member.user_id !== currentUserId);
      familyData.updated_at = new Date().toISOString();

      // If no members left, delete the family
      if (familyData.members.length === 0) {
        localStorageManager.clearAllData();
        setCurrentFamily(null);
        setFamilyMembers([]);
      } else {
        // Save updated family data
        await localStorageManager.saveFamilyData(familyData, currentUserId);
        setCurrentFamily(null);
        setFamilyMembers([]);
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error leaving family:', error);
      return { success: false, error: 'Failed to leave family' };
    } finally {
      setLoading(false);
    }
  };

  const addFamilyMember = async (email: string, role: 'parent' | 'child', firstName: string, lastName: string) => {
    console.log('Frontend-only mode: addFamilyMember() - using localStorage', { email, role, firstName, lastName });
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      // Check if user already exists
      const existingMember = familyData.members.find((member: FamilyMember) => member.email === email);
      if (existingMember) {
        return { success: false, error: 'User is already a member of this family' };
      }

      // Create new member
      const newMember: FamilyMember = {
        id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        family_id: currentFamily.id,
        role,
        first_name: firstName,
        last_name: lastName,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      familyData.members.push(newMember);
      familyData.updated_at = new Date().toISOString();

      // Save updated family data
      await localStorageManager.saveFamilyData(familyData, currentUserId);

      // Create user progress for the new member
      const ageGroup = role === 'child' ? '9-12' : '13-17';
      await localStorageManager.createUserProgress(newMember.user_id, `${firstName} ${lastName}`, ageGroup);

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
    console.log('Frontend-only mode: removeFamilyMember() - using localStorage', memberId);
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      // Find the member to remove
      const memberToRemove = familyData.members.find((member: FamilyMember) => member.id === memberId);
      if (!memberToRemove) {
        return { success: false, error: 'Member not found' };
      }

      // Remove member from family
      familyData.members = familyData.members.filter((member: FamilyMember) => member.id !== memberId);
      familyData.updated_at = new Date().toISOString();

      // Save updated family data with encryption
      await localStorageManager.saveFamilyData(familyData, currentUserId);

      // Delete user progress data
      localStorageManager.deleteUser(memberToRemove.user_id);

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
    console.log('Frontend-only mode: updateFamilyMember() - using localStorage', { memberId, updates });
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      // Find and update the member
      const memberIndex = familyData.members.findIndex((member: FamilyMember) => member.id === memberId);
      if (memberIndex === -1) {
        return { success: false, error: 'Member not found' };
      }

      familyData.members[memberIndex] = {
        ...familyData.members[memberIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };

      familyData.updated_at = new Date().toISOString();

      // Save updated family data with encryption
      await localStorageManager.saveFamilyData(familyData, currentUserId);

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
    console.log('Frontend-only mode: getFamilyProgress() - using localStorage');
    if (!currentFamily) {
      return null;
    }

    try {
      // Calculate family progress from localStorage data
      const totalActivities = familyMembers.length * 10; // Assume 10 activities per member
      let completedActivities = 0;

      familyMembers.forEach((member: FamilyMember) => {
        if (member.progress) {
          completedActivities += member.progress.completedMissions.length;
        }
      });

      const progressPercentage = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

      return {
        totalActivities,
        completedActivities,
        progressPercentage
      };
    } catch (error) {
      console.error('Error loading family progress:', error);
      return null;
    }
  };

  const isParent = familyMembers.find((member: FamilyMember) => member.user_id === getCurrentUserId())?.role === 'parent';
  const isChild = familyMembers.find((member: FamilyMember) => member.user_id === getCurrentUserId())?.role === 'child';

  // Calculate family privacy score
  const calculateFamilyPrivacyScore = (): number => {
    if (familyMembers.length === 0) {
      return 0;
    }
    
    const totalScore = familyMembers.reduce((sum: number, member: FamilyMember) => {
      return sum + (member.privacyScore || 0);
    }, 0);
    
    return Math.round(totalScore / familyMembers.length);
  };

  // Export family data
  const exportFamilyData = async (): Promise<string> => {
    const currentUserId = getCurrentUserId();
    return await localStorageManager.exportData(currentUserId);
  };

  // Import family data
  const importFamilyData = async (jsonData: string): Promise<boolean> => {
    const success = localStorageManager.importData(jsonData);
    if (success) {
      // Reload family data after import
      await checkExistingFamily();
    }
    return success;
  };

  // Get family storage usage
  const getFamilyStorageUsage = (): number => {
    return localStorageManager.getStorageUsage();
  };

  // Clear family data
  const clearFamilyData = (): void => {
    localStorageManager.clearAllData();
    setCurrentFamily(null);
    setFamilyMembers([]);
  };

  // Service management methods (inspired by SocialCaution)
  
  /**
   * Request a service for a child (child initiates, parent approves)
   */
  const requestService = async (memberId: string, serviceId: string): Promise<{ success: boolean; error: string | null }> => {
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      const member = familyData.members.find((m: FamilyMember) => m.id === memberId);
      if (!member) {
        return { success: false, error: 'Member not found' };
      }

      // Check if service already exists
      const existingService = member.services?.find((s: ServiceUsage) => s.serviceId === serviceId);
      if (existingService) {
        return { success: false, error: 'Service already added' };
      }

      // Add service request
      const serviceUsage: ServiceUsage = {
        serviceId,
        firstUsed: new Date().toISOString(),
        lastUsed: new Date().toISOString(),
        status: 'requested',
        requestedBy: member.user_id
      };

      if (!member.services) {
        member.services = [];
      }
      member.services.push(serviceUsage);
      member.updated_at = new Date().toISOString();
      familyData.updated_at = new Date().toISOString();

      await localStorageManager.saveFamilyData(familyData, currentUserId);
      await loadFamilyMembers(familyData.id);

      // Record risk trend after service change
      const newRiskScore = calculateServiceRiskScore(memberId);
      recordRiskTrend(memberId, newRiskScore);

      return { success: true, error: null };
    } catch (error) {
      console.error('Error requesting service:', error);
      return { success: false, error: 'Failed to request service' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Approve a service request (parent action)
   */
  const approveService = async (memberId: string, serviceId: string, notes?: string): Promise<{ success: boolean; error: string | null }> => {
    if (!currentFamily || !isParent) {
      return { success: false, error: 'Only parents can approve services' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      const member = familyData.members.find((m: FamilyMember) => m.id === memberId);
      if (!member || !member.services) {
        return { success: false, error: 'Service request not found' };
      }

      const serviceUsage = member.services.find((s: ServiceUsage) => s.serviceId === serviceId);
      if (!serviceUsage) {
        return { success: false, error: 'Service not found' };
      }

      // Update service status
      serviceUsage.status = 'approved';
      serviceUsage.approvedBy = currentUserId;
      serviceUsage.approvedAt = new Date().toISOString();
      if (notes) {
        serviceUsage.notes = notes;
      }

      member.updated_at = new Date().toISOString();
      familyData.updated_at = new Date().toISOString();

      await localStorageManager.saveFamilyData(familyData, currentUserId);
      await loadFamilyMembers(familyData.id);

      // Record risk trend after service change
      const newRiskScore = calculateServiceRiskScore(memberId);
      recordRiskTrend(memberId, newRiskScore);

      return { success: true, error: null };
    } catch (error) {
      console.error('Error approving service:', error);
      return { success: false, error: 'Failed to approve service' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deny a service request (parent action)
   */
  const denyService = async (memberId: string, serviceId: string, reason?: string): Promise<{ success: boolean; error: string | null }> => {
    if (!currentFamily || !isParent) {
      return { success: false, error: 'Only parents can deny services' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      const member = familyData.members.find((m: FamilyMember) => m.id === memberId);
      if (!member || !member.services) {
        return { success: false, error: 'Service request not found' };
      }

      const serviceUsage = member.services.find((s: ServiceUsage) => s.serviceId === serviceId);
      if (!serviceUsage) {
        return { success: false, error: 'Service not found' };
      }

      // Update service status
      serviceUsage.status = 'denied';
      serviceUsage.approvedBy = currentUserId;
      serviceUsage.approvedAt = new Date().toISOString();
      if (reason) {
        serviceUsage.notes = `Denied: ${reason}`;
      }

      member.updated_at = new Date().toISOString();
      familyData.updated_at = new Date().toISOString();

      await localStorageManager.saveFamilyData(familyData, currentUserId);
      await loadFamilyMembers(familyData.id);

      // Record risk trend after service change
      const newRiskScore = calculateServiceRiskScore(memberId);
      recordRiskTrend(memberId, newRiskScore);

      return { success: true, error: null };
    } catch (error) {
      console.error('Error denying service:', error);
      return { success: false, error: 'Failed to deny service' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove a service from a member
   */
  const removeService = async (memberId: string, serviceId: string): Promise<{ success: boolean; error: string | null }> => {
    if (!currentFamily) {
      return { success: false, error: 'No family selected' };
    }

    setLoading(true);
    try {
      const currentUserId = getCurrentUserId();
      const familyData = await localStorageManager.getFamilyData(currentUserId);

      if (!familyData || familyData.id !== currentFamily.id) {
        return { success: false, error: 'Family not found' };
      }

      const member = familyData.members.find((m: FamilyMember) => m.id === memberId);
      if (!member || !member.services) {
        return { success: false, error: 'Service not found' };
      }

      // Remove service
      member.services = member.services.filter((s: ServiceUsage) => s.serviceId !== serviceId);
      member.updated_at = new Date().toISOString();
      familyData.updated_at = new Date().toISOString();

      await localStorageManager.saveFamilyData(familyData, currentUserId);
      await loadFamilyMembers(familyData.id);

      // Record risk trend after service change
      const newRiskScore = calculateServiceRiskScore(memberId);
      recordRiskTrend(memberId, newRiskScore);

      return { success: true, error: null };
    } catch (error) {
      console.error('Error removing service:', error);
      return { success: false, error: 'Failed to remove service' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get all pending service requests (for parent dashboard)
   */
  const getPendingServiceRequests = (): ServiceUsage[] => {
    const pendingRequests: ServiceUsage[] = [];
    
    familyMembers.forEach((member: FamilyMember) => {
      if (member.services) {
        member.services
          .filter((s: ServiceUsage) => s.status === 'requested')
          .forEach((service: ServiceUsage) => {
            pendingRequests.push({
              ...service,
              // Add member info for display
            } as ServiceUsage & { memberId: string; memberName: string });
          });
      }
    });

    return pendingRequests;
  };

  /**
   * Get family average risk score
   */
  const getFamilyRiskScore = (): number => {
    const children = familyMembers.filter(m => m.role === 'child');
    if (children.length === 0) return 0;
    
    const totalRisk = children.reduce((sum, child) => {
      return sum + calculateServiceRiskScore(child.id);
    }, 0);
    
    return Math.round(totalRisk / children.length);
  };

  /**
   * Get actionable items sorted by priority
   */
  const getActionableItems = () => {
    const items: Array<{
      id: string;
      type: 'approval' | 'high-risk' | 'conversation' | 'education';
      priority: 'high' | 'medium' | 'low';
      title: string;
      description: string;
      memberId?: string;
      serviceId?: string;
    }> = [];

    // Pending approvals
    const pendingRequests = getPendingServiceRequests();
    pendingRequests.forEach((request, index) => {
      const member = familyMembers.find(m => 
        m.services?.some(s => s.serviceId === request.serviceId && s.status === 'requested')
      );
      const service = getServiceById(request.serviceId);
      if (member && service) {
        const riskScore = getRiskScore(service.riskLevel);
        items.push({
          id: `approval-${index}`,
          type: 'approval',
          priority: riskScore >= 70 ? 'high' : riskScore >= 40 ? 'medium' : 'low',
          title: `Review ${service.name} request from ${member.first_name}`,
          description: `${service.name} has ${service.riskLevel} privacy risk level`,
          memberId: member.id,
          serviceId: request.serviceId
        });
      }
    });

    // High-risk children
    const children = familyMembers.filter(m => m.role === 'child');
    children.forEach(child => {
      const riskScore = calculateServiceRiskScore(child.id);
      if (riskScore >= 70) {
        items.push({
          id: `high-risk-${child.id}`,
          type: 'high-risk',
          priority: 'high',
          title: `${child.first_name} has high privacy risk (${riskScore}/100)`,
          description: 'Review their apps and websites and privacy settings',
          memberId: child.id
        });
      } else if (riskScore >= 40) {
        items.push({
          id: `medium-risk-${child.id}`,
          type: 'high-risk',
          priority: 'medium',
          title: `${child.first_name} has medium privacy risk (${riskScore}/100)`,
          description: 'Consider reviewing their apps and privacy settings',
          memberId: child.id
        });
      }
    });

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return items.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  /**
   * Get conversation starters based on high-risk services
   */
  const getConversationStarters = () => {
    const starters: Array<{
      childName: string;
      service: any;
      topic: string;
      script: string;
    }> = [];

    const children = familyMembers.filter(m => m.role === 'child');
    children.forEach(child => {
      const approvedServices = child.services?.filter(s => s.status === 'approved') || [];
      approvedServices.forEach(serviceUsage => {
        const service = getServiceById(serviceUsage.serviceId);
        if (service && getRiskScore(service.riskLevel) >= 50) {
          const firstTip = service.parentTips && service.parentTips.length > 0 
            ? service.parentTips[0] 
            : 'We should review this together.';
          starters.push({
            childName: child.first_name,
            service,
            topic: `Privacy settings for ${service.name}`,
            script: `Hey ${child.first_name}, I noticed you're using ${service.name}. Let's make sure your privacy settings are set up correctly. ${firstTip}`
          });
        }
      });
    });

    return starters.slice(0, 3); // Top 3
  };

  /**
   * Record risk trend data
   */
  const recordRiskTrend = (memberId: string, score: number): void => {
    try {
      const trendsKey = 'pandagarde_risk_trends';
      const existing = localStorage.getItem(trendsKey);
      const trends: Record<string, Array<{ date: string; score: number }>> = existing ? JSON.parse(existing) : {};
      
      if (!trends[memberId]) {
        trends[memberId] = [];
      }
      
      trends[memberId].push({
        date: new Date().toISOString(),
        score
      });
      
      // Keep only last 90 days
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 90);
      trends[memberId] = trends[memberId].filter(t => new Date(t.date) >= cutoffDate);
      
      localStorage.setItem(trendsKey, JSON.stringify(trends));
    } catch (error) {
      console.error('Error recording risk trend:', error);
    }
  };

  /**
   * Get risk trends for a member
   */
  const getRiskTrends = (memberId: string, days: number = 30): Array<{ date: string; score: number }> => {
    try {
      const trendsKey = 'pandagarde_risk_trends';
      const existing = localStorage.getItem(trendsKey);
      if (!existing) return [];
      
      const trends: Record<string, Array<{ date: string; score: number }>> = JSON.parse(existing);
      if (!trends[memberId]) return [];
      
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      return trends[memberId].filter(t => new Date(t.date) >= cutoffDate);
    } catch (error) {
      console.error('Error getting risk trends:', error);
      return [];
    }
  };

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
    isChild,
    calculateFamilyPrivacyScore,
    exportFamilyData,
    importFamilyData,
    getFamilyStorageUsage,
    clearFamilyData,
    // Service management
    requestService,
    approveService,
    denyService,
    removeService,
    getPendingServiceRequests,
    calculateServiceRiskScore,
    // New parent-focused methods
    getFamilyRiskScore,
    getActionableItems,
    getConversationStarters,
    recordRiskTrend,
    getRiskTrends
  };

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  );
};