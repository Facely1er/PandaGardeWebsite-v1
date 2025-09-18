-- Migration: Row Level Security (RLS) policies for initial schema
-- This ensures proper data isolation and security for all tables

-- Enable RLS on all initial schema tables
ALTER TABLE pandagarde_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_download_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_user_sessions ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON pandagarde_users
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON pandagarde_users
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON pandagarde_users
    FOR INSERT WITH CHECK (id = auth.uid());

-- Activities table policies
CREATE POLICY "Users can view their own activities" ON pandagarde_activities
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own activities" ON pandagarde_activities
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own activities" ON pandagarde_activities
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own activities" ON pandagarde_activities
    FOR DELETE USING (user_id = auth.uid());

-- Progress table policies
CREATE POLICY "Users can view their own progress" ON pandagarde_progress
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own progress" ON pandagarde_progress
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON pandagarde_progress
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own progress" ON pandagarde_progress
    FOR DELETE USING (user_id = auth.uid());

-- Contact submissions policies (public access for form submissions)
CREATE POLICY "Anyone can insert contact submissions" ON pandagarde_contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin users can view all contact submissions" ON pandagarde_contact_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

CREATE POLICY "Admin users can update contact submissions" ON pandagarde_contact_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

-- Newsletter subscribers policies (public access for subscriptions)
CREATE POLICY "Anyone can insert newsletter subscriptions" ON pandagarde_newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin users can view all newsletter subscribers" ON pandagarde_newsletter_subscribers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

CREATE POLICY "Users can unsubscribe themselves" ON pandagarde_newsletter_subscribers
    FOR UPDATE USING (email = auth.email());

CREATE POLICY "Admin users can manage newsletter subscribers" ON pandagarde_newsletter_subscribers
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

-- Download tracking policies
CREATE POLICY "Anyone can insert download tracking" ON pandagarde_download_tracking
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own download history" ON pandagarde_download_tracking
    FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admin users can view all download tracking" ON pandagarde_download_tracking
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

-- User sessions policies
CREATE POLICY "Users can view their own sessions" ON pandagarde_user_sessions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own sessions" ON pandagarde_user_sessions
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own sessions" ON pandagarde_user_sessions
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own sessions" ON pandagarde_user_sessions
    FOR DELETE USING (user_id = auth.uid());

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM pandagarde_users 
        WHERE id = auth.uid() 
        AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;