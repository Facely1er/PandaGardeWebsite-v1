import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import ActivityBookPage from './pages/ActivityBookPage';
import AboutPage from './pages/AboutPage';
import FamilyHubPage from './pages/FamilyHubPage';
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
import EducatorToolsPage from './pages/EducatorToolsPage';
import NewsletterPage from './pages/NewsletterPage';
import SupportPage from './pages/SupportPage';
import ImplementationGuidePage from './pages/ImplementationGuidePage';

// Component to handle hash navigation
const HashHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Wait for the page to render, then scroll to the element
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ProgressProvider>
            <Router>
              <div className="App">
                <HashHandler />
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/story" element={<StoryPage />} />
                  <Route path="/activity-book" element={<ActivityBookPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/family-hub" element={<FamilyHubPage />} />

                  {/* Age Group Pages */}
                  <Route path="/privacy-explorers" element={<PrivacyExplorersPage />} />
                  <Route path="/privacy-handbook" element={<PrivacyHandbookPage />} />
                  <Route path="/digital-citizenship" element={<DigitalCitizenshipPage />} />
                  <Route path="/teen-handbook" element={<TeenHandbookPage />} />
                  <Route path="/privacy-tools" element={<PrivacyToolsPage />} />
                  <Route path="/digital-rights" element={<DigitalRightsPage />} />

                  {/* General Pages */}
                  <Route path="/educator-tools" element={<EducatorToolsPage />} />
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
                  <Route path="/downloads/coloring-sheets" element={<DownloadGuidePage title="Privacy Panda Coloring Sheets" description="Downloadable coloring pages featuring Privacy Panda and privacy concepts" type="download" />} />
                  <Route path="/downloads/safety-posters" element={<DownloadGuidePage title="Digital Safety Posters" description="Classroom-ready posters highlighting key privacy concepts" type="download" />} />
                  <Route path="/downloads/certificates" element={<DownloadGuidePage title="Privacy Champion Certificates" description="Printable certificates to celebrate privacy education milestones" type="download" />} />
                  <Route path="/downloads/family-agreement" element={<DownloadGuidePage title="Family Internet Agreement" description="Customizable family guidelines for internet use" type="download" />} />

                  {/* Guide Pages */}
                  <Route path="/guides/device-setup" element={<DownloadGuidePage title="Child-Friendly Device Setup" description="Step-by-step guide for configuring devices with appropriate controls" type="guide" />} />
                  <Route path="/guides/app-selection" element={<DownloadGuidePage title="Choosing Child-Safe Apps" description="Guidelines for selecting appropriate digital content for children" type="guide" />} />
                  <Route path="/guides/modeling-behavior" element={<DownloadGuidePage title="Modeling Good Digital Citizenship" description="Tips for demonstrating healthy online behavior" type="guide" />} />
                  <Route path="/guides/privacy-concerns" element={<DownloadGuidePage title="Responding to Privacy Concerns" description="What to do when privacy issues arise" type="guide" />} />
                </Routes>
                <Footer />
                <BackToTop />
              </div>
            </Router>
          </ProgressProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;