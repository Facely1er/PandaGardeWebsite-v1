#!/usr/bin/env node

/**
 * Database Schema Application Script
 * 
 * This script helps apply the PandaGarde database schema to your Supabase project.
 * It provides step-by-step instructions and validation for the migration process.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🐼 PandaGarde Database Schema Application\n');

// Check if we're in the right directory
if (!fs.existsSync('supabase/migrations')) {
    console.error('❌ Error: supabase/migrations directory not found.');
    console.error('Please run this script from the project root directory.');
    process.exit(1);
}

// List all migration files
const migrationDir = 'supabase/migrations';
const migrationFiles = fs.readdirSync(migrationDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

console.log('📋 Migration files found:');
migrationFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
});

console.log('\n🔧 Database Schema Overview:');
console.log('   • Initial Schema (001): Core tables with pandagarde_ prefix');
console.log('   • RLS Policies (002): Row Level Security for data isolation');
console.log('   • Family Management (003): Multi-user family system');
console.log('   • Search Content (004): Dynamic search content management');

console.log('\n🚀 Next Steps:');
console.log('\n1. Authenticate with Supabase:');
console.log('   npx supabase login');
console.log('\n2. Link to your project (if not already linked):');
console.log('   npx supabase link --project-ref YOUR_PROJECT_REF');
console.log('\n3. Apply migrations to remote database:');
console.log('   npx supabase db push');
console.log('\n4. Generate TypeScript types:');
console.log('   npx supabase gen types typescript --project-ref YOUR_PROJECT_REF > src/lib/database.types.ts');
console.log('\n5. Verify the schema in Supabase Dashboard:');
console.log('   https://supabase.com/dashboard/project/YOUR_PROJECT_REF/editor');

console.log('\n📊 Schema Details:');
console.log('\nCore Tables:');
console.log('   • pandagarde_users - User profiles and authentication');
console.log('   • pandagarde_activities - User activity tracking');
console.log('   • pandagarde_progress - Learning progress tracking');
console.log('   • pandagarde_contact_submissions - Contact form data');
console.log('   • pandagarde_newsletter_subscribers - Newsletter subscriptions');
console.log('   • pandagarde_download_tracking - Download analytics');
console.log('   • pandagarde_user_sessions - Session management');

console.log('\nFamily Management:');
console.log('   • pandagarde_families - Family groups');
console.log('   • pandagarde_family_members - Family member relationships');
console.log('   • pandagarde_family_invitations - Family invitation system');
console.log('   • pandagarde_family_achievements - Family achievements');

console.log('\nSearch & Content:');
console.log('   • pandagarde_search_categories - Content categories');
console.log('   • pandagarde_search_content - Searchable content items');
console.log('   • pandagarde_search_analytics - Search analytics');
console.log('   • pandagarde_search_suggestions - Search suggestions');

console.log('\n🔒 Security Features:');
console.log('   • Row Level Security (RLS) enabled on all tables');
console.log('   • User-specific data access policies');
console.log('   • Admin access controls for content management');
console.log('   • Public access for contact forms and downloads');
console.log('   • Project-specific table prefixes to avoid conflicts');

console.log('\n⚠️  Important Notes:');
console.log('   • All tables use "pandagarde_" prefix for project isolation');
console.log('   • RLS policies ensure data security and user privacy');
console.log('   • Admin emails are configured in RLS policies');
console.log('   • Contact forms and downloads work without authentication');
console.log('   • Family system supports multi-user scenarios');

console.log('\n✅ Ready to apply schema! Run the commands above to proceed.');
console.log('\nFor more details, see: DATABASE_SETUP.md');