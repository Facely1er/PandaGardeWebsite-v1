import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorageManager, UserProgress } from './localStorageManager';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LocalStorageManager', () => {
  let manager: LocalStorageManager;

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    manager = new LocalStorageManager();
  });

  describe('Storage Availability', () => {
    it('should detect localStorage availability', () => {
      expect(manager.isStorageAvailable()).toBe(true);
    });
  });

  describe('User Progress', () => {
    it('should create new user progress', () => {
      const progress = manager.createUserProgress('user1', 'Test User', '9-12');

      expect(progress.id).toBe('user1');
      expect(progress.name).toBe('Test User');
      expect(progress.ageGroup).toBe('9-12');
      expect(progress.totalXP).toBe(0);
      expect(progress.currentLevel).toBe(1);
      expect(progress.completedMissions).toEqual([]);
      expect(progress.unlockedAchievements).toEqual([]);
      expect(progress.currentStreak).toBe(0);
    });

    it('should save and retrieve user progress', () => {
      const progress = manager.createUserProgress('user1', 'Test User', '5-8');
      const retrieved = manager.getUserProgress('user1');

      expect(retrieved).not.toBeNull();
      expect(retrieved?.name).toBe('Test User');
    });

    it('should return null for non-existent user', () => {
      const progress = manager.getUserProgress('nonexistent');
      expect(progress).toBeNull();
    });

    it('should delete user progress', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      manager.deleteUser('user1');

      const progress = manager.getUserProgress('user1');
      expect(progress).toBeNull();
    });

    it('should get all users', () => {
      manager.createUserProgress('user1', 'User 1', '5-8');
      manager.createUserProgress('user2', 'User 2', '9-12');

      const allUsers = manager.getAllUsers();
      expect(Object.keys(allUsers).length).toBe(2);
      expect(allUsers['user1']).toBeDefined();
      expect(allUsers['user2']).toBeDefined();
    });
  });

  describe('XP Management', () => {
    it('should add XP to user', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      const result = manager.addXP('user1', 50);

      const progress = manager.getUserProgress('user1');
      expect(progress?.totalXP).toBe(50);
      expect(result.leveledUp).toBe(false);
    });

    it('should level up when XP threshold is reached', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      const result = manager.addXP('user1', 100);

      expect(result.newLevel).toBe(2);
      expect(result.leveledUp).toBe(true);
    });

    it('should throw error when adding XP to non-existent user', () => {
      expect(() => manager.addXP('nonexistent', 50)).toThrow('User progress not found');
    });
  });

  describe('Mission Completion', () => {
    it('should complete a mission', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      manager.completeMission('user1', 'mission1');

      const progress = manager.getUserProgress('user1');
      expect(progress?.completedMissions).toContain('mission1');
    });

    it('should not duplicate completed missions', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      manager.completeMission('user1', 'mission1');
      manager.completeMission('user1', 'mission1');

      const progress = manager.getUserProgress('user1');
      expect(progress?.completedMissions.filter(m => m === 'mission1').length).toBe(1);
    });

    it('should throw error for non-existent user', () => {
      expect(() => manager.completeMission('nonexistent', 'mission1')).toThrow();
    });
  });

  describe('Achievement Unlocking', () => {
    it('should unlock an achievement', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      manager.unlockAchievement('user1', 'achievement1');

      const progress = manager.getUserProgress('user1');
      expect(progress?.unlockedAchievements).toContain('achievement1');
    });

    it('should not duplicate achievements', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      manager.unlockAchievement('user1', 'achievement1');
      manager.unlockAchievement('user1', 'achievement1');

      const progress = manager.getUserProgress('user1');
      expect(progress?.unlockedAchievements.filter(a => a === 'achievement1').length).toBe(1);
    });
  });

  describe('Streak Management', () => {
    it('should update user streak', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      manager.updateStreak('user1', 5);

      const progress = manager.getUserProgress('user1');
      expect(progress?.currentStreak).toBe(5);
    });

    it('should update last active timestamp', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      const initialProgress = manager.getUserProgress('user1');
      const initialTime = initialProgress?.lastActive;

      // Wait a tiny bit
      manager.updateLastActive('user1');

      const updatedProgress = manager.getUserProgress('user1');
      expect(updatedProgress?.lastActive).toBeDefined();
    });
  });

  describe('Data Export/Import', () => {
    it('should export data as JSON', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      const exported = manager.exportData();
      const parsed = JSON.parse(exported);

      expect(parsed.userProgress).toBeDefined();
      expect(parsed.exportDate).toBeDefined();
      expect(parsed.version).toBe('1.0');
    });

    it('should import valid data', () => {
      const importData = {
        userProgress: {
          'user1': {
            id: 'user1',
            name: 'Imported User',
            ageGroup: '9-12',
            totalXP: 500,
            currentLevel: 5,
            completedMissions: [],
            unlockedAchievements: [],
            currentStreak: 3,
            lastActive: new Date().toISOString(),
            createdAt: new Date().toISOString()
          }
        },
        version: '1.0'
      };

      const result = manager.importData(JSON.stringify(importData));
      expect(result).toBe(true);

      const progress = manager.getUserProgress('user1');
      expect(progress?.name).toBe('Imported User');
      expect(progress?.totalXP).toBe(500);
    });

    it('should reject invalid import data', () => {
      const result = manager.importData('invalid json');
      expect(result).toBe(false);
    });

    it('should reject import data without userProgress', () => {
      const result = manager.importData(JSON.stringify({ version: '1.0' }));
      expect(result).toBe(false);
    });
  });

  describe('Storage Info', () => {
    it('should return storage info', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      const info = manager.getStorageInfo();

      expect(info.used).toBeGreaterThan(0);
      expect(info.available).toBeDefined();
      expect(info.percentage).toBeDefined();
    });
  });

  describe('Clear Data', () => {
    it('should clear all data', () => {
      manager.createUserProgress('user1', 'Test User', '9-12');
      manager.createUserProgress('user2', 'Test User 2', '5-8');

      manager.clearAllData();

      const allUsers = manager.getAllUsers();
      expect(Object.keys(allUsers).length).toBe(0);
    });
  });
});
