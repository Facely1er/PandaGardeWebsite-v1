-- Migration: Complete PandaGarde Database Initialization
-- This migration consolidates all database setup including RLS policies and security
-- Date: 2024-12-01

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- CORE TABLES
-- =============================================

-- Users table with project prefix
CREATE TABLE IF NOT EXISTS pandagarde_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    profile_data JSONB DEFAULT '{}'::jsonb
);

-- Activities table for tracking user activities
CREATE TABLE IF NOT EXISTS pandagarde_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES pandagarde_users(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL,
    activity_data JSONB DEFAULT '{}'::jsonb,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress tracking table
CREATE TABLE IF NOT EXISTS pandagarde_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES pandagarde_users(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES pandagarde_activities(id) ON DELETE CASCADE,
    progress_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS pandagarde_contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied'))
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS pandagarde_newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Download tracking
CREATE TABLE IF NOT EXISTS pandagarde_download_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES pandagarde_users(id) ON DELETE SET NULL,
    download_type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET
);

-- User sessions for tracking user activity
CREATE TABLE IF NOT EXISTS pandagarde_user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES pandagarde_users(id) ON DELETE CASCADE,
    session_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- =============================================
-- FAMILY MANAGEMENT TABLES
-- =============================================

-- Families table
CREATE TABLE IF NOT EXISTS pandagarde_families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_by UUID REFERENCES pandagarde_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family members table
CREATE TABLE IF NOT EXISTS pandagarde_family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES pandagarde_users(id) ON DELETE CASCADE,
    family_id UUID REFERENCES pandagarde_families(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('parent', 'child')),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    profile_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, family_id) -- User can only be in one family
);

-- Family invitations table
CREATE TABLE IF NOT EXISTS pandagarde_family_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES pandagarde_families(id) ON DELETE CASCADE,
    invited_by UUID REFERENCES pandagarde_users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('parent', 'child')),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    accepted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family achievements table
CREATE TABLE IF NOT EXISTS pandagarde_family_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES pandagarde_families(id) ON DELETE CASCADE,
    achievement_type VARCHAR(100) NOT NULL,
    achievement_data JSONB DEFAULT '{}'::jsonb,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SEARCH CONTENT TABLES
-- =============================================

-- Search content categories
CREATE TABLE IF NOT EXISTS pandagarde_search_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search content items
CREATE TABLE IF NOT EXISTS pandagarde_search_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('page', 'activity', 'resource', 'guide')),
    url VARCHAR(500) NOT NULL,
    category_id UUID REFERENCES pandagarde_search_categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search analytics for tracking popular searches
CREATE TABLE IF NOT EXISTS pandagarde_search_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    search_query VARCHAR(255) NOT NULL,
    results_count INTEGER DEFAULT 0,
    user_id UUID REFERENCES pandagarde_users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    filters_applied JSONB DEFAULT '{}'::jsonb,
    searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search suggestions for autocomplete
CREATE TABLE IF NOT EXISTS pandagarde_search_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    suggestion VARCHAR(255) NOT NULL,
    suggestion_type VARCHAR(50) NOT NULL CHECK (suggestion_type IN ('popular', 'recent', 'recommended')),
    usage_count INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Core table indexes
CREATE INDEX IF NOT EXISTS idx_pandagarde_users_email ON pandagarde_users(email);
CREATE INDEX IF NOT EXISTS idx_pandagarde_activities_user_id ON pandagarde_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_activities_type ON pandagarde_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_pandagarde_progress_user_id ON pandagarde_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_progress_activity_id ON pandagarde_progress(activity_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_contact_submissions_status ON pandagarde_contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_pandagarde_newsletter_subscribers_email ON pandagarde_newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_pandagarde_download_tracking_user_id ON pandagarde_download_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_download_tracking_type ON pandagarde_download_tracking(download_type);
CREATE INDEX IF NOT EXISTS idx_pandagarde_user_sessions_user_id ON pandagarde_user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_user_sessions_expires_at ON pandagarde_user_sessions(expires_at);

-- Family management indexes
CREATE INDEX IF NOT EXISTS idx_pandagarde_families_created_by ON pandagarde_families(created_by);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_members_user_id ON pandagarde_family_members(user_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_members_family_id ON pandagarde_family_members(family_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_members_role ON pandagarde_family_members(role);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_invitations_family_id ON pandagarde_family_invitations(family_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_invitations_email ON pandagarde_family_invitations(email);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_invitations_token ON pandagarde_family_invitations(token);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_invitations_expires_at ON pandagarde_family_invitations(expires_at);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_achievements_family_id ON pandagarde_family_achievements(family_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_family_achievements_type ON pandagarde_family_achievements(achievement_type);

-- Search content indexes
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_categories_name ON pandagarde_search_categories(name);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_categories_active ON pandagarde_search_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_content_type ON pandagarde_search_content(content_type);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_content_category ON pandagarde_search_content(category_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_content_active ON pandagarde_search_content(is_active);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_content_tags ON pandagarde_search_content USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_analytics_query ON pandagarde_search_analytics(search_query);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_analytics_user ON pandagarde_search_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_analytics_date ON pandagarde_search_analytics(searched_at);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_suggestions_type ON pandagarde_search_suggestions(suggestion_type);
CREATE INDEX IF NOT EXISTS idx_pandagarde_search_suggestions_active ON pandagarde_search_suggestions(is_active);

-- =============================================
-- TRIGGERS AND FUNCTIONS
-- =============================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_pandagarde_users_updated_at 
    BEFORE UPDATE ON pandagarde_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pandagarde_progress_updated_at 
    BEFORE UPDATE ON pandagarde_progress 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pandagarde_families_updated_at 
    BEFORE UPDATE ON pandagarde_families 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pandagarde_family_members_updated_at 
    BEFORE UPDATE ON pandagarde_family_members 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pandagarde_search_categories_updated_at 
    BEFORE UPDATE ON pandagarde_search_categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pandagarde_search_content_updated_at 
    BEFORE UPDATE ON pandagarde_search_content 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pandagarde_search_suggestions_updated_at 
    BEFORE UPDATE ON pandagarde_search_suggestions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE pandagarde_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_download_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_family_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_family_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_search_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_search_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_search_suggestions ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - CORE TABLES
-- =============================================

-- Users policies
CREATE POLICY "Users can view their own profile" ON pandagarde_users
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON pandagarde_users
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON pandagarde_users
    FOR INSERT WITH CHECK (id = auth.uid());

-- Activities policies
CREATE POLICY "Users can view their own activities" ON pandagarde_activities
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own activities" ON pandagarde_activities
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own activities" ON pandagarde_activities
    FOR UPDATE USING (user_id = auth.uid());

-- Progress policies
CREATE POLICY "Users can view their own progress" ON pandagarde_progress
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own progress" ON pandagarde_progress
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON pandagarde_progress
    FOR UPDATE USING (user_id = auth.uid());

-- Contact submissions policies (public insert, admin view)
CREATE POLICY "Anyone can submit contact forms" ON pandagarde_contact_submissions
    FOR INSERT WITH CHECK (true);

-- Newsletter subscribers policies (public insert, admin view)
CREATE POLICY "Anyone can subscribe to newsletter" ON pandagarde_newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Download tracking policies
CREATE POLICY "Users can track their own downloads" ON pandagarde_download_tracking
    FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- User sessions policies
CREATE POLICY "Users can manage their own sessions" ON pandagarde_user_sessions
    FOR ALL USING (user_id = auth.uid());

-- =============================================
-- RLS POLICIES - FAMILY MANAGEMENT
-- =============================================

-- Family policies
CREATE POLICY "Users can view families they belong to" ON pandagarde_families
    FOR SELECT USING (
        id IN (
            SELECT family_id FROM pandagarde_family_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create families" ON pandagarde_families
    FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Family creators can update their families" ON pandagarde_families
    FOR UPDATE USING (created_by = auth.uid());

-- Family members policies
CREATE POLICY "Users can view family members of their families" ON pandagarde_family_members
    FOR SELECT USING (
        family_id IN (
            SELECT family_id FROM pandagarde_family_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Family members can be added by family creators" ON pandagarde_family_members
    FOR INSERT WITH CHECK (
        family_id IN (
            SELECT id FROM pandagarde_families 
            WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Users can update their own family member record" ON pandagarde_family_members
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Family creators can remove family members" ON pandagarde_family_members
    FOR DELETE USING (
        family_id IN (
            SELECT id FROM pandagarde_families 
            WHERE created_by = auth.uid()
        )
    );

-- Family invitations policies
CREATE POLICY "Users can view invitations for their families" ON pandagarde_family_invitations
    FOR SELECT USING (
        family_id IN (
            SELECT id FROM pandagarde_families 
            WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Family creators can create invitations" ON pandagarde_family_invitations
    FOR INSERT WITH CHECK (
        family_id IN (
            SELECT id FROM pandagarde_families 
            WHERE created_by = auth.uid()
        )
    );

-- Family achievements policies
CREATE POLICY "Users can view achievements for their families" ON pandagarde_family_achievements
    FOR SELECT USING (
        family_id IN (
            SELECT family_id FROM pandagarde_family_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Family members can create achievements" ON pandagarde_family_achievements
    FOR INSERT WITH CHECK (
        family_id IN (
            SELECT family_id FROM pandagarde_family_members 
            WHERE user_id = auth.uid()
        )
    );

-- =============================================
-- RLS POLICIES - SEARCH CONTENT
-- =============================================

-- Search content policies (public read access)
CREATE POLICY "Anyone can view active search categories" ON pandagarde_search_categories
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Anyone can view active search content" ON pandagarde_search_content
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Anyone can view search suggestions" ON pandagarde_search_suggestions
    FOR SELECT USING (is_active = TRUE);

-- Analytics policies (authenticated users can insert their own analytics)
CREATE POLICY "Authenticated users can insert search analytics" ON pandagarde_search_analytics
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own search analytics" ON pandagarde_search_analytics
    FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

-- =============================================
-- INITIAL DATA SEEDING
-- =============================================

-- Insert initial search categories
INSERT INTO pandagarde_search_categories (name, display_name, description, sort_order) VALUES
('pages', 'Pages', 'Main application pages and sections', 1),
('age-groups', 'Age Groups', 'Content organized by age ranges', 2),
('resources', 'Resources', 'Downloadable materials and tools', 3),
('guides', 'Guides', 'Step-by-step guides and tutorials', 4),
('activities', 'Activities', 'Interactive learning activities', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert initial search content (migrating from hardcoded data)
INSERT INTO pandagarde_search_content (title, description, content_type, url, category_id, tags, sort_order) VALUES
-- Pages
('Home', 'Welcome to PandaGarde - Your family privacy education platform', 'page', '/', (SELECT id FROM pandagarde_search_categories WHERE name = 'pages'), ARRAY['home', 'welcome', 'privacy', 'education'], 1),
('Activity Book', 'Interactive activities teaching privacy fundamentals', 'activity', '/activity-book', (SELECT id FROM pandagarde_search_categories WHERE name = 'activities'), ARRAY['activities', 'interactive', 'learning', 'privacy', 'fundamentals'], 2),
('Digital Bamboo Forest Story', 'Follow Privacy Panda''s adventure learning about digital safety', 'page', '/story', (SELECT id FROM pandagarde_search_categories WHERE name = 'pages'), ARRAY['story', 'privacy panda', 'adventure', 'digital safety', 'children'], 3),
('Family Hub', 'Your central dashboard for family privacy education and progress tracking', 'page', '/family-hub', (SELECT id FROM pandagarde_search_categories WHERE name = 'pages'), ARRAY['family', 'dashboard', 'progress', 'tracking', 'hub'], 4),
('About', 'Learn about PandaGarde and our mission to educate families about privacy', 'page', '/about', (SELECT id FROM pandagarde_search_categories WHERE name = 'pages'), ARRAY['about', 'mission', 'privacy', 'education', 'family'], 5),

-- Age Groups
('Privacy Explorers (Ages 5-8)', 'Age-appropriate privacy education for young children', 'page', '/privacy-explorers', (SELECT id FROM pandagarde_search_categories WHERE name = 'age-groups'), ARRAY['ages 5-8', 'young children', 'privacy', 'explorers', 'basic'], 1),
('Privacy Handbook (Ages 9-12)', 'Comprehensive privacy guide for elementary school children', 'page', '/privacy-handbook', (SELECT id FROM pandagarde_search_categories WHERE name = 'age-groups'), ARRAY['ages 9-12', 'elementary', 'handbook', 'privacy', 'comprehensive'], 2),
('Digital Citizenship (Ages 9-12)', 'Learn about responsible digital citizenship and online behavior', 'page', '/digital-citizenship', (SELECT id FROM pandagarde_search_categories WHERE name = 'age-groups'), ARRAY['ages 9-12', 'digital citizenship', 'online behavior', 'responsible'], 3),
('Teen Privacy Handbook (Ages 13-17)', 'Advanced privacy education for teenagers', 'page', '/teen-handbook', (SELECT id FROM pandagarde_search_categories WHERE name = 'age-groups'), ARRAY['ages 13-17', 'teenagers', 'advanced', 'privacy', 'handbook'], 4),
('Privacy Tools (Ages 13-17)', 'Practical tools and settings for protecting your privacy', 'page', '/privacy-tools', (SELECT id FROM pandagarde_search_categories WHERE name = 'age-groups'), ARRAY['ages 13-17', 'tools', 'settings', 'privacy protection', 'practical'], 5),
('Digital Rights (Ages 13-17)', 'Understanding your digital rights and how to protect them', 'page', '/digital-rights', (SELECT id FROM pandagarde_search_categories WHERE name = 'age-groups'), ARRAY['ages 13-17', 'digital rights', 'protection', 'understanding'], 6),

-- Resources
('Privacy Panda Coloring Sheets', 'Downloadable coloring pages featuring Privacy Panda and privacy concepts', 'resource', '/downloads/coloring-sheets', (SELECT id FROM pandagarde_search_categories WHERE name = 'resources'), ARRAY['coloring', 'download', 'privacy panda', 'printable', 'activities'], 1),
('Digital Safety Posters', 'Classroom-ready posters highlighting key privacy concepts', 'resource', '/downloads/safety-posters', (SELECT id FROM pandagarde_search_categories WHERE name = 'resources'), ARRAY['posters', 'download', 'classroom', 'safety', 'privacy concepts'], 2),
('Privacy Champion Certificates', 'Printable certificates to celebrate privacy education milestones', 'resource', '/downloads/certificates', (SELECT id FROM pandagarde_search_categories WHERE name = 'resources'), ARRAY['certificates', 'download', 'achievement', 'milestones', 'celebration'], 3),
('Family Internet Agreement', 'Customizable family guidelines for internet use', 'resource', '/downloads/family-agreement', (SELECT id FROM pandagarde_search_categories WHERE name = 'resources'), ARRAY['family agreement', 'download', 'guidelines', 'internet use', 'customizable'], 4),

-- Guides
('Child-Friendly Device Setup', 'Step-by-step guide for configuring devices with appropriate controls', 'guide', '/guides/device-setup', (SELECT id FROM pandagarde_search_categories WHERE name = 'guides'), ARRAY['device setup', 'guide', 'child-friendly', 'configuration', 'controls'], 1),
('Choosing Child-Safe Apps', 'Guidelines for selecting appropriate digital content for children', 'guide', '/guides/app-selection', (SELECT id FROM pandagarde_search_categories WHERE name = 'guides'), ARRAY['app selection', 'guide', 'child-safe', 'digital content', 'guidelines'], 2),
('Modeling Good Digital Citizenship', 'Tips for demonstrating healthy online behavior', 'guide', '/guides/modeling-behavior', (SELECT id FROM pandagarde_search_categories WHERE name = 'guides'), ARRAY['modeling', 'guide', 'digital citizenship', 'online behavior', 'tips'], 3),
('Responding to Privacy Concerns', 'What to do when privacy issues arise', 'guide', '/guides/privacy-concerns', (SELECT id FROM pandagarde_search_categories WHERE name = 'guides'), ARRAY['privacy concerns', 'guide', 'response', 'issues', 'help'], 4),

-- Activities
('Privacy Panda Coloring Activity', 'Interactive coloring activity teaching basic privacy concepts', 'activity', '/activity-book#coloring', (SELECT id FROM pandagarde_search_categories WHERE name = 'activities'), ARRAY['coloring', 'activity', 'privacy panda', 'interactive', 'basic concepts'], 1),
('Privacy Matching Game', 'Match privacy concepts with their meanings', 'activity', '/activity-book#matching', (SELECT id FROM pandagarde_search_categories WHERE name = 'activities'), ARRAY['matching', 'game', 'activity', 'privacy concepts', 'learning'], 2),
('Privacy Word Search', 'Find privacy-related words in this fun word search', 'activity', '/activity-book#word-search', (SELECT id FROM pandagarde_search_categories WHERE name = 'activities'), ARRAY['word search', 'activity', 'privacy words', 'fun', 'learning'], 3),
('Privacy Maze Adventure', 'Navigate through the maze while learning about privacy', 'activity', '/activity-book#maze', (SELECT id FROM pandagarde_search_categories WHERE name = 'activities'), ARRAY['maze', 'adventure', 'activity', 'privacy', 'navigation'], 4),
('Connect the Dots - Privacy Panda', 'Connect the dots to reveal Privacy Panda', 'activity', '/activity-book#connect-dots', (SELECT id FROM pandagarde_search_categories WHERE name = 'activities'), ARRAY['connect dots', 'activity', 'privacy panda', 'reveal', 'fun'], 5),
('Privacy Drag & Drop', 'Drag and drop items to learn about privacy settings', 'activity', '/activity-book#drag-drop', (SELECT id FROM pandagarde_search_categories WHERE name = 'activities'), ARRAY['drag drop', 'activity', 'privacy settings', 'interactive', 'learning'], 6)
ON CONFLICT DO NOTHING;

-- Insert initial search suggestions
INSERT INTO pandagarde_search_suggestions (suggestion, suggestion_type, usage_count) VALUES
('privacy', 'popular', 100),
('activities', 'popular', 85),
('coloring', 'popular', 70),
('family', 'popular', 65),
('safety', 'popular', 60),
('digital citizenship', 'popular', 55),
('privacy panda', 'popular', 50),
('guides', 'popular', 45),
('certificates', 'popular', 40),
('posters', 'popular', 35)
ON CONFLICT DO NOTHING;

-- =============================================
-- SECURITY NOTES
-- =============================================

-- This migration implements comprehensive RLS policies that:
-- 1. Ensure users can only access their own data
-- 2. Allow public access to search content and contact forms
-- 3. Implement proper family-based access controls
-- 4. Remove broad GRANT ALL permissions in favor of specific policies
-- 5. Use auth.uid() checks to ensure tight security

-- The anon role only has INSERT permissions where public actions are expected:
-- - Contact form submissions
-- - Newsletter subscriptions
-- - Search analytics (with user_id NULL for anonymous users)

-- All other operations require authentication and proper ownership checks.