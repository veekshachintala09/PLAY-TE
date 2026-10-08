import React from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useGame();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 animate-bounce pointer-events-none">
      <div className="bg-slate-900/95 border-2 border-amber-400 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs md:text-sm font-bold">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
