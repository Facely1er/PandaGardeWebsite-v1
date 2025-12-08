/**
 * RSS Alert Service for Child Privacy and Safety
 * Processes RSS feeds and converts them to child safety alerts
 */

import { childRssFeeds, severityKeywords, type ChildRSSFeed } from '../data/childRssFeeds';
import { childServiceCatalog } from '../data/childServiceCatalog';

export interface ChildSafetyAlert {
  id: string;
  title: string;
  description: string;
  link?: string;
  publishedDate: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'child-safety' | 'privacy' | 'data-breach' | 'parental-controls' | 'education';
  relatedServices: string[];
  isChildFocused: boolean;
}

class ChildRSSAlertService {
  private isProcessing: boolean = false;
  private lastProcessed: Date | null = null;
  private processInterval: NodeJS.Timeout | null = null;
  private readonly DEFAULT_INTERVAL = 3600000; // 1 hour
  private cache = new Map<string, { data: ChildSafetyAlert[]; timestamp: number }>();
  private cacheTimeout = 3600000; // 1 hour cache

  /**
   * Initialize the RSS alert service
   */
  initialize(intervalMs: number = this.DEFAULT_INTERVAL): void {
    if (typeof window === 'undefined') return;
    
    console.log('[Child RSS Alert Service] Initializing...');
    
    // Process feeds immediately on initialization
    this.processFeeds();
    
    // Set up recurring processing
    this.processInterval = setInterval(() => {
      this.processFeeds();
    }, intervalMs);
  }

  /**
   * Stop automatic feed processing
   */
  stop(): void {
    if (this.processInterval) {
      clearInterval(this.processInterval);
      this.processInterval = null;
    }
  }

  /**
   * Process all active RSS feeds
   */
  async processFeeds(): Promise<ChildSafetyAlert[]> {
    if (this.isProcessing) {
      return [];
    }

    this.isProcessing = true;
    const allAlerts: ChildSafetyAlert[] = [];

    try {
      const activeFeeds = childRssFeeds.filter(feed => feed.isActive);
      
      for (const feed of activeFeeds) {
        try {
          const alerts = await this.fetchAndProcessFeed(feed);
          allAlerts.push(...alerts);
        } catch (error) {
          console.error(`Error processing feed ${feed.id}:`, error);
        }
      }

      this.lastProcessed = new Date();
      return allAlerts;
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Fetch and process a single RSS feed
   */
  private async fetchAndProcessFeed(feed: ChildRSSFeed): Promise<ChildSafetyAlert[]> {
    // Check cache
    const cached = this.cache.get(feed.id);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      // Use CORS proxy for RSS feeds (in production, use backend API)
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.statusText}`);
      }

      const data = await response.json();
      const xmlContent = data.contents;

      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

      // Extract items
      const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        description: item.querySelector('description')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
        guid: item.querySelector('guid')?.textContent || item.querySelector('link')?.textContent || ''
      }));

      // Convert to alerts
      const alerts: ChildSafetyAlert[] = items.map(item => {
        const severity = this.determineSeverity(item.title, item.description);
        const relatedServices = this.findRelatedServices(item.title, item.description, feed);

        return {
          id: item.guid || `${feed.id}-${Date.now()}-${Math.random()}`,
          title: item.title,
          description: item.description,
          link: item.link,
          publishedDate: item.pubDate,
          severity,
          category: feed.category,
          relatedServices,
          isChildFocused: true
        };
      });

      // Cache the result
      this.cache.set(feed.id, {
        data: alerts,
        timestamp: Date.now()
      });

      return alerts;
    } catch (error) {
      console.error(`Error fetching RSS feed ${feed.id}:`, error);
      return [];
    }
  }

  /**
   * Determine severity from title and description
   */
  private determineSeverity(title: string, description: string): 'critical' | 'high' | 'medium' | 'low' {
    const text = `${title} ${description}`.toLowerCase();

    if (severityKeywords.critical.some(keyword => text.includes(keyword))) {
      return 'critical';
    }
    if (severityKeywords.high.some(keyword => text.includes(keyword))) {
      return 'high';
    }
    if (severityKeywords.medium.some(keyword => text.includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Find related child services from content
   */
  private findRelatedServices(title: string, description: string, feed: ChildRSSFeed): string[] {
    const text = `${title} ${description}`.toLowerCase();
    const related: string[] = [];

    // Check feed-specific keywords
    Object.entries(feed.serviceKeywords).forEach(([serviceId, keywords]) => {
      if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
        related.push(serviceId);
      }
    });

    // Check service names
    childServiceCatalog.forEach(service => {
      if (text.includes(service.name.toLowerCase())) {
        if (!related.includes(service.id)) {
          related.push(service.id);
        }
      }
    });

    return related;
  }

  /**
   * Get status information
   */
  getStatus(): { isProcessing: boolean; lastProcessed: Date | null; isActive: boolean } {
    return {
      isProcessing: this.isProcessing,
      lastProcessed: this.lastProcessed,
      isActive: this.processInterval !== null
    };
  }
}

export const childRSSAlertService = new ChildRSSAlertService();

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  childRSSAlertService.initialize(3600000);
}

