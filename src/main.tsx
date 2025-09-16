import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSentry } from './lib/sentry.ts';
import { initAnalytics } from './lib/analytics.ts';
import { initServiceWorker } from './lib/serviceWorker.ts';

// Initialize monitoring, analytics, and service worker before rendering the app
initSentry();
initAnalytics();
initServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
