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
    schemaname,
    tablename,
    policyname,
    pg_get_expr(polqual, polrelid) as using_expression,
    pg_get_expr(polwithcheck, polrelid) as with_check_expression
FROM pg_policy
WHERE schemaname = 'public'
AND tablename IN ('stripe_customers', 'stripe_subscriptions', 'stripe_orders')
ORDER BY tablename, policyname;

