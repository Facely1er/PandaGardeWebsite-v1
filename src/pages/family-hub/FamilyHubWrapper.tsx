import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import FamilyDashboard from '../../components/FamilyDashboard';
import LoginPage from './LoginPage';
import ProfilePage from '../ProfilePage';
import CertificatePage from '../CertificatePage';
import LearningHub from '../../components/family/LearningHub';
import JourneyHub from '../../components/journey/JourneyHub';
import FamilyHubHeader from '../../components/family/FamilyHubHeader';
import FamilyHubFooter from '../../components/family/FamilyHubFooter';
import { AuthProvider, useAuth } from './AuthWrapper';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/family-hub/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

const FamilyHubWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <div className="family-hub-theme family-hub-wrapper flex flex-col">
        <FamilyHubHeader />
        <div className="flex-grow">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route index element={<AuthGuard><FamilyDashboard /></AuthGuard>} />
            <Route path="profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
            <Route path="certificates" element={<AuthGuard><CertificatePage /></AuthGuard>} />
            <Route path="learning" element={<AuthGuard><LearningHub /></AuthGuard>} />
            <Route path="games" element={<AuthGuard><LearningHub /></AuthGuard>} />
            <Route path="journeys" element={<AuthGuard><JourneyHub /></AuthGuard>} />
          </Routes>
        </div>
        <FamilyHubFooter />
      </div>
    </AuthProvider>
  );
};

export default FamilyHubWrapper;
