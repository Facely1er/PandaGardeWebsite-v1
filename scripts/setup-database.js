#!/usr/bin/env node

/**
 * Database Setup Script for PandaGarde
 * 
 * This script helps set up the database schema with proper differentiation
 * to avoid conflicts with other projects in the same Supabase instance.
 */

const fs = require('fs');
const path = require('path');

console.log('🐼 PandaGarde Database Setup');
console.log('============================\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('Please copy .env.example to .env.local and fill in your Supabase credentials.\n');
  process.exit(1);
}

// Read environment variables
require('dotenv').config({ path: envPath });

const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_DB_SCHEMA_PREFIX'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\nPlease update your .env.local file with the correct values.\n');
  process.exit(1);
}

console.log('✅ Environment variables configured');
console.log(`   Schema prefix: ${process.env.VITE_DB_SCHEMA_PREFIX}`);
console.log(`   Supabase URL: ${process.env.VITE_SUPABASE_URL}\n`);

// Check if Supabase CLI is installed
const { execSync } = require('child_process');

try {
  execSync('supabase --version', { stdio: 'pipe' });
  console.log('✅ Supabase CLI is installed');
} catch (error) {
  console.log('❌ Supabase CLI not found');
  console.log('Please install it: https://supabase.com/docs/guides/cli/getting-started\n');
  process.exit(1);
}

console.log('\n📋 Next Steps:');
console.log('1. Run migrations: supabase db push');
console.log('2. Start local development: supabase start');
console.log('3. Generate types: supabase gen types typescript --local > src/lib/database.types.ts');
console.log('\n🎉 Database setup complete!');