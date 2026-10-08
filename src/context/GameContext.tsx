import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CharacterConfig,
  PetStats,
  PetId,
  TopicItem,
  DomainId,
  DifficultyLevel,
  ViewType,
  AchievementItem,
  DailyQuest,
  ShopItem,
  AgentDecision,
  RevisionQuestItem,
} from '../types';
import { INITIAL_TOPICS } from '../data/curriculum';
import { INITIAL_ACHIEVEMENTS, INITIAL_DAILY_QUESTS } from '../data/achievements';
import { SHOP_ITEMS } from '../data/items';
import { sound } from '../utils/audio';

const STORAGE_KEY = 'play_tales_save_v1';

export const DEFAULT_AGENT_DECISION: AgentDecision = {
  decisionId: 'dec-init',
  timestamp: new Date().toISOString(),
  observedPattern: 'Learner shows fast pattern recognition and learns best through interactive code snippets.',
  nextAction: 'advance',
  teachingStyle: 'real-life example',
  difficultyAdjustment: 'same',
  learnerState: 'curious',
  miniGameAdjustment: {
    speed: 5.5,
    hazardDensity: 'balanced',
    coinMultiplier: 1.2,
  },
  petThought: 'Calibrating sensors: your logic speed is great! Let us venture through the adventure path.',
  nextStepsPlan: [
    'Explore your chosen realm on the winding adventure trail',
    'Score 3/5 on challenge quiz to unlock arcade runner and blitz games',
    'Earn coins to feed your companion in the Pet Sanctuary',
  ],
};

export const DEFAULT_CHARACTER: CharacterConfig = {
  name: 'Aiden',
  gender: 'adventurer',
  skinTone: '#FCD34D',
  hairStyle: 'short-spike',
  hairColor: '#451A03',
  eyeStyle: 'cheerful',
  outfitStyle: 'casual-tee',
  outfitColor: '#3B82F6',
  accessory: 'headphones',
};

export const PET_TEMPLATES: Record<PetId, { name: string; avatar: string; greeting: string }> = {
  dog: {
    name: 'Barnaby',
    avatar: '🐶',
    greeting: 'Woof! Ready for our next epic quest together?',
  },
  cat: {
    name: 'Luna',
    avatar: '🐱',
    greeting: 'Purr... Knowledge is the finest yarn ball to unravel!',
  },
  robot: {
    name: 'Sparky',
    avatar: '🤖',
    greeting: 'BEEP BOOP! Neural circuits calibrated for victory!',
  },
  dragon: {
    name: 'Draco',
    avatar: '🐉',
    greeting: 'Rrr-spark! Let’s ignite our minds with cool discoveries!',
  },
  fox: {
    name: 'Rusty',
    avatar: '🦊',
    greeting: 'Yip! I know a shortcut to collecting all the shiny coins!',
  },
  bunny: {
    name: 'Pip',
    avatar: '🐰',
    greeting: 'Hop hop! I have got quick paws and big ears ready for fun!',
  },
  panda: {
    name: 'Bao',
    avatar: '🐼',
    greeting: 'Zen breaths and crunchy snacks. We will solve every puzzle with peace!',
  },
};

interface GameContextType {
  // Navigation & View
  view: ViewType;
  setView: (view: ViewType) => void;
  activeDomain: DomainId;
  setActiveDomain: (domain: DomainId) => void;
  activeTopicId: string | null;
  setActiveTopicId: (topicId: string | null) => void;
  gameThemeToPlay: string;
  setGameThemeToPlay: (theme: string) => void;

  // Character
  character: CharacterConfig;
  setCharacter: (char: CharacterConfig) => void;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (val: boolean) => void;

  // Progression & Economy
  coins: number;
  addCoins: (amount: number, showToast?: boolean) => void;
  spendCoins: (amount: number) => boolean;
  playerLevel: number;
  playerXp: number;
  streakDays: number;
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;

  // Curriculum & Quizzes
  topics: TopicItem[];
  completeQuiz: (topicId: string, score: number) => { unlockedGame: boolean; earnedCoins: number };
  unlockedGamesCount: number;

  // Pet Companion
  pet: PetStats;
  ownedPets: PetId[];
  switchPet: (petId: PetId) => void;
  feedPet: (foodItem: ShopItem) => boolean;
  playWithPet: (toyItem: ShopItem) => boolean;
  equipPetAccessory: (accItem: ShopItem) => void;
  petSpeech: string;
  setPetSpeech: (text: string) => void;
  isPetHungryNotice: boolean;
  flyingFoodItem: string | null;
  setFlyingFoodItem: (val: string | null) => void;

  // Inventory & Shop
  inventory: Record<string, number>; // itemId -> quantity
  buyShopItem: (item: ShopItem) => boolean;

  // Achievements & Daily
  achievements: AchievementItem[];
  claimAchievement: (id: string) => void;
  dailyQuests: DailyQuest[];
  canClaimDailyReward: boolean;
  claimDailyReward: () => void;

  // Agentic AI & Revision
  currentDecision: AgentDecision;
  decisionLog: AgentDecision[];
  activeRevisionQuest: RevisionQuestItem | null;
  resolveRevisionQuest: (questId: string) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Reset
  resetAllProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [view, setView] = useState<ViewType>('home');
  const [activeDomain, setActiveDomain] = useState<DomainId>('programming');
  const [activeTopicId, setActiveTopicId] = useState<string | null>('py-lvl-1');
  const [gameThemeToPlay, setGameThemeToPlay] = useState<string>('cyber');

  // Character
  const [character, setCharacter] = useState<CharacterConfig>(DEFAULT_CHARACTER);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);

  // Economy & Level
  const [coins, setCoins] = useState<number>(100);
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [playerXp, setPlayerXp] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Curriculum Topics
  const [topics, setTopics] = useState<TopicItem[]>(INITIAL_TOPICS);
  const [questionsAnsweredTotal, setQuestionsAnsweredTotal] = useState<number>(0);

  // Pet System
  const [ownedPets, setOwnedPets] = useState<PetId[]>(['dog', 'cat', 'robot']);
  const [pet, setPet] = useState<PetStats>({
    id: 'dog',
    name: 'Barnaby',
    hunger: 80,
    happiness: 90,
    energy: 85,
    friendshipLevel: 1,
    friendshipXp: 20,
    mood: 'happy',
    freeHintAvailable: true,
  });
  const [petSpeech, setPetSpeech] = useState<string>(
    'Hey! Ready for your next adventure?'
  );
  const [isPetHungryNotice, setIsPetHungryNotice] = useState<boolean>(false);
  const [flyingFoodItem, setFlyingFoodItem] = useState<string | null>(null);

  // Agentic Cognition & Decisions
  const [currentDecision, setCurrentDecision] = useState<AgentDecision>(DEFAULT_AGENT_DECISION);
  const [decisionLog, setDecisionLog] = useState<AgentDecision[]>([DEFAULT_AGENT_DECISION]);
  const [activeRevisionQuest, setActiveRevisionQuest] = useState<RevisionQuestItem | null>(null);

  const resolveRevisionQuest = (questId: string) => {
    setActiveRevisionQuest(null);
    addCoins(80);
    showToast('Revision Quest Completed! +80 Coins ⭐');
  };

  // Inventory: itemId -> count
  const [inventory, setInventory] = useState<Record<string, number>>({
    'food-apple': 2,
    'food-cookie': 1,
  });

  // Achievements & Daily
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(INITIAL_DAILY_QUESTS);
  const [lastDailyClaim, setLastDailyClaim] = useState<string | null>(null);

  // UI Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      sound.enabled = !prev;
      return !prev;
    });
  };

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.character) setCharacter(parsed.character);
        if (typeof parsed.isFirstTimeUser === 'boolean') setIsFirstTimeUser(parsed.isFirstTimeUser);
        if (typeof parsed.coins === 'number') setCoins(parsed.coins);
        if (typeof parsed.playerLevel === 'number') setPlayerLevel(parsed.playerLevel);
        if (typeof parsed.playerXp === 'number') setPlayerXp(parsed.playerXp);
        if (typeof parsed.streakDays === 'number') setStreakDays(parsed.streakDays);
        if (parsed.difficulty) setDifficulty(parsed.difficulty);
        if (parsed.pet) setPet(parsed.pet);
        if (Array.isArray(parsed.ownedPets)) setOwnedPets(parsed.ownedPets);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (Array.isArray(parsed.achievements)) setAchievements(parsed.achievements);
        if (Array.isArray(parsed.dailyQuests)) setDailyQuests(parsed.dailyQuests);
        if (parsed.lastDailyClaim) setLastDailyClaim(parsed.lastDailyClaim);
        if (Array.isArray(parsed.topics)) setTopics(parsed.topics);
        if (typeof parsed.questionsAnsweredTotal === 'number')
          setQuestionsAnsweredTotal(parsed.questionsAnsweredTotal);
      }
    } catch (e) {
      console.warn('Failed to load local storage state:', e);
    }
  }, []);

  // Save state to localStorage on updates
  useEffect(() => {
    try {
      const stateToSave = {
        character,
        isFirstTimeUser,
        coins,
        playerLevel,
        playerXp,
        streakDays,
        difficulty,
        pet,
        ownedPets,
        inventory,
        achievements,
        dailyQuests,
        lastDailyClaim,
        topics,
        questionsAnsweredTotal,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save to local storage:', e);
    }
  }, [
    character,
    isFirstTimeUser,
    coins,
    playerLevel,
    playerXp,
    streakDays,
    difficulty,
    pet,
    ownedPets,
    inventory,
    achievements,
    dailyQuests,
    lastDailyClaim,
    topics,
    questionsAnsweredTotal,
  ]);

  // Check hunger alert based on questions answered
  useEffect(() => {
    if (questionsAnsweredTotal > 0 && questionsAnsweredTotal % 15 === 0) {
      setIsPetHungryNotice(true);
      setPetSpeech("I'm getting really hungry! Can we visit the shop for a snack?");
    }
  }, [questionsAnsweredTotal]);

  const addCoins = (amount: number, showToastAlert = true) => {
    setCoins((prev) => {
      const next = prev + amount;
      // Check coin collector achievement
      updateAchievementProgress('coin-collector', next);
      return next;
    });
    sound.playCoin();
    if (showToastAlert) {
      showToast(`+${amount} Coins Earned! 🪙`);
    }
  };

  const spendCoins = (amount: number): boolean => {
    if (coins < amount) {
      showToast('Not enough coins! Learn more to earn gold! 🪙');
      return false;
    }
    setCoins((prev) => prev - amount);
    return true;
  };

  const gainXp = (amount: number) => {
    setPlayerXp((prev) => {
      const next = prev + amount;
      const xpNeeded = playerLevel * 100;
      if (next >= xpNeeded) {
        setPlayerLevel((lvl) => {
          const newLvl = lvl + 1;
          showToast(`Level Up! You reached Level ${newLvl}! ⭐`);
          sound.playFanfare();
          return newLvl;
        });
        return next - xpNeeded;
      }
      return next;
    });
  };

  const updateAchievementProgress = (id: string, amountToAddOrCurrent: number, isDirectSet = false) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id !== id) return ach;
        const newProg = isDirectSet ? amountToAddOrCurrent : ach.currentProgress + amountToAddOrCurrent;
        const unlockedNow = !ach.unlocked && newProg >= ach.targetProgress;
        if (unlockedNow) {
          showToast(`🏆 Achievement Unlocked: ${ach.title}!`);
          sound.playFanfare();
        }
        return {
          ...ach,
          currentProgress: newProg,
          unlocked: ach.unlocked || unlockedNow,
        };
      })
    );
  };

  const completeQuiz = (topicId: string, score: number) => {
    const passed = score >= 3;
    const earnedCoins = passed ? (difficulty === 'hard' ? 90 : difficulty === 'medium' ? 70 : 50) + score * 10 : score * 5;

    // Track total questions answered
    setQuestionsAnsweredTotal((prev) => prev + 5);

    // Decay pet hunger slightly with mental effort
    setPet((prev) => ({
      ...prev,
      hunger: Math.max(10, prev.hunger - 10),
      happiness: passed ? Math.min(100, prev.happiness + 5) : prev.happiness,
    }));

    if (passed) {
      sound.playFanfare();
      addCoins(earnedCoins, false);
      gainXp(score * 20);

      // Unlock next topic in the domain
      setTopics((prev) => {
        const index = prev.findIndex((t) => t.id === topicId);
        if (index === -1) return prev;

        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          completed: true,
          bestScore: Math.max(updated[index].bestScore || 0, score),
        };

        // If next topic exists in same domain/subcategory, unlock it!
        if (index + 1 < updated.length && updated[index + 1].domain === updated[index].domain) {
          updated[index + 1] = {
            ...updated[index + 1],
            unlocked: true,
          };
        }
        return updated;
      });

      // Update achievements
      updateAchievementProgress('first-challenge', 1);
      if (score === 5) {
        updateAchievementProgress('perfect-score', 1);
      }
      updateDailyQuest('quest-quiz', 1);

      // Unique domains count
      const completedDomains = new Set(
        topics.filter((t) => t.completed || t.id === topicId).map((t) => t.domain)
      );
      updateAchievementProgress('realm-explorer', completedDomains.size, true);

      // Pet dialogue celebration
      const cheerMessages = [
        "Incredible job! You unlocked the realm game! Let's run!",
        "Brilliant thinking! High paws! Game unlocked!",
        "Calculations verified! Mini-game warp portal opened!",
      ];
      setPetSpeech(cheerMessages[Math.floor(Math.random() * cheerMessages.length)]);
    } else {
      sound.playIncorrect();
      addCoins(earnedCoins, false);
      setPetSpeech("Almost there! Review the magic tips and let's conquer it together!");
    }

    return { unlockedGame: passed, earnedCoins };
  };

  const updateDailyQuest = (id: string, amount: number) => {
    setDailyQuests((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const next = Math.min(q.target, q.progress + amount);
        const justFinished = !q.completed && next >= q.target;
        if (justFinished) {
          showToast(`Daily Quest Complete: ${q.title}! +${q.reward} coins`);
          addCoins(q.reward, false);
        }
        return {
          ...q,
          progress: next,
          completed: q.completed || justFinished,
        };
      })
    );
  };

  const switchPet = (petId: PetId) => {
    if (!ownedPets.includes(petId)) {
      showToast('Unlock this companion in the Pet Shop first!');
      return;
    }
    const template = PET_TEMPLATES[petId];
    setPet((prev) => ({
      ...prev,
      id: petId,
      name: template.name,
    }));
    setPetSpeech(template.greeting);
    sound.playPetReaction();
    showToast(`Switched companion to ${template.name}! ${template.avatar}`);
  };

  const feedPet = (foodItem: ShopItem): boolean => {
    const qty = inventory[foodItem.id] || 0;
    if (qty <= 0) {
      showToast(`You don't have any ${foodItem.name}! Get some at the Shop.`);
      return false;
    }

    setInventory((prev) => ({
      ...prev,
      [foodItem.id]: prev[foodItem.id] - 1,
    }));

    setPet((prev) => {
      const nextHunger = Math.min(100, prev.hunger + (foodItem.hungerBoost || 30));
      const nextHappiness = Math.min(100, prev.happiness + (foodItem.happinessBoost || 20));
      const nextEnergy = Math.min(100, prev.energy + (foodItem.energyBoost || 10));
      const nextXp = prev.friendshipXp + 25;
      let nextLevel = prev.friendshipLevel;
      if (nextXp >= nextLevel * 50) {
        nextLevel += 1;
        showToast(`${prev.name}'s Friendship reached Level ${nextLevel}! ❤️`);
      }
      return {
        ...prev,
        hunger: nextHunger,
        happiness: nextHappiness,
        energy: nextEnergy,
        friendshipXp: nextXp,
        friendshipLevel: nextLevel,
      };
    });

    setIsPetHungryNotice(false);
    sound.playPetReaction();
    updateAchievementProgress('pet-friend', 1);
    updateDailyQuest('quest-feed', 1);

    const happyPhrases = [
      `*Nom nom nom* Delicious ${foodItem.name}! Thank you! ❤️`,
      `YUM! My tummy is happy and full! Let's go learn!`,
      `Energy restored to maximum! You are the best friend ever!`,
    ];
    setPetSpeech(happyPhrases[Math.floor(Math.random() * happyPhrases.length)]);
    showToast(`Fed ${foodItem.name} to ${pet.name}!`);
    return true;
  };

  const playWithPet = (toyItem: ShopItem): boolean => {
    setPet((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + (toyItem.happinessBoost || 30)),
      energy: Math.max(10, prev.energy - 10),
      friendshipXp: prev.friendshipXp + 20,
    }));
    sound.playPetReaction();
    updateAchievementProgress('pet-friend', 1);
    setPetSpeech(`*Plays happily* Wheee! Playing with the ${toyItem.name} is so much fun!`);
    showToast(`Played with ${toyItem.name}! Happiness boosted! ✨`);
    return true;
  };

  const equipPetAccessory = (accItem: ShopItem) => {
    setPet((prev) => ({
      ...prev,
      equippedOutfit: accItem.id,
      happiness: Math.min(100, prev.happiness + 20),
    }));
    sound.playPetReaction();
    setPetSpeech(`Do you like my new ${accItem.name}? I look magnificent!`);
    showToast(`Equipped ${accItem.name} onto ${pet.name}!`);
  };

  const buyShopItem = (item: ShopItem): boolean => {
    if (coins < item.price) {
      showToast('Not enough coins! Complete quizzes to earn more gold!');
      return false;
    }

    if (item.category === 'pet' && item.petUnlockId) {
      if (ownedPets.includes(item.petUnlockId)) {
        showToast('You already adopted this companion!');
        return false;
      }
      setCoins((prev) => prev - item.price);
      setOwnedPets((prev) => [...prev, item.petUnlockId!]);
      sound.playFanfare();
      showToast(`Adopted ${item.name}! You can switch to them in the Pet room! 🎉`);
      return true;
    }

    setCoins((prev) => prev - item.price);
    setInventory((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    sound.playCoin();
    showToast(`Purchased ${item.name}! Added to your inventory.`);
    return true;
  };

  const claimAchievement = (id: string) => {
    const ach = achievements.find((a) => a.id === id);
    if (!ach || !ach.unlocked || ach.unlockedAt) return;

    addCoins(ach.rewardCoins);
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, unlockedAt: new Date().toISOString() } : a))
    );
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const canClaimDailyReward = lastDailyClaim !== todayStr;

  const claimDailyReward = () => {
    if (!canClaimDailyReward) {
      showToast('Already claimed today! Return tomorrow for more bonus coins.');
      return;
    }
    setLastDailyClaim(todayStr);
    addCoins(100);
    showToast('Daily Login Reward Claimed! +100 Coins 🎁');
  };

  const unlockedGamesCount = topics.filter((t) => t.completed && (t.bestScore || 0) >= 3).length;

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCharacter(DEFAULT_CHARACTER);
    setCoins(100);
    setPlayerLevel(1);
    setPlayerXp(0);
    setTopics(INITIAL_TOPICS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setDailyQuests(INITIAL_DAILY_QUESTS);
    setOwnedPets(['dog', 'cat', 'robot']);
    setPet({
      id: 'dog',
      name: 'Barnaby',
      hunger: 80,
      happiness: 90,
      energy: 85,
      friendshipLevel: 1,
      friendshipXp: 20,
      mood: 'happy',
      freeHintAvailable: true,
    });
    setInventory({ 'food-apple': 2, 'food-cookie': 1 });
    setIsFirstTimeUser(true);
    setView('home');
    showToast('Progress reset to default state.');
  };

  return (
    <GameContext.Provider
      value={{
        view,
        setView,
        activeDomain,
        setActiveDomain,
        activeTopicId,
        setActiveTopicId,
        gameThemeToPlay,
        setGameThemeToPlay,
        character,
        setCharacter,
        isFirstTimeUser,
        setIsFirstTimeUser,
        coins,
        addCoins,
        spendCoins,
        playerLevel,
        playerXp,
        streakDays,
        difficulty,
        setDifficulty,
        audioEnabled,
        toggleAudio,
        topics,
        completeQuiz,
        unlockedGamesCount,
        pet,
        ownedPets,
        switchPet,
        feedPet,
        playWithPet,
        equipPetAccessory,
        petSpeech,
        setPetSpeech,
        isPetHungryNotice,
        flyingFoodItem,
        setFlyingFoodItem,
        inventory,
        buyShopItem,
        achievements,
        claimAchievement,
        dailyQuests,
        canClaimDailyReward,
        claimDailyReward,
        currentDecision,
        decisionLog,
        activeRevisionQuest,
        resolveRevisionQuest,
        toastMessage,
        showToast,
        resetAllProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
