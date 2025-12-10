import React from 'react';
import PrivacyTipsForum from '../../components/community/PrivacyTipsForum';
import CommunityErrorBoundary from '../../components/community/CommunityErrorBoundary';

const PrivacyTipsForumPage: React.FC = () => {
  return (
    <CommunityErrorBoundary>
      <PrivacyTipsForum />
    </CommunityErrorBoundary>
  );
};

export default PrivacyTipsForumPage;

