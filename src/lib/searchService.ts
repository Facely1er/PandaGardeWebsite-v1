import { supabase, TABLES } from './supabase';
import { trackEvent, AnalyticsEvents } from './analytics';

export interface SearchContentItem {
  id: string;
  title: string;
  description: string;
  content_type: 'page' | 'activity' | 'resource' | 'guide';
  url: string;
  category_id: string;
  tags: string[];
  metadata: Record<string, unknown>;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SearchCategory {
  id: string;
  name: string;
  display_name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SearchSuggestion {
  id: string;
  suggestion: string;
  suggestion_type: 'popular' | 'recent' | 'recommended';
  usage_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SearchAnalytics {
  id: string;
  search_query: string;
  results_count: number;
  user_id?: string;
  session_id?: string;
  filters_applied: Record<string, unknown>;
  searched_at: string;
}

export interface SearchFilters {
  content_type?: string[];
  category_id?: string;
  tags?: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'activity' | 'resource' | 'guide';
  url: string;
  category: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  score?: number;
}

class SearchService {
  private searchIndex: SearchContentItem[] = [];
  private categories: SearchCategory[] = [];
  private suggestions: SearchSuggestion[] = [];

  async initialize(): Promise<void> {
    try {
      await this.loadSearchContent();
      await this.loadCategories();
      await this.loadSuggestions();
    } catch (error) {
      console.error('Failed to initialize search service:', error);
    }
  }

  private async loadSearchContent(): Promise<void> {
    if (!supabase) return;

    const { data, error } = await supabase
      .from(TABLES.SEARCH_CONTENT)
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error loading search content:', error);
      return;
    }

    this.searchIndex = data || [];
  }

  private async loadCategories(): Promise<void> {
    if (!supabase) return;

    const { data, error } = await supabase
      .from(TABLES.SEARCH_CATEGORIES)
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error loading search categories:', error);
      return;
    }

    this.categories = data || [];
  }

  private async loadSuggestions(): Promise<void> {
    if (!supabase) return;

    const { data, error } = await supabase
      .from(TABLES.SEARCH_SUGGESTIONS)
      .select('*')
      .eq('is_active', true)
      .order('usage_count', { ascending: false });

    if (error) {
      console.error('Error loading search suggestions:', error);
      return;
    }

    this.suggestions = data || [];
  }

  async search(query: string, filters?: SearchFilters): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search through the index
    for (const item of this.searchIndex) {
      let score = 0;
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const tags = (item.tags || []).map(tag => tag.toLowerCase());

      // Title matches (highest priority)
      if (title.includes(normalizedQuery)) {
        score += 10;
      }

      // Description matches
      if (description.includes(normalizedQuery)) {
        score += 5;
      }

      // Tag matches
      const tagMatches = tags.filter(tag => tag.includes(normalizedQuery));
      score += tagMatches.length * 3;

      // Apply filters
      if (filters) {
        if (filters.content_type && !filters.content_type.includes(item.content_type)) {
          continue;
        }
        if (filters.category_id && item.category_id !== filters.category_id) {
          continue;
        }
        if (filters.tags && !filters.tags.some(tag => (item.tags || []).includes(tag))) {
          continue;
        }
      }

      if (score > 0) {
        const category = this.categories.find(cat => cat.id === item.category_id);
        results.push({
          id: item.id,
          title: item.title,
          description: item.description,
          type: item.content_type,
          url: item.url,
          category: category?.display_name || 'Uncategorized',
          tags: item.tags || [],
          metadata: item.metadata,
          score
        });
      }
    }

    // Sort by score (highest first)
    results.sort((a, b) => (b.score || 0) - (a.score || 0));

    // Track search analytics
    await this.trackSearchAnalytics(query, results.length, filters);

    return results;
  }

  async getSuggestions(query: string): Promise<string[]> {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase();
    const suggestions: string[] = [];

    // Get suggestions from database
    for (const suggestion of this.suggestions) {
      if (suggestion.suggestion.toLowerCase().includes(normalizedQuery)) {
        suggestions.push(suggestion.suggestion);
      }
    }

    // Get suggestions from content titles
    for (const item of this.searchIndex) {
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        suggestions.push(item.title);
      }
    }

    // Remove duplicates and limit results
    return [...new Set(suggestions)].slice(0, 10);
  }

  async getPopularSearches(): Promise<string[]> {
    return this.suggestions
      .filter(s => s.suggestion_type === 'popular')
      .slice(0, 10)
      .map(s => s.suggestion);
  }

  async getCategories(): Promise<SearchCategory[]> {
    return this.categories;
  }

  async addSearchContent(content: Omit<SearchContentItem, 'id' | 'created_at' | 'updated_at'>): Promise<SearchContentItem | null> {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from(TABLES.SEARCH_CONTENT)
      .insert([content])
      .select()
      .single();

    if (error) {
      console.error('Error adding search content:', error);
      return null;
    }

    // Reload search content
    await this.loadSearchContent();
    return data;
  }

  async updateSearchContent(id: string, updates: Partial<SearchContentItem>): Promise<SearchContentItem | null> {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from(TABLES.SEARCH_CONTENT)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating search content:', error);
      return null;
    }

    // Reload search content
    await this.loadSearchContent();
    return data;
  }

  async deleteSearchContent(id: string): Promise<boolean> {
    if (!supabase) return false;

    const { error } = await supabase
      .from(TABLES.SEARCH_CONTENT)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting search content:', error);
      return false;
    }

    // Reload search content
    await this.loadSearchContent();
    return true;
  }

  private async trackSearchAnalytics(query: string, resultsCount: number, filters?: SearchFilters): Promise<void> {
    if (!supabase) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase
        .from(TABLES.SEARCH_ANALYTICS)
        .insert([{
          search_query: query,
          results_count: resultsCount,
          user_id: user?.id,
          session_id: this.generateSessionId(),
          filters_applied: filters || {}
        }]);

      // Track in analytics
      trackEvent(AnalyticsEvents.SEARCH_PERFORMED, {
        search_query: query,
        results_count: resultsCount,
        filters_applied: filters ? Object.keys(filters).length : 0,
      });
    } catch (error) {
      console.error('Error tracking search analytics:', error);
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async refreshIndex(): Promise<void> {
    await this.initialize();
  }
}

export const searchService = new SearchService();