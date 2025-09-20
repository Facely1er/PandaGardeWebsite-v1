import React from 'react';
import Breadcrumb from './Breadcrumb';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string; current?: boolean }>;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBreadcrumb = true,
  breadcrumbItems,
  className = '',
  children
}) => {
  return (
    <div className={`page-header bg-gradient-to-r from-primary to-primary-light text-white py-16 ${className}`}>
      <div className="container">
        {showBreadcrumb && (
          <div className="breadcrumb-container mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
        
        <div className="page-header-content">
          <h1 className="page-title text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          
          {subtitle && (
            <p className="page-subtitle text-xl text-white/90 mb-6 max-w-3xl">
              {subtitle}
            </p>
          )}
          
          {children && (
            <div className="page-header-actions">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;