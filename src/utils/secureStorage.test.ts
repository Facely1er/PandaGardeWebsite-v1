import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  encryptData,
  decryptData,
  SecureStorage,
  isSecureStorageAvailable,
} from './secureStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] || null,
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock crypto API
const mockCrypto = {
  randomUUID: () => 'test-uuid-12345',
  getRandomValues: (array: Uint8Array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
  subtle: {
    importKey: vi.fn().mockResolvedValue('mockKeyMaterial'),
    deriveKey: vi.fn().mockResolvedValue('mockDerivedKey'),
    encrypt: vi.fn().mockImplementation(async (_algorithm, _key, data) => {
      // Simple mock - just return the data with a prefix
      return new Uint8Array([0xde, 0xad, ...new Uint8Array(data)]).buffer;
    }),
    decrypt: vi.fn().mockImplementation(async (_algorithm, _key, data) => {
      // Simple mock - remove the prefix
      const arr = new Uint8Array(data);
      return arr.slice(2).buffer;
    }),
  },
};

Object.defineProperty(window, 'crypto', { value: mockCrypto });

describe('secureStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('isSecureStorageAvailable', () => {
    it('should return true when crypto API is available', () => {
      expect(isSecureStorageAvailable()).toBe(true);
    });
  });

  describe('encryptData and decryptData', () => {
    it('should encrypt and decrypt data', async () => {
      const testData = 'Hello, World!';
      const encrypted = await encryptData(testData);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe('string');
      expect(encrypted).not.toBe(testData);

      const decrypted = await decryptData(encrypted);
      expect(decrypted).toBe(testData);
    });

    it('should handle JSON data', async () => {
      const testData = JSON.stringify({ name: 'Test', value: 123 });
      const encrypted = await encryptData(testData);
      const decrypted = await decryptData(encrypted);

      expect(JSON.parse(decrypted)).toEqual({ name: 'Test', value: 123 });
    });

    it('should handle empty strings', async () => {
      const encrypted = await encryptData('');
      const decrypted = await decryptData(encrypted);
      expect(decrypted).toBe('');
    });
  });

  describe('SecureStorage class', () => {
    let storage: SecureStorage;

    beforeEach(() => {
      storage = new SecureStorage('test_');
    });

    it('should store and retrieve data', async () => {
      const testData = { key: 'value', num: 42 };
      await storage.setItem('mydata', testData);

      const retrieved = await storage.getItem('mydata');
      expect(retrieved).toEqual(testData);
    });

    it('should return null for non-existent keys', async () => {
      const result = await storage.getItem('nonexistent');
      expect(result).toBeNull();
    });

    it('should remove items', async () => {
      await storage.setItem('toremove', 'data');
      expect(storage.hasItem('toremove')).toBe(true);

      storage.removeItem('toremove');
      expect(storage.hasItem('toremove')).toBe(false);
    });

    it('should check if item exists', async () => {
      expect(storage.hasItem('newkey')).toBe(false);

      await storage.setItem('newkey', 'value');
      expect(storage.hasItem('newkey')).toBe(true);
    });

    it('should get all keys', async () => {
      await storage.setItem('key1', 'value1');
      await storage.setItem('key2', 'value2');
      await storage.setItem('key3', 'value3');

      const keys = storage.keys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
      expect(keys.length).toBe(3);
    });

    it('should clear all items with prefix', async () => {
      await storage.setItem('item1', 'data1');
      await storage.setItem('item2', 'data2');

      // Add item with different prefix
      localStorage.setItem('other_item', 'other');

      storage.clear();

      expect(storage.hasItem('item1')).toBe(false);
      expect(storage.hasItem('item2')).toBe(false);
      expect(localStorage.getItem('other_item')).toBe('other');
    });

    it('should handle complex nested objects', async () => {
      const complexData = {
        user: {
          name: 'Test User',
          preferences: {
            theme: 'dark',
            notifications: true,
          },
        },
        scores: [100, 200, 300],
        metadata: {
          created: new Date().toISOString(),
          version: '1.0',
        },
      };

      await storage.setItem('complex', complexData);
      const retrieved = await storage.getItem('complex');

      expect(retrieved).toEqual(complexData);
    });

    it('should handle arrays', async () => {
      const arrayData = [1, 2, 3, 'four', { five: 5 }];
      await storage.setItem('array', arrayData);

      const retrieved = await storage.getItem('array');
      expect(retrieved).toEqual(arrayData);
    });

    it('should handle boolean values', async () => {
      await storage.setItem('bool_true', true);
      await storage.setItem('bool_false', false);

      expect(await storage.getItem('bool_true')).toBe(true);
      expect(await storage.getItem('bool_false')).toBe(false);
    });

    it('should handle null values', async () => {
      await storage.setItem('null_value', null);
      const retrieved = await storage.getItem('null_value');
      expect(retrieved).toBeNull();
    });

    it('should use custom prefix', async () => {
      const customStorage = new SecureStorage('custom_prefix_');
      await customStorage.setItem('test', 'value');

      // Check that the key includes the custom prefix
      expect(customStorage.hasItem('test')).toBe(true);
      expect(customStorage.keys()).toContain('test');
    });
  });

  describe('Device identifier', () => {
    it('should generate and persist device identifier', async () => {
      // First call should generate new ID
      await encryptData('test');
      expect(localStorage.getItem('pandagarde_device_id')).toBe('test-uuid-12345');
    });

    it('should reuse existing device identifier', async () => {
      localStorage.setItem('pandagarde_device_id', 'existing-id');
      await encryptData('test');
      expect(localStorage.getItem('pandagarde_device_id')).toBe('existing-id');
    });
  });
});
