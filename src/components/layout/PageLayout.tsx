import React from 'react';
import { LucideIcon } from 'lucide-react';
import PageHeader from './PageHeader';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { theme } = useTheme();
  
  return (
    <div 
      className={`page-layout ${className}`}
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? 'var(--white)' : '#FFFFFF',
        color: theme === 'dark' ? 'var(--gray-800)' : '#212121'
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
          backgroundColor: theme === 'dark' ? 'var(--white)' : '#FFFFFF',
          color: theme === 'dark' ? 'var(--gray-800)' : '#212121',
          minHeight: '400px',
          position: 'relative',
          zIndex: 1,
          paddingTop: '1.5rem'
        }}
      >
        <div 
          className="container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            color: theme === 'dark' ? 'var(--gray-800)' : '#212121',
            position: 'relative',
            zIndex: 2
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;

