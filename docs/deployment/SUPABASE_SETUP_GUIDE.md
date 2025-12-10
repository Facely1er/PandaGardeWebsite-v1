# 🚀 Supabase Setup Guide for PandaGarde

This guide will help you set up Supabase backend for PandaGarde.

## ✅ Step 1: Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_URL=https://nkgekxipzzvceesdjsrh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTc0MTUsImV4cCI6MjA3MzQzMzQxNX0.W-598e6_uv5ES9DqgVr9ExdeY4uzZxcIZulrvioGqpA

VITE_SITE_URL=https://pandagarde.com
VITE_ADDITIONAL_REDIRECT_URLS=https://pandagarde.com/auth/callback
```

**Note:** The `.env` file is gitignored for security. Make sure to add these variables to your deployment platform (Netlify/Vercel) as well.

## ✅ Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## ✅ Step 3: Apply Database Schema

### Option A: Using Supabase Dashboard (Recommended)

1. Go to: https://supabase.com/dashboard/project/nkgekxipzzvceesdjsrh/sql
2. Open the SQL Editor
3. Copy and paste the entire contents of `database-schema.sql`
4. Click "Run" to execute

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref nkgekxipzzvceesdjsrh

# Apply schema
supabase db push
```

## ✅ Step 4: Verify Schema

After applying the schema, verify in Supabase Dashboard:

1. Go to **Table Editor**: https://supabase.com/dashboard/project/nkgekxipzzvceesdjsrh/editor
2. Check that these tables exist:
   - ✅ `pandagarde_search_content`
   - ✅ `pandagarde_user_preferences`
   - ✅ `pandagarde_contact_submissions`
   - ✅ `pandagarde_newsletter_subscribers`
   - ✅ `pandagarde_download_tracking`

3. Go to **Authentication > Policies** and verify RLS policies are enabled

## ✅ Step 5: Test Connection

Run the development server:

```bash
npm run dev
```

The Supabase client is automatically initialized in `src/lib/supabase.ts`. The application will work with or without Supabase (it falls back to localStorage if Supabase is unavailable).

## ✅ Step 6: Configure Deployment Environment Variables

### For Netlify:
1. Go to Site Settings > Environment Variables
2. Add all variables from `.env` file

### For Vercel:
1. Go to Project Settings > Environment Variables
2. Add all variables from `.env` file

## 📊 Database Schema Overview

### Tables Created:

1. **pandagarde_search_content** - Dynamic search content
2. **pandagarde_user_preferences** - User onboarding preferences
3. **pandagarde_contact_submissions** - Contact form submissions
4. **pandagarde_newsletter_subscribers** - Newsletter subscriptions
5. **pandagarde_download_tracking** - Download analytics

### Security Features:

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public read access for search content
- ✅ User-specific access for preferences
- ✅ Admin-only access for content management

## 🔧 Troubleshooting

### Issue: "Supabase client not initialized"
- **Solution**: Check that environment variables are set correctly
- Verify `.env` file exists and contains correct values
- Restart development server after adding environment variables

### Issue: "RLS policy violation"
- **Solution**: Verify RLS policies are applied correctly
- Check that policies match the expected access patterns
- Review Supabase logs for specific policy errors

### Issue: "Table does not exist"
- **Solution**: Verify schema was applied successfully
- Check Supabase Dashboard > Table Editor
- Re-run the SQL schema if tables are missing

## ✅ Next Steps

After setup is complete:

1. ✅ Test search functionality (uses Supabase if available)
2. ✅ Test user preferences persistence
3. ✅ Test contact form submissions
4. ✅ Verify newsletter subscriptions work
5. ✅ Check download tracking

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Dashboard](https://supabase.com/dashboard/project/nkgekxipzzvceesdjsrh)

---

**Status**: ✅ Ready to use after schema application

