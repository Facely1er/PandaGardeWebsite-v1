import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSentry, reportError } from './lib/sentry.ts';
import { initAnalytics, trackError } from './lib/analytics.ts';
import { initServiceWorker } from './lib/serviceWorker.ts';

// Global error handlers - capture unhandled errors
window.onerror = (message, source, lineno, colno, error) => {
  const errorObj = error || new Error(String(message));
  reportError(errorObj, {
    type: 'global_error',
    source,
    lineno,
    colno,
  });
  trackError(errorObj, {
    type: 'global_error',
    source,
    lineno,
    colno,
  });
  // Don't suppress the error
  return false;
};

// Global unhandled promise rejection handler
window.onunhandledrejection = (event) => {
  const error = event.reason instanceof Error
    ? event.reason
    : new Error(String(event.reason));
  reportError(error, {
    type: 'unhandled_rejection',
  });
  trackError(error, {
    type: 'unhandled_rejection',
  });
};

// Initialize monitoring, analytics, and service worker before rendering the app
initSentry();
initAnalytics();
initServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
