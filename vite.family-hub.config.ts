import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'path';

// Conditionally import image optimizer only if sharp is available
let ViteImageOptimizer: any = null;
try {
  import('sharp');
  import('vite-plugin-image-optimizer').then((imageOptimizer) => {
    ViteImageOptimizer = imageOptimizer.ViteImageOptimizer || imageOptimizer.default;
  });
} catch (e) {
  // Silently skip if sharp is not available
}

// Plugin to handle optional dependencies
const optionalDependenciesPlugin = () => ({
  name: 'optional-dependencies',
  resolveId(id: string) {
    if (id === '@emailjs/browser') {
      return { id, external: true };
    }
    return null;
  },
});

// Helper function to safely get environment variables
const getEnvVar = (key: string): string | undefined => {
  try {
    return process.env[key];
  } catch {
    return undefined;
  }
};

// Vite config specifically for Family Hub standalone build
export default defineConfig({
  root: '.',
  plugins: [
    react(),
    optionalDependenciesPlugin(),
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
    // Image optimization plugin - only add if sharp is available
    ...(ViteImageOptimizer ? [
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { quality: 80 },
        avif: { quality: 80 },
      })
    ] : []),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Don't clear dist if main build exists
    rollupOptions: {
      input: {
        'family-hub': path.resolve(__dirname, 'family-hub.html'),
      },
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
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('@sentry')) {
              return 'monitoring-vendor';
            }
            return 'vendor';
          }
          
          // Family Hub specific chunks
          if (id.includes('/src/pages/family-hub/')) {
            return 'pages-family-hub';
          }
          if (id.includes('/src/components/FamilyDashboard') || 
              id.includes('/src/components/ChildProgressDetail') ||
              id.includes('/src/components/FeedbackForm')) {
            return 'components-family-hub';
          }
          if (id.includes('/src/contexts/FamilyProgressContext')) {
            return 'context-family-progress';
          }
          
          // Context and hooks chunk
          if (id.includes('/src/contexts/') || id.includes('/src/hooks/')) {
            return 'state-management';
          }
          
          // Library utilities chunk
          if (id.includes('/src/lib/')) {
            return 'utilities';
          }
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'images/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(extType || '')) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    reportCompressedSize: false
  }
});

