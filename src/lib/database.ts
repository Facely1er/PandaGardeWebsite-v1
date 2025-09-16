import { supabase, TABLES, type Database, isSupabaseConfigured } from './supabase'

// Re-export supabase for convenience
export { supabase }

// Error handling wrapper
const handleDatabaseError = (operation: string, error: any) => {
  console.error(`Error in ${operation}:`, error)
  if (error?.message) {
    throw new Error(`${operation} failed: ${error.message}`)
  }
  throw new Error(`${operation} failed: Unknown error occurred`)
}

// Safe database operation wrapper
const safeDbOperation = async <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    handleDatabaseError(operationName, error)
    throw error // This will never be reached due to handleDatabaseError throwing
  }
}

// Type definitions for better type safety
type Tables = Database['public']['Tables']
type User = Tables['pandagarde_users']['Row']
type Activity = Tables['pandagarde_activities']['Row']
type Progress = Tables['pandagarde_progress']['Row']
type ContactSubmission = Tables['pandagarde_contact_submissions']['Row']
type NewsletterSubscriber = Tables['pandagarde_newsletter_subscribers']['Row']
type DownloadTracking = Tables['pandagarde_download_tracking']['Row']
type UserSession = Tables['pandagarde_user_sessions']['Row']

// User management functions
export const userService = {
  // Get current user
  async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured || !supabase) return null
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        throw new Error(`Failed to fetch user: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in getCurrentUser:', error)
      throw error
    }
  },

  // Create or update user profile
  async upsertUser(userData: Partial<User>): Promise<User | null> {
    if (!isSupabaseConfigured || !supabase) return null
    
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .upsert(userData)
        .select()
        .single()

      if (error) {
        console.error('Error upserting user:', error)
        throw new Error(`Failed to upsert user: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in upsertUser:', error)
      throw error
    }
  },

  // Update user profile
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    if (!isSupabaseConfigured || !supabase) return null
    
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      return null
    }

    return data
  }
}

// Activity management functions
export const activityService = {
  // Get user activities
  async getUserActivities(userId: string): Promise<Activity[]> {
    if (!isSupabaseConfigured || !supabase) return []
    
    const { data, error } = await supabase
      .from(TABLES.ACTIVITIES)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching activities:', error)
      return []
    }

    return data || []
  },

  // Create new activity
  async createActivity(activityData: Omit<Activity, 'id' | 'created_at'>): Promise<Activity | null> {
    if (!isSupabaseConfigured || !supabase) return null
    
    const { data, error } = await supabase
      .from(TABLES.ACTIVITIES)
      .insert(activityData)
      .select()
      .single()

    if (error) {
      console.error('Error creating activity:', error)
      return null
    }

    return data
  },

  // Update activity
  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | null> {
    if (!isSupabaseConfigured || !supabase) return null
    
    const { data, error } = await supabase
      .from(TABLES.ACTIVITIES)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating activity:', error)
      return null
    }

    return data
  },

  // Mark activity as completed
  async completeActivity(id: string): Promise<Activity | null> {
    if (!isSupabaseConfigured || !supabase) return null
    return this.updateActivity(id, { completed_at: new Date().toISOString() })
  }
}

// Progress tracking functions
export const progressService = {
  // Get user progress
  async getUserProgress(userId: string): Promise<Progress[]> {
    if (!isSupabaseConfigured || !supabase) return []
    
    const { data, error } = await supabase
      .from(TABLES.PROGRESS)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching progress:', error)
      return []
    }

    return data || []
  },

  // Save progress
  async saveProgress(progressData: Omit<Progress, 'id' | 'created_at' | 'updated_at'>): Promise<Progress | null> {
    if (!isSupabaseConfigured || !supabase) return null
    
    const { data, error } = await supabase
      .from(TABLES.PROGRESS)
      .upsert(progressData)
      .select()
      .single()

    if (error) {
      console.error('Error saving progress:', error)
      return null
    }

    return data
  }
}

// Contact form functions
export const contactService = {
  // Submit contact form
  async submitContactForm(submission: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>): Promise<ContactSubmission | null> {
    if (!isSupabaseConfigured || !supabase) {
      // For demo purposes, just log the submission
      console.log('Contact form submission (demo mode):', submission)
      return null
    }
    
    return safeDbOperation(async () => {
      const { data, error } = await supabase
        .from(TABLES.CONTACT_SUBMISSIONS)
        .insert(submission)
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    }, 'submitContactForm')
  },

  // Get contact submissions (admin only)
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    if (!isSupabaseConfigured || !supabase) return []
    
    const { data, error } = await supabase
      .from(TABLES.CONTACT_SUBMISSIONS)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact submissions:', error)
      return []
    }

    return data || []
  }
}

// Newsletter functions
export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string): Promise<NewsletterSubscriber | null> {
    if (!isSupabaseConfigured || !supabase) {
      // For demo purposes, just log the subscription
      console.log('Newsletter subscription (demo mode):', email)
      return null
    }
    
    const { data, error } = await supabase
      .from(TABLES.NEWSLETTER_SUBSCRIBERS)
      .upsert({ email, is_active: true })
      .select()
      .single()

    if (error) {
      console.error('Error subscribing to newsletter:', error)
      return null
    }

    return data
  },

  // Unsubscribe from newsletter
  async unsubscribe(email: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) {
      console.log('Newsletter unsubscription (demo mode):', email)
      return true
    }
    
    const { error } = await supabase
      .from(TABLES.NEWSLETTER_SUBSCRIBERS)
      .update({ is_active: false })
      .eq('email', email)

    if (error) {
      console.error('Error unsubscribing from newsletter:', error)
      return false
    }

    return true
  }
}

// Download tracking functions
export const downloadService = {
  // Track download
  async trackDownload(downloadData: Omit<DownloadTracking, 'id' | 'downloaded_at'>): Promise<DownloadTracking | null> {
    if (!isSupabaseConfigured || !supabase) {
      // For demo purposes, just log the download
      console.log('Download tracked (demo mode):', downloadData)
      return null
    }
    
    const { data, error } = await supabase
      .from(TABLES.DOWNLOAD_TRACKING)
      .insert(downloadData)
      .select()
      .single()

    if (error) {
      console.error('Error tracking download:', error)
      return null
    }

    return data
  },

  // Get download statistics (admin only)
  async getDownloadStats(): Promise<DownloadTracking[]> {
    if (!isSupabaseConfigured || !supabase) return []
    
    const { data, error } = await supabase
      .from(TABLES.DOWNLOAD_TRACKING)
      .select('*')
      .order('downloaded_at', { ascending: false })

    if (error) {
      console.error('Error fetching download stats:', error)
      return []
    }

    return data || []
  }
}

// Session management functions
export const sessionService = {
  // Create user session
  async createSession(userId: string, sessionData: any, expiresAt: Date): Promise<UserSession | null> {
    if (!isSupabaseConfigured || !supabase) return null
    
    const { data, error } = await supabase
      .from(TABLES.USER_SESSIONS)
      .insert({
        user_id: userId,
        session_data: sessionData,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating session:', error)
      return null
    }

    return data
  },

  // Get user sessions
  async getUserSessions(userId: string): Promise<UserSession[]> {
    if (!isSupabaseConfigured || !supabase) return []
    
    const { data, error } = await supabase
      .from(TABLES.USER_SESSIONS)
      .select('*')
      .eq('user_id', userId)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching sessions:', error)
      return []
    }

    return data || []
  },

  // Clean up expired sessions
  async cleanupExpiredSessions(): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) return true
    
    const { error } = await supabase
      .from(TABLES.USER_SESSIONS)
      .delete()
      .lt('expires_at', new Date().toISOString())

    if (error) {
      console.error('Error cleaning up sessions:', error)
      return false
    }

    return true
  }
}

// Auth helper functions
export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string) {
    if (!isSupabaseConfigured || !supabase) {
      console.log('Sign up attempt (demo mode):', email)
      return { data: null, error: { message: 'Authentication not configured for demo mode' } }
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('Error signing up:', error)
      return { data: null, error }
    }

    // Create user profile after successful signup
    if (data.user) {
      try {
        await userService.upsertUser({
          id: data.user.id,
          email: data.user.email!,
          profile_data: {
            name: '',
            avatar_url: '',
            created_at: new Date().toISOString()
          }
        })
      } catch (profileError) {
        console.error('Error creating user profile:', profileError)
      }
    }

    return { data, error: null }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured || !supabase) {
      console.log('Sign in attempt (demo mode):', email)
      return { data: null, error: { message: 'Authentication not configured for demo mode' } }
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error signing in:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  // Sign out
  async signOut() {
    if (!isSupabaseConfigured || !supabase) {
      console.log('Sign out (demo mode)')
      return { error: null }
    }
    
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
    return { error }
  },

  // Get current session
  async getCurrentSession() {
    if (!isSupabaseConfigured || !supabase) {
      return { data: { session: null }, error: null }
    }
    
    const { data, error } = await supabase.auth.getSession()
    return { data, error }
  }
}