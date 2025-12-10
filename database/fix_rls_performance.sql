-- Fix RLS Performance Issues
-- Replaces auth.uid() and auth.role() with (select auth.uid()) and (select auth.role())
-- to prevent re-evaluation for each row, improving query performance at scale
-- Reference: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

-- ============================================
-- 1. Fix Stripe Tables RLS Policies
-- ============================================

-- Fix stripe_customers: "Users can view their own customer data"
DROP POLICY IF EXISTS "Users can view their own customer data" ON public.stripe_customers;
CREATE POLICY "Users can view their own customer data" 
ON public.stripe_customers FOR SELECT 
USING ((select auth.uid()) = user_id);

-- Fix stripe_subscriptions: "Users can view their own subscription data"
DROP POLICY IF EXISTS "Users can view their own subscription data" ON public.stripe_subscriptions;
CREATE POLICY "Users can view their own subscription data" 
ON public.stripe_subscriptions FOR SELECT 
USING ((select auth.uid()) = user_id);

-- Fix stripe_orders: "Users can view their own order data"
DROP POLICY IF EXISTS "Users can view their own order data" ON public.stripe_orders;
CREATE POLICY "Users can view their own order data" 
ON public.stripe_orders FOR SELECT 
USING ((select auth.uid()) = user_id);

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

