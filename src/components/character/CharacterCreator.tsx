import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CharacterAvatar } from './CharacterAvatar';
import { CharacterConfig } from '../../types';
import { Sparkles, Dices, Check, ArrowRight, User } from 'lucide-react';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';

const SKIN_TONES = [
  '#FDE68A', // fair peach
  '#FCD34D', // golden
  '#F59E0B', // honey amber
  '#D97706', // warm bronze
  '#B45309', // deep chestnut
  '#78350F', // rich espresso
];

const HAIR_COLORS = [
  '#2A1048', // deep plum dark
  '#451A03', // chocolate brown
  '#D97706', // golden blonde
  '#FF3D5A', // hot red
  '#6C2BD9', // grape purple
  '#22C55E', // leaf green
];

const OUTFIT_COLORS = [
  '#6C2BD9', // Grape Purple
  '#FF3D5A', // Hot Red
  '#22C55E', // Leaf Green
  '#B8F23A', // Lime Pop
  '#FFC93C', // Sunshine Yellow
  '#FF6FB5', // Bubblegum Pink
  '#2A1048', // Deep Plum
];

const HAIR_STYLES: { id: CharacterConfig['hairStyle']; label: string }[] = [
  { id: 'short-spike', label: 'Spiky Cut' },
  { id: 'curly-afro', label: 'Curly Afro' },
  { id: 'bob-cut', label: 'Classic Bob' },
  { id: 'wavy-long', label: 'Wavy Flow' },
  { id: 'cap', label: 'Rogue Cap' },
  { id: 'ponytail', label: 'High Ponytail' },
];

const EYE_STYLES: { id: CharacterConfig['eyeStyle']; label: string }[] = [
  { id: 'cheerful', label: 'Cheerful' },
  { id: 'focused', label: 'Determined' },
  { id: 'star', label: 'Starry-Eyed' },
  { id: 'glasses', label: 'Spectacles' },
];

const OUTFIT_STYLES: { id: CharacterConfig['outfitStyle']; label: string }[] = [
  { id: 'casual-tee', label: 'Adventurer Tee' },
  { id: 'hoodie', label: 'Streetwear Hoodie' },
  { id: 'wizard-robe', label: 'Scholar Robe' },
  { id: 'space-suit', label: 'Cosmic Armor' },
  { id: 'explorer-vest', label: 'Explorer Vest' },
];

const ACCESSORIES: { id: CharacterConfig['accessory']; label: string; iconName?: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'headphones', label: 'Headphones', iconName: 'headphones' },
  { id: 'wizard-hat', label: 'Magic Hat', iconName: 'wizard-hat' },
  { id: 'cape', label: 'Hero Cape', iconName: 'cape' },
  { id: 'compass', label: 'Compass', iconName: 'tab-special' },
  { id: 'crown', label: 'Sun Crown', iconName: 'crown' },
];

export const CharacterCreator: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { character, setCharacter, setIsFirstTimeUser, setView, showToast } = useGame();
  const [draft, setDraft] = useState<CharacterConfig>(character);
  const [activeTab, setActiveTab] = useState<'basics' | 'hair' | 'outfit' | 'accessories'>('basics');

  const handleRandomize = () => {
    sound.playCoin();
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)];
    const randomHairCol = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
    const randomHairStyle = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)].id;
    const randomEye = EYE_STYLES[Math.floor(Math.random() * EYE_STYLES.length)].id;
    const randomOutfit = OUTFIT_STYLES[Math.floor(Math.random() * OUTFIT_STYLES.length)].id;
    const randomOutfitCol = OUTFIT_COLORS[Math.floor(Math.random() * OUTFIT_COLORS.length)];
    const randomAcc = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)].id;

    setDraft((prev) => ({
      ...prev,
      skinTone: randomSkin,
      hairColor: randomHairCol,
      hairStyle: randomHairStyle,
      eyeStyle: randomEye,
      outfitStyle: randomOutfit,
      outfitColor: randomOutfitCol,
      accessory: randomAcc,
    }));
  };

  const handleSave = () => {
    sound.playFanfare();
    setCharacter(draft);
    setIsFirstTimeUser(false);
    showToast(`Welcome, Wayfarer ${draft.name || 'Hero'}! Adventure awaits! ⭐`);
    if (onComplete) {
      onComplete();
    } else {
      setView('home');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 select-none space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-wider text-[#6C2BD9] bg-[#B8F23A] px-3 py-1 rounded-full border-[2px] border-[#2A1048] font-black inline-block shadow-[2px_2px_0px_#2A1048]">
          Hero Studio
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-[#2A1048]">
          Forge Your Character
        </h1>
        <p className="text-xs md:text-sm font-bold text-[#2A1048]/80 max-w-lg mx-auto">
          Personalize your appearance. Your customized character runs through the arcade realms and leads your learning adventure!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Avatar Live Preview Canvas */}
        <div className="md:col-span-5 bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 flex flex-col items-center shadow-[6px_6px_0px_#2A1048] tilt-left">
          <div className="relative w-52 h-60 flex items-center justify-center bg-[#FFF4DC] rounded-2xl border-[3px] border-[#2A1048] mb-4 overflow-hidden shadow-[3px_3px_0px_#2A1048]">
            {/* Ambient Realm Glow */}
            <div
              className="absolute inset-0 opacity-20 blur-xl pointer-events-none"
              style={{ backgroundColor: draft.outfitColor }}
            />
            <CharacterAvatar config={draft} size="xl" action="idle" />
          </div>

          <div className="w-full text-center">
            <h3 className="font-heading text-xl font-black text-[#2A1048] flex items-center justify-center gap-1.5">
              <User className="w-5 h-5 text-[#6C2BD9]" />
              {draft.name || 'Hero'}
            </h3>
            <p className="text-xs font-bold text-[#2A1048]/70 capitalize">
              Realm Wayfarer · {draft.gender}
            </p>
          </div>

          {/* Quick Randomize Button */}
          <button
            onClick={handleRandomize}
            className="btn-squish mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#FFC93C] text-[#2A1048] text-xs font-black border-[2.5px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer hover:bg-[#ffd55c]"
          >
            <Dices className="w-4 h-4 text-[#2A1048]" />
            Randomize Style
          </button>
        </div>

        {/* Right: Customization Controls */}
        <div className="md:col-span-7 bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 shadow-[6px_6px_0px_#2A1048] space-y-5 tilt-right">
          {/* Customizer Tabs */}
          <div className="flex border-b-[2.5px] border-[#2A1048]/20 pb-3 gap-2 overflow-x-auto">
            {[
              { id: 'basics', label: 'Face & Skin' },
              { id: 'hair', label: 'Hair' },
              { id: 'outfit', label: 'Outfit' },
              { id: 'accessories', label: 'Gear' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPetReaction();
                  setActiveTab(tab.id as any);
                }}
                className={`btn-squish px-3.5 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap cursor-pointer border-[2px] border-[#2A1048] ${
                  activeTab === tab.id
                    ? 'bg-[#B8F23A] text-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                    : 'bg-[#FFF4DC] text-[#2A1048] hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-1">
                  Hero Name
                </label>
                <input
                  type="text"
                  maxLength={18}
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Enter adventurer name..."
                  className="w-full bg-[#FFF4DC] border-[2.5px] border-[#2A1048] rounded-2xl px-3.5 py-2 text-sm text-[#2A1048] font-bold focus:outline-none shadow-[2px_2px_0px_#2A1048]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-2">
                  Skin Tone
                </label>
                <div className="flex items-center gap-2">
                  {SKIN_TONES.map((color) => (
                    <button
                      key={color}
                      onClick={() => setDraft({ ...draft, skinTone: color })}
                      className={`w-10 h-10 rounded-2xl border-[3px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] cursor-pointer transition-transform ${
                        draft.skinTone === color ? 'scale-115 ring-2 ring-[#FF3D5A]' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-2">
                  Expression & Eyes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EYE_STYLES.map((eye) => (
                    <button
                      key={eye.id}
                      onClick={() => setDraft({ ...draft, eyeStyle: eye.id })}
                      className={`p-2.5 rounded-2xl border-[2.5px] border-[#2A1048] text-xs font-black text-left cursor-pointer transition ${
                        draft.eyeStyle === eye.id
                          ? 'bg-[#FFC93C] text-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                          : 'bg-[#FFF4DC] text-[#2A1048] hover:bg-white'
                      }`}
                    >
                      {eye.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HAIR */}
          {activeTab === 'hair' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-2">
                  Hair Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HAIR_STYLES.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setDraft({ ...draft, hairStyle: h.id })}
                      className={`p-2.5 rounded-2xl border-[2.5px] border-[#2A1048] text-xs font-black text-center cursor-pointer transition ${
                        draft.hairStyle === h.id
                          ? 'bg-[#FF6FB5] text-white shadow-[2px_2px_0px_#2A1048]'
                          : 'bg-[#FFF4DC] text-[#2A1048] hover:bg-white'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-2">
                  Hair Color
                </label>
                <div className="flex items-center gap-2">
                  {HAIR_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setDraft({ ...draft, hairColor: color })}
                      className={`w-10 h-10 rounded-2xl border-[3px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] cursor-pointer transition-transform ${
                        draft.hairColor === color ? 'scale-115 ring-2 ring-[#FF3D5A]' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OUTFIT */}
          {activeTab === 'outfit' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-2">
                  Outfit Cut
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {OUTFIT_STYLES.map((out) => (
                    <button
                      key={out.id}
                      onClick={() => setDraft({ ...draft, outfitStyle: out.id })}
                      className={`p-2.5 rounded-2xl border-[2.5px] border-[#2A1048] text-xs font-black text-left cursor-pointer transition ${
                        draft.outfitStyle === out.id
                          ? 'bg-[#B8F23A] text-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                          : 'bg-[#FFF4DC] text-[#2A1048] hover:bg-white'
                      }`}
                    >
                      {out.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-2">
                  Vibrant Outfit Color
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {OUTFIT_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setDraft({ ...draft, outfitColor: color })}
                      className={`w-10 h-10 rounded-2xl border-[3px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] cursor-pointer transition-transform ${
                        draft.outfitColor === color ? 'scale-115 ring-2 ring-black' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACCESSORIES */}
          {activeTab === 'accessories' && (
            <div className="space-y-4">
              <label className="block text-xs font-black text-[#2A1048] mb-2">
                Equipped Gear & Headpiece
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ACCESSORIES.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setDraft({ ...draft, accessory: acc.id })}
                    className={`p-3 rounded-2xl border-[2.5px] border-[#2A1048] text-xs font-black flex items-center gap-2 cursor-pointer transition ${
                      draft.accessory === acc.id
                        ? 'bg-[#FFC93C] text-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                        : 'bg-[#FFF4DC] text-[#2A1048] hover:bg-white'
                    }`}
                  >
                    {acc.iconName ? (
                      <Icon name={acc.iconName} size={22} />
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center font-black">✕</span>
                    )}
                    <span>{acc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Finish & Save Studio Button */}
          <div className="pt-4 border-t-[2.5px] border-[#2A1048]/20 flex justify-end">
            <button
              onClick={handleSave}
              className="btn-squish px-8 py-3.5 bg-[#B8F23A] text-[#2A1048] font-black text-sm rounded-2xl border-[3px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer flex items-center gap-2 hover:bg-[#cbf55c]"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              Confirm Hero & Enter World
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
