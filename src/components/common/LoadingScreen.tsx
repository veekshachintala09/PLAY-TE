import React, { useState, useEffect } from 'react';
import { AppLogo } from './AppLogo';
import { useGame } from '../../context/GameContext';

interface LoadingScreenProps {
  message?: string;
  onFinish?: () => void;
  minDurationMs?: number;
  fullScreen?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  onFinish,
  minDurationMs = 1200,
  fullScreen = true,
}) => {
  const { pet } = useGame();

  const playfulMessages = [
    `${pet.name} is sniffing out fresh realm puzzles...`,
    `Tuning up the code spells and energy crystals...`,
    `Packing snacks and preparing your learning quest...`,
    `Sharpening pencils and aligning math stars...`,
    `Observing your curiosity and setting up challenges...`,
  ];

  const [activeMessageIndex, setActiveMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % playfulMessages.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [playfulMessages.length]);

  useEffect(() => {
    if (onFinish && minDurationMs > 0) {
      const finishTimer = setTimeout(() => {
        onFinish();
      }, minDurationMs);
      return () => clearTimeout(finishTimer);
    }
  }, [onFinish, minDurationMs]);

  const activeMsg = message || playfulMessages[activeMessageIndex];

  const content = (
    <div className="flex flex-col items-center justify-center p-8 select-none text-center max-w-md mx-auto">
      {/* Loading Mark: Official Logo with rotating/pulsing glow */}
      <div className="relative mb-6">
        {/* Rotating outer radiant glow halo */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#6C2BD9]/30 via-[#FFDE59]/50 to-[#FF3D5A]/30 blur-lg animate-glow-spin pointer-events-none" />

        {/* Soft pulsing aura */}
        <div className="absolute -inset-2 rounded-full bg-[#FFDE59]/40 blur-md animate-sun-pulse pointer-events-none" />

        {/* App Logo Emblem */}
        <div className="relative z-10">
          <AppLogo
            size="xl"
            withEffects={true}
            animated={true}
            alt="Play Tales loading emblem"
          />
        </div>
      </div>

      {/* Brand title */}
      <h3 className="font-heading text-2xl font-black text-[#2A1048] tracking-tight mb-2">
        PLAY TALES
      </h3>

      {/* Pet's playful loading message below it */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-[2.5px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] mb-4">
        <span className="text-base animate-bounce">🐾</span>
        <p className="text-xs sm:text-sm font-black text-[#2A1048] animate-pulse">
          {activeMsg}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6C2BD9] border-[1.5px] border-[#2A1048] animate-ping" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#B8F23A] border-[1.5px] border-[#2A1048] animate-ping [animation-delay:200ms]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFC93C] border-[1.5px] border-[#2A1048] animate-ping [animation-delay:400ms]" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF4DC] text-[#2A1048]">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full py-12 flex items-center justify-center bg-[#FFF4DC]/80 rounded-3xl border-[3px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048]">
      {content}
    </div>
  );
};
