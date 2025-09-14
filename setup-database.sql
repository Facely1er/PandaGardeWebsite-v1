-- PandaGarde Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Create indexes for better performance
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

-- Enable RLS
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

-- RLS Policies for Users
CREATE POLICY "Users can view their own data" ON pandagarde_users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data" ON pandagarde_users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON pandagarde_users
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for Activities
CREATE POLICY "Users can view their own activities" ON pandagarde_activities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities" ON pandagarde_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities" ON pandagarde_activities
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Progress
CREATE POLICY "Users can view their own progress" ON pandagarde_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON pandagarde_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON pandagarde_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Contact Submissions (public)
CREATE POLICY "Anyone can insert contact submissions" ON pandagarde_contact_submissions
    FOR INSERT WITH CHECK (true);

-- RLS Policies for Newsletter Subscribers (public)
CREATE POLICY "Anyone can insert newsletter subscriptions" ON pandagarde_newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own newsletter subscription" ON pandagarde_newsletter_subscribers
    FOR UPDATE USING (email = auth.jwt() ->> 'email');

-- RLS Policies for Download Tracking
CREATE POLICY "Users can insert download tracking" ON pandagarde_download_tracking
    FOR INSERT WITH CHECK (true);

-- RLS Policies for User Sessions
CREATE POLICY "Users can manage their own sessions" ON pandagarde_user_sessions
    FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Families
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

-- RLS Policies for Family Members
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

-- RLS Policies for Family Invitations
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

-- RLS Policies for Family Achievements
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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Insert some sample data for testing
INSERT INTO pandagarde_users (id, email, profile_data) VALUES 
    ('00000000-0000-0000-0000-000000000001', 'demo@example.com', '{"firstName": "Demo", "lastName": "User", "role": "parent"}')
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! 🎉' as message;