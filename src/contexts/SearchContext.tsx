import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { searchAPI, createSearchQuery, EnhancedSearchResult } from '../lib/searchAPI';
import { searchContentService } from '../lib/searchContentService';
import { trackEvent, AnalyticsEvents } from '../lib/analytics';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'activity' | 'resource' | 'guide';
  url: string;
  category: string;
  tags: string[];
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: EnhancedSearchResult[];
  isSearching: boolean;
  performSearch: (query: string, filters?: any) => Promise<void>;
  clearSearch: () => void;
  getRecentSearches: () => string[];
  addToRecentSearches: (query: string) => void;
  getSuggestions: (query: string) => string[];
  getPopularSearches: () => string[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: React.ReactNode;
}

// Static search data - in a real app this would come from an API
const SEARCH_DATA: SearchResult[] = [
  // Pages
  {
    id: 'home',
    title: 'Home',
    description: 'Welcome to PandaGarde - Your family privacy education platform',
    type: 'page',
    url: '/',
    category: 'Pages',
    tags: ['home', 'welcome', 'privacy', 'education']
  },
  {
    id: 'activity-book',
    title: 'Activity Book',
    description: 'Interactive activities teaching privacy fundamentals',
    type: 'activity',
    url: '/activity-book',
    category: 'Activities',
    tags: ['activities', 'interactive', 'learning', 'privacy', 'fundamentals']
  },
  {
    id: 'story',
    title: 'Digital Bamboo Forest Story',
    description: 'Follow Privacy Panda\'s adventure learning about digital safety',
    type: 'page',
    url: '/story',
    category: 'Pages',
    tags: ['story', 'privacy panda', 'adventure', 'digital safety', 'children']
  },
  {
    id: 'family-hub',
    title: 'Family Hub',
    description: 'Your central dashboard for family privacy education and progress tracking',
    type: 'page',
    url: '/family-hub',
    category: 'Pages',
    tags: ['family', 'dashboard', 'progress', 'tracking', 'hub']
  },
  {
    id: 'about',
    title: 'About',
    description: 'Learn about PandaGarde and our mission to educate families about privacy',
    type: 'page',
    url: '/about',
    category: 'Pages',
    tags: ['about', 'mission', 'privacy', 'education', 'family']
  },
  
  // Age Groups
  {
    id: 'privacy-explorers',
    title: 'Privacy Explorers (Ages 5-8)',
    description: 'Age-appropriate privacy education for young children',
    type: 'page',
    url: '/privacy-explorers',
    category: 'Age Groups',
    tags: ['ages 5-8', 'young children', 'privacy', 'explorers', 'basic']
  },
  {
    id: 'privacy-handbook',
    title: 'Privacy Handbook (Ages 9-12)',
    description: 'Comprehensive privacy guide for elementary school children',
    type: 'page',
    url: '/privacy-handbook',
    category: 'Age Groups',
    tags: ['ages 9-12', 'elementary', 'handbook', 'privacy', 'comprehensive']
  },
  {
    id: 'digital-citizenship',
    title: 'Digital Citizenship (Ages 9-12)',
    description: 'Learn about responsible digital citizenship and online behavior',
    type: 'page',
    url: '/digital-citizenship',
    category: 'Age Groups',
    tags: ['ages 9-12', 'digital citizenship', 'online behavior', 'responsible']
  },
  {
    id: 'teen-handbook',
    title: 'Teen Privacy Handbook (Ages 13-17)',
    description: 'Advanced privacy education for teenagers',
    type: 'page',
    url: '/teen-handbook',
    category: 'Age Groups',
    tags: ['ages 13-17', 'teenagers', 'advanced', 'privacy', 'handbook']
  },
  {
    id: 'privacy-tools',
    title: 'Privacy Tools (Ages 13-17)',
    description: 'Practical tools and settings for protecting your privacy',
    type: 'page',
    url: '/privacy-tools',
    category: 'Age Groups',
    tags: ['ages 13-17', 'tools', 'settings', 'privacy protection', 'practical']
  },
  {
    id: 'digital-rights',
    title: 'Digital Rights (Ages 13-17)',
    description: 'Understanding your digital rights and how to protect them',
    type: 'page',
    url: '/digital-rights',
    category: 'Age Groups',
    tags: ['ages 13-17', 'digital rights', 'protection', 'understanding']
  },
  
  // Resources
  {
    id: 'coloring-sheets',
    title: 'Privacy Panda Coloring Sheets',
    description: 'Downloadable coloring pages featuring Privacy Panda and privacy concepts',
    type: 'resource',
    url: '/downloads/coloring-sheets',
    category: 'Resources',
    tags: ['coloring', 'download', 'privacy panda', 'printable', 'activities']
  },
  {
    id: 'safety-posters',
    title: 'Digital Safety Posters',
    description: 'Classroom-ready posters highlighting key privacy concepts',
    type: 'resource',
    url: '/downloads/safety-posters',
    category: 'Resources',
    tags: ['posters', 'download', 'classroom', 'safety', 'privacy concepts']
  },
  {
    id: 'certificates',
    title: 'Privacy Champion Certificates',
    description: 'Printable certificates to celebrate privacy education milestones',
    type: 'resource',
    url: '/downloads/certificates',
    category: 'Resources',
    tags: ['certificates', 'download', 'achievement', 'milestones', 'celebration']
  },
  {
    id: 'family-agreement',
    title: 'Family Internet Agreement',
    description: 'Customizable family guidelines for internet use',
    type: 'resource',
    url: '/downloads/family-agreement',
    category: 'Resources',
    tags: ['family agreement', 'download', 'guidelines', 'internet use', 'customizable']
  },
  
  // Guides
  {
    id: 'device-setup',
    title: 'Child-Friendly Device Setup',
    description: 'Step-by-step guide for configuring devices with appropriate controls',
    type: 'guide',
    url: '/guides/device-setup',
    category: 'Guides',
    tags: ['device setup', 'guide', 'child-friendly', 'configuration', 'controls']
  },
  {
    id: 'app-selection',
    title: 'Choosing Child-Safe Apps',
    description: 'Guidelines for selecting appropriate digital content for children',
    type: 'guide',
    url: '/guides/app-selection',
    category: 'Guides',
    tags: ['app selection', 'guide', 'child-safe', 'digital content', 'guidelines']
  },
  {
    id: 'modeling-behavior',
    title: 'Modeling Good Digital Citizenship',
    description: 'Tips for demonstrating healthy online behavior',
    type: 'guide',
    url: '/guides/modeling-behavior',
    category: 'Guides',
    tags: ['modeling', 'guide', 'digital citizenship', 'online behavior', 'tips']
  },
  {
    id: 'privacy-concerns',
    title: 'Responding to Privacy Concerns',
    description: 'What to do when privacy issues arise',
    type: 'guide',
    url: '/guides/privacy-concerns',
    category: 'Guides',
    tags: ['privacy concerns', 'guide', 'response', 'issues', 'help']
  },
  
  // Activities
  {
    id: 'coloring-activity',
    title: 'Privacy Panda Coloring Activity',
    description: 'Interactive coloring activity teaching basic privacy concepts',
    type: 'activity',
    url: '/activity-book#coloring',
    category: 'Activities',
    tags: ['coloring', 'activity', 'privacy panda', 'interactive', 'basic concepts']
  },
  {
    id: 'matching-activity',
    title: 'Privacy Matching Game',
    description: 'Match privacy concepts with their meanings',
    type: 'activity',
    url: '/activity-book#matching',
    category: 'Activities',
    tags: ['matching', 'game', 'activity', 'privacy concepts', 'learning']
  },
  {
    id: 'word-search',
    title: 'Privacy Word Search',
    description: 'Find privacy-related words in this fun word search',
    type: 'activity',
    url: '/activity-book#word-search',
    category: 'Activities',
    tags: ['word search', 'activity', 'privacy words', 'fun', 'learning']
  },
  {
    id: 'maze-activity',
    title: 'Privacy Maze Adventure',
    description: 'Navigate through the maze while learning about privacy',
    type: 'activity',
    url: '/activity-book#maze',
    category: 'Activities',
    tags: ['maze', 'adventure', 'activity', 'privacy', 'navigation']
  },
  {
    id: 'connect-dots',
    title: 'Connect the Dots - Privacy Panda',
    description: 'Connect the dots to reveal Privacy Panda',
    type: 'activity',
    url: '/activity-book#connect-dots',
    category: 'Activities',
    tags: ['connect dots', 'activity', 'privacy panda', 'reveal', 'fun']
  },
  {
    id: 'drag-drop',
    title: 'Privacy Drag & Drop',
    description: 'Drag and drop items to learn about privacy settings',
    type: 'activity',
    url: '/activity-book#drag-drop',
    category: 'Activities',
    tags: ['drag drop', 'activity', 'privacy settings', 'interactive', 'learning']
  }
];

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<EnhancedSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize search index with dynamic content
  useEffect(() => {
    const initializeSearchIndex = async () => {
      try {
        // Try to get dynamic content from Supabase first
        const dynamicContent = await searchContentService.getAllSearchContent();
        
        if (dynamicContent.length > 0) {
          // Use dynamic content from Supabase
          searchAPI.initializeIndex(dynamicContent);
          console.log('Search index initialized with dynamic content from Supabase');
        } else {
          // Fall back to static content
          searchAPI.initializeIndex(SEARCH_DATA);
          console.log('Search index initialized with static content');
          
          // Try to initialize default content in Supabase
          await searchContentService.initializeDefaultSearchContent();
        }
      } catch (error) {
        console.error('Error initializing search index:', error);
        // Fall back to static content
        searchAPI.initializeIndex(SEARCH_DATA);
      }
    };

    initializeSearchIndex();
  }, []);

  const performSearch = useCallback(async (query: string, filters?: any) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      const searchQuery = createSearchQuery(query, { filters });
      const results = await searchAPI.search(searchQuery);
      
      setSearchResults(results);
      
      // Track search analytics
      trackEvent(AnalyticsEvents.SEARCH_PERFORMED, {
        search_query: query,
        results_count: results.length,
        filters_applied: filters ? Object.keys(filters).length : 0,
      });
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const getRecentSearches = useCallback(() => {
    const recent = localStorage.getItem('pandagarde_recent_searches');
    return recent ? JSON.parse(recent) : [];
  }, []);

  const addToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return;
    
    const recent = getRecentSearches();
    const updated = [query, ...recent.filter((item: string) => item !== query)].slice(0, 10);
    localStorage.setItem('pandagarde_recent_searches', JSON.stringify(updated));
  }, [getRecentSearches]);

  const getSuggestions = useCallback((query: string) => {
    return searchAPI.getSuggestions(query);
  }, []);

  const getPopularSearches = useCallback(async () => {
    try {
      // Try to get popular searches from Supabase
      const popularSearches = await searchContentService.getPopularSearchTerms();
      return popularSearches;
    } catch (error) {
      console.error('Error getting popular searches:', error);
      // Fall back to static popular searches
      return searchAPI.getPopularSearches();
    }
  }, []);

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch,
    getRecentSearches,
    addToRecentSearches,
    getSuggestions,
    getPopularSearches
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};