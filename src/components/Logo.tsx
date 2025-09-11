import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="logo-icon">
      <svg className="panda-logo" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Shield background */}
        <path 
          d="M200 50 L350 120 L350 280 Q350 320 320 340 L200 380 L80 340 Q50 320 50 280 L50 120 Z" 
          fill="var(--logo-bg)" 
          stroke="var(--logo-stroke)" 
          strokeWidth="4"
        />
        
        {/* Inner shield */}
        <path 
          d="M200 80 L320 130 L320 260 Q320 290 300 305 L200 340 L100 305 Q80 290 80 260 L80 130 Z" 
          fill="var(--logo-primary)"
        />
        
        {/* Parent panda */}
        <circle cx="200" cy="150" r="35" fill="white"/>
        <circle cx="185" cy="120" r="15" fill="var(--logo-dark)"/>
        <circle cx="215" cy="120" r="15" fill="var(--logo-dark)"/>
        <ellipse cx="190" cy="145" rx="8" ry="12" fill="var(--logo-dark)"/>
        <ellipse cx="210" cy="145" rx="8" ry="12" fill="var(--logo-dark)"/>
        <circle cx="193" cy="148" r="2" fill="white"/>
        <circle cx="207" cy="148" r="2" fill="white"/>
        <ellipse cx="200" cy="160" rx="5" ry="3" fill="var(--logo-dark)"/>
        <path d="M195 168 Q200 172 205 168" stroke="var(--logo-dark)" strokeWidth="2" fill="none"/>
        
        {/* Child pandas */}
        <circle cx="150" cy="220" r="25" fill="white"/>
        <circle cx="140" cy="200" r="10" fill="var(--logo-dark)"/>
        <circle cx="160" cy="200" r="10" fill="var(--logo-dark)"/>
        <ellipse cx="145" cy="215" rx="6" ry="8" fill="var(--logo-dark)"/>
        <ellipse cx="155" cy="215" rx="6" ry="8" fill="var(--logo-dark)"/>
        <circle cx="147" cy="217" r="1.5" fill="white"/>
        <circle cx="153" cy="217" r="1.5" fill="white"/>
        <ellipse cx="150" cy="225" rx="3" ry="2" fill="var(--logo-dark)"/>
        <path d="M147 230 Q150 233 153 230" stroke="var(--logo-dark)" strokeWidth="1.5" fill="none"/>
        
        <circle cx="250" cy="220" r="25" fill="white"/>
        <circle cx="240" cy="200" r="10" fill="var(--logo-dark)"/>
        <circle cx="260" cy="200" r="10" fill="var(--logo-dark)"/>
        <ellipse cx="245" cy="215" rx="6" ry="8" fill="var(--logo-dark)"/>
        <ellipse cx="255" cy="215" rx="6" ry="8" fill="var(--logo-dark)"/>
        <circle cx="247" cy="217" r="1.5" fill="white"/>
        <circle cx="253" cy="217" r="1.5" fill="white"/>
        <ellipse cx="250" cy="225" rx="3" ry="2" fill="var(--logo-dark)"/>
        <path d="M247 230 Q250 233 253 230" stroke="var(--logo-dark)" strokeWidth="1.5" fill="none"/>
        
        {/* Keyhole */}
        <circle cx="200" cy="280" r="15" fill="var(--logo-dark)"/>
        <rect x="190" y="280" width="20" height="25" fill="var(--logo-dark)"/>
        <circle cx="200" cy="285" r="4" fill="var(--logo-bg)"/>
      </svg>
    </div>
  );
};

export default Logo;