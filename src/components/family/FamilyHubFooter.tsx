import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Gamepad2, Map, Award, ArrowLeft,
  Mail, HelpCircle, Shield, ExternalLink
} from 'lucide-react';
import Logo from '../Logo';

const FamilyHubFooter: React.FC = () => {
  const hubLinks = [
    { icon: Home, href: '/family-hub', label: 'Dashboard' },
    { icon: Gamepad2, href: '/family-hub/learning', label: 'Learning Hub' },
    { icon: Map, href: '/family-hub/journeys', label: 'Journeys' },
    { icon: Award, href: '/family-hub/certificates', label: 'Certificates' },
  ];

  const supportLinks = [
    { icon: HelpCircle, href: '/faq', label: 'FAQ' },
    { icon: Mail, href: '/contact', label: 'Contact Us' },
    { icon: Shield, href: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 text-white mt-auto">
      {/* Wave separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-8"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-[#F5F3FF]"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/family-hub" className="flex items-center gap-3 group mb-3">
              <div className="w-12 h-12 flex-shrink-0">
                <Logo />
              </div>
              <div>
                <span className="text-white font-bold text-lg">Family Hub</span>
                <span className="block text-purple-200 text-xs">Privacy Learning</span>
              </div>
            </Link>
            <p className="text-purple-200 text-sm leading-relaxed">
              Teaching digital privacy through fun, interactive games.
            </p>
          </div>

          {/* Hub Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Gamepad2 size={16} className="text-purple-300" />
              Family Hub
            </h4>
            <ul className="space-y-1">
              {hubLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors text-sm py-0.5"
                  >
                    <link.icon size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <HelpCircle size={16} className="text-purple-300" />
              Help & Support
            </h4>
            <ul className="space-y-1">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors text-sm py-0.5"
                  >
                    <link.icon size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Main Site */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <ExternalLink size={16} className="text-purple-300" />
              PandaGarde
            </h4>
            <p className="text-purple-200 text-sm mb-2">
              Visit the main site for more resources.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
            >
              <ArrowLeft size={14} />
              Main Website
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-4 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-purple-300 text-xs">
              © 2025 PandaGarde Family Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link to="/privacy" className="text-purple-300 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-purple-300 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/accessibility" className="text-purple-300 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FamilyHubFooter;

