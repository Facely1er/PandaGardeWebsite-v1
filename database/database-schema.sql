-- PandaGarde Database Schema
-- Apply this SQL in Supabase SQL Editor: https://supabase.com/dashboard/project/nkgekxipzzvceesdjsrh/sql

-- ============================================
-- 1. Search Content Table
-- ============================================
CREATE TABLE IF NOT EXISTS pandagarde_search_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('page', 'activity', 'resource', 'guide')),
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  content_data JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pandagarde_search_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Search Content
CREATE POLICY "Allow public read access to active search content" 
ON pandagarde_search_content FOR SELECT 
USING (is_active = true);

CREATE POLICY "Allow admin insert search content" 
ON pandagarde_search_content FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow admin update search content" 
ON pandagarde_search_content FOR UPDATE 
USING (auth.role() = 'service_role');

CREATE POLICY "Allow admin delete search content" 
ON pandagarde_search_content FOR DELETE 
USING (auth.role() = 'service_role');

-- ============================================
-- 2. User Preferences Table (for onboarding)
-- ============================================
CREATE TABLE IF NOT EXISTS pandagarde_user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE pandagarde_user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for User Preferences
CREATE POLICY "Users can view their own preferences" 
ON pandagarde_user_preferences FOR SELECT 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own preferences" 
ON pandagarde_user_preferences FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own preferences" 
ON pandagarde_user_preferences FOR UPDATE 
USING ((select auth.uid()) = user_id);

-- ============================================
-- 3. Contact Submissions Table
-- ============================================
CREATE TABLE IF NOT EXISTS pandagarde_contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pandagarde_contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Contact Submissions
CREATE POLICY "Allow public insert for contact submissions" 
ON pandagarde_contact_submissions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read access" 
ON pandagarde_contact_submissions FOR SELECT 
USING ((select auth.role()) = 'service_role');

-- ============================================
-- 4. Newsletter Subscribers Table
-- ============================================
CREATE TABLE IF NOT EXISTS pandagarde_newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE pandagarde_newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Newsletter
CREATE POLICY "Allow public insert for newsletter" 
ON pandagarde_newsletter_subscribers FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update for unsubscribe" 
ON pandagarde_newsletter_subscribers FOR UPDATE 
USING (true);

-- ============================================
-- 5. Download Tracking Table
-- ============================================
CREATE TABLE IF NOT EXISTS pandagarde_download_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_type TEXT NOT NULL,
  resource_name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pandagarde_download_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Download Tracking
CREATE POLICY "Allow public insert for downloads" 
ON pandagarde_download_tracking FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own downloads" 
ON pandagarde_download_tracking FOR SELECT 
USING ((select auth.uid()) = user_id OR user_id IS NULL);

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_search_content_type ON pandagarde_search_content(type);
CREATE INDEX IF NOT EXISTS idx_search_content_category ON pandagarde_search_content(category);
CREATE INDEX IF NOT EXISTS idx_search_content_active ON pandagarde_search_content(is_active);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON pandagarde_user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON pandagarde_contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON pandagarde_newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_download_tracking_user_id ON pandagarde_download_tracking(user_id);

-- ============================================
-- Initial Search Content Data
-- ============================================
INSERT INTO pandagarde_search_content (title, description, type, url, category, tags, is_active) VALUES
('Privacy Panda Story', 'Interactive story about digital privacy', 'activity', '/privacy-panda', 'Activities', ARRAY['story', 'interactive', 'privacy'], true),
('Activity Book', 'Printable activities and coloring sheets', 'resource', '/activity-book', 'Resources', ARRAY['activities', 'printable', 'coloring'], true),
('Family Hub', 'Connect with other families and track progress', 'page', '/family-hub', 'Community', ARRAY['family', 'community', 'progress'], true),
('Digital Footprint', 'Analyze your family''s digital footprint', 'page', '/digital-footprint', 'Tools', ARRAY['footprint', 'analysis', 'privacy'], true),
('Service Catalog', 'Add and manage your family''s services', 'page', '/service-catalog', 'Tools', ARRAY['services', 'catalog', 'management'], true),
('Quick Start Guide', 'Get started with PandaGarde in minutes', 'guide', '/quick-start', 'Getting Started', ARRAY['guide', 'tutorial', 'start'], true),
('Privacy Assessment', 'Assess your family''s privacy needs', 'page', '/privacy-assessment', 'Tools', ARRAY['assessment', 'privacy', 'evaluation'], true),
('Parent Resources', 'Resources and guides for parents', 'resource', '/parent-resources', 'Resources', ARRAY['parents', 'resources', 'guides'], true)
ON CONFLICT DO NOTHING;

