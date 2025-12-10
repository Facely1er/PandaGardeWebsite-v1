import React from 'react';
import ResourceSharing from '../../components/community/ResourceSharing';
import CommunityErrorBoundary from '../../components/community/CommunityErrorBoundary';

const ResourceSharingPage: React.FC = () => {
  return (
    <CommunityErrorBoundary>
      <ResourceSharing />
    </CommunityErrorBoundary>
  );
};

export default ResourceSharingPage;

