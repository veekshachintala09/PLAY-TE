import React from 'react';
import { CharacterConfig } from '../../types';

interface CharacterAvatarProps {
  config: CharacterConfig;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  pose?: 'idle' | 'waving' | 'thinking' | 'cheering' | 'running' | 'jumping' | 'sliding' | 'celebrate';
  action?: 'idle' | 'waving' | 'thinking' | 'cheering' | 'running' | 'jumping' | 'sliding' | 'celebrate' | string;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  config,
  size = 'md',
  pose = 'idle',
  action,
  className = '',
}) => {
  const effectivePose = (action as any) || pose || 'idle';
  const sizeMap = {
    xs: 'w-10 h-10',
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  const {
    skinTone = '#FCD34D',
    hairStyle = 'short-spike',
    hairColor = '#451A03',
    eyeStyle = 'cheerful',
    outfitStyle = 'casual-tee',
    outfitColor = '#6C2BD9', // Grape Purple default
    accessory = 'none',
  } = config;

  // Pose animations
  const poseAnimation =
    effectivePose === 'running'
      ? 'animate-bounce'
      : effectivePose === 'cheering' || effectivePose === 'celebrate'
      ? 'animate-pet-hop'
      : effectivePose === 'waving'
      ? 'tilt-right'
      : 'animate-pet-breathe';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full filter drop-shadow-[0_4px_0_#2A1048] transition-transform duration-200 ${poseAnimation}`}
      >
        {/* ACCESSORY: CAPE (Back Layer) */}
        {accessory === 'cape' && (
          <path
            d={
              pose === 'running'
                ? 'M24 64 Q12 90 6 102 Q48 98 88 102 Q84 90 76 64'
                : 'M26 65 Q18 95 12 110 Q50 105 88 110 Q82 95 74 65 Z'
            }
            fill="#FF3D5A" // Hot Red
            stroke="#2A1048" // Deep Plum Outline
            strokeWidth="3.5"
          />
        )}

        {/* LEGS / SNEAKERS */}
        <g id="hero-legs">
          {pose === 'running' ? (
            <>
              {/* Running legs */}
              <rect x="28" y="94" width="12" height="18" rx="5" fill="#2A1048" />
              <rect x="56" y="90" width="12" height="20" rx="5" fill="#2A1048" />
              {/* Red Sneakers */}
              <path d="M22 112 H38 C40 116 38 118 32 118 H22 Z" fill="#FF3D5A" stroke="#2A1048" strokeWidth="2.5" />
              <path d="M54 108 H70 C72 112 70 114 64 114 H54 Z" fill="#FF3D5A" stroke="#2A1048" strokeWidth="2.5" />
            </>
          ) : (
            <>
              {/* Standing legs */}
              <rect x="33" y="96" width="13" height="16" rx="4" fill="#2A1048" />
              <rect x="53" y="96" width="13" height="16" rx="4" fill="#2A1048" />
              {/* Red Sneakers */}
              <path d="M28 112 H44 C46 116 44 118 38 118 H28 Z" fill="#FF3D5A" stroke="#2A1048" strokeWidth="2.5" />
              <path d="M53 112 H69 C71 116 69 118 63 118 H53 Z" fill="#FF3D5A" stroke="#2A1048" strokeWidth="2.5" />
            </>
          )}
        </g>

        {/* BODY / OUTFIT */}
        <g id="hero-body">
          {/* Torso */}
          <path
            d="M26 60 C26 52, 74 52, 74 60 L78 98 C78 104, 22 104, 22 98 Z"
            fill={outfitColor}
            stroke="#2A1048"
            strokeWidth="3.5"
          />

          {/* Outfit details */}
          {outfitStyle === 'hoodie' && (
            <>
              <path d="M38 58 Q50 78 62 58" stroke="#FFF4DC" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="78" r="4" fill="#B8F23A" />
            </>
          )}

          {outfitStyle === 'wizard-robe' && (
            <>
              <line x1="50" y1="60" x2="50" y2="100" stroke="#FFC93C" strokeWidth="3" strokeDasharray="3 3" />
              <circle cx="50" cy="72" r="3" fill="#FFC93C" />
              <circle cx="50" cy="86" r="3" fill="#FFC93C" />
            </>
          )}

          {outfitStyle === 'space-suit' && (
            <>
              <circle cx="50" cy="75" r="7" fill="#B8F23A" stroke="#2A1048" strokeWidth="2" />
              <line x1="32" y1="84" x2="68" y2="84" stroke="#FFF4DC" strokeWidth="2" />
            </>
          )}

          {outfitStyle === 'explorer-vest' && (
            <>
              <rect x="28" y="68" width="12" height="14" rx="3" fill="#FFC93C" stroke="#2A1048" strokeWidth="2" />
              <rect x="60" y="68" width="12" height="14" rx="3" fill="#FFC93C" stroke="#2A1048" strokeWidth="2" />
            </>
          )}

          {/* Arms / Pose Variations */}
          {pose === 'waving' ? (
            <>
              {/* Left hand relaxed */}
              <path d="M26 62 C20 72 16 82 20 90" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="20" cy="91" r="5.5" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
              {/* Right hand waving high */}
              <path d="M74 62 C82 50 88 38 84 28" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="84" cy="27" r="6" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
            </>
          ) : pose === 'thinking' ? (
            <>
              <path d="M26 62 C20 72 18 84 22 92" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="22" cy="92" r="5.5" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
              {/* Right hand to chin */}
              <path d="M74 62 C78 72 74 64 64 52" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="62" cy="50" r="5.5" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
            </>
          ) : pose === 'cheering' ? (
            <>
              {/* Both hands up in victory! */}
              <path d="M26 62 C16 48 14 36 20 26" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="20" cy="25" r="6" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
              <path d="M74 62 C84 48 86 36 80 26" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="80" cy="25" r="6" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
            </>
          ) : (
            <>
              {/* Standard idle arms */}
              <path d="M26 62 C20 72 16 82 20 90" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="19" cy="91" r="5.5" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
              <path d="M74 62 C80 72 84 82 80 90" stroke={outfitColor} strokeWidth="8" strokeLinecap="round" />
              <circle cx="81" cy="91" r="5.5" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
            </>
          )}
        </g>

        {/* NECK */}
        <rect x="43" y="46" width="14" height="12" rx="3" fill={skinTone} stroke="#2A1048" strokeWidth="3" />

        {/* HEAD */}
        <circle cx="50" cy="35" r="23" fill={skinTone} stroke="#2A1048" strokeWidth="3.5" />

        {/* EARS */}
        <circle cx="27" cy="35" r="4.5" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />
        <circle cx="73" cy="35" r="4.5" fill={skinTone} stroke="#2A1048" strokeWidth="2.5" />

        {/* FACE EXPRESSION & EYES */}
        <g id="hero-face">
          {eyeStyle === 'cheerful' && (
            <>
              <ellipse cx="42" cy="33" rx="3.5" ry="4.5" fill="#2A1048" />
              <circle cx="43" cy="31.5" r="1.5" fill="#FFF4DC" />
              <ellipse cx="58" cy="33" rx="3.5" ry="4.5" fill="#2A1048" />
              <circle cx="59" cy="31.5" r="1.5" fill="#FFF4DC" />
              {/* Cheerful big smile */}
              <path d="M43 42 Q50 49 57 42" stroke="#2A1048" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Rosy cheeks */}
              <ellipse cx="36" cy="38" rx="3" ry="1.8" fill="#FF6FB5" opacity="0.6" />
              <ellipse cx="64" cy="38" rx="3" ry="1.8" fill="#FF6FB5" opacity="0.6" />
            </>
          )}

          {eyeStyle === 'focused' && (
            <>
              <line x1="38" y1="30" x2="46" y2="32" stroke="#2A1048" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="62" y1="30" x2="54" y2="32" stroke="#2A1048" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="42" cy="35" r="3" fill="#2A1048" />
              <circle cx="58" cy="35" r="3" fill="#2A1048" />
              <path d="M45 43 H55" stroke="#2A1048" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {eyeStyle === 'star' && (
            <>
              <text x="36" y="38" fontSize="11" fill="#FFC93C" fontWeight="bold">★</text>
              <text x="53" y="38" fontSize="11" fill="#FFC93C" fontWeight="bold">★</text>
              <path d="M42 43 Q50 51 58 43" stroke="#2A1048" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          )}

          {eyeStyle === 'glasses' && (
            <>
              <circle cx="41" cy="33" r="3" fill="#2A1048" />
              <circle cx="59" cy="33" r="3" fill="#2A1048" />
              {/* Thick chunky spectacles */}
              <rect x="34" y="27" width="14" height="12" rx="3.5" fill="none" stroke="#2A1048" strokeWidth="3" />
              <rect x="52" y="27" width="14" height="12" rx="3.5" fill="none" stroke="#2A1048" strokeWidth="3" />
              <line x1="48" y1="33" x2="52" y2="33" stroke="#2A1048" strokeWidth="3" />
              <path d="M44 43 Q50 48 56 43" stroke="#2A1048" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}
        </g>

        {/* HAIRSTYLE WITH THICK PLUM OUTLINE */}
        <g id="hero-hair">
          {hairStyle === 'short-spike' && (
            <path
              d="M26 26 C28 12, 42 8, 50 9 C58 8, 72 12, 74 26 C74 32, 70 28, 66 22 C60 18, 40 18, 34 22 C30 28, 26 32, 26 26 Z"
              fill={hairColor}
              stroke="#2A1048"
              strokeWidth="3.5"
            />
          )}

          {hairStyle === 'curly-afro' && (
            <path
              d="M22 34 C18 18, 34 6, 50 6 C66 6, 82 18, 78 34 C82 44, 74 50, 71 42 C68 26, 32 26, 29 42 C26 50, 18 44, 22 34 Z"
              fill={hairColor}
              stroke="#2A1048"
              strokeWidth="3.5"
            />
          )}

          {hairStyle === 'bob-cut' && (
            <path
              d="M24 36 C22 14, 44 10, 50 10 C56 10, 78 14, 76 36 C76 48, 72 54, 70 46 C68 22, 32 22, 30 46 C28 54, 24 48, 24 36 Z"
              fill={hairColor}
              stroke="#2A1048"
              strokeWidth="3.5"
            />
          )}

          {hairStyle === 'wavy-long' && (
            <path
              d="M23 36 C22 14, 44 10, 50 10 C56 10, 78 14, 77 36 C77 60, 70 72, 68 62 C66 22, 34 22, 32 62 C30 72, 23 60, 23 36 Z"
              fill={hairColor}
              stroke="#2A1048"
              strokeWidth="3.5"
            />
          )}

          {hairStyle === 'cap' && (
            <g>
              <path d="M26 28 C27 14, 42 10, 50 10 C58 10, 73 14, 74 28 Z" fill="#FF3D5A" stroke="#2A1048" strokeWidth="3.5" />
              <path d="M24 28 Q50 32 78 26" stroke="#2A1048" strokeWidth="5" strokeLinecap="round" />
            </g>
          )}

          {hairStyle === 'ponytail' && (
            <g>
              <path
                d="M26 26 C28 12, 42 8, 50 9 C58 8, 72 12, 74 26 C74 32, 70 28, 66 22 C60 18, 40 18, 34 22 C30 28, 26 32, 26 26 Z"
                fill={hairColor}
                stroke="#2A1048"
                strokeWidth="3.5"
              />
              <path d="M70 20 C82 16, 88 26, 86 40 C80 44, 76 34, 72 26 Z" fill={hairColor} stroke="#2A1048" strokeWidth="3" />
              <circle cx="70" cy="22" r="3.5" fill="#FF6FB5" />
            </g>
          )}
        </g>

        {/* ACCESSORY (Front Layer) */}
        {accessory === 'headphones' && (
          <g id="acc-headphones">
            <path d="M24 34 C24 12, 76 12, 76 34" stroke="#B8F23A" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M24 34 C24 12, 76 12, 76 34" stroke="#2A1048" strokeWidth="7" strokeLinecap="round" fill="none" style={{ zIndex: -1 }} />
            <rect x="20" y="28" width="8" height="15" rx="3.5" fill="#6C2BD9" stroke="#2A1048" strokeWidth="3" />
            <rect x="72" y="28" width="8" height="15" rx="3.5" fill="#6C2BD9" stroke="#2A1048" strokeWidth="3" />
          </g>
        )}

        {accessory === 'wizard-hat' && (
          <g id="acc-wizard-hat">
            <polygon points="50,2 30,24 70,24" fill="#6C2BD9" stroke="#2A1048" strokeWidth="3.5" />
            <ellipse cx="50" cy="24" rx="24" ry="5" fill="#2A1048" />
            <polygon points="50,10 47,15 53,15" fill="#FFC93C" />
          </g>
        )}

        {accessory === 'crown' && (
          <g id="acc-crown">
            <polygon points="34,16 42,22 50,12 58,22 66,16 64,26 36,26" fill="#FFC93C" stroke="#2A1048" strokeWidth="3" />
            <circle cx="34" cy="16" r="2" fill="#FF3D5A" />
            <circle cx="50" cy="12" r="2" fill="#6C2BD9" />
            <circle cx="66" cy="16" r="2" fill="#22C55E" />
          </g>
        )}
      </svg>
    </div>
  );
};
