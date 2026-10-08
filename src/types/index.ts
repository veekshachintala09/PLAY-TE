export type DomainId = 'programming' | 'mathematics' | 'science' | 'environment';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type ViewType =
  | 'home'
  | 'learn'
  | 'lesson'
  | 'quiz'
  | 'game'
  | 'pet'
  | 'shop'
  | 'achievements'
  | 'profile'
  | 'character-customizer'
  | 'revision-quest'
  | 'photo-creator';

export interface CharacterConfig {
  name: string;
  gender: 'adventurer' | 'hero' | 'explorer';
  skinTone: string; // hex
  hairStyle: 'short-spike' | 'curly-afro' | 'bob-cut' | 'wavy-long' | 'cap' | 'ponytail';
  hairColor: string; // hex
  hairLength?: 'short' | 'medium' | 'long';
  eyeStyle: 'cheerful' | 'focused' | 'star' | 'glasses';
  eyeColor?: string;
  glasses?: boolean;
  glassesStyle?: 'round' | 'square' | 'none';
  facialHair?: boolean;
  smileType?: 'wide' | 'gentle' | 'cool';
  outfitStyle: 'casual-tee' | 'hoodie' | 'wizard-robe' | 'space-suit' | 'explorer-vest';
  outfitColor: string; // hex (vivid: Grape Purple, Hot Red, Lime Pop, etc.)
  accessory: 'none' | 'headphones' | 'wizard-hat' | 'cape' | 'compass' | 'crown';
}

export type PetId = 'dog' | 'cat' | 'robot' | 'dragon' | 'fox' | 'bunny' | 'panda';

export type PetMood = 'happy' | 'curious' | 'worried' | 'sleepy' | 'proud' | 'excited';

export interface PetStats {
  id: PetId;
  name: string;
  hunger: number; // 0-100 (100 is full, 0 is starving)
  happiness: number; // 0-100
  energy: number; // 0-100
  friendshipLevel: number;
  friendshipXp: number;
  equippedOutfit?: string;
  mood: PetMood;
  freeHintAvailable: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  hint: string;
  explanation: string;
  conceptTag?: string;
}

export interface LessonContent {
  title: string;
  tagline: string;
  whatIsIt: string;
  whyItMatters: string;
  howItWorks: string;
  quickExample: string;
  rememberThis: string;
}

export type GameTheme = 'cyber' | 'geometry' | 'space' | 'forest' | 'ocean' | 'candy';

export type MasteryLevel = 'new' | 'learning' | 'strong' | 'mastered';

export interface TopicItem {
  id: string;
  domain: DomainId;
  subCategory: string; // e.g. "Python", "C", "JavaScript"
  level: number;
  title: string;
  shortDesc: string;
  gameTheme: GameTheme;
  unlocked: boolean;
  completed: boolean;
  bestScore?: number; // out of 5
  mastery: MasteryLevel;
  weakConcepts?: string[];
  iconName?: string;
  lesson: LessonContent;
  questions: QuizQuestion[];
}

export interface AgentDecision {
  decisionId: string;
  timestamp: string;
  observedPattern: string;
  nextAction: 'advance' | 'revision' | 'break';
  teachingStyle: 'analogy' | 'real-life example' | 'step-by-step' | 'story' | 'simple words';
  difficultyAdjustment: 'easier' | 'same' | 'harder';
  learnerState: 'frustrated' | 'bored' | 'confident' | 'curious';
  miniGameAdjustment: {
    speed: number;
    hazardDensity: 'gentle' | 'balanced' | 'challenging';
    coinMultiplier: number;
  };
  petThought: string;
  nextStepsPlan: string[];
}

export interface RevisionQuestItem {
  id: string;
  topicId: string;
  topicTitle: string;
  domain: DomainId;
  conceptName: string;
  dueDate: string; // ISO string
  questions: QuizQuestion[];
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'food' | 'toy' | 'wear' | 'home' | 'special' | 'accessory' | 'pet';
  price: number;
  description: string;
  icon?: string;
  iconSvg?: string; // inline SVG identifier or emoji
  iconName?: string;
  levelRequired?: number;
  isNew?: boolean;
  hungerBoost?: number;
  happinessBoost?: number;
  energyBoost?: number;
  petUnlockId?: PetId;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconName?: string;
  currentProgress: number;
  targetProgress: number;
  unlocked: boolean;
  rewardCoins: number;
  unlockedAt?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  reward: number;
  progress: number;
  target: number;
  completed: boolean;
}
