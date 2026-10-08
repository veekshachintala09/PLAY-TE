import React, { useState } from 'react';
import logoAsset from '../../assets/logo.jpeg';

export interface AppLogoProps {
  /** Size in pixels, or standard size token */
  size?: number | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'header';
  /** Extra wrapper classes */
  className?: string;
  /** Whether to show living animated effects (star twinkle & sun glow pulse) */
  withEffects?: boolean;
  /** Whether to apply idle floating bounce */
  animated?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Alt text for accessibility */
  alt?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  className = '',
  withEffects = false,
  animated = false,
  onClick,
  alt = 'Play Tales official logo',
}) => {
  const [imgError, setImgError] = useState(false);

  // Compute sizing classes and dimensions
  let sizeClass = 'w-12 h-12';
  let inlineStyle: React.CSSProperties | undefined = undefined;

  if (typeof size === 'number') {
    inlineStyle = { width: `${size}px`, height: `${size}px` };
    sizeClass = '';
  } else {
    switch (size) {
      case 'sm':
        sizeClass = 'w-8 h-8';
        break;
      case 'header':
        // Circle ~48px on mobile, 56px on desktop
        sizeClass = 'w-12 h-12 md:w-14 md:h-14';
        break;
      case 'md':
        sizeClass = 'w-12 h-12';
        break;
      case 'lg':
        sizeClass = 'w-16 h-16';
        break;
      case 'xl':
        sizeClass = 'w-24 h-24 md:w-28 md:h-28';
        break;
      case 'hero':
        // 160px to 220px on welcome screen
        sizeClass = 'w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52';
        break;
      default:
        sizeClass = 'w-12 h-12';
    }
  }

  // Fallback Inline SVG: purple circle with castle silhouette, sun, path, star
  const renderFallbackSvg = () => (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt}
    >
      <defs>
        <radialGradient id="fallbackSky" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#2A1048" />
        </radialGradient>
        <radialGradient id="fallbackSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFDE59" />
          <stop offset="70%" stopColor="#FF9F1C" />
          <stop offset="100%" stopColor="#FF6B35" />
        </radialGradient>
        <clipPath id="circleClip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      <g clipPath="url(#circleClip)">
        {/* Night Sky */}
        <rect x="0" y="0" width="100" height="100" fill="url(#fallbackSky)" />

        {/* Glowing Sun */}
        <circle cx="42" cy="54" r="16" fill="url(#fallbackSun)" />
        <circle cx="42" cy="54" r="19" fill="#FFDE59" opacity="0.3" />

        {/* Distant Purple Hills */}
        <path d="M-10 75 Q 30 50, 70 68 T 110 65 L 110 110 L -10 110 Z" fill="#4C1D95" />
        <path d="M-10 82 Q 40 68, 80 82 L 110 110 L -10 110 Z" fill="#3B0764" />

        {/* Castle Silhouette on Hill */}
        <g fill="#2A1048">
          {/* Main keep */}
          <rect x="62" y="44" width="18" height="24" rx="1" />
          {/* Battlements */}
          <rect x="62" y="40" width="4" height="4" />
          <rect x="69" y="40" width="4" height="4" />
          <rect x="76" y="40" width="4" height="4" />
          {/* Main Tower Spire */}
          <polygon points="71,28 65,40 77,40" fill="#2A1048" />
          {/* Side Tower */}
          <rect x="56" y="48" width="6" height="18" />
          <polygon points="59,38 55,48 63,48" fill="#2A1048" />
          {/* Flag fluttering on top */}
          <line x1="71" y1="28" x2="71" y2="22" stroke="#FFC93C" strokeWidth="1.2" />
          <polygon points="71,22 79,25 71,28" fill="#FFC93C" />
          {/* Castle window lights */}
          <circle cx="71" cy="48" r="1.5" fill="#FFDE59" />
          <rect x="69" y="56" width="4" height="7" rx="2" fill="#1B0830" />
        </g>

        {/* Winding Yellow/Gold Path */}
        <path
          d="M 68 67 C 62 72, 52 75, 56 82 C 60 88, 38 92, 32 102 L 48 102 C 54 94, 70 87, 66 80 C 62 74, 72 70, 72 67 Z"
          fill="#FFC93C"
          stroke="#D97706"
          strokeWidth="0.8"
        />

        {/* Sparkle Star in Sky */}
        <g transform="translate(32, 28) scale(0.9)">
          <path
            d="M 0 -8 Q 0 0, 8 0 Q 0 0, 0 8 Q 0 0, -8 0 Q 0 0, 0 -8 Z"
            fill="#FFFFFF"
          />
          <circle cx="0" cy="0" r="2" fill="#FFDE59" />
        </g>
      </g>

      {/* Outer Dark Plum Ring */}
      <circle
        cx="50"
        cy="50"
        r="47.5"
        fill="none"
        stroke="#2A1048"
        strokeWidth="3.5"
      />
    </svg>
  );

  return (
    <div
      onClick={onClick}
      style={inlineStyle}
      className={`relative inline-block select-none shrink-0 ${sizeClass} ${
        onClick ? 'cursor-pointer' : ''
      } ${animated ? 'animate-logo-float' : ''} ${className}`}
    >
      {/* Background backing ring for contrast and pop */}
      <div className="w-full h-full rounded-full bg-[#FFF4DC] p-[2px] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img
            src={logoAsset}
            alt={alt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-full block"
            style={{
              imageRendering: 'auto',
            }}
          />
        ) : (
          renderFallbackSvg()
        )}
      </div>

      {/* Living animated effects overlay: soft sun glow pulse and twinkling star */}
      {withEffects && (
        <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
          {/* Sun glowing pulse */}
          <div
            className="absolute rounded-full bg-[#FFDE59]/35 blur-md animate-sun-pulse"
            style={{
              top: '40%',
              left: '32%',
              width: '38%',
              height: '38%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Star twinkle overlay */}
          <div
            className="absolute animate-star-twinkle"
            style={{
              top: '28%',
              left: '35%',
              width: '16%',
              height: '16%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_4px_#FFF]">
              <path
                d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
