import React from 'react';

export type IconName =
  // Pet Shop: Food
  | 'apple'
  | 'cookie'
  | 'bone-biscuit'
  | 'fish'
  | 'milk-bottle'
  | 'pizza'
  | 'banana'
  | 'carrot'
  | 'cupcake'
  | 'donut'
  | 'watermelon'
  | 'ice-cream'
  | 'battery'
  // Pet Shop: Toys
  | 'bouncy-ball'
  | 'yarn-ball'
  | 'squeaky-toy'
  | 'frisbee'
  | 'drum'
  | 'gear-toy'
  // Pet Shop: Wear
  | 'party-hat'
  | 'crown'
  | 'sunglasses'
  | 'bow-tie'
  | 'scarf'
  | 'cape'
  | 'headphones'
  | 'flower-crown'
  | 'wizard-hat'
  | 'hero-mask'
  | 'backpack'
  // Pet Shop: Home & Special
  | 'bed'
  | 'food-bowl'
  | 'mini-house'
  | 'plant-pot'
  | 'star-lamp'
  | 'rainbow'
  | 'treasure-chest'
  | 'mystery-box'
  // Shop tabs
  | 'tab-food'
  | 'tab-toys'
  | 'tab-wear'
  | 'tab-home'
  | 'tab-special'
  // Pets
  | 'pet-dog'
  | 'pet-cat'
  | 'pet-robot'
  | 'pet-bunny'
  | 'pet-dragon'
  | 'pet-panda'
  | 'pet-fox'
  // Pet Moods
  | 'mood-happy'
  | 'mood-curious'
  | 'mood-worried'
  | 'mood-sleepy'
  | 'mood-proud'
  | 'mood-excited'
  // Domains & Topics: Programming
  | 'domain-programming'
  | 'topic-python'
  | 'topic-c'
  | 'topic-js'
  | 'topic-html'
  | 'topic-css'
  | 'topic-sql'
  | 'topic-scratch'
  // Domains & Topics: Mathematics
  | 'domain-mathematics'
  | 'math-calculator'
  | 'math-ruler'
  | 'math-triangle'
  | 'math-protractor'
  | 'math-pie-fraction'
  | 'math-dice'
  | 'math-graph'
  | 'math-symbols'
  // Domains & Topics: Science
  | 'domain-science'
  | 'science-flask'
  | 'science-atom'
  | 'science-microscope'
  | 'science-rocket'
  | 'science-magnet'
  | 'science-lightbulb'
  | 'science-planet'
  | 'science-dna'
  | 'science-heart'
  | 'science-brain'
  | 'science-lungs'
  // Domains & Topics: Environment
  | 'domain-environment'
  | 'eco-tree'
  | 'eco-leaf'
  | 'eco-water-drop'
  | 'eco-recycle'
  | 'eco-sun'
  | 'eco-wind-turbine'
  | 'eco-globe'
  | 'eco-fish'
  | 'eco-butterfly'
  | 'eco-cloud'
  | 'eco-mountain'
  // Game & Progress
  | 'coin'
  | 'heart'
  | 'shield'
  | 'magnet'
  | 'double-coin'
  | 'lightning'
  | 'padlock'
  | 'padlock-open'
  | 'key'
  | 'star'
  | 'star-empty'
  | 'trophy'
  | 'medal'
  | 'crown-progress'
  | 'flame'
  | 'daily-gift'
  | 'checkpoint-flag'
  | 'finish-flag'
  // Stats
  | 'stat-hunger'
  | 'stat-happiness'
  | 'stat-energy'
  | 'stat-friendship'
  // Difficulty
  | 'diff-easy'
  | 'diff-medium'
  | 'diff-hard'
  // Achievements
  | 'ach-first-challenge'
  | 'ach-perfect-score'
  | 'ach-first-game'
  | 'ach-coin-collector'
  | 'ach-pet-friend'
  | 'ach-streak'
  | 'ach-explorer'
  // Logo & Navigation
  | 'logo-play-tales'
  | 'nav-home'
  | 'nav-learn'
  | 'nav-games'
  | 'nav-pet'
  | 'nav-shop'
  | 'nav-achievements'
  | 'nav-profile'
  // Utilities
  | 'sound-on'
  | 'sound-off'
  | 'hint'
  | 'ask-ai'
  | 'retry'
  | 'back'
  | 'close'
  | 'share'
  | 'camera'
  | 'pet-brain'
  | 'check'
  | 'new-badge';

export interface IconProps {
  name: IconName | string;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
  onClick?: () => void;
  silhouette?: boolean;
}

const sizeToPixels = (size?: number | string): number => {
  if (typeof size === 'number') return size;
  switch (size) {
    case 'xs':
      return 20;
    case 'sm':
      return 24;
    case 'md':
      return 48;
    case 'lg':
      return 96;
    case 'xl':
      return 120;
    default:
      return 48;
  }
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 48,
  className = '',
  label,
  onClick,
  silhouette = false,
}) => {
  const px = sizeToPixels(size);
  const stroke = '#2A1048';
  const strokeWidth = 3.5;

  const renderGraphic = () => {
    switch (name) {
      // ==================== PET SHOP: FOOD ====================
      case 'apple':
        return (
          <g>
            {/* Stem */}
            <path d="M32 20 Q33 11 38 8" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
            {/* Leaf */}
            <path d="M34 14 Q44 10 42 18 Q34 20 34 14 Z" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M35 15 Q40 13 39 17" stroke="#B8F23A" strokeWidth="1.5" strokeLinecap="round" />
            {/* Apple Body */}
            <path
              d="M32 22 C22 17 12 24 14 38 C15 48 24 56 32 55 C40 56 49 48 50 38 C52 24 42 17 32 22 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* White Shine */}
            <path d="M20 28 Q18 36 21 42" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
            <circle cx="21" cy="25" r="1.5" fill="#FFFFFF" opacity="0.85" />
          </g>
        );

      case 'cookie':
        return (
          <g>
            <circle cx="32" cy="32" r="23" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Choc chips */}
            <circle cx="24" cy="24" r="3.5" fill="#78350F" stroke={stroke} strokeWidth="1.5" />
            <circle cx="40" cy="23" r="3" fill="#78350F" stroke={stroke} strokeWidth="1.5" />
            <circle cx="31" cy="34" r="3.5" fill="#78350F" stroke={stroke} strokeWidth="1.5" />
            <circle cx="22" cy="42" r="2.8" fill="#78350F" stroke={stroke} strokeWidth="1.5" />
            <circle cx="41" cy="40" r="3.2" fill="#78350F" stroke={stroke} strokeWidth="1.5" />
            {/* White Shine */}
            <path d="M19 19 Q26 13 36 13" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      case 'bone-biscuit':
        return (
          <g>
            {/* Dog Bone */}
            <path
              d="M17 22 C14 18 8 20 9 26 C9 30 14 31 16 29 L48 29 C50 31 55 30 55 26 C56 20 50 18 47 22 C44 26 44 38 47 42 C50 46 56 44 55 38 C55 34 50 33 48 35 L16 35 C14 33 9 34 9 38 C8 44 14 46 17 42 C20 38 20 26 17 22 Z"
              fill="#FFF4DC"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <path d="M22 31 L42 31" stroke="#FFC93C" strokeWidth="2" strokeLinecap="round" />
            <circle cx="15" cy="25" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'fish':
        return (
          <g>
            {/* Tail */}
            <path d="M14 20 L24 32 L14 44 Z" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Body */}
            <path
              d="M22 32 C26 18 48 18 56 32 C48 46 26 46 22 32 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Fin */}
            <path d="M36 21 Q41 14 45 22 Z" fill="#FF6FB5" stroke={stroke} strokeWidth="2" />
            {/* Eye */}
            <circle cx="48" cy="28" r="3" fill="#FFFFFF" stroke={stroke} strokeWidth="1.5" />
            <circle cx="49" cy="28" r="1.5" fill="#2A1048" />
            {/* Scale */}
            <path d="M35 30 Q39 34 35 38" stroke="#FFC93C" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M28 28 Q32 32 28 36" stroke="#FFC93C" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'milk-bottle':
        return (
          <g>
            {/* Bottle cap */}
            <rect x="26" y="8" width="12" height="6" rx="2" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Neck */}
            <path d="M28 14 L28 20 L20 27 L20 54 Q20 57 24 57 L40 57 Q44 57 44 54 L44 27 L36 20 L36 14 Z" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Pink label */}
            <rect x="22" y="32" width="20" height="12" rx="3" fill="#FF6FB5" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="38" r="3" fill="#FFFFFF" />
            {/* Shine */}
            <path d="M24 28 L24 50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      case 'pizza':
        return (
          <g>
            {/* Crust */}
            <path d="M12 18 Q32 10 52 18 L32 56 Z" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <path d="M11 18 Q32 9 53 18" stroke="#B45309" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Cheese layer */}
            <path d="M15 22 Q32 16 49 22 L32 52 Z" fill="#FFC93C" />
            {/* Pepperoni */}
            <circle cx="26" cy="27" r="3.5" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
            <circle cx="38" cy="28" r="3" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
            <circle cx="32" cy="38" r="3.5" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
            {/* Herbs */}
            <circle cx="28" cy="36" r="1.2" fill="#22C55E" />
            <circle cx="36" cy="34" r="1.2" fill="#22C55E" />
          </g>
        );

      case 'banana':
        return (
          <g>
            <path
              d="M48 10 C50 14 47 24 43 33 C37 45 26 53 14 53 C12 53 10 52 10 50 C12 47 20 45 28 36 C34 29 40 17 44 10 Z"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Stem */}
            <path d="M46 11 L50 8" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
            {/* Ridge */}
            <path d="M42 16 C38 27 30 38 18 46" stroke="#B8F23A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M44 18 Q46 22 43 27" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      case 'carrot':
        return (
          <g>
            {/* Leaves */}
            <path d="M38 10 Q42 5 48 8 Q42 14 38 14" fill="#22C55E" stroke={stroke} strokeWidth="2" />
            <path d="M36 10 Q38 3 42 4 Q38 12 36 12" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            {/* Carrot */}
            <path
              d="M40 14 C42 18 40 24 38 28 L20 54 Q18 56 16 54 Q14 52 17 49 L32 18 C34 15 37 12 40 14 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <path d="M32 24 L27 26" stroke="#FFC93C" strokeWidth="2" strokeLinecap="round" />
            <path d="M28 32 L23 34" stroke="#FFC93C" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 40 L20 42" stroke="#FFC93C" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'cupcake':
        return (
          <g>
            {/* Wrapper base */}
            <path d="M19 33 L24 54 Q25 56 32 56 Q39 56 40 54 L45 33 Z" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <line x1="27" y1="34" x2="28" y2="54" stroke={stroke} strokeWidth="1.5" />
            <line x1="32" y1="34" x2="32" y2="55" stroke={stroke} strokeWidth="1.5" />
            <line x1="37" y1="34" x2="36" y2="54" stroke={stroke} strokeWidth="1.5" />
            {/* Frosting */}
            <path
              d="M16 33 Q14 26 22 25 Q26 19 32 20 Q38 19 42 25 Q50 26 48 33 Z"
              fill="#FF6FB5"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Cherry */}
            <circle cx="32" cy="15" r="4.5" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M34 13 Q38 7 42 8" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <circle cx="30.5" cy="13.5" r="1.2" fill="#FFFFFF" />
          </g>
        );

      case 'donut':
        return (
          <g>
            {/* Dough base */}
            <circle cx="32" cy="32" r="22" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Hole */}
            <circle cx="32" cy="32" r="8" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Pink icing */}
            <path
              d="M32 12 C44 12 52 20 52 32 C52 36 48 38 46 34 C44 30 40 33 39 37 C38 41 34 39 32 40 C30 41 28 37 26 38 C24 39 21 34 19 37 C17 40 12 36 12 32 C12 20 20 12 32 12 Z"
              fill="#FF6FB5"
              stroke={stroke}
              strokeWidth="2"
            />
            {/* Sprinkles */}
            <rect x="23" y="18" width="5" height="2" rx="1" fill="#B8F23A" transform="rotate(25 23 18)" />
            <rect x="36" y="17" width="5" height="2" rx="1" fill="#FF3D5A" transform="rotate(-30 36 17)" />
            <rect x="44" y="27" width="5" height="2" rx="1" fill="#6C2BD9" transform="rotate(45 44 27)" />
            <rect x="18" y="29" width="5" height="2" rx="1" fill="#FFC93C" transform="rotate(-40 18 29)" />
          </g>
        );

      case 'watermelon':
        return (
          <g>
            {/* Green rind */}
            <path d="M10 24 Q32 58 54 24 Z" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* White stripe */}
            <path d="M13 24 Q32 54 51 24 Z" fill="#FFF4DC" />
            {/* Red flesh */}
            <path d="M15 24 Q32 50 49 24 Z" fill="#FF3D5A" />
            {/* Seeds */}
            <circle cx="26" cy="29" r="1.5" fill="#2A1048" />
            <circle cx="38" cy="29" r="1.5" fill="#2A1048" />
            <circle cx="32" cy="35" r="1.5" fill="#2A1048" />
            <circle cx="28" cy="38" r="1.2" fill="#2A1048" />
            <circle cx="36" cy="38" r="1.2" fill="#2A1048" />
          </g>
        );

      case 'ice-cream':
        return (
          <g>
            {/* Waffle cone */}
            <path d="M22 30 L32 57 L42 30 Z" fill="#B45309" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <line x1="25" y1="36" x2="38" y2="44" stroke="#FFC93C" strokeWidth="1.5" />
            <line x1="39" y1="36" x2="26" y2="44" stroke="#FFC93C" strokeWidth="1.5" />
            {/* Scoops */}
            <circle cx="32" cy="23" r="14" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M20 28 Q26 33 32 29 Q38 33 44 28" fill="none" stroke={stroke} strokeWidth="2.5" />
            {/* Cherry */}
            <circle cx="32" cy="9" r="4" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="30.5" cy="8" r="1.2" fill="#FFFFFF" />
          </g>
        );

      case 'battery':
        return (
          <g>
            {/* Terminal */}
            <rect x="28" y="10" width="8" height="5" rx="1.5" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Battery Body */}
            <rect x="20" y="15" width="24" height="40" rx="5" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Lightning bolt */}
            <path d="M34 22 L26 34 L32 34 L30 46 L38 33 L32 33 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            <path d="M23 20 L23 50" stroke="#B8F23A" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      // ==================== PET SHOP: TOYS ====================
      case 'bouncy-ball':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Swirl stripe */}
            <path d="M12 24 Q32 10 52 24 Q32 38 12 24 Z" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            <path d="M12 40 Q32 26 52 40 Q32 54 12 40 Z" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
            <circle cx="24" cy="18" r="3" fill="#FFFFFF" opacity="0.8" />
          </g>
        );

      case 'yarn-ball':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M16 26 Q32 18 48 26" fill="none" stroke={stroke} strokeWidth="2.5" />
            <path d="M14 36 Q32 32 50 36" fill="none" stroke={stroke} strokeWidth="2.5" />
            <path d="M22 16 Q30 32 24 48" fill="none" stroke={stroke} strokeWidth="2.5" />
            <path d="M40 16 Q34 32 40 48" fill="none" stroke={stroke} strokeWidth="2.5" />
            {/* Loose thread */}
            <path d="M48 40 Q56 44 54 52 Q50 56 42 54" fill="none" stroke="#FF6FB5" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'squeaky-toy':
        return (
          <g>
            {/* Rubber duck shape */}
            <path
              d="M18 44 C16 44 14 36 20 32 C26 28 32 30 36 28 C36 24 34 16 42 16 C48 16 50 22 48 26 C53 26 56 29 54 31 C50 33 46 32 44 34 C44 42 34 46 18 44 Z"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Beak */}
            <path d="M50 24 Q57 26 54 29 Q48 29 48 26 Z" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
            {/* Eye */}
            <circle cx="42" cy="21" r="2" fill="#2A1048" />
            <circle cx="41.5" cy="20.5" r="0.7" fill="#FFFFFF" />
          </g>
        );

      case 'frisbee':
        return (
          <g>
            <ellipse cx="32" cy="32" rx="24" ry="12" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="32" cy="30" rx="18" ry="8" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <ellipse cx="32" cy="29" rx="10" ry="4" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <path d="M16 27 Q32 20 48 27" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      case 'drum':
        return (
          <g>
            {/* Body */}
            <path d="M14 26 L14 42 Q32 50 50 42 L50 26 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Top rim */}
            <ellipse cx="32" cy="26" rx="18" ry="7" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Zigzag cords */}
            <path d="M14 26 L23 46 L32 26 L41 46 L50 26" fill="none" stroke="#FFC93C" strokeWidth="2.5" />
            {/* Drumsticks */}
            <line x1="12" y1="12" x2="26" y2="24" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3" fill="#B45309" stroke={stroke} strokeWidth="1.5" />
            <line x1="52" y1="12" x2="38" y2="24" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <circle cx="52" cy="12" r="3" fill="#B45309" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'gear-toy':
        return (
          <g>
            {/* Gear 1 */}
            <circle cx="28" cy="28" r="14" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="28" cy="28" r="5" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            {/* Gear 2 */}
            <circle cx="44" cy="42" r="11" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="44" cy="42" r="4" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            {/* Cogs */}
            <rect x="25" y="10" width="6" height="5" rx="1" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            <rect x="25" y="41" width="6" height="5" rx="1" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            <rect x="10" y="25" width="5" height="6" rx="1" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            <rect x="41" y="25" width="5" height="6" rx="1" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
          </g>
        );

      // ==================== PET SHOP: WEAR ====================
      case 'party-hat':
        return (
          <g>
            {/* Cone */}
            <path d="M16 50 L32 14 L48 50 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <path d="M22 36 L40 46" stroke="#FFC93C" strokeWidth="5" strokeLinecap="round" />
            <path d="M26 24 L44 34" stroke="#B8F23A" strokeWidth="5" strokeLinecap="round" />
            {/* Pom-pom */}
            <circle cx="32" cy="12" r="5" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="32" cy="50" rx="16" ry="4" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'crown':
      case 'crown-progress':
        return (
          <g>
            <path
              d="M12 44 L16 20 L24 30 L32 14 L40 30 L48 20 L52 44 Z"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Jewels */}
            <circle cx="32" cy="22" r="3" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
            <circle cx="20" cy="30" r="2.5" fill="#6C2BD9" stroke={stroke} strokeWidth="1.5" />
            <circle cx="44" cy="30" r="2.5" fill="#22C55E" stroke={stroke} strokeWidth="1.5" />
            {/* Base band */}
            <rect x="12" y="44" width="40" height="7" rx="2" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="16" cy="47" r="1.5" fill="#FFFFFF" />
            <circle cx="32" cy="47" r="1.5" fill="#FFFFFF" />
            <circle cx="48" cy="47" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'sunglasses':
        return (
          <g>
            {/* Bridge */}
            <rect x="28" y="27" width="8" height="4" rx="1" fill="#2A1048" />
            {/* Left lens */}
            <rect x="10" y="24" width="18" height="15" rx="5" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M13 27 L23 37" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            {/* Right lens */}
            <rect x="36" y="24" width="18" height="15" rx="5" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M39 27 L49 37" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            {/* Temples */}
            <line x1="10" y1="26" x2="6" y2="22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <line x1="54" y1="26" x2="58" y2="22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'bow-tie':
        return (
          <g>
            {/* Left wing */}
            <path d="M32 32 L14 20 L14 44 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Right wing */}
            <path d="M32 32 L50 20 L50 44 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Center knot */}
            <rect x="28" y="27" width="8" height="10" rx="3" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="32" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'scarf':
        return (
          <g>
            {/* Loop */}
            <ellipse cx="32" cy="26" rx="20" ry="10" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Stripes on loop */}
            <path d="M22 20 L24 32" stroke="#FFC93C" strokeWidth="4" strokeLinecap="round" />
            <path d="M38 20 L40 32" stroke="#FFC93C" strokeWidth="4" strokeLinecap="round" />
            {/* Hanging tails */}
            <path d="M36 32 L34 54 Q38 56 42 54 L44 32 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <line x1="34" y1="42" x2="43" y2="42" stroke="#FFC93C" strokeWidth="3" />
            <line x1="34" y1="48" x2="42" y2="48" stroke="#FFC93C" strokeWidth="3" />
            {/* Fringe */}
            <line x1="35" y1="54" x2="35" y2="58" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="38" y1="55" x2="38" y2="59" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="41" y1="54" x2="41" y2="58" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'cape':
        return (
          <g>
            <path
              d="M26 14 Q32 17 38 14 L50 52 Q32 47 14 52 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Fold shadow */}
            <path d="M32 16 L28 49 L34 49 Z" fill="#FF6FB5" opacity="0.6" />
            {/* Clasp */}
            <circle cx="32" cy="16" r="4.5" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="16" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'headphones':
        return (
          <g>
            {/* Headband */}
            <path d="M14 34 C14 18 50 18 50 34" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
            <path d="M14 34 C14 18 50 18 50 34" fill="none" stroke="#6C2BD9" strokeWidth="3" strokeLinecap="round" />
            {/* Left ear cup */}
            <rect x="8" y="28" width="12" height="20" rx="6" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="14" cy="38" r="2.5" fill="#2A1048" />
            {/* Right ear cup */}
            <rect x="44" y="28" width="12" height="20" rx="6" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="50" cy="38" r="2.5" fill="#2A1048" />
          </g>
        );

      case 'flower-crown':
        return (
          <g>
            {/* Green vine */}
            <ellipse cx="32" cy="36" rx="20" ry="8" fill="none" stroke="#22C55E" strokeWidth="4" />
            {/* Flowers */}
            <circle cx="20" cy="34" r="5" fill="#FF6FB5" stroke={stroke} strokeWidth="2" />
            <circle cx="20" cy="34" r="2" fill="#FFC93C" />
            <circle cx="32" cy="30" r="6" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="30" r="2.5" fill="#FFC93C" />
            <circle cx="44" cy="34" r="5" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <circle cx="44" cy="34" r="2" fill="#FF3D5A" />
          </g>
        );

      case 'wizard-hat':
        return (
          <g>
            {/* Brim */}
            <ellipse cx="32" cy="48" rx="22" ry="6" fill="#2A1048" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Cone */}
            <path d="M16 48 Q22 28 32 10 Q42 28 48 48 Z" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Ribbon */}
            <path d="M18 45 Q32 41 46 45 L47 48 Q32 44 17 48 Z" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            {/* Star badge */}
            <polygon points="32,26 33.5,30 38,30 34.5,33 36,37 32,34.5 28,37 29.5,33 26,30 30.5,30" fill="#FFC93C" stroke={stroke} strokeWidth="1" />
          </g>
        );

      case 'hero-mask':
        return (
          <g>
            <path
              d="M10 28 C14 20 28 20 32 25 C36 20 50 20 54 28 C52 38 42 42 32 35 C22 42 12 38 10 28 Z"
              fill="#6C2BD9"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Left Eyehole */}
            <ellipse cx="22" cy="28" rx="4.5" ry="3" fill="#FFF4DC" stroke={stroke} strokeWidth="2" transform="rotate(-10 22 28)" />
            {/* Right Eyehole */}
            <ellipse cx="42" cy="28" rx="4.5" ry="3" fill="#FFF4DC" stroke={stroke} strokeWidth="2" transform="rotate(10 42 28)" />
          </g>
        );

      case 'backpack':
        return (
          <g>
            {/* Body */}
            <rect x="18" y="20" width="28" height="34" rx="8" fill="#B45309" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Front pouch */}
            <rect x="22" y="34" width="20" height="15" rx="4" fill="#FFC93C" stroke={stroke} strokeWidth="2.5" />
            {/* Flap */}
            <path d="M18 25 Q32 32 46 25 L46 20 Q32 16 18 20 Z" fill="#78350F" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
            {/* Straps */}
            <path d="M26 14 Q32 11 38 14" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="32" cy="41" r="2" fill="#2A1048" />
          </g>
        );

      // ==================== PET SHOP: HOME & SPECIAL ====================
      case 'bed':
        return (
          <g>
            {/* Basket rim */}
            <ellipse cx="32" cy="40" rx="22" ry="12" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Cushion */}
            <ellipse cx="32" cy="38" rx="19" ry="9" fill="#FF6FB5" stroke={stroke} strokeWidth="2.5" />
            {/* Blanket */}
            <path d="M20 38 Q32 46 44 38 Q42 45 32 45 Q22 45 20 38 Z" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <circle cx="28" cy="34" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'food-bowl':
        return (
          <g>
            <ellipse cx="32" cy="44" rx="22" ry="9" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M10 44 L14 34 Q32 28 50 34 L54 44 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Kibble heap */}
            <ellipse cx="32" cy="34" rx="18" ry="6" fill="#78350F" stroke={stroke} strokeWidth="2" />
            <circle cx="26" cy="33" r="2" fill="#FFC93C" />
            <circle cx="32" cy="31" r="2" fill="#FFC93C" />
            <circle cx="38" cy="33" r="2" fill="#FFC93C" />
            {/* Paw on bowl */}
            <circle cx="32" cy="44" r="2.5" fill="#FFF4DC" />
            <circle cx="29" cy="41" r="1.2" fill="#FFF4DC" />
            <circle cx="32" cy="40" r="1.2" fill="#FFF4DC" />
            <circle cx="35" cy="41" r="1.2" fill="#FFF4DC" />
          </g>
        );

      case 'mini-house':
        return (
          <g>
            {/* Walls */}
            <rect x="16" y="28" width="32" height="26" rx="2" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Peaked roof */}
            <path d="M12 28 L32 10 L52 28 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Doorway */}
            <path d="M26 54 L26 38 Q32 32 38 38 L38 54 Z" fill="#2A1048" />
            {/* Attic window */}
            <circle cx="32" cy="22" r="3.5" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'plant-pot':
        return (
          <g>
            {/* Pot */}
            <path d="M22 32 L25 54 Q26 56 32 56 Q38 56 39 54 L42 32 Z" fill="#B45309" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <rect x="20" y="28" width="24" height="6" rx="2" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Leaves */}
            <path d="M32 28 Q32 12 22 16 Q26 26 32 28 Z" fill="#22C55E" stroke={stroke} strokeWidth="2" />
            <path d="M32 28 Q32 10 42 14 Q38 24 32 28 Z" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <path d="M32 28 L32 14" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'star-lamp':
        return (
          <g>
            {/* Base */}
            <ellipse cx="32" cy="52" rx="14" ry="4" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="32" y1="36" x2="32" y2="52" stroke={stroke} strokeWidth="4" />
            {/* Glowing star */}
            <polygon
              points="32,12 36,22 46,23 38,30 41,40 32,34 23,40 26,30 18,23 28,22"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <circle cx="32" cy="26" r="3" fill="#FFFFFF" />
          </g>
        );

      case 'rainbow':
        return (
          <g>
            <path d="M12 48 A20 20 0 0 1 52 48" fill="none" stroke="#FF3D5A" strokeWidth="5" strokeLinecap="round" />
            <path d="M16 48 A16 16 0 0 1 48 48" fill="none" stroke="#FFC93C" strokeWidth="5" strokeLinecap="round" />
            <path d="M20 48 A12 12 0 0 1 44 48" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
            <path d="M24 48 A8 8 0 0 1 40 48" fill="none" stroke="#6C2BD9" strokeWidth="5" strokeLinecap="round" />
          </g>
        );

      case 'treasure-chest':
        return (
          <g>
            {/* Bottom box */}
            <rect x="14" y="32" width="36" height="22" rx="3" fill="#B45309" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Curved lid */}
            <path d="M12 32 C12 20 52 20 52 32 Z" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Gold bands */}
            <rect x="20" y="24" width="4" height="30" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <rect x="40" y="24" width="4" height="30" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            {/* Keyhole lock */}
            <rect x="29" y="32" width="6" height="8" rx="2" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <circle cx="32" cy="35" r="1.2" fill="#2A1048" />
          </g>
        );

      case 'mystery-box':
      case 'daily-gift':
        return (
          <g>
            {/* Box base */}
            <rect x="16" y="26" width="32" height="28" rx="3" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Lid */}
            <rect x="13" y="20" width="38" height="8" rx="2" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Yellow Ribbon */}
            <rect x="29" y="20" width="6" height="34" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            {/* Bow on top */}
            <path d="M29 20 C24 12 18 16 26 20 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            <path d="M35 20 C40 12 46 16 38 20 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="32" cy="20" r="2.5" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
            {/* Question mark or shine */}
            <path d="M30 36 C30 34 34 33 34 35 C34 37 32 38 32 40" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="44" r="1" fill="#FFFFFF" />
          </g>
        );

      // ==================== SHOP TABS ====================
      case 'tab-food':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Apple shape inside */}
            <path d="M32 20 Q32 16 36 14" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <path d="M32 22 C26 18 20 23 21 32 C22 39 27 44 32 43 C37 44 42 39 43 32 C44 23 38 18 32 22 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'tab-toys':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="32" r="12" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            <path d="M20 28 Q32 20 44 28" fill="none" stroke="#FFC93C" strokeWidth="2.5" />
          </g>
        );

      case 'tab-wear':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M20 40 L22 26 L27 32 L32 22 L37 32 L42 26 L44 40 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'tab-home':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <rect x="23" y="28" width="18" height="15" rx="1.5" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <path d="M20 28 L32 18 L44 28 Z" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'tab-special':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <polygon points="32,18 35,26 44,26 37,32 39,40 32,35 25,40 27,32 20,26 29,26" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
          </g>
        );

      // ==================== PET PICTURES ====================
      case 'pet-dog':
        return (
          <g>
            {/* Floppy ears */}
            <path d="M14 26 C10 32 10 44 16 46 C20 46 22 40 20 32 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M50 26 C54 32 54 44 48 46 C44 46 42 40 44 32 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Head */}
            <circle cx="32" cy="34" r="18" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            {/* White muzzle */}
            <ellipse cx="32" cy="39" rx="9" ry="7" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            {/* Nose */}
            <path d="M29 36 Q32 34 35 36 L32 40 Z" fill="#2A1048" />
            {/* Eyes */}
            <circle cx="25" cy="30" r="3" fill="#2A1048" />
            <circle cx="24" cy="29" r="1.2" fill="#FFFFFF" />
            <circle cx="39" cy="30" r="3" fill="#2A1048" />
            <circle cx="38" cy="29" r="1.2" fill="#FFFFFF" />
            {/* Tongue */}
            <path d="M30 42 Q32 47 34 42" stroke="#FF3D5A" strokeWidth="2.5" fill="#FF6FB5" />
          </g>
        );

      case 'pet-cat':
        return (
          <g>
            {/* Pointed ears */}
            <polygon points="16,30 20,12 30,22" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <polygon points="19,26 21,16 27,22" fill="#FF6FB5" />
            <polygon points="48,30 44,12 34,22" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <polygon points="45,26 43,16 37,22" fill="#FF6FB5" />
            {/* Head */}
            <circle cx="32" cy="35" r="18" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Cheeks */}
            <ellipse cx="32" cy="39" rx="10" ry="7" fill="#FF6FB5" stroke={stroke} strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="24" cy="31" rx="3.5" ry="4.5" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <ellipse cx="24" cy="31" rx="1.5" ry="3.5" fill="#2A1048" />
            <ellipse cx="40" cy="31" rx="3.5" ry="4.5" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <ellipse cx="40" cy="31" rx="1.5" ry="3.5" fill="#2A1048" />
            {/* Nose */}
            <polygon points="30,37 34,37 32,40" fill="#FF3D5A" />
            {/* Whiskers */}
            <line x1="16" y1="38" x2="8" y2="37" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="41" x2="9" y2="43" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="38" x2="56" y2="37" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="41" x2="55" y2="43" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'pet-robot':
        return (
          <g>
            {/* Antenna */}
            <line x1="32" y1="16" x2="32" y2="8" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="32" cy="7" r="4" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            {/* Ears/bolts */}
            <rect x="8" y="28" width="5" height="10" rx="1.5" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
            <rect x="51" y="28" width="5" height="10" rx="1.5" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
            {/* Head Box */}
            <rect x="12" y="16" width="40" height="36" rx="10" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Screen Visor */}
            <rect x="18" y="23" width="28" height="14" rx="5" fill="#2A1048" stroke={stroke} strokeWidth="2" />
            {/* Glowing visor eyes */}
            <circle cx="26" cy="30" r="3" fill="#B8F23A" />
            <circle cx="38" cy="30" r="3" fill="#B8F23A" />
            {/* Mouth grill */}
            <line x1="23" y1="44" x2="41" y2="44" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <line x1="27" y1="41" x2="27" y2="47" stroke={stroke} strokeWidth="2" />
            <line x1="32" y1="41" x2="32" y2="47" stroke={stroke} strokeWidth="2" />
            <line x1="37" y1="41" x2="37" y2="47" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'pet-bunny':
        return (
          <g>
            {/* Long ears */}
            <ellipse cx="23" cy="16" rx="5.5" ry="14" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} transform="rotate(-10 23 16)" />
            <ellipse cx="23" cy="16" rx="2.5" ry="9" fill="#FF6FB5" transform="rotate(-10 23 16)" />
            <ellipse cx="41" cy="16" rx="5.5" ry="14" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} transform="rotate(10 41 16)" />
            <ellipse cx="41" cy="16" rx="2.5" ry="9" fill="#FF6FB5" transform="rotate(10 41 16)" />
            {/* Head */}
            <circle cx="32" cy="36" r="18" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Pink cheeks */}
            <circle cx="20" cy="40" r="3.5" fill="#FF6FB5" opacity="0.6" />
            <circle cx="44" cy="40" r="3.5" fill="#FF6FB5" opacity="0.6" />
            {/* Eyes */}
            <ellipse cx="24" cy="32" rx="2.5" ry="3.5" fill="#2A1048" />
            <circle cx="23.5" cy="31" r="1" fill="#FFFFFF" />
            <ellipse cx="40" cy="32" rx="2.5" ry="3.5" fill="#2A1048" />
            <circle cx="39.5" cy="31" r="1" fill="#FFFFFF" />
            {/* Nose & mouth */}
            <polygon points="30,37 34,37 32,39" fill="#FF3D5A" />
            <path d="M30 40 Q32 43 34 40" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'pet-dragon':
        return (
          <g>
            {/* Horns */}
            <path d="M22 22 Q16 12 12 14 Q16 22 20 25" fill="#FFC93C" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            <path d="M42 22 Q48 12 52 14 Q48 22 44 25" fill="#FFC93C" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            {/* Head */}
            <circle cx="32" cy="34" r="18" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Scales on crest */}
            <polygon points="32,13 35,18 29,18" fill="#B8F23A" stroke={stroke} strokeWidth="1.5" />
            {/* Snout */}
            <ellipse cx="32" cy="38" rx="11" ry="8" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <circle cx="28" cy="36" r="1.5" fill="#2A1048" />
            <circle cx="36" cy="36" r="1.5" fill="#2A1048" />
            {/* Eyes */}
            <ellipse cx="24" cy="28" rx="3.5" ry="4" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <ellipse cx="24" cy="28" rx="1.5" ry="3" fill="#2A1048" />
            <ellipse cx="40" cy="28" rx="3.5" ry="4" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <ellipse cx="40" cy="28" rx="1.5" ry="3" fill="#2A1048" />
          </g>
        );

      case 'pet-panda':
        return (
          <g>
            {/* Black ears */}
            <circle cx="16" cy="20" r="7" fill="#2A1048" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="48" cy="20" r="7" fill="#2A1048" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Head */}
            <circle cx="32" cy="35" r="19" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Eye patches */}
            <ellipse cx="23" cy="32" rx="5" ry="7" fill="#2A1048" transform="rotate(-15 23 32)" />
            <circle cx="23" cy="32" r="2" fill="#FFFFFF" />
            <circle cx="23" cy="32" r="1" fill="#2A1048" />
            <ellipse cx="41" cy="32" rx="5" ry="7" fill="#2A1048" transform="rotate(15 41 32)" />
            <circle cx="41" cy="32" r="2" fill="#FFFFFF" />
            <circle cx="41" cy="32" r="1" fill="#2A1048" />
            {/* Nose & mouth */}
            <ellipse cx="32" cy="39" rx="3" ry="2" fill="#2A1048" />
            <path d="M29 42 Q32 45 35 42" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            {/* Pink cheeks */}
            <circle cx="17" cy="39" r="3" fill="#FF6FB5" opacity="0.6" />
            <circle cx="47" cy="39" r="3" fill="#FF6FB5" opacity="0.6" />
          </g>
        );

      case 'pet-fox':
        return (
          <g>
            {/* Fox pointed ears */}
            <polygon points="16,30 18,10 30,22" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <polygon points="20,26 20,16 26,22" fill="#FFF4DC" />
            <polygon points="48,30 46,10 34,22" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <polygon points="44,26 44,16 38,22" fill="#FFF4DC" />
            {/* Head */}
            <circle cx="32" cy="35" r="18" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* White muzzle cheeks */}
            <path d="M16 36 Q24 45 32 42 Q40 45 48 36 Q32 48 16 36 Z" fill="#FFF4DC" stroke={stroke} strokeWidth="1.5" />
            {/* Eyes */}
            <ellipse cx="23" cy="30" rx="3.5" ry="2" fill="#2A1048" transform="rotate(-15 23 30)" />
            <ellipse cx="41" cy="30" rx="3.5" ry="2" fill="#2A1048" transform="rotate(15 41 30)" />
            {/* Nose */}
            <circle cx="32" cy="39" r="2" fill="#2A1048" />
          </g>
        );

      // ==================== PET MOODS ====================
      case 'mood-happy':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="23" cy="27" r="2.5" fill="#2A1048" />
            <circle cx="41" cy="27" r="2.5" fill="#2A1048" />
            <path d="M22 35 Q32 46 42 35" fill="#FF3D5A" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="18" cy="33" r="2.5" fill="#FF6FB5" />
            <circle cx="46" cy="33" r="2.5" fill="#FF6FB5" />
          </g>
        );

      case 'mood-curious':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="23" cy="27" r="3.5" fill="#2A1048" />
            <circle cx="22" cy="26" r="1.5" fill="#FFFFFF" />
            <circle cx="41" cy="25" r="2" fill="#2A1048" />
            <path d="M26 38 Q32 35 38 38" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            {/* Tiny question mark */}
            <text x="44" y="20" fontSize="13" fontWeight="900" fill="#6C2BD9">?</text>
          </g>
        );

      case 'mood-worried':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="23" cy="29" r="2.5" fill="#2A1048" />
            <circle cx="41" cy="29" r="2.5" fill="#2A1048" />
            <path d="M24 39 Q32 33 40 39" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            {/* Sweat drop */}
            <path d="M48 20 Q52 26 48 28 Q44 26 48 20 Z" fill="#6C2BD9" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'mood-sleepy':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M19 28 Q24 32 29 28" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <path d="M35 28 Q40 32 45 28" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="38" r="3" fill="#2A1048" />
            {/* ZZZ */}
            <text x="42" y="18" fontSize="10" fontWeight="900" fill="#6C2BD9">Z</text>
            <text x="47" y="13" fontSize="8" fontWeight="900" fill="#FFC93C">z</text>
          </g>
        );

      case 'mood-proud':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Star eyes */}
            <polygon points="24,24 25,27 28,27 26,29 27,32 24,30 21,32 22,29 20,27 23,27" fill="#6C2BD9" />
            <polygon points="40,24 41,27 44,27 42,29 43,32 40,30 37,32 38,29 36,27 39,27" fill="#6C2BD9" />
            <path d="M24 36 Q32 44 40 36" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'mood-excited':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="23" cy="25" r="3.5" fill="#FFFFFF" />
            <circle cx="23" cy="25" r="2" fill="#2A1048" />
            <circle cx="41" cy="25" r="3.5" fill="#FFFFFF" />
            <circle cx="41" cy="25" r="2" fill="#2A1048" />
            <ellipse cx="32" cy="38" rx="8" ry="6" fill="#2A1048" />
            <path d="M27 39 Q32 44 37 39" fill="#FF6FB5" />
          </g>
        );

      // ==================== DOMAINS & TOPICS: PROGRAMMING ====================
      case 'domain-programming':
        return (
          <g>
            {/* Laptop Base */}
            <rect x="8" y="44" width="48" height="6" rx="2" fill="#2A1048" />
            {/* Screen */}
            <rect x="14" y="16" width="36" height="28" rx="4" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <rect x="18" y="20" width="28" height="20" rx="2" fill="#FFF4DC" />
            {/* Code Brackets */}
            <path d="M26 25 L22 30 L26 35" fill="none" stroke="#FF3D5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 25 L42 30 L38 35" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="33" y1="24" x2="31" y2="36" stroke="#B8F23A" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'topic-python':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Friendly winding snake */}
            <path
              d="M18 36 C18 24 30 20 34 24 C38 28 44 26 44 34 C44 44 26 46 22 40"
              fill="none"
              stroke="#22C55E"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Snake head */}
            <circle cx="18" cy="36" r="6" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <circle cx="16" cy="35" r="1.5" fill="#2A1048" />
            {/* Tongue */}
            <path d="M12 36 L8 36 M8 34 L10 36 L8 38" stroke="#FF3D5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'topic-c':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Bold letter C */}
            <path
              d="M42 22 C34 16 22 18 20 32 C18 44 32 48 42 42"
              fill="none"
              stroke="#FFF4DC"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M42 22 C34 16 22 18 20 32 C18 44 32 48 42 42"
              fill="none"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );

      case 'topic-js':
        return (
          <g>
            <rect x="10" y="10" width="44" height="44" rx="10" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <text x="18" y="44" fontFamily="Fredoka, sans-serif" fontSize="26" fontWeight="900" fill="#2A1048">
              JS
            </text>
            <circle cx="46" cy="18" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'topic-html':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* < / > tag badge */}
            <path d="M22 24 L16 32 L22 40" fill="none" stroke="#FFC93C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M42 24 L48 32 L42 40" fill="none" stroke="#FFC93C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="34" y1="22" x2="30" y2="42" stroke="#FFF4DC" strokeWidth="4" strokeLinecap="round" />
          </g>
        );

      case 'topic-css':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Artist Paintbrush */}
            <path d="M44 14 L30 28 L24 28 L24 34 L30 34 L44 20 Z" fill="#B45309" stroke={stroke} strokeWidth="2" />
            {/* Brush ferrule & bristles */}
            <path d="M24 28 L16 36 C14 38 14 44 18 46 C22 48 26 44 28 40 L30 34 Z" fill="#FF6FB5" stroke={stroke} strokeWidth="2" />
            <circle cx="17" cy="43" r="2" fill="#B8F23A" />
          </g>
        );

      case 'topic-sql':
        return (
          <g>
            {/* Cylinder database stack */}
            <ellipse cx="32" cy="18" rx="18" ry="6" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Mid cylinder */}
            <path d="M14 18 L14 32 Q32 38 50 32 L50 18" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="32" cy="32" rx="18" ry="6" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Bottom cylinder */}
            <path d="M14 32 L14 46 Q32 52 50 46 L50 32" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="32" cy="46" rx="18" ry="6" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
          </g>
        );

      case 'topic-scratch':
        return (
          <g>
            {/* Scratch puzzle piece block */}
            <path
              d="M12 20 L24 20 C24 16 30 16 30 20 L48 20 Q52 20 52 24 L52 32 C48 32 48 38 52 38 L52 46 Q52 50 48 50 L30 50 C30 54 24 54 24 50 L12 50 Q8 50 8 46 L8 24 Q8 20 12 20 Z"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <circle cx="20" cy="35" r="3" fill="#FF3D5A" />
            <circle cx="36" cy="35" r="3" fill="#6C2BD9" />
          </g>
        );

      // ==================== DOMAINS & TOPICS: MATHEMATICS ====================
      case 'domain-mathematics':
      case 'math-calculator':
        return (
          <g>
            {/* Calculator Body */}
            <rect x="14" y="10" width="36" height="46" rx="8" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Screen */}
            <rect x="19" y="15" width="26" height="12" rx="3" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <text x="22" y="24" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#2A1048">3.1415</text>
            {/* Buttons */}
            <circle cx="24" cy="34" r="3" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <circle cx="32" cy="34" r="3" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <circle cx="40" cy="34" r="3" fill="#B8F23A" stroke={stroke} strokeWidth="1.5" />
            <circle cx="24" cy="42" r="3" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <circle cx="32" cy="42" r="3" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <circle cx="40" cy="42" r="3" fill="#B8F23A" stroke={stroke} strokeWidth="1.5" />
            <rect x="21" y="48" width="14" height="4" rx="2" fill="#6C2BD9" />
            <circle cx="40" cy="50" r="3" fill="#B8F23A" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'math-ruler':
        return (
          <g>
            <rect x="8" y="24" width="48" height="16" rx="3" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="16" y1="24" x2="16" y2="34" stroke={stroke} strokeWidth="2" />
            <line x1="22" y1="24" x2="22" y2="30" stroke={stroke} strokeWidth="1.5" />
            <line x1="28" y1="24" x2="28" y2="34" stroke={stroke} strokeWidth="2" />
            <line x1="34" y1="24" x2="34" y2="30" stroke={stroke} strokeWidth="1.5" />
            <line x1="40" y1="24" x2="40" y2="34" stroke={stroke} strokeWidth="2" />
            <line x1="46" y1="24" x2="46" y2="30" stroke={stroke} strokeWidth="1.5" />
            <circle cx="12" cy="32" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'math-triangle':
        return (
          <g>
            <polygon points="12,50 12,14 48,50" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <polygon points="18,44 18,24 38,44" fill="#FFF4DC" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            <line x1="12" y1="36" x2="16" y2="36" stroke={stroke} strokeWidth="1.5" />
            <line x1="12" y1="28" x2="16" y2="28" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'math-protractor':
        return (
          <g>
            {/* Protractor semi-circle */}
            <path d="M10 42 A22 22 0 0 1 54 42 Z" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <path d="M22 42 A10 10 0 0 1 42 42 Z" fill="#FFF4DC" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            {/* Tick marks */}
            <line x1="32" y1="20" x2="32" y2="24" stroke={stroke} strokeWidth="2" />
            <line x1="22" y1="24" x2="24" y2="27" stroke={stroke} strokeWidth="2" />
            <line x1="42" y1="24" x2="40" y2="27" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'math-pie-fraction':
        return (
          <g>
            {/* 3/4 circle */}
            <path d="M30 32 L30 10 A22 22 0 1 0 52 32 Z" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Cut-out quarter */}
            <path d="M34 28 L54 28 A22 22 0 0 0 34 8 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <circle cx="24" cy="40" r="2.5" fill="#FFFFFF" />
          </g>
        );

      case 'math-dice':
        return (
          <g>
            <rect x="14" y="14" width="36" height="36" rx="8" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="23" cy="23" r="3" fill="#FFF4DC" />
            <circle cx="41" cy="23" r="3" fill="#FFF4DC" />
            <circle cx="32" cy="32" r="3" fill="#FFF4DC" />
            <circle cx="23" cy="41" r="3" fill="#FFF4DC" />
            <circle cx="41" cy="41" r="3" fill="#FFF4DC" />
          </g>
        );

      case 'math-graph':
        return (
          <g>
            <rect x="12" y="12" width="40" height="40" rx="4" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Axes */}
            <line x1="18" y1="16" x2="18" y2="46" stroke={stroke} strokeWidth="2.5" />
            <line x1="18" y1="46" x2="48" y2="46" stroke={stroke} strokeWidth="2.5" />
            {/* Rising zigzag line */}
            <polyline points="20,42 28,34 36,38 46,20" fill="none" stroke="#FF3D5A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="46" cy="20" r="3.5" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'math-symbols':
        return (
          <g>
            <rect x="10" y="10" width="44" height="44" rx="10" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <text x="16" y="28" fontSize="16" fontWeight="900" fill="#FF3D5A">+</text>
            <text x="36" y="28" fontSize="18" fontWeight="900" fill="#2A1048">−</text>
            <text x="16" y="47" fontSize="16" fontWeight="900" fill="#6C2BD9">×</text>
            <text x="36" y="47" fontSize="16" fontWeight="900" fill="#22C55E">÷</text>
          </g>
        );

      // ==================== DOMAINS & TOPICS: SCIENCE ====================
      case 'domain-science':
      case 'science-flask':
        return (
          <g>
            {/* Flask neck */}
            <rect x="27" y="8" width="10" height="14" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="32" cy="8" rx="7" ry="2.5" fill="#22C55E" stroke={stroke} strokeWidth="2" />
            {/* Flask conical body */}
            <path d="M27 22 L12 50 Q10 56 16 56 L48 56 Q54 56 52 50 L37 22 Z" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Liquid */}
            <path d="M19 40 L15 50 Q14 54 18 54 L46 54 Q50 54 49 50 L45 40 Q32 44 19 40 Z" fill="#FF6FB5" />
            {/* Bubbles */}
            <circle cx="28" cy="46" r="2.5" fill="#FFFFFF" />
            <circle cx="36" cy="48" r="2" fill="#FFFFFF" />
            <circle cx="33" cy="34" r="2.5" fill="#B8F23A" stroke={stroke} strokeWidth="1.5" />
            <circle cx="31" cy="26" r="2" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'science-atom':
        return (
          <g>
            {/* Nucleus */}
            <circle cx="32" cy="32" r="6" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="31" cy="31" r="1.5" fill="#FFFFFF" />
            {/* Orbits */}
            <ellipse cx="32" cy="32" rx="22" ry="8" fill="none" stroke="#6C2BD9" strokeWidth="3" transform="rotate(30 32 32)" />
            <circle cx="48" cy="41" r="3" fill="#B8F23A" stroke={stroke} strokeWidth="1.5" />
            <ellipse cx="32" cy="32" rx="22" ry="8" fill="none" stroke="#22C55E" strokeWidth="3" transform="rotate(-30 32 32)" />
            <circle cx="16" cy="41" r="3" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <ellipse cx="32" cy="32" rx="8" ry="22" fill="none" stroke="#FF6FB5" strokeWidth="3" />
            <circle cx="32" cy="10" r="3" fill="#6C2BD9" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'science-microscope':
        return (
          <g>
            {/* Base */}
            <rect x="14" y="50" width="36" height="6" rx="2" fill="#2A1048" />
            {/* Curved arm */}
            <path d="M42 50 C42 28 32 18 32 18" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" />
            {/* Barrel */}
            <rect x="22" y="14" width="10" height="24" rx="2" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} transform="rotate(-20 27 26)" />
            <circle cx="33" cy="11" r="3.5" fill="#FF3D5A" />
            {/* Stage */}
            <rect x="18" y="38" width="16" height="4" rx="1" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'science-rocket':
        return (
          <g>
            {/* Flame */}
            <polygon points="32,48 26,60 32,56 38,60" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <polygon points="32,48 28,56 32,54 36,56" fill="#FF3D5A" />
            {/* Fins */}
            <polygon points="20,38 12,50 22,46" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            <polygon points="44,38 52,50 42,46" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            {/* Fuselage */}
            <path
              d="M32 8 C22 20 20 38 20 48 L44 48 C44 38 42 20 32 8 Z"
              fill="#FFF4DC"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Porthole */}
            <circle cx="32" cy="26" r="5" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="26" r="3" fill="#22C55E" />
            <circle cx="31" cy="25" r="1" fill="#FFFFFF" />
          </g>
        );

      case 'science-magnet':
        return (
          <g>
            <path
              d="M16 16 L16 34 C16 44 48 44 48 34 L48 16 L38 16 L38 34 C38 38 26 38 26 34 L26 16 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Silver tips */}
            <rect x="16" y="14" width="10" height="8" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <rect x="38" y="14" width="10" height="8" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            {/* Sparks */}
            <path d="M21 8 L21 12 M43 8 L43 12" stroke="#FFC93C" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'science-lightbulb':
      case 'hint':
        return (
          <g>
            {/* Screw base */}
            <rect x="26" y="46" width="12" height="6" rx="2" fill="#2A1048" />
            <ellipse cx="32" cy="53" rx="4" ry="2" fill="#78350F" />
            {/* Glass bulb */}
            <path
              d="M32 10 C20 10 16 22 18 30 C20 36 24 40 24 46 L40 46 C40 40 44 36 46 30 C48 22 44 10 32 10 Z"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Filament */}
            <path d="M28 36 L30 26 L34 26 L36 36" fill="none" stroke="#FF3D5A" strokeWidth="2" />
            {/* Rays */}
            <line x1="32" y1="3" x2="32" y2="7" stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" />
            <line x1="12" y1="14" x2="15" y2="17" stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" />
            <line x1="52" y1="14" x2="49" y2="17" stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" />
            <circle cx="26" cy="18" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'science-planet':
        return (
          <g>
            {/* Planet Body */}
            <circle cx="32" cy="32" r="16" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="26" cy="26" rx="4" ry="2" fill="#FF6FB5" />
            {/* Saturn Ring */}
            <ellipse cx="32" cy="32" rx="26" ry="7" fill="none" stroke="#FFC93C" strokeWidth="5" transform="rotate(-25 32 32)" />
            <ellipse cx="32" cy="32" rx="26" ry="7" fill="none" stroke={stroke} strokeWidth="1.5" transform="rotate(-25 32 32)" />
            <circle cx="28" cy="24" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'science-dna':
        return (
          <g>
            {/* Double helix rungs */}
            <line x1="20" y1="16" x2="44" y2="24" stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="28" x2="44" y2="28" stroke="#B8F23A" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="40" x2="44" y2="32" stroke="#FF3D5A" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="48" x2="44" y2="48" stroke="#6C2BD9" strokeWidth="3" strokeLinecap="round" />
            {/* Strands */}
            <path d="M20 12 Q44 28 20 44 Q44 60 20 56" fill="none" stroke="#FF6FB5" strokeWidth="4" strokeLinecap="round" />
            <path d="M44 12 Q20 28 44 44 Q20 60 44 56" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
          </g>
        );

      case 'science-heart':
        return (
          <g>
            <path
              d="M32 20 C28 10 14 10 14 24 C14 36 28 46 32 52 C36 46 50 36 50 24 C50 10 36 10 32 20 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Aorta */}
            <path d="M26 14 L26 8 L32 8" fill="none" stroke="#6C2BD9" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="22" cy="24" r="2.5" fill="#FFFFFF" />
          </g>
        );

      case 'science-brain':
      case 'pet-brain':
        return (
          <g>
            {/* Left and right lobes */}
            <path
              d="M32 16 C22 12 12 20 14 32 C12 40 22 48 30 48 L32 48 L34 48 C42 48 52 40 50 32 C52 20 42 12 32 16 Z"
              fill="#FF6FB5"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <path d="M32 16 L32 48" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            {/* Convolutions */}
            <path d="M20 26 Q26 24 24 32 Q20 36 26 40" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M44 26 Q38 24 40 32 Q44 36 38 40" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
            {/* Small heart badge if pet-brain */}
            {name === 'pet-brain' && (
              <path d="M32 30 C30 26 26 26 26 29 C26 33 32 36 32 37 C32 36 38 33 38 29 C38 26 34 26 32 30 Z" fill="#FF3D5A" stroke={stroke} strokeWidth="1" />
            )}
          </g>
        );

      case 'science-lungs':
        return (
          <g>
            {/* Windpipe */}
            <path d="M32 10 L32 26" stroke="#FFC93C" strokeWidth="5" strokeLinecap="round" />
            {/* Left lung */}
            <path d="M30 26 Q14 26 14 38 Q14 52 28 50 Z" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Right lung */}
            <path d="M34 26 Q50 26 50 38 Q50 52 36 50 Z" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <circle cx="22" cy="38" r="2" fill="#FFFFFF" />
            <circle cx="42" cy="38" r="2" fill="#FFFFFF" />
          </g>
        );

      // ==================== DOMAINS & TOPICS: ENVIRONMENT ====================
      case 'domain-environment':
      case 'eco-tree':
        return (
          <g>
            {/* Trunk */}
            <rect x="28" y="38" width="8" height="18" rx="2" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Canopy foliage */}
            <circle cx="32" cy="26" r="16" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="22" cy="28" r="10" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="42" cy="28" r="10" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Golden fruits */}
            <circle cx="26" cy="22" r="3" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <circle cx="38" cy="24" r="3" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <circle cx="32" cy="32" r="3" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'eco-leaf':
        return (
          <g>
            {/* Leaf shape */}
            <path
              d="M16 48 C16 26 34 14 50 14 C50 30 38 48 16 48 Z"
              fill="#22C55E"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Main vein */}
            <line x1="16" y1="48" x2="48" y2="16" stroke="#B8F23A" strokeWidth="3" strokeLinecap="round" />
            <line x1="28" y1="36" x2="34" y2="40" stroke="#B8F23A" strokeWidth="2" strokeLinecap="round" />
            <line x1="36" y1="28" x2="42" y2="32" stroke="#B8F23A" strokeWidth="2" strokeLinecap="round" />
            <circle cx="38" cy="20" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'eco-water-drop':
        return (
          <g>
            <path
              d="M32 10 C32 10 14 30 14 40 C14 50 22 56 32 56 C42 56 50 50 50 40 C50 30 32 10 32 10 Z"
              fill="#22C55E"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Sparkle shine inside */}
            <path d="M22 36 Q20 44 26 48" fill="none" stroke="#B8F23A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="32" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'eco-recycle':
        return (
          <g>
            <rect x="16" y="24" width="32" height="32" rx="4" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <rect x="12" y="18" width="40" height="6" rx="2" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Chasing arrows */}
            <path d="M26 34 L32 30 L38 34" fill="none" stroke="#FFF4DC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 38 L32 44 L26 38" fill="none" stroke="#FFF4DC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'eco-sun':
        return (
          <g>
            {/* Core */}
            <circle cx="32" cy="32" r="14" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Smiling face */}
            <circle cx="27" cy="30" r="2" fill="#2A1048" />
            <circle cx="37" cy="30" r="2" fill="#2A1048" />
            <path d="M27 35 Q32 39 37 35" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            {/* Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="32"
                y1="12"
                x2="32"
                y2="6"
                stroke="#FF3D5A"
                strokeWidth="3.5"
                strokeLinecap="round"
                transform={`rotate(${angle} 32 32)`}
              />
            ))}
          </g>
        );

      case 'eco-wind-turbine':
        return (
          <g>
            {/* Tower */}
            <polygon points="30,32 34,32 36,54 28,54" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Nacelle hub */}
            <circle cx="32" cy="30" r="4.5" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            {/* Blades */}
            <line x1="32" y1="30" x2="32" y2="10" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
            <line x1="32" y1="30" x2="16" y2="40" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
            <line x1="32" y1="30" x2="48" y2="40" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
          </g>
        );

      case 'eco-globe':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            {/* Continents */}
            <path d="M22 22 Q30 18 34 26 Q32 34 24 32 Z" fill="#22C55E" stroke={stroke} strokeWidth="1.5" />
            <path d="M34 32 Q44 30 46 42 Q36 46 32 40 Z" fill="#B8F23A" stroke={stroke} strokeWidth="1.5" />
            <circle cx="20" cy="20" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'eco-fish':
        return (
          <g>
            <path d="M14 24 L24 34 L14 44 Z" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M22 34 C28 20 48 20 54 34 C48 48 28 48 22 34 Z" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="46" cy="30" r="2.5" fill="#2A1048" />
            <circle cx="45" cy="29" r="1" fill="#FFFFFF" />
          </g>
        );

      case 'eco-butterfly':
        return (
          <g>
            {/* Wings */}
            <path d="M32 32 C26 14 10 16 16 30 C12 36 16 46 32 36 Z" fill="#FF6FB5" stroke={stroke} strokeWidth="2.5" />
            <path d="M32 32 C38 14 54 16 48 30 C52 36 48 46 32 36 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2.5" />
            {/* Body */}
            <rect x="30" y="24" width="4" height="18" rx="2" fill="#6C2BD9" stroke={stroke} strokeWidth="1.5" />
            <circle cx="32" cy="22" r="2.5" fill="#6C2BD9" />
          </g>
        );

      case 'eco-cloud':
        return (
          <g>
            <path
              d="M20 44 L44 44 C48 44 52 40 50 34 C50 28 44 26 40 28 C38 20 26 20 24 28 C18 28 14 34 16 40 C16 42 18 44 20 44 Z"
              fill="#FFF4DC"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Raindrops */}
            <line x1="24" y1="48" x2="22" y2="54" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="32" y1="48" x2="30" y2="54" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="40" y1="48" x2="38" y2="54" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'eco-mountain':
        return (
          <g>
            <polygon points="12,50 32,18 52,50" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Snowcap */}
            <polygon points="26,28 32,18 38,28 35,26 32,30 29,26" fill="#FFF4DC" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            {/* Smaller peak */}
            <polygon points="34,50 44,30 54,50" fill="#B45309" stroke={stroke} strokeWidth="2" />
          </g>
        );

      // ==================== GAME & PROGRESS SYMBOLS ====================
      case 'coin':
        return (
          <g>
            <circle cx="32" cy="32" r="21" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="32" r="16" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 3" />
            {/* 5-point star */}
            <polygon
              points="32,20 34.5,27 42,27 36,32 38,40 32,35 26,40 28,32 22,27 29.5,27"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M20 20 Q24 16 32 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      case 'heart':
        return (
          <g>
            <path
              d="M32 18 C28 8 12 8 12 24 C12 36 28 48 32 52 C36 48 52 36 52 24 C52 8 36 8 32 18 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <circle cx="22" cy="20" r="2.5" fill="#FFFFFF" opacity="0.8" />
          </g>
        );

      case 'shield':
        return (
          <g>
            <path
              d="M16 16 L32 10 L48 16 C48 36 32 52 32 52 C32 52 16 36 16 16 Z"
              fill="#6C2BD9"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Emblem cross */}
            <path d="M32 20 L32 42 M24 28 L40 28" stroke="#B8F23A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="24" cy="20" r="2" fill="#FFFFFF" opacity="0.8" />
          </g>
        );

      case 'magnet':
        return (
          <g>
            <path
              d="M16 16 L16 34 C16 44 48 44 48 34 L48 16 L38 16 L38 34 C38 38 26 38 26 34 L26 16 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <rect x="16" y="14" width="10" height="8" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <rect x="38" y="14" width="10" height="8" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'double-coin':
        return (
          <g>
            <circle cx="26" cy="30" r="16" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="40" cy="34" r="16" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <text x="32" y="39" fontFamily="Fredoka, sans-serif" fontSize="16" fontWeight="900" fill="#FF3D5A">2x</text>
          </g>
        );

      case 'lightning':
      case 'stat-energy':
        return (
          <g>
            <polygon
              points="36,8 20,32 32,32 28,56 46,26 34,26"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <polygon points="34,14 24,31 32,31 30,46 41,28 33,28" fill="#FFFFFF" opacity="0.6" />
          </g>
        );

      case 'padlock':
        return (
          <g>
            {/* Shackle */}
            <path d="M22 28 L22 20 C22 14 42 14 42 20 L42 28" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
            {/* Body */}
            <rect x="16" y="28" width="32" height="26" rx="5" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="39" r="3" fill="#2A1048" />
            <line x1="32" y1="39" x2="32" y2="45" stroke="#2A1048" strokeWidth="2.5" />
          </g>
        );

      case 'padlock-open':
        return (
          <g>
            <path d="M22 24 L22 16 C22 10 42 10 42 16" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
            <rect x="16" y="28" width="32" height="26" rx="5" fill="#B8F23A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="39" r="3" fill="#2A1048" />
            <line x1="32" y1="39" x2="32" y2="45" stroke="#2A1048" strokeWidth="2.5" />
          </g>
        );

      case 'key':
        return (
          <g>
            <circle cx="22" cy="28" r="9" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="22" cy="28" r="4" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <rect x="30" y="26" width="22" height="4" rx="1" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <rect x="44" y="30" width="4" height="6" rx="1" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <rect x="49" y="30" width="3" height="4" rx="1" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'star':
        return (
          <g>
            <polygon
              points="32,10 37,24 52,24 40,34 44,48 32,39 20,48 24,34 12,24 27,24"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <polygon points="32,16 35,26 44,26 37,32 39,40 32,35 25,40 27,32 20,26 29,26" fill="#FFFFFF" opacity="0.6" />
          </g>
        );

      case 'star-empty':
        return (
          <g>
            <polygon
              points="32,10 37,24 52,24 40,34 44,48 32,39 20,48 24,34 12,24 27,24"
              fill="#FFF4DC"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              opacity="0.5"
            />
          </g>
        );

      case 'trophy':
      case 'nav-achievements':
        return (
          <g>
            {/* Cup */}
            <path d="M18 14 L46 14 L44 32 C44 40 36 44 32 44 C28 44 20 40 20 32 Z" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Handles */}
            <path d="M18 18 C10 18 10 30 18 30" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M46 18 C54 18 54 30 46 30" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            {/* Stem & base */}
            <rect x="29" y="44" width="6" height="6" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <rect x="20" y="50" width="24" height="6" rx="2" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} />
            <polygon points="32,22 34,26 38,26 35,29 36,33 32,30 28,33 29,29 26,26 30,26" fill="#FF3D5A" />
          </g>
        );

      case 'medal':
        return (
          <g>
            {/* Ribbon */}
            <polygon points="26,10 32,24 20,24" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
            <polygon points="38,10 44,24 32,24" fill="#6C2BD9" stroke={stroke} strokeWidth="2" />
            {/* Medal disc */}
            <circle cx="32" cy="38" r="14" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="38" r="10" fill="#FFC93C" stroke={stroke} strokeWidth="1.5" />
            <polygon points="32,30 34,35 39,35 35,38 37,43 32,40 27,43 29,38 25,35 30,35" fill="#FF3D5A" />
          </g>
        );

      case 'flame':
        return (
          <g>
            <path
              d="M32 10 C32 20 44 26 44 38 C44 48 38 54 32 54 C26 54 20 48 20 38 C20 28 28 24 32 10 Z"
              fill="#FF3D5A"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Yellow inner flame */}
            <path
              d="M32 26 C32 32 38 36 38 42 C38 47 35 50 32 50 C29 50 26 47 26 42 C26 36 30 34 32 26 Z"
              fill="#FFC93C"
            />
            <circle cx="32" cy="45" r="2.5" fill="#FFFFFF" />
          </g>
        );

      case 'checkpoint-flag':
      case 'finish-flag':
        return (
          <g>
            <line x1="18" y1="12" x2="18" y2="54" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
            {/* Checkered flag */}
            <path d="M18 12 L46 22 L18 32 Z" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <circle cx="30" cy="22" r="3" fill="#FFC93C" />
          </g>
        );

      // ==================== STATS ====================
      case 'stat-hunger':
        return (
          <g>
            <ellipse cx="32" cy="34" rx="16" ry="14" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M22 36 Q32 46 42 36" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="26" r="3" fill="#FFC93C" />
          </g>
        );

      case 'stat-happiness':
        return (
          <g>
            <path
              d="M32 18 C28 8 14 8 14 22 C14 34 28 44 32 48 C36 44 50 34 50 22 C50 8 36 8 32 18 Z"
              fill="#FF6FB5"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <circle cx="25" cy="22" r="2" fill="#2A1048" />
            <circle cx="39" cy="22" r="2" fill="#2A1048" />
            <path d="M26 28 Q32 34 38 28" stroke="#2A1048" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'stat-friendship':
        return (
          <g>
            <path
              d="M32 18 C28 8 14 8 14 22 C14 34 28 44 32 48 C36 44 50 34 50 22 C50 8 36 8 32 18 Z"
              fill="#FF6FB5"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Paw print inside */}
            <circle cx="32" cy="34" r="4" fill="#6C2BD9" />
            <circle cx="26" cy="27" r="2" fill="#6C2BD9" />
            <circle cx="32" cy="25" r="2" fill="#6C2BD9" />
            <circle cx="38" cy="27" r="2" fill="#6C2BD9" />
          </g>
        );

      // ==================== DIFFICULTY ====================
      case 'diff-easy':
        return (
          <g>
            <ellipse cx="32" cy="46" rx="14" ry="5" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M32 46 L32 28" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 28 Q22 18 16 24 Q24 34 32 28 Z" fill="#B8F23A" stroke={stroke} strokeWidth="2" />
            <path d="M32 28 Q42 18 48 24 Q40 34 32 28 Z" fill="#22C55E" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'diff-medium':
        return (
          <g>
            <path
              d="M32 12 C32 22 46 28 46 40 C46 50 38 54 32 54 C26 54 18 50 18 40 C18 28 28 24 32 12 Z"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <path
              d="M32 28 C32 34 38 38 38 44 C38 48 35 50 32 50 C29 50 26 48 26 44 C26 38 30 36 32 28 Z"
              fill="#FF3D5A"
            />
          </g>
        );

      case 'diff-hard':
        return (
          <g>
            {/* Volcano */}
            <polygon points="12,52 24,30 40,30 52,52" fill="#78350F" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Lava crater */}
            <ellipse cx="32" cy="30" rx="8" ry="3" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
            {/* Lightning bolt eruption */}
            <polygon points="34,8 26,24 33,24 30,34 40,20 33,20" fill="#FFC93C" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          </g>
        );

      // ==================== ACHIEVEMENTS ====================
      case 'ach-first-challenge':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="32" r="15" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="32" r="8" fill="#FF3D5A" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="32" r="3" fill="#FFC93C" />
          </g>
        );

      case 'ach-perfect-score':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <polygon
              points="32,14 36,25 48,25 38,32 42,44 32,37 22,44 26,32 16,25 28,25"
              fill="#FFC93C"
              stroke={stroke}
              strokeWidth="2"
            />
            <circle cx="32" cy="32" r="3" fill="#FF3D5A" />
          </g>
        );

      case 'ach-first-game':
        return (
          <g>
            <rect x="14" y="20" width="36" height="24" rx="8" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            {/* D-Pad */}
            <path d="M22 28 L26 28 M24 26 L24 30" stroke="#B8F23A" strokeWidth="3" strokeLinecap="round" />
            {/* Buttons */}
            <circle cx="38" cy="27" r="2" fill="#FF3D5A" />
            <circle cx="42" cy="31" r="2" fill="#FFC93C" />
          </g>
        );

      case 'ach-coin-collector':
        return (
          <g>
            <ellipse cx="32" cy="44" rx="16" ry="6" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="32" cy="34" rx="16" ry="6" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <ellipse cx="32" cy="24" rx="16" ry="6" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <polygon points="32,20 33.5,23 37,23 34,25 35,28 32,26 29,28 30,25 27,23 30.5,23" fill="#FF3D5A" />
          </g>
        );

      case 'ach-pet-friend':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="35" r="7" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <circle cx="22" cy="25" r="4" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="20" r="4" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            <circle cx="42" cy="25" r="4" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
          </g>
        );

      case 'ach-streak':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M32 14 C32 24 42 28 42 38 C42 46 36 50 32 50 C28 50 22 46 22 38 C22 30 28 26 32 14 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="42" r="3" fill="#FFFFFF" />
          </g>
        );

      case 'ach-explorer':
        return (
          <g>
            <circle cx="32" cy="32" r="22" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="32" r="16" fill="#FFF4DC" stroke={stroke} strokeWidth="2" />
            {/* Compass Needle */}
            <polygon points="32,18 36,32 32,30 28,32" fill="#FF3D5A" />
            <polygon points="32,46 36,32 32,34 28,32" fill="#6C2BD9" />
            <circle cx="32" cy="32" r="2.5" fill="#FFC93C" stroke={stroke} strokeWidth="1" />
          </g>
        );

      // ==================== LOGO & NAVIGATION ====================
      case 'logo-play-tales':
        return (
          <g>
            {/* Open storybook */}
            <path d="M8 44 C16 42 28 42 32 46 C36 42 48 42 56 44 L56 22 C48 20 36 20 32 24 C28 20 16 20 8 22 Z" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Inner book pages */}
            <path d="M10 24 C18 22 28 22 32 25 L32 43 C28 40 18 40 10 42 Z" fill="#FFF4DC" />
            <path d="M54 24 C46 22 36 22 32 25 L32 43 C36 40 46 40 54 42 Z" fill="#FFF4DC" />
            {/* Arcade controller hovering */}
            <rect x="20" y="8" width="24" height="15" rx="5" fill="#B8F23A" stroke={stroke} strokeWidth="2.5" />
            <line x1="25" y1="15" x2="29" y2="15" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <line x1="27" y1="13" x2="27" y2="17" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            <circle cx="37" cy="14" r="1.5" fill="#FF3D5A" />
            <circle cx="40" cy="17" r="1.5" fill="#FFC93C" />
          </g>
        );

      case 'nav-home':
        return (
          <g>
            {/* House */}
            <path d="M14 30 L32 14 L50 30 L50 48 Q50 50 48 50 L16 50 Q14 50 14 48 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {/* Chimney */}
            <rect x="38" y="14" width="6" height="12" fill="#78350F" stroke={stroke} strokeWidth="2" />
            {/* Door */}
            <rect x="27" y="34" width="10" height="16" rx="2" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <circle cx="34" cy="42" r="1.5" fill="#2A1048" />
          </g>
        );

      case 'nav-learn':
        return (
          <g>
            {/* Winding Map trail */}
            <rect x="12" y="14" width="40" height="38" rx="6" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M18 42 Q28 42 28 32 Q28 22 42 22" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 3" />
            {/* Flag at destination */}
            <line x1="42" y1="16" x2="42" y2="28" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="42,16 50,20 42,24" fill="#FF3D5A" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'nav-games':
        return (
          <g>
            <rect x="12" y="18" width="40" height="28" rx="10" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            {/* D-pad */}
            <path d="M22 28 L22 36 M18 32 L26 32" stroke="#B8F23A" strokeWidth="3" strokeLinecap="round" />
            {/* Buttons */}
            <circle cx="40" cy="28" r="2.5" fill="#FF3D5A" />
            <circle cx="44" cy="34" r="2.5" fill="#FFC93C" />
          </g>
        );

      case 'nav-pet':
        return (
          <g>
            <circle cx="32" cy="38" r="12" fill="#FF6FB5" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="20" cy="24" r="5" fill="#FF6FB5" stroke={stroke} strokeWidth="2.5" />
            <circle cx="32" cy="18" r="5.5" fill="#FF6FB5" stroke={stroke} strokeWidth="2.5" />
            <circle cx="44" cy="24" r="5" fill="#FF6FB5" stroke={stroke} strokeWidth="2.5" />
            <circle cx="32" cy="36" r="3" fill="#FFFFFF" opacity="0.6" />
          </g>
        );

      case 'nav-shop':
        return (
          <g>
            {/* Store awning */}
            <path d="M12 26 L16 16 L48 16 L52 26 Z" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <path d="M16 16 L20 26 M28 16 L30 26 M40 16 L40 26" stroke="#FFF4DC" strokeWidth="4" />
            {/* Stall frame */}
            <rect x="16" y="26" width="32" height="24" rx="2" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <rect x="22" y="34" width="20" height="16" rx="2" fill="#2A1048" />
          </g>
        );

      case 'nav-profile':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="24" cy="28" r="2.5" fill="#2A1048" />
            <circle cx="40" cy="28" r="2.5" fill="#2A1048" />
            <path d="M24 36 Q32 44 40 36" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <circle cx="18" cy="32" r="2" fill="#FF6FB5" opacity="0.8" />
            <circle cx="46" cy="32" r="2" fill="#FF6FB5" opacity="0.8" />
          </g>
        );

      // ==================== UTILITIES ====================
      case 'sound-on':
        return (
          <g>
            <path d="M14 26 L22 26 L30 18 L30 46 L22 38 L14 38 Z" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <path d="M36 24 Q42 32 36 40" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <path d="M42 18 Q50 32 42 46" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'sound-off':
        return (
          <g>
            <path d="M14 26 L22 26 L30 18 L30 46 L22 38 L14 38 Z" fill="#FFF4DC" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <line x1="36" y1="24" x2="48" y2="40" stroke="#FF3D5A" strokeWidth="4" strokeLinecap="round" />
            <line x1="48" y1="24" x2="36" y2="40" stroke="#FF3D5A" strokeWidth="4" strokeLinecap="round" />
          </g>
        );

      case 'ask-ai':
        return (
          <g>
            <path
              d="M14 20 Q14 14 22 14 L42 14 Q50 14 50 20 L50 36 Q50 42 42 42 L24 42 L16 48 L18 42 Q14 42 14 36 Z"
              fill="#6C2BD9"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Sparkle star */}
            <polygon points="32,22 33.5,26 38,26 34.5,29 36,33 32,30.5 28,33 29.5,29 26,26 30.5,26" fill="#B8F23A" />
          </g>
        );

      case 'retry':
        return (
          <g>
            <path d="M48 28 A18 18 0 1 0 50 36" fill="none" stroke="#FFC93C" strokeWidth="6" strokeLinecap="round" />
            <polygon points="46,16 54,26 42,26" fill="#FFC93C" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          </g>
        );

      case 'back':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M36 22 L26 32 L36 42" fill="none" stroke="#FFF4DC" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'close':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FF3D5A" stroke={stroke} strokeWidth={strokeWidth} />
            <line x1="24" y1="24" x2="40" y2="40" stroke="#FFF4DC" strokeWidth="5" strokeLinecap="round" />
            <line x1="40" y1="24" x2="24" y2="40" stroke="#FFF4DC" strokeWidth="5" strokeLinecap="round" />
          </g>
        );

      case 'share':
        return (
          <g>
            <circle cx="44" cy="20" r="6" fill="#6C2BD9" stroke={stroke} strokeWidth="2.5" />
            <circle cx="20" cy="32" r="6" fill="#B8F23A" stroke={stroke} strokeWidth="2.5" />
            <circle cx="44" cy="44" r="6" fill="#FFC93C" stroke={stroke} strokeWidth="2.5" />
            <line x1="24" y1="30" x2="40" y2="22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <line x1="24" y1="34" x2="40" y2="42" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'camera':
        return (
          <g>
            <rect x="12" y="22" width="40" height="30" rx="6" fill="#6C2BD9" stroke={stroke} strokeWidth={strokeWidth} />
            <path d="M22 22 L26 16 L38 16 L42 22 Z" fill="#FFC93C" stroke={stroke} strokeWidth="2" />
            <circle cx="32" cy="37" r="9" fill="#FFF4DC" stroke={stroke} strokeWidth="2.5" />
            <circle cx="32" cy="37" r="4.5" fill="#2A1048" />
            <circle cx="44" cy="27" r="1.5" fill="#FF3D5A" />
          </g>
        );

      case 'check':
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#22C55E" stroke={stroke} strokeWidth={strokeWidth} />
            <polyline points="22,33 29,40 43,24" fill="none" stroke="#FFF4DC" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'new-badge':
        return (
          <g>
            <polygon
              points="32,8 37,16 46,14 47,23 55,27 51,35 56,43 47,45 44,54 36,52 32,59 28,52 20,54 17,45 8,43 13,35 9,27 17,23 18,14 27,16"
              fill="#FF6FB5"
              stroke={stroke}
              strokeWidth="2.5"
            />
            <text x="32" y="37" fontFamily="Fredoka, sans-serif" fontSize="13" fontWeight="900" fill="#FFF4DC" textAnchor="middle">
              NEW
            </text>
          </g>
        );

      default:
        return (
          <g>
            <circle cx="32" cy="32" r="20" fill="#FFC93C" stroke={stroke} strokeWidth={strokeWidth} />
            <circle cx="32" cy="32" r="3" fill="#2A1048" />
          </g>
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none group transition-transform duration-150 ease-out hover:scale-110 active:scale-95 hover:rotate-3 ${className}`}
      style={{
        width: px,
        height: px,
      }}
      onClick={onClick}
      role="img"
      aria-label={label || String(name)}
      title={label || String(name)}
    >
      <svg
        viewBox="0 0 64 64"
        width={px}
        height={px}
        className={`w-full h-full filter drop-shadow-[2.5px_2.5px_0px_#2A1048] transition-all duration-150 ${
          silhouette ? 'brightness-0 opacity-40' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderGraphic()}
      </svg>
    </span>
  );
};
