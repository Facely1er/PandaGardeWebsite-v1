// Ages 9-12 Tools
export { default as ScamDetector } from './ScamDetector';
export { default as CookieMonsterTracker } from './CookieMonsterTracker';
export { default as SocialMediaScanner } from './SocialMediaScanner';

// Tool metadata
export const toolsMetadata = {
  'scam-detector': {
    name: 'Scam Detector',
    description: 'Learn to identify and avoid online scams',
    icon: '🕵️',
    difficulty: 'medium',
    duration: '15-20 minutes',
    skills: ['scam-detection', 'critical-thinking', 'online-safety']
  },
  'cookie-monster-tracker': {
    name: 'Cookie Monster Tracker',
    description: 'Understand how websites track you with cookies',
    icon: '🍪',
    difficulty: 'medium',
    duration: '10-15 minutes',
    skills: ['tracking', 'privacy', 'web-technology']
  },
  'social-media-scanner': {
    name: 'Social Media Scanner',
    description: 'Analyze social media posts for privacy risks',
    icon: '📱',
    difficulty: 'medium',
    duration: '15-20 minutes',
    skills: ['social-media', 'privacy-settings', 'content-analysis']
  }
};