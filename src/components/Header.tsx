import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Users, Calendar, ClipboardCheck as ChalkboardTeacher, Info, Moon, Sun, Search, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchModal from './SearchModal';
import OfflineIndicator from './OfflineIndicator';
import ServiceNotificationCenter from './ServiceNotificationCenter';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to close mobile menu and restore body scroll
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    // Restore body scroll
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
        return;
      }
      
      // Close mobile menu on Escape
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
      
      // Close modals on Escape
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, isSearchModalOpen, closeMobileMenu]);

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => {
      // Restore body scroll when component unmounts
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: BookOpen, label: 'Overview', href: '/overview', isExternal: false },
    { icon: Users, label: 'Quick Start', href: '/quick-start', isExternal: false },
    { icon: ChalkboardTeacher, label: 'Resources', href: '/resources', isExternal: false },
    { icon: Info, label: 'About', href: '/about', isExternal: false },
  ];

  const mobileNavItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: BookOpen, label: 'Overview', href: '/overview', isExternal: false },
    { icon: Users, label: 'Quick Start', href: '/quick-start', isExternal: false },
    { icon: ChalkboardTeacher, label: 'Resources', href: '/resources', isExternal: false },
    { icon: Info, label: 'About', href: '/about', isExternal: false },
    { icon: Users, label: 'Family Hub', href: 'https://www.hub.pandagarde.com', isExternal: true },
  ];


  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      // If we're not on the home page, navigate there first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };


  const handleSearchResultClick = (result: { url: string }) => {
    navigate(result.url);
  };

  // Focus management for accessibility and body scroll lock
  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Lock/unlock body scroll
    if (newState) {
      // Lock body scroll when menu opens
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      
      // Focus first menu item when opening
      setTimeout(() => {
        const firstMenuItem = document.querySelector('.mobile-nav .nav-link') as HTMLElement;
        firstMenuItem?.focus();
      }, 100);
    } else {
      // Unlock body scroll when menu closes
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      
      // Return focus to menu toggle button when closing
      setTimeout(() => {
        const menuToggle = document.querySelector('.mobile-menu-toggle') as HTMLElement;
        menuToggle?.focus();
      }, 100);
    }
  };

  // Handle keyboard navigation in mobile menu
  const handleMobileMenuKeyDown = (e: React.KeyboardEvent) => {
    if (!isMobileMenuOpen) {return;}
    
    const menuItems = Array.from(document.querySelectorAll('.mobile-nav .nav-link')) as HTMLElement[];
    const currentIndex = menuItems.findIndex(item => item === document.activeElement);
    
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex]?.focus();
        break;
      }
      case 'Home':
        e.preventDefault();
        menuItems[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        menuItems[menuItems.length - 1]?.focus();
        break;
    }
  };

  return (
    <>
      {/* Skip Links for Accessibility */}
      <div className="skip-links">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <a href="#navigation" className="skip-link">
          Skip to navigation
        </a>
      </div>
      
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container">
        <nav className="nav" role="navigation" aria-label="Main navigation" id="navigation">
          <Link 
            to="/" 
            className="logo"
            aria-label="PandaGarde - Go to homepage"
          >
            <div className="logo-icon" aria-hidden="true">
              <img
                src="/LogoPandagarde.png"
                alt="PandaGarde Logo"
                className="panda-logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                loading="lazy"
              />
            </div>
            <span>Panda<span className="highlight">Garde</span></span>
          </Link>
          
          {/* Desktop Navigation Menu */}
          <ul 
            className="nav-menu desktop-nav"
            role="menubar"
            aria-label="Main navigation menu"
          >
            {navItems.map((item) => (
              <li key={item.label} role="none">
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    to={item.href} 
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} page`}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Backdrop */}
          {isMobileMenuOpen && (
            <div 
              className="mobile-menu-backdrop"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
          )}
          
          {/* Mobile Navigation Menu */}
          <ul 
            id="mobile-menu"
            className={`nav-menu mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}
            role="menubar"
            aria-label="Main navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
          >
            {/* Mobile Menu Close Button */}
            <li role="none" className="mobile-menu-close">
              <button
                onClick={closeMobileMenu}
                className="mobile-close-button"
                aria-label="Close mobile menu"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </li>
            
            {mobileNavItems.map((item) => (
              <li key={item.label} role="none">
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                      closeMobileMenu();
                    }}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </a>
                ) : item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                    onClick={closeMobileMenu}
                    role="menuitem"
                    aria-label={`${item.label} (opens in new tab)`}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    to={item.href} 
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} page`}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            
            {/* Mobile Search Button */}
            <li role="none" className="mobile-search-item">
              <button
                onClick={() => {
                  setIsSearchModalOpen(true);
                  closeMobileMenu();
                }}
                className="nav-link mobile-search-button"
                role="menuitem"
                aria-label="Open search dialog"
              >
                <Search size={16} aria-hidden="true" />
                Search
              </button>
            </li>
          </ul>
          
          <div className="nav-actions" role="toolbar" aria-label="Navigation actions">
            {/* Notification Badge */}
            <Link
              to="/safety-alerts"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="View safety alerts and notifications"
              title="Safety Alerts"
            >
              <Bell size={20} aria-hidden="true" />
            </Link>
            
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="search-toggle"
              aria-label="Open search dialog"
              title="Search the site (Ctrl+K)"
              aria-describedby="search-help"
            >
              <Search size={20} aria-hidden="true" />
            </button>
            <span id="search-help" className="sr-only">Press Ctrl+K to open search</span>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
            </button>
            
            {/* Offline Indicator */}
            <OfflineIndicator className="hidden md:block" />
            
            {/* Family Hub Button - Prominent */}
            <a
              href="https://www.hub.pandagarde.com"
              target="_blank"
              rel="noopener noreferrer"
              className="family-hub-button"
              aria-label="Visit Family Hub (opens in new tab)"
              title="Connect with other families and access exclusive resources"
            >
              <Users size={16} aria-hidden="true" />
              Family Hub
            </a>
          </div>
          
          <button
            className="mobile-menu-toggle"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            title={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </nav>
      </div>
      
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onResultClick={handleSearchResultClick}
      />
      </header>
    </>
  );
};

export default Header;