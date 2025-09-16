import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { viteImagemin } from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: import.meta.env.VITE_SENTRY_ORG,
      project: import.meta.env.VITE_SENTRY_PROJECT,
      authToken: import.meta.env.VITE_SENTRY_AUTH_TOKEN,
      sourcemaps: {
        assets: './dist/**',
      },
      telemetry: false,
    }),
    // Image optimization plugin
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
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
