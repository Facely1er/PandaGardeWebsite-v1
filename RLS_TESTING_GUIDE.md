# Row Level Security (RLS) Testing Guide

This guide provides comprehensive testing procedures for all Row Level Security policies in the PandaGarde Supabase project.

## Overview

Row Level Security (RLS) is enabled on all tables to ensure users can only access data they are authorized to see. This guide covers testing procedures for different user roles and scenarios.

## Test User Roles

### 1. Anonymous Users
- No authentication required
- Limited access to public content
- Cannot access user-specific data

### 2. Authenticated Users
- Basic authenticated users
- Can access their own data
- Cannot access other users' data

### 3. Parent Users
- Users with role 'parent'
- Can manage family data
- Can invite family members
- Can view family achievements

### 4. Child Users
- Users with role 'child'
- Limited access to family data
- Cannot manage family settings
- Can view their own progress

## Testing Procedures

### Prerequisites

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase instance
supabase start

# Connect to local database
psql postgresql://postgres:postgres@localhost:54322/postgres
```

### Test Data Setup

```sql
-- Create test users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'parent@test.com', 'password', NOW(), NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'child@test.com', 'password', NOW(), NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'other@test.com', 'password', NOW(), NOW(), NOW());

-- Create test user profiles
INSERT INTO pandagarde_users (id, email, profile_data)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'parent@test.com', '{"role": "parent", "firstName": "Parent", "lastName": "User"}'),
  ('22222222-2222-2222-2222-222222222222', 'child@test.com', '{"role": "child", "firstName": "Child", "lastName": "User"}'),
  ('33333333-3333-3333-3333-333333333333', 'other@test.com', '{"role": "parent", "firstName": "Other", "lastName": "User"}');

-- Create test family
INSERT INTO pandagarde_families (id, name, created_by)
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test Family', '11111111-1111-1111-1111-111111111111');

-- Create family members
INSERT INTO pandagarde_family_members (user_id, family_id, role, first_name, last_name, email)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'parent', 'Parent', 'User', 'parent@test.com'),
  ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'child', 'Child', 'User', 'child@test.com');
```

## Table-by-Table Testing

### 1. pandagarde_users Table

#### Test Cases

```sql
-- Test 1: Anonymous user cannot access any user data
SET LOCAL role TO anon;
SELECT * FROM pandagarde_users;
-- Expected: No rows returned

-- Test 2: Authenticated user can only see their own data
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
SELECT * FROM pandagarde_users;
-- Expected: Only parent@test.com user returned

-- Test 3: User cannot see other users' data
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';
SELECT * FROM pandagarde_users WHERE email = 'parent@test.com';
-- Expected: No rows returned

-- Test 4: User can update their own profile
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
UPDATE pandagarde_users SET profile_data = '{"role": "parent", "firstName": "Updated"}' WHERE id = '11111111-1111-1111-1111-111111111111';
-- Expected: Update successful

-- Test 5: User cannot update other users' profiles
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';
UPDATE pandagarde_users SET profile_data = '{"role": "child", "firstName": "Hacked"}' WHERE id = '11111111-1111-1111-1111-111111111111';
-- Expected: Update fails or no rows affected
```

### 2. pandagarde_activities Table

#### Test Cases

```sql
-- Test 1: Anonymous user cannot access activities
SET LOCAL role TO anon;
SELECT * FROM pandagarde_activities;
-- Expected: No rows returned

-- Test 2: User can only see their own activities
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
SELECT * FROM pandagarde_activities;
-- Expected: Only activities for user 11111111-1111-1111-1111-111111111111

-- Test 3: User can create their own activities
INSERT INTO pandagarde_activities (user_id, activity_type, activity_data)
VALUES ('11111111-1111-1111-1111-111111111111', 'coloring', '{"completed": true}');
-- Expected: Insert successful

-- Test 4: User cannot create activities for other users
INSERT INTO pandagarde_activities (user_id, activity_type, activity_data)
VALUES ('22222222-2222-2222-2222-222222222222', 'coloring', '{"completed": true}');
-- Expected: Insert fails or is rejected
```

### 3. pandagarde_families Table

#### Test Cases

```sql
-- Test 1: Anonymous user cannot access families
SET LOCAL role TO anon;
SELECT * FROM pandagarde_families;
-- Expected: No rows returned

-- Test 2: Family members can view their family
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
SELECT * FROM pandagarde_families;
-- Expected: Test Family returned

-- Test 3: Non-family members cannot view family
SET LOCAL "request.jwt.claims" TO '{"sub": "33333333-3333-3333-3333-333333333333"}';
SELECT * FROM pandagarde_families;
-- Expected: No rows returned

-- Test 4: Family creator can update family
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
UPDATE pandagarde_families SET name = 'Updated Family' WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: Update successful

-- Test 5: Non-creator cannot update family
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';
UPDATE pandagarde_families SET name = 'Hacked Family' WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: Update fails or no rows affected
```

### 4. pandagarde_family_members Table

#### Test Cases

```sql
-- Test 1: Family members can view family members
SET LOCAL role TO authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
SELECT * FROM pandagarde_family_members;
-- Expected: Both parent and child members returned

-- Test 2: Non-family members cannot view family members
SET LOCAL "request.jwt.claims" TO '{"sub": "33333333-3333-3333-3333-333333333333"}';
SELECT * FROM pandagarde_family_members;
-- Expected: No rows returned

-- Test 3: Family creator can add members
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111"}';
INSERT INTO pandagarde_family_members (user_id, family_id, role, first_name, last_name, email)
VALUES ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'child', 'New', 'Member', 'new@test.com');
-- Expected: Insert successful

-- Test 4: Non-creator cannot add members
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222"}';
INSERT INTO pandagarde_family_members (user_id, family_id, role, first_name, last_name, email)
VALUES ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'child', 'Unauthorized', 'Member', 'unauthorized@test.com');
-- Expected: Insert fails or is rejected
```

### 5. pandagarde_search_content Table

#### Test Cases

```sql
-- Test 1: Anonymous users can view active search content
SET LOCAL role TO anon;
SELECT * FROM pandagarde_search_content WHERE is_active = true;
-- Expected: All active content returned

-- Test 2: Anonymous users cannot view inactive content
SELECT * FROM pandagarde_search_content WHERE is_active = false;
-- Expected: No rows returned

-- Test 3: Anonymous users cannot modify search content
INSERT INTO pandagarde_search_content (title, description, content_type, url, tags)
VALUES ('Test', 'Test description', 'page', '/test', ARRAY['test']);
-- Expected: Insert fails or is rejected
```

## Automated Testing Script

Create a comprehensive test script to run all RLS tests:

```typescript
// scripts/test-rls.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface TestCase {
  name: string;
  role: 'anon' | 'authenticated';
  userId?: string;
  query: string;
  expectedRows: number;
  shouldFail?: boolean;
}

const testCases: TestCase[] = [
  // Users table tests
  {
    name: 'Anonymous user cannot access users',
    role: 'anon',
    query: 'SELECT * FROM pandagarde_users',
    expectedRows: 0
  },
  {
    name: 'Authenticated user can only see their own data',
    role: 'authenticated',
    userId: '11111111-1111-1111-1111-111111111111',
    query: 'SELECT * FROM pandagarde_users',
    expectedRows: 1
  },
  {
    name: 'User cannot see other users data',
    role: 'authenticated',
    userId: '22222222-2222-2222-2222-222222222222',
    query: "SELECT * FROM pandagarde_users WHERE email = 'parent@test.com'",
    expectedRows: 0
  },
  // Add more test cases...
];

async function runRLSTests() {
  console.log('Starting RLS Tests...');
  
  for (const testCase of testCases) {
    try {
      console.log(`Running: ${testCase.name}`);
      
      // Set up authentication context
      if (testCase.role === 'authenticated' && testCase.userId) {
        // Use service role to simulate authenticated user
        const { data, error } = await supabase
          .from('pandagarde_users')
          .select('*')
          .eq('id', testCase.userId);
        
        if (error) {
          console.error(`❌ ${testCase.name}: ${error.message}`);
          continue;
        }
      }
      
      // Execute test query
      const { data, error } = await supabase.rpc('execute_sql', {
        sql: testCase.query
      });
      
      if (testCase.shouldFail && error) {
        console.log(`✅ ${testCase.name}: Correctly failed`);
      } else if (!testCase.shouldFail && !error) {
        const actualRows = data?.length || 0;
        if (actualRows === testCase.expectedRows) {
          console.log(`✅ ${testCase.name}: Passed (${actualRows} rows)`);
        } else {
          console.error(`❌ ${testCase.name}: Expected ${testCase.expectedRows} rows, got ${actualRows}`);
        }
      } else {
        console.error(`❌ ${testCase.name}: Unexpected result`);
      }
    } catch (error) {
      console.error(`❌ ${testCase.name}: ${error}`);
    }
  }
  
  console.log('RLS Tests completed');
}

runRLSTests();
```

## Edge Cases and Security Bypasses

### 1. SQL Injection Prevention

```sql
-- Test malicious input
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111; DROP TABLE pandagarde_users; --"}';
SELECT * FROM pandagarde_users;
-- Expected: Should not execute DROP TABLE command
```

### 2. JWT Token Manipulation

```sql
-- Test invalid JWT claims
SET LOCAL "request.jwt.claims" TO '{"sub": "invalid-uuid"}';
SELECT * FROM pandagarde_users;
-- Expected: No rows returned or error
```

### 3. Role Escalation

```sql
-- Test role manipulation
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111", "role": "admin"}';
SELECT * FROM pandagarde_users;
-- Expected: Should not grant admin access
```

### 4. Cross-Family Data Access

```sql
-- Test accessing other families' data
SET LOCAL "request.jwt.claims" TO '{"sub": "33333333-3333-3333-3333-333333333333"}';
SELECT * FROM pandagarde_family_members WHERE family_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: No rows returned
```

## Performance Testing

### 1. Query Performance

```sql
-- Test query performance with RLS
EXPLAIN ANALYZE SELECT * FROM pandagarde_users WHERE id = '11111111-1111-1111-1111-111111111111';

-- Check if indexes are being used
EXPLAIN ANALYZE SELECT * FROM pandagarde_activities WHERE user_id = '11111111-1111-1111-1111-111111111111';
```

### 2. Concurrent Access

```sql
-- Test concurrent access patterns
-- Run multiple queries simultaneously to test for race conditions
```

## Monitoring and Alerting

### 1. Failed Access Attempts

```sql
-- Monitor failed access attempts
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats 
WHERE schemaname = 'public' 
AND tablename LIKE 'pandagarde_%';
```

### 2. Policy Performance

```sql
-- Monitor policy execution time
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements 
WHERE query LIKE '%pandagarde_%'
ORDER BY mean_time DESC;
```

## Remediation Steps

### 1. Policy Violations

If a test fails:

1. **Review Policy Logic**
   ```sql
   -- Check existing policies
   SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
   FROM pg_policies 
   WHERE schemaname = 'public' 
   AND tablename LIKE 'pandagarde_%';
   ```

2. **Update Policy**
   ```sql
   -- Example: Fix overly permissive policy
   DROP POLICY "Users can view all users" ON pandagarde_users;
   CREATE POLICY "Users can view their own data" ON pandagarde_users
     FOR SELECT USING (id = auth.uid());
   ```

3. **Test Again**
   - Re-run the specific test case
   - Verify the fix works
   - Run full test suite

### 2. Performance Issues

If queries are slow:

1. **Add Indexes**
   ```sql
   -- Add index for frequently queried columns
   CREATE INDEX CONCURRENTLY idx_pandagarde_users_auth_uid 
   ON pandagarde_users(id) 
   WHERE id = auth.uid();
   ```

2. **Optimize Policies**
   ```sql
   -- Simplify complex policies
   -- Use more efficient WHERE clauses
   ```

## Continuous Testing

### 1. Pre-deployment Testing

```bash
# Run RLS tests before deployment
npm run test:rls

# Check for policy changes
npx supabase db diff
```

### 2. Post-deployment Verification

```bash
# Verify policies are active
psql -c "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'pandagarde_%';"

# Test critical user flows
npm run test:integration
```

## Checklist

- [ ] All tables have RLS enabled
- [ ] Policies are properly configured
- [ ] Anonymous users have appropriate access
- [ ] Authenticated users can only access their data
- [ ] Family members can access family data
- [ ] Non-family members cannot access family data
- [ ] Edge cases are tested
- [ ] Performance is acceptable
- [ ] Monitoring is in place
- [ ] Documentation is updated

## Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Security Best Practices](https://supabase.com/docs/guides/auth/security)