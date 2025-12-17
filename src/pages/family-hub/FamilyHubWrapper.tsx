import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FamilyDashboard from '../../components/FamilyDashboard';
import LoginPage from './LoginPage';
import ProfilePage from '../ProfilePage';
import CertificatePage from '../CertificatePage';
import LearningHub from '../../components/family/LearningHub';
import JourneyHub from '../../components/journey/JourneyHub';
import FamilyHubHeader from '../../components/family/FamilyHubHeader';
import { AuthProvider } from './AuthWrapper';

const FamilyHubWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <div className="family-hub-theme family-hub-wrapper">
        <FamilyHubHeader />
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route index element={<FamilyDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="certificates" element={<CertificatePage />} />
          <Route path="learning" element={<LearningHub />} />
          <Route path="games" element={<LearningHub />} />
          <Route path="journeys" element={<JourneyHub />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default FamilyHubWrapper;