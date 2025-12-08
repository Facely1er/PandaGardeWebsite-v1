import { encryptData, decryptData, generateUserPassword, isEncryptionAvailable } from '../lib/encryption';

export interface UserProgress {
  id: string;
  name: string;
  ageGroup: '5-8' | '9-12' | '13-17';
  totalXP: number;
  currentLevel: number;
  completedMissions: string[];
  unlockedAchievements: string[];
  currentStreak: number;
  lastActive: string;
  createdAt: string;
}

export class LocalStorageManager {
  private static readonly STORAGE_KEY = 'pandagarde_user_progress';
  private static readonly FAMILY_KEY = 'pandagarde_family_data';
  private static readonly ENCRYPTION_ENABLED = true; // Enable encryption by default
  private static readonly ENCRYPTION_FLAG = 'pandagarde_encrypted';

  /**
   * Save user progress to localStorage
   * Encrypts sensitive data if encryption is available
   */
  async saveUserProgress(userId: string, progress: UserProgress): Promise<void> {
    try {
      const allProgress = await this.getAllUsers();
      allProgress[userId] = progress;
      
      if (LocalStorageManager.ENCRYPTION_ENABLED && isEncryptionAvailable()) {
        const password = generateUserPassword(userId);
        const encrypted = await encryptData(allProgress, password);
        localStorage.setItem(LocalStorageManager.STORAGE_KEY, encrypted);
        localStorage.setItem(LocalStorageManager.ENCRYPTION_FLAG, 'true');
      } else {
        localStorage.setItem(LocalStorageManager.STORAGE_KEY, JSON.stringify(allProgress));
        localStorage.removeItem(LocalStorageManager.ENCRYPTION_FLAG);
      }
    } catch (error) {
      console.error('Error saving user progress:', error);
      throw new Error('Failed to save user progress');
    }
  }

  /**
   * Get user progress from localStorage
   * Decrypts data if encryption was used
   */
  async getUserProgress(userId: string): Promise<UserProgress | null> {
    try {
      // Use getAllUsersWithKey for encrypted data support
      const allProgress = await this.getAllUsersWithKey(userId);
      return allProgress[userId] || null;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return null;
    }
  }

  /**
   * Get all users' progress data
   * Handles both encrypted and unencrypted data for backward compatibility
   * Note: For encrypted data, use getAllUsersWithKey() instead
   */
  async getAllUsers(): Promise<Record<string, UserProgress>> {
    try {
      const data = localStorage.getItem(LocalStorageManager.STORAGE_KEY);
      if (!data) return {};
      
      const isEncrypted = localStorage.getItem(LocalStorageManager.ENCRYPTION_FLAG) === 'true';
      
      if (isEncrypted) {
        // Encrypted data requires userId - return empty and use getAllUsersWithKey instead
        console.warn('Data is encrypted. Use getAllUsersWithKey(userId) instead.');
        return {};
      } else {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error getting all users:', error);
      return {};
    }
  }
  
  /**
   * Get all users' progress data with userId for decryption
   */
  async getAllUsersWithKey(userId: string): Promise<Record<string, UserProgress>> {
    try {
      const data = localStorage.getItem(LocalStorageManager.STORAGE_KEY);
      if (!data) return {};
      
      const isEncrypted = localStorage.getItem(LocalStorageManager.ENCRYPTION_FLAG) === 'true';
      
      if (isEncrypted && isEncryptionAvailable()) {
        const password = generateUserPassword(userId);
        return await decryptData<Record<string, UserProgress>>(data, password);
      } else {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error getting all users:', error);
      return {};
    }
  }

  /**
   * Delete a specific user's progress
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      const allProgress = await this.getAllUsersWithKey(userId);
      delete allProgress[userId];
      
      if (LocalStorageManager.ENCRYPTION_ENABLED && isEncryptionAvailable()) {
        const password = generateUserPassword(userId);
        const encrypted = await encryptData(allProgress, password);
        localStorage.setItem(LocalStorageManager.STORAGE_KEY, encrypted);
      } else {
        localStorage.setItem(LocalStorageManager.STORAGE_KEY, JSON.stringify(allProgress));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  /**
   * Export all data as JSON string
   */
  async exportData(userId?: string): Promise<string> {
    try {
      const allProgress = userId ? await this.getAllUsersWithKey(userId) : await this.getAllUsers();
      const familyData = userId ? await this.getFamilyData(userId) : await this.getFamilyData();
      const exportData = {
        userProgress: allProgress,
        familyData: familyData,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  }

  /**
   * Import data from JSON string
   */
  importData(jsonData: string): boolean {
    try {
      const importData = JSON.parse(jsonData);
      
      // Validate the data structure
      if (!importData.userProgress || typeof importData.userProgress !== 'object') {
        throw new Error('Invalid data format: missing userProgress');
      }

      // Import user progress data
      localStorage.setItem(LocalStorageManager.STORAGE_KEY, JSON.stringify(importData.userProgress));

      // Import family data if present
      if (importData.familyData) {
        localStorage.setItem(LocalStorageManager.FAMILY_KEY, JSON.stringify(importData.familyData));
      }

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  /**
   * Get storage usage in bytes
   */
  getStorageUsage(): number {
    try {
      let totalSize = 0;
      
      // Calculate size of user progress data
      const progressData = localStorage.getItem(LocalStorageManager.STORAGE_KEY);
      if (progressData) {
        totalSize += new Blob([progressData]).size;
      }

      // Calculate size of family data
      const familyData = localStorage.getItem(LocalStorageManager.FAMILY_KEY);
      if (familyData) {
        totalSize += new Blob([familyData]).size;
      }

      return totalSize;
    } catch (error) {
      console.error('Error calculating storage usage:', error);
      return 0;
    }
  }

  /**
   * Clear all data from localStorage
   */
  clearAllData(): void {
    try {
      localStorage.removeItem(LocalStorageManager.STORAGE_KEY);
      localStorage.removeItem(LocalStorageManager.FAMILY_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }

  /**
   * Get family data from localStorage
   * Decrypts data if encryption was used
   */
  async getFamilyData(userId?: string): Promise<any> {
    try {
      const data = localStorage.getItem(LocalStorageManager.FAMILY_KEY);
      if (!data) return null;
      
      const isEncrypted = localStorage.getItem(`${LocalStorageManager.FAMILY_KEY}_encrypted`) === 'true';
      
      if (isEncrypted && isEncryptionAvailable() && userId) {
        const password = generateUserPassword(userId);
        return await decryptData(data, password);
      } else {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error getting family data:', error);
      return null;
    }
  }

  /**
   * Save family data to localStorage
   * Encrypts sensitive PII (names, emails, ages) if encryption is available
   */
  async saveFamilyData(familyData: any, userId?: string): Promise<void> {
    try {
      if (LocalStorageManager.ENCRYPTION_ENABLED && isEncryptionAvailable() && userId) {
        // Encrypt sensitive family data
        const password = generateUserPassword(userId);
        const encrypted = await encryptData(familyData, password);
        localStorage.setItem(LocalStorageManager.FAMILY_KEY, encrypted);
        localStorage.setItem(`${LocalStorageManager.FAMILY_KEY}_encrypted`, 'true');
      } else {
        localStorage.setItem(LocalStorageManager.FAMILY_KEY, JSON.stringify(familyData));
        localStorage.removeItem(`${LocalStorageManager.FAMILY_KEY}_encrypted`);
      }
    } catch (error) {
      console.error('Error saving family data:', error);
      throw new Error('Failed to save family data');
    }
  }

  /**
   * Check if localStorage is available
   */
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get storage quota information (approximate)
   */
  getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const used = this.getStorageUsage();
      // Most browsers have ~5-10MB localStorage limit
      const estimatedLimit = 5 * 1024 * 1024; // 5MB
      const available = Math.max(0, estimatedLimit - used);
      const percentage = (used / estimatedLimit) * 100;

      return {
        used,
        available,
        percentage: Math.min(percentage, 100)
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, available: 0, percentage: 0 };
    }
  }

  /**
   * Create a new user progress entry
   */
  async createUserProgress(userId: string, name: string, ageGroup: '5-8' | '9-12' | '13-17'): Promise<UserProgress> {
    const now = new Date().toISOString();
    const progress: UserProgress = {
      id: userId,
      name,
      ageGroup,
      totalXP: 0,
      currentLevel: 1,
      completedMissions: [],
      unlockedAchievements: [],
      currentStreak: 0,
      lastActive: now,
      createdAt: now
    };

    await this.saveUserProgress(userId, progress);
    return progress;
  }

  /**
   * Update user's last active timestamp
   */
  async updateLastActive(userId: string): Promise<void> {
    const progress = await this.getUserProgress(userId);
    if (progress) {
      progress.lastActive = new Date().toISOString();
      await this.saveUserProgress(userId, progress);
    }
  }

  /**
   * Add XP to user and potentially level up
   */
  async addXP(userId: string, xp: number): Promise<{ newLevel: number; leveledUp: boolean }> {
    const progress = await this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    const oldLevel = progress.currentLevel;
    progress.totalXP += xp;
    
    // Simple level calculation: 100 XP per level
    const newLevel = Math.floor(progress.totalXP / 100) + 1;
    progress.currentLevel = newLevel;
    
    const leveledUp = newLevel > oldLevel;
    
    await this.saveUserProgress(userId, progress);
    return { newLevel, leveledUp };
  }

  /**
   * Complete a mission for a user
   */
  async completeMission(userId: string, missionId: string): Promise<void> {
    const progress = await this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    if (!progress.completedMissions.includes(missionId)) {
      progress.completedMissions.push(missionId);
      await this.saveUserProgress(userId, progress);
    }
  }

  /**
   * Unlock an achievement for a user
   */
  async unlockAchievement(userId: string, achievementId: string): Promise<void> {
    const progress = await this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    if (!progress.unlockedAchievements.includes(achievementId)) {
      progress.unlockedAchievements.push(achievementId);
      await this.saveUserProgress(userId, progress);
    }
  }

  /**
   * Update user's streak
   */
  async updateStreak(userId: string, streak: number): Promise<void> {
    const progress = await this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    progress.currentStreak = streak;
    await this.saveUserProgress(userId, progress);
  }
}

// Export a singleton instance
export const localStorageManager = new LocalStorageManager();