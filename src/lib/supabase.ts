import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

// Get environment variables
const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'];
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'];

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  logger.warn('Supabase environment variables are not set. Some features may not work.', undefined, 'Supabase');
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null;
};

// Safe Supabase query wrapper - returns null if Supabase is not available
export const safeSupabaseQuery = async <T>(
  queryFn: (client: NonNullable<typeof supabase>) => Promise<{ data: T | null; error: any }>
): Promise<{ data: T | null; error: string | null }> => {
  if (!supabase) {
    return { data: null, error: 'Supabase is not configured' };
  }

  try {
    const result = await queryFn(supabase);
    if (result.error) {
      return { data: null, error: result.error.message || 'Database query failed' };
    }
    return { data: result.data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { data: null, error: errorMessage };
  }
};

// Safe Supabase mutation wrapper - returns null if Supabase is not available
export const safeSupabaseMutation = async <T>(
  mutationFn: (client: NonNullable<typeof supabase>) => Promise<{ data: T | null; error: any }>
): Promise<{ data: T | null; error: string | null }> => {
  if (!supabase) {
    return { data: null, error: 'Supabase is not configured' };
  }

  try {
    const result = await mutationFn(supabase);
    if (result.error) {
      return { data: null, error: result.error.message || 'Database mutation failed' };
    }
    return { data: result.data, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { data: null, error: errorMessage };
  }
};

// Database schema prefix
export const DB_SCHEMA_PREFIX = 'pandagarde_';

