import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
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
import PlaceholderPage from './pages/PlaceholderPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DownloadGuidePage from './pages/DownloadGuidePage';

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
            <Route path="/privacy-explorers" element={<PlaceholderPage title="Privacy Explorers" description="Interactive privacy challenges and games for ages 9-12" />} />
            <Route path="/privacy-handbook" element={<PlaceholderPage title="Privacy Protector's Guide" description="Hands-on projects and practical guides for tweens" />} />
            <Route path="/digital-citizenship" element={<PlaceholderPage title="Digital Citizenship Academy" description="Interactive modules about responsible online behavior" />} />
            <Route path="/teen-handbook" element={<PlaceholderPage title="Teen Privacy Handbook" description="Comprehensive privacy guide for teenagers" />} />
            <Route path="/privacy-tools" element={<PlaceholderPage title="Privacy Tools Workshop" description="Hands-on tutorials for privacy tools and settings" />} />
            <Route path="/digital-rights" element={<PlaceholderPage title="Digital Rights & Law" description="Understanding privacy legislation and digital rights" />} />
            
            {/* General Pages */}
            <Route path="/educator-tools" element={<PlaceholderPage title="Educator Tools" description="Resources and materials for teachers and educators" />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/newsletter" element={<PlaceholderPage title="Newsletter" description="Stay updated with the latest privacy education news" />} />
            <Route path="/support" element={<PlaceholderPage title="Support" description="Help and support for using PandaGarde resources" />} />
            <Route path="/get-started" element={<PlaceholderPage title="Get Started" description="Begin your family's privacy education journey" />} />
            <Route path="/implementation-guide" element={<PlaceholderPage title="Implementation Guide" description="Detailed timeline and instructions for implementing Privacy Panda curriculum" />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="Terms and conditions for using PandaGarde" />} />
            <Route path="/cookies" element={<PlaceholderPage title="Cookie Policy" description="How we use cookies and tracking technologies" />} />
            <Route path="/accessibility" element={<PlaceholderPage title="Accessibility" description="Our commitment to making PandaGarde accessible to everyone" />} />
            
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
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;