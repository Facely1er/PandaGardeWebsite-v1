import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const schemaPrefix = import.meta.env.VITE_DB_SCHEMA_PREFIX || 'pandagarde_'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Create Supabase client with schema differentiation
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public' // We'll use public schema but with prefixed table names
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Schema prefix for all database operations
export const DB_SCHEMA_PREFIX = schemaPrefix

// Helper function to get prefixed table name
export const getTableName = (tableName: string): string => {
  return `${DB_SCHEMA_PREFIX}${tableName}`
}

// Common table names with prefix
export const TABLES = {
  USERS: getTableName('users'),
  ACTIVITIES: getTableName('activities'),
  PROGRESS: getTableName('progress'),
  CONTACT_SUBMISSIONS: getTableName('contact_submissions'),
  NEWSLETTER_SUBSCRIBERS: getTableName('newsletter_subscribers'),
  DOWNLOAD_TRACKING: getTableName('download_tracking'),
  USER_SESSIONS: getTableName('user_sessions'),
} as const
