-- Migration: Initial schema setup with project-specific naming
-- This ensures all tables are prefixed to avoid conflicts with other projects

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom schema for this project (optional, alternative approach)
-- CREATE SCHEMA IF NOT EXISTS pandagarde;

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