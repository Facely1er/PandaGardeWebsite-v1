import React from 'react';
import { LucideIcon } from 'lucide-react';
import PageHeader from './PageHeader';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  breadcrumbs?: boolean;
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  icon,
  badge,
  breadcrumbs = true,
  children,
  className = ''
}) => {
  return (
    <div 
      className={`page-layout ${className}`}
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        color: '#212121'
      }}
    >
      <PageHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        badge={badge}
        breadcrumbs={breadcrumbs}
      />

      <main 
        style={{
          padding: '1.5rem 0',
          backgroundColor: '#FFFFFF',
          color: '#212121'
        }}
      >
        <div 
          className="container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            color: '#212121'
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;

