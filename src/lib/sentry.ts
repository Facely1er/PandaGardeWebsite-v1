import React from 'react';
import * as Sentry from '@sentry/react';

// Initialize Sentry
export const initSentry = () => {
  // Only initialize if DSN is provided
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    // Sentry is optional - app will work without it
    return;
  }

  try {
    Sentry.init({
      dsn: dsn,
      environment: import.meta.env.MODE || 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
        // Mask specific sensitive inputs
        maskAllInputs: true,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    // Session Replay
    replaysSessionSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 0.5,
    replaysOnErrorSampleRate: 1.0,
    
    // Filter out development noise
    beforeSend(event) {
      // Don't send events in development unless explicitly enabled
      if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_SENTRY_DEBUG) {
        return null;
      }
      return event;
    },
    
    // Custom tags for better error categorization
    initialScope: {
      tags: {
        component: 'privacy-panda-app',
      },
    },
    });
  } catch (error) {
    // Sentry initialization failed - log but don't throw
    console.warn('Sentry initialization failed:', error);
  }
};

// Simple error boundary component for React (class component)
export class SentryErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by SentryErrorBoundary:', error, errorInfo);
    // Report to Sentry if available
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || React.createElement('div', null, 'Something went wrong.');
    }

    return this.props.children;
  }
}

// Performance monitoring utilities
export const trackPerformance = (name: string, fn: () => void) => {
  return Sentry.startSpan({ name }, fn);
};

// Custom error reporting
export const reportError = (error: Error, context?: Record<string, unknown>) => {
  try {
    // Only report if Sentry is available
    if (typeof Sentry !== 'undefined' && typeof Sentry.captureException === 'function') {
      Sentry.withScope((scope) => {
        if (context) {
          Object.keys(context).forEach(key => {
            scope.setContext(key, context[key]);
          });
        }
        Sentry.captureException(error);
      });
    }
  } catch (err) {
    // Silently fail - don't break the app if error reporting fails
    console.warn('Error reporting failed:', err);
  }
};

// User context for better error tracking
export const setUserContext = (user: { id: string; email?: string; name?: string }) => {
  Sentry.setUser(user);
};

// Clear user context on logout
export const clearUserContext = () => {
  Sentry.setUser(null);
};

// Track custom events
export const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  Sentry.addBreadcrumb({
    message: eventName,
    data,
    level: 'info',
  });
};