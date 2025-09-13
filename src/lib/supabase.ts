import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const schemaPrefix = import.meta.env.VITE_DB_SCHEMA_PREFIX || 'pandagarde_'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Create Supabase client with schema differentiation
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

// Database types will be generated here
export type Database = {
  public: {
    Tables: {
      [TABLES.USERS]: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          profile_data?: any
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          profile_data?: any
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          profile_data?: any
        }
      }
      [TABLES.ACTIVITIES]: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          activity_data: any
          completed_at?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          activity_data: any
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          activity_data?: any
          completed_at?: string
          created_at?: string
        }
      }
      [TABLES.PROGRESS]: {
        Row: {
          id: string
          user_id: string
          activity_id: string
          progress_data: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_id: string
          progress_data: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_id?: string
          progress_data?: any
          created_at?: string
          updated_at?: string
        }
      }
      [TABLES.CONTACT_SUBMISSIONS]: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
          status: 'pending' | 'read' | 'replied'
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
          status?: 'pending' | 'read' | 'replied'
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
          status?: 'pending' | 'read' | 'replied'
        }
      }
      [TABLES.NEWSLETTER_SUBSCRIBERS]: {
        Row: {
          id: string
          email: string
          subscribed_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
          is_active?: boolean
        }
      }
      [TABLES.DOWNLOAD_TRACKING]: {
        Row: {
          id: string
          user_id?: string
          download_type: string
          file_name: string
          downloaded_at: string
          ip_address?: string
        }
        Insert: {
          id?: string
          user_id?: string
          download_type: string
          file_name: string
          downloaded_at?: string
          ip_address?: string
        }
        Update: {
          id?: string
          user_id?: string
          download_type?: string
          file_name?: string
          downloaded_at?: string
          ip_address?: string
        }
      }
      [TABLES.USER_SESSIONS]: {
        Row: {
          id: string
          user_id: string
          session_data: any
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_data: any
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          user_id?: string
          session_data?: any
          created_at?: string
          expires_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}