// Enhanced Search API with fuzzy matching and performance optimization
import { SearchResult } from '../contexts/SearchContext';

// Search configuration
interface SearchConfig {
  fuzzyThreshold: number;
  maxResults: number;
  debounceMs: number;
  enableHighlighting: boolean;
  enableSuggestions: boolean;
}

// Search query interface
interface SearchQuery {
  query: string;
  filters?: {
    type?: SearchResult['type'][];
    category?: string[];
    tags?: string[];
  };
  sortBy?: 'relevance' | 'title' | 'category' | 'type';
  limit?: number;
}

// Search result with enhanced metadata
interface EnhancedSearchResult extends SearchResult {
  score: number;
  highlights: {
    title: string;
    description: string;
    tags: string[];
  };
  suggestions?: string[];
}

// Default configuration
const defaultConfig: SearchConfig = {
  fuzzyThreshold: 0.6,
  maxResults: 50,
  debounceMs: 300,
  enableHighlighting: true,
  enableSuggestions: true,
};

// Fuzzy string matching using Levenshtein distance
class FuzzyMatcher {
  private static levenshteinDistance(a: string, b: string): number {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) {
      matrix[0][i] = i;
    }
    
    for (let j = 0; j <= b.length; j++) {
      matrix[j][0] = j;
    }
    
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // deletion
          matrix[j - 1][i] + 1,     // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    
    return matrix[b.length][a.length];
  }

  static calculateSimilarity(str1: string, str2: string): number {
    const distance = this.levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    const maxLength = Math.max(str1.length, str2.length);
    return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
  }

  static fuzzyMatch(query: string, text: string, threshold: number = 0.6): boolean {
    const similarity = this.calculateSimilarity(query, text);
    return similarity >= threshold;
  }
}

// Text highlighting utility
class TextHighlighter {
  static highlight(text: string, query: string): string {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
  }

  static highlightMultiple(text: string, queries: string[]): string {
    let highlighted = text;
    queries.forEach(query => {
      if (query.trim()) {
        highlighted = this.highlight(highlighted, query);
      }
    });
    return highlighted;
  }
}

// Search index for fast lookups
class SearchIndex {
  private index: Map<string, Set<string>> = new Map();
  private documents: Map<string, SearchResult> = new Map();
  private stopWords: Set<string> = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were'
  ]);

  addDocument(doc: SearchResult): void {
    this.documents.set(doc.id, doc);
    
    // Index title
    this.indexText(doc.title, doc.id);
    
    // Index description
    this.indexText(doc.description, doc.id);
    
    // Index tags
    doc.tags.forEach(tag => this.indexText(tag, doc.id));
    
    // Index category
    this.indexText(doc.category, doc.id);
  }

  private indexText(text: string, docId: string): void {
    const words = this.tokenize(text);
    words.forEach(word => {
      if (!this.index.has(word)) {
        this.index.set(word, new Set());
      }
      this.index.get(word)!.add(docId);
    });
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !this.stopWords.has(word));
  }

  search(query: string): string[] {
    const words = this.tokenize(query);
    const docSets = words.map(word => this.index.get(word) || new Set());
    
    if (docSets.length === 0) return [];
    
    // Intersection of all word sets
    let result = docSets[0];
    for (let i = 1; i < docSets.length; i++) {
      result = new Set([...result].filter(docId => docSets[i].has(docId)));
    }
    
    return Array.from(result);
  }

  getAllDocuments(): SearchResult[] {
    return Array.from(this.documents.values());
  }
}

// Main search API class
export class SearchAPI {
  private index: SearchIndex;
  private config: SearchConfig;
  private debounceTimer: number | null = null;

  constructor(config: Partial<SearchConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.index = new SearchIndex();
  }

  // Initialize search index with data
  initializeIndex(data: SearchResult[]): void {
    data.forEach(doc => this.index.addDocument(doc));
  }

  // Perform search with debouncing
  async search(query: SearchQuery): Promise<EnhancedSearchResult[]> {
    return new Promise((resolve) => {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = window.setTimeout(() => {
        const results = this.performSearch(query);
        resolve(results);
      }, this.config.debounceMs);
    });
  }

  // Perform immediate search (no debouncing)
  searchImmediate(query: SearchQuery): EnhancedSearchResult[] {
    return this.performSearch(query);
  }

  // Core search implementation
  private performSearch(query: SearchQuery): EnhancedSearchResult[] {
    const { query: searchQuery, filters, sortBy = 'relevance', limit = this.config.maxResults } = query;
    
    if (!searchQuery.trim()) {
      return this.getDefaultResults(limit);
    }

    // Get candidate documents from index
    const candidateIds = this.index.search(searchQuery);
    const allDocs = this.index.getAllDocuments();
    
    // If no indexed results, fall back to fuzzy search on all documents
    const documentsToSearch = candidateIds.length > 0 
      ? candidateIds.map(id => allDocs.find(doc => doc.id === id)!).filter(Boolean)
      : allDocs;

    // Score and filter results
    const scoredResults = documentsToSearch
      .map(doc => this.scoreDocument(doc, searchQuery))
      .filter(result => result.score > 0)
      .filter(result => this.applyFilters(result, filters))
      .sort((a, b) => this.sortResults(a, b, sortBy, searchQuery))
      .slice(0, limit);

    return scoredResults;
  }

  // Score a document against a query
  private scoreDocument(doc: SearchResult, query: string): EnhancedSearchResult {
    const queryWords = query.toLowerCase().split(/\s+/);
    let score = 0;
    const highlights = {
      title: doc.title,
      description: doc.description,
      tags: [...doc.tags],
    };

    // Exact title match gets highest score
    if (doc.title.toLowerCase().includes(query.toLowerCase())) {
      score += 10;
      if (this.config.enableHighlighting) {
        highlights.title = TextHighlighter.highlight(doc.title, query);
      }
    }

    // Title word matches
    queryWords.forEach(word => {
      if (doc.title.toLowerCase().includes(word)) {
        score += 5;
      }
    });

    // Description matches
    if (doc.description.toLowerCase().includes(query.toLowerCase())) {
      score += 3;
      if (this.config.enableHighlighting) {
        highlights.description = TextHighlighter.highlight(doc.description, query);
      }
    }

    // Tag matches
    doc.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        score += 2;
      }
      queryWords.forEach(word => {
        if (tag.toLowerCase().includes(word)) {
          score += 1;
        }
      });
    });

    // Category match
    if (doc.category.toLowerCase().includes(query.toLowerCase())) {
      score += 1;
    }

    // Fuzzy matching for partial matches
    if (score === 0) {
      const titleSimilarity = FuzzyMatcher.calculateSimilarity(query, doc.title);
      const descSimilarity = FuzzyMatcher.calculateSimilarity(query, doc.description);
      const maxSimilarity = Math.max(titleSimilarity, descSimilarity);
      
      if (maxSimilarity >= this.config.fuzzyThreshold) {
        score = maxSimilarity * 2;
      }
    }

    return {
      ...doc,
      score,
      highlights,
    };
  }

  // Apply filters to results
  private applyFilters(result: EnhancedSearchResult, filters?: SearchQuery['filters']): boolean {
    if (!filters) return true;

    if (filters.type && !filters.type.includes(result.type)) {
      return false;
    }

    if (filters.category && !filters.category.includes(result.category)) {
      return false;
    }

    if (filters.tags && !filters.tags.some(tag => result.tags.includes(tag))) {
      return false;
    }

    return true;
  }

  // Sort results
  private sortResults(a: EnhancedSearchResult, b: EnhancedSearchResult, sortBy: string, query: string): number {
    switch (sortBy) {
      case 'relevance':
        return b.score - a.score;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return b.score - a.score;
    }
  }

  // Get default results when no query
  private getDefaultResults(limit: number): EnhancedSearchResult[] {
    const allDocs = this.index.getAllDocuments();
    return allDocs
      .slice(0, limit)
      .map(doc => ({
        ...doc,
        score: 0,
        highlights: {
          title: doc.title,
          description: doc.description,
          tags: [...doc.tags],
        },
      }));
  }

  // Get search suggestions
  getSuggestions(query: string, limit: number = 5): string[] {
    if (!query.trim()) return [];

    const allDocs = this.index.getAllDocuments();
    const suggestions = new Set<string>();

    allDocs.forEach(doc => {
      // Add titles that start with query
      if (doc.title.toLowerCase().startsWith(query.toLowerCase())) {
        suggestions.add(doc.title);
      }

      // Add tags that start with query
      doc.tags.forEach(tag => {
        if (tag.toLowerCase().startsWith(query.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  // Get popular searches
  getPopularSearches(): string[] {
    return ['privacy', 'activities', 'family', 'safety', 'certificates', 'guides', 'coloring', 'digital citizenship'];
  }

  // Clear debounce timer
  clearDebounce(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }
}

// Create singleton instance
export const searchAPI = new SearchAPI();

// Utility functions
export const createSearchQuery = (
  query: string,
  options: Partial<SearchQuery> = {}
): SearchQuery => ({
  query,
  ...options,
});

export const searchWithFilters = (
  query: string,
  filters: SearchQuery['filters'],
  sortBy?: SearchQuery['sortBy']
): Promise<EnhancedSearchResult[]> => {
  return searchAPI.search(createSearchQuery(query, { filters, sortBy }));
};

export const getSearchSuggestions = (query: string): string[] => {
  return searchAPI.getSuggestions(query);
};

export const getPopularSearches = (): string[] => {
  return searchAPI.getPopularSearches();
};