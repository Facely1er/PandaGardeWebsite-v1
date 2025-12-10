// Run RLS performance fix migration
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection from DATABASE_CONFIG.md
const DATABASE_URL = 'postgresql://postgres:K1551d0ug0u@db.nkgekxipzzvceesdjsrh.supabase.co:5432/postgres';

async function runRLSFix() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting to Supabase database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'database', 'fix_rls_performance.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📝 Executing RLS performance fix migration...\n');

    // Execute the entire SQL file as one query (handles DO blocks properly)
    try {
      await client.query(sql);
      console.log('✅ Migration completed successfully!\n');
      
      // Verify policies were updated
      const policiesResult = await client.query(`
        SELECT 
          n.nspname as schema,
          c.relname as table_name,
          p.polname as policy_name,
          pg_get_expr(p.polqual, p.polrelid) as using_expression
        FROM pg_policy p
        JOIN pg_class c ON p.polrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname = 'public'
        AND (
          c.relname IN ('stripe_customers', 'stripe_subscriptions', 'stripe_orders',
                       'pandagarde_search_content', 'pandagarde_user_preferences',
                       'pandagarde_contact_submissions', 'pandagarde_download_tracking')
          OR p.polname LIKE '%Users can view%'
          OR p.polname LIKE '%Allow admin%'
        )
        ORDER BY c.relname, p.polname;
      `);

      console.log('📊 Updated RLS Policies:');
      policiesResult.rows.forEach(row => {
        const expr = row.using_expression || '';
        const isOptimized = expr.includes('(select auth.uid())') || expr.includes('(select auth.role())');
        const status = isOptimized ? '✅' : '⚠️';
        console.log(`  ${status} ${row.table_name}.${row.policy_name}`);
        if (isOptimized) {
          console.log(`     Expression: ${expr.substring(0, 80)}...`);
        }
      });

    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      if (error.position) {
        console.error(`   Error at position: ${error.position}`);
      }
      throw error;
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

runRLSFix();

