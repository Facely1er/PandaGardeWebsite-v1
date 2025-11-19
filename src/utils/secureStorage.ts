/**
 * Secure Storage Utility
 * Provides encryption for sensitive localStorage data using Web Crypto API
 * Uses AES-GCM for authenticated encryption
 */

// Generate a device-specific identifier for key derivation
const getDeviceIdentifier = (): string => {
  let deviceId = localStorage.getItem('pandagarde_device_id');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('pandagarde_device_id', deviceId);
  }
  return deviceId;
};

// Convert string to ArrayBuffer
const stringToBuffer = (str: string): ArrayBuffer => {
  return new TextEncoder().encode(str);
};

// Convert ArrayBuffer to string
const bufferToString = (buffer: ArrayBuffer): string => {
  return new TextDecoder().decode(buffer);
};

// Convert ArrayBuffer to base64
const bufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Convert base64 to ArrayBuffer
const base64ToBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

// Derive encryption key from device identifier
const deriveKey = async (salt: ArrayBuffer): Promise<CryptoKey> => {
  const deviceId = getDeviceIdentifier();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    stringToBuffer(deviceId),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

// Encrypt data
export const encryptData = async (data: string): Promise<string> => {
  try {
    // Generate random salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Derive key
    const key = await deriveKey(salt.buffer);

    // Encrypt
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      stringToBuffer(data)
    );

    // Combine salt + iv + encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);

    return bufferToBase64(combined.buffer);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Decrypt data
export const decryptData = async (encryptedData: string): Promise<string> => {
  try {
    const combined = new Uint8Array(base64ToBuffer(encryptedData));

    // Extract salt, iv, and encrypted content
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encrypted = combined.slice(28);

    // Derive key
    const key = await deriveKey(salt.buffer);

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );

    return bufferToString(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * SecureStorage class - encrypted localStorage wrapper
 */
export class SecureStorage {
  private prefix: string;

  constructor(prefix: string = 'pandagarde_secure_') {
    this.prefix = prefix;
  }

  /**
   * Store encrypted data
   */
  async setItem(key: string, value: unknown): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      const encrypted = await encryptData(serialized);
      localStorage.setItem(this.prefix + key, encrypted);
    } catch (error) {
      console.error(`Failed to store ${key}:`, error);
      throw error;
    }
  }

  /**
   * Retrieve and decrypt data
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const encrypted = localStorage.getItem(this.prefix + key);
      if (!encrypted) return null;

      const decrypted = await decryptData(encrypted);
      return JSON.parse(decrypted) as T;
    } catch (error) {
      console.error(`Failed to retrieve ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove encrypted data
   */
  removeItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  /**
   * Clear all encrypted data with this prefix
   */
  clear(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  /**
   * Check if key exists
   */
  hasItem(key: string): boolean {
    return localStorage.getItem(this.prefix + key) !== null;
  }

  /**
   * Get all keys (without prefix)
   */
  keys(): string[] {
    const result: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.prefix)) {
        result.push(key.substring(this.prefix.length));
      }
    }
    return result;
  }
}

// Create default instance for sensitive data
export const secureStorage = new SecureStorage();

// Utility to check if Web Crypto API is available
export const isSecureStorageAvailable = (): boolean => {
  return (
    typeof crypto !== 'undefined' &&
    typeof crypto.subtle !== 'undefined' &&
    typeof crypto.getRandomValues !== 'undefined'
  );
};

// Migration utility - encrypt existing unencrypted data
export const migrateToSecureStorage = async (
  key: string,
  sourceKey: string,
  removeSource: boolean = false
): Promise<boolean> => {
  try {
    const existingData = localStorage.getItem(sourceKey);
    if (!existingData) return false;

    await secureStorage.setItem(key, JSON.parse(existingData));

    if (removeSource) {
      localStorage.removeItem(sourceKey);
    }

    return true;
  } catch (error) {
    console.error(`Migration failed for ${sourceKey}:`, error);
    return false;
  }
};
