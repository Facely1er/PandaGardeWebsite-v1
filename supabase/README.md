# PandaGarde Database Schema

This directory contains the database schema and migrations for the PandaGarde project, designed to avoid conflicts with other projects in the same Supabase instance.

## Schema Differentiation Strategy

To prevent conflicts with other projects sharing the same Supabase instance, we use the following strategies:

1. **Table Name Prefixing**: All tables are prefixed with `pandagarde_` to ensure uniqueness
2. **Row Level Security (RLS)**: Implemented to ensure data isolation between projects
3. **Project-Specific Policies**: Custom RLS policies that only allow access to PandaGarde data
4. **Environment-Based Configuration**: Schema prefix can be configured via environment variables

## Database Tables

### Core Tables
- `pandagarde_users` - User profiles and authentication data
- `pandagarde_activities` - User activity tracking
- `pandagarde_progress` - Learning progress tracking
- `pandagarde_user_sessions` - User session management

### Content Tables
- `pandagarde_contact_submissions` - Contact form submissions
- `pandagarde_newsletter_subscribers` - Newsletter subscription management
- `pandagarde_download_tracking` - Download analytics and tracking

## Migration Files

1. `001_initial_schema.sql` - Creates all tables with proper indexing and constraints
2. `002_rls_policies.sql` - Implements Row Level Security policies

## Environment Configuration

The schema prefix can be configured via the `VITE_DB_SCHEMA_PREFIX` environment variable. Default is `pandagarde_`.

## Security Features

- **Row Level Security**: All tables have RLS enabled
- **User Isolation**: Users can only access their own data
- **Admin Access**: Special admin policies for content management
- **Anonymous Access**: Contact forms and downloads can be submitted anonymously

## Usage

### Running Migrations

```bash
# Apply migrations to your Supabase project
supabase db push

# Or run individual migrations
supabase db reset
```

### Local Development

```bash
# Start local Supabase instance
supabase start

# Stop local instance
supabase stop
```

## Type Safety

TypeScript types are automatically generated and available in `src/lib/supabase.ts`. The database service functions in `src/lib/database.ts` provide type-safe database operations.

## Best Practices

1. Always use the provided service functions instead of direct Supabase calls
2. Test RLS policies thoroughly before deployment
3. Keep migrations atomic and reversible
4. Use environment variables for configuration
5. Regularly clean up expired sessions and old data