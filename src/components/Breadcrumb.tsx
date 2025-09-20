import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const location = useLocation();

  // Generate breadcrumb items from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) {
      return items;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  return (
    <nav 
      className={`breadcrumb ${className}`} 
      aria-label="Breadcrumb"
      role="navigation"
    >
      <ol className="breadcrumb-list flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="breadcrumb-item flex items-center">
            {index > 0 && (
              <ChevronRight 
                className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" 
                aria-hidden="true"
              />
            )}
            
            {item.href ? (
              <Link
                to={item.href}
                className="breadcrumb-link text-gray-600 hover:text-primary transition-colors duration-200 flex items-center gap-1"
                aria-current={item.current ? 'page' : undefined}
              >
                {index === 0 && <Home className="w-4 h-4" aria-hidden="true" />}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span 
                className="breadcrumb-current text-gray-900 font-medium flex items-center gap-1"
                aria-current="page"
              >
                {index === 0 && <Home className="w-4 h-4" aria-hidden="true" />}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;