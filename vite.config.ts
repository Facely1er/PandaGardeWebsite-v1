import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      // Only add Sentry plugin if environment variables are available
      ...(env.VITE_SENTRY_ORG && env.VITE_SENTRY_PROJECT && env.VITE_SENTRY_AUTH_TOKEN ? [
        sentryVitePlugin({
          org: env.VITE_SENTRY_ORG,
          project: env.VITE_SENTRY_PROJECT,
          authToken: env.VITE_SENTRY_AUTH_TOKEN,
          sourcemaps: {
            assets: './dist/**',
          },
          telemetry: false,
        })
      ] : []),
      // Image optimization plugin
      ViteImageOptimizer({
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
        },
        jpg: {
          quality: 80,
        },
        webp: {
          quality: 80,
        },
        avif: {
          quality: 80,
        },
      }),
    ],
    base: env.VITE_BASE_PATH || '/',
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
    publicDir: 'public',
    build: {
      sourcemap: mode === 'production',
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
    },
    server: {
      port: 3000,
      host: true
    },
    preview: {
      port: 3000,
      host: true
    }
  };
});
