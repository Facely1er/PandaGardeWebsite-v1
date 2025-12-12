import React from 'react';
import { Link } from 'react-router-dom';
import { Shield as Child, User, UserCheck, Mail, HelpCircle, Newspaper, Headphones, Users, Shield, Wrench, BookOpen, GraduationCap, Info, Heart, Globe, MessageCircle, Download, FileText, Target, AlertCircle, Briefcase } from 'lucide-react';

const Footer: React.FC = () => {
  // Social media links removed - no active social media accounts

  const learnLinks = [
    { icon: Child, href: '/privacy-explorers', label: 'Privacy Explorers (5-8)' },
    { icon: User, href: '/privacy-handbook', label: 'Privacy Handbook (9-12)' },
    { icon: UserCheck, href: '/teen-handbook', label: 'Teen Handbook (13-17)' },
    { icon: Users, href: '/parent-resources', label: 'Parent Resources' },
    { icon: GraduationCap, href: '/educator-tools', label: 'Educator Tools' }
  ];

  const communityLinks = [
    { icon: MessageCircle, href: '/community/forum', label: 'Privacy Tips Forum' },
    { icon: Heart, href: '/community/stories', label: 'Success Stories' },
    { icon: Globe, href: '/community/resources', label: 'Community Resources' },
    { icon: Users, href: '/family-hub', label: 'Family Hub' }
  ];

  const guidesLinks = [
    { icon: Shield, href: '/guides/family-privacy', label: 'Family Privacy Guide' },
    { icon: Wrench, href: '/guides/device-setup', label: 'Device Setup' },
    { icon: BookOpen, href: '/guides/app-selection', label: 'App Selection' },
    { icon: AlertCircle, href: '/guides/emergency-safety', label: 'Emergency Safety' },
    { icon: FileText, href: '/guides/age-specific', label: 'Age-Specific Guides' }
  ];

  const toolsLinks = [
    { icon: Target, href: '/privacy-assessment', label: 'Privacy Assessment' },
    { icon: Target, href: '/quick-assessment', label: 'Quick Assessment' },
    { icon: Shield, href: '/privacy-goals', label: 'Privacy Goals' },
    { icon: Download, href: '/downloads/coloring-sheets', label: 'Coloring Sheets' },
    { icon: Download, href: '/downloads/certificates', label: 'Certificates' }
  ];

  const supportLinks = [
    { icon: Info, href: '/about', label: 'About Us' },
    { icon: HelpCircle, href: '/faq', label: 'FAQ' },
    { icon: Mail, href: '/contact', label: 'Contact Us' },
    { icon: Headphones, href: '/support', label: 'Support' },
    { icon: Newspaper, href: '/newsletter', label: 'Newsletter' },
    { icon: Briefcase, href: '/pilot', label: 'Join Pilot Program' }
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
            <h4>Learn</h4>
            <ul>
              {learnLinks.map((link, index) => (
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
            <h4>Community</h4>
            <ul>
              {communityLinks.map((link, index) => (
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
            <h4>Guides</h4>
            <ul>
              {guidesLinks.map((link, index) => (
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
            <h4>Tools & Resources</h4>
            <ul>
              {toolsLinks.map((link, index) => (
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
              {supportLinks.map((link, index) => (
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