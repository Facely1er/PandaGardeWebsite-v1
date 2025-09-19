import React from 'react';
import { Link } from 'react-router-dom';
import { Shield as Child, User, UserCheck, Mail, HelpCircle, Newspaper, Headphones, Users, Shield, Wrench } from 'lucide-react';

const Footer: React.FC = () => {
  // scrollToSection function removed - no longer needed since all links are now regular routes

  // Social media links removed - no active social media accounts

  const productLinks = [
    { icon: Users, href: '/family-hub', label: 'Family Hub' },
    { icon: Shield, href: '/story', label: 'PrivacyPanda' },
    { icon: Wrench, href: '/parent-resources', label: 'Parent Toolkit' }
  ];

  const curriculumLinks = [
    { icon: Child, href: '/activity-book', label: 'Ages 5-8' },
    { icon: User, href: '/privacy-explorers', label: 'Ages 9-12' },
    { icon: UserCheck, href: '/teen-handbook', label: 'Ages 13-17' },
    { icon: Users, href: '/parent-resources', label: 'Parents' }
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
          </div>

          <div className="footer-column">
            <h4>Products</h4>
            <ul>
              {productLinks.map((link, index) => (
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