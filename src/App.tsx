import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { FamilyProvider } from './contexts/FamilyContext';
import { SearchProvider } from './contexts/SearchContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import InteractiveStoryPage from './pages/InteractiveStoryPage';
import ActivityBookPage from './pages/ActivityBookPage';
import AboutPage from './pages/AboutPage';
import FamilyHubWrapper from './pages/family-hub/FamilyHubWrapper';
import ContactPage from './pages/ContactPage';
import GetStartedPage from './pages/GetStartedPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import AccessibilityPage from './pages/AccessibilityPage';
import PrivacyExplorersPage from './pages/PrivacyExplorersPage';
import PrivacyHandbookPage from './pages/PrivacyHandbookPage';
import DigitalCitizenshipPage from './pages/DigitalCitizenshipPage';
import TeenHandbookPage from './pages/TeenHandbookPage';
import PrivacyToolsPage from './pages/PrivacyToolsPage';
import DigitalRightsPage from './pages/DigitalRightsPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DownloadGuidePage from './pages/DownloadGuidePage';
import ColoringSheetsPage from './pages/ColoringSheetsPage';
import SafetyPostersPage from './pages/SafetyPostersPage';
import CertificatesPage from './pages/CertificatesPage';
import FamilyAgreementPage from './pages/FamilyAgreementPage';
import DeviceSetupGuidePage from './pages/DeviceSetupGuidePage';
import AppSelectionGuidePage from './pages/AppSelectionGuidePage';
import ModelingBehaviorGuidePage from './pages/ModelingBehaviorGuidePage';
import PrivacyConcernsGuidePage from './pages/PrivacyConcernsGuidePage';
import EducatorToolsPage from './pages/EducatorToolsPage';
import ParentResourcesPage from './pages/ParentResourcesPage';
import NewsletterPage from './pages/NewsletterPage';
import SupportPage from './pages/SupportPage';
import ImplementationGuidePage from './pages/ImplementationGuidePage';
import NavigationErrorBoundary from './components/NavigationErrorBoundary';
import { SentryErrorBoundary } from './lib/sentry';
import { usePageTracking } from './hooks/useAnalytics';

// Component to handle hash navigation
const HashHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Wait for the page to render, then scroll to the element
      const scrollToElement = () => {
        const element = document.querySelector(location.hash);
        if (element) {
          // Use requestAnimationFrame for better timing
          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          });
        } else {
          // If element not found, try again after a short delay
          setTimeout(scrollToElement, 100);
        }
      };
      
      // Initial attempt
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


function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SearchProvider>
          <FamilyProvider>
            <ProgressProvider>
                <Router>
                  <SentryErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
                    <NavigationErrorBoundary>
                      <div className="App">
                        <PageTracker />
                        <HashHandler />
                        <Header />
                        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story" element={<InteractiveStoryPage />} />
            <Route path="/story-classic" element={<StoryPage />} />
            <Route path="/activity-book" element={<ActivityBookPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/family-hub/*" element={<FamilyHubWrapper />} />
            
            {/* Age Group Pages */}
            <Route path="/privacy-explorers" element={<PrivacyExplorersPage />} />
            <Route path="/privacy-handbook" element={<PrivacyHandbookPage />} />
            <Route path="/digital-citizenship" element={<DigitalCitizenshipPage />} />
            <Route path="/teen-handbook" element={<TeenHandbookPage />} />
            <Route path="/privacy-tools" element={<PrivacyToolsPage />} />
            <Route path="/digital-rights" element={<DigitalRightsPage />} />

            {/* General Pages */}
            <Route path="/educator-tools" element={<EducatorToolsPage />} />
            <Route path="/parent-resources" element={<ParentResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/implementation-guide" element={<ImplementationGuidePage />} />

            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />

            {/* Download Pages */}
            <Route path="/downloads/coloring-sheets" element={<DownloadGuidePage title="Privacy Panda Coloring Sheets" description="Educational coloring pages that teach privacy concepts while having fun" type="download" resourceType="coloring-sheets" />} />
            <Route path="/downloads/safety-posters" element={<DownloadGuidePage title="Digital Safety Posters" description="Visual reminders of important digital safety rules for home and classroom" type="download" resourceType="safety-posters" />} />
            <Route path="/downloads/certificates" element={<DownloadGuidePage title="Privacy Champion Certificates" description="Printable certificates to celebrate your child's privacy learning achievements" type="download" resourceType="certificates" />} />
            <Route path="/downloads/family-agreement" element={<DownloadGuidePage title="Family Internet Agreement" description="A comprehensive agreement to establish safe internet use rules for your family" type="download" resourceType="family-agreement" />} />

            {/* Guide Pages */}
            <Route path="/guides/device-setup" element={<DeviceSetupGuidePage />} />
            <Route path="/guides/app-selection" element={<AppSelectionGuidePage />} />
            <Route path="/guides/modeling-behavior" element={<ModelingBehaviorGuidePage />} />
            <Route path="/guides/privacy-concerns" element={<PrivacyConcernsGuidePage />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
                        <Footer />
                        <BackToTop />
                      </div>
                    </NavigationErrorBoundary>
                  </SentryErrorBoundary>
                </Router>
              </ProgressProvider>
            </FamilyProvider>
        </SearchProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;