import * as Sentry from '@sentry/react';

// Initialize Sentry
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.MODE;
  const release = import.meta.env.VITE_SENTRY_RELEASE || 'unknown';

  if (!dsn) {
    console.warn('Sentry DSN not found. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn,
    environment,
    release,
    
    // Performance Monitoring
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: environment === 'production' ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    
    // Error Filtering
    beforeSend(event, hint) {
      // Filter out non-critical errors
      if (event.exception) {
        const error = hint.originalException;
        
        // Filter out common non-critical errors
        if (error instanceof Error) {
          const message = error.message.toLowerCase();
          
          // Ignore network errors that are likely user-related
          if (message.includes('network error') || 
              message.includes('failed to fetch') ||
              message.includes('load failed')) {
            return null;
          }
          
          // Ignore ResizeObserver errors (common and non-critical)
          if (message.includes('resizeobserver')) {
            return null;
          }
        }
      }
      
      return event;
    },
    
    // Integration configuration
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    
    // Additional configuration
    beforeBreadcrumb(breadcrumb) {
      // Filter out sensitive data from breadcrumbs
      if (breadcrumb.category === 'console') {
        return null;
      }
      
      return breadcrumb;
    },
  });
}

// Error boundary component
export const SentryErrorBoundary = Sentry.withErrorBoundary;

// Performance monitoring utilities
export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const addBreadcrumb = Sentry.addBreadcrumb;
export const setUser = Sentry.setUser;
export const setTag = Sentry.setTag;
export const setContext = Sentry.setContext;

// Performance monitoring for specific functions
export function withSentryPerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return fn; // Simplified for now - Sentry.wrap is not available in this version
}

// Custom performance monitoring
export function startTransaction(name: string, op: string) {
  return Sentry.startSpan({ name, op }, () => {});
}

// Error reporting
export function reportError(error: Error, context?: any) {
  if (context) {
    setContext('error_context', context);
  }
  captureException(error);
}

// User context helpers
export function setUserContext(user: {
  id?: string;
  email?: string;
  username?: string;
  [key: string]: any;
}) {
  setUser(user);
}

export function clearUserContext() {
  setUser(null);
}

// Tag helpers
export function setPageTag(page: string) {
  setTag('page', page);
}

export function setFeatureTag(feature: string, enabled: boolean) {
  setTag(`feature.${feature}`, enabled.toString());
}

// Context helpers
export function setDeviceContext(device: {
  type?: string;
  brand?: string;
  model?: string;
}) {
  setContext('device', device);
}

export function setBrowserContext(browser: {
  name?: string;
  version?: string;
}) {
  setContext('browser', browser);
}