import { supabase, TABLES, type Database, isSupabaseConfigured } from './supabase'
import { logger } from './logger'

// Re-export supabase for convenience
export { supabase }

// Frontend-only mode - all database operations are disabled
console.log('Running in frontend-only mode - database operations disabled')

// Mock error handling for compatibility
const handleDatabaseError = (operation: string, error: unknown) => {
  console.log(`Frontend-only mode: ${operation} would have failed:`, error)
  return null
}

// Mock database operation wrapper for compatibility
const safeDbOperation = async <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T | null> => {
  console.log(`Frontend-only mode: ${operationName} operation skipped`)
  return null
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

// User management functions - Frontend-only mode
export const userService = {
  // Get current user - always returns null in frontend-only mode
  async getCurrentUser(): Promise<User | null> {
    console.log('Frontend-only mode: getCurrentUser() - returning null')
    return null
  },

  // Create or update user profile - disabled in frontend-only mode
  async upsertUser(userData: Partial<User>): Promise<User | null> {
    console.log('Frontend-only mode: upsertUser() - operation skipped', userData)
    return null
  },

  // Update user profile - disabled in frontend-only mode
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    console.log('Frontend-only mode: updateUser() - operation skipped', { id, updates })
    return null
  }
}

// Activity management functions - Frontend-only mode
export const activityService = {
  // Get user activities - returns empty array in frontend-only mode
  async getUserActivities(userId: string): Promise<Activity[]> {
    console.log('Frontend-only mode: getUserActivities() - returning empty array', userId)
    return []
  },

  // Create new activity - disabled in frontend-only mode
  async createActivity(activityData: Omit<Activity, 'id' | 'created_at'>): Promise<Activity | null> {
    console.log('Frontend-only mode: createActivity() - operation skipped', activityData)
    return null
  },

  // Update activity - disabled in frontend-only mode
  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | null> {
    console.log('Frontend-only mode: updateActivity() - operation skipped', { id, updates })
    return null
  },

  // Mark activity as completed - disabled in frontend-only mode
  async completeActivity(id: string): Promise<Activity | null> {
    console.log('Frontend-only mode: completeActivity() - operation skipped', id)
    return null
  }
}

// Progress tracking functions - Frontend-only mode
export const progressService = {
  // Get user progress - returns empty array in frontend-only mode
  async getUserProgress(userId: string): Promise<Progress[]> {
    console.log('Frontend-only mode: getUserProgress() - returning empty array', userId)
    return []
  },

  // Save progress - disabled in frontend-only mode
  async saveProgress(progressData: Omit<Progress, 'id' | 'created_at' | 'updated_at'>): Promise<Progress | null> {
    console.log('Frontend-only mode: saveProgress() - operation skipped', progressData)
    return null
  }
}

// Contact form functions - Frontend-only mode
export const contactService = {
  // Submit contact form - logs submission in frontend-only mode
  async submitContactForm(submission: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>): Promise<ContactSubmission | null> {
<<<<<<< HEAD
    console.log('Frontend-only mode: Contact form submission logged:', submission)
    // In a real frontend-only setup, you might want to send this to an external service
    // For now, we just log it
    return null
=======
    if (!isSupabaseConfigured || !supabase) {
      // For demo purposes, just log the submission
      logger.info('Contact form submission (demo mode)', submission, 'DATABASE')
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
>>>>>>> origin/main
  },

  // Get contact submissions - returns empty array in frontend-only mode
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    console.log('Frontend-only mode: getContactSubmissions() - returning empty array')
    return []
  }
}

// Newsletter functions - Frontend-only mode
export const newsletterService = {
  // Subscribe to newsletter - logs subscription in frontend-only mode
  async subscribe(email: string): Promise<NewsletterSubscriber | null> {
<<<<<<< HEAD
    console.log('Frontend-only mode: Newsletter subscription logged:', email)
    // In a real frontend-only setup, you might want to send this to an external service
    return null
=======
    if (!isSupabaseConfigured || !supabase) {
      // For demo purposes, just log the subscription
      logger.info('Newsletter subscription (demo mode)', { email }, 'DATABASE')
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
>>>>>>> origin/main
  },

  // Unsubscribe from newsletter - logs unsubscription in frontend-only mode
  async unsubscribe(email: string): Promise<boolean> {
<<<<<<< HEAD
    console.log('Frontend-only mode: Newsletter unsubscription logged:', email)
=======
    if (!isSupabaseConfigured || !supabase) {
      logger.info('Newsletter unsubscription (demo mode)', { email }, 'DATABASE')
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

>>>>>>> origin/main
    return true
  }
}

// Download tracking functions - Frontend-only mode
export const downloadService = {
  // Track download - uses localStorage in frontend-only mode
  async trackDownload(downloadData: Omit<DownloadTracking, 'id' | 'downloaded_at'>): Promise<DownloadTracking | null> {
    const downloadRecord = {
      ...downloadData,
      id: crypto.randomUUID(),
      downloaded_at: new Date().toISOString()
    };

    // Store in localStorage for frontend-only mode
    try {
      const existingDownloads = JSON.parse(localStorage.getItem('pandagarde_downloads') || '[]');
      existingDownloads.push(downloadRecord);
      localStorage.setItem('pandagarde_downloads', JSON.stringify(existingDownloads));
      console.log('Frontend-only mode: Download tracked (localStorage):', downloadRecord);
      return downloadRecord;
    } catch (error) {
      console.error('Error storing download in localStorage:', error);
      return null;
    }
  },

  // Get download statistics - returns localStorage data in frontend-only mode
  async getDownloadStats(): Promise<DownloadTracking[]> {
    try {
      const localDownloads = JSON.parse(localStorage.getItem('pandagarde_downloads') || '[]');
      return localDownloads.sort((a: DownloadTracking, b: DownloadTracking) => 
        new Date(b.downloaded_at).getTime() - new Date(a.downloaded_at).getTime()
      );
    } catch (error) {
      console.error('Error fetching local download stats:', error);
      return [];
    }
  }
}

// Session management functions - Frontend-only mode
export const sessionService = {
  // Create user session - disabled in frontend-only mode
  async createSession(userId: string, sessionData: Record<string, unknown>, expiresAt: Date): Promise<UserSession | null> {
    console.log('Frontend-only mode: createSession() - operation skipped', { userId, sessionData, expiresAt })
    return null
  },

  // Get user sessions - returns empty array in frontend-only mode
  async getUserSessions(userId: string): Promise<UserSession[]> {
    console.log('Frontend-only mode: getUserSessions() - returning empty array', userId)
    return []
  },

  // Clean up expired sessions - always returns true in frontend-only mode
  async cleanupExpiredSessions(): Promise<boolean> {
    console.log('Frontend-only mode: cleanupExpiredSessions() - operation skipped')
    return true
  }
}

// Auth helper functions - Frontend-only mode
export const authService = {
  // Sign up with email and password - disabled in frontend-only mode
  async signUp(email: string, password: string) {
    console.log('Frontend-only mode: Sign up attempt logged:', email)
    return { data: null, error: { message: 'Authentication disabled - redirect to family hub project' } }
  },

  // Sign in with email and password - disabled in frontend-only mode
  async signIn(email: string, password: string) {
    console.log('Frontend-only mode: Sign in attempt logged:', email)
    return { data: null, error: { message: 'Authentication disabled - redirect to family hub project' } }
  },

  // Sign out - always succeeds in frontend-only mode
  async signOut() {
    console.log('Frontend-only mode: Sign out logged')
    return { error: null }
  },

  // Get current session - always returns null in frontend-only mode
  async getCurrentSession() {
    console.log('Frontend-only mode: getCurrentSession() - returning null')
    return { data: { session: null }, error: null }
  }
}