#!/usr/bin/env node

/**
 * Migration Application via Supabase REST API
 * 
 * This script applies database migrations using the Supabase REST API
 * with the service role key for administrative operations.
 */

import fs from 'fs';

const supabaseUrl = 'https://nkgekxipzzvceesdjsrh.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg1NzQxNSwiZXhwIjoyMDczNDMzNDE1fQ.5_7ZyZVlR_zU_K2Hr2TRL3WI-zUG-G_vpa-aP586Yns';

console.log('🐼 PandaGarde Database Schema Application via API\n');

// Read migration files
const migrationDir = 'supabase/migrations';
const migrationFiles = fs.readdirSync(migrationDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

console.log('📋 Migration files found:');
migrationFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
});

async function executeSQL(sql) {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
            'apikey': serviceRoleKey
        },
        body: JSON.stringify({ sql })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return await response.json();
}

async function applyMigration(filename) {
    const filePath = `${migrationDir}/${filename}`;
    const sql = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n🔄 Applying ${filename}...`);
    
    try {
        // Split SQL into individual statements
        const statements = sql
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        for (const statement of statements) {
            if (statement.trim()) {
                await executeSQL(statement);
            }
        }
        
        console.log(`✅ Successfully applied ${filename}`);
        return true;
    } catch (err) {
        console.error(`❌ Error applying ${filename}:`, err.message);
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

// Main execution
async function main() {
    try {
        await applyAllMigrations();
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }
}

main();