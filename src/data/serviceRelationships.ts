/**
 * Service Relationships for Child Services
 * Maps parent companies, subsidiaries, and related services
 * Used for understanding data sharing networks and privacy implications
 */

export interface ServiceRelationship {
  parent?: string;
  parentName?: string;
  siblings?: string[];
  category?: string;
}

export const serviceRelationships: Record<string, ServiceRelationship> = {
  // Meta/Facebook ecosystem
  'instagram': {
    parent: 'meta',
    parentName: 'Meta',
    siblings: ['facebook', 'whatsapp'],
    category: 'social-media'
  },
  'whatsapp': {
    parent: 'meta',
    parentName: 'Meta',
    siblings: ['facebook', 'instagram'],
    category: 'messaging'
  },
  
  // Google/Alphabet ecosystem
  'youtube': {
    parent: 'alphabet',
    parentName: 'Google',
    siblings: ['youtube-kids'],
    category: 'streaming'
  },
  'youtube-kids': {
    parent: 'alphabet',
    parentName: 'Google',
    siblings: ['youtube'],
    category: 'streaming'
  },
  
  // Microsoft ecosystem
  'minecraft': {
    parent: 'microsoft',
    parentName: 'Microsoft',
    siblings: [],
    category: 'gaming'
  },
  
  // Epic Games ecosystem
  'fortnite': {
    parent: 'epic-games',
    parentName: 'Epic Games',
    siblings: [],
    category: 'gaming'
  },
  
  // Roblox Corporation
  'roblox': {
    parent: 'roblox-corp',
    parentName: 'Roblox Corporation',
    siblings: [],
    category: 'gaming'
  },
  
  // MIT (Scratch)
  'scratch': {
    parent: 'mit',
    parentName: 'MIT',
    siblings: [],
    category: 'creative'
  },
  
  // Duolingo
  'duolingo': {
    parent: 'duolingo-inc',
    parentName: 'Duolingo',
    siblings: [],
    category: 'education'
  },
  
  // Khan Academy
  'khan-academy': {
    parent: 'khan-academy-org',
    parentName: 'Khan Academy',
    siblings: [],
    category: 'education'
  },
  
  // Netflix
  'netflix': {
    parent: 'netflix-inc',
    parentName: 'Netflix',
    siblings: [],
    category: 'streaming'
  },
  
  // Snap Inc.
  'snapchat': {
    parent: 'snap-inc',
    parentName: 'Snap Inc.',
    siblings: [],
    category: 'social-media'
  },
  
  // ByteDance (TikTok)
  'tiktok': {
    parent: 'bytedance',
    parentName: 'ByteDance',
    siblings: [],
    category: 'social-media'
  }
};

/**
 * Get relationship information for a service
 */
export function getServiceRelationship(serviceId: string): ServiceRelationship | null {
  return serviceRelationships[serviceId] || null;
}

/**
 * Get all sibling services for a given service
 */
export function getSiblingServices(serviceId: string): string[] {
  const relationship = serviceRelationships[serviceId];
  return relationship?.siblings || [];
}

/**
 * Get parent company name for a service
 */
export function getParentCompany(serviceId: string): string | null {
  const relationship = serviceRelationships[serviceId];
  return relationship?.parentName || null;
}

/**
 * Get all services under a parent company
 */
export function getServicesByParent(parentId: string): string[] {
  return Object.entries(serviceRelationships)
    .filter(([_, relationship]) => relationship.parent === parentId)
    .map(([serviceId]) => serviceId);
}

/**
 * Check if two services are related (same parent or siblings)
 */
export function areServicesRelated(serviceId1: string, serviceId2: string): boolean {
  const rel1 = serviceRelationships[serviceId1];
  const rel2 = serviceRelationships[serviceId2];
  
  if (!rel1 || !rel2) return false;
  
  // Same parent
  if (rel1.parent && rel2.parent && rel1.parent === rel2.parent) {
    return true;
  }
  
  // Siblings
  if (rel1.siblings?.includes(serviceId2) || rel2.siblings?.includes(serviceId1)) {
    return true;
  }
  
  return false;
}

