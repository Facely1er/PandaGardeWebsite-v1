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

  /**
   * Save user progress to localStorage
   */
  saveUserProgress(userId: string, progress: UserProgress): void {
    try {
      const allProgress = this.getAllUsers();
      allProgress[userId] = progress;
      localStorage.setItem(LocalStorageManager.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error saving user progress:', error);
      throw new Error('Failed to save user progress');
    }
  }

  /**
   * Get user progress from localStorage
   */
  getUserProgress(userId: string): UserProgress | null {
    try {
      const allProgress = this.getAllUsers();
      return allProgress[userId] || null;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return null;
    }
  }

  /**
   * Get all users' progress data
   */
  getAllUsers(): Record<string, UserProgress> {
    try {
      const data = localStorage.getItem(LocalStorageManager.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting all users:', error);
      return {};
    }
  }

  /**
   * Delete a specific user's progress
   */
  deleteUser(userId: string): void {
    try {
      const allProgress = this.getAllUsers();
      delete allProgress[userId];
      localStorage.setItem(LocalStorageManager.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  /**
   * Export all data as JSON string
   */
  exportData(): string {
    try {
      const allProgress = this.getAllUsers();
      const familyData = this.getFamilyData();
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
   */
  getFamilyData(): any {
    try {
      const data = localStorage.getItem(LocalStorageManager.FAMILY_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting family data:', error);
      return null;
    }
  }

  /**
   * Save family data to localStorage
   */
  saveFamilyData(familyData: any): void {
    try {
      localStorage.setItem(LocalStorageManager.FAMILY_KEY, JSON.stringify(familyData));
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
  createUserProgress(userId: string, name: string, ageGroup: '5-8' | '9-12' | '13-17'): UserProgress {
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

    this.saveUserProgress(userId, progress);
    return progress;
  }

  /**
   * Update user's last active timestamp
   */
  updateLastActive(userId: string): void {
    const progress = this.getUserProgress(userId);
    if (progress) {
      progress.lastActive = new Date().toISOString();
      this.saveUserProgress(userId, progress);
    }
  }

  /**
   * Add XP to user and potentially level up
   */
  addXP(userId: string, xp: number): { newLevel: number; leveledUp: boolean } {
    const progress = this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    const oldLevel = progress.currentLevel;
    progress.totalXP += xp;
    
    // Simple level calculation: 100 XP per level
    const newLevel = Math.floor(progress.totalXP / 100) + 1;
    progress.currentLevel = newLevel;
    
    const leveledUp = newLevel > oldLevel;
    
    this.saveUserProgress(userId, progress);
    return { newLevel, leveledUp };
  }

  /**
   * Complete a mission for a user
   */
  completeMission(userId: string, missionId: string): void {
    const progress = this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    if (!progress.completedMissions.includes(missionId)) {
      progress.completedMissions.push(missionId);
      this.saveUserProgress(userId, progress);
    }
  }

  /**
   * Unlock an achievement for a user
   */
  unlockAchievement(userId: string, achievementId: string): void {
    const progress = this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    if (!progress.unlockedAchievements.includes(achievementId)) {
      progress.unlockedAchievements.push(achievementId);
      this.saveUserProgress(userId, progress);
    }
  }

  /**
   * Update user's streak
   */
  updateStreak(userId: string, streak: number): void {
    const progress = this.getUserProgress(userId);
    if (!progress) {
      throw new Error('User progress not found');
    }

    progress.currentStreak = streak;
    this.saveUserProgress(userId, progress);
  }
}

// Export a singleton instance
export const localStorageManager = new LocalStorageManager();