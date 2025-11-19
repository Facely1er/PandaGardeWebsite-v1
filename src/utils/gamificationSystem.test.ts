import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GamificationSystem, LEVELS, ACHIEVEMENTS, MISSIONS } from './gamificationSystem';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('GamificationSystem', () => {
  let gamification: GamificationSystem;

  beforeEach(() => {
    localStorageMock.clear();
    gamification = new GamificationSystem();
  });

  describe('Level Calculations', () => {
    it('should calculate XP for level 1 as 0', () => {
      expect(gamification.calculateXPForLevel(1)).toBe(0);
    });

    it('should calculate XP for level 2 correctly', () => {
      expect(gamification.calculateXPForLevel(2)).toBe(100);
    });

    it('should calculate level from 0 XP as level 1', () => {
      expect(gamification.calculateLevelFromXP(0)).toBe(1);
    });

    it('should calculate level from 100 XP as level 2', () => {
      expect(gamification.calculateLevelFromXP(100)).toBe(2);
    });

    it('should calculate level from 250 XP as level 3', () => {
      expect(gamification.calculateLevelFromXP(250)).toBe(3);
    });

    it('should calculate level from 500 XP as level 4', () => {
      expect(gamification.calculateLevelFromXP(500)).toBe(4);
    });

    it('should handle very high XP values', () => {
      const maxLevel = gamification.calculateLevelFromXP(10000);
      expect(maxLevel).toBe(10);
    });
  });

  describe('Level Info', () => {
    it('should return level info for valid levels', () => {
      const info = gamification.getLevelInfo(1);
      expect(info).not.toBeNull();
      expect(info?.title).toBe('Privacy Beginner');
    });

    it('should return null for invalid levels', () => {
      const info = gamification.getLevelInfo(100);
      expect(info).toBeNull();
    });

    it('should have correct level titles', () => {
      expect(gamification.getLevelInfo(1)?.title).toBe('Privacy Beginner');
      expect(gamification.getLevelInfo(5)?.title).toBe('Privacy Apprentice');
      expect(gamification.getLevelInfo(10)?.title).toBe('Privacy Legend');
    });
  });

  describe('Achievements', () => {
    it('should have achievements defined', () => {
      expect(ACHIEVEMENTS.length).toBeGreaterThan(0);
    });

    it('should get achievements by category', () => {
      const learningAchievements = gamification.getAchievementsByCategory('learning');
      expect(learningAchievements.length).toBeGreaterThan(0);
      learningAchievements.forEach(achievement => {
        expect(achievement.category).toBe('learning');
      });
    });

    it('should have unique achievement IDs', () => {
      const ids = ACHIEVEMENTS.map(a => a.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid rarity values', () => {
      const validRarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
      ACHIEVEMENTS.forEach(achievement => {
        expect(validRarities).toContain(achievement.rarity);
      });
    });

    it('should have positive XP rewards', () => {
      ACHIEVEMENTS.forEach(achievement => {
        expect(achievement.xpReward).toBeGreaterThan(0);
      });
    });
  });

  describe('Missions', () => {
    it('should have missions defined', () => {
      expect(MISSIONS.length).toBeGreaterThan(0);
    });

    it('should get missions by category', () => {
      const dailyMissions = gamification.getMissionsByCategory('daily');
      expect(dailyMissions.length).toBeGreaterThan(0);
      dailyMissions.forEach(mission => {
        expect(mission.category).toBe('daily');
      });
    });

    it('should have unique mission IDs', () => {
      const ids = MISSIONS.map(m => m.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid age groups', () => {
      const validAgeGroups = ['5-8', '9-12', '13-17'];
      MISSIONS.forEach(mission => {
        expect(validAgeGroups).toContain(mission.ageGroup);
      });
    });

    it('should have valid difficulty levels', () => {
      const validDifficulties = ['easy', 'medium', 'hard'];
      MISSIONS.forEach(mission => {
        expect(validDifficulties).toContain(mission.difficulty);
      });
    });

    it('should have positive duration', () => {
      MISSIONS.forEach(mission => {
        expect(mission.duration).toBeGreaterThan(0);
      });
    });
  });

  describe('Color Utilities', () => {
    it('should return correct rarity colors', () => {
      expect(gamification.getRarityColor('common')).toContain('gray');
      expect(gamification.getRarityColor('uncommon')).toContain('green');
      expect(gamification.getRarityColor('rare')).toContain('blue');
      expect(gamification.getRarityColor('epic')).toContain('purple');
      expect(gamification.getRarityColor('legendary')).toContain('yellow');
    });

    it('should return correct difficulty colors', () => {
      expect(gamification.getDifficultyColor('easy')).toContain('green');
      expect(gamification.getDifficultyColor('medium')).toContain('yellow');
      expect(gamification.getDifficultyColor('hard')).toContain('red');
    });

    it('should return default color for unknown rarity', () => {
      expect(gamification.getRarityColor('unknown')).toContain('gray');
    });

    it('should return default color for unknown difficulty', () => {
      expect(gamification.getDifficultyColor('unknown')).toContain('gray');
    });
  });

  describe('LEVELS constant', () => {
    it('should have 10 levels defined', () => {
      expect(LEVELS.length).toBe(10);
    });

    it('should have increasing XP requirements', () => {
      for (let i = 1; i < LEVELS.length; i++) {
        expect(LEVELS[i].xpRequired).toBeGreaterThan(LEVELS[i - 1].xpRequired);
      }
    });

    it('should have level numbers starting from 1', () => {
      expect(LEVELS[0].level).toBe(1);
      expect(LEVELS[9].level).toBe(10);
    });

    it('should have rewards for each level', () => {
      LEVELS.forEach(level => {
        expect(level.rewards.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = GamificationSystem.getInstance();
      const instance2 = GamificationSystem.getInstance();
      expect(instance1).toBe(instance2);
    });
  });
});
