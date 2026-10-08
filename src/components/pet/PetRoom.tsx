import React, { useState } from 'react';
import { useGame, PET_TEMPLATES } from '../../context/GameContext';
import { PetId, PetMood, ShopItem } from '../../types';
import { SHOP_ITEMS } from '../../data/items';
import { sound } from '../../utils/audio';
import { LiveAnimatedPet } from './LiveAnimatedPet';
import { Icon } from '../common/Icon';
import { MessageSquare, Send, Sparkles, Heart } from 'lucide-react';

export const PetRoom: React.FC = () => {
  const {
    pet,
    switchPet,
    ownedPets,
    feedPet,
    playWithPet,
    inventory,
    setView,
    petSpeech,
    setPetSpeech,
    showToast,
  } = useGame();

  const [chatMessage, setChatMessage] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const [petActionEffect, setPetActionEffect] = useState<'heart' | 'star' | null>(null);
  const [flyingFood, setFlyingFood] = useState<{ iconName: string; key: number } | null>(null);
  const [activePetAction, setActivePetAction] = useState<'idle' | 'hop' | 'dance' | 'eat'>('idle');

  const activeTemplate = PET_TEMPLATES[pet.id];

  const handlePetCompanion = () => {
    sound.playPetReaction();
    setActivePetAction('dance');
    setPetActionEffect('heart');
    setTimeout(() => {
      setPetActionEffect(null);
      setActivePetAction('idle');
    }, 1200);

    const phrases = [
      `*Nuzzles happily* You give the best chin scratches!`,
      `*Rolls over joyfully* That tickles! High paws, partner!`,
      `*Leans in warmly* Together, we can conquer any quiz quest!`,
      `*Purrs cheerfully* Keep feeding my curiosity and brain!`,
    ];
    setPetSpeech(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  const handleFeed = (foodItem: ShopItem) => {
    const success = feedPet(foodItem);
    if (success) {
      sound.playPetReaction();
      // Trigger smooth flight animation to pet mouth
      setFlyingFood({ iconName: foodItem.iconName || 'apple', key: Date.now() });
      setActivePetAction('eat');

      setTimeout(() => {
        setActivePetAction('dance');
        setPetActionEffect('heart');
        setTimeout(() => {
          setActivePetAction('idle');
          setPetActionEffect(null);
        }, 1000);
      }, 950);
    } else {
      sound.playIncorrect();
      showToast("You don't have any left in your bag! Visit the Pet Shop.");
    }
  };

  const handlePlayWithToy = (toyItem: ShopItem) => {
    const success = playWithPet(toyItem);
    if (success) {
      sound.playFanfare();
      setActivePetAction('hop');
      setPetActionEffect('star');
      setTimeout(() => {
        setActivePetAction('dance');
        setTimeout(() => {
          setActivePetAction('idle');
          setPetActionEffect(null);
        }, 800);
      }, 700);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isTalking) return;

    const userText = chatMessage.trim();
    setChatMessage('');
    setIsTalking(true);

    try {
      const res = await fetch('/api/gemini/pet-talk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petType: pet.id,
          petName: pet.name,
          playerMessage: userText,
          petMood: pet.hunger < 30 ? 'worried' : 'happy',
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setPetSpeech(data.reply);
        sound.playPetReaction();
        setActivePetAction('hop');
        setTimeout(() => setActivePetAction('idle'), 800);
      }
    } catch {
      setPetSpeech(`*Happy wiggles* I love adventuring through learning with you!`);
    } finally {
      setIsTalking(false);
    }
  };

  // Get food and toy items from catalog that the player has purchased or can use
  const foodCatalog = SHOP_ITEMS.filter((i) => i.category === 'food');
  const toysCatalog = SHOP_ITEMS.filter((i) => i.category === 'toy');

  const moodBadges: { mood: PetMood; label: string; icon: string }[] = [
    { mood: 'happy', label: 'Happy', icon: 'mood-happy' },
    { mood: 'curious', label: 'Curious', icon: 'mood-curious' },
    { mood: 'worried', label: 'Worried', icon: 'mood-worried' },
    { mood: 'sleepy', label: 'Sleepy', icon: 'mood-sleepy' },
    { mood: 'proud', label: 'Proud', icon: 'mood-proud' },
    { mood: 'excited', label: 'Excited', icon: 'mood-excited' },
  ];

  const currentMood = pet.mood || (pet.hunger < 30 ? 'worried' : pet.happiness > 70 ? 'excited' : 'happy');

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 select-none relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-[2.5px] border-[#2A1048]/20 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#6C2BD9] bg-[#B8F23A] px-3 py-1 rounded-full border-[2px] border-[#2A1048] font-black inline-block shadow-[2px_2px_0px_#2A1048] mb-1">
            Companion Sanctuary
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-[#2A1048] flex items-center gap-3">
            <span>Care for {pet.name}</span>
            <Icon name={`pet-${pet.id}`} size={38} />
          </h1>
          <p className="text-xs md:text-sm font-bold text-[#2A1048]/80">
            Feed treats, play with toys, pet your companion, and observe how their mood changes as you learn!
          </p>
        </div>

        <button
          onClick={() => {
            sound.playCorrect();
            setView('shop');
          }}
          className="btn-squish flex items-center gap-2 px-5 py-2.5 bg-[#FFC93C] text-[#2A1048] font-black text-xs rounded-2xl border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] cursor-pointer shrink-0 hover:bg-[#ffd55c]"
        >
          <Icon name="tab-food" size={20} />
          <span>Shop Treats & Toys</span>
        </button>
      </div>

      {/* Switch Companion Roster with Custom SVG Pet Pictures */}
      <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 shadow-[5px_5px_0px_#2A1048]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black text-[#2A1048] uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="crown-progress" size={18} />
            <span>Companion Roster</span>
          </h3>
          <span className="text-[11px] font-bold text-[#6C2BD9]">
            {ownedPets.length}/6 Companions Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {(['dog', 'cat', 'robot', 'bunny', 'dragon', 'panda'] as PetId[]).map((id) => {
            const isOwned = ownedPets.includes(id);
            const isSelected = pet.id === id;
            const t = PET_TEMPLATES[id];

            return (
              <button
                key={id}
                disabled={!isOwned}
                onClick={() => {
                  sound.playPetReaction();
                  switchPet(id);
                }}
                className={`p-3 rounded-2xl border-[2.5px] border-[#2A1048] text-center transition cursor-pointer flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-[#B8F23A] shadow-[3.5px_3.5px_0px_#2A1048] scale-102 ring-2 ring-[#6C2BD9]'
                    : isOwned
                    ? 'bg-[#FFF4DC] hover:bg-white shadow-[2px_2px_0px_#2A1048]'
                    : 'bg-gray-100 opacity-50 cursor-not-allowed border-gray-300'
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <Icon
                    name={`pet-${id}`}
                    size="md"
                    silhouette={!isOwned}
                    className="hover:scale-110"
                  />
                </div>
                <div className="mt-1.5">
                  <span className="font-black text-xs text-[#2A1048] block leading-tight">
                    {t?.name || id}
                  </span>
                  <span className="text-[10px] font-black text-[#6C2BD9] mt-0.5 block">
                    {isSelected ? 'Active' : isOwned ? 'Select' : 'Shop Unlock'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Playroom Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Pet Sanctuary & Diorama */}
        <div className="md:col-span-7 bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 flex flex-col items-center shadow-[6px_6px_0px_#2A1048] tilt-left relative overflow-hidden">
          {/* Heart particle burst */}
          {petActionEffect === 'heart' && (
            <div className="absolute top-10 flex gap-2 text-3xl animate-bounce z-30 pointer-events-none">
              <span>💖</span>
              <span>❤️</span>
              <span>✨</span>
              <span>💖</span>
            </div>
          )}

          {/* Star particle burst */}
          {petActionEffect === 'star' && (
            <div className="absolute top-10 flex gap-2 text-3xl animate-bounce z-30 pointer-events-none">
              <span>⭐</span>
              <span>🌟</span>
              <span>✨</span>
              <span>⭐</span>
            </div>
          )}

          {/* Current Pet Mood Face Badge Header */}
          <div className="w-full flex items-center justify-between mb-3 bg-[#FFF4DC] px-3.5 py-2 rounded-2xl border-[2.5px] border-[#2A1048]">
            <div className="flex items-center gap-2">
              <Icon name={`mood-${currentMood}`} size={26} />
              <span className="text-xs font-black text-[#2A1048] capitalize">
                Mood: {currentMood}
              </span>
            </div>

            {/* Face Badges for All Moods */}
            <div className="flex items-center gap-1">
              {moodBadges.map((mb) => (
                <div
                  key={mb.mood}
                  className={`p-0.5 rounded-full border-[1.5px] transition-transform ${
                    currentMood === mb.mood
                      ? 'border-[#2A1048] bg-[#FFC93C] scale-110 shadow-[1px_1px_0px_#2A1048]'
                      : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                  title={`Mood: ${mb.label}`}
                >
                  <Icon name={mb.icon} size={20} />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Sanctuary Mat & Chomping Area */}
          <div
            onClick={handlePetCompanion}
            className="w-full h-72 rounded-3xl bg-[#FFF4DC] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] flex flex-col items-center justify-center relative cursor-pointer group hover:bg-[#ffeec2] transition overflow-hidden"
            title="Click to pet, cuddle, and brush!"
          >
            {/* Flying Food Arc to Pet's Mouth */}
            {flyingFood && (
              <div
                key={flyingFood.key}
                className="absolute z-50 pointer-events-none animate-fly-food right-12 bottom-12"
              >
                <Icon name={flyingFood.iconName} size={48} />
              </div>
            )}

            {/* Animated Pet SVG */}
            <div className="w-40 h-40 flex items-center justify-center">
              <LiveAnimatedPet
                type={pet.id}
                mood={currentMood}
                action={activePetAction}
                size="lg"
              />
            </div>

            {/* Tap to Cuddle Hint */}
            <div className="mt-2 px-3 py-1 bg-white border-[2px] border-[#2A1048] rounded-full text-[11px] font-black text-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center gap-1 group-hover:scale-105 transition">
              <Heart className="w-3.5 h-3.5 text-[#FF3D5A] fill-[#FF3D5A]" />
              Tap to Pet & Cuddle
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="mt-4 w-full bg-[#FFF4DC] border-[2.5px] border-[#2A1048] rounded-2xl p-3.5 text-center shadow-[3px_3px_0px_#2A1048]">
            <span className="text-[10px] font-black uppercase text-[#6C2BD9] block leading-none mb-1">
              {pet.name} says:
            </span>
            <p className="text-xs font-bold text-[#2A1048] italic">
              "{petSpeech || activeTemplate?.greeting || 'Ready for adventure!'}"
            </p>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendChat} className="mt-3 w-full flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={`Chat with ${pet.name}...`}
              disabled={isTalking}
              className="flex-1 bg-[#FFF4DC] border-[2px] border-[#2A1048] rounded-2xl px-3.5 py-2 text-xs font-bold text-[#2A1048] focus:outline-none shadow-[2px_2px_0px_#2A1048]"
            />
            <button
              type="submit"
              disabled={isTalking || !chatMessage.trim()}
              className="btn-squish px-4 py-2 bg-[#B8F23A] text-[#2A1048] font-black text-xs rounded-2xl border-[2px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] cursor-pointer flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right: Vitals & Bag Treats/Toys */}
        <div className="md:col-span-5 space-y-5">
          {/* Vitals Card */}
          <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 shadow-[6px_6px_0px_#2A1048] space-y-3.5 tilt-right">
            <div className="flex items-center justify-between border-b-[2px] border-[#2A1048]/20 pb-2">
              <h3 className="font-heading font-black text-sm text-[#2A1048] flex items-center gap-2">
                <Icon name={`pet-${pet.id}`} size={24} />
                <span>{pet.name}'s Vitals</span>
              </h3>
              <span className="text-xs font-black text-[#6C2BD9] bg-[#B8F23A] px-2.5 py-0.5 rounded-lg border-[1.5px] border-[#2A1048]">
                Friendship Lv.{pet.friendshipLevel}
              </span>
            </div>

            {/* Hunger Bar */}
            <div>
              <div className="flex justify-between text-xs font-black text-[#2A1048] mb-1">
                <span className="flex items-center gap-1.5">
                  <Icon name="stat-hunger" size={16} /> Hunger
                </span>
                <span>{pet.hunger}/100</span>
              </div>
              <div className="w-full h-3.5 bg-[#FFF4DC] border-[2px] border-[#2A1048] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#FF3D5A] rounded-full transition-all duration-300"
                  style={{ width: `${pet.hunger}%` }}
                />
              </div>
            </div>

            {/* Happiness Bar */}
            <div>
              <div className="flex justify-between text-xs font-black text-[#2A1048] mb-1">
                <span className="flex items-center gap-1.5">
                  <Icon name="stat-happiness" size={16} /> Joy
                </span>
                <span>{pet.happiness}/100</span>
              </div>
              <div className="w-full h-3.5 bg-[#FFF4DC] border-[2px] border-[#2A1048] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#FFC93C] rounded-full transition-all duration-300"
                  style={{ width: `${pet.happiness}%` }}
                />
              </div>
            </div>

            {/* Energy Bar */}
            <div>
              <div className="flex justify-between text-xs font-black text-[#2A1048] mb-1">
                <span className="flex items-center gap-1.5">
                  <Icon name="stat-energy" size={16} /> Energy
                </span>
                <span>{pet.energy}/100</span>
              </div>
              <div className="w-full h-3.5 bg-[#FFF4DC] border-[2px] border-[#2A1048] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
                  style={{ width: `${pet.energy}%` }}
                />
              </div>
            </div>
          </div>

          {/* Snack Feeding Pantry from Bag */}
          <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 shadow-[6px_6px_0px_#2A1048] space-y-3">
            <div className="flex items-center justify-between border-b-[2px] border-[#2A1048]/15 pb-2">
              <h3 className="font-heading font-black text-sm text-[#2A1048] flex items-center gap-1.5">
                <Icon name="tab-food" size={20} />
                <span>Feed Treats from Bag</span>
              </h3>
              <button
                onClick={() => setView('shop')}
                className="text-[10px] font-black text-[#6C2BD9] hover:underline"
              >
                + Shop Treats
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
              {foodCatalog.map((food) => {
                const qty = inventory[food.id] || 0;
                return (
                  <button
                    key={food.id}
                    disabled={qty <= 0}
                    onClick={() => handleFeed(food)}
                    className={`p-2 rounded-2xl border-[2px] border-[#2A1048] text-left flex items-center justify-between transition cursor-pointer ${
                      qty > 0
                        ? 'bg-[#FFF4DC] hover:bg-[#FFC93C]/30 text-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                        : 'bg-gray-100 opacity-50 cursor-not-allowed text-[#2A1048]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon name={food.iconName || 'apple'} size={32} />
                      <div>
                        <span className="font-black text-xs block leading-tight">
                          {food.name}
                        </span>
                        <span className="text-[10px] font-bold text-[#FF3D5A]">
                          +{food.hungerBoost} Hunger
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-white border-[1.5px] border-[#2A1048] text-xs font-black">
                      x{qty}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Play Toys Pantry */}
          <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 shadow-[6px_6px_0px_#2A1048] space-y-3">
            <div className="flex items-center justify-between border-b-[2px] border-[#2A1048]/15 pb-2">
              <h3 className="font-heading font-black text-sm text-[#2A1048] flex items-center gap-1.5">
                <Icon name="tab-toys" size={20} />
                <span>Play with Toys</span>
              </h3>
              <button
                onClick={() => setView('shop')}
                className="text-[10px] font-black text-[#6C2BD9] hover:underline"
              >
                + Shop Toys
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {toysCatalog.slice(0, 4).map((toy) => {
                const qty = inventory[toy.id] || 0;
                return (
                  <button
                    key={toy.id}
                    disabled={qty <= 0}
                    onClick={() => handlePlayWithToy(toy)}
                    className={`p-2 rounded-2xl border-[2px] border-[#2A1048] text-center flex flex-col items-center justify-center transition cursor-pointer ${
                      qty > 0
                        ? 'bg-[#FFF4DC] hover:bg-[#B8F23A]/30 text-[#2A1048] shadow-[2px_2px_0px_#2A1048]'
                        : 'bg-gray-100 opacity-50 cursor-not-allowed text-[#2A1048]/40'
                    }`}
                  >
                    <Icon name={toy.iconName || 'bouncy-ball'} size={28} />
                    <span className="font-black text-[11px] mt-1 block truncate w-full">
                      {toy.name}
                    </span>
                    <span className="text-[9px] font-bold text-[#6C2BD9]">
                      {qty > 0 ? `In Bag (x${qty})` : 'Need in Shop'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
