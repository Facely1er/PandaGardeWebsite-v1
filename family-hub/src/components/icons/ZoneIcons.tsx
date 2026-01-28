import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Privacy Forest Icon - Friendly tree with shield
export const ForestIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Tree trunk */}
    <rect x="28" y="42" width="8" height="14" rx="2" fill="#8B5A2B"/>
    <rect x="29" y="44" width="2" height="10" fill="#A0522D" opacity="0.5"/>
    
    {/* Tree foliage layers */}
    <ellipse cx="32" cy="34" rx="18" ry="14" fill="#22C55E"/>
    <ellipse cx="32" cy="28" rx="14" ry="12" fill="#4ADE80"/>
    <ellipse cx="32" cy="22" rx="10" ry="10" fill="#86EFAC"/>
    
    {/* Highlights */}
    <ellipse cx="26" cy="26" rx="4" ry="3" fill="#BBF7D0" opacity="0.6"/>
    <ellipse cx="36" cy="32" rx="3" ry="2" fill="#BBF7D0" opacity="0.4"/>
    
    {/* Small shield on tree */}
    <path d="M32 16 L38 20 L38 26 C38 30 32 34 32 34 C32 34 26 30 26 26 L26 20 Z" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
    <path d="M32 20 L32 28 M28 24 L36 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Decorative elements */}
    <circle cx="20" cy="36" r="2" fill="#FDE047"/>
    <circle cx="44" cy="32" r="1.5" fill="#FDE047"/>
    <circle cx="24" cy="42" r="1" fill="#FDE047"/>
  </svg>
);

// Password Castle Icon - Friendly castle with key
export const CastleIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Castle base */}
    <rect x="12" y="28" width="40" height="28" rx="2" fill="#8B5CF6"/>
    <rect x="14" y="30" width="8" height="26" fill="#A78BFA" opacity="0.5"/>
    
    {/* Castle towers */}
    <rect x="8" y="18" width="12" height="38" rx="1" fill="#7C3AED"/>
    <rect x="44" y="18" width="12" height="38" rx="1" fill="#7C3AED"/>
    
    {/* Tower tops (crenellations) */}
    <rect x="6" y="12" width="4" height="8" fill="#6D28D9"/>
    <rect x="12" y="12" width="4" height="8" fill="#6D28D9"/>
    <rect x="42" y="12" width="4" height="8" fill="#6D28D9"/>
    <rect x="48" y="12" width="4" height="8" fill="#6D28D9"/>
    <rect x="54" y="12" width="4" height="8" fill="#6D28D9"/>
    
    {/* Middle tower */}
    <rect x="24" y="8" width="16" height="20" rx="1" fill="#8B5CF6"/>
    <rect x="22" y="4" width="6" height="8" fill="#7C3AED"/>
    <rect x="30" y="4" width="6" height="8" fill="#7C3AED"/>
    <rect x="36" y="4" width="6" height="8" fill="#7C3AED"/>
    
    {/* Door */}
    <path d="M26 56 L26 40 Q32 36 38 40 L38 56" fill="#4C1D95"/>
    
    {/* Windows */}
    <rect x="10" y="26" width="6" height="8" rx="3" fill="#C4B5FD"/>
    <rect x="48" y="26" width="6" height="8" rx="3" fill="#C4B5FD"/>
    
    {/* Key symbol */}
    <circle cx="32" cy="12" r="4" fill="#FDE047" stroke="#EAB308" strokeWidth="1.5"/>
    <rect x="30" y="16" width="4" height="8" rx="1" fill="#FDE047"/>
    <rect x="28" y="20" width="3" height="2" fill="#FDE047"/>
    
    {/* Flag */}
    <rect x="31" y="0" width="2" height="6" fill="#6D28D9"/>
    <path d="M33 0 L40 3 L33 6" fill="#F472B6"/>
  </svg>
);

// Safe Surfing Sea Icon - Friendly wave with compass
export const OceanIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Sky gradient background */}
    <circle cx="32" cy="32" r="30" fill="url(#oceanGradient)"/>
    
    {/* Sun */}
    <circle cx="48" cy="14" r="8" fill="#FDE047"/>
    <circle cx="48" cy="14" r="5" fill="#FEF08A"/>
    
    {/* Waves */}
    <path d="M0 40 Q8 34 16 40 Q24 46 32 40 Q40 34 48 40 Q56 46 64 40 L64 64 L0 64 Z" fill="#3B82F6"/>
    <path d="M0 46 Q8 40 16 46 Q24 52 32 46 Q40 40 48 46 Q56 52 64 46 L64 64 L0 64 Z" fill="#2563EB"/>
    <path d="M0 52 Q8 46 16 52 Q24 58 32 52 Q40 46 48 52 Q56 58 64 52 L64 64 L0 64 Z" fill="#1D4ED8"/>
    
    {/* Wave highlights */}
    <path d="M10 42 Q14 40 18 42" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M40 48 Q44 46 48 48" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    
    {/* Compass/Navigation */}
    <circle cx="20" cy="24" r="10" fill="white" stroke="#1E40AF" strokeWidth="2"/>
    <circle cx="20" cy="24" r="7" fill="#DBEAFE"/>
    <path d="M20 17 L22 24 L20 31 L18 24 Z" fill="#EF4444"/>
    <path d="M20 31 L22 24 L20 17 L18 24 Z" fill="#1E40AF"/>
    <circle cx="20" cy="24" r="2" fill="#1E40AF"/>
    
    {/* Little fish */}
    <ellipse cx="50" cy="50" rx="4" ry="2" fill="#F472B6"/>
    <path d="M54 50 L58 48 L58 52 Z" fill="#F472B6"/>
    <circle cx="48" cy="49.5" r="0.5" fill="white"/>
    
    <defs>
      <linearGradient id="oceanGradient" x1="32" y1="0" x2="32" y2="64">
        <stop offset="0%" stopColor="#7DD3FC"/>
        <stop offset="100%" stopColor="#BAE6FD"/>
      </linearGradient>
    </defs>
  </svg>
);

// Danger Detection Volcano Icon - Friendly volcano with warning sign
export const VolcanoIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    {/* Mountain/Volcano */}
    <path d="M32 8 L56 56 L8 56 Z" fill="#9A3412"/>
    <path d="M32 8 L42 56 L22 56 Z" fill="#C2410C"/>
    
    {/* Crater */}
    <ellipse cx="32" cy="14" rx="8" ry="4" fill="#7C2D12"/>
    
    {/* Lava glow */}
    <ellipse cx="32" cy="14" rx="5" ry="2.5" fill="#F97316"/>
    <ellipse cx="32" cy="14" rx="3" ry="1.5" fill="#FBBF24"/>
    
    {/* Lava drops */}
    <circle cx="26" cy="10" r="2" fill="#F97316">
      <animate attributeName="cy" values="10;6;10" dur="1s" repeatCount="indefinite"/>
    </circle>
    <circle cx="38" cy="8" r="1.5" fill="#FBBF24">
      <animate attributeName="cy" values="8;4;8" dur="0.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="32" cy="6" r="2.5" fill="#FDE047">
      <animate attributeName="cy" values="6;2;6" dur="1.2s" repeatCount="indefinite"/>
    </circle>
    
    {/* Warning sign */}
    <path d="M46 32 L56 48 L36 48 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="2"/>
    <text x="46" y="44" fontSize="12" fontWeight="bold" fill="#B45309" textAnchor="middle">!</text>
    
    {/* Ground decoration */}
    <ellipse cx="20" cy="54" rx="6" ry="2" fill="#78350F"/>
    <ellipse cx="48" cy="52" rx="4" ry="1.5" fill="#78350F"/>
    
    {/* Smoke clouds */}
    <circle cx="24" cy="4" r="3" fill="#D1D5DB" opacity="0.7">
      <animate attributeName="cy" values="4;0;4" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="40" cy="2" r="2" fill="#E5E7EB" opacity="0.5">
      <animate attributeName="cy" values="2;-2;2" dur="1.5s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

// Activity Icons

export const MazeIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#10B981"/>
    <path d="M12 12 L36 12 L36 20 L20 20 L20 28 L36 28 L36 36 L12 36 L12 28 L28 28" 
          stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <circle cx="14" cy="14" r="3" fill="#FDE047"/>
    <path d="M34 34 L38 38 M38 34 L34 38" stroke="#FDE047" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WordSearchIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#8B5CF6"/>
    <rect x="8" y="8" width="32" height="32" rx="2" fill="white"/>
    {/* Grid lines */}
    <path d="M16 8 L16 40 M24 8 L24 40 M32 8 L32 40" stroke="#E5E7EB" strokeWidth="1"/>
    <path d="M8 16 L40 16 M8 24 L40 24 M8 32 L40 32" stroke="#E5E7EB" strokeWidth="1"/>
    {/* Letters */}
    <text x="12" y="15" fontSize="6" fill="#6B7280" fontFamily="monospace">P</text>
    <text x="20" y="15" fontSize="6" fill="#8B5CF6" fontFamily="monospace" fontWeight="bold">R</text>
    <text x="28" y="15" fontSize="6" fill="#6B7280" fontFamily="monospace">X</text>
    <text x="12" y="23" fontSize="6" fill="#8B5CF6" fontFamily="monospace" fontWeight="bold">I</text>
    <text x="20" y="23" fontSize="6" fill="#6B7280" fontFamily="monospace">K</text>
    <text x="28" y="23" fontSize="6" fill="#8B5CF6" fontFamily="monospace" fontWeight="bold">V</text>
    <text x="12" y="31" fontSize="6" fill="#6B7280" fontFamily="monospace">Q</text>
    <text x="20" y="31" fontSize="6" fill="#8B5CF6" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="28" y="31" fontSize="6" fill="#6B7280" fontFamily="monospace">Z</text>
    {/* Highlight circle */}
    <circle cx="30" cy="30" r="10" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2"/>
    {/* Magnifying glass */}
    <circle cx="36" cy="36" r="6" fill="#FDE047" stroke="#F59E0B" strokeWidth="2"/>
    <line x1="40" y1="40" x2="44" y2="44" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const MemoryIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="4" width="18" height="18" rx="3" fill="#EC4899"/>
    <rect x="26" y="4" width="18" height="18" rx="3" fill="#3B82F6"/>
    <rect x="4" y="26" width="18" height="18" rx="3" fill="#F59E0B"/>
    <rect x="26" y="26" width="18" height="18" rx="3" fill="#10B981"/>
    {/* Card symbols */}
    <text x="13" y="17" fontSize="12" fill="white" textAnchor="middle">?</text>
    <circle cx="35" cy="13" r="4" fill="white"/>
    <path d="M9 31 L13 39 L17 31 Z" fill="white"/>
    <rect x="31" y="31" width="8" height="8" fill="white"/>
    {/* Sparkle */}
    <path d="M24 0 L25 3 L28 4 L25 5 L24 8 L23 5 L20 4 L23 3 Z" fill="#FDE047"/>
  </svg>
);

export const QuizIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Clipboard */}
    <rect x="8" y="6" width="32" height="38" rx="3" fill="#3B82F6"/>
    <rect x="18" y="2" width="12" height="8" rx="2" fill="#1E40AF"/>
    <rect x="12" y="14" width="24" height="26" rx="2" fill="white"/>
    {/* Questions */}
    <circle cx="17" cy="21" r="3" fill="#10B981"/>
    <path d="M15 21 L16.5 22.5 L19 19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="23" y="19" width="10" height="4" rx="1" fill="#E5E7EB"/>
    
    <circle cx="17" cy="30" r="3" fill="#F59E0B"/>
    <text x="17" y="32" fontSize="6" fill="white" textAnchor="middle">?</text>
    <rect x="23" y="28" width="10" height="4" rx="1" fill="#E5E7EB"/>
    
    <circle cx="17" cy="39" r="3" stroke="#D1D5DB" strokeWidth="1.5" fill="none"/>
    <rect x="23" y="37" width="10" height="4" rx="1" fill="#E5E7EB"/>
    
    {/* Pencil */}
    <rect x="36" y="32" width="4" height="16" rx="1" fill="#FDE047" transform="rotate(-45 36 32)"/>
    <path d="M44.5 40.5 L47 43 L44 44 Z" fill="#1E40AF"/>
  </svg>
);

export const SortingIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Boxes */}
    <rect x="4" y="28" width="18" height="16" rx="2" fill="#10B981"/>
    <rect x="26" y="28" width="18" height="16" rx="2" fill="#EF4444"/>
    {/* Box labels */}
    <path d="M10 34 L13 38 L16 34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 34 L35 38 L38 34" stroke="white" strokeWidth="2" strokeLinecap="round" transform="rotate(180 35 36)"/>
    {/* Items to sort */}
    <circle cx="12" cy="14" r="6" fill="#3B82F6"/>
    <rect x="28" y="8" width="10" height="10" rx="2" fill="#F59E0B"/>
    <path d="M20 18 L24 10 L28 18 Z" fill="#EC4899"/>
    {/* Arrows */}
    <path d="M12 22 L12 26" stroke="#10B981" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrow)"/>
    <path d="M33 20 L33 26" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ColoringIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Palette */}
    <ellipse cx="24" cy="28" rx="18" ry="14" fill="#FEF3C7"/>
    <ellipse cx="24" cy="28" rx="16" ry="12" fill="white" stroke="#F59E0B" strokeWidth="2"/>
    {/* Paint colors */}
    <circle cx="14" cy="24" r="4" fill="#EF4444"/>
    <circle cx="22" cy="20" r="4" fill="#F59E0B"/>
    <circle cx="32" cy="22" r="4" fill="#10B981"/>
    <circle cx="36" cy="30" r="4" fill="#3B82F6"/>
    <circle cx="28" cy="34" r="4" fill="#8B5CF6"/>
    {/* Brush */}
    <rect x="6" y="4" width="6" height="20" rx="2" fill="#92400E" transform="rotate(-30 6 4)"/>
    <ellipse cx="3" cy="16" rx="4" ry="6" fill="#EC4899" transform="rotate(-30 3 16)"/>
    {/* Thumb hole */}
    <ellipse cx="18" cy="30" rx="4" ry="3" fill="#FEF3C7"/>
  </svg>
);

export const ConnectDotsIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#06B6D4"/>
    {/* Dots */}
    <circle cx="12" cy="12" r="4" fill="white"/>
    <circle cx="36" cy="12" r="4" fill="white"/>
    <circle cx="24" cy="24" r="4" fill="white"/>
    <circle cx="12" cy="36" r="4" fill="white"/>
    <circle cx="36" cy="36" r="4" fill="white"/>
    {/* Numbers */}
    <text x="12" y="14" fontSize="6" fill="#06B6D4" textAnchor="middle" fontWeight="bold">1</text>
    <text x="36" y="14" fontSize="6" fill="#06B6D4" textAnchor="middle" fontWeight="bold">2</text>
    <text x="24" y="26" fontSize="6" fill="#06B6D4" textAnchor="middle" fontWeight="bold">3</text>
    <text x="12" y="38" fontSize="6" fill="#06B6D4" textAnchor="middle" fontWeight="bold">4</text>
    <text x="36" y="38" fontSize="6" fill="#06B6D4" textAnchor="middle" fontWeight="bold">5</text>
    {/* Connected lines */}
    <path d="M12 12 L36 12 L24 24 L12 36" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2"/>
    {/* Pencil cursor */}
    <circle cx="30" cy="42" r="3" fill="#FDE047"/>
    <rect x="28" y="38" width="4" height="8" fill="#FDE047" transform="rotate(-45 30 42)"/>
  </svg>
);

export const MatchingIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Left cards */}
    <rect x="4" y="6" width="14" height="10" rx="2" fill="#EC4899"/>
    <rect x="4" y="20" width="14" height="10" rx="2" fill="#3B82F6"/>
    <rect x="4" y="34" width="14" height="10" rx="2" fill="#10B981"/>
    {/* Right cards */}
    <rect x="30" y="6" width="14" height="10" rx="2" fill="#10B981"/>
    <rect x="30" y="20" width="14" height="10" rx="2" fill="#EC4899"/>
    <rect x="30" y="34" width="14" height="10" rx="2" fill="#3B82F6"/>
    {/* Symbols */}
    <circle cx="11" cy="11" r="3" fill="white"/>
    <rect x="8" y="22" width="6" height="6" fill="white"/>
    <path d="M8 42 L11 36 L14 42 Z" fill="white"/>
    
    <path d="M33 14 L37 8 L40 14 Z" fill="white"/>
    <circle cx="37" cy="25" r="3" fill="white"/>
    <rect x="34" y="36" width="6" height="6" fill="white"/>
    
    {/* Match lines */}
    <path d="M18 11 Q24 11 30 39" stroke="#FDE047" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M18 25 Q24 25 30 11" stroke="#FDE047" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M18 39 Q24 39 30 25" stroke="#FDE047" strokeWidth="2" strokeDasharray="4 2"/>
  </svg>
);

// Panda Mascot
export const PandaMascot: React.FC<IconProps> = ({ size = 80, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    {/* Face */}
    <circle cx="40" cy="44" r="32" fill="white"/>
    <circle cx="40" cy="44" r="30" fill="#F5F5F5"/>
    
    {/* Ears */}
    <circle cx="14" cy="20" r="12" fill="#1F2937"/>
    <circle cx="66" cy="20" r="12" fill="#1F2937"/>
    <circle cx="14" cy="20" r="6" fill="#374151"/>
    <circle cx="66" cy="20" r="6" fill="#374151"/>
    
    {/* Eye patches */}
    <ellipse cx="26" cy="40" rx="12" ry="10" fill="#1F2937"/>
    <ellipse cx="54" cy="40" rx="12" ry="10" fill="#1F2937"/>
    
    {/* Eyes */}
    <ellipse cx="26" cy="40" rx="6" ry="7" fill="white"/>
    <ellipse cx="54" cy="40" rx="6" ry="7" fill="white"/>
    <circle cx="28" cy="40" r="3" fill="#1F2937"/>
    <circle cx="56" cy="40" r="3" fill="#1F2937"/>
    <circle cx="29" cy="39" r="1" fill="white"/>
    <circle cx="57" cy="39" r="1" fill="white"/>
    
    {/* Nose */}
    <ellipse cx="40" cy="52" rx="5" ry="4" fill="#1F2937"/>
    
    {/* Mouth */}
    <path d="M36 58 Q40 62 44 58" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none"/>
    
    {/* Blush */}
    <ellipse cx="18" cy="50" rx="5" ry="3" fill="#FECACA" opacity="0.6"/>
    <ellipse cx="62" cy="50" rx="5" ry="3" fill="#FECACA" opacity="0.6"/>
    
    {/* Shield badge */}
    <path d="M40 66 L48 70 L48 76 C48 80 40 84 40 84 C40 84 32 80 32 76 L32 70 Z" fill="#10B981"/>
    <path d="M40 70 L40 78 M36 74 L44 74" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Badge Icons
export const BadgeFirstSteps: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeGold)"/>
    <circle cx="24" cy="24" r="18" fill="#FEF3C7"/>
    <path d="M24 12 L26 20 L34 20 L28 26 L30 34 L24 30 L18 34 L20 26 L14 20 L22 20 Z" fill="#F59E0B"/>
    <defs>
      <linearGradient id="badgeGold" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeExplorer: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeBlue)"/>
    <circle cx="24" cy="24" r="18" fill="#DBEAFE"/>
    <circle cx="24" cy="24" r="12" fill="white" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M24 12 L26 24 L24 36 L22 24 Z" fill="#EF4444"/>
    <path d="M12 24 L24 22 L36 24 L24 26 Z" fill="#1E40AF"/>
    <circle cx="24" cy="24" r="3" fill="#1E40AF"/>
    <defs>
      <linearGradient id="badgeBlue" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#3B82F6"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeStreak: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeOrange)"/>
    <circle cx="24" cy="24" r="18" fill="#FEF3C7"/>
    <path d="M24 8 C24 8 32 18 32 26 C32 32 28 36 24 36 C20 36 16 32 16 26 C16 18 24 8 24 8 Z" fill="#F97316"/>
    <path d="M24 16 C24 16 28 22 28 26 C28 30 26 32 24 32 C22 32 20 30 20 26 C20 22 24 16 24 16 Z" fill="#FBBF24"/>
    <ellipse cx="24" cy="28" rx="3" ry="4" fill="#FDE047"/>
    <defs>
      <linearGradient id="badgeOrange" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#FB923C"/>
        <stop offset="100%" stopColor="#F97316"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeSpeedDemon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeYellow)"/>
    <circle cx="24" cy="24" r="18" fill="#FEF9C3"/>
    <path d="M28 10 L18 26 L24 26 L20 38 L34 20 L26 20 Z" fill="#EAB308"/>
    <path d="M26 14 L20 26 L24 26 L22 34 L30 22 L26 22 Z" fill="#FDE047"/>
    <defs>
      <linearGradient id="badgeYellow" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#EAB308"/>
      </linearGradient>
    </defs>
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="10" width="16" height="12" rx="2" fill="#6B7280"/>
    <path d="M8 10 L8 6 C8 3.79 9.79 2 12 2 C14.21 2 16 3.79 16 6 L16 10" stroke="#6B7280" strokeWidth="2.5" fill="none"/>
    <circle cx="12" cy="16" r="2" fill="#9CA3AF"/>
  </svg>
);

