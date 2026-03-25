import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

// Conditionally import image optimizer only if sharp is available
let ViteImageOptimizer: any = null;
try {
  const require = createRequire(import.meta.url);
  require.resolve('sharp');
  const imageOptimizer = require('vite-plugin-image-optimizer');
  ViteImageOptimizer = imageOptimizer.ViteImageOptimizer || imageOptimizer.default;
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    optionalDependenciesPlugin(),
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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('react-router')) return 'router-vendor';
            if (id.includes('lucide-react')) return 'icons-vendor';
            if (id.includes('html2canvas') || id.includes('jspdf')) return 'pdf-vendor';
            return 'vendor';
          }
          if (id.includes('/src/tools/ages-5-8/')) return 'tools-ages-5-8';
          if (id.includes('/src/tools/ages-9-12/')) return 'tools-ages-9-12';
          if (id.includes('/src/tools/ages-13-17/')) return 'tools-ages-13-17';
          if (id.includes('/src/tools/shared/')) return 'tools-shared';
          if (id.includes('/src/components/activities/')) return 'activities';
          if (id.includes('/src/components/story/')) return 'story-components';
          if (id.includes('/src/pages/')) {
            if (id.includes('/src/pages/community/')) return 'pages-community';
            if (id.includes('/src/pages/family-hub/')) return 'pages-family-hub';
            if (id.includes('/src/pages/guides/')) return 'pages-guides';
            if (id.includes('DigitalFootprint')) return 'pages-digital-footprint';
            if (id.includes('ServiceCatalog')) return 'pages-service-catalog';
            if (id.includes('PrivacyAssessment') || id.includes('AssessmentHistory')) return 'pages-assessment';
            if (id.includes('FamilyHub') || id.includes('FamilyPrivacy')) return 'pages-family';
            if (id.includes('PrivacyExplorers') || id.includes('TeenHandbook') || id.includes('ActivityBook')) return 'pages-age-specific';
            return 'pages-other';
          }
          if (id.includes('/src/contexts/') || id.includes('/src/hooks/')) return 'state-management';
          if (id.includes('/src/lib/')) return 'utilities';
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) return 'images/[name]-[hash][extname]';
          if (/woff2?|eot|ttf|otf/i.test(extType || '')) return 'fonts/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    chunkSizeWarningLimit: 1500,
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    reportCompressedSize: false
  }
});
