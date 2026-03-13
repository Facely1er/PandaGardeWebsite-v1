import React from 'react';
import { Link } from 'react-router-dom';
import { Shield as Child, User, UserCheck, Mail, HelpCircle, Newspaper, Headphones, Users, Shield, Wrench, BookOpen, GraduationCap, Info, Scale } from 'lucide-react';
import { PRIVACY_PORTAL_URL } from '../config/portal';

const Footer: React.FC = () => {
  // Social media links removed - no active social media accounts

  const productLinks = [
    { icon: Users, href: '/family-hub', label: 'Family Hub', isExternal: false },
    { icon: Shield, href: '/privacy-panda', label: 'Privacy Panda' },
    { icon: Wrench, href: '/resources', label: 'Parent Toolkit' }
  ];

  const curriculumLinks = [
    { icon: Child, href: '/privacy-explorers', label: 'Ages 5-8' },
    { icon: User, href: '/privacy-handbook', label: 'Ages 9-12' },
    { icon: UserCheck, href: '/teen-handbook', label: 'Ages 13-17' },
    { icon: Users, href: '/resources', label: 'Parents' }
  ];

  const connectLinks = [
    { icon: Mail, href: '/contact', label: 'Contact Us' },
    { icon: HelpCircle, href: '/faq', label: 'FAQ' },
    { icon: Newspaper, href: '/newsletter', label: 'Newsletter' },
    { icon: Headphones, href: '/support', label: 'Support' }
  ];

  const quickLinks = [
    { icon: BookOpen, href: '/overview', label: 'Overview' },
    { icon: Users, href: '/get-started', label: 'Get Started' },
    { icon: GraduationCap, href: '/resources', label: 'Resources' },
    { icon: Info, href: '/about', label: 'About' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <div className="logo-icon" style={{ width: '50px', height: '50px', marginRight: '8px' }}>
                <img
                  src="/LogoPandagarde.png"
                  alt="PandaGarde Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              PandaGarde
            </h3>
            <p>Building privacy skills for tomorrow's world. Comprehensive digital privacy education for families with children ages 5-17.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Products</h4>
            <ul>
              {productLinks.map((link, index) => (
                <li key={index}>
                  {link.isExternal ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
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
            <h4>Curriculum</h4>
            <ul>
              {curriculumLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
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
          <p>© 2026 PandaGarde. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/accessibility">Accessibility</Link>
            <a href={PRIVACY_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Scale size={14} />
              Maryland (MODPA) – Your rights
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;