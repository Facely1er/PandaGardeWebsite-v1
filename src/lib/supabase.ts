// Frontend-only mode - no database or authentication
// This file is kept for compatibility but all functionality is disabled

// Mock types for compatibility
export type Database = any

// Supabase is disabled for frontend-only mode
export const isSupabaseConfigured = false
export const supabase = null

// Schema prefix for compatibility
export const DB_SCHEMA_PREFIX = 'pandagarde_'

// Helper function to get prefixed table name (for compatibility)
export const getTableName = (tableName: string): string => {
  return `${DB_SCHEMA_PREFIX}${tableName}`
}

// Common table names with prefix (for compatibility)
export const TABLES = {
  USERS: getTableName('users'),
  ACTIVITIES: getTableName('activities'),
  PROGRESS: getTableName('progress'),
  CONTACT_SUBMISSIONS: getTableName('contact_submissions'),
  NEWSLETTER_SUBSCRIBERS: getTableName('newsletter_subscribers'),
  DOWNLOAD_TRACKING: getTableName('download_tracking'),
  USER_SESSIONS: getTableName('user_sessions'),
  FAMILIES: getTableName('families'),
  FAMILY_MEMBERS: getTableName('family_members'),
  FAMILY_INVITATIONS: getTableName('family_invitations'),
  FAMILY_ACHIEVEMENTS: getTableName('family_achievements'),
  SEARCH_CATEGORIES: getTableName('search_categories'),
  SEARCH_CONTENT: getTableName('search_content'),
  SEARCH_ANALYTICS: getTableName('search_analytics'),
  SEARCH_SUGGESTIONS: getTableName('search_suggestions'),
} as const
