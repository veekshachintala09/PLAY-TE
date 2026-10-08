import React from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';

export const BottomNav: React.FC = () => {
  const { view, setView } = useGame();

  const items = [
    { id: 'home', label: 'Home', icon: 'nav-home' },
    { id: 'learn', label: 'Learn', icon: 'nav-learn' },
    { id: 'game', label: 'Games', icon: 'nav-games' },
    { id: 'pet', label: 'Pet', icon: 'nav-pet' },
    { id: 'shop', label: 'Shop', icon: 'nav-shop' },
    { id: 'profile', label: 'Hero', icon: 'nav-profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFF4DC] border-t-[3.5px] border-[#2A1048] px-2 py-1.5 flex items-center justify-around select-none shadow-[0_-4px_0px_rgba(42,16,72,0.1)]">
      {items.map((item) => {
        const isActive =
          view === item.id ||
          (item.id === 'learn' && (view === 'lesson' || view === 'quiz'));

        return (
          <button
            key={item.id}
            onClick={() => {
              sound.playCorrect();
              setView(item.id as any);
            }}
            className={`flex flex-col items-center justify-center p-1 rounded-xl transition cursor-pointer min-w-[50px] ${
              isActive
                ? 'bg-[#FFC93C] text-[#2A1048] border-[2px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                : 'text-[#2A1048] hover:bg-white/50 border-[2px] border-transparent'
            }`}
          >
            <Icon name={item.icon} size={22} />
            <span className="text-[10px] font-black mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
