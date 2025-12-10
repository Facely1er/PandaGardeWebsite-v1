// Verify RLS performance fix was applied correctly
import pg from 'pg';
import { fileURLToPath } from 'url';

const { Client } = pg;

const DATABASE_URL = 'postgresql://postgres:K1551d0ug0u@db.nkgekxipzzvceesdjsrh.supabase.co:5432/postgres';

async function verifyRLSFix() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('🔍 Verifying RLS policies...\n');

    const policiesResult = await client.query(`
      SELECT 
        c.relname as table_name,
        p.polname as policy_name,
        pg_get_expr(p.polqual, p.polrelid) as using_expression,
        pg_get_expr(p.polwithcheck, p.polrelid) as with_check_expression
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

    console.log('📊 RLS Policy Status:\n');
    let optimizedCount = 0;
    let needsFixCount = 0;

    policiesResult.rows.forEach(row => {
      const usingExpr = row.using_expression || '';
      const checkExpr = row.with_check_expression || '';
      const combinedExpr = usingExpr + ' ' + checkExpr;
      
      const isOptimized = combinedExpr.includes('(select auth.uid())') || 
                         combinedExpr.includes('(select auth.role())');
      
      const needsFix = combinedExpr.includes('auth.uid()') && !combinedExpr.includes('(select auth.uid())') ||
                      combinedExpr.includes('auth.role()') && !combinedExpr.includes('(select auth.role())');
      
      if (isOptimized) {
        optimizedCount++;
        console.log(`✅ ${row.table_name}.${row.policy_name}`);
      } else if (needsFix) {
        needsFixCount++;
        console.log(`❌ ${row.table_name}.${row.policy_name}`);
        console.log(`   Expression: ${usingExpr || checkExpr}`);
      } else {
        console.log(`ℹ️  ${row.table_name}.${row.policy_name}`);
        if (usingExpr) console.log(`   Using: ${usingExpr}`);
        if (checkExpr) console.log(`   With Check: ${checkExpr}`);
      }
    });

    console.log(`\n📈 Summary:`);
    console.log(`   ✅ Optimized: ${optimizedCount}`);
    console.log(`   ❌ Needs Fix: ${needsFixCount}`);
    console.log(`   ℹ️  Other: ${policiesResult.rows.length - optimizedCount - needsFixCount}`);

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verifyRLSFix();

