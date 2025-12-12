import React from 'react';
import SuccessStories from '../../components/community/SuccessStories';
import CommunityErrorBoundary from '../../components/community/CommunityErrorBoundary';
import PageLayout from '../../components/layout/PageLayout';
import { Heart } from 'lucide-react';

const SuccessStoriesPage: React.FC = () => {
  return (
    <CommunityErrorBoundary>
      <PageLayout
        title="Success Stories"
        subtitle="Read and share anonymous success stories about teaching privacy to children. Learn from other families' experiences and celebrate privacy education wins."
        icon={Heart}
        badge="COMMUNITY"
        breadcrumbs={true}
      >
        <SuccessStories />
      </PageLayout>
    </CommunityErrorBoundary>
  );
};

export default SuccessStoriesPage;

