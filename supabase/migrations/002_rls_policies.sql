-- Migration: Row Level Security policies for project-specific tables
-- This ensures data isolation and security for the PandaGarde project

-- Enable RLS on all tables
ALTER TABLE pandagarde_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_download_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_user_sessions ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON pandagarde_users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON pandagarde_users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON pandagarde_users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Activities table policies
CREATE POLICY "Users can view own activities" ON pandagarde_activities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities" ON pandagarde_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities" ON pandagarde_activities
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities" ON pandagarde_activities
    FOR DELETE USING (auth.uid() = user_id);

-- Progress table policies
CREATE POLICY "Users can view own progress" ON pandagarde_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON pandagarde_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON pandagarde_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON pandagarde_progress
    FOR DELETE USING (auth.uid() = user_id);

-- Contact submissions - allow anonymous inserts, admin-only reads
CREATE POLICY "Anyone can submit contact form" ON pandagarde_contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions" ON pandagarde_contact_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

CREATE POLICY "Admins can update contact submissions" ON pandagarde_contact_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

-- Newsletter subscribers - allow anonymous inserts, admin-only reads
CREATE POLICY "Anyone can subscribe to newsletter" ON pandagarde_newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view newsletter subscribers" ON pandagarde_newsletter_subscribers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

CREATE POLICY "Admins can update newsletter subscribers" ON pandagarde_newsletter_subscribers
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

-- Download tracking - allow anonymous inserts, admin-only reads
CREATE POLICY "Anyone can track downloads" ON pandagarde_download_tracking
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own download history" ON pandagarde_download_tracking
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all downloads" ON pandagarde_download_tracking
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM pandagarde_users 
            WHERE id = auth.uid() 
            AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
        )
    );

-- User sessions - users can only access their own sessions
CREATE POLICY "Users can view own sessions" ON pandagarde_user_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON pandagarde_user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON pandagarde_user_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON pandagarde_user_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM pandagarde_user_sessions 
    WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up expired sessions (if pg_cron is available)
-- SELECT cron.schedule('cleanup-expired-sessions', '0 2 * * *', 'SELECT cleanup_expired_sessions();');