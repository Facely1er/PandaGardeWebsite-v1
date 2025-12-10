# ⚡ Quick Setup Checklist

## ✅ Completed Steps

1. ✅ Supabase client installed (`@supabase/supabase-js`)
2. ✅ Supabase client configured (`src/lib/supabase.ts`)
3. ✅ Database schema SQL file created (`database-schema.sql`)
4. ✅ Environment variables documented

## 🚀 Next Steps (5 minutes)

### 1. Create `.env` file (if not exists)

Create `.env` in the root directory:

```env
VITE_SUPABASE_URL=https://nkgekxipzzvceesdjsrh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZ2VreGlwenp2Y2Vlc2Rqc3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTc0MTUsImV4cCI6MjA3MzQzMzQxNX0.W-598e6_uv5ES9DqgVr9ExdeY4uzZxcIZulrvioGqpA
VITE_SITE_URL=https://pandagarde.com
VITE_ADDITIONAL_REDIRECT_URLS=https://pandagarde.com/auth/callback
```

### 2. Apply Database Schema

**Go to Supabase SQL Editor:**
https://supabase.com/dashboard/project/nkgekxipzzvceesdjsrh/sql

**Copy and paste the entire contents of `database-schema.sql` and run it.**

### 3. Test Build

```bash
npm run build
npm run preview
```

### 4. Deploy to Production

Add environment variables to your deployment platform (Netlify/Vercel) and deploy!

---

**That's it!** Your site is ready for production. 🎉

