import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  type LucideIcon,
  Home,
  Gamepad2,
  Map,
  Award,
  User,
  Globe,
  HelpCircle,
  Mail,
  Shield,
  Scale,
} from 'lucide-react';
import { PRIVACY_PORTAL_URL } from '../../config/portal';

interface TabItem {
  icon: LucideIcon;
  to: string;
  label: string;
  /** Match learning + games under one tab */
  match?: (path: string) => boolean;
}

const hubTabs: TabItem[] = [
  {
    icon: Home,
    to: '/family-hub',
    label: 'Home',
    match: (path) => path === '/family-hub' || path === '/family-hub/',
  },
  {
    icon: Gamepad2,
    to: '/family-hub/learning',
    label: 'Learn',
    match: (path) =>
      path.startsWith('/family-hub/learning') || path.startsWith('/family-hub/games'),
  },
  {
    icon: Map,
    to: '/family-hub/journeys',
    label: 'Journeys',
    match: (path) => path.startsWith('/family-hub/journeys'),
  },
  {
    icon: Award,
    to: '/family-hub/certificates',
    label: 'Awards',
    match: (path) => path.startsWith('/family-hub/certificates'),
  },
  {
    icon: User,
    to: '/family-hub/profile',
    label: 'Profile',
    match: (path) =>
      path.startsWith('/family-hub/profile') || path.startsWith('/family-hub/settings'),
  },
];

const FamilyHubFooter: React.FC = () => {
  const { pathname } = useLocation();
  const isLogin = pathname.endsWith('/family-hub/login');

  if (isLogin) {
    return (
      <footer
        className="mt-auto border-t border-white/10 bg-slate-950/95 backdrop-blur-md safe-area-bottom z-40"
        role="contentinfo"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 py-3 text-[11px] text-purple-200/90">
          <Link to="/" className="font-medium text-white hover:text-amber-200 transition-colors">
            Main website
          </Link>
          <span className="text-white/20" aria-hidden>
            ·
          </span>
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <span className="text-white/20 hidden sm:inline" aria-hidden>
            ·
          </span>
          <span className="text-purple-300/70 w-full text-center sm:w-auto">
            © 2026 PandaGarde
          </span>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col border-t border-white/10 bg-slate-950/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.35)]"
      role="contentinfo"
    >
      {/* Compact app “more” row — not a marketing sitemap */}
      <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 px-2 py-1.5 border-b border-white/5 overflow-x-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 shrink-0 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Globe size={12} className="opacity-80" aria-hidden />
          Site
        </Link>
        <Link
          to="/faq"
          className="inline-flex items-center gap-1 shrink-0 px-2 py-1 rounded-md text-[10px] sm:text-xs text-purple-200/90 hover:text-white hover:bg-white/10 transition-colors"
        >
          <HelpCircle size={12} className="opacity-80" aria-hidden />
          FAQ
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1 shrink-0 px-2 py-1 rounded-md text-[10px] sm:text-xs text-purple-200/90 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Mail size={12} className="opacity-80" aria-hidden />
          Contact
        </Link>
        <Link
          to="/privacy"
          className="inline-flex items-center gap-1 shrink-0 px-2 py-1 rounded-md text-[10px] sm:text-xs text-purple-200/90 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Shield size={12} className="opacity-80" aria-hidden />
          Privacy
        </Link>
        <a
          href={PRIVACY_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 shrink-0 px-2 py-1 rounded-md text-[10px] sm:text-xs text-purple-200/90 hover:text-white hover:bg-white/10 transition-colors max-w-[140px] sm:max-w-none truncate"
        >
          <Scale size={12} className="opacity-80 shrink-0" aria-hidden />
          <span className="truncate">MODPA rights</span>
        </a>
      </div>

      {/* Bottom tab bar */}
      <nav
        className="grid grid-cols-5 min-h-[56px] sm:min-h-[60px] safe-area-bottom"
        aria-label="Family Hub primary navigation"
      >
        {hubTabs.map(({ icon: Icon, to, label, match }) => {
          const active = match ? match(pathname) : pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={[
                'flex flex-col items-center justify-center gap-0.5 min-w-0 px-1 py-1.5',
                'touch-manipulation transition-colors active:opacity-80',
                active
                  ? 'text-amber-300 bg-white/10'
                  : 'text-purple-300/80 hover:text-white hover:bg-white/5',
              ].join(' ')}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 2}
                className="shrink-0"
                aria-hidden
              />
              <span className="text-[10px] sm:text-[11px] font-medium leading-tight text-center truncate max-w-full">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default FamilyHubFooter;
