import React, { useState } from 'react';
import { useGame, PET_TEMPLATES } from '../../context/GameContext';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';
import { Volume2, VolumeX, Edit3 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    character,
    playerLevel,
    playerXp,
    coins,
    streakDays,
    difficulty,
    setDifficulty,
    audioEnabled,
    toggleAudio,
    topics,
    unlockedGamesCount,
    pet,
    setView,
    resetAllProgress,
  } = useGame();

  const [confirmReset, setConfirmReset] = useState(false);

  const completedTopicsCount = topics.filter((t) => t.completed).length;
  const xpNeeded = playerLevel * 100;
  const xpPct = Math.min(100, Math.round((playerXp / xpNeeded) * 100));

  const currentMood = pet.mood || (pet.hunger < 30 ? 'worried' : pet.happiness > 70 ? 'excited' : 'happy');
  const petTemplate = PET_TEMPLATES[pet.id];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 select-none">
      {/* Top Header */}
      <div>
        <span className="text-xs uppercase tracking-wider text-[#6C2BD9] bg-[#B8F23A] px-3 py-1 rounded-full border-[2px] border-[#2A1048] font-black inline-block shadow-[2px_2px_0px_#2A1048] mb-1">
          Hero Dossier
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-[#2A1048]">
          Wayfarer Profile
        </h1>
        <p className="text-xs md:text-sm font-bold text-[#2A1048]/80">
          Review your journey records, active companion status, and game preferences.
        </p>
      </div>

      {/* Main Avatar & Stats Card */}
      <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 shadow-[6px_6px_0px_#2A1048] relative overflow-hidden tilt-left">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Frame */}
          <div className="relative w-36 h-40 bg-[#FFF4DC] border-[3px] border-[#2A1048] rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#2A1048] shrink-0">
            <CharacterAvatar config={character} size="lg" action="idle" />
            <button
              onClick={() => {
                sound.playCorrect();
                setView('character-customizer');
              }}
              className="btn-squish absolute bottom-2 right-2 p-1.5 bg-[#FFC93C] text-[#2A1048] border-[1.5px] border-[#2A1048] rounded-lg shadow cursor-pointer"
              title="Edit Avatar"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-heading text-2xl font-black text-[#2A1048]">
                  {character.name || 'Hero'}
                </h2>
                <p className="text-xs font-bold text-[#2A1048]/70 capitalize">
                  Level {playerLevel} Wayfarer · {character.gender}
                </p>
              </div>

              <button
                onClick={() => {
                  sound.playCorrect();
                  setView('character-customizer');
                }}
                className="btn-squish inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B8F23A] text-[#2A1048] text-xs font-black border-[2px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] cursor-pointer self-center sm:self-auto"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#2A1048]" /> Customize Hero
              </button>
            </div>

            {/* Level XP Bar */}
            <div className="pt-1">
              <div className="flex justify-between text-xs font-black text-[#2A1048] mb-1">
                <span className="flex items-center gap-1">
                  <Icon name="crown-progress" size={16} /> XP Progress
                </span>
                <span>{playerXp} / {xpNeeded} XP</span>
              </div>
              <div className="w-full h-3 bg-[#FFF4DC] rounded-full overflow-hidden border-[2px] border-[#2A1048]">
                <div
                  className="h-full bg-[#FF3D5A] transition-all duration-300"
                  style={{ width: `${xpPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards with Custom Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Wallet */}
        <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] text-center flex flex-col items-center justify-center">
          <Icon name="coin" size={28} />
          <span className="text-[10px] font-black uppercase text-[#2A1048]/70 mt-1 block">Gold Wallet</span>
          <span className="text-lg font-black text-[#2A1048] leading-tight">{coins} Coins</span>
        </div>

        {/* Streak */}
        <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] text-center flex flex-col items-center justify-center">
          <Icon name="flame" size={28} />
          <span className="text-[10px] font-black uppercase text-[#2A1048]/70 mt-1 block">Daily Streak</span>
          <span className="text-lg font-black text-[#FF3D5A] leading-tight">{streakDays} Days</span>
        </div>

        {/* Completed Lessons */}
        <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] text-center flex flex-col items-center justify-center">
          <Icon name="check" size={28} />
          <span className="text-[10px] font-black uppercase text-[#2A1048]/70 mt-1 block">Completed Topics</span>
          <span className="text-lg font-black text-[#22C55E] leading-tight">{completedTopicsCount} Lessons</span>
        </div>

        {/* Active Pet Companion & Mood Badge */}
        <div
          onClick={() => {
            sound.playPetReaction();
            setView('pet');
          }}
          className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFF4DC] transition group"
          title="Visit Companion Sanctuary"
        >
          <div className="flex items-center gap-1.5">
            <Icon name={`pet-${pet.id}`} size={32} />
            <Icon name={`mood-${currentMood}`} size={20} />
          </div>
          <span className="text-[10px] font-black uppercase text-[#2A1048]/70 mt-1 block">Companion</span>
          <span className="text-sm font-black text-[#6C2BD9] leading-tight">{pet.name} (Lv.{pet.friendshipLevel})</span>
        </div>
      </div>

      {/* Settings & Preferences */}
      <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 shadow-[6px_6px_0px_#2A1048] space-y-5 tilt-right">
        <h3 className="font-heading text-lg font-black text-[#2A1048]">
          Preferences & Difficulty
        </h3>

        {/* Difficulty Level Setting with Custom Difficulty Icons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h4 className="font-black text-sm text-[#2A1048]">Challenge Difficulty</h4>
            <p className="text-xs font-bold text-[#2A1048]/70">
              Higher difficulties offer greater coin bounties on quizzes!
            </p>
          </div>

          <div className="flex gap-2">
            {[
              { id: 'easy', label: 'Easy', icon: 'diff-easy' },
              { id: 'medium', label: 'Medium', icon: 'diff-medium' },
              { id: 'hard', label: 'Hard', icon: 'diff-hard' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  sound.playPetReaction();
                  setDifficulty(d.id as any);
                }}
                className={`btn-squish flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-[2px] border-[#2A1048] cursor-pointer ${
                  difficulty === d.id
                    ? 'bg-[#FFC93C] text-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                    : 'bg-[#FFF4DC] text-[#2A1048]'
                }`}
              >
                <Icon name={d.icon} size={16} />
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Toggle */}
        <div className="flex items-center justify-between pt-3 border-t-[2px] border-[#2A1048]/15">
          <div>
            <h4 className="font-black text-sm text-[#2A1048]">Sound Synthesizer</h4>
            <p className="text-xs font-bold text-[#2A1048]/70">
              Chiptune sounds for button clicks, fanfare, and pets.
            </p>
          </div>

          <button
            onClick={toggleAudio}
            className={`btn-squish px-4 py-2 rounded-xl text-xs font-black border-[2px] border-[#2A1048] flex items-center gap-1.5 cursor-pointer ${
              audioEnabled ? 'bg-[#B8F23A] text-[#2A1048]' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {audioEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Reset Progress */}
        <div className="flex items-center justify-between pt-3 border-t-[2px] border-[#2A1048]/15">
          <div>
            <h4 className="font-black text-sm text-[#FF3D5A]">Reset All Progress</h4>
            <p className="text-xs font-bold text-[#2A1048]/70">
              Clear saved coins, level, and character customization.
            </p>
          </div>

          {confirmReset ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetAllProgress();
                  setConfirmReset(false);
                }}
                className="btn-squish px-3 py-1.5 rounded-xl bg-[#FF3D5A] text-white text-xs font-black border-[2px] border-[#2A1048] cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="btn-squish px-3 py-1.5 rounded-xl bg-gray-200 text-[#2A1048] text-xs font-black border-[2px] border-[#2A1048] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="btn-squish px-3.5 py-1.5 rounded-xl bg-[#FFF4DC] text-[#FF3D5A] text-xs font-black border-[2px] border-[#2A1048] hover:bg-white cursor-pointer"
            >
              Reset Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
