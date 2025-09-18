#!/usr/bin/env node

/**
 * Migration Content Display Script
 * 
 * This script displays the content of each migration file
 * for easy copying and pasting into Supabase Dashboard.
 */

import fs from 'fs';

console.log('🐼 PandaGarde Migration Files Content\n');

const migrationDir = 'supabase/migrations';
const migrationFiles = fs.readdirSync(migrationDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

migrationFiles.forEach((file, index) => {
    const filePath = `${migrationDir}/${file}`;
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📄 MIGRATION ${index + 1}: ${file}`);
    console.log(`${'='.repeat(80)}`);
    console.log(content);
    console.log(`\n${'='.repeat(80)}`);
    console.log(`✅ End of ${file}`);
    console.log(`${'='.repeat(80)}\n`);
});

console.log('📋 Instructions:');
console.log('1. Copy each migration content above');
console.log('2. Go to Supabase Dashboard > SQL Editor');
console.log('3. Paste and execute each migration in order');
console.log('4. Verify all tables are created');
console.log('5. Check RLS policies are enabled');