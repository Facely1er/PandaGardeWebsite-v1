import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthWrapper';
import FamilyHubPage from '../FamilyHubPage';
import LoginPage from './LoginPage';
import ProfilePage from '../ProfilePage';
import CertificatePage from '../CertificatePage';

// Component to handle authentication redirects - Frontend-only mode
const AuthGuard: React.FC<{ children: React.ReactNode }> = () => {
  const { redirectToFamilyHub } = useAuth();

  // In frontend-only mode, always redirect to external family hub
  useEffect(() => {
    redirectToFamilyHub();
  }, [redirectToFamilyHub]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Family Hub...</p>
        <p className="text-sm text-gray-500 mt-2">Authentication and family management are handled by our dedicated Family Hub project.</p>
      </div>
    </div>
  );
};

// Profile page with Family Hub auth
const FamilyHubProfilePage: React.FC = () => {
  return (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  );
};

// Certificate page with Family Hub auth
const FamilyHubCertificatePage: React.FC = () => {
  return (
    <AuthGuard>
      <CertificatePage />
    </AuthGuard>
  );
};

const FamilyHubWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <AuthGuard>
            <FamilyHubPage />
          </AuthGuard>
        } />
        <Route path="/profile" element={<FamilyHubProfilePage />} />
        <Route path="/certificates" element={<FamilyHubCertificatePage />} />
      </Routes>
    </AuthProvider>
  );
};

export default FamilyHubWrapper;