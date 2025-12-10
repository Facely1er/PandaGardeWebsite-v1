import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// Conditionally import image optimizer only if sharp is available
let ViteImageOptimizer: any = null;
try {
  // Check if sharp is available
  require.resolve('sharp');
  const imageOptimizer = require('vite-plugin-image-optimizer');
  ViteImageOptimizer = imageOptimizer.ViteImageOptimizer || imageOptimizer.default;
} catch (e) {
  // Silently skip if sharp is not available - this is expected in some environments
  // Image optimization is optional and won't affect functionality
}

// Plugin to handle optional dependencies
const optionalDependenciesPlugin = () => ({
  name: 'optional-dependencies',
  resolveId(id: string) {
    // Make @emailjs/browser optional - return null so it's not bundled
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

// https://vitejs.dev/config/
export default defineConfig({
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
      })
    ] : []),
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
          
          // Age-specific tool chunks for better caching
          if (id.includes('/src/tools/ages-5-8/')) {
            return 'tools-ages-5-8';
          }
          if (id.includes('/src/tools/ages-9-12/')) {
            return 'tools-ages-9-12';
          }
          if (id.includes('/src/tools/ages-13-17/')) {
            return 'tools-ages-13-17';
          }
          if (id.includes('/src/tools/shared/')) {
            return 'tools-shared';
          }
          
          // Activity components chunk
          if (id.includes('/src/components/activities/')) {
            return 'activities';
          }
          
          // Story components chunk
          if (id.includes('/src/components/story/')) {
            return 'story-components';
          }
          
          // Split pages into smaller chunks for better loading
          if (id.includes('/src/pages/')) {
            // Split community pages
            if (id.includes('/src/pages/community/')) {
              return 'pages-community';
            }
            // Split family-hub pages
            if (id.includes('/src/pages/family-hub/')) {
              return 'pages-family-hub';
            }
            // Split guide pages
            if (id.includes('/src/pages/guides/')) {
              return 'pages-guides';
            }
            // Split main feature pages into separate chunks
            if (id.includes('DigitalFootprint')) {
              return 'pages-digital-footprint';
            }
            if (id.includes('ServiceCatalog')) {
              return 'pages-service-catalog';
            }
            if (id.includes('PrivacyAssessment') || id.includes('AssessmentHistory')) {
              return 'pages-assessment';
            }
            if (id.includes('FamilyHub') || id.includes('FamilyPrivacy')) {
              return 'pages-family';
            }
            // Split age-specific pages
            if (id.includes('PrivacyExplorers') || id.includes('TeenHandbook') || id.includes('ActivityBook')) {
              return 'pages-age-specific';
            }
            // Other pages
            return 'pages-other';
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
        // Optimize chunk naming for PWA caching
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
    chunkSizeWarningLimit: 1500, // Increased to accommodate feature-rich pages, but we'll optimize splitting
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    // PWA optimization settings
    assetsInlineLimit: 4096, // Inline small assets
    cssCodeSplit: true, // Split CSS for better caching
    reportCompressedSize: false // Disable compressed size reporting for faster builds
  }
});
