import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

// createRequire is needed in ESM context to use require.resolve
const require = createRequire(import.meta.url);

// Conditionally load image optimizer only if sharp is available
let ViteImageOptimizer: any = null;
try {
  require.resolve('sharp');
  const imageOptimizer = require('vite-plugin-image-optimizer');
  ViteImageOptimizer = imageOptimizer.ViteImageOptimizer || imageOptimizer.default;
} catch {
  // sharp not available — image optimization skipped
}

// Conditionally load Sentry vite plugin only when env vars are all present
async function loadSentryPlugin() {
  const org   = process.env['VITE_SENTRY_ORG'];
  const proj  = process.env['VITE_SENTRY_PROJECT'];
  const token = process.env['VITE_SENTRY_AUTH_TOKEN'];
  if (!org || !proj || !token) return null;
  try {
    const { sentryVitePlugin } = await import('@sentry/vite-plugin');
    return sentryVitePlugin({
      org,
      project: proj,
      authToken: token,
      sourcemaps: { assets: './dist-mobile/**' },
      telemetry: false,
    });
  } catch {
    return null;
  }
}

// Plugin to handle optional dependencies
const optionalDependenciesPlugin = () => ({
  name: 'optional-dependencies',
  resolveId(id: string) {
    if (id === '@emailjs/browser') return { id, external: true };
    return null;
  },
});

/**
 * After the bundle is written, rename family-hub.html → index.html so that
 * Capacitor's WebView finds the entry point at the standard index.html path.
 */
const renameHtmlForCapacitorPlugin = () => ({
  name: 'rename-html-for-capacitor',
  closeBundle() {
    const outDir = path.resolve(__dirname, 'dist-mobile');
    const src = path.join(outDir, 'family-hub.html');
    const dst = path.join(outDir, 'index.html');
    if (fs.existsSync(src)) {
      if (fs.existsSync(dst)) fs.unlinkSync(dst);
      fs.renameSync(src, dst);
      console.log('\n✓  Capacitor entry: dist-mobile/family-hub.html → dist-mobile/index.html\n');
    }
  },
});

export default defineConfig(async () => {
  const sentryPlugin = await loadSentryPlugin();

  return {
    root: '.',
    publicDir: 'public',
    plugins: [
      react(),
      optionalDependenciesPlugin(),
      ...(sentryPlugin ? [sentryPlugin] : []),
      ...(ViteImageOptimizer ? [ViteImageOptimizer({ png: { quality: 80 }, jpeg: { quality: 80 }, jpg: { quality: 80 }, webp: { quality: 80 }, avif: { quality: 80 } })] : []),
      renameHtmlForCapacitorPlugin(),
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
    build: {
      // Dedicated output dir for the Capacitor/Android build — kept separate from
      // the main website's dist/ so both can coexist without overwriting each other.
      outDir: 'dist-mobile',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          'family-hub': path.resolve(__dirname, 'family-hub.html'),
        },
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
              if (id.includes('react-router')) return 'router-vendor';
              if (id.includes('lucide-react')) return 'icons-vendor';
              if (id.includes('@sentry')) return 'monitoring-vendor';
              return 'vendor';
            }
            if (id.includes('/src/familyhub/screens/')) return 'app-screens';
            if (id.includes('/src/familyhub/components/')) return 'app-components';
            if (id.includes('/src/pages/family-hub/')) return 'pages-family-hub';
            if (id.includes('/src/components/FamilyDashboard') ||
                id.includes('/src/components/ChildProgressDetail') ||
                id.includes('/src/components/FeedbackForm')) return 'components-family-hub';
            if (id.includes('/src/contexts/FamilyProgressContext')) return 'context-family-progress';
            if (id.includes('/src/contexts/') || id.includes('/src/hooks/')) return 'state-management';
            if (id.includes('/src/lib/')) {
              if (id.includes('/src/lib/analytics') || id.includes('/src/lib/sentry')) return 'monitoring-utilities';
              if (id.includes('/src/lib/encryption')) return 'encryption-utilities';
              return 'utilities';
            }
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name?.split('.').pop();
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) return 'images/[name]-[hash][extname]';
            if (/woff2?|eot|ttf|otf/i.test(extType || '')) return 'fonts/[name]-[hash][extname]';
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: true,
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
  };
});
