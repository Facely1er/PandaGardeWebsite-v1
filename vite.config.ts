import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  publicDir: 'public',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          icons: ['lucide-react'],
          activities: [
            './src/components/activities/ColoringActivity',
            './src/components/activities/DragDropActivity',
            './src/components/activities/MazeActivity',
            './src/components/activities/WordSearchActivity',
            './src/components/activities/ConnectDotsActivity',
            './src/components/activities/MatchingActivity'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
