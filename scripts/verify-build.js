#!/usr/bin/env node

/**
 * Build Verification Script
 * Verifies that the build process completed successfully
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying build output...');

const distPath = path.join(process.cwd(), 'dist');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('❌ dist directory not found');
  process.exit(1);
}

// Check for essential build files
const requiredFiles = [
  'index.html'
];

const missingFiles = [];

for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
}

// Check for assets directory and at least one CSS and JS file
const assetsPath = path.join(distPath, 'assets');
if (!fs.existsSync(assetsPath)) {
  missingFiles.push('assets/');
} else {
  const assetsFiles = fs.readdirSync(assetsPath);
  const hasCssFile = assetsFiles.some(file => file.endsWith('.css'));
  const hasJsFile = assetsFiles.some(file => file.endsWith('.js'));
  
  if (!hasCssFile) {
    missingFiles.push('assets/*.css');
  }
  if (!hasJsFile) {
    missingFiles.push('assets/*.js');
  }
}

if (missingFiles.length > 0) {
  console.error('❌ Missing required build files:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
}

// Check for source maps in production
const indexPath = path.join(distPath, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

if (indexContent.includes('sourceMappingURL')) {
  console.log('✅ Source maps found');
} else {
  console.log('ℹ️  No source maps found (this is normal for production builds)');
}

// Check build size
const stats = fs.statSync(distPath);
console.log(`✅ Build completed successfully`);
console.log(`   Build directory size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

console.log('🎉 Build verification passed!');