import React from 'react';
import FamilyDashboard from '../../components/FamilyDashboard';

const DashboardScreen: React.FC = () => {
  return (
    <div className="min-h-full">
      <FamilyDashboard appMode={true} />
    </div>
  );
};

export default DashboardScreen;

