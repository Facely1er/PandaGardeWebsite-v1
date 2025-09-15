import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Book, ClipboardCheck as ChalkboardTeacher, School, Shield as Child, User, UserCheck, Gamepad2, Mail, HelpCircle, Newspaper, Headphones, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const resourceLinks = [
    { icon: BookOpen, href: '/activity-book', label: 'Activity Book' },
    { icon: Book, href: '/story', label: 'Privacy Panda Story' },
    { icon: ChalkboardTeacher, href: '/#parent-resources', label: 'Parent Guides' },
    { icon: School, href: '/educator-tools', label: 'Educator Tools' }
  ];

  const ageGroupLinks = [
    { icon: Child, href: '/#age-groups', label: 'Ages 5-8 Resources' },
    { icon: User, href: '/#age-groups', label: 'Ages 9-12 Resources' },
    { icon: UserCheck, href: '/teen-handbook', label: 'Teen Handbook' },
    { icon: Gamepad2, href: '/privacy-explorers', label: 'Privacy Explorers' }
  ];

  const connectLinks = [
    { icon: Mail, href: '/contact', label: 'Contact Us' },
    { icon: HelpCircle, href: '/faq', label: 'FAQ' },
    { icon: Newspaper, href: '/newsletter', label: 'Newsletter' },
    { icon: Headphones, href: '/support', label: 'Support' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <div className="logo-icon" style={{ width: '32px', height: '32px', marginRight: '5px' }}>
                <img
                  src="/LogoPandagarde.png"
                  alt="PandaGarde Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              PandaGarde
            </h3>
            <p>Building privacy skills for tomorrow's world. Comprehensive digital privacy education for families with children ages 5-17.</p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="social-link" aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                    >
                      <link.icon size={16} />
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href}>
                      <link.icon size={16} />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Age Groups</h4>
            <ul>
              {ageGroupLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                    >
                      <link.icon size={16} />
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href}>
                      <link.icon size={16} />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              {connectLinks.map((link, index) => (
                <li key={index}>
                 <Link to={link.href}>
                   <link.icon size={16} />
                   {link.label}
                 </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 PandaGarde. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;