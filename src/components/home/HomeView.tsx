import React, { useState } from 'react';
import { useGame, PET_TEMPLATES } from '../../context/GameContext';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { LiveAnimatedPet } from '../pet/LiveAnimatedPet';
import { PetsBrainModal } from '../pet/PetsBrainModal';
import {
  Compass,
  Play,
  Sparkles,
  Gamepad2,
  Trophy,
  Brain,
  ArrowRight,
  Flame,
  Award,
  Zap,
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';

export const HomeView: React.FC = () => {
  const {
    character,
    pet,
    petSpeech,
    playerLevel,
    playerXp,
    coins,
    streakDays,
    topics,
    unlockedGamesCount,
    setView,
    setActiveDomain,
    setGameThemeToPlay,
    currentDecision,
  } = useGame();

  const [isBrainOpen, setIsBrainOpen] = useState(false);

  const completedTopics = topics.filter((t) => t.completed).length;
  const petMeta = PET_TEMPLATES[pet.id];

  const handleStartAdventure = () => {
    sound.playFanfare();
    setView('learn');
  };

  const handleLaunchGame = (theme: string = 'cyber') => {
    sound.playCorrect();
    setGameThemeToPlay(theme);
    setView('game');
  };

  const domainsList = [
    {
      id: 'programming',
      name: 'Programming',
      tagline: 'Python, C, & Web Code Spells',
      color: '#6C2BD9', // Grape Purple
      accent: '#B8F23A', // Lime Pop
      iconName: 'domain-programming',
      doodle: '{ }',
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      tagline: 'Fractions, Algebra & Geometry',
      color: '#FF3D5A', // Hot Red
      accent: '#FFC93C', // Sunshine Yellow
      iconName: 'domain-mathematics',
      doodle: 'π',
    },
    {
      id: 'science',
      name: 'Science',
      tagline: 'Cosmos, Physics & Atomic Bonds',
      color: '#22C55E', // Leaf Green
      accent: '#FF6FB5', // Bubblegum Pink
      iconName: 'domain-science',
      doodle: '⚡',
    },
    {
      id: 'environment',
      name: 'Environment',
      tagline: 'Rainforests, Oceans & Clean Energy',
      color: '#22C55E', // Leaf Green
      accent: '#FFC93C', // Sunshine Yellow
      iconName: 'domain-environment',
      doodle: '🌱',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8 select-none">
      {/* HERO WELCOME BANNER (Bold Pop of Color: Grape Purple + Plum Outlines) */}
      <div className="relative rounded-3xl bg-[#6C2BD9] text-white border-[4px] border-[#2A1048] shadow-[8px_8px_0px_#2A1048] p-6 md:p-10 overflow-hidden">
        {/* Playful Doodles & Sparkles */}
        <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-[#B8F23A] border-[3px] border-[#2A1048] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full bg-[#FF6FB5] border-[3px] border-[#2A1048] opacity-20 pointer-events-none" />
        <span className="absolute top-4 right-8 text-2xl font-black text-[#FFC93C] select-none opacity-40">
          ✦ ✦
        </span>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Hero Text & Actions */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B8F23A] text-[#2A1048] border-[2.5px] border-[#2A1048] shadow-[2.5px_2.5px_0px_#2A1048] text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-[#2A1048]" />
              <span>AGENTIC LEARNING COMPANION</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-[2px_2px_0px_#2A1048]">
              PLAY TALES
            </h1>

            <p className="font-heading text-lg sm:text-xl font-bold text-[#FFC93C] max-w-xl">
              “An AI companion that learns how you learn.”
            </p>

            <p className="text-white/95 text-xs sm:text-sm font-bold max-w-lg leading-relaxed">
              Your living pet observes your curiosity, adapts quizzes to your pacing, explains its decisions, and unlocks arcade mini-games where you play with your customized hero!
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 justify-center md:justify-start">
              <button
                onClick={handleStartAdventure}
                className="btn-squish px-6 py-3.5 bg-[#B8F23A] text-[#2A1048] font-black text-sm rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#cbf55c]"
              >
                <Compass className="w-5 h-5 stroke-[2.5]" />
                START ADVENTURE
              </button>

              <button
                onClick={() => setView('learn')}
                className="btn-squish px-6 py-3.5 bg-[#FFC93C] text-[#2A1048] font-black text-sm rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#ffd55c]"
              >
                <Play className="w-4 h-4 fill-[#2A1048]" />
                CONTINUE ADVENTURE
              </button>

              {/* Observable AI Learner Model shortcut */}
              <button
                onClick={() => {
                  sound.playCorrect();
                  setIsBrainOpen(true);
                }}
                className="btn-squish px-4 py-3.5 bg-white text-[#2A1048] font-black text-xs rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#FFF4DC]"
              >
                <Brain className="w-4 h-4 text-[#6C2BD9]" />
                <span>Pet Notes on You</span>
              </button>
            </div>
          </div>

          {/* Right: Character & Animated Companion Showcase */}
          <div className="relative flex flex-col items-center shrink-0">
            {/* The Character & Pet Diorama Card (Warm Cream with Plum Outlines) */}
            <div className="relative w-64 h-64 bg-[#FFF4DC] rounded-3xl border-[4px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] flex items-center justify-center p-4">
              {/* Background circular halo */}
              <div className="absolute w-44 h-44 rounded-full bg-[#FF6FB5]/30 border-[2px] border-[#2A1048] pointer-events-none" />

              {/* Customized Avatar */}
              <div className="relative z-10 scale-105">
                <CharacterAvatar config={character} size="xl" action="idle" />
              </div>

              {/* Companion Pet floating beside player with live SVG animation & Mood Badge */}
              <div
                onClick={() => {
                  sound.playPetReaction();
                  setView('pet');
                }}
                className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-[#FFC93C] border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition z-20 group"
                title="Tap to visit Pet Sanctuary"
              >
                <div className="absolute -top-2 -left-2 z-30">
                  <Icon name={`mood-${pet.mood || 'happy'}`} size={20} />
                </div>
                <LiveAnimatedPet
                  type={pet.id}
                  mood={pet.mood || 'happy'}
                  size="sm"
                />
              </div>
            </div>

            {/* Pet Speech Greeting Bubble */}
            <div className="mt-3 bg-white border-[3px] border-[#2A1048] rounded-2xl px-4 py-2 max-w-xs text-center shadow-[3px_3px_0px_#2A1048] relative">
              <span className="text-[10px] uppercase font-black text-[#6C2BD9] block leading-none mb-1">
                {pet.name} says:
              </span>
              <p className="text-xs font-bold text-[#2A1048] italic leading-tight">
                "{petSpeech || 'Hey! Ready for your next adventure?'}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GAME-STYLE HUD & PROGRESS OVERVIEW (Hand-crafted Sticker Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Shiny Coins Counter */}
        <div
          onClick={() => {
            sound.playCorrect();
            setView('shop');
          }}
          className="bg-white border-[3.5px] border-[#2A1048] rounded-2xl p-4 shadow-[4px_4px_0px_#2A1048] flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 transition tilt-left"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FFC93C] border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center shrink-0">
            <Icon name="coin" size={28} />
          </div>
          <div>
            <span className="text-[10px] text-[#2A1048]/70 uppercase font-black block">Coins</span>
            <span className="text-xl font-black text-[#2A1048] leading-tight block">{coins}</span>
            <span className="text-[9px] font-bold text-[#6C2BD9]">Earn in Quizzes</span>
          </div>
        </div>

        {/* Level & XP Chunky Pill */}
        <div
          onClick={() => {
            sound.playCorrect();
            setView('profile');
          }}
          className="bg-white border-[3.5px] border-[#2A1048] rounded-2xl p-4 shadow-[4px_4px_0px_#2A1048] flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 transition tilt-right"
        >
          <div className="w-12 h-12 rounded-xl bg-[#B8F23A] border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center shrink-0">
            <Icon name="crown-progress" size={26} />
          </div>
          <div>
            <span className="text-[10px] text-[#2A1048]/70 uppercase font-black block">Hero Rank</span>
            <span className="text-xl font-black text-[#2A1048] leading-tight block">Level {playerLevel}</span>
            <span className="text-[9px] font-bold text-[#FF3D5A]">{playerXp} XP Progress</span>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="bg-white border-[3.5px] border-[#2A1048] rounded-2xl p-4 shadow-[4px_4px_0px_#2A1048] flex items-center gap-3 tilt-left">
          <div className="w-12 h-12 rounded-xl bg-[#FF3D5A] text-white border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center shrink-0">
            <Icon name="flame" size={26} />
          </div>
          <div>
            <span className="text-[10px] text-[#2A1048]/70 uppercase font-black block">Streak</span>
            <span className="text-xl font-black text-[#2A1048] leading-tight block">{streakDays} Day</span>
            <span className="text-[9px] font-bold text-[#22C55E]">Daily Spark On</span>
          </div>
        </div>

        {/* Lessons Mastered */}
        <div
          onClick={() => {
            sound.playCorrect();
            setView('learn');
          }}
          className="bg-white border-[3.5px] border-[#2A1048] rounded-2xl p-4 shadow-[4px_4px_0px_#2A1048] flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 transition tilt-right"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FF6FB5] text-white border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center shrink-0">
            <Icon name="medal" size={26} />
          </div>
          <div>
            <span className="text-[10px] text-[#2A1048]/70 uppercase font-black block">Lessons</span>
            <span className="text-xl font-black text-[#2A1048] leading-tight block">
              {completedTopics}/{topics.length}
            </span>
            <span className="text-[9px] font-bold text-[#6C2BD9]">All Domains Open</span>
          </div>
        </div>
      </div>

      {/* AGENTIC PET REASONING SPOTLIGHT (Observable AI Learner Model) */}
      <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 md:p-6 shadow-[6px_6px_0px_#2A1048] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#B8F23A] border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center shrink-0">
            <Icon name="pet-brain" size={28} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#6C2BD9] px-2 py-0.5 rounded-full border-[1.5px] border-[#2A1048]">
                Observable Learner Model
              </span>
              <span className="text-xs font-black text-[#2A1048]">
                {pet.name}'s Live Observations
              </span>
            </div>
            <p className="text-xs md:text-sm font-bold text-[#2A1048] leading-relaxed">
              "{currentDecision.observedPattern}"
            </p>
            <p className="text-[11px] font-black text-[#6C2BD9]">
              Adapts difficulty, pacing, and scaffolding to match your brain!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playCorrect();
            setIsBrainOpen(true);
          }}
          className="btn-squish px-4 py-2.5 bg-[#FFC93C] text-[#2A1048] text-xs font-black rounded-xl border-[2.5px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>Inspect Reasoning</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>

      {/* DOMAIN REALMS (Color Identity per Domain) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#2A1048] flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#FF3D5A]" />
              Four Boundless Realms
            </h2>
            <p className="text-xs font-bold text-[#2A1048]/75">
              Jump into any domain anytime. Each has its own colors, challenges, and arcade games!
            </p>
          </div>

          <button
            onClick={() => setView('learn')}
            className="text-xs font-black text-[#6C2BD9] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Winding Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domainsList.map((d, idx) => {
            const completedCount = topics.filter((t) => t.domain === d.id && t.completed).length;
            const totalCount = topics.filter((t) => t.domain === d.id).length;

            return (
              <div
                key={d.id}
                onClick={() => {
                  sound.playCorrect();
                  setActiveDomain(d.id as any);
                  setView('learn');
                }}
                className={`p-5 rounded-3xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] hover:shadow-[6px_6px_0px_#2A1048] hover:-translate-y-1 transition cursor-pointer flex flex-col justify-between ${
                  idx % 2 === 0 ? 'tilt-left' : 'tilt-right'
                }`}
                style={{ backgroundColor: d.color, color: '#FFFFFF' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-2xl border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center text-xl text-[#2A1048]"
                      style={{ backgroundColor: d.accent }}
                    >
                      <Icon name={d.iconName} size={32} />
                    </div>

                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full border-[1.5px] border-[#2A1048] text-[#2A1048]"
                      style={{ backgroundColor: d.accent }}
                    >
                      {completedCount}/{totalCount} Done
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-black text-white">{d.name}</h3>
                  <p className="text-xs font-bold text-white/90 mt-1 leading-snug">
                    {d.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t-[2px] border-white/20 flex items-center justify-between text-xs font-black">
                  <span>Explore Track →</span>
                  <span className="text-base">{d.doodle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MINI-GAMES HIGHLIGHT */}
      <div className="bg-[#B8F23A] border-[4px] border-[#2A1048] rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#2A1048] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF3D5A] text-white border-[2px] border-[#2A1048] text-[11px] font-black">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>PLAY WITH YOUR CUSTOM HERO</span>
          </div>
          <h3 className="font-heading text-3xl font-black text-[#2A1048]">
            Arcade Mini-Games Unlocked!
          </h3>
          <p className="text-xs md:text-sm font-bold text-[#2A1048]/85 max-w-lg leading-relaxed">
            Answer 3 out of 5 quiz questions correctly to unlock continuous action. Jump, slide, collect shiny coins, and pass knowledge checkpoints with your personalized character!
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => handleLaunchGame('cyber')}
            className="btn-squish px-6 py-3.5 bg-[#FFC93C] text-[#2A1048] font-black text-xs md:text-sm rounded-2xl border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer flex items-center gap-2 hover:bg-[#ffd55c]"
          >
            <Play className="w-4 h-4 fill-[#2A1048]" />
            Play Realm Runner
          </button>

          <button
            onClick={() => {
              sound.playCorrect();
              setView('game');
            }}
            className="btn-squish px-5 py-3.5 bg-white text-[#2A1048] font-black text-xs md:text-sm rounded-2xl border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer hover:bg-[#FFF4DC]"
          >
            All Arcade Games
          </button>
        </div>
      </div>

      {/* Pet Brain Modal */}
      <PetsBrainModal isOpen={isBrainOpen} onClose={() => setIsBrainOpen(false)} />
    </div>
  );
};
