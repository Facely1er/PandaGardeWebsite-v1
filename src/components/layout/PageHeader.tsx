import React from 'react';
import { LucideIcon } from 'lucide-react';
import Breadcrumbs from '../navigation/Breadcrumbs';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  breadcrumbs?: boolean;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  breadcrumbs: showBreadcrumbs = true,
  className = ''
}) => {
  return (
    <div 
      className={`page-header ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        color: 'white',
        padding: '3rem 0 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle background pattern */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
        }}
      />

      <div 
        className="container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        {showBreadcrumbs && (
          <div style={{ marginBottom: '1.5rem' }}>
            <Breadcrumbs />
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          {badge && (
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              {Icon && <Icon size={16} />}
              {badge}
            </div>
          )}

          <h1 
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: subtitle ? '1rem' : 0,
              color: 'white'
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p 
              style={{
                fontSize: '1.125rem',
                opacity: 0.9,
                maxWidth: '42rem',
                margin: '0 auto',
                lineHeight: 1.6
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

