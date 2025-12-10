# 🗄️ Database

This directory contains database schema and setup documentation.

## Files

- `database-schema.sql` - Complete database schema with tables, RLS policies, and initial data
- `DATABASE_SETUP.md` - Database setup guide
- `DATABASE_SCHEMA_APPLICATION.md` - Schema application instructions
- `MANUAL_SCHEMA_APPLICATION.md` - Manual application guide
- `RLS_TESTING_GUIDE.md` - Row Level Security testing guide

## Quick Start

1. Apply the schema using the SQL Editor in Supabase Dashboard
2. Or use the migration script: `node scripts/run-migration.js`
3. Verify with: `node scripts/verify-migration.js`

## Schema Overview

The schema includes:
- `pandagarde_search_content` - Dynamic search content
- `pandagarde_user_preferences` - User preferences
- `pandagarde_contact_submissions` - Contact forms
- `pandagarde_newsletter_subscribers` - Newsletter
- `pandagarde_download_tracking` - Download analytics

All tables have Row Level Security (RLS) enabled with appropriate policies.

