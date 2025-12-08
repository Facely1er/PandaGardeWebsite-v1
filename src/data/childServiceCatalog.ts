/**
 * Child-Friendly Service Catalog
 * Age-appropriate apps and platforms that children commonly use
 * Includes privacy risk ratings and age recommendations
 */

export type ServiceCategory = 
  | 'social-media' 
  | 'messaging' 
  | 'gaming' 
  | 'streaming' 
  | 'education' 
  | 'creative' 
  | 'other';

export type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';

export type AgeGroup = '5-8' | '9-12' | '13-17';

export interface ChildService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  minAge: number; // Minimum recommended age
  riskLevel: RiskLevel;
  privacyConcerns: string[]; // Child-friendly explanations
  parentTips: string[]; // Tips for parents
  icon?: string; // Icon name or URL
  logoUrl?: string; // Service logo URL (will be generated from service ID)
  website?: string; // Official website
}

export const childServiceCatalog: ChildService[] = [
  // Social Media (13+)
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social-media',
    description: 'Photo and video sharing app',
    minAge: 13,
    riskLevel: 'high',
    privacyConcerns: [
      'Shares photos and videos publicly',
      'Can receive messages from strangers',
      'Location can be shared in photos'
    ],
    parentTips: [
      'Set account to private',
      'Review followers regularly',
      'Disable location sharing',
      'Monitor direct messages'
    ],
    website: 'https://www.instagram.com'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social-media',
    description: 'Short video sharing app',
    minAge: 13,
    riskLevel: 'very-high',
    privacyConcerns: [
      'Videos can go viral',
      'Comments from strangers',
      'Personal information in videos',
      'Addictive content'
    ],
    parentTips: [
      'Use Family Pairing feature',
      'Set screen time limits',
      'Enable Restricted Mode',
      'Review privacy settings'
    ],
    website: 'https://www.tiktok.com'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    category: 'social-media',
    description: 'Disappearing photo and video messages',
    minAge: 13,
    riskLevel: 'high',
    privacyConcerns: [
      'Messages "disappear" but can be saved',
      'Location sharing with friends',
      'Can receive snaps from strangers',
      'Screenshots can be taken'
    ],
    parentTips: [
      'Review friend list regularly',
      'Disable location sharing',
      'Set "Who can contact me" to Friends only',
      'Monitor Snap Map usage'
    ],
    website: 'https://www.snapchat.com'
  },
  
  // Messaging Apps
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'messaging',
    description: 'Text and video messaging app',
    minAge: 13,
    riskLevel: 'medium',
    privacyConcerns: [
      'Can message anyone with phone number',
      'Group chats can include strangers',
      'Read receipts show when messages are read'
    ],
    parentTips: [
      'Review contact list',
      'Set privacy to "My Contacts"',
      'Monitor group chats',
      'Disable read receipts if needed'
    ],
    website: 'https://www.whatsapp.com'
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'messaging',
    description: 'Chat app for gaming and communities',
    minAge: 13,
    riskLevel: 'high',
    privacyConcerns: [
      'Can join public servers with strangers',
      'Voice and video chat with unknown people',
      'Direct messages from anyone',
      'Inappropriate content in some servers'
    ],
    parentTips: [
      'Review server memberships',
      'Set privacy to "Friends Only"',
      'Monitor direct messages',
      'Use Safe Direct Messaging setting'
    ],
    website: 'https://discord.com'
  },
  
  // Gaming
  {
    id: 'roblox',
    name: 'Roblox',
    category: 'gaming',
    description: 'Online game creation and playing platform',
    minAge: 7,
    riskLevel: 'medium',
    privacyConcerns: [
      'Can chat with other players',
      'User-generated content may be inappropriate',
      'In-game purchases',
      'Can receive friend requests from strangers'
    ],
    parentTips: [
      'Enable Account Restrictions',
      'Set up Parent PIN',
      'Disable chat or set to Friends only',
      'Monitor spending'
    ],
    website: 'https://www.roblox.com'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    category: 'gaming',
    description: 'Building and adventure game',
    minAge: 7,
    riskLevel: 'low',
    privacyConcerns: [
      'Multiplayer servers can have strangers',
      'Chat with other players',
      'User-generated content'
    ],
    parentTips: [
      'Play on private servers',
      'Disable online multiplayer if needed',
      'Review server rules',
      'Monitor chat'
    ],
    website: 'https://www.minecraft.net'
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    category: 'gaming',
    description: 'Battle royale game',
    minAge: 12,
    riskLevel: 'medium',
    privacyConcerns: [
      'Voice chat with strangers',
      'In-game purchases',
      'Addictive gameplay',
      'Can receive friend requests'
    ],
    parentTips: [
      'Disable voice chat',
      'Set up Parental Controls',
      'Monitor play time',
      'Review friend requests'
    ],
    website: 'https://www.epicgames.com/fortnite'
  },
  
  // Streaming
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'streaming',
    description: 'Video sharing and watching platform',
    minAge: 13,
    riskLevel: 'high',
    privacyConcerns: [
      'Inappropriate content',
      'Comments from strangers',
      'Can upload videos publicly',
      'Recommended videos may be unsuitable'
    ],
    parentTips: [
      'Use YouTube Kids for younger children',
      'Enable Restricted Mode',
      'Monitor watch history',
      'Disable comments on uploads'
    ],
    website: 'https://www.youtube.com'
  },
  {
    id: 'youtube-kids',
    name: 'YouTube Kids',
    category: 'streaming',
    description: 'Child-friendly version of YouTube',
    minAge: 4,
    riskLevel: 'low',
    privacyConcerns: [
      'Some content may still be inappropriate',
      'Ads may not be age-appropriate'
    ],
    parentTips: [
      'Set content level',
      'Review watch history',
      'Block specific channels',
      'Set time limits'
    ],
    website: 'https://www.youtubekids.com'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'streaming',
    description: 'Movie and TV show streaming',
    minAge: 7,
    riskLevel: 'low',
    privacyConcerns: [
      'Viewing history tracked',
      'Recommendations based on viewing',
      'Some content may be inappropriate'
    ],
    parentTips: [
      'Set up Kids profile',
      'Review content ratings',
      'Monitor viewing history',
      'Set PIN for mature content'
    ],
    website: 'https://www.netflix.com'
  },
  
  // Education
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    category: 'education',
    description: 'Free educational videos and exercises',
    minAge: 5,
    riskLevel: 'low',
    privacyConcerns: [
      'Progress tracking',
      'Account creation required'
    ],
    parentTips: [
      'Review progress together',
      'Set learning goals',
      'Monitor account activity'
    ],
    website: 'https://www.khanacademy.org'
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    category: 'education',
    description: 'Language learning app',
    minAge: 6,
    riskLevel: 'low',
    privacyConcerns: [
      'Progress tracking',
      'Can add friends',
      'Leaderboards'
    ],
    parentTips: [
      'Review privacy settings',
      'Monitor friend requests',
      'Set learning goals'
    ],
    website: 'https://www.duolingo.com'
  },
  
  // Creative
  {
    id: 'scratch',
    name: 'Scratch',
    category: 'creative',
    description: 'Learn to code by creating games and animations',
    minAge: 8,
    riskLevel: 'low',
    privacyConcerns: [
      'Can share projects publicly',
      'Comments on projects',
      'Can follow other users'
    ],
    parentTips: [
      'Review shared projects',
      'Monitor comments',
      'Set privacy to "Unlisted" if needed'
    ],
    website: 'https://scratch.mit.edu'
  }
];

/**
 * Get services by category
 */
export const getServicesByCategory = (category: ServiceCategory): ChildService[] => {
  return childServiceCatalog.filter(service => service.category === category);
};

/**
 * Get services appropriate for age group
 */
export const getServicesByAge = (age: number): ChildService[] => {
  return childServiceCatalog.filter(service => service.minAge <= age);
};

/**
 * Get service by ID
 */
export const getServiceById = (id: string): ChildService | undefined => {
  return childServiceCatalog.find(service => service.id === id);
};

/**
 * Get risk level color
 */
export const getRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'low':
      return 'green';
    case 'medium':
      return 'yellow';
    case 'high':
      return 'orange';
    case 'very-high':
      return 'red';
    default:
      return 'gray';
  }
};

/**
 * Calculate risk score (0-100, higher = more risky)
 */
export const getRiskScore = (riskLevel: RiskLevel): number => {
  switch (riskLevel) {
    case 'low':
      return 25;
    case 'medium':
      return 50;
    case 'high':
      return 75;
    case 'very-high':
      return 90;
    default:
      return 0;
  }
};

