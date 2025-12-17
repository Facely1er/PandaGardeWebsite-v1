import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Users, Gamepad2, Award, Moon, Sun, Search, 
  ArrowLeft, Map, Settings, LogOut, Bell
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Logo from '../Logo';

const FamilyHubHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/family-hub' },
    { icon: Gamepad2, label: 'Learning Hub', href: '/family-hub/learning' },
    { icon: Map, label: 'Journeys', href: '/family-hub/journeys' },
    { icon: Award, label: 'Certificates', href: '/family-hub/certificates' },
  ];

  const isActive = (href: string) => {
    if (href === '/family-hub') {
      return location.pathname === '/family-hub';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only">
        <a 
          href="#main-content" 
          className="absolute top-0 left-0 p-4 bg-purple-700 text-white z-50 focus:outline-none"
        >
          Skip to main content
        </a>
      </div>

      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 shadow-lg' 
            : 'bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500'
        }`}
        role="banner"
      >
        {/* Logo - Outside container for larger size */}
        <Link 
          to="/family-hub"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 group z-10"
          aria-label="Family Hub - Go to dashboard"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm p-2 group-hover:bg-white/30 transition-colors shadow-lg">
            <Logo />
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-xl">Family Hub</span>
            <span className="block text-purple-200 text-sm">Privacy Learning</span>
          </div>
        </Link>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 pl-20 sm:pl-48">
            {/* Spacer for logo */}
            <div className="flex-shrink-0" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Family Hub navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      active
                        ? 'bg-white text-purple-700'
                        : 'text-white/90 hover:bg-white/20 hover:text-white'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Back to Main Site */}
              <Link
                to="/"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
                title="Back to main site"
              >
                <ArrowLeft size={16} />
                <span className="hidden lg:inline">Main Site</span>
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* Notifications */}
              <button
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden bg-gradient-to-b from-purple-700 to-purple-800 border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Mobile navigation">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        active
                          ? 'bg-white text-purple-700'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Divider */}
                <div className="border-t border-white/10 my-3" />
                
                {/* Back to Main Site */}
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowLeft size={20} />
                  <span>Back to Main Site</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default FamilyHubHeader;

