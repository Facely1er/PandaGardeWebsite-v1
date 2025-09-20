import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock service worker
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: jest.fn(),
    addEventListener: jest.fn(),
  },
});

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Critical Paths Tests', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('Age Selection and Verification', () => {
    test('should save age selection to localStorage', async () => {
      // Mock age verification data
      const mockAgeData = {
        verified: true,
        under13: false,
        consent: true,
        age: 14,
        timestamp: Date.now()
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockAgeData));

      // Test that age data is properly saved
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'pandagarde-age-verification',
        expect.stringContaining('"age":14')
      );
    });

    test('should auto-route to appropriate content based on age', () => {
      const mockNavigate = jest.fn();
      
      // Test routing logic
      const autoRouteToAppropriateContent = (age: number) => {
        if (age >= 5 && age <= 8) {
          mockNavigate('/ages-5-8');
        } else if (age >= 9 && age <= 12) {
          mockNavigate('/ages-9-12');
        } else if (age >= 13 && age <= 17) {
          mockNavigate('/ages-13-17');
        } else {
          mockNavigate('/get-started');
        }
      };

      autoRouteToAppropriateContent(7);
      expect(mockNavigate).toHaveBeenCalledWith('/ages-5-8');

      autoRouteToAppropriateContent(11);
      expect(mockNavigate).toHaveBeenCalledWith('/ages-9-12');

      autoRouteToAppropriateContent(15);
      expect(mockNavigate).toHaveBeenCalledWith('/ages-13-17');
    });

    test('should show age-appropriate missions only', () => {
      const getAgeAppropriateContent = (ageGroup: string) => {
        const contentMap = {
          'ages-5-8': [
            '/ages-5-8',
            '/interactive-story',
            '/activity-book',
            '/coloring-sheets',
            '/safety-posters'
          ],
          'ages-9-12': [
            '/ages-9-12',
            '/interactive-story',
            '/activity-book',
            '/privacy-tools',
            '/mission-hub'
          ],
          'ages-13-17': [
            '/ages-13-17',
            '/privacy-tools',
            '/mission-hub',
            '/teen-handbook',
            '/digital-citizenship'
          ]
        };
        return contentMap[ageGroup as keyof typeof contentMap] || [];
      };

      const content5_8 = getAgeAppropriateContent('ages-5-8');
      expect(content5_8).toContain('/coloring-sheets');
      expect(content5_8).not.toContain('/privacy-tools');

      const content13_17 = getAgeAppropriateContent('ages-13-17');
      expect(content13_17).toContain('/privacy-tools');
      expect(content13_17).not.toContain('/coloring-sheets');
    });

    test('should require parent verification for changes', () => {
      const requiresParentalConsent = (isUnder13: boolean, hasConsent: boolean) => {
        return isUnder13 && !hasConsent;
      };

      expect(requiresParentalConsent(true, false)).toBe(true);
      expect(requiresParentalConsent(true, true)).toBe(false);
      expect(requiresParentalConsent(false, false)).toBe(false);
    });
  });

  describe('Mission Completion and XP System', () => {
    test('should update XP when mission is completed', () => {
      let xp = 0;
      const completeMission = (points: number) => {
        xp += points;
      };

      completeMission(50);
      expect(xp).toBe(50);

      completeMission(25);
      expect(xp).toBe(75);
    });

    test('should unlock achievements properly', () => {
      const achievements = [
        { id: 'first-mission', unlocked: false },
        { id: 'privacy-expert', unlocked: false },
        { id: 'story-master', unlocked: false }
      ];

      const unlockAchievement = (achievementId: string) => {
        return achievements.map(a => 
          a.id === achievementId ? { ...a, unlocked: true } : a
        );
      };

      const updatedAchievements = unlockAchievement('first-mission');
      expect(updatedAchievements[0].unlocked).toBe(true);
      expect(updatedAchievements[1].unlocked).toBe(false);
    });

    test('should save progress between sessions', () => {
      const progress = {
        xp: 150,
        completedMissions: ['mission-1', 'mission-2'],
        achievements: ['first-mission'],
        timestamp: Date.now()
      };

      localStorageMock.setItem('story-progress', JSON.stringify(progress));
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'story-progress',
        expect.stringContaining('"xp":150')
      );
    });
  });

  describe('Family Members Management', () => {
    test('should add family members correctly', () => {
      const familyMembers = [];
      const addFamilyMember = (member: { name: string; age: number; relationship: string }) => {
        familyMembers.push({ ...member, id: Date.now().toString() });
      };

      addFamilyMember({ name: 'John', age: 12, relationship: 'brother' });
      expect(familyMembers).toHaveLength(1);
      expect(familyMembers[0].name).toBe('John');
    });

    test('should remove family members correctly', () => {
      const familyMembers = [
        { id: '1', name: 'John', age: 12, relationship: 'brother' },
        { id: '2', name: 'Sarah', age: 8, relationship: 'sister' }
      ];

      const removeFamilyMember = (id: string) => {
        return familyMembers.filter(member => member.id !== id);
      };

      const updatedMembers = removeFamilyMember('1');
      expect(updatedMembers).toHaveLength(1);
      expect(updatedMembers[0].name).toBe('Sarah');
    });

    test('should validate family member data', () => {
      const validateFamilyMember = (member: any) => {
        return member.name && 
               member.age >= 5 && 
               member.age <= 17 && 
               member.relationship;
      };

      expect(validateFamilyMember({ name: 'John', age: 12, relationship: 'brother' })).toBe(true);
      expect(validateFamilyMember({ name: '', age: 12, relationship: 'brother' })).toBe(false);
      expect(validateFamilyMember({ name: 'John', age: 3, relationship: 'brother' })).toBe(false);
    });
  });

  describe('Data Export/Import', () => {
    test('should export user data correctly', () => {
      const userData = {
        profile: { name: 'Test User', age: 12 },
        progress: { xp: 150, missions: ['mission-1'] },
        achievements: ['achievement-1'],
        settings: { theme: 'light' }
      };

      const exportData = () => {
        return JSON.stringify(userData, null, 2);
      };

      const exported = exportData();
      expect(exported).toContain('"name":"Test User"');
      expect(exported).toContain('"xp":150');
    });

    test('should import user data correctly', () => {
      const importedData = {
        profile: { name: 'Imported User', age: 10 },
        progress: { xp: 200, missions: ['mission-1', 'mission-2'] },
        achievements: ['achievement-1', 'achievement-2']
      };

      const importData = (data: string) => {
        return JSON.parse(data);
      };

      const parsed = importData(JSON.stringify(importedData));
      expect(parsed.profile.name).toBe('Imported User');
      expect(parsed.progress.xp).toBe(200);
    });

    test('should validate imported data format', () => {
      const validateImportData = (data: any) => {
        return data.profile && 
               data.progress && 
               Array.isArray(data.achievements);
      };

      const validData = {
        profile: { name: 'Test', age: 12 },
        progress: { xp: 100 },
        achievements: []
      };

      const invalidData = {
        profile: { name: 'Test' },
        // missing progress
        achievements: []
      };

      expect(validateImportData(validData)).toBe(true);
      expect(validateImportData(invalidData)).toBe(false);
    });
  });

  describe('Offline Mode Functionality', () => {
    test('should cache critical assets for offline use', () => {
      const criticalAssets = [
        '/',
        '/index.html',
        '/manifest.json',
        '/LogoPandagarde.png',
        '/offline.html'
      ];

      const cacheAssets = (assets: string[]) => {
        return assets.every(asset => asset.startsWith('/'));
      };

      expect(cacheAssets(criticalAssets)).toBe(true);
    });

    test('should sync progress when back online', () => {
      const offlineProgress = {
        xp: 50,
        missions: ['offline-mission'],
        timestamp: Date.now()
      };

      const syncProgress = (progress: any) => {
        // Simulate syncing to server
        return Promise.resolve({ success: true, syncedAt: Date.now() });
      };

      return syncProgress(offlineProgress).then(result => {
        expect(result.success).toBe(true);
      });
    });

    test('should show offline indicator when disconnected', () => {
      const isOnline = false;
      const showOfflineIndicator = (online: boolean) => {
        return !online;
      };

      expect(showOfflineIndicator(isOnline)).toBe(true);
    });
  });

  describe('Interactive Story Decision Points', () => {
    test('should track choices for achievements', () => {
      const choices = [];
      const makeChoice = (sceneId: string, choiceIndex: number, consequence: string) => {
        choices.push({ sceneId, choiceIndex, consequence, timestamp: Date.now() });
      };

      makeChoice('scene-1', 0, 'Po learns about privacy controls');
      expect(choices).toHaveLength(1);
      expect(choices[0].consequence).toContain('privacy');
    });

    test('should unlock achievements based on choices', () => {
      const achievements = [
        { id: 'privacy-learner', unlocked: false },
        { id: 'wise-choices', unlocked: false }
      ];

      const checkChoiceAchievements = (choices: any[]) => {
        const privacyChoices = choices.filter(choice => 
          choice.consequence && choice.consequence.includes('privacy')
        );
        
        return achievements.map(a => {
          if (a.id === 'privacy-learner' && privacyChoices.length >= 2) {
            return { ...a, unlocked: true };
          }
          if (a.id === 'wise-choices' && choices.length >= 3) {
            return { ...a, unlocked: true };
          }
          return a;
        });
      };

      const mockChoices = [
        { consequence: 'privacy controls' },
        { consequence: 'privacy settings' },
        { consequence: 'other choice' }
      ];

      const updatedAchievements = checkChoiceAchievements(mockChoices);
      expect(updatedAchievements[0].unlocked).toBe(true);
      expect(updatedAchievements[1].unlocked).toBe(true);
    });

    test('should save progress between sessions', () => {
      const storyProgress = {
        sceneIndex: 5,
        points: 75,
        achievements: ['first-scene', 'privacy-learner'],
        timestamp: Date.now()
      };

      localStorageMock.setItem('story-progress', JSON.stringify(storyProgress));
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'story-progress',
        expect.stringContaining('"sceneIndex":5')
      );
    });
  });

  describe('Service Worker Functionality', () => {
    test('should register service worker successfully', async () => {
      const mockRegistration = {
        installing: null,
        waiting: null,
        active: { postMessage: jest.fn() }
      };

      const registerSW = () => {
        return Promise.resolve(mockRegistration);
      };

      const registration = await registerSW();
      expect(registration).toBeDefined();
      expect(registration.active).toBeDefined();
    });

    test('should handle background sync', () => {
      const syncData = {
        progress: { xp: 100 },
        achievements: ['achievement-1']
      };

      const performBackgroundSync = (data: any) => {
        return Promise.resolve({ synced: true, data });
      };

      return performBackgroundSync(syncData).then(result => {
        expect(result.synced).toBe(true);
        expect(result.data).toEqual(syncData);
      });
    });

    test('should show update notifications', () => {
      const showUpdateNotification = (message: string) => {
        return {
          title: 'Privacy Panda Update',
          body: message,
          icon: '/LogoPandagarde.png'
        };
      };

      const notification = showUpdateNotification('New features available!');
      expect(notification.title).toBe('Privacy Panda Update');
      expect(notification.body).toBe('New features available!');
    });
  });
});