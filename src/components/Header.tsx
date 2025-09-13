import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Users, Calendar, ClipboardCheck as ChalkboardTeacher, Info, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: BookOpen, label: 'Activity Book', href: '/activity-book', isExternal: false },
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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <img 
                src="/LogoPandagarde.png" 
                alt="PandaGarde Logo" 
                className="panda-logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span>Panda<span className="highlight">Garde</span></span>
          </Link>
          
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    to={item.href} 
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/family-hub" className="cta-button">Family Hub</Link>
          </div>
          
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;