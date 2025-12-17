import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FamilyDashboard from '../../components/FamilyDashboard';
import LoginPage from './LoginPage';
import ProfilePage from '../ProfilePage';
import CertificatePage from '../CertificatePage';
import LearningHub from '../../components/family/LearningHub';
import JourneyHub from '../../components/journey/JourneyHub';

const FamilyHubWrapper: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<FamilyDashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/certificates" element={<CertificatePage />} />
      <Route path="/learning" element={<LearningHub />} />
      <Route path="/games" element={<LearningHub />} />
      <Route path="/journeys" element={<JourneyHub />} />
    </Routes>
  );
};

export default FamilyHubWrapper;