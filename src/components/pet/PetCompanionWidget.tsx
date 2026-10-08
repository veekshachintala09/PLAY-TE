import React, { useState } from 'react';
import { useGame, PET_TEMPLATES } from '../../context/GameContext';
import { SHOP_ITEMS } from '../../data/items';
import { sound } from '../../utils/audio';
import { LiveAnimatedPet } from './LiveAnimatedPet';
import { PetsBrainModal } from './PetsBrainModal';
import { Icon } from '../common/Icon';
import { X, Send } from 'lucide-react';

export const PetCompanionWidget: React.FC = () => {
  const {
    pet,
    petSpeech,
    setPetSpeech,
    setView,
    inventory,
    feedPet,
    showToast,
  } = useGame();

  const [isOpenChat, setIsOpenChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const [showQuickFeed, setShowQuickFeed] = useState(false);
  const [isBrainOpen, setIsBrainOpen] = useState(false);
  const [flyingFood, setFlyingFood] = useState<{ iconName: string; key: number } | null>(null);
  const [widgetPetAction, setWidgetPetAction] = useState<'idle' | 'hop' | 'dance' | 'eat'>('idle');

  const template = PET_TEMPLATES[pet.id];

  const handleSendTalk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTalking) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setIsTalking(true);

    try {
      const res = await fetch('/api/gemini/pet-talk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petType: pet.id,
          petName: pet.name,
          playerMessage: userMsg,
          petMood: pet.hunger < 30 ? 'hungry' : pet.happiness > 70 ? 'joyful' : 'curious',
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setPetSpeech(data.reply);
        sound.playPetReaction();
        setWidgetPetAction('dance');
        setTimeout(() => setWidgetPetAction('idle'), 1000);
      }
    } catch {
      const cuteReplies = [
        `*Wags excitedly* Let's conquer the next lesson! High five!`,
        `I just checked your progress: you're getting faster at answering quizzes!`,
        `A tasty snack from the emporium would make my brain sparkle!`,
      ];
      setPetSpeech(cuteReplies[Math.floor(Math.random() * cuteReplies.length)]);
    } finally {
      setIsTalking(false);
    }
  };

  const handleQuickFeedItem = (foodId: string) => {
    const foodItem = SHOP_ITEMS.find((i) => i.id === foodId);
    if (!foodItem) return;

    const success = feedPet(foodItem);
    if (success) {
      sound.playPetReaction();
      setFlyingFood({ iconName: foodItem.iconName || 'apple', key: Date.now() });
      setWidgetPetAction('eat');
      setTimeout(() => {
        setWidgetPetAction('dance');
        setTimeout(() => setWidgetPetAction('idle'), 800);
      }, 900);
    } else {
      sound.playIncorrect();
      showToast("None left in bag! Visit Pet Shop. ⭐");
    }
  };

  const foodOptions = SHOP_ITEMS.filter((i) => i.category === 'food').slice(0, 5);

  const currentMood = pet.mood || (pet.hunger < 30 ? 'worried' : pet.happiness > 70 ? 'excited' : 'happy');

  return (
    <>
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 select-none flex flex-col items-end">
        {/* Flying Food Particle in Corner Widget */}
        {flyingFood && (
          <div
            key={flyingFood.key}
            className="absolute z-50 pointer-events-none animate-fly-food -top-8 right-6"
          >
            <Icon name={flyingFood.iconName} size={36} />
          </div>
        )}

        {/* Speech Bubble */}
        <div className="relative mb-2 max-w-xs bg-white border-[3px] border-[#2A1048] rounded-2xl p-3 shadow-[4px_4px_0px_#2A1048] animate-fade-in">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-6 h-6 rounded-lg bg-[#FFC93C] border-[1.5px] border-[#2A1048] flex items-center justify-center shrink-0">
                <Icon name={`pet-${pet.id}`} size={20} />
              </div>
              <span className="text-xs font-black text-[#6C2BD9]">{pet.name}</span>
              <Icon name={`mood-${currentMood}`} size={16} />
              <span className="text-[9px] font-black text-[#2A1048]/70 bg-[#B8F23A] px-1.5 py-0.2 rounded-md border-[1px] border-[#2A1048]">
                Lv.{pet.friendshipLevel}
              </span>
            </div>
            <button
              onClick={() => setPetSpeech('')}
              className="text-[#2A1048]/50 hover:text-[#2A1048] text-xs font-black cursor-pointer"
            >
              <X className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          <p className="text-xs text-[#2A1048] font-bold leading-snug">
            {petSpeech || template?.greeting || 'Ready to learn!'}
          </p>

          {/* Quick Pet Actions inside Bubble */}
          <div className="mt-2 pt-2 border-t-[2px] border-[#2A1048]/15 flex items-center justify-between gap-1 text-[11px] font-black">
            <button
              onClick={() => setShowQuickFeed(!showQuickFeed)}
              className="px-2 py-0.5 rounded-lg bg-[#FFC93C] text-[#2A1048] border-[1.5px] border-[#2A1048] hover:bg-[#ffd55c] flex items-center gap-1 cursor-pointer"
            >
              <Icon name="tab-food" size={14} />
              <span>Feed</span>
            </button>

            <button
              onClick={() => setIsOpenChat(!isOpenChat)}
              className="px-2 py-0.5 rounded-lg bg-[#FF6FB5] text-white border-[1.5px] border-[#2A1048] hover:bg-[#ff80be] flex items-center gap-1 cursor-pointer"
            >
              <span>Talk</span>
            </button>

            <button
              onClick={() => {
                sound.playCorrect();
                setIsBrainOpen(true);
              }}
              className="px-2 py-0.5 rounded-lg bg-[#B8F23A] text-[#2A1048] border-[1.5px] border-[#2A1048] hover:bg-[#cbf55c] flex items-center gap-1 cursor-pointer"
              title="Open Pet Learner Brain"
            >
              <Icon name="pet-brain" size={14} />
              <span>Brain</span>
            </button>

            <button
              onClick={() => {
                sound.playCorrect();
                setView('pet');
              }}
              className="px-2 py-0.5 rounded-lg bg-white text-[#2A1048] border-[1.5px] border-[#2A1048] hover:bg-[#FFF4DC] cursor-pointer"
              title="Visit Pet Sanctuary"
            >
              <span>Room</span>
            </button>
          </div>

          {/* Quick Feed Tray */}
          {showQuickFeed && (
            <div className="mt-2 pt-2 border-t-[1.5px] border-[#2A1048]/15 space-y-1">
              <span className="text-[9px] font-black uppercase text-[#6C2BD9] block">
                Quick Feed from Bag:
              </span>
              <div className="grid grid-cols-5 gap-1">
                {foodOptions.map((food) => {
                  const qty = inventory[food.id] || 0;
                  return (
                    <button
                      key={food.id}
                      disabled={qty <= 0}
                      onClick={() => handleQuickFeedItem(food.id)}
                      className={`p-1 rounded-xl border-[1.5px] border-[#2A1048] flex flex-col items-center justify-center transition cursor-pointer ${
                        qty > 0
                          ? 'bg-[#FFF4DC] hover:bg-[#FFC93C] shadow-sm'
                          : 'bg-gray-100 opacity-40 cursor-not-allowed'
                      }`}
                      title={`${food.name} (x${qty})`}
                    >
                      <Icon name={food.iconName || 'apple'} size={24} />
                      <span className="text-[8px] font-black mt-0.5">x{qty}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat Expansion */}
          {isOpenChat && (
            <form onSubmit={handleSendTalk} className="mt-2 pt-2 border-t-[1.5px] border-[#2A1048]/15 flex gap-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Talk to your companion..."
                disabled={isTalking}
                className="flex-1 bg-[#FFF4DC] border-[1.5px] border-[#2A1048] rounded-xl px-2.5 py-1 text-xs font-bold text-[#2A1048] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isTalking || !chatInput.trim()}
                className="btn-squish px-2.5 py-1 bg-[#B8F23A] text-[#2A1048] font-black text-xs rounded-xl border-[1.5px] border-[#2A1048] cursor-pointer"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>

        {/* Floating Corner Pet Diorama Circle */}
        <div
          onClick={() => {
            sound.playPetReaction();
            setWidgetPetAction('dance');
            setTimeout(() => setWidgetPetAction('idle'), 1000);
          }}
          className="relative w-16 h-16 rounded-2xl bg-[#FFC93C] border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition"
          title={`Click to cuddle ${pet.name}!`}
        >
          {/* Mood Badge Pill Overlay */}
          <div className="absolute -top-1.5 -left-1.5 z-20">
            <Icon name={`mood-${currentMood}`} size={20} />
          </div>

          <LiveAnimatedPet
            type={pet.id}
            mood={currentMood}
            action={widgetPetAction}
            size="sm"
          />
        </div>
      </div>

      {/* Pet Brain Modal */}
      <PetsBrainModal isOpen={isBrainOpen} onClose={() => setIsBrainOpen(false)} />
    </>
  );
};
