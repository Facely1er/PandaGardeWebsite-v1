import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthWrapper';
import FamilyHubPage from '../FamilyHubPage';
import LoginPage from './LoginPage';
import ProfilePage from '../ProfilePage';
import CertificatePage from '../CertificatePage';

// Component to handle authentication redirects
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/family-hub/login" replace />;
  }

  return <>{children}</>;
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