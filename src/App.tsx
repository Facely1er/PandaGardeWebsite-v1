import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { FamilyProvider } from './contexts/FamilyContext';
import { SearchProvider } from './contexts/SearchContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { FamilyProgressProvider } from './contexts/FamilyProgressContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import InteractiveStoryPage from './pages/InteractiveStoryPage';
import ActivityBookPage from './pages/ActivityBookPage';
import AboutPage from './pages/AboutPage';
import AgeGroupsPage from './pages/AgeGroupsPage';
import ImplementationPage from './pages/ImplementationPage';
import ParentResourcesPage from './pages/ParentResourcesPage';
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
import FamilyPrivacyGuidePage from './pages/guides/FamilyPrivacyGuidePage';
import EmergencySafetyGuidePage from './pages/guides/EmergencySafetyGuidePage';
import AgeSpecificGuidePage from './pages/guides/AgeSpecificGuidePage';
import ConversationApproachesPage from './pages/guides/ConversationApproachesPage';
import SafetyNetPage from './pages/guides/SafetyNetPage';
import AgeSpecificPrivacyPage from './pages/guides/AgeSpecificPrivacyPage';
import FamilyPrivacyPlanPage from './pages/FamilyPrivacyPlanPage';
import EducatorToolsPage from './pages/EducatorToolsPage';
import NewsletterPage from './pages/NewsletterPage';
import SupportPage from './pages/SupportPage';
import ImplementationGuidePage from './pages/ImplementationGuidePage';
import OverviewPage from './pages/OverviewPage';
import ResourcesPage from './pages/ResourcesPage';
import QuickStartPage from './pages/QuickStartPage';
import PlaceholderPage from './pages/PlaceholderPage';
import PilotPage from './pages/PilotPage';
import ChildSafetyAlertsPage from './pages/ChildSafetyAlertsPage';
import ServiceCatalogPage from './pages/ServiceCatalogPage';
import ParentalConsentPage from './pages/ParentalConsentPage';
import ParentalConsentPendingPage from './pages/ParentalConsentPendingPage';
import DigitalFootprintPage from './pages/DigitalFootprintPage';
import PrivacyAssessmentPage from './pages/PrivacyAssessmentPage';
import AssessmentHistoryPage from './pages/AssessmentHistoryPage';
import PrivacyGoalsPage from './pages/PrivacyGoalsPage';
import QuickAssessmentPage from './pages/QuickAssessmentPage';
import SuccessStoriesPage from './pages/community/SuccessStoriesPage';
import ResourceSharingPage from './pages/community/ResourceSharingPage';
import PrivacyTipsForumPage from './pages/community/PrivacyTipsForumPage';
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
              <FamilyProgressProvider>
                <Router>
                <SentryErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
                  <NavigationErrorBoundary>
                    <div className="App">
                      <PageTracker />
                      <HashHandler />
                      <Header />
                      <main className="main-content-wrapper">
                        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story" element={<InteractiveStoryPage />} />
            <Route path="/privacy-panda" element={<InteractiveStoryPage />} />
            <Route path="/story-classic" element={<StoryPage />} />
            <Route path="/activity-book" element={<ActivityBookPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/age-groups" element={<AgeGroupsPage />} />
            <Route path="/implementation" element={<ImplementationPage />} />
            <Route path="/parent-resources" element={<ParentResourcesPage />} />
            <Route path="/family-hub/*" element={<FamilyHubWrapper />} />
            
            {/* Age Group Pages */}
            <Route path="/privacy-explorers" element={<PrivacyExplorersPage />} />
            <Route path="/privacy-handbook" element={<PrivacyHandbookPage />} />
            <Route path="/digital-citizenship" element={<DigitalCitizenshipPage />} />
            <Route path="/teen-handbook" element={<TeenHandbookPage />} />
            <Route path="/privacy-tools" element={<PrivacyToolsPage />} />
            <Route path="/digital-rights" element={<DigitalRightsPage />} />

            {/* General Pages */}
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/quick-start" element={<GetStartedPage />} />
            <Route path="/educator-tools" element={<EducatorToolsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/pilot" element={<PilotPage />} />
            <Route path="/join-pilot" element={<PilotPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/implementation-guide" element={<ImplementationGuidePage />} />
            <Route path="/service-catalog" element={<ServiceCatalogPage />} />
            <Route path="/safety-alerts" element={<ChildSafetyAlertsPage />} />
            <Route path="/alerts" element={<ChildSafetyAlertsPage />} />
            <Route path="/digital-footprint" element={<DigitalFootprintPage />} />
            <Route path="/footprint" element={<DigitalFootprintPage />} />
            <Route path="/privacy-assessment" element={<PrivacyAssessmentPage />} />
            <Route path="/quick-assessment" element={<QuickAssessmentPage />} />
            <Route path="/assessment" element={<PrivacyAssessmentPage />} />
            <Route path="/assessment-history" element={<AssessmentHistoryPage />} />
            <Route path="/assessment/history" element={<AssessmentHistoryPage />} />
            <Route path="/privacy-goals" element={<PrivacyGoalsPage />} />
            <Route path="/goals" element={<PrivacyGoalsPage />} />
            
            {/* Community Features */}
            <Route path="/community/stories" element={<SuccessStoriesPage />} />
            <Route path="/community/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/community/resources" element={<ResourceSharingPage />} />
            <Route path="/community/forum" element={<PrivacyTipsForumPage />} />
            <Route path="/community/privacy-tips" element={<PrivacyTipsForumPage />} />
            
            {/* COPPA Compliance Pages */}
            <Route path="/parental-consent" element={<ParentalConsentPage />} />
            <Route path="/parental-consent/pending" element={<ParentalConsentPendingPage />} />

            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />

            {/* Download Pages */}
            <Route path="/downloads/coloring-sheets" element={<ColoringSheetsPage />} />
            <Route path="/downloads/safety-posters" element={<SafetyPostersPage />} />
            <Route path="/downloads/certificates" element={<CertificatesPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/downloads/family-agreement" element={<FamilyAgreementPage />} />
            
            {/* Alternative download routes using DownloadGuidePage */}
            <Route path="/downloads/coloring-sheets/guide" element={<DownloadGuidePage title="Privacy Panda Coloring Sheets" description="Educational coloring pages that teach privacy concepts while having fun" type="download" resourceType="coloring-sheets" />} />
            <Route path="/downloads/safety-posters/guide" element={<DownloadGuidePage title="Digital Safety Posters" description="Visual reminders of important digital safety rules for home and classroom" type="download" resourceType="safety-posters" />} />
            <Route path="/downloads/certificates/guide" element={<DownloadGuidePage title="Privacy Champion Certificates" description="Printable certificates to celebrate your child's privacy learning achievements" type="download" resourceType="certificates" />} />
            <Route path="/downloads/family-agreement/guide" element={<DownloadGuidePage title="Family Internet Agreement" description="A comprehensive agreement to establish safe internet use rules for your family" type="download" resourceType="family-agreement" />} />

            {/* Guide Pages */}
            <Route path="/guides/device-setup" element={<DeviceSetupGuidePage />} />
            <Route path="/guides/app-selection" element={<AppSelectionGuidePage />} />
            <Route path="/guides/modeling-behavior" element={<ModelingBehaviorGuidePage />} />
            <Route path="/guides/privacy-concerns" element={<PrivacyConcernsGuidePage />} />
            <Route path="/guides/family-privacy" element={<FamilyPrivacyGuidePage />} />
            <Route path="/guides/emergency-safety" element={<EmergencySafetyGuidePage />} />
            <Route path="/guides/age-specific" element={<AgeSpecificGuidePage />} />
            <Route path="/guides/conversation-approaches" element={<ConversationApproachesPage />} />
            <Route path="/guides/safety-net" element={<SafetyNetPage />} />
            <Route path="/guides/age-specific-privacy" element={<AgeSpecificPrivacyPage />} />
            <Route path="/family-privacy-plan" element={<FamilyPrivacyPlanPage />} />
            <Route path="/guides/family-privacy-plan" element={<FamilyPrivacyPlanPage />} />

            {/* Activity Pages */}
            <Route path="/activities/privacy-learning-kit" element={<PlaceholderPage title="Privacy Learning Kit" description="Interactive activities and games to reinforce privacy concepts" />} />
            
            {/* Additional Download Pages */}
            <Route path="/downloads/worksheets" element={<PlaceholderPage title="Privacy Worksheets" description="Printable worksheets and activities for hands-on learning" />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<HomePage />} />
                        </Routes>
                        <Footer />
                        <BackToTop />
                      </main>
                    </div>
                  </NavigationErrorBoundary>
                </SentryErrorBoundary>
              </Router>
              </FamilyProgressProvider>
            </ProgressProvider>
          </FamilyProvider>
        </SearchProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;