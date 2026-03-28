import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, ClipboardCheck as ChalkboardTeacher, Info, Moon, Sun, Search, Bell, MessageCircle, Heart, Globe, Book, Sparkles, BarChart3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchModal from './SearchModal';

function Header() {
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
        setIsMobileMenuOpen(false);
      }
      
      // Close modals on Escape
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, isSearchModalOpen]);

  // Primary IA: journey first (start → footprint), then flagship learning, library, product overview.
  // Reduces the feel of “many parallel marketing links” (Features vs Home overlap is handled by ordering Features later).
  const navItems = useMemo(() => {
    const items = [
      { id: 'nav-home', icon: Home, label: 'Home', href: '/', isExternal: false, hideOnMedium: true },
      { id: 'nav-get-started', icon: Users, label: 'Get Started', href: '/get-started', isExternal: false, hideOnMedium: false },
      { id: 'nav-digital-footprint', icon: BarChart3, label: 'Digital Footprint', href: '/digital-footprint', isExternal: false, hideOnMedium: false },
      { id: 'nav-privacy-panda', icon: Book, label: 'Privacy Panda', href: '/privacy-panda', isExternal: false, hideOnMedium: false },
      { id: 'nav-resources', icon: ChalkboardTeacher, label: 'Resources', href: '/resources', isExternal: false, hideOnMedium: false },
      { id: 'nav-features', icon: Sparkles, label: 'Features', href: '/features', isExternal: false, hideOnMedium: false },
      { id: 'nav-community', icon: MessageCircle, label: 'Community', href: '/community/forum', isExternal: false, hideOnMedium: true },
    ];
    // Remove duplicates based on href to ensure uniqueness
    const seen = new Set<string>();
    return items.filter(item => {
      if (seen.has(item.href)) {
        return false;
      }
      seen.add(item.href);
      return true;
    });
  }, []);

  // Same journey-first order as desktop (see navItems).
  const mobileNavItems = useMemo(() => {
    const items = [
      { id: 'mobile-nav-home', icon: Home, label: 'Home', href: '/', isExternal: false },
      { id: 'mobile-nav-get-started', icon: Users, label: 'Get Started', href: '/get-started', isExternal: false },
      { id: 'mobile-nav-digital-footprint', icon: BarChart3, label: 'Digital Footprint', href: '/digital-footprint', isExternal: false },
      { id: 'mobile-nav-privacy-panda', icon: Book, label: 'Privacy Panda', href: '/privacy-panda', isExternal: false },
      { id: 'mobile-nav-resources', icon: ChalkboardTeacher, label: 'Resources', href: '/resources', isExternal: false },
      { id: 'mobile-nav-features', icon: Sparkles, label: 'Features', href: '/features', isExternal: false },
      { id: 'mobile-nav-community', icon: MessageCircle, label: 'Community Forum', href: '/community/forum', isExternal: false },
      { id: 'mobile-nav-stories', icon: Heart, label: 'Success Stories', href: '/community/stories', isExternal: false },
      { id: 'mobile-nav-community-resources', icon: Globe, label: 'Community Resources', href: '/community/resources', isExternal: false },
      { id: 'mobile-nav-about', icon: Info, label: 'About', href: '/about', isExternal: false },
    ];
    // Remove duplicates based on href to ensure uniqueness
    const seen = new Set<string>();
    return items.filter(item => {
      if (seen.has(item.href)) {
        return false;
      }
      seen.add(item.href);
      return true;
    });
  }, []);


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

  // Focus management for accessibility
  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Focus management
    if (newState) {
      // Focus first menu item when opening
      setTimeout(() => {
        const firstMenuItem = document.querySelector('.mobile-nav .nav-link') as HTMLElement;
        firstMenuItem?.focus();
      }, 100);
    } else {
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
            <div className="logo-icon">
              <img
                src="/LogoPandagarde.png"
                alt="PandaGarde Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
              <li key={item.id} role="none" className={item.hideOnMedium ? 'hide-on-medium' : ''}>
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
            
            {/* Family Hub — icon-only to reduce header crowding; label via aria-label / title */}
            <Link
              to="/family-hub"
              className="family-hub-button"
              aria-label="Family Hub — connect with other families and access exclusive resources"
              title="Family Hub — connect with other families and access exclusive resources"
            >
              <Users size={20} strokeWidth={2} aria-hidden="true" />
            </Link>

            {/* Mobile Menu Toggle */}
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
          </div>
        </nav>
      </div>
      
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onResultClick={handleSearchResultClick}
      />
      </header>

      {/* Mobile Navigation — rendered as a portal to escape the header's
          backdrop-filter containing block so position:fixed resolves to viewport */}
      {createPortal(
        <>
          {/* Backdrop */}
          <div
            className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <ul
            id="mobile-menu"
            className={`nav-menu mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}
            role="menubar"
            aria-label="Main navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
          >
            {mobileNavItems.map((item) => (
              <li key={item.id} role="none">
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
                ) : item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
                  setIsMobileMenuOpen(false);
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
        </>,
        document.body
      )}
    </>
  );
}

export default Header;