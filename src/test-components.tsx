// Test file to verify components compile correctly
import React from 'react';
import AppPermissionsAnalyzer from './tools/AppPermissionsAnalyzer';
import DigitalFootprintTimeline from './tools/DigitalFootprintTimeline';
import GamificationDashboard from './components/GamificationDashboard';

// Test that components can be imported and used
const TestComponents = () => {
  return (
    <div>
      <AppPermissionsAnalyzer />
      <DigitalFootprintTimeline />
      <GamificationDashboard userId="test" ageGroup="13-17" />
    </div>
  );
};

export default TestComponents;