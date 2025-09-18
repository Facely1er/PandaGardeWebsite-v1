import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Helper function to safely get environment variables
const getEnvVar = (key: string): string | undefined => {
  try {
    return process.env[key];
  } catch {
    return undefined;
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Only add Sentry plugin if environment variables are available
    ...(getEnvVar('VITE_SENTRY_ORG') && getEnvVar('VITE_SENTRY_PROJECT') && getEnvVar('VITE_SENTRY_AUTH_TOKEN') ? [
      sentryVitePlugin({
        org: getEnvVar('VITE_SENTRY_ORG')!,
        project: getEnvVar('VITE_SENTRY_PROJECT')!,
        authToken: getEnvVar('VITE_SENTRY_AUTH_TOKEN')!,
        sourcemaps: {
          assets: './dist/**',
        },
        telemetry: false,
      })
    ] : []),
    // Image optimization plugin - re-enabled with proper configuration
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
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  publicDir: 'public',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('html2canvas') || id.includes('jspdf')) {
              return 'pdf-vendor';
            }
            if (id.includes('@sentry')) {
              return 'monitoring-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          
          // Activity components chunk
          if (id.includes('/src/components/activities/')) {
            return 'activities';
          }
          
          // Page components chunk
          if (id.includes('/src/pages/')) {
            return 'pages';
          }
          
          // Context and hooks chunk
          if (id.includes('/src/contexts/') || id.includes('/src/hooks/')) {
            return 'state-management';
          }
          
          // Library utilities chunk
          if (id.includes('/src/lib/')) {
            return 'utilities';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true
  }
});
