import React from 'react';
import Breadcrumb from './Breadcrumb';
import BackToTop from './BackToTop';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string; current?: boolean }>;
  className?: string;
  containerClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBreadcrumb = true,
  breadcrumbItems,
  className = '',
  containerClassName = ''
}) => {
  return (
    <div className={`page-layout min-h-screen ${className}`}>
      <main id="main-content" className="main-content">
        {showBreadcrumb && (
          <div className="breadcrumb-container bg-gray-50 border-b border-gray-200 py-4">
            <div className={`container ${containerClassName}`}>
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>
        )}
        
        <div className={`page-content ${containerClassName}`}>
          {children}
        </div>
      </main>
      
      <BackToTop />
    </div>
  );
};

export default PageLayout;