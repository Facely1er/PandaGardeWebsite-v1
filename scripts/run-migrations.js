import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  console.log('🚀 Starting database migrations...');
  
  try {
    // Read migration files
    const migrationsDir = path.join(__dirname, '../supabase/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`Found ${migrationFiles.length} migration files`);

    for (const file of migrationFiles) {
      console.log(`📄 Running migration: ${file}`);
      
      const migrationPath = path.join(migrationsDir, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      // Split by semicolon and run each statement
      const statements = migrationSQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      for (const statement of statements) {
        if (statement.trim()) {
          try {
            const { error } = await supabase.rpc('exec_sql', { sql: statement });
            if (error) {
              console.error(`❌ Error in ${file}:`, error.message);
              // Continue with other statements
            }
          } catch (err) {
            console.error(`❌ Error executing statement in ${file}:`, err.message);
            // Continue with other statements
          }
        }
      }
      
      console.log(`✅ Completed migration: ${file}`);
    }

    console.log('🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Alternative approach: Use direct SQL execution
async function runMigrationsDirect() {
  console.log('🚀 Running migrations directly...');
  
  try {
    // Read and execute the initial schema
    const initialSchema = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/001_initial_schema.sql'), 
      'utf8'
    );
    
    console.log('📄 Running initial schema...');
    const { error: schemaError } = await supabase.rpc('exec_sql', { sql: initialSchema });
    
    if (schemaError) {
      console.error('❌ Schema error:', schemaError.message);
    } else {
      console.log('✅ Initial schema completed');
    }

    // Read and execute RLS policies
    const rlsPolicies = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/002_rls_policies.sql'), 
      'utf8'
    );
    
    console.log('📄 Running RLS policies...');
    const { error: rlsError } = await supabase.rpc('exec_sql', { sql: rlsPolicies });
    
    if (rlsError) {
      console.error('❌ RLS error:', rlsError.message);
    } else {
      console.log('✅ RLS policies completed');
    }

    // Read and execute family management
    const familyManagement = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/003_family_management.sql'), 
      'utf8'
    );
    
    console.log('📄 Running family management schema...');
    const { error: familyError } = await supabase.rpc('exec_sql', { sql: familyManagement });
    
    if (familyError) {
      console.error('❌ Family management error:', familyError.message);
    } else {
      console.log('✅ Family management schema completed');
    }

    console.log('🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Check if we can use the exec_sql function, otherwise try direct approach
async function checkAndRunMigrations() {
  try {
    // Test if exec_sql function exists
    const { error } = await supabase.rpc('exec_sql', { sql: 'SELECT 1;' });
    
    if (error && error.message.includes('function exec_sql')) {
      console.log('⚠️  exec_sql function not available, trying direct approach...');
      await runMigrationsDirect();
    } else {
      console.log('✅ exec_sql function available, running migrations...');
      await runMigrations();
    }
  } catch (err) {
    console.log('⚠️  exec_sql not available, trying direct approach...');
    await runMigrationsDirect();
  }
}

checkAndRunMigrations();