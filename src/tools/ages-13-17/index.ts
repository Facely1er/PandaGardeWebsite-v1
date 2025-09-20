// Ages 13-17 Tools
export { default as AppPermissionsAnalyzer } from './AppPermissionsAnalyzer';
export { default as DigitalFootprintTimeline } from './DigitalFootprintTimeline';
export { default as FriendRequestAnalyzer } from './FriendRequestAnalyzer';

// Tool metadata
export const toolsMetadata = {
  'app-permissions-analyzer': {
    name: 'App Permissions Analyzer',
    description: 'Learn to evaluate app permissions and protect your privacy',
    icon: '📱',
    difficulty: 'hard',
    duration: '20-25 minutes',
    skills: ['app-permissions', 'privacy-analysis', 'mobile-security']
  },
  'digital-footprint-timeline': {
    name: 'Digital Footprint Timeline',
    description: 'Analyze your online activities and their impact on your reputation',
    icon: '👣',
    difficulty: 'hard',
    duration: '25-30 minutes',
    skills: ['digital-footprint', 'reputation-management', 'online-presence']
  },
  'friend-request-analyzer': {
    name: 'Friend Request Analyzer',
    description: 'Learn to evaluate friend requests and avoid fake accounts',
    icon: '👥',
    difficulty: 'medium',
    duration: '15-20 minutes',
    skills: ['friend-requests', 'account-verification', 'social-safety']
  }
};