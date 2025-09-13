import { supabase, TABLES, type Database } from './supabase'

// Type definitions for better type safety
type Tables = Database['public']['Tables']
type User = Tables[typeof TABLES.USERS]['Row']
type Activity = Tables[typeof TABLES.ACTIVITIES]['Row']
type Progress = Tables[typeof TABLES.PROGRESS]['Row']
type ContactSubmission = Tables[typeof TABLES.CONTACT_SUBMISSIONS]['Row']
type NewsletterSubscriber = Tables[typeof TABLES.NEWSLETTER_SUBSCRIBERS]['Row']
type DownloadTracking = Tables[typeof TABLES.DOWNLOAD_TRACKING]['Row']
type UserSession = Tables[typeof TABLES.USER_SESSIONS]['Row']

// User management functions
export const userService = {
  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user:', error)
      return null
    }

    return data
  },

  // Create or update user profile
  async upsertUser(userData: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .upsert(userData)
      .select()
      .single()

    if (error) {
      console.error('Error upserting user:', error)
      return null
    }

    return data
  },

  // Update user profile
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
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
    return this.updateActivity(id, { completed_at: new Date().toISOString() })
  }
}

// Progress tracking functions
export const progressService = {
  // Get user progress
  async getUserProgress(userId: string): Promise<Progress[]> {
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
    const { data, error } = await supabase
      .from(TABLES.CONTACT_SUBMISSIONS)
      .insert(submission)
      .select()
      .single()

    if (error) {
      console.error('Error submitting contact form:', error)
      return null
    }

    return data
  },

  // Get contact submissions (admin only)
  async getContactSubmissions(): Promise<ContactSubmission[]> {
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
      await userService.upsertUser({
        id: data.user.id,
        email: data.user.email!,
        profile_data: {}
      })
    }

    return { data, error: null }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
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
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
    return { error }
  },

  // Get current session
  async getCurrentSession() {
    const { data, error } = await supabase.auth.getSession()
    return { data, error }
  }
}