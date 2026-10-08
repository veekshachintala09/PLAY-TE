import React, { useState, useEffect, useRef } from 'react';
import { PetId, PetMood } from '../../types';

interface LiveAnimatedPetProps {
  type: PetId;
  mood?: PetMood;
  action?: 'idle' | 'hop' | 'dance' | 'eat' | 'tilt' | 'sleep';
  accessory?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
  showThoughtBubble?: boolean;
  thoughtBubbleContent?: string;
}

export const LiveAnimatedPet: React.FC<LiveAnimatedPetProps> = ({
  type,
  mood = 'happy',
  action = 'idle',
  accessory,
  size = 'md',
  onClick,
  className = '',
  showThoughtBubble = false,
  thoughtBubbleContent,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isSleeping, setIsSleeping] = useState(false);
  const petContainerRef = useRef<HTMLDivElement | null>(null);

  // Blinking cycle
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3500 + Math.random() * 2500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Eye-tracking following cursor or touch
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (isSleeping || !petContainerRef.current) return;
      const rect = petContainerRef.current.getBoundingClientRect();
      const petCenterX = rect.left + rect.width / 2;
      const petCenterY = rect.top + rect.height / 2;

      const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX || 0;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0]?.clientY || 0;

      const deltaX = clientX - petCenterX;
      const deltaY = clientY - petCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(3, Math.hypot(deltaX, deltaY) / 60);

      setEyeOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isSleeping]);

  // Inactivity sleep detection (after 35 seconds of no activity)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      if (isSleeping) setIsSleeping(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsSleeping(true);
      }, 35000);
    };

    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [isSleeping]);

  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  }[size];

  // Colors per prompt specifications:
  // Dog = Hot Red (#FF3D5A) + Sunshine Yellow (#FFC93C)
  // Cat = Grape Purple (#6C2BD9) + Bubblegum Pink (#FF6FB5)
  // Robot = Leaf Green (#22C55E) + Lime Pop (#B8F23A)
  const getPetColors = () => {
    switch (type) {
      case 'cat':
        return {
          primary: '#6C2BD9', // Grape Purple
          secondary: '#FF6FB5', // Bubblegum Pink
          accent: '#FFC93C', // Sunshine Yellow
          border: '#2A1048', // Deep Plum
        };
      case 'robot':
        return {
          primary: '#22C55E', // Leaf Green
          secondary: '#B8F23A', // Lime Pop
          accent: '#FF3D5A', // Hot Red
          border: '#2A1048', // Deep Plum
        };
      case 'dog':
      default:
        return {
          primary: '#FF3D5A', // Hot Red
          secondary: '#FFC93C', // Sunshine Yellow
          accent: '#22C55E', // Leaf Green
          border: '#2A1048', // Deep Plum
        };
    }
  };

  const colors = getPetColors();

  // Animation class based on state
  const activeAnimation = isSleeping
    ? 'animate-pulse'
    : action === 'hop'
    ? 'animate-pet-hop'
    : action === 'dance'
    ? 'animate-pet-dance'
    : action === 'eat'
    ? 'animate-pet-chomp'
    : action === 'tilt'
    ? 'tilt-left-2'
    : 'animate-pet-breathe';

  return (
    <div
      ref={petContainerRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${sizeClasses} ${className}`}
    >
      {/* Floating Zzz when sleeping */}
      {isSleeping && (
        <div className="absolute -top-4 -right-1 text-sm font-black text-[#6C2BD9] animate-bounce pointer-events-none">
          Zzz...
        </div>
      )}

      {/* Thought bubble if hungry or requested */}
      {showThoughtBubble && (
        <div className="absolute -top-9 -left-4 bg-[#FFF4DC] border-[3px] border-[#2A1048] rounded-xl px-2 py-0.5 shadow-[3px_3px_0px_#2A1048] text-[10px] font-black text-[#2A1048] flex items-center gap-1 animate-bounce z-20 whitespace-nowrap">
          <span>{thoughtBubbleContent || '🍖 Food?'}</span>
        </div>
      )}

      {/* Crumbs particle effect when eating */}
      {action === 'eat' && (
        <div className="absolute bottom-2 flex gap-1 z-30 animate-ping">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC93C]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D5A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8F23A]" />
        </div>
      )}

      {/* Hearts when happy or dancing */}
      {action === 'dance' && (
        <div className="absolute -top-3 flex gap-2 text-xs animate-bounce z-30">
          <span>💖</span>
          <span>✨</span>
          <span>💖</span>
        </div>
      )}

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full filter drop-shadow-[0_4px_0_#2A1048] transition-transform duration-200 ${activeAnimation}`}
      >
        {/* ==================== DOG (HOT RED + SUNSHINE YELLOW) ==================== */}
        {type === 'dog' && (
          <g id="dog-character">
            {/* Wagging Tail */}
            <path
              d="M74 58 Q92 46 88 34"
              stroke={colors.primary}
              strokeWidth="7"
              strokeLinecap="round"
              className="animate-pet-wag"
            />
            <path
              d="M74 58 Q92 46 88 34"
              stroke={colors.border}
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
              style={{ zIndex: -1 }}
            />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="26" ry="22" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />
            <circle cx="50" cy="65" r="14" fill={colors.secondary} />

            {/* Floppy Ears */}
            <path
              d="M24 32 C12 38 12 56 22 58 C28 60 30 46 28 36 Z"
              fill={colors.secondary}
              stroke={colors.border}
              strokeWidth="3.5"
            />
            <path
              d="M76 32 C88 38 88 56 78 58 C72 60 70 46 72 36 Z"
              fill={colors.secondary}
              stroke={colors.border}
              strokeWidth="3.5"
            />

            {/* Head */}
            <circle cx="50" cy="40" r="23" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />
            {/* Snout */}
            <ellipse cx="50" cy="46" rx="12" ry="8" fill={colors.secondary} stroke={colors.border} strokeWidth="2.5" />
            {/* Nose */}
            <ellipse cx="50" cy="43" rx="4" ry="3" fill={colors.border} />

            {/* Eyes */}
            {!isSleeping && !isBlinking ? (
              <>
                {/* Left Eye */}
                <circle cx="41" cy="36" r="4.5" fill="#FFF4DC" stroke={colors.border} strokeWidth="2" />
                <circle cx={41 + eyeOffset.x} cy={36 + eyeOffset.y} r="2.2" fill={colors.border} />
                <circle cx={42 + eyeOffset.x} cy={35 + eyeOffset.y} r="0.8" fill="#FFF4DC" />

                {/* Right Eye */}
                <circle cx="59" cy="36" r="4.5" fill="#FFF4DC" stroke={colors.border} strokeWidth="2" />
                <circle cx={59 + eyeOffset.x} cy={36 + eyeOffset.y} r="2.2" fill={colors.border} />
                <circle cx={60 + eyeOffset.x} cy={35 + eyeOffset.y} r="0.8" fill="#FFF4DC" />
              </>
            ) : (
              <>
                {/* Sleeping / Blinking closed eyes */}
                <path d="M37 37 Q41 41 45 37" stroke={colors.border} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M55 37 Q59 41 63 37" stroke={colors.border} strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}

            {/* Mouth / Tongue */}
            {action === 'eat' ? (
              <circle cx="50" cy="50" r="3.5" fill="#FF3D5A" />
            ) : (
              <path d="M47 48 Q50 51 53 48" stroke={colors.border} strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Paws */}
            <ellipse cx="36" cy="80" rx="7" ry="5" fill={colors.secondary} stroke={colors.border} strokeWidth="3" />
            <ellipse cx="64" cy="80" rx="7" ry="5" fill={colors.secondary} stroke={colors.border} strokeWidth="3" />
          </g>
        )}

        {/* ==================== CAT (GRAPE PURPLE + BUBBLEGUM PINK) ==================== */}
        {type === 'cat' && (
          <g id="cat-character">
            {/* Swishing Tail */}
            <path
              d="M74 65 C88 65 92 48 88 38 C86 34 82 36 82 40 C84 46 80 58 70 59"
              fill={colors.secondary}
              stroke={colors.border}
              strokeWidth="3.5"
              className="animate-pet-wag"
            />

            {/* Body */}
            <ellipse cx="50" cy="64" rx="24" ry="21" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />
            <ellipse cx="50" cy="66" rx="13" ry="14" fill={colors.secondary} />

            {/* Pointy Ears */}
            <polygon points="28,34 36,12 46,26" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />
            <polygon points="32,30 36,18 42,26" fill={colors.secondary} />

            <polygon points="72,34 64,12 54,26" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />
            <polygon points="68,30 64,18 58,26" fill={colors.secondary} />

            {/* Head */}
            <circle cx="50" cy="40" r="23" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />

            {/* Cheeks */}
            <ellipse cx="36" cy="45" rx="3" ry="1.8" fill={colors.secondary} />
            <ellipse cx="64" cy="45" rx="3" ry="1.8" fill={colors.secondary} />

            {/* Whiskers */}
            <line x1="24" y1="42" x2="36" y2="44" stroke={colors.border} strokeWidth="2" />
            <line x1="24" y1="48" x2="36" y2="47" stroke={colors.border} strokeWidth="2" />
            <line x1="76" y1="42" x2="64" y2="44" stroke={colors.border} strokeWidth="2" />
            <line x1="76" y1="48" x2="64" y2="47" stroke={colors.border} strokeWidth="2" />

            {/* Eyes */}
            {!isSleeping && !isBlinking ? (
              <>
                <ellipse cx="40" cy="37" rx="4.5" ry="5" fill={colors.accent} stroke={colors.border} strokeWidth="2" />
                <ellipse cx={40 + eyeOffset.x} cy={37 + eyeOffset.y} rx="2" ry="4" fill={colors.border} />
                <circle cx={41 + eyeOffset.x} cy={35 + eyeOffset.y} r="1" fill="#FFF4DC" />

                <ellipse cx="60" cy="37" rx="4.5" ry="5" fill={colors.accent} stroke={colors.border} strokeWidth="2" />
                <ellipse cx={60 + eyeOffset.x} cy={37 + eyeOffset.y} rx="2" ry="4" fill={colors.border} />
                <circle cx={61 + eyeOffset.x} cy={35 + eyeOffset.y} r="1" fill="#FFF4DC" />
              </>
            ) : (
              <>
                <path d="M36 38 Q40 42 44 38" stroke={colors.border} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M56 38 Q60 42 64 38" stroke={colors.border} strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}

            {/* Tiny Pink Nose & Mouth */}
            <polygon points="50,44 47,42 53,42" fill={colors.secondary} stroke={colors.border} strokeWidth="1" />
            <path d="M47 46 Q50 49 53 46" stroke={colors.border} strokeWidth="2" strokeLinecap="round" />

            {/* Paws */}
            <circle cx="38" cy="81" r="6" fill={colors.secondary} stroke={colors.border} strokeWidth="3" />
            <circle cx="62" cy="81" r="6" fill={colors.secondary} stroke={colors.border} strokeWidth="3" />
          </g>
        )}

        {/* ==================== ROBOT (LEAF GREEN + LIME POP) ==================== */}
        {type === 'robot' && (
          <g id="robot-character">
            {/* Wiggling Antenna */}
            <line x1="50" y1="22" x2="50" y2="10" stroke={colors.border} strokeWidth="4" />
            <circle cx="50" cy="8" r="5" fill={colors.accent} stroke={colors.border} strokeWidth="3" className="animate-pulse" />

            {/* Head Box */}
            <rect x="27" y="20" width="46" height="36" rx="10" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />
            {/* Visor Screen */}
            <rect x="33" y="27" width="34" height="22" rx="6" fill={colors.secondary} stroke={colors.border} strokeWidth="2.5" />

            {/* Ear Bolts */}
            <rect x="22" y="32" width="6" height="12" rx="2" fill={colors.secondary} stroke={colors.border} strokeWidth="2.5" />
            <rect x="72" y="32" width="6" height="12" rx="2" fill={colors.secondary} stroke={colors.border} strokeWidth="2.5" />

            {/* Visor Eyes (Digital LEDs) */}
            {!isSleeping && !isBlinking ? (
              <>
                <circle cx={42 + eyeOffset.x} cy={38 + eyeOffset.y} r="3.5" fill={colors.border} />
                <circle cx={43 + eyeOffset.x} cy={37 + eyeOffset.y} r="1" fill="#FFF4DC" />
                <circle cx={58 + eyeOffset.x} cy={38 + eyeOffset.y} r="3.5" fill={colors.border} />
                <circle cx={59 + eyeOffset.x} cy={37 + eyeOffset.y} r="1" fill="#FFF4DC" />
              </>
            ) : (
              <>
                <line x1="39" y1="38" x2="45" y2="38" stroke={colors.border} strokeWidth="3" strokeLinecap="round" />
                <line x1="55" y1="38" x2="61" y2="38" stroke={colors.border} strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {/* Robot Smile (Equalizer wave) */}
            <path d="M43 44 H57" stroke={colors.border} strokeWidth="2.5" strokeLinecap="round" />

            {/* Body */}
            <rect x="30" y="58" width="40" height="26" rx="8" fill={colors.primary} stroke={colors.border} strokeWidth="3.5" />
            {/* Chest Gauge / Dial */}
            <circle cx="50" cy="70" r="7" fill={colors.secondary} stroke={colors.border} strokeWidth="2" />
            <line x1="50" y1="70" x2="54" y2="67" stroke={colors.accent} strokeWidth="2" />

            {/* Treads / Feet */}
            <rect x="28" y="83" width="18" height="7" rx="3.5" fill={colors.secondary} stroke={colors.border} strokeWidth="2.5" />
            <rect x="54" y="83" width="18" height="7" rx="3.5" fill={colors.secondary} stroke={colors.border} strokeWidth="2.5" />
          </g>
        )}

        {/* EQUIPPED ACCESSORIES (Animated With Pet) */}
        {accessory === 'acc-party-hat' && (
          <g id="pet-party-hat">
            <polygon points="50,2 40,24 60,24" fill="#FFC93C" stroke="#2A1048" strokeWidth="3" />
            <circle cx="50" cy="2" r="3" fill="#FF3D5A" stroke="#2A1048" strokeWidth="1.5" />
            <line x1="42" y1="18" x2="58" y2="18" stroke="#6C2BD9" strokeWidth="2" />
          </g>
        )}

        {accessory === 'acc-crown' && (
          <g id="pet-crown">
            <polygon points="34,16 42,22 50,12 58,22 66,16 64,24 36,24" fill="#FFC93C" stroke="#2A1048" strokeWidth="3" />
            <circle cx="34" cy="16" r="2" fill="#FF3D5A" />
            <circle cx="50" cy="12" r="2" fill="#6C2BD9" />
            <circle cx="66" cy="16" r="2" fill="#22C55E" />
          </g>
        )}

        {accessory === 'acc-glasses' && (
          <g id="pet-glasses">
            <circle cx="41" cy="37" r="6.5" fill="none" stroke="#2A1048" strokeWidth="3" />
            <circle cx="59" cy="37" r="6.5" fill="none" stroke="#2A1048" strokeWidth="3" />
            <line x1="47.5" y1="37" x2="52.5" y2="37" stroke="#2A1048" strokeWidth="3" />
          </g>
        )}

        {accessory === 'acc-cape' && (
          <path
            d="M26 62 Q16 86 10 98 Q50 94 86 98 Q80 86 74 62"
            fill="#FF3D5A"
            stroke="#2A1048"
            strokeWidth="3"
            style={{ zIndex: -2 }}
          />
        )}
      </svg>
    </div>
  );
};
