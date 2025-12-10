-- Diagnostic query to find the correct column names in Stripe tables
-- Run this first to see what columns exist, then we can fix the migration

-- Check stripe_customers columns
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name IN ('stripe_customers', 'stripe_subscriptions', 'stripe_orders')
ORDER BY table_name, ordinal_position;

-- Check existing policy definitions
SELECT 
    n.nspname as schemaname,
    c.relname as tablename,
    p.polname as policyname,
    pg_get_expr(p.polqual, p.polrelid) as using_expression,
    pg_get_expr(p.polwithcheck, p.polrelid) as with_check_expression
FROM pg_policy p
JOIN pg_class c ON p.polrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE n.nspname = 'public'
AND c.relname IN ('stripe_customers', 'stripe_subscriptions', 'stripe_orders')
ORDER BY c.relname, p.polname;

