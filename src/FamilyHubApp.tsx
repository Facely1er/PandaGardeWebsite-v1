import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { FamilyProvider } from './contexts/FamilyContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { FamilyProgressProvider } from './contexts/FamilyProgressContext';
import FamilyDashboard from './components/FamilyDashboard';
import LoginPage from './pages/family-hub/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CertificatePage from './pages/CertificatePage';
import NavigationErrorBoundary from './components/NavigationErrorBoundary';
import { SentryErrorBoundary } from './lib/sentry';
import { usePageTracking } from './hooks/useAnalytics';

// Component to handle hash navigation
const HashHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const scrollToElement = () => {
        const element = document.querySelector(location.hash);
        if (element) {
          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          });
        } else {
          setTimeout(scrollToElement, 100);
        }
      };
      setTimeout(scrollToElement, 100);
    }
  }, [location]);

  return null;
};

// Component to handle page tracking inside Router context
const PageTracker: React.FC = () => {
  usePageTracking();
  return null;
};

function FamilyHubApp() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FamilyProvider>
          <ProgressProvider>
            <FamilyProgressProvider>
              <Router>
                <SentryErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
                  <NavigationErrorBoundary>
                    <div className="App">
                      <PageTracker />
                      <HashHandler />
                      <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<FamilyDashboard />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/certificates" element={<CertificatePage />} />
                      </Routes>
                    </div>
                  </NavigationErrorBoundary>
                </SentryErrorBoundary>
              </Router>
            </FamilyProgressProvider>
          </ProgressProvider>
        </FamilyProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default FamilyHubApp;

