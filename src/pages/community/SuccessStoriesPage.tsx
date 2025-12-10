import React from 'react';
import SuccessStories from '../../components/community/SuccessStories';
import CommunityErrorBoundary from '../../components/community/CommunityErrorBoundary';

const SuccessStoriesPage: React.FC = () => {
  return (
    <CommunityErrorBoundary>
      <SuccessStories />
    </CommunityErrorBoundary>
  );
};

export default SuccessStoriesPage;

