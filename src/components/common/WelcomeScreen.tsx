import React from 'react';
import { AppLogo } from './AppLogo';
import { sound } from '../../utils/audio';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface WelcomeScreenProps {
  onContinue: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onContinue,
  isModal = false,
  onClose,
}) => {
  const { pet } = useGame();

  const handleStart = () => {
    sound.playFanfare();
    onContinue();
  };

  const content = (
    <div className="w-full max-w-xl mx-auto text-center px-4 py-8 select-none flex flex-col items-center">
      {/* Badge Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8F23A] text-[#2A1048] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] text-xs font-black mb-6 uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-[#2A1048]" />
        <span>Agentic AI Learning Companion</span>
      </div>

      {/* Official App Logo Emblem: 160-220px, gentle bounce pop-in + floating motion + living star twinkle & sun glow */}
      <div className="relative mb-6 animate-pop-bounce">
        {/* Soft yellow ambient backdrop ring for clean palette separation */}
        <div className="absolute inset-0 -m-3 rounded-full bg-[#FFDE59]/25 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <AppLogo
            size="hero"
            withEffects={true}
            animated={true}
            alt="Play Tales circular emblem logo"
          />
        </div>
      </div>

      {/* Main Title & Tagline */}
      <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#2A1048] tracking-tight leading-none mb-3 drop-shadow-[2px_2px_0px_rgba(255,201,60,0.8)]">
        Play Tales
      </h1>

      <p className="font-heading text-lg sm:text-xl font-bold text-[#6C2BD9] max-w-md mx-auto mb-4 leading-snug">
        “An AI companion that learns how you learn.”
      </p>

      <p className="text-sm md:text-base font-bold text-[#2A1048]/85 max-w-lg mx-auto mb-8 leading-relaxed">
        Step into an enchanted realm where your pet learns your strengths, crafts adaptive quests, and turns coding, math, science, and the environment into playful arcade adventures.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <button
          onClick={handleStart}
          className="btn-squish w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#B8F23A] text-[#2A1048] font-black text-base border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer hover:bg-[#c6f84c]"
        >
          <Compass className="w-5 h-5 stroke-[2.5]" />
          <span>BEGIN ADVENTURE</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="btn-squish w-full sm:w-auto px-6 py-4 rounded-2xl bg-white text-[#2A1048] font-black text-sm border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer hover:bg-[#FFF4DC]"
          >
            Close
          </button>
        )}
      </div>

      {/* Pet greeting message */}
      <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border-[2.5px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048]">
        <span className="text-xl">🐾</span>
        <span className="text-xs font-black text-[#2A1048]">
          {pet.name} is waiting at the castle gates!
        </span>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A1048]/70 backdrop-blur-sm p-4 overflow-y-auto">
        <div className="relative bg-[#FFF4DC] border-[4px] border-[#2A1048] rounded-3xl shadow-[8px_8px_0px_#2A1048] w-full max-w-2xl my-auto animate-pop-bounce overflow-hidden">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white border-[2.5px] border-[#2A1048] font-black text-sm flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_#2A1048] hover:bg-[#FF3D5A] hover:text-white"
            >
              ✕
            </button>
          )}
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#2A1048] flex flex-col items-center justify-center py-10">
      {content}
    </div>
  );
};
