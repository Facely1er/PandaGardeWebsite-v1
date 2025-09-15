import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Users, Calendar, ClipboardCheck as ChalkboardTeacher, Info, Moon, Sun, User, LogOut, Settings, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, profile, signOut } = useAuth();
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
      // Close mobile menu on Escape
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Close user menu on Escape
      if (e.key === 'Escape' && showUserMenu) {
        setShowUserMenu(false);
      }
      
      // Close modals on Escape
      if (e.key === 'Escape' && (isAuthModalOpen || isSearchModalOpen)) {
        setIsAuthModalOpen(false);
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, showUserMenu, isAuthModalOpen, isSearchModalOpen]);

  const navItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: BookOpen, label: 'Activity Book', href: '/activity-book', isExternal: false },
    { icon: Users, label: 'Family Hub', href: 'https://www.hub.pandagarde.com', isExternal: true },
    { icon: Users, label: 'Age Groups', href: '/#age-groups', isExternal: false },
    { icon: Calendar, label: 'Implementation', href: '/#implementation', isExternal: false },
    { icon: ChalkboardTeacher, label: 'For Parents', href: '/#parent-resources', isExternal: false },
    { icon: Info, label: 'About', href: '/about', isExternal: false },
  ];

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
        }, 500); // Increased timeout for better reliability
      } else {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    if (href.startsWith('#')) {
      return location.pathname === '/' && location.hash === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    navigate('/family-hub');
  };

  const handleSearchResultClick = (result: { url: string }) => {
    navigate(result.url);
  };

  // Focus management for accessibility
  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Focus first menu item when opening
    if (newState) {
      setTimeout(() => {
        const firstMenuItem = document.querySelector('.nav-menu .nav-link') as HTMLElement;
        firstMenuItem?.focus();
      }, 100);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container">
        <nav className="nav" role="navigation" aria-label="Main navigation">
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
              />
            </div>
            <span>Panda<span className="highlight">Garde</span></span>
          </Link>
          
          <ul 
            id="mobile-menu"
            className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}
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
          </ul>
          
          <div className="nav-actions" role="toolbar" aria-label="Navigation actions">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="search-toggle"
              aria-label="Open search dialog"
              title="Search the site"
            >
              <Search size={20} aria-hidden="true" />
            </button>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
            </button>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Open user menu"
                  aria-expanded={showUserMenu}
                  aria-haspopup="menu"
                >
                  <User size={20} aria-hidden="true" />
                  <span className="hidden sm:block">
                    {profile?.profile_data?.firstName || user?.email?.split('@')[0] || 'User'}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                    role="menu"
                    aria-label="User account menu"
                  >
                    <a
                      href="https://www.hub.pandagarde.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserMenu(false)}
                      role="menuitem"
                      aria-label="Open Family Hub (opens in new tab)"
                    >
                      <Users size={16} className="mr-3" aria-hidden="true" />
                      Family Hub
                    </a>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserMenu(false)}
                      role="menuitem"
                      aria-label="Go to profile settings"
                    >
                      <Settings size={16} className="mr-3" aria-hidden="true" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      aria-label="Sign out of your account"
                    >
                      <LogOut size={16} className="mr-3" aria-hidden="true" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="cta-button"
                aria-label="Open account login dialog"
                title="Sign in or create account"
              >
                Account
              </button>
            )}
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
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onResultClick={handleSearchResultClick}
      />
    </header>
  );
};

export default Header;