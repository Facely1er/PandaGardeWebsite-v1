import ReactGA from 'react-ga4';

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
  
  // Educational Content
  RESOURCE_VIEWED: 'resource_viewed',
  GUIDE_ACCESSED: 'guide_accessed',
  FAQ_VIEWED: 'faq_viewed',
  
  // Performance
  ERROR_OCCURRED: 'error_occurred',
  PERFORMANCE_METRIC: 'performance_metric',
  ALERT_CREATED: 'alert_created',
  ALERT_RESOLVED: 'alert_resolved',
} as const;

// Initialize analytics
export const initAnalytics = () => {
  const config: AnalyticsConfig = {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    googleTagManagerId: import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID,
    enabled: import.meta.env.MODE === 'production' || import.meta.env.VITE_ANALYTICS_DEBUG === 'true',
  };

  if (!config.enabled) {
    console.log('Analytics disabled in development mode');
    return;
  }

  // Initialize Google Analytics 4
  if (config.googleAnalyticsId) {
    ReactGA.initialize(config.googleAnalyticsId, {
      testMode: import.meta.env.MODE === 'development',
      debug: import.meta.env.VITE_ANALYTICS_DEBUG === 'true',
    });
    console.log('Google Analytics initialized');
  }

  // Initialize Google Tag Manager
  if (config.googleTagManagerId && typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleTagManagerId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', config.googleTagManagerId);
    
    console.log('Google Tag Manager initialized');
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (!import.meta.env.VITE_GOOGLE_ANALYTICS_ID) return;

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
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (!import.meta.env.VITE_GOOGLE_ANALYTICS_ID) return;

  ReactGA.event({
    action: eventName,
    category: parameters?.category || 'general',
    label: parameters?.label,
    value: parameters?.value,
    ...parameters,
  });

  // Also send to GTM if available
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Track user actions
export const trackUserAction = (action: string, details?: Record<string, any>) => {
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
  details?: Record<string, any>
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
export const trackError = (error: Error, context?: Record<string, any>) => {
  trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
    category: 'error',
    error_message: error.message,
    error_stack: error.stack,
    ...context,
  });
};

// Track user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (!import.meta.env.VITE_GOOGLE_ANALYTICS_ID) return;

  ReactGA.set(properties);
};

// Track user ID
export const setUserId = (userId: string) => {
  if (!import.meta.env.VITE_GOOGLE_ANALYTICS_ID) return;

  ReactGA.set({ user_id: userId });
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

// Privacy-compliant analytics (respects user preferences)
export const isAnalyticsEnabled = () => {
  // Check if user has opted out
  const userOptOut = localStorage.getItem('analytics_opt_out');
  if (userOptOut === 'true') {
    return false;
  }

  // Check if analytics is enabled in environment
  return import.meta.env.VITE_GOOGLE_ANALYTICS_ID && 
         (import.meta.env.MODE === 'production' || import.meta.env.VITE_ANALYTICS_DEBUG === 'true');
};

// Opt out user from analytics
export const optOutAnalytics = () => {
  localStorage.setItem('analytics_opt_out', 'true');
  // Disable GA tracking
  if (typeof window !== 'undefined') {
    (window as any)[`ga-disable-${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`] = true;
  }
};

// Opt in user to analytics
export const optInAnalytics = () => {
  localStorage.removeItem('analytics_opt_out');
  // Re-enable GA tracking
  if (typeof window !== 'undefined') {
    (window as any)[`ga-disable-${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`] = false;
  }
};