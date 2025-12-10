-- Fix RLS Performance Issues
-- Replaces auth.uid() and auth.role() with (select auth.uid()) and (select auth.role())
-- to prevent re-evaluation for each row, improving query performance at scale
-- Reference: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

-- ============================================
-- 1. Fix Stripe Tables RLS Policies
-- ============================================
-- First, we need to identify the correct column names by checking existing policies

-- Helper function to get column name from existing policy
DO $$
DECLARE
    v_stripe_customers_col TEXT;
    v_stripe_subscriptions_col TEXT;
    v_stripe_orders_col TEXT;
    v_policy_def TEXT;
BEGIN
    -- For stripe_customers: Get column from existing policy or check table structure
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stripe_customers') THEN
        -- Try to get from existing policy
        SELECT pg_get_expr(p.polqual, p.polrelid) INTO v_policy_def
        FROM pg_policy p
        JOIN pg_class c ON p.polrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname = 'public' 
        AND c.relname = 'stripe_customers' 
        AND p.polname = 'Users can view their own customer data'
        LIMIT 1;
        
        -- Extract column name or check table structure
        IF v_policy_def IS NOT NULL AND v_policy_def ~ 'auth\.uid\(\)\s*=\s*(\w+)' THEN
            v_stripe_customers_col := (regexp_match(v_policy_def, 'auth\.uid\(\)\s*=\s*(\w+)'))[1];
        ELSIF v_policy_def IS NOT NULL AND v_policy_def ~ '(\w+)\s*=\s*auth\.uid\(\)' THEN
            v_stripe_customers_col := (regexp_match(v_policy_def, '(\w+)\s*=\s*auth\.uid\(\)'))[1];
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_customers' AND column_name = 'user_id') THEN
            v_stripe_customers_col := 'user_id';
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_customers' AND column_name = 'customer_id') THEN
            v_stripe_customers_col := 'customer_id';
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_customers' AND column_name = 'auth_user_id') THEN
            v_stripe_customers_col := 'auth_user_id';
        ELSE
            RAISE NOTICE 'Could not determine column for stripe_customers, skipping';
            v_stripe_customers_col := NULL;
        END IF;
        
        -- Verify column exists before creating policy
        IF v_stripe_customers_col IS NOT NULL THEN
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_customers' AND column_name = v_stripe_customers_col) THEN
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.stripe_customers', 'Users can view their own customer data');
                EXECUTE format('CREATE POLICY %I ON public.stripe_customers FOR SELECT USING ((select auth.uid()) = %I)', 
                    'Users can view their own customer data', v_stripe_customers_col);
            ELSE
                RAISE NOTICE 'Column % does not exist in stripe_customers, skipping policy creation', v_stripe_customers_col;
            END IF;
        END IF;
    END IF;
    
    -- For stripe_subscriptions
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stripe_subscriptions') THEN
        SELECT pg_get_expr(p.polqual, p.polrelid) INTO v_policy_def
        FROM pg_policy p
        JOIN pg_class c ON p.polrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname = 'public' 
        AND c.relname = 'stripe_subscriptions' 
        AND p.polname = 'Users can view their own subscription data'
        LIMIT 1;
        
        IF v_policy_def IS NOT NULL AND v_policy_def ~ 'auth\.uid\(\)\s*=\s*(\w+)' THEN
            v_stripe_subscriptions_col := (regexp_match(v_policy_def, 'auth\.uid\(\)\s*=\s*(\w+)'))[1];
        ELSIF v_policy_def IS NOT NULL AND v_policy_def ~ '(\w+)\s*=\s*auth\.uid\(\)' THEN
            v_stripe_subscriptions_col := (regexp_match(v_policy_def, '(\w+)\s*=\s*auth\.uid\(\)'))[1];
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_subscriptions' AND column_name = 'user_id') THEN
            v_stripe_subscriptions_col := 'user_id';
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_subscriptions' AND column_name = 'customer_id') THEN
            v_stripe_subscriptions_col := 'customer_id';
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_subscriptions' AND column_name = 'auth_user_id') THEN
            v_stripe_subscriptions_col := 'auth_user_id';
        ELSE
            RAISE NOTICE 'Could not determine column for stripe_subscriptions, skipping';
            v_stripe_subscriptions_col := NULL;
        END IF;
        
        -- Verify column exists before creating policy
        -- Note: stripe_subscriptions might use a subquery through stripe_customers
        IF v_stripe_subscriptions_col IS NOT NULL THEN
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_subscriptions' AND column_name = v_stripe_subscriptions_col) THEN
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.stripe_subscriptions', 'Users can view their own subscription data');
                EXECUTE format('CREATE POLICY %I ON public.stripe_subscriptions FOR SELECT USING ((select auth.uid()) = %I)', 
                    'Users can view their own subscription data', v_stripe_subscriptions_col);
            ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_subscriptions' AND column_name = 'customer_id') THEN
                -- Handle case where policy uses subquery through stripe_customers - fix auth.uid() in subquery
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.stripe_subscriptions', 'Users can view their own subscription data');
                EXECUTE format('CREATE POLICY %I ON public.stripe_subscriptions FOR SELECT USING (customer_id IN (SELECT customer_id FROM stripe_customers WHERE (user_id = (select auth.uid())) AND deleted_at IS NULL) AND deleted_at IS NULL)', 
                    'Users can view their own subscription data');
            ELSE
                RAISE NOTICE 'Could not determine structure for stripe_subscriptions, skipping policy creation';
            END IF;
        ELSIF v_policy_def IS NOT NULL AND v_policy_def LIKE '%stripe_customers%' THEN
            -- Policy uses subquery through stripe_customers - fix it
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_subscriptions' AND column_name = 'customer_id') THEN
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.stripe_subscriptions', 'Users can view their own subscription data');
                EXECUTE format('CREATE POLICY %I ON public.stripe_subscriptions FOR SELECT USING (customer_id IN (SELECT customer_id FROM stripe_customers WHERE (user_id = (select auth.uid())) AND deleted_at IS NULL) AND deleted_at IS NULL)', 
                    'Users can view their own subscription data');
            END IF;
        END IF;
    END IF;
    
    -- For stripe_orders
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stripe_orders') THEN
        SELECT pg_get_expr(p.polqual, p.polrelid) INTO v_policy_def
        FROM pg_policy p
        JOIN pg_class c ON p.polrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname = 'public' 
        AND c.relname = 'stripe_orders' 
        AND p.polname = 'Users can view their own order data'
        LIMIT 1;
        
        IF v_policy_def IS NOT NULL AND v_policy_def ~ 'auth\.uid\(\)\s*=\s*(\w+)' THEN
            v_stripe_orders_col := (regexp_match(v_policy_def, 'auth\.uid\(\)\s*=\s*(\w+)'))[1];
        ELSIF v_policy_def IS NOT NULL AND v_policy_def ~ '(\w+)\s*=\s*auth\.uid\(\)' THEN
            v_stripe_orders_col := (regexp_match(v_policy_def, '(\w+)\s*=\s*auth\.uid\(\)'))[1];
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_orders' AND column_name = 'user_id') THEN
            v_stripe_orders_col := 'user_id';
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_orders' AND column_name = 'customer_id') THEN
            v_stripe_orders_col := 'customer_id';
        ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_orders' AND column_name = 'auth_user_id') THEN
            v_stripe_orders_col := 'auth_user_id';
        ELSE
            RAISE NOTICE 'Could not determine column for stripe_orders, skipping';
            v_stripe_orders_col := NULL;
        END IF;
        
        -- Verify column exists before creating policy
        -- Note: stripe_orders might use a subquery through stripe_customers
        IF v_stripe_orders_col IS NOT NULL THEN
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_orders' AND column_name = v_stripe_orders_col) THEN
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.stripe_orders', 'Users can view their own order data');
                EXECUTE format('CREATE POLICY %I ON public.stripe_orders FOR SELECT USING ((select auth.uid()) = %I)', 
                    'Users can view their own order data', v_stripe_orders_col);
            ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_orders' AND column_name = 'customer_id') THEN
                -- Handle case where policy uses subquery through stripe_customers - fix auth.uid() in subquery
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.stripe_orders', 'Users can view their own order data');
                EXECUTE format('CREATE POLICY %I ON public.stripe_orders FOR SELECT USING (customer_id IN (SELECT customer_id FROM stripe_customers WHERE (user_id = (select auth.uid())) AND deleted_at IS NULL) AND deleted_at IS NULL)', 
                    'Users can view their own order data');
            ELSE
                RAISE NOTICE 'Could not determine structure for stripe_orders, skipping policy creation';
            END IF;
        ELSIF v_policy_def IS NOT NULL AND v_policy_def LIKE '%stripe_customers%' THEN
            -- Policy uses subquery through stripe_customers - fix it
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stripe_orders' AND column_name = 'customer_id') THEN
                EXECUTE format('DROP POLICY IF EXISTS %I ON public.stripe_orders', 'Users can view their own order data');
                EXECUTE format('CREATE POLICY %I ON public.stripe_orders FOR SELECT USING (customer_id IN (SELECT customer_id FROM stripe_customers WHERE (user_id = (select auth.uid())) AND deleted_at IS NULL) AND deleted_at IS NULL)', 
                    'Users can view their own order data');
            END IF;
        END IF;
    END IF;
END $$;

-- ============================================
-- 2. Fix pandagarde_search_content RLS Policies
-- ============================================

-- Fix "Allow admin delete search content"
DROP POLICY IF EXISTS "Allow admin delete search content" ON public.pandagarde_search_content;
CREATE POLICY "Allow admin delete search content" 
ON public.pandagarde_search_content FOR DELETE 
USING ((select auth.role()) = 'service_role');

-- Fix "Allow admin insert search content"
DROP POLICY IF EXISTS "Allow admin insert search content" ON public.pandagarde_search_content;
CREATE POLICY "Allow admin insert search content" 
ON public.pandagarde_search_content FOR INSERT 
WITH CHECK ((select auth.role()) = 'service_role');

-- Fix "Allow admin update search content"
DROP POLICY IF EXISTS "Allow admin update search content" ON public.pandagarde_search_content;
CREATE POLICY "Allow admin update search content" 
ON public.pandagarde_search_content FOR UPDATE 
USING ((select auth.role()) = 'service_role');

-- ============================================
-- 3. Fix pandagarde_user_preferences RLS Policies
-- ============================================

-- Fix "Users can insert their own preferences"
DROP POLICY IF EXISTS "Users can insert their own preferences" ON public.pandagarde_user_preferences;
CREATE POLICY "Users can insert their own preferences" 
ON public.pandagarde_user_preferences FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

-- Fix "Users can update their own preferences"
DROP POLICY IF EXISTS "Users can update their own preferences" ON public.pandagarde_user_preferences;
CREATE POLICY "Users can update their own preferences" 
ON public.pandagarde_user_preferences FOR UPDATE 
USING ((select auth.uid()) = user_id);

-- Fix "Users can view their own preferences"
DROP POLICY IF EXISTS "Users can view their own preferences" ON public.pandagarde_user_preferences;
CREATE POLICY "Users can view their own preferences" 
ON public.pandagarde_user_preferences FOR SELECT 
USING ((select auth.uid()) = user_id);

-- ============================================
-- 4. Fix pandagarde_contact_submissions RLS Policies
-- ============================================

-- Fix "Allow admin read access"
DROP POLICY IF EXISTS "Allow admin read access" ON public.pandagarde_contact_submissions;
CREATE POLICY "Allow admin read access" 
ON public.pandagarde_contact_submissions FOR SELECT 
USING ((select auth.role()) = 'service_role');

-- ============================================
-- 5. Fix pandagarde_download_tracking RLS Policies
-- ============================================

-- Fix "Users can view their own downloads"
DROP POLICY IF EXISTS "Users can view their own downloads" ON public.pandagarde_download_tracking;
CREATE POLICY "Users can view their own downloads" 
ON public.pandagarde_download_tracking FOR SELECT 
USING ((select auth.uid()) = user_id OR user_id IS NULL);
