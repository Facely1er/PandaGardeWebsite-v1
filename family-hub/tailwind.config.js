/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Adventure Zone Colors
        'zone-forest': {
          light: '#d1fae5',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        'zone-castle': {
          light: '#ede9fe',
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed',
        },
        'zone-ocean': {
          light: '#dbeafe',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        'zone-volcano': {
          light: '#ffedd5',
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
        // Reward Colors
        'reward-gold': {
          light: '#fef3c7',
          DEFAULT: '#fbbf24',
          dark: '#f59e0b',
        },
        'reward-silver': {
          light: '#f1f5f9',
          DEFAULT: '#94a3b8',
          dark: '#64748b',
        },
        'reward-bronze': {
          light: '#fef3c7',
          DEFAULT: '#d97706',
          dark: '#b45309',
        },
        // Playful Accent Colors
        'candy-pink': '#ec4899',
        'electric-blue': '#06b6d4',
        'lime-pop': '#84cc16',
        'magic-purple': '#a855f7',
        'sunny-yellow': '#facc15',
        // XP/Level Colors
        'xp-bar': {
          from: '#fbbf24',
          to: '#f97316',
        },
      },
      backgroundImage: {
        // Zone Gradients
        'gradient-forest': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-castle': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'gradient-volcano': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        // Reward Gradients
        'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'gradient-silver': 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
        'gradient-bronze': 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        // XP Bar Gradient
        'gradient-xp': 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)',
        // Adventure Background
        'adventure-sky': 'linear-gradient(180deg, #7dd3fc 0%, #bae6fd 50%, #e0f2fe 100%)',
        'adventure-sunset': 'linear-gradient(180deg, #fcd34d 0%, #fb923c 30%, #f472b6 70%, #a78bfa 100%)',
        // Character Panel
        'gradient-character': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        // Dashboard Cards
        'gradient-stats': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'wiggle-slow': 'wiggle 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'pop-in': 'pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shake': 'shake 0.5s ease-in-out',
        'confetti': 'confetti 1s ease-out forwards',
        'star-spin': 'star-spin 1s ease-out',
        'level-up': 'level-up 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'path-draw': 'path-draw 1.5s ease-in-out forwards',
        'island-hover': 'island-hover 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' },
        },
        'star-spin': {
          '0%': { transform: 'rotate(0deg) scale(0)' },
          '50%': { transform: 'rotate(180deg) scale(1.5)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'level-up': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'path-draw': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'island-hover': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(1deg)' },
          '75%': { transform: 'translateY(-3px) rotate(-1deg)' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.5)',
        'glow-blue': '0 0 30px rgba(59, 130, 246, 0.5)',
        'glow-green': '0 0 30px rgba(16, 185, 129, 0.5)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.5)',
        'glow-gold': '0 0 30px rgba(251, 191, 36, 0.5)',
        'island': '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        'adventure': ['Fredoka', 'Comic Sans MS', 'cursive'],
        'playful': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
