import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../utils/audio';
import { PetsBrainModal } from '../pet/PetsBrainModal';
import { Icon } from '../common/Icon';
import { AppLogo } from '../common/AppLogo';
import { Volume2, VolumeX } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    view,
    setView,
    coins,
    playerLevel,
    character,
    audioEnabled,
    toggleAudio,
    pet,
  } = useGame();

  const [isBrainOpen, setIsBrainOpen] = useState(false);

  const navLinks: { id: typeof view; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'nav-home' },
    { id: 'learn', label: 'Learn', icon: 'nav-learn' },
    { id: 'game', label: 'Games', icon: 'nav-games' },
    { id: 'pet', label: 'Pet', icon: 'nav-pet' },
    { id: 'shop', label: 'Shop', icon: 'nav-shop' },
    { id: 'achievements', label: 'Bounties', icon: 'nav-achievements' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FFF4DC] border-b-[3.5px] border-[#2A1048] px-3 md:px-8 py-2 select-none shadow-[0_4px_0px_rgba(42,16,72,0.12)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-3">
          {/* Zone 1: Official App Logo Emblem & Wordmark */}
          <button
            onClick={() => {
              sound.playCorrect();
              setView('home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Return to Play Tales Home"
          >
            <AppLogo size="header" className="group-hover:scale-105 group-hover:rotate-3 transition-transform" />
            <div className="text-left hidden xs:block">
              <span className="font-heading text-xl md:text-2xl font-black text-[#2A1048] tracking-tight block leading-none">
                Play Tales
              </span>
              <span className="text-[10px] font-black uppercase text-[#6C2BD9] tracking-wider block mt-0.5">
                AGENTIC ADVENTURE
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links with Inline Icons */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white border-[2.5px] border-[#2A1048] p-1 rounded-2xl shadow-[2.5px_2.5px_0px_#2A1048]">
            {navLinks.map((link) => {
              const isActive =
                view === link.id ||
                (link.id === 'learn' && (view === 'lesson' || view === 'quiz'));

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    sound.playCorrect();
                    setView(link.id);
                  }}
                  className={`btn-squish flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FFC93C] text-[#2A1048] border-[2px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                      : 'text-[#2A1048] hover:bg-[#FFF4DC] border-[2px] border-transparent'
                  }`}
                >
                  <Icon name={link.icon} size={18} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Pet Companion Badge, Coins, Brain, Sound, Hero) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Active Pet Picture & Mood Badge */}
            <button
              onClick={() => {
                sound.playPetReaction();
                setView('pet');
              }}
              className="btn-squish flex items-center gap-1.5 px-2.5 py-1 bg-white border-[2.5px] border-[#2A1048] rounded-xl shadow-[2px_2px_0px_#2A1048] cursor-pointer hover:bg-[#FFF4DC]"
              title={`Active Companion: ${pet.name} (${pet.mood || 'happy'})`}
            >
              <Icon name={`pet-${pet.id}`} size={24} />
              <div className="hidden lg:flex flex-col text-left leading-none">
                <span className="text-[11px] font-black text-[#2A1048]">{pet.name}</span>
                <span className="text-[9px] font-bold text-[#6C2BD9]">Friendship Lv.{pet.friendshipLevel}</span>
              </div>
              <Icon name={`mood-${pet.mood || 'happy'}`} size={18} />
            </button>

            {/* Agentic Pet Brain Modal Button */}
            <button
              onClick={() => {
                sound.playCorrect();
                setIsBrainOpen(true);
              }}
              className="btn-squish flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#B8F23A] border-[2.5px] border-[#2A1048] text-[#2A1048] text-xs font-black shadow-[2px_2px_0px_#2A1048] cursor-pointer"
              title="Open Pet's Learner Brain & Thought Logs"
            >
              <Icon name="pet-brain" size={18} />
              <span className="hidden sm:inline">Pet Notes</span>
            </button>

            {/* Shiny Coins Badge */}
            <button
              onClick={() => {
                sound.playCorrect();
                setView('shop');
              }}
              className="btn-squish flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FFC93C] border-[2.5px] border-[#2A1048] text-[#2A1048] text-xs font-black shadow-[2px_2px_0px_#2A1048] cursor-pointer"
              title="Pet Emporium & Shop"
            >
              <Icon name="coin" size={18} />
              <span>{coins}</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleAudio}
              className="btn-squish w-8 h-8 rounded-xl bg-white border-[2.5px] border-[#2A1048] flex items-center justify-center text-[#2A1048] shadow-[2px_2px_0px_#2A1048] cursor-pointer"
              title={audioEnabled ? 'Mute Audio' : 'Enable Audio'}
            >
              {audioEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#22C55E]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#FF3D5A]" />
              )}
            </button>

            {/* Player Profile Avatar Button */}
            <button
              onClick={() => {
                sound.playCorrect();
                setView('profile');
              }}
              className={`btn-squish flex items-center gap-1.5 p-1 pr-2 rounded-xl border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] cursor-pointer ${
                view === 'profile'
                  ? 'bg-[#FF6FB5] text-white'
                  : 'bg-white text-[#2A1048]'
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-[#FFF4DC] border-[1.5px] border-[#2A1048] flex items-center justify-center overflow-hidden">
                <CharacterAvatar config={character} size="xs" action="idle" />
              </div>
              <span className="text-xs font-black hidden sm:inline">
                Lv.{playerLevel}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Pet's Cognitive Brain & Learner Model */}
      <PetsBrainModal isOpen={isBrainOpen} onClose={() => setIsBrainOpen(false)} />
    </>
  );
};
