import ReactGA from 'react-ga4';
import { logger } from './logger';
import { coppaComplianceManager } from './coppaCompliance';

// Analytics configuration
interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  enabled: boolean;
}

// Event types for consistent tracking
export const AnalyticsEvents = {
  // User Actions
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_PROFILE_UPDATE: 'user_profile_update',
  
  // Navigation
  PAGE_VIEW: 'page_view',
  NAVIGATION_CLICK: 'navigation_click',
  SEARCH_PERFORMED: 'search_performed',
  
  // Content Engagement
  STORY_STARTED: 'story_started',
  STORY_COMPLETED: 'story_completed',
  ACTIVITY_STARTED: 'activity_started',
  ACTIVITY_COMPLETED: 'activity_completed',
  CERTIFICATE_GENERATED: 'certificate_generated',
  DOWNLOAD_INITIATED: 'download_initiated',
  
  // Family Features
  FAMILY_CREATED: 'family_created',
  CHILD_ADDED: 'child_added',
  PROGRESS_VIEWED: 'progress_viewed',
  FAMILY_MEMBER_ADDED: 'family_member_added',
  FAMILY_MEMBER_REMOVED: 'family_member_removed',
  CHILD_PROGRESS_VIEWED: 'child_progress_viewed',
  FAMILY_GOAL_ADDED: 'family_goal_added',
  FAMILY_GOAL_COMPLETED: 'family_goal_completed',
  FEEDBACK_SUBMITTED: 'feedback_submitted',
  
  // Educational Content
  RESOURCE_VIEWED: 'resource_viewed',
  GUIDE_ACCESSED: 'guide_accessed',
  FAQ_VIEWED: 'faq_viewed',
  
  // Performance
  ERROR_OCCURRED: 'error_occurred',
  PERFORMANCE_METRIC: 'performance_metric',
  ALERT_CREATED: 'alert_created',
  ALERT_RESOLVED: 'alert_resolved',
  
  // Pilot Program
  PILOT_PAGE_VIEWED: 'pilot_page_viewed',
  PILOT_BANNER_SHOWN: 'pilot_banner_shown',
  PILOT_BANNER_DISMISSED: 'pilot_banner_dismissed',
  PILOT_BANNER_CLICKED: 'pilot_banner_clicked',
  PILOT_CTA_CLICKED: 'pilot_cta_clicked',
  PILOT_JOIN_CLICKED: 'pilot_join_clicked',
  PILOT_LEARN_MORE_CLICKED: 'pilot_learn_more_clicked',
} as const;

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Initialize analytics
export const initAnalytics = () => {
  // Check zero-data mode first (COPPA compliance)
  if (coppaComplianceManager.isZeroDataMode()) {
    logger.info('Analytics disabled: zero-data mode active (COPPA compliance)', undefined, 'ANALYTICS');
    return;
  }

  const config: AnalyticsConfig = {
    googleAnalyticsId: import.meta.env['VITE_GOOGLE_ANALYTICS_ID'],
    googleTagManagerId: import.meta.env['VITE_GOOGLE_TAG_MANAGER_ID'],
    enabled: import.meta.env.MODE === 'production' || import.meta.env['VITE_ANALYTICS_DEBUG'] === 'true',
  };

  if (!config.enabled) {
    logger.info('Analytics disabled in development mode', undefined, 'ANALYTICS');
    return;
  }

  // Initialize Google Analytics 4
  if (config.googleAnalyticsId) {
    ReactGA.initialize(config.googleAnalyticsId, {
      testMode: import.meta.env.MODE === 'development',
    });
    logger.info('Google Analytics initialized', undefined, 'ANALYTICS');
  }

  // Initialize Google Tag Manager
  if (config.googleTagManagerId && typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleTagManagerId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      if (window.dataLayer) {
        window.dataLayer.push(args);
      }
    }
    gtag('js', new Date());
    gtag('config', config.googleTagManagerId);
    
    logger.info('Google Tag Manager initialized', undefined, 'ANALYTICS');
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (!isAnalyticsEnabled()) {return;}

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });

  // Also track with custom event
  trackEvent(AnalyticsEvents.PAGE_VIEW, {
    page_path: path,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (!isAnalyticsEnabled()) {return;}

  const category = typeof parameters?.['category'] === 'string' ? parameters['category'] : 'general';
  const label = typeof parameters?.['label'] === 'string' ? parameters['label'] : undefined;
  const value = typeof parameters?.['value'] === 'number' ? parameters['value'] : undefined;

  const eventOptions: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  } = {
    action: eventName,
    category: category,
  };

  if (label !== undefined) {
    eventOptions.label = label;
  }
  if (value !== undefined) {
    eventOptions.value = value;
  }

  ReactGA.event(eventOptions);

  // Also send to GTM if available
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Track user actions
export const trackUserAction = (action: string, details?: Record<string, unknown>) => {
  trackEvent(action, {
    category: 'user_action',
    timestamp: new Date().toISOString(),
    ...details,
  });
};

// Track content engagement
export const trackContentEngagement = (
  contentType: 'story' | 'activity' | 'resource' | 'guide',
  action: 'view' | 'start' | 'complete' | 'download',
  contentId?: string,
  details?: Record<string, unknown>
) => {
  trackEvent(`${contentType}_${action}`, {
    category: 'content_engagement',
    content_type: contentType,
    content_id: contentId,
    action,
    ...details,
  });
};

// Track performance metrics
export const trackPerformance = (metricName: string, value: number, unit: string = 'ms') => {
  trackEvent(AnalyticsEvents.PERFORMANCE_METRIC, {
    category: 'performance',
    metric_name: metricName,
    metric_value: value,
    metric_unit: unit,
  });
};

// Track errors
export const trackError = (error: Error, context?: Record<string, unknown>) => {
  trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
    category: 'error',
    error_message: error.message,
    error_stack: error.stack,
    ...context,
  });
};

// Track user properties - filter out PII
export const setUserProperties = (properties: Record<string, unknown>) => {
  if (!isAnalyticsEnabled()) {return;}

  // Filter out PII fields
  const piiFields = ['email', 'name', 'phone', 'address', 'firstName', 'lastName', 'fullName'];
  const filteredProperties = Object.entries(properties).reduce((acc, [key, value]) => {
    if (!piiFields.includes(key.toLowerCase())) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);

  ReactGA.set(filteredProperties);
};

// Track user ID - hash to protect PII
export const setUserId = (userId: string) => {
  if (!isAnalyticsEnabled()) {return;}

  // Hash the user ID to protect PII
  const hashedId = hashString(userId);
  ReactGA.set({ user_id: hashedId });
};

// Simple hash function for anonymizing user data
const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'u_' + Math.abs(hash).toString(36);
};

// Track conversion events
export const trackConversion = (conversionType: string, value?: number, currency?: string) => {
  trackEvent('conversion', {
    category: 'conversion',
    conversion_type: conversionType,
    value,
    currency: currency || 'USD',
  });
};

// Privacy-compliant analytics (respects user preferences and COPPA compliance)
export const isAnalyticsEnabled = () => {
  // Check zero-data mode first (COPPA compliance - under-13s without consent)
  if (coppaComplianceManager.isZeroDataMode()) {
    return false;
  }

  // Check if user has opted out
  const userOptOut = localStorage.getItem('analytics_opt_out');
  if (userOptOut === 'true') {
    return false;
  }

  // Check if analytics is enabled in environment
  return import.meta.env['VITE_GOOGLE_ANALYTICS_ID'] && 
         (import.meta.env.MODE === 'production' || import.meta.env['VITE_ANALYTICS_DEBUG'] === 'true');
};

// Opt out user from analytics
export const optOutAnalytics = () => {
  localStorage.setItem('analytics_opt_out', 'true');
  // Disable GA tracking
  if (typeof window !== 'undefined') {
    const gaId = import.meta.env['VITE_GOOGLE_ANALYTICS_ID'];
    if (gaId) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
    }
  }
};

// Opt in user to analytics
export const optInAnalytics = () => {
  localStorage.removeItem('analytics_opt_out');
  // Re-enable GA tracking
  if (typeof window !== 'undefined') {
    const gaId = import.meta.env['VITE_GOOGLE_ANALYTICS_ID'];
    if (gaId) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = false;
    }
  }
};