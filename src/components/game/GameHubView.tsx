import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { RealmRunnerGame } from './RealmRunnerGame';
import { BrainBlitzGame } from './BrainBlitzGame';
import { Play, Zap, ArrowLeft } from 'lucide-react';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';

export const GameHubView: React.FC = () => {
  const { setView, topics, coins } = useGame();
  const [selectedGame, setSelectedGame] = useState<'runner' | 'blitz' | null>(null);

  if (selectedGame === 'runner') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 pt-2">
          <button
            onClick={() => setSelectedGame(null)}
            className="btn-squish px-3.5 py-1.5 rounded-xl bg-white border-[2.5px] border-[#2A1048] text-xs font-black text-[#2A1048] flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#2A1048]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Game Hub
          </button>
        </div>
        <RealmRunnerGame />
      </div>
    );
  }

  if (selectedGame === 'blitz') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 pt-2">
          <button
            onClick={() => setSelectedGame(null)}
            className="btn-squish px-3.5 py-1.5 rounded-xl bg-white border-[2.5px] border-[#2A1048] text-xs font-black text-[#2A1048] flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#2A1048]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Game Hub
          </button>
        </div>
        <BrainBlitzGame />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-[#6C2BD9] text-white border-[4px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <span className="absolute top-4 right-8 text-3xl font-black text-[#FFC93C] opacity-30 select-none">
          ✦ ✦
        </span>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-black uppercase text-[#2A1048] bg-[#B8F23A] px-3 py-1 rounded-full border-[2px] border-[#2A1048] inline-block mb-2 shadow-[2px_2px_0px_#2A1048]">
              Arcade Frontiers
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-black">
              Arcade Mini-Games
            </h1>
            <p className="text-xs md:text-sm font-bold text-white/90 mt-1 max-w-lg">
              Test your reflexes and rapid recall with your customized hero and pet companion! Earn shiny gold coins to spend in the Pet Shop.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#FFF4DC] border-[3px] border-[#2A1048] p-3 rounded-2xl text-[#2A1048] shadow-[3px_3px_0px_#2A1048]">
            <Icon name="coin" size={28} />
            <div>
              <span className="text-[10px] font-black uppercase block text-[#2A1048]/70">Wallet</span>
              <span className="text-lg font-black leading-tight">{coins} Coins</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Featured Games Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game 1: Realm Runner */}
        <div className="bg-white border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 flex flex-col justify-between tilt-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FF3D5A] text-white border-[2px] border-[#2A1048] text-[10px] font-black uppercase shadow-[2px_2px_0px_#2A1048]">
                Endless Platformer
              </span>
              <span className="text-xs font-black text-[#2A1048] bg-[#FFC93C] px-2.5 py-0.5 rounded-lg border-[1.5px] border-[#2A1048] flex items-center gap-1">
                <Icon name="star" size={14} /> 3 Lives
              </span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#FFC93C] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] flex items-center justify-center">
              <Icon name="ach-first-game" size={38} />
            </div>

            <div>
              <h2 className="font-heading text-2xl font-black text-[#2A1048]">
                Realm Runner: Tale of the Wayfarer
              </h2>
              <p className="text-xs font-bold text-[#2A1048]/80 mt-1 leading-relaxed">
                Run through dynamic biomes (Cyber, Space, Forest, Geometry). Jump over spikes, slide under lasers, grab magnets and shields, and answer checkpoint trivia!
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-black text-[#2A1048]">
              <span className="bg-[#FFF4DC] border-[1.5px] border-[#2A1048] px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Icon name="nav-games" size={14} /> Jump & Slide
              </span>
              <span className="bg-[#FFF4DC] border-[1.5px] border-[#2A1048] px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Icon name="magnet" size={14} /> Coin Magnet
              </span>
              <span className="bg-[#FFF4DC] border-[1.5px] border-[#2A1048] px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Icon name="shield" size={14} /> Energy Shield
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-[2px] border-[#2A1048]/15">
            <button
              onClick={() => {
                sound.playCorrect();
                setSelectedGame('runner');
              }}
              className="btn-squish w-full py-3.5 bg-[#B8F23A] text-[#2A1048] font-black text-sm rounded-2xl border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#cbf55c]"
            >
              <Play className="w-4 h-4 fill-[#2A1048]" /> Play Realm Runner
            </button>
          </div>
        </div>

        {/* Game 2: Brain Blitz */}
        <div className="bg-white border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 flex flex-col justify-between tilt-right">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#6C2BD9] text-white border-[2px] border-[#2A1048] text-[10px] font-black uppercase shadow-[2px_2px_0px_#2A1048]">
                Speed Logic Match
              </span>
              <span className="text-xs font-black text-[#2A1048] bg-[#B8F23A] px-2.5 py-0.5 rounded-lg border-[1.5px] border-[#2A1048] flex items-center gap-1">
                <Icon name="lightning" size={14} /> 45s Rush
              </span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#FF6FB5] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] flex items-center justify-center text-white">
              <Icon name="pet-brain" size={38} />
            </div>

            <div>
              <h2 className="font-heading text-2xl font-black text-[#2A1048]">
                Brain Blitz: Crystal Rune Rush
              </h2>
              <p className="text-xs font-bold text-[#2A1048]/80 mt-1 leading-relaxed">
                Cast spells with your hero and companion by rapidly matching domain glyphs, code tags, mathematical constants, and science elements before time runs out!
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-black text-[#2A1048]">
              <span className="bg-[#FFF4DC] border-[1.5px] border-[#2A1048] px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Icon name="flame" size={14} /> Combo Multipliers
              </span>
              <span className="bg-[#FFF4DC] border-[1.5px] border-[#2A1048] px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Icon name="tab-special" size={14} /> Hero Casting
              </span>
              <span className="bg-[#FFF4DC] border-[1.5px] border-[#2A1048] px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Icon name="coin" size={14} /> Instant Coins
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-[2px] border-[#2A1048]/15">
            <button
              onClick={() => {
                sound.playCorrect();
                setSelectedGame('blitz');
              }}
              className="btn-squish w-full py-3.5 bg-[#FFC93C] text-[#2A1048] font-black text-sm rounded-2xl border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#ffd55c]"
            >
              <Zap className="w-4 h-4 fill-[#2A1048]" /> Play Brain Blitz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
