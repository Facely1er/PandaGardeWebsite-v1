// Cybersecurity Education Tools for Kids
// Interactive tools to teach online safety and privacy

export { default as PersonalInfoSorter } from './PersonalInfoSorter';
export { default as StrangerChatSimulator } from './StrangerChatSimulator';
export { default as ScamDetector } from './ScamDetector';
export { default as CookieMonsterTracker } from './CookieMonsterTracker';

// Tool metadata for easy integration
export const TOOLS_METADATA = {
  personalInfoSorter: {
    name: 'Personal Information Sorter',
    description: 'Interactive drag-and-drop game to learn what information is safe to share online',
    ageRange: '5-8',
    icon: '🛡️',
    category: 'Privacy Basics',
    features: ['Drag & Drop', 'Score Tracking', 'Parent Tips', 'Animations']
  },
  strangerChatSimulator: {
    name: 'Stranger Chat Simulator',
    description: 'Safe environment to practice responding to strangers online',
    ageRange: '5-8',
    icon: '💬',
    category: 'Online Safety',
    features: ['10+ Scenarios', 'Safe Responses', 'Red Flag Detection', 'Branching Paths']
  },
  scamDetector: {
    name: 'Scam Detector',
    description: 'Learn to identify scams in emails, messages, websites, and game chats',
    ageRange: '9-12',
    icon: '🔍',
    category: 'Scam Awareness',
    features: ['20+ Scenarios', 'Investigation Tools', 'Red Flag Learning', 'Real Examples']
  },
  cookieMonsterTracker: {
    name: 'Cookie Monster Tracker',
    description: 'Visualize website tracking with animated cookie jar and game mechanics',
    ageRange: '9-12',
    icon: '🍪',
    category: 'Privacy Tracking',
    features: ['Cookie Types', 'Animated Jar', 'Game Mechanics', 'Educational Content']
  }
};

// Tool categories for organization
export const TOOL_CATEGORIES = {
  'Privacy Basics': ['personalInfoSorter'],
  'Online Safety': ['strangerChatSimulator'],
  'Scam Awareness': ['scamDetector'],
  'Privacy Tracking': ['cookieMonsterTracker']
};

// Age-appropriate tool recommendations
export const AGE_RECOMMENDATIONS = {
  '5-8': ['personalInfoSorter', 'strangerChatSimulator'],
  '9-12': ['scamDetector', 'cookieMonsterTracker'],
  'all': ['personalInfoSorter', 'strangerChatSimulator', 'scamDetector', 'cookieMonsterTracker']
};