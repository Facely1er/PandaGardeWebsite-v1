import { supabase, isSupabaseConfigured } from './supabase';
import { SearchResult } from '../contexts/SearchContext';

// Search content interface for database
interface SearchContent {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'activity' | 'resource' | 'guide';
  url: string;
  category: string;
  tags: string[];
  content_data?: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Search content service
export const searchContentService = {
  // Get all active search content
  async getAllSearchContent(): Promise<SearchResult[]> {
    if (!isSupabaseConfigured || !supabase) {
      // Return empty array if Supabase is not configured
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('pandagarde_search_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching search content:', error);
        return [];
      }

      return (data || []).map((item: SearchContent) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        url: item.url,
        category: item.category,
        tags: item.tags || [],
      }));
    } catch (error) {
      console.error('Error in getAllSearchContent:', error);
      return [];
    }
  },

  // Get search content by type
  async getSearchContentByType(type: SearchResult['type']): Promise<SearchResult[]> {
    if (!isSupabaseConfigured || !supabase) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('pandagarde_search_content')
        .select('*')
        .eq('type', type)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching search content by type:', error);
        return [];
      }

      return (data || []).map((item: SearchContent) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        url: item.url,
        category: item.category,
        tags: item.tags || [],
      }));
    } catch (error) {
      console.error('Error in getSearchContentByType:', error);
      return [];
    }
  },

  // Get search content by category
  async getSearchContentByCategory(category: string): Promise<SearchResult[]> {
    if (!isSupabaseConfigured || !supabase) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('pandagarde_search_content')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching search content by category:', error);
        return [];
      }

      return (data || []).map((item: SearchContent) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        url: item.url,
        category: item.category,
        tags: item.tags || [],
      }));
    } catch (error) {
      console.error('Error in getSearchContentByCategory:', error);
      return [];
    }
  },

  // Search content with text search
  async searchContent(query: string): Promise<SearchResult[]> {
    if (!isSupabaseConfigured || !supabase) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('pandagarde_search_content')
        .select('*')
        .eq('is_active', true)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching content:', error);
        return [];
      }

      return (data || []).map((item: SearchContent) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        url: item.url,
        category: item.category,
        tags: item.tags || [],
      }));
    } catch (error) {
      console.error('Error in searchContent:', error);
      return [];
    }
  },

  // Create new search content (admin function)
  async createSearchContent(contentData: Omit<SearchContent, 'id' | 'created_at' | 'updated_at'>): Promise<SearchContent | null> {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('pandagarde_search_content')
        .insert(contentData)
        .select()
        .single();

      if (error) {
        console.error('Error creating search content:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createSearchContent:', error);
      return null;
    }
  },

  // Update search content (admin function)
  async updateSearchContent(id: string, updates: Partial<SearchContent>): Promise<SearchContent | null> {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('pandagarde_search_content')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating search content:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in updateSearchContent:', error);
      return null;
    }
  },

  // Delete search content (admin function)
  async deleteSearchContent(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('pandagarde_search_content')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting search content:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteSearchContent:', error);
      return false;
    }
  },

  // Get popular search terms (based on analytics)
  async getPopularSearchTerms(): Promise<string[]> {
    if (!isSupabaseConfigured || !supabase) {
      return ['privacy', 'activities', 'family', 'safety', 'certificates', 'guides', 'coloring', 'digital citizenship'];
    }

    try {
      // This would typically query an analytics table
      // For now, return default popular terms
      return ['privacy', 'activities', 'family', 'safety', 'certificates', 'guides', 'coloring', 'digital citizenship'];
    } catch (error) {
      console.error('Error in getPopularSearchTerms:', error);
      return ['privacy', 'activities', 'family', 'safety', 'certificates', 'guides', 'coloring', 'digital citizenship'];
    }
  },

  // Initialize default search content (admin function)
  async initializeDefaultSearchContent(): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) {
      return false;
    }

    try {
      // Check if content already exists
      const { data: existingContent } = await supabase
        .from('pandagarde_search_content')
        .select('id')
        .limit(1);

      if (existingContent && existingContent.length > 0) {
        console.log('Search content already initialized');
        return true;
      }

      // Default search content data
      const defaultContent: Omit<SearchContent, 'id' | 'created_at' | 'updated_at'>[] = [
        // Pages
        {
          title: 'Home',
          description: 'Welcome to PandaGarde - Your family privacy education platform',
          type: 'page',
          url: '/',
          category: 'Pages',
          tags: ['home', 'welcome', 'privacy', 'education'],
          is_active: true,
        },
        {
          title: 'Activity Book',
          description: 'Interactive activities teaching privacy fundamentals',
          type: 'activity',
          url: '/activity-book',
          category: 'Activities',
          tags: ['activities', 'interactive', 'learning', 'privacy', 'fundamentals'],
          is_active: true,
        },
        {
          title: 'Digital Bamboo Forest Story',
          description: 'Follow Privacy Panda\'s adventure learning about digital safety',
          type: 'page',
          url: '/story',
          category: 'Pages',
          tags: ['story', 'privacy panda', 'adventure', 'digital safety', 'children'],
          is_active: true,
        },
        {
          title: 'Family Hub',
          description: 'Your central dashboard for family privacy education and progress tracking',
          type: 'page',
          url: '/family-hub',
          category: 'Pages',
          tags: ['family', 'dashboard', 'progress', 'tracking', 'hub'],
          is_active: true,
        },
        {
          title: 'About',
          description: 'Learn about PandaGarde and our mission to educate families about privacy',
          type: 'page',
          url: '/about',
          category: 'Pages',
          tags: ['about', 'mission', 'privacy', 'education', 'family'],
          is_active: true,
        },
        
        // Age Groups
        {
          title: 'Privacy Explorers (Ages 5-8)',
          description: 'Age-appropriate privacy education for young children',
          type: 'page',
          url: '/privacy-explorers',
          category: 'Age Groups',
          tags: ['ages 5-8', 'young children', 'privacy', 'explorers', 'basic'],
          is_active: true,
        },
        {
          title: 'Privacy Handbook (Ages 9-12)',
          description: 'Comprehensive privacy guide for elementary school children',
          type: 'page',
          url: '/privacy-handbook',
          category: 'Age Groups',
          tags: ['ages 9-12', 'elementary', 'handbook', 'privacy', 'comprehensive'],
          is_active: true,
        },
        {
          title: 'Teen Privacy Handbook (Ages 13-17)',
          description: 'Advanced privacy education for teenagers',
          type: 'page',
          url: '/teen-handbook',
          category: 'Age Groups',
          tags: ['ages 13-17', 'teenagers', 'advanced', 'privacy', 'handbook'],
          is_active: true,
        },
        
        // Resources
        {
          title: 'Privacy Panda Coloring Sheets',
          description: 'Downloadable coloring pages featuring Privacy Panda and privacy concepts',
          type: 'resource',
          url: '/downloads/coloring-sheets',
          category: 'Resources',
          tags: ['coloring', 'download', 'privacy panda', 'printable', 'activities'],
          is_active: true,
        },
        {
          title: 'Digital Safety Posters',
          description: 'Classroom-ready posters highlighting key privacy concepts',
          type: 'resource',
          url: '/downloads/safety-posters',
          category: 'Resources',
          tags: ['posters', 'download', 'classroom', 'safety', 'privacy concepts'],
          is_active: true,
        },
        {
          title: 'Privacy Champion Certificates',
          description: 'Printable certificates to celebrate privacy education milestones',
          type: 'resource',
          url: '/downloads/certificates',
          category: 'Resources',
          tags: ['certificates', 'download', 'achievement', 'milestones', 'celebration'],
          is_active: true,
        },
        {
          title: 'Family Internet Agreement',
          description: 'Customizable family guidelines for internet use',
          type: 'resource',
          url: '/downloads/family-agreement',
          category: 'Resources',
          tags: ['family agreement', 'download', 'guidelines', 'internet use', 'customizable'],
          is_active: true,
        },
        
        // Guides
        {
          title: 'Child-Friendly Device Setup',
          description: 'Step-by-step guide for configuring devices with appropriate controls',
          type: 'guide',
          url: '/guides/device-setup',
          category: 'Guides',
          tags: ['device setup', 'guide', 'child-friendly', 'configuration', 'controls'],
          is_active: true,
        },
        {
          title: 'Choosing Child-Safe Apps',
          description: 'Guidelines for selecting appropriate digital content for children',
          type: 'guide',
          url: '/guides/app-selection',
          category: 'Guides',
          tags: ['app selection', 'guide', 'child-safe', 'digital content', 'guidelines'],
          is_active: true,
        },
        {
          title: 'Modeling Good Digital Citizenship',
          description: 'Tips for demonstrating healthy online behavior',
          type: 'guide',
          url: '/guides/modeling-behavior',
          category: 'Guides',
          tags: ['modeling', 'guide', 'digital citizenship', 'online behavior', 'tips'],
          is_active: true,
        },
        {
          title: 'Responding to Privacy Concerns',
          description: 'What to do when privacy issues arise',
          type: 'guide',
          url: '/guides/privacy-concerns',
          category: 'Guides',
          tags: ['privacy concerns', 'guide', 'response', 'issues', 'help'],
          is_active: true,
        },
        
        // Activities
        {
          title: 'Privacy Panda Coloring Activity',
          description: 'Interactive coloring activity teaching basic privacy concepts',
          type: 'activity',
          url: '/activity-book#coloring',
          category: 'Activities',
          tags: ['coloring', 'activity', 'privacy panda', 'interactive', 'basic concepts'],
          is_active: true,
        },
        {
          title: 'Privacy Matching Game',
          description: 'Match privacy concepts with their meanings',
          type: 'activity',
          url: '/activity-book#matching',
          category: 'Activities',
          tags: ['matching', 'game', 'activity', 'privacy concepts', 'learning'],
          is_active: true,
        },
        {
          title: 'Privacy Word Search',
          description: 'Find privacy-related words in this fun word search',
          type: 'activity',
          url: '/activity-book#word-search',
          category: 'Activities',
          tags: ['word search', 'activity', 'privacy words', 'fun', 'learning'],
          is_active: true,
        },
        {
          title: 'Privacy Maze Adventure',
          description: 'Navigate through the maze while learning about privacy',
          type: 'activity',
          url: '/activity-book#maze',
          category: 'Activities',
          tags: ['maze', 'adventure', 'activity', 'privacy', 'navigation'],
          is_active: true,
        },
        {
          title: 'Connect the Dots - Privacy Panda',
          description: 'Connect the dots to reveal Privacy Panda',
          type: 'activity',
          url: '/activity-book#connect-dots',
          category: 'Activities',
          tags: ['connect dots', 'activity', 'privacy panda', 'reveal', 'fun'],
          is_active: true,
        },
        {
          title: 'Privacy Drag & Drop',
          description: 'Drag and drop items to learn about privacy settings',
          type: 'activity',
          url: '/activity-book#drag-drop',
          category: 'Activities',
          tags: ['drag drop', 'activity', 'privacy settings', 'interactive', 'learning'],
          is_active: true,
        },
      ];

      // Insert all default content
      const { error } = await supabase
        .from('pandagarde_search_content')
        .insert(defaultContent);

      if (error) {
        console.error('Error initializing default search content:', error);
        return false;
      }

      console.log('Default search content initialized successfully');
      return true;
    } catch (error) {
      console.error('Error in initializeDefaultSearchContent:', error);
      return false;
    }
  },
};