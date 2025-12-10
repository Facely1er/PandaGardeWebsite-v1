# Manual Database Schema Application Guide

## 🎯 Quick Application Steps

Since we have your Supabase credentials, here's how to apply the database schema manually:

### 1. Access Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/nkgekxipzzvceesdjsrh/editor
2. Navigate to **SQL Editor** in the left sidebar

### 2. Apply Migrations in Order

Execute each migration file in the following order:

#### Migration 1: Initial Schema
```sql
-- Copy and paste the entire content of supabase/migrations/001_initial_schema.sql
-- This creates the core tables with pandagarde_ prefix
```

#### Migration 2: RLS Policies  
```sql
-- Copy and paste the entire content of supabase/migrations/002_rls_policies.sql
-- This enables Row Level Security on all tables
```

#### Migration 3: Family Management
```sql
-- Copy and paste the entire content of supabase/migrations/003_family_management.sql
-- This adds family system tables
```

#### Migration 4: Search Content
```sql
-- Copy and paste the entire content of supabase/migrations/004_search_content.sql
-- This adds search and content management tables
```

### 3. Verify Schema Application

After applying all migrations, verify in the **Table Editor**:

✅ **Core Tables (7 tables):**
- `pandagarde_users`
- `pandagarde_activities` 
- `pandagarde_progress`
- `pandagarde_contact_submissions`
- `pandagarde_newsletter_subscribers`
- `pandagarde_download_tracking`
- `pandagarde_user_sessions`

✅ **Family Management (4 tables):**
- `pandagarde_families`
- `pandagarde_family_members`
- `pandagarde_family_invitations`
- `pandagarde_family_achievements`

✅ **Search & Content (4 tables):**
- `pandagarde_search_categories`
- `pandagarde_search_content`
- `pandagarde_search_analytics`
- `pandagarde_search_suggestions`

### 4. Verify RLS Policies

In **Authentication > Policies**, verify that:
- All tables have RLS enabled
- User-specific policies are created
- Admin policies are configured
- Public access policies for contact forms exist

### 5. Generate TypeScript Types

After schema is applied, generate types:

```bash
# Set environment variables
export SUPABASE_URL="https://nkgekxipzzvceesdjsrh.supabase.co"
export SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTc0MTUsImV4cCI6MjA3MzQzMzQxNX0.W-598e6_uv5ES9DqgVr9ExdeY4uzZxcIZulrvioGqpA"

# Generate types
npx supabase gen types typescript --project-ref nkgekxipzzvceesdjsrh > src/lib/database.types.ts
```

## 🔧 Alternative: Automated Application

If you prefer automated application, you can use the Supabase CLI with proper authentication:

### Option 1: Using Database URL
```bash
# You'll need the database password from Supabase Dashboard > Settings > Database
npx supabase db push --db-url "postgresql://postgres:[PASSWORD]@db.nkgekxipzzvceesdjsrh.supabase.co:5432/postgres"
```

### Option 2: Using Service Role Key
```bash
# Set the service role key as environment variable
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg1NzQxNSwiZXhwIjoyMDczNDMzNDE1fQ.5_7ZyZVlR_zU_K2Hr2TRL3WI-zUG-G_vpa-aP586Yns"

# Then try to push migrations
npx supabase db push
```

## 📊 Schema Overview

### Complete Table List (15 tables total)

| Category | Table Name | Purpose |
|----------|------------|---------|
| **Core** | `pandagarde_users` | User profiles and authentication |
| **Core** | `pandagarde_activities` | User activity tracking |
| **Core** | `pandagarde_progress` | Learning progress tracking |
| **Core** | `pandagarde_contact_submissions` | Contact form data |
| **Core** | `pandagarde_newsletter_subscribers` | Newsletter subscriptions |
| **Core** | `pandagarde_download_tracking` | Download analytics |
| **Core** | `pandagarde_user_sessions` | Session management |
| **Family** | `pandagarde_families` | Family groups |
| **Family** | `pandagarde_family_members` | Family member relationships |
| **Family** | `pandagarde_family_invitations` | Family invitation system |
| **Family** | `pandagarde_family_achievements` | Family achievements |
| **Search** | `pandagarde_search_categories` | Content categories |
| **Search** | `pandagarde_search_content` | Searchable content items |
| **Search** | `pandagarde_search_analytics` | Search analytics |
| **Search** | `pandagarde_search_suggestions` | Search suggestions |

## 🔒 Security Features Applied

- **Row Level Security (RLS)** enabled on all tables
- **User-specific data access** policies
- **Admin access controls** for content management  
- **Public access** for contact forms and downloads
- **Project-specific table prefixes** to avoid conflicts

## ⚠️ Important Notes

1. **Table Prefixes**: All tables use `pandagarde_` prefix for project isolation
2. **RLS Policies**: Ensure data security and user privacy
3. **Admin Configuration**: Update admin emails in RLS policies if needed
4. **Initial Data**: Search content and categories are populated automatically
5. **Environment Variables**: Update your `.env.local` with the provided credentials

## 🧪 Testing After Application

1. **Verify Tables**: Check all 15 tables exist in Table Editor
2. **Test RLS**: Try accessing data with different user roles
3. **Check Policies**: Verify RLS policies are working correctly
4. **Test Application**: Run your app and test database operations
5. **Generate Types**: Ensure TypeScript types are generated correctly

## 📚 Next Steps

After successful schema application:

1. **Update Application Code**: Use the generated TypeScript types
2. **Test Database Operations**: Verify all CRUD operations work
3. **Configure Admin Access**: Update admin emails in RLS policies
4. **Deploy Application**: Deploy with the new schema
5. **Monitor Performance**: Check database performance and optimize if needed

---

**Ready to apply?** Follow the manual steps above or use the automated methods provided!