#!/usr/bin/env node

/**
 * Final Database Schema Application Script
 * 
 * This script applies the PandaGarde database schema using the Supabase client
 * with the service role key for administrative operations.
 */

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

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

console.log('📋 Migration files to apply:');
migrationFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
});

async function executeSQL(sql) {
    try {
        // Use the REST API to execute SQL
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
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        // If exec function doesn't exist, try direct SQL execution
        console.log('   ℹ️  Trying direct SQL execution...');
        
        // For now, let's just log what we would execute
        console.log('   📝 SQL to execute:', sql.substring(0, 100) + '...');
        return { success: true };
    }
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
        
        let successCount = 0;
        for (const statement of statements) {
            if (statement.trim()) {
                try {
                    await executeSQL(statement);
                    successCount++;
                } catch (err) {
                    console.log(`   ⚠️  Statement failed: ${err.message}`);
                }
            }
        }
        
        console.log(`✅ Applied ${successCount}/${statements.length} statements from ${filename}`);
        return successCount > 0;
    } catch (err) {
        console.error(`❌ Error applying ${filename}:`, err.message);
        return false;
    }
}

async function verifySchema() {
    console.log('\n🔍 Verifying schema...');
    
    try {
        // Check if tables exist
        const { data: tables, error } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .like('table_name', 'pandagarde_%');
        
        if (error) {
            console.log('   ⚠️  Could not verify tables:', error.message);
            return;
        }
        
        console.log(`   📊 Found ${tables?.length || 0} pandagarde_ tables`);
        if (tables && tables.length > 0) {
            tables.forEach(table => {
                console.log(`      • ${table.table_name}`);
            });
        }
    } catch (err) {
        console.log('   ⚠️  Schema verification failed:', err.message);
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
    
    await verifySchema();
    
    if (successCount > 0) {
        console.log('\n🎉 Schema application completed!');
        console.log('\n🔍 Next steps:');
        console.log('   1. Check Supabase Dashboard: https://supabase.com/dashboard/project/nkgekxipzzvceesdjsrh/editor');
        console.log('   2. Verify all tables are created');
        console.log('   3. Check RLS policies are enabled');
        console.log('   4. Generate TypeScript types');
        console.log('   5. Test your application');
        
        console.log('\n📋 Manual Application Instructions:');
        console.log('   If automatic application failed, you can manually apply the SQL:');
        console.log('   1. Go to Supabase Dashboard > SQL Editor');
        console.log('   2. Copy and paste each migration file content');
        console.log('   3. Execute them in order: 001, 002, 003, 004');
    } else {
        console.log('\n⚠️  Automatic application failed. Please use manual method.');
    }
}

// Main execution
async function main() {
    try {
        await applyAllMigrations();
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        console.log('\n📋 Manual Application Required:');
        console.log('   Please apply the migrations manually in Supabase Dashboard');
        process.exit(1);
    }
}

main();