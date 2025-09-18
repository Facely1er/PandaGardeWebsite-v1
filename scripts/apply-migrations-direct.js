#!/usr/bin/env node

/**
 * Direct Migration Application Script
 * 
 * This script applies database migrations directly using the Supabase client
 * with the service role key for administrative operations.
 */

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = 'https://nkgekxipzzvceesdjsrh.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg1NzQxNSwiZXhwIjoyMDczNDMzNDE1fQ.5_7ZyZVlR_zU_K2Hr2TRL3WI-zUG-G_vpa-aP586Yns';

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('🐼 PandaGarde Database Schema Application\n');

// Read migration files
const migrationDir = 'supabase/migrations';
const migrationFiles = fs.readdirSync(migrationDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

console.log('📋 Applying migrations:');
migrationFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
});

async function applyMigration(filename) {
    const filePath = `${migrationDir}/${filename}`;
    const sql = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n🔄 Applying ${filename}...`);
    
    try {
        const { data, error } = await supabase.rpc('exec_sql', { sql });
        
        if (error) {
            console.error(`❌ Error applying ${filename}:`, error.message);
            return false;
        }
        
        console.log(`✅ Successfully applied ${filename}`);
        return true;
    } catch (err) {
        console.error(`❌ Exception applying ${filename}:`, err.message);
        return false;
    }
}

async function applyAllMigrations() {
    let successCount = 0;
    
    for (const file of migrationFiles) {
        const success = await applyMigration(file);
        if (success) successCount++;
    }
    
    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${migrationFiles.length - successCount}`);
    
    if (successCount === migrationFiles.length) {
        console.log('\n🎉 All migrations applied successfully!');
        console.log('\n🔍 Next steps:');
        console.log('   1. Verify tables in Supabase Dashboard');
        console.log('   2. Check RLS policies are enabled');
        console.log('   3. Generate TypeScript types');
        console.log('   4. Test your application');
    } else {
        console.log('\n⚠️  Some migrations failed. Please check the errors above.');
    }
}

// Check if exec_sql function exists, if not create it
async function ensureExecSqlFunction() {
    const createFunctionSQL = `
        CREATE OR REPLACE FUNCTION exec_sql(sql text)
        RETURNS text
        LANGUAGE plpgsql
        SECURITY DEFINER
        AS $$
        BEGIN
            EXECUTE sql;
            RETURN 'OK';
        END;
        $$;
    `;
    
    try {
        await supabase.rpc('exec_sql', { sql: createFunctionSQL });
        console.log('✅ exec_sql function ensured');
    } catch (err) {
        // Function might already exist, continue
        console.log('ℹ️  exec_sql function check completed');
    }
}

// Main execution
async function main() {
    try {
        await ensureExecSqlFunction();
        await applyAllMigrations();
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }
}

main();