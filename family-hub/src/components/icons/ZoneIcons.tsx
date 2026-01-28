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

// ========== NAVIGATION ICONS ==========

export const NavHomeIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <path d="M14 3L3 12V25H11V18H17V25H25V12L14 3Z" fill="url(#homeGradient)"/>
    <path d="M11 25V18H17V25" fill="#1E40AF"/>
    <rect x="12" y="19" width="4" height="2" fill="#60A5FA"/>
    <path d="M14 3L3 12H7L14 6L21 12H25L14 3Z" fill="#EF4444"/>
    <circle cx="14" cy="13" r="2" fill="#FDE047"/>
    <defs>
      <linearGradient id="homeGradient" x1="14" y1="3" x2="14" y2="25">
        <stop offset="0%" stopColor="#60A5FA"/>
        <stop offset="100%" stopColor="#3B82F6"/>
      </linearGradient>
    </defs>
  </svg>
);

export const NavAdventureIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    {/* Map background */}
    <rect x="2" y="4" width="24" height="20" rx="2" fill="#10B981"/>
    <rect x="4" y="6" width="20" height="16" rx="1" fill="#D1FAE5"/>
    {/* Map elements */}
    <path d="M6 10 Q10 8 12 12 Q14 16 18 14 Q22 12 24 16" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="8" cy="14" r="2" fill="#EF4444"/>
    <circle cx="20" cy="12" r="2" fill="#F59E0B"/>
    {/* X marks the spot */}
    <path d="M18 16 L22 20 M22 16 L18 20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
    {/* Compass */}
    <circle cx="10" cy="18" r="3" fill="white" stroke="#10B981" strokeWidth="1"/>
    <path d="M10 16 L10.5 18 L10 20 L9.5 18 Z" fill="#EF4444"/>
  </svg>
);

export const NavFamilyIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    {/* Adult 1 */}
    <circle cx="8" cy="8" r="4" fill="#8B5CF6"/>
    <ellipse cx="8" cy="18" rx="5" ry="6" fill="#8B5CF6"/>
    {/* Adult 2 */}
    <circle cx="20" cy="8" r="4" fill="#EC4899"/>
    <ellipse cx="20" cy="18" rx="5" ry="6" fill="#EC4899"/>
    {/* Child */}
    <circle cx="14" cy="12" r="3" fill="#F59E0B"/>
    <ellipse cx="14" cy="20" rx="4" ry="5" fill="#F59E0B"/>
    {/* Faces */}
    <circle cx="7" cy="7" r="0.5" fill="white"/>
    <circle cx="9" cy="7" r="0.5" fill="white"/>
    <circle cx="19" cy="7" r="0.5" fill="white"/>
    <circle cx="21" cy="7" r="0.5" fill="white"/>
    <circle cx="13" cy="11" r="0.5" fill="white"/>
    <circle cx="15" cy="11" r="0.5" fill="white"/>
    {/* Hearts */}
    <path d="M14 5 C13 4 12 4.5 12 5.5 C12 6.5 14 8 14 8 C14 8 16 6.5 16 5.5 C16 4.5 15 4 14 5Z" fill="#EF4444"/>
  </svg>
);

export const NavRewardsIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    {/* Trophy cup */}
    <path d="M8 6H20V14C20 18.4183 16.4183 22 12 22H16C16 22 14 24 14 24C14 24 12 22 12 22H12C7.58172 22 4 18.4183 4 14V6H8Z" fill="url(#trophyGradient)"/>
    {/* Trophy handles */}
    <path d="M4 8H2C2 8 2 12 4 12" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M24 8H26C26 8 26 12 24 12" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Trophy base */}
    <rect x="10" y="22" width="8" height="2" fill="#92400E"/>
    <rect x="8" y="24" width="12" height="2" rx="1" fill="#B45309"/>
    {/* Star on trophy */}
    <path d="M14 9L15 12H18L15.5 14L16.5 17L14 15L11.5 17L12.5 14L10 12H13L14 9Z" fill="white"/>
    {/* Sparkles */}
    <circle cx="6" cy="4" r="1" fill="#FDE047"/>
    <circle cx="22" cy="4" r="1" fill="#FDE047"/>
    <defs>
      <linearGradient id="trophyGradient" x1="14" y1="6" x2="14" y2="24">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const NavSettingsIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    {/* Gear outer */}
    <path d="M14 4L16 6L19 5L20 8L23 9L22 12L24 14L22 16L23 19L20 20L19 23L16 22L14 24L12 22L9 23L8 20L5 19L6 16L4 14L6 12L5 9L8 8L9 5L12 6L14 4Z" fill="url(#gearGradient)"/>
    {/* Inner circle */}
    <circle cx="14" cy="14" r="5" fill="#E5E7EB"/>
    <circle cx="14" cy="14" r="3" fill="#9CA3AF"/>
    {/* Gear teeth highlights */}
    <circle cx="14" cy="5" r="1" fill="#A78BFA"/>
    <circle cx="22" cy="10" r="1" fill="#A78BFA"/>
    <circle cx="22" cy="18" r="1" fill="#A78BFA"/>
    <circle cx="14" cy="23" r="1" fill="#A78BFA"/>
    <circle cx="6" cy="18" r="1" fill="#A78BFA"/>
    <circle cx="6" cy="10" r="1" fill="#A78BFA"/>
    <defs>
      <linearGradient id="gearGradient" x1="14" y1="4" x2="14" y2="24">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#8B5CF6"/>
      </linearGradient>
    </defs>
  </svg>
);

// ========== STATS ICONS ==========

export const FireIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C12 2 8 8 8 12C8 16 10 20 12 22C14 20 16 16 16 12C16 8 12 2 12 2Z" fill="url(#fireGradient)"/>
    <path d="M12 8C12 8 10 11 10 13C10 15 11 17 12 18C13 17 14 15 14 13C14 11 12 8 12 8Z" fill="#FDE047"/>
    <ellipse cx="12" cy="14" rx="1.5" ry="2" fill="#FEF9C3"/>
    <defs>
      <linearGradient id="fireGradient" x1="12" y1="2" x2="12" y2="22">
        <stop offset="0%" stopColor="#F97316"/>
        <stop offset="50%" stopColor="#EF4444"/>
        <stop offset="100%" stopColor="#DC2626"/>
      </linearGradient>
    </defs>
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" fill="url(#starGradient)"/>
    <path d="M12 6L13.5 10H17L14 12.5L15.5 17L12 14L8.5 17L10 12.5L7 10H10.5L12 6Z" fill="#FEF9C3"/>
    <defs>
      <linearGradient id="starGradient" x1="12" y1="2" x2="12" y2="21">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 4H17V10C17 13.3137 14.3137 16 11 16H13C13 16 12 18 12 18C12 18 11 16 11 16C7.68629 16 5 13.3137 5 10V4H7Z" fill="url(#trophySmall)"/>
    <path d="M5 6H3C3 6 3 9 5 9" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M19 6H21C21 6 21 9 19 9" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <rect x="9" y="16" width="6" height="2" fill="#92400E"/>
    <rect x="8" y="18" width="8" height="2" rx="1" fill="#B45309"/>
    <path d="M12 7L12.7 9H14L12.8 10L13.2 12L12 11L10.8 12L11.2 10L10 9H11.3L12 7Z" fill="white"/>
    <defs>
      <linearGradient id="trophySmall" x1="12" y1="4" x2="12" y2="18">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

// ========== QUICK ACTION ICONS ==========

export const MapIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="2" y="4" width="28" height="24" rx="3" fill="#10B981"/>
    <rect x="4" y="6" width="24" height="20" rx="2" fill="#D1FAE5"/>
    <path d="M6 12 Q12 8 16 14 Q20 20 26 16" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="10" cy="16" r="3" fill="#EF4444"/>
    <circle cx="10" cy="16" r="1.5" fill="#FEE2E2"/>
    <path d="M22 18 L26 22 M26 18 L22 22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="10" r="2" fill="#3B82F6"/>
  </svg>
);

export const FamilyIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="9" cy="8" r="5" fill="#3B82F6"/>
    <ellipse cx="9" cy="22" rx="6" ry="8" fill="#3B82F6"/>
    <circle cx="23" cy="8" r="5" fill="#EC4899"/>
    <ellipse cx="23" cy="22" rx="6" ry="8" fill="#EC4899"/>
    <circle cx="16" cy="14" r="4" fill="#F59E0B"/>
    <ellipse cx="16" cy="24" rx="5" ry="6" fill="#F59E0B"/>
    <path d="M16 4 C14 2 12 3 12 5 C12 7 16 10 16 10 C16 10 20 7 20 5 C20 3 18 2 16 4Z" fill="#EF4444"/>
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="2" y="2" width="28" height="28" rx="4" fill="#8B5CF6"/>
    <rect x="6" y="18" width="5" height="10" rx="1" fill="#C4B5FD"/>
    <rect x="13.5" y="12" width="5" height="16" rx="1" fill="#A78BFA"/>
    <rect x="21" y="6" width="5" height="22" rx="1" fill="#DDD6FE"/>
    <path d="M6 14 L11 10 L16 12 L26 4" stroke="#FDE047" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="6" cy="14" r="2" fill="#FDE047"/>
    <circle cx="11" cy="10" r="2" fill="#FDE047"/>
    <circle cx="16" cy="12" r="2" fill="#FDE047"/>
    <circle cx="26" cy="4" r="2" fill="#FDE047"/>
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" fill="#EF4444"/>
    <circle cx="16" cy="16" r="10" fill="white"/>
    <circle cx="16" cy="16" r="6" fill="#EF4444"/>
    <circle cx="16" cy="16" r="2" fill="white"/>
    {/* Arrow */}
    <path d="M24 8L16 16" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 8L20 8L24 12Z" fill="#1E40AF"/>
    <circle cx="16" cy="16" r="1" fill="#1E40AF"/>
  </svg>
);

// ========== CHALLENGE ICONS ==========

export const GamepadIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="4" fill="url(#gamepadGradient)"/>
    {/* D-pad */}
    <rect x="5" y="10" width="6" height="2" rx="0.5" fill="white"/>
    <rect x="7" y="8" width="2" height="6" rx="0.5" fill="white"/>
    {/* Buttons */}
    <circle cx="16" cy="10" r="1.5" fill="#EF4444"/>
    <circle cx="19" cy="12" r="1.5" fill="#3B82F6"/>
    <circle cx="16" cy="14" r="1.5" fill="#10B981"/>
    <circle cx="13" cy="12" r="1.5" fill="#F59E0B"/>
    <defs>
      <linearGradient id="gamepadGradient" x1="12" y1="6" x2="12" y2="18">
        <stop offset="0%" stopColor="#6366F1"/>
        <stop offset="100%" stopColor="#4F46E5"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="9" cy="12" rx="6" ry="8" fill="#EC4899"/>
    <ellipse cx="15" cy="12" rx="6" ry="8" fill="#F472B6"/>
    <path d="M9 6 Q12 4 15 6" stroke="#BE185D" strokeWidth="1.5" fill="none"/>
    <path d="M9 10 Q12 8 15 10" stroke="#BE185D" strokeWidth="1.5" fill="none"/>
    <path d="M9 14 Q12 12 15 14" stroke="#BE185D" strokeWidth="1.5" fill="none"/>
    <path d="M9 18 Q12 16 15 18" stroke="#BE185D" strokeWidth="1.5" fill="none"/>
    {/* Sparkle */}
    <circle cx="6" cy="6" r="1" fill="#FDE047"/>
    <circle cx="18" cy="6" r="1" fill="#FDE047"/>
  </svg>
);

export const HelpIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#10B981"/>
    <path d="M9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12V14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="17" r="1.5" fill="white"/>
    {/* Hearts around */}
    <path d="M4 6 C3 5 2 5.5 2 6.5 C2 7.5 4 9 4 9 C4 9 6 7.5 6 6.5 C6 5.5 5 5 4 6Z" fill="#EF4444"/>
    <path d="M20 6 C19 5 18 5.5 18 6.5 C18 7.5 20 9 20 9 C20 9 22 7.5 22 6.5 C22 5.5 21 5 20 6Z" fill="#EF4444"/>
  </svg>
);

// ========== REMAINING BADGE ICONS ==========

export const BadgeQuizMaster: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgePurple)"/>
    <circle cx="24" cy="24" r="18" fill="#F3E8FF"/>
    {/* Brain shape */}
    <ellipse cx="20" cy="24" rx="8" ry="10" fill="#A855F7"/>
    <ellipse cx="28" cy="24" rx="8" ry="10" fill="#C084FC"/>
    <path d="M20 16 Q24 14 28 16" stroke="#7C3AED" strokeWidth="2" fill="none"/>
    <path d="M20 24 Q24 22 28 24" stroke="#7C3AED" strokeWidth="2" fill="none"/>
    <path d="M20 32 Q24 30 28 32" stroke="#7C3AED" strokeWidth="2" fill="none"/>
    {/* Sparkles */}
    <circle cx="14" cy="14" r="2" fill="#FDE047"/>
    <circle cx="34" cy="14" r="2" fill="#FDE047"/>
    <defs>
      <linearGradient id="badgePurple" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#C084FC"/>
        <stop offset="100%" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgePrivacyPro: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeGreen)"/>
    <circle cx="24" cy="24" r="18" fill="#DCFCE7"/>
    {/* Shield */}
    <path d="M24 10L34 14V24C34 32 24 38 24 38C24 38 14 32 14 24V14L24 10Z" fill="#10B981"/>
    <path d="M24 14L30 16V24C30 28 24 32 24 32C24 32 18 28 18 24V16L24 14Z" fill="#34D399"/>
    {/* Checkmark */}
    <path d="M20 24L23 27L29 19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="badgeGreen" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#4ADE80"/>
        <stop offset="100%" stopColor="#22C55E"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgePerfectionist: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeDiamond)"/>
    <circle cx="24" cy="24" r="18" fill="#E0E7FF"/>
    {/* Diamond */}
    <path d="M24 8L36 20L24 40L12 20L24 8Z" fill="#6366F1"/>
    <path d="M24 8L30 20L24 40L18 20L24 8Z" fill="#818CF8"/>
    <path d="M12 20L24 8L36 20" fill="#A5B4FC"/>
    {/* Sparkles */}
    <path d="M24 16L25 19L28 20L25 21L24 24L23 21L20 20L23 19Z" fill="white"/>
    <defs>
      <linearGradient id="badgeDiamond" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#A5B4FC"/>
        <stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeLegend: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeLegendary)"/>
    <circle cx="24" cy="24" r="18" fill="#FEF3C7"/>
    {/* Crown */}
    <path d="M12 30L16 18L24 24L32 18L36 30L12 30Z" fill="#F59E0B"/>
    <path d="M14 30L17 20L24 25L31 20L34 30" fill="#FBBF24"/>
    {/* Jewels */}
    <circle cx="17" cy="26" r="2" fill="#EF4444"/>
    <circle cx="24" cy="24" r="2.5" fill="#3B82F6"/>
    <circle cx="31" cy="26" r="2" fill="#10B981"/>
    {/* Crown points */}
    <circle cx="16" cy="18" r="2" fill="#FDE047"/>
    <circle cx="24" cy="14" r="2.5" fill="#FDE047"/>
    <circle cx="32" cy="18" r="2" fill="#FDE047"/>
    <rect x="12" y="30" width="24" height="4" rx="1" fill="#D97706"/>
    <defs>
      <linearGradient id="badgeLegendary" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="50%" stopColor="#F59E0B"/>
        <stop offset="100%" stopColor="#D97706"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeHelper: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgePink)"/>
    <circle cx="24" cy="24" r="18" fill="#FCE7F3"/>
    {/* Two hands holding */}
    <path d="M14 28C14 28 18 24 24 24C30 24 34 28 34 28" stroke="#EC4899" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="14" cy="22" rx="4" ry="6" fill="#F9A8D4"/>
    <ellipse cx="34" cy="22" rx="4" ry="6" fill="#F9A8D4"/>
    {/* Heart in middle */}
    <path d="M24 18 C21 15 17 16 17 20 C17 24 24 30 24 30 C24 30 31 24 31 20 C31 16 27 15 24 18Z" fill="#EF4444"/>
    <defs>
      <linearGradient id="badgePink" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#F9A8D4"/>
        <stop offset="100%" stopColor="#EC4899"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeCollector: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeTeal)"/>
    <circle cx="24" cy="24" r="18" fill="#CCFBF1"/>
    {/* Book/Album */}
    <rect x="12" y="12" width="24" height="28" rx="2" fill="#0D9488"/>
    <rect x="14" y="14" width="20" height="24" rx="1" fill="#5EEAD4"/>
    {/* Badge slots */}
    <circle cx="20" cy="20" r="3" fill="#FDE047"/>
    <circle cx="28" cy="20" r="3" fill="#F472B6"/>
    <circle cx="20" cy="28" r="3" fill="#60A5FA"/>
    <circle cx="28" cy="28" r="3" fill="#34D399"/>
    <rect x="24" y="12" width="2" height="28" fill="#0F766E"/>
    <defs>
      <linearGradient id="badgeTeal" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#5EEAD4"/>
        <stop offset="100%" stopColor="#14B8A6"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeWeeklyWarrior: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeRed)"/>
    <circle cx="24" cy="24" r="18" fill="#FEE2E2"/>
    {/* Flexing arm */}
    <path d="M16 30C16 30 18 24 22 22C26 20 30 22 30 22" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="30" cy="18" rx="6" ry="8" fill="#EF4444"/>
    <ellipse cx="30" cy="18" rx="4" ry="6" fill="#FCA5A5"/>
    {/* 7 stars for 7 days */}
    <circle cx="14" cy="14" r="2" fill="#FDE047"/>
    <circle cx="20" cy="12" r="2" fill="#FDE047"/>
    <circle cx="26" cy="12" r="2" fill="#FDE047"/>
    <circle cx="32" cy="14" r="2" fill="#FDE047"/>
    <circle cx="14" cy="34" r="2" fill="#FDE047"/>
    <circle cx="24" cy="36" r="2" fill="#FDE047"/>
    <circle cx="34" cy="34" r="2" fill="#FDE047"/>
    <defs>
      <linearGradient id="badgeRed" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#FCA5A5"/>
        <stop offset="100%" stopColor="#EF4444"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BadgeChampion: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="url(#badgeChampion)"/>
    <circle cx="24" cy="24" r="18" fill="#FEF9C3"/>
    {/* Trophy */}
    <path d="M16 14H32V22C32 28 28 32 24 34C20 32 16 28 16 22V14Z" fill="#F59E0B"/>
    <path d="M18 16H30V22C30 26 27 30 24 32C21 30 18 26 18 22V16Z" fill="#FBBF24"/>
    {/* Handles */}
    <path d="M16 16H12C12 16 12 22 16 22" stroke="#D97706" strokeWidth="2" fill="none"/>
    <path d="M32 16H36C36 16 36 22 32 22" stroke="#D97706" strokeWidth="2" fill="none"/>
    {/* Star */}
    <path d="M24 18L25.5 22H29L26 24.5L27 28L24 26L21 28L22 24.5L19 22H22.5L24 18Z" fill="white"/>
    {/* Base */}
    <rect x="20" y="34" width="8" height="2" fill="#92400E"/>
    <rect x="18" y="36" width="12" height="3" rx="1" fill="#B45309"/>
    {/* Crown on top */}
    <path d="M21 14L22 10L24 13L26 10L27 14" fill="#FDE047"/>
    <defs>
      <linearGradient id="badgeChampion" x1="24" y1="0" x2="24" y2="48">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="30%" stopColor="#F59E0B"/>
        <stop offset="100%" stopColor="#D97706"/>
      </linearGradient>
    </defs>
  </svg>
);

// ========== DECORATIVE ICONS ==========

export const SparkleIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#FDE047"/>
    <circle cx="12" cy="10" r="2" fill="#FEF9C3"/>
    <path d="M6 4L7 6L9 5L8 7L10 8L8 9L9 11L7 10L6 12L5 10L3 11L4 9L2 8L4 7L3 5L5 6L6 4Z" fill="#FDE047" opacity="0.6"/>
    <path d="M18 4L19 6L21 5L20 7L22 8L20 9L21 11L19 10L18 12L17 10L15 11L16 9L14 8L16 7L15 5L17 6L18 4Z" fill="#FDE047" opacity="0.6"/>
  </svg>
);

export const StarDecorativeIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" fill="url(#starDecorative)"/>
    <path d="M12 6L13.5 10H17L14 12.5L15.5 17L12 14L8.5 17L10 12.5L7 10H10.5L12 6Z" fill="#FEF9C3"/>
    <defs>
      <linearGradient id="starDecorative" x1="12" y1="2" x2="12" y2="21">
        <stop offset="0%" stopColor="#FDE047"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const HeartRedIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4C12 4 8 8 8 12C8 16 12 20 12 20C12 20 16 16 16 12C16 8 12 4 12 4Z" fill="#EF4444"/>
    <path d="M12 8C12 8 10 10 10 12C10 14 12 16 12 16C12 16 14 14 14 12C14 10 12 8 12 8Z" fill="#FEE2E2"/>
    <circle cx="10" cy="11" r="1" fill="white" opacity="0.8"/>
    <circle cx="14" cy="11" r="1" fill="white" opacity="0.8"/>
  </svg>
);

export const HeartPurpleIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4C12 4 8 8 8 12C8 16 12 20 12 20C12 20 16 16 16 12C16 8 12 4 12 4Z" fill="#A855F7"/>
    <path d="M12 8C12 8 10 10 10 12C10 14 12 16 12 16C12 16 14 14 14 12C14 10 12 8 12 8Z" fill="#E9D5FF"/>
    <circle cx="10" cy="11" r="1" fill="white" opacity="0.8"/>
    <circle cx="14" cy="11" r="1" fill="white" opacity="0.8"/>
  </svg>
);

export const HeartBlueIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4C12 4 8 8 8 12C8 16 12 20 12 20C12 20 16 16 16 12C16 8 12 4 12 4Z" fill="#3B82F6"/>
    <path d="M12 8C12 8 10 10 10 12C10 14 12 16 12 16C12 16 14 14 14 12C14 10 12 8 12 8Z" fill="#DBEAFE"/>
    <circle cx="10" cy="11" r="1" fill="white" opacity="0.8"/>
    <circle cx="14" cy="11" r="1" fill="white" opacity="0.8"/>
  </svg>
);

export const CelebrationIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    {/* Confetti pieces */}
    <circle cx="8" cy="6" r="2" fill="#EF4444"/>
    <circle cx="24" cy="8" r="1.5" fill="#3B82F6"/>
    <circle cx="6" cy="20" r="1.5" fill="#10B981"/>
    <circle cx="26" cy="22" r="2" fill="#F59E0B"/>
    <circle cx="4" cy="12" r="1" fill="#EC4899"/>
    <circle cx="28" cy="14" r="1.5" fill="#8B5CF6"/>
    {/* Party popper */}
    <rect x="12" y="16" width="8" height="12" rx="1" fill="#F59E0B"/>
    <rect x="13" y="18" width="6" height="8" fill="#FBBF24"/>
    <path d="M16 12L18 16L16 20L14 16Z" fill="#EF4444"/>
    <path d="M14 10L16 12L18 10" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Streamers */}
    <path d="M10 8L12 12L10 16" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M22 10L24 14L22 18" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

// ========== FAMILY AVATAR ICONS ==========

export const AvatarParentIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="#8B5CF6"/>
    <circle cx="24" cy="18" r="8" fill="#FBBF24"/>
    <ellipse cx="24" cy="36" rx="12" ry="10" fill="#FBBF24"/>
    <circle cx="20" cy="16" r="1.5" fill="white"/>
    <circle cx="28" cy="16" r="1.5" fill="white"/>
    <path d="M20 20 Q24 22 28 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

export const AvatarChildIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="#F59E0B"/>
    <circle cx="24" cy="20" r="7" fill="#FBBF24"/>
    <ellipse cx="24" cy="38" rx="10" ry="8" fill="#FBBF24"/>
    <circle cx="20" cy="19" r="1.5" fill="white"/>
    <circle cx="28" cy="19" r="1.5" fill="white"/>
    <path d="M20 22 Q24 24 28 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

export const AvatarTeenIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="#3B82F6"/>
    <circle cx="24" cy="19" r="7.5" fill="#FBBF24"/>
    <ellipse cx="24" cy="37" rx="11" ry="9" fill="#FBBF24"/>
    <circle cx="20" cy="18" r="1.5" fill="white"/>
    <circle cx="28" cy="18" r="1.5" fill="white"/>
    <path d="M20 21 Q24 23 28 21" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

export const AvatarGuardianIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="22" fill="#10B981"/>
    <circle cx="24" cy="18" r="8" fill="#FBBF24"/>
    <ellipse cx="24" cy="36" rx="12" ry="10" fill="#FBBF24"/>
    <circle cx="20" cy="16" r="1.5" fill="white"/>
    <circle cx="28" cy="16" r="1.5" fill="white"/>
    <path d="M20 20 Q24 22 28 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Shield badge */}
    <path d="M24 12L28 14V18C28 20 24 22 24 22C24 22 20 20 20 18V14L24 12Z" fill="#10B981" stroke="#059669" strokeWidth="1"/>
  </svg>
);

// ========== UTILITY ICONS ==========

export const CertificateIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="6" width="32" height="36" rx="2" fill="#F59E0B"/>
    <rect x="10" y="8" width="28" height="32" rx="1" fill="#FEF3C7"/>
    {/* Ribbon */}
    <path d="M20 6L24 10L28 6V12H20V6Z" fill="#EF4444"/>
    <path d="M22 6L24 8L26 6" stroke="white" strokeWidth="1" fill="none"/>
    {/* Seal */}
    <circle cx="24" cy="20" r="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
    <path d="M24 14L26 18L30 19L27 22L28 26L24 24L20 26L21 22L18 19L22 18L24 14Z" fill="#FEF3C7"/>
    {/* Text lines */}
    <rect x="12" y="30" width="24" height="2" rx="1" fill="#F59E0B" opacity="0.3"/>
    <rect x="12" y="34" width="20" height="2" rx="1" fill="#F59E0B" opacity="0.3"/>
  </svg>
);

export const ExportIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="8" width="36" height="32" rx="2" fill="#3B82F6"/>
    <rect x="8" y="10" width="32" height="28" rx="1" fill="#DBEAFE"/>
    {/* Chart bars */}
    <rect x="12" y="24" width="6" height="10" rx="1" fill="#3B82F6"/>
    <rect x="20" y="18" width="6" height="16" rx="1" fill="#60A5FA"/>
    <rect x="28" y="22" width="6" height="12" rx="1" fill="#93C5FD"/>
    {/* Arrow */}
    <path d="M32 4L40 12L32 20M36 12H44" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M44 12H40V8" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

export const AdventureMapIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="2" y="4" width="28" height="24" rx="3" fill="#10B981"/>
    <rect x="4" y="6" width="24" height="20" rx="2" fill="#D1FAE5"/>
    {/* Map path */}
    <path d="M6 12 Q12 8 16 14 Q20 20 26 16" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* Markers */}
    <circle cx="8" cy="16" r="3" fill="#EF4444"/>
    <circle cx="8" cy="16" r="1.5" fill="#FEE2E2"/>
    <path d="M24 18 L28 22 M28 18 L24 22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
    {/* Compass */}
    <circle cx="24" cy="10" r="3" fill="white" stroke="#10B981" strokeWidth="1"/>
    <path d="M24 8L24.5 10L24 12L23.5 10Z" fill="#EF4444"/>
  </svg>
);

