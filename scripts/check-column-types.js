// Check column types for Stripe tables
import pg from 'pg';

const { Client } = pg;

const DATABASE_URL = 'postgresql://postgres:K1551d0ug0u@db.nkgekxipzzvceesdjsrh.supabase.co:5432/postgres';

async function checkTypes() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    const result = await client.query(`
      SELECT 
        table_name,
        column_name,
        data_type,
        udt_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name IN ('stripe_customers', 'stripe_subscriptions', 'stripe_orders')
      AND column_name IN ('user_id', 'customer_id')
      ORDER BY table_name, column_name;
    `);
    
    console.log('Column Types:');
    result.rows.forEach(row => {
      console.log(`${row.table_name}.${row.column_name}: ${row.data_type} (${row.udt_name})`);
    });
    
    // Check existing policy
    const policyResult = await client.query(`
      SELECT 
        c.relname as table_name,
        p.polname as policy_name,
        pg_get_expr(p.polqual, p.polrelid) as using_expression
      FROM pg_policy p
      JOIN pg_class c ON p.polrelid = c.oid
      JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE n.nspname = 'public'
      AND c.relname IN ('stripe_customers', 'stripe_subscriptions', 'stripe_orders')
      AND p.polname LIKE '%Users can view%';
    `);
    
    console.log('\nExisting Policies:');
    policyResult.rows.forEach(row => {
      console.log(`\n${row.table_name}.${row.policy_name}:`);
      console.log(`  ${row.using_expression}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

checkTypes();

