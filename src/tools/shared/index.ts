// Shared Tool Components
export { default as ToolWrapper } from './ToolWrapper';
export { default as ScoreDisplay } from './ScoreDisplay';
export { default as ProgressBar } from './ProgressBar';

// Shared utilities
export const toolUtils = {
  // Calculate score based on correct answers
  calculateScore: (correct: number, total: number, bonus: number = 0) => {
    const baseScore = Math.round((correct / total) * 100);
    return Math.min(baseScore + bonus, 100);
  },

  // Get difficulty color
  getDifficultyColor: (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  },

  // Format duration
  formatDuration: (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  },

  // Generate random ID
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  }
};