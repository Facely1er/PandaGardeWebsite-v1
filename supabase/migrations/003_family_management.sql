-- Migration: Family management system
-- Adds family and family member tables for multi-user support

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

-- Add updated_at triggers
CREATE TRIGGER update_pandagarde_families_updated_at 
    BEFORE UPDATE ON pandagarde_families 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pandagarde_family_members_updated_at 
    BEFORE UPDATE ON pandagarde_family_members 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies for family management
ALTER TABLE pandagarde_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_family_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pandagarde_family_achievements ENABLE ROW LEVEL SECURITY;

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