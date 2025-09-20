// Ages 5-8 Tools
export { default as PersonalInfoSorter } from './PersonalInfoSorter';
export { default as StrangerChatSimulator } from './StrangerChatSimulator';

// Tool metadata
export const toolsMetadata = {
  'personal-info-sorter': {
    name: 'Personal Info Sorter',
    description: 'Learn what information is safe to share and what to keep private',
    icon: '🔒',
    difficulty: 'easy',
    duration: '5-10 minutes',
    skills: ['privacy', 'personal-information', 'safety']
  },
  'stranger-chat-simulator': {
    name: 'Stranger Chat Simulator',
    description: 'Practice safe conversations with strangers online',
    icon: '💬',
    difficulty: 'easy',
    duration: '10-15 minutes',
    skills: ['stranger-danger', 'online-safety', 'communication']
  }
};