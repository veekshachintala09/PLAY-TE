import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { LiveAnimatedPet } from '../pet/LiveAnimatedPet';
import { ArrowLeft, Play, RotateCcw, Sparkles, Trophy, Zap, Shield, Heart } from 'lucide-react';
import { Icon } from '../common/Icon';

interface Tile {
  id: number;
  symbol: string;
  label: string;
  color: string;
  matched: boolean;
}

export const BrainBlitzGame: React.FC = () => {
  const {
    character,
    pet,
    addCoins,
    setView,
    activeDomain,
  } = useGame();

  const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'GAMEOVER'>('READY');
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [combo, setCombo] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [charAction, setCharAction] = useState<'idle' | 'running' | 'jumping' | 'celebrate'>('idle');

  // Domain symbols for runes
  const getDomainSymbols = () => {
    switch (activeDomain) {
      case 'mathematics':
        return [
          { symbol: 'π', label: 'Pi', color: '#FF3D5A' },
          { symbol: '∑', label: 'Sum', color: '#FFC93C' },
          { symbol: '√', label: 'Root', color: '#6C2BD9' },
          { symbol: '∞', label: 'Infinity', color: '#22C55E' },
          { symbol: 'Δ', label: 'Delta', color: '#FF6FB5' },
          { symbol: 'θ', label: 'Theta', color: '#B8F23A' },
        ];
      case 'science':
        return [
          { symbol: '⚡', label: 'Energy', color: '#FFC93C' },
          { symbol: '⚛️', label: 'Atom', color: '#6C2BD9' },
          { symbol: '🧬', label: 'DNA', color: '#FF6FB5' },
          { symbol: '🧲', label: 'Magnet', color: '#FF3D5A' },
          { symbol: '🧪', label: 'Flask', color: '#22C55E' },
          { symbol: '🪐', label: 'Planet', color: '#B8F23A' },
        ];
      case 'environment':
        return [
          { symbol: '🌱', label: 'Sprout', color: '#22C55E' },
          { symbol: '🌊', label: 'Ocean', color: '#6C2BD9' },
          { symbol: '☀️', label: 'Solar', color: '#FFC93C' },
          { symbol: '💨', label: 'Wind', color: '#B8F23A' },
          { symbol: '♻️', label: 'Cycle', color: '#FF6FB5' },
          { symbol: '🌳', label: 'Canopy', color: '#FF3D5A' },
        ];
      case 'programming':
      default:
        return [
          { symbol: '{ }', label: 'Block', color: '#6C2BD9' },
          { symbol: 'def', label: 'Function', color: '#B8F23A' },
          { symbol: 'for', label: 'Loop', color: '#FF3D5A' },
          { symbol: 'if', label: 'Branch', color: '#FFC93C' },
          { symbol: '==', label: 'Equals', color: '#FF6FB5' },
          { symbol: '[]', label: 'Array', color: '#22C55E' },
        ];
    }
  };

  const startNewGame = () => {
    const symbols = getDomainSymbols();
    // Create 12 tiles (6 pairs)
    const deck: Tile[] = [];
    let idCounter = 1;
    symbols.forEach((sym) => {
      deck.push({ id: idCounter++, symbol: sym.symbol, label: sym.label, color: sym.color, matched: false });
      deck.push({ id: idCounter++, symbol: sym.symbol, label: sym.label, color: sym.color, matched: false });
    });
    // Shuffle
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setSelectedTiles([]);
    setScore(0);
    setCoinsEarned(0);
    setCombo(0);
    setTimeLeft(45);
    setGameState('PLAYING');
    sound.playFanfare();
  };

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'PLAYING') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('GAMEOVER');
            sound.playFanfare();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const handleTileClick = (tileId: number) => {
    if (gameState !== 'PLAYING' || selectedTiles.length >= 2) return;
    const tile = tiles.find((t) => t.id === tileId);
    if (!tile || tile.matched || selectedTiles.includes(tileId)) return;

    sound.playPetReaction();
    const newSelected = [...selectedTiles, tileId];
    setSelectedTiles(newSelected);

    if (newSelected.length === 2) {
      const first = tiles.find((t) => t.id === newSelected[0]);
      const second = tiles.find((t) => t.id === newSelected[1]);

      if (first && second && first.label === second.label) {
        // MATCH!
        sound.playCorrect();
        setCharAction('jumping');
        setTimeout(() => setCharAction('idle'), 600);

        setTiles((prev) =>
          prev.map((t) => (t.id === first.id || t.id === second.id ? { ...t, matched: true } : t))
        );
        setSelectedTiles([]);

        const matchScore = 150 + combo * 50;
        setScore((prev) => prev + matchScore);
        const coins = 10 + combo * 5;
        setCoinsEarned((prev) => prev + coins);
        addCoins(coins, false);
        setCombo((prev) => prev + 1);

        // Check if all matched
        const remaining = tiles.filter(
          (t) => !t.matched && t.id !== first.id && t.id !== second.id
        ).length;
        if (remaining === 0) {
          // Bonus round refill!
          setTimeout(() => {
            startNewGame();
          }, 800);
        }
      } else {
        // Mismatch
        sound.playIncorrect();
        setCombo(0);
        setTimeout(() => {
          setSelectedTiles([]);
        }, 700);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView('game')}
          className="btn-squish px-3.5 py-1.5 rounded-xl bg-white border-[2.5px] border-[#2A1048] text-xs font-black text-[#2A1048] flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#2A1048]"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Arcade Hub
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-[#FFC93C] border-[2px] border-[#2A1048] text-xs font-black text-[#2A1048] shadow-[2px_2px_0px_#2A1048]">
            🪙 +{coinsEarned} Coins
          </span>
          <span className="px-3 py-1 rounded-xl bg-[#B8F23A] border-[2px] border-[#2A1048] text-xs font-black text-[#2A1048] shadow-[2px_2px_0px_#2A1048]">
            ⏱️ {timeLeft}s Left
          </span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="bg-[#6C2BD9] border-[4px] border-[#2A1048] shadow-[8px_8px_0px_#2A1048] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Left: Player Hero & Pet Companion cheering */}
          <div className="flex flex-col items-center bg-[#FFF4DC] border-[3.5px] border-[#2A1048] rounded-3xl p-5 shadow-[4px_4px_0px_#2A1048] shrink-0 text-center">
            <span className="text-[10px] font-black uppercase text-[#6C2BD9] bg-[#B8F23A] px-2 py-0.5 rounded-full border-[1.5px] border-[#2A1048] mb-2">
              Rune Caster
            </span>
            <div className="w-32 h-36 flex items-center justify-center">
              <CharacterAvatar config={character} size="lg" action={charAction} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFC93C] border-[2px] border-[#2A1048] flex items-center justify-center">
                <LiveAnimatedPet type={pet.id} size="sm" />
              </div>
              <div className="text-left text-[#2A1048]">
                <span className="text-[10px] font-black uppercase block">{character.name}</span>
                <span className="text-xs font-black text-[#FF3D5A]">Score: {score}</span>
              </div>
            </div>
          </div>

          {/* Right: Rune Grid or Ready Screen */}
          <div className="flex-1 w-full">
            {gameState === 'READY' && (
              <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 text-center space-y-4 shadow-[4px_4px_0px_#2A1048] text-[#2A1048]">
                <div className="w-16 h-16 rounded-2xl bg-[#FFC93C] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] mx-auto flex items-center justify-center text-3xl">
                  ⚡
                </div>
                <h3 className="font-heading text-2xl font-black">
                  Brain Blitz: Rune Rush
                </h3>
                <p className="text-xs font-bold text-[#2A1048]/75 max-w-sm mx-auto">
                  Match the magical domain glyphs before time expires! Keep high combos to multiply your score and earn coin rewards.
                </p>
                <button
                  onClick={startNewGame}
                  className="btn-squish px-8 py-3.5 bg-[#B8F23A] text-[#2A1048] font-black text-sm rounded-2xl border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-[#2A1048]" /> Start Blitz!
                </button>
              </div>
            )}

            {gameState === 'PLAYING' && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {tiles.map((tile) => {
                  const isSelected = selectedTiles.includes(tile.id);
                  const isMatched = tile.matched;

                  return (
                    <button
                      key={tile.id}
                      onClick={() => handleTileClick(tile.id)}
                      disabled={isMatched}
                      className={`h-20 rounded-2xl border-[3px] border-[#2A1048] font-black text-sm transition-all flex flex-col items-center justify-center p-1 cursor-pointer select-none ${
                        isMatched
                          ? 'bg-[#B8F23A] text-[#2A1048] opacity-80 cursor-default'
                          : isSelected
                          ? 'bg-[#FFC93C] text-[#2A1048] shadow-[3px_3px_0px_#2A1048] scale-105 ring-2 ring-white'
                          : 'bg-white text-[#2A1048] hover:bg-[#FFF4DC] shadow-[3px_3px_0px_#2A1048] hover:-translate-y-0.5'
                      }`}
                    >
                      <span className="text-xl md:text-2xl">{tile.symbol}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">
                        {tile.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {gameState === 'GAMEOVER' && (
              <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 text-center space-y-4 shadow-[4px_4px_0px_#2A1048] text-[#2A1048] animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-[#B8F23A] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] mx-auto flex items-center justify-center">
                  <Icon name="trophy" size={38} />
                </div>
                <h3 className="font-heading text-2xl font-black">
                  Blitz Completed!
                </h3>
                <p className="text-xs font-bold text-[#2A1048]/75">
                  Great focus! You scored {score} points and collected {coinsEarned} shiny gold coins!
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={startNewGame}
                    className="btn-squish px-6 py-3 bg-[#FFC93C] text-[#2A1048] font-black text-xs rounded-xl border-[2.5px] border-[#2A1048] shadow-[2.5px_2.5px_0px_#2A1048] cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4 stroke-[3]" /> Play Again
                  </button>
                  <button
                    onClick={() => setView('game')}
                    className="btn-squish px-6 py-3 bg-[#FFF4DC] text-[#2A1048] font-black text-xs rounded-xl border-[2.5px] border-[#2A1048] shadow-[2.5px_2.5px_0px_#2A1048] cursor-pointer"
                  >
                    Back to Arcade Hub
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
