# Database Schema Application Guide

## 🎯 Quick Start

The PandaGarde database schema has been updated and is ready to be applied to your Supabase project. Here's how to proceed:

### 1. Run the Application Guide
```bash
npm run db:apply
```

### 2. Authenticate with Supabase
```bash
npx supabase login
```

### 3. Link to Your Project
```bash
npx supabase link --project-ref YOUR_PROJECT_REF
```

### 4. Apply Migrations
```bash
npx supabase db push
```

### 5. Generate TypeScript Types
```bash
npm run db:types:remote
```

## 📋 Migration Files

| File | Description | Tables Added |
|------|-------------|--------------|
| `001_initial_schema.sql` | Core application tables | 7 tables |
| `002_rls_policies.sql` | Row Level Security policies | Security policies |
| `003_family_management.sql` | Family system tables | 4 tables |
| `004_search_content.sql` | Search & content management | 4 tables |

## 🗄️ Complete Schema Overview

### Core Tables (7)
- `pandagarde_users` - User profiles and authentication
- `pandagarde_activities` - User activity tracking  
- `pandagarde_progress` - Learning progress tracking
- `pandagarde_contact_submissions` - Contact form data
- `pandagarde_newsletter_subscribers` - Newsletter subscriptions
- `pandagarde_download_tracking` - Download analytics
- `pandagarde_user_sessions` - Session management

### Family Management (4)
- `pandagarde_families` - Family groups
- `pandagarde_family_members` - Family member relationships
- `pandagarde_family_invitations` - Family invitation system
- `pandagarde_family_achievements` - Family achievements

### Search & Content (4)
- `pandagarde_search_categories` - Content categories
- `pandagarde_search_content` - Searchable content items
- `pandagarde_search_analytics` - Search analytics
- `pandagarde_search_suggestions` - Search suggestions

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **User-specific data access** policies
- **Admin access controls** for content management
- **Public access** for contact forms and downloads
- **Project-specific table prefixes** to avoid conflicts

## ⚙️ Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   SUPABASE_PROJECT_REF=your_project_reference_id
   ```

## 🧪 Verification

After applying the schema, verify in your Supabase Dashboard:

1. **Tables**: Check that all 15 tables are created with `pandagarde_` prefix
2. **RLS**: Verify Row Level Security is enabled on all tables
3. **Policies**: Check that RLS policies are properly configured
4. **Data**: Verify initial search content and categories are populated

## 🚨 Troubleshooting

### Common Issues

1. **Authentication Error**
   ```bash
   npx supabase login
   ```

2. **Project Not Linked**
   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

3. **Migration Conflicts**
   - Check if tables already exist
   - Review migration files for syntax errors
   - Ensure proper permissions

4. **Type Generation Fails**
   ```bash
   npx supabase gen types typescript --project-ref YOUR_PROJECT_REF > src/lib/database.types.ts
   ```

## 📚 Additional Resources

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Database Migrations Guide](https://supabase.com/docs/guides/database/migrations)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [TypeScript Integration](https://supabase.com/docs/guides/api/generating-types)

## ✅ Success Checklist

- [ ] Supabase CLI authenticated
- [ ] Project linked successfully
- [ ] All migrations applied without errors
- [ ] TypeScript types generated
- [ ] RLS policies verified in dashboard
- [ ] Initial data populated
- [ ] Environment variables configured

---

**Ready to proceed?** Run `npm run db:apply` to see the complete application guide!