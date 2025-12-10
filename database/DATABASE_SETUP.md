# PandaGarde Database Setup Guide

This guide explains how to set up the database schema for the PandaGarde project with proper differentiation to avoid conflicts with other projects in the same Supabase instance.

## 🎯 Schema Differentiation Strategy

To prevent conflicts with other projects sharing the same Supabase instance, we implement:

1. **Table Name Prefixing**: All tables use `pandagarde_` prefix
2. **Row Level Security (RLS)**: Ensures data isolation between projects
3. **Project-Specific Policies**: Custom RLS policies for PandaGarde data only
4. **Environment Configuration**: Configurable schema prefix via environment variables

## 📋 Prerequisites

- Node.js and npm installed
- Supabase CLI installed ([Installation Guide](https://supabase.com/docs/guides/cli/getting-started))
- Access to your Supabase project

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual Supabase project values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DB_SCHEMA_PREFIX=pandagarde_
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Run Database Setup

```bash
npm run db:setup
```

This will validate your configuration and guide you through the next steps.

### 4. Apply Database Migrations

```bash
npm run db:push
```

### 5. Generate TypeScript Types

```bash
npm run db:types
```

## 🗄️ Database Schema

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `pandagarde_users` | User profiles | Email, profile data, timestamps |
| `pandagarde_activities` | Activity tracking | User activities, completion status |
| `pandagarde_progress` | Progress tracking | Learning progress, achievements |
| `pandagarde_user_sessions` | Session management | User sessions, expiration |

### Content Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `pandagarde_contact_submissions` | Contact forms | Name, email, message, status |
| `pandagarde_newsletter_subscribers` | Newsletter | Email subscriptions, status |
| `pandagarde_download_tracking` | Analytics | Download tracking, user data |

## 🔒 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **User Data**: Users can only access their own data
- **Admin Access**: Special admin policies for content management
- **Anonymous Access**: Contact forms and downloads work without authentication
- **Data Isolation**: Complete separation from other projects

### Authentication

- Email/password authentication
- Session management with expiration
- Secure token handling
- User profile management

## 🛠️ Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Database Setup | `npm run db:setup` | Validate configuration |
| Push Migrations | `npm run db:push` | Apply migrations to Supabase |
| Reset Database | `npm run db:reset` | Reset local database |
| Start Local | `npm run db:start` | Start local Supabase |
| Stop Local | `npm run db:stop` | Stop local Supabase |
| Generate Types | `npm run db:types` | Generate TypeScript types |

## 📁 Project Structure

```
supabase/
├── migrations/
│   ├── 001_initial_schema.sql    # Core table definitions
│   └── 002_rls_policies.sql      # Security policies
├── config.toml                    # Supabase configuration
└── README.md                      # Database documentation

src/lib/
├── supabase.ts                    # Supabase client configuration
├── database.ts                    # Database service functions
└── database.types.ts              # Generated TypeScript types

scripts/
└── setup-database.js              # Setup validation script
```

## 🔧 Configuration Options

### Schema Prefix

The database schema prefix can be configured via environment variables:

```env
VITE_DB_SCHEMA_PREFIX=pandagarde_
```

This ensures all tables are uniquely named to avoid conflicts.

### Admin Configuration

Update admin email addresses in the RLS policies:

```sql
-- In supabase/migrations/002_rls_policies.sql
AND email IN ('admin@pandagarde.com', 'support@pandagarde.com')
```

## 🧪 Testing

### Local Development

1. Start local Supabase:
   ```bash
   npm run db:start
   ```

2. Run your application:
   ```bash
   npm run dev
   ```

3. Access Supabase Studio at `http://localhost:54323`

### Production Deployment

1. Apply migrations to production:
   ```bash
   npm run db:push
   ```

2. Verify RLS policies are working correctly
3. Test all database operations

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Loaded**
   - Ensure `.env.local` exists and contains correct values
   - Restart your development server

2. **Migration Errors**
   - Check Supabase project permissions
   - Verify database connection
   - Review migration files for syntax errors

3. **RLS Policy Issues**
   - Test policies with different user roles
   - Check admin email configuration
   - Verify user authentication status

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the migration files in `supabase/migrations/`
- Test with the provided database service functions

## 📚 Additional Resources

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Migrations](https://supabase.com/docs/guides/database/migrations)
- [TypeScript Integration](https://supabase.com/docs/guides/api/generating-types)

## ✅ Verification Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] TypeScript types generated
- [ ] RLS policies working
- [ ] Admin access configured
- [ ] Local development working
- [ ] Production deployment tested

---

**Note**: This setup ensures complete data isolation between projects sharing the same Supabase instance while maintaining security and performance.