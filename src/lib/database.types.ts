export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pandagarde_users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          profile_data: Json | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          profile_data?: Json | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          profile_data?: Json | null
        }
        Relationships: []
      }
      pandagarde_activities: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          activity_data: Json | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          activity_data?: Json | null
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          activity_data?: Json | null
          completed_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pandagarde_activities_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "pandagarde_users"
            referencedColumns: ["id"]
          }
        ]
      }
      pandagarde_progress: {
        Row: {
          id: string
          user_id: string
          activity_id: string
          progress_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_id: string
          progress_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_id?: string
          progress_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pandagarde_progress_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "pandagarde_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pandagarde_progress_activity_id_fkey"
            columns: ["activity_id"]
            referencedRelation: "pandagarde_activities"
            referencedColumns: ["id"]
          }
        ]
      }
      pandagarde_contact_submissions: {
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
        Relationships: []
      }
      pandagarde_newsletter_subscribers: {
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
        Relationships: []
      }
      pandagarde_download_tracking: {
        Row: {
          id: string
          user_id: string | null
          download_type: string
          file_name: string
          downloaded_at: string
          ip_address: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          download_type: string
          file_name: string
          downloaded_at?: string
          ip_address?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          download_type?: string
          file_name?: string
          downloaded_at?: string
          ip_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pandagarde_download_tracking_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "pandagarde_users"
            referencedColumns: ["id"]
          }
        ]
      }
      pandagarde_user_sessions: {
        Row: {
          id: string
          user_id: string
          session_data: Json | null
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_data?: Json | null
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          user_id?: string
          session_data?: Json | null
          created_at?: string
          expires_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pandagarde_user_sessions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "pandagarde_users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_updated_at_column: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}