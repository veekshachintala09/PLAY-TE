import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { SHOP_ITEMS } from '../../data/items';
import { ShopItem } from '../../types';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';
import { LiveAnimatedPet } from '../pet/LiveAnimatedPet';

type ShopTabId = 'all' | 'food' | 'toy' | 'wear' | 'home' | 'special' | 'pet';

export const PetShop: React.FC = () => {
  const {
    coins,
    buyShopItem,
    inventory,
    ownedPets,
    playerLevel,
    pet,
    feedPet,
    showToast,
    setView,
  } = useGame();

  const [activeTab, setActiveTab] = useState<ShopTabId>('all');
  const [flyingFood, setFlyingFood] = useState<{ iconName: string; key: number } | null>(null);
  const [petAction, setPetAction] = useState<'idle' | 'eat' | 'dance'>('idle');

  const shopTabs: { id: ShopTabId; label: string; icon: string }[] = [
    { id: 'all', label: 'All Items', icon: 'nav-shop' },
    { id: 'food', label: 'Food & Treats', icon: 'tab-food' },
    { id: 'toy', label: 'Toys & Play', icon: 'tab-toys' },
    { id: 'wear', label: 'Wear & Outfits', icon: 'tab-wear' },
    { id: 'home', label: 'Home & Decor', icon: 'tab-home' },
    { id: 'special', label: 'Special & Magic', icon: 'tab-special' },
    { id: 'pet', label: 'Companions', icon: 'pet-dog' },
  ];

  const filteredItems = SHOP_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'wear') return item.category === 'accessory' || item.category === 'wear';
    return item.category === activeTab;
  });

  const handleBuy = (item: ShopItem) => {
    const isLocked = item.levelRequired && playerLevel < item.levelRequired;
    if (isLocked) {
      sound.playIncorrect();
      showToast(`Requires Player Level ${item.levelRequired} to unlock!`);
      return;
    }

    const success = buyShopItem(item);
    if (success) {
      sound.playCoin();
    } else {
      sound.playIncorrect();
      showToast('Not enough coins! Answer quizzes to earn more. ⭐');
    }
  };

  const handleDirectFeed = (item: ShopItem) => {
    const success = feedPet(item);
    if (success) {
      sound.playPetReaction();
      setFlyingFood({ iconName: item.iconName || 'apple', key: Date.now() });
      setPetAction('eat');
      setTimeout(() => {
        setPetAction('dance');
        setTimeout(() => setPetAction('idle'), 1000);
      }, 900);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 select-none relative">
      {/* Top Header Banner */}
      <div className="bg-[#6C2BD9] text-white border-[4px] border-[#2A1048] rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#2A1048] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Playful Doodles */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#B8F23A] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[#FF6FB5] opacity-20 pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8F23A] text-[#2A1048] border-[2px] border-[#2A1048] font-black text-xs shadow-[2px_2px_0px_#2A1048]">
            <Icon name="tab-special" size={18} />
            <span>PET BAZAAR & EMPORIUM</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-white leading-tight">
            Nourish, Outfit & Befriend
          </h1>
          <p className="text-white/90 text-xs md:text-sm font-bold max-w-xl leading-relaxed">
            Every lesson quiz earns gold coins. Spend your earnings on delicious treats, colorful toys, stylish outfits, and room decorations for {pet.name}!
          </p>
        </div>

        {/* Live Pet Preview in Shop Corner + Coin Gold Badge */}
        <div className="relative z-10 flex items-center gap-4 shrink-0 bg-[#FFF4DC] border-[3.5px] border-[#2A1048] p-3.5 rounded-2xl shadow-[4px_4px_0px_#2A1048]">
          {/* Animated Pet Companion */}
          <div
            onClick={() => setView('pet')}
            className="flex flex-col items-center cursor-pointer group"
            title="Visit Pet Sanctuary"
          >
            <div className="w-16 h-16 flex items-center justify-center relative">
              <LiveAnimatedPet type={pet.id} mood={pet.mood || 'happy'} action={petAction} size="sm" />
              {/* Flying Food Particle in Shop */}
              {flyingFood && (
                <div key={flyingFood.key} className="absolute z-50 pointer-events-none animate-fly-food -right-10 top-0">
                  <Icon name={flyingFood.iconName} size={36} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Icon name={`pet-${pet.id}`} size={16} />
              <span className="text-[11px] font-black text-[#2A1048]">{pet.name}</span>
              <Icon name={`mood-${pet.mood || 'happy'}`} size={14} />
            </div>
          </div>

          <div className="h-14 w-[2px] bg-[#2A1048]/20" />

          {/* Coin Badge */}
          <div className="flex flex-col items-start">
            <span className="text-[10px] text-[#2A1048]/70 font-black uppercase">Your Balance</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Icon name="coin" size={26} />
              <span className="font-heading text-2xl font-black text-[#2A1048] leading-none">
                {coins}
              </span>
            </div>
            <span className="text-[9px] font-black text-[#6C2BD9]">Level {playerLevel}</span>
          </div>
        </div>
      </div>

      {/* Shop Category Tabs with Dedicated Icons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {shopTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPetReaction();
                setActiveTab(tab.id);
              }}
              className={`btn-squish flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition cursor-pointer whitespace-nowrap border-[3px] border-[#2A1048] ${
                isActive
                  ? 'bg-[#B8F23A] text-[#2A1048] shadow-[3px_3px_0px_#2A1048]'
                  : 'bg-white text-[#2A1048] hover:bg-[#FFF4DC] shadow-[2px_2px_0px_#2A1048]'
              }`}
            >
              <Icon name={tab.icon} size={22} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, idx) => {
          const ownedCount = inventory[item.id] || 0;
          const isPetOwned =
            item.category === 'pet' && item.petUnlockId && ownedPets.includes(item.petUnlockId);
          const isLocked = Boolean(item.levelRequired && playerLevel < item.levelRequired);
          const canAfford = coins >= item.price;
          const isFood = item.category === 'food';

          return (
            <div
              key={item.id}
              className={`bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 flex flex-col justify-between shadow-[5px_5px_0px_#2A1048] hover:shadow-[7px_7px_0px_#2A1048] hover:-translate-y-1 transition duration-150 relative overflow-hidden ${
                idx % 2 === 0 ? 'tilt-left' : 'tilt-right'
              }`}
            >
              {/* Pink "NEW" Starburst Badge if new item */}
              {item.isNew && !isPetOwned && (
                <div
                  className="absolute top-3 right-3 z-20 transition-transform hover:scale-110"
                  title="New Item!"
                >
                  <Icon name="new-badge" size={42} label="New Item!" />
                </div>
              )}

              {/* Top Section: Large Picture with Name and Silhouette / Padlock if Locked */}
              <div>
                {/* Large Picture Box */}
                <div className="relative w-full h-36 bg-[#FFF4DC] rounded-2xl border-[3px] border-[#2A1048] flex items-center justify-center p-3 mb-3 shadow-[2.5px_2.5px_0px_#2A1048] overflow-hidden group">
                  {/* Item Icon (readable at 96px) */}
                  <Icon
                    name={item.iconName || 'apple'}
                    size="lg"
                    silhouette={isLocked}
                    className="transition-transform group-hover:scale-110 duration-200"
                  />

                  {/* Dark Silhouette Overlay with Padlock if Level Locked */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-[#2A1048]/60 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1 z-10 p-2">
                      <Icon name="padlock" size={32} />
                      <span className="font-heading font-black text-xs text-[#FFF4DC] bg-[#FF3D5A] px-2.5 py-0.5 rounded-lg border-[2px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048]">
                        Unlocks at Lv.{item.levelRequired}
                      </span>
                    </div>
                  )}

                  {/* Owned check indicator if player owns items */}
                  {ownedCount > 0 && !isLocked && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#22C55E] text-white px-2 py-0.5 rounded-lg border-[1.5px] border-[#2A1048] font-black text-[10px] shadow-[1.5px_1.5px_0px_#2A1048]">
                      <Icon name="check" size={14} />
                      <span>x{ownedCount} In Bag</span>
                    </div>
                  )}
                </div>

                {/* Name below the large picture */}
                <div className="flex items-start justify-between gap-2 mt-1">
                  <h3 className="font-heading font-black text-lg text-[#2A1048] leading-snug">
                    {item.name}
                  </h3>
                </div>

                {/* Item description */}
                <p className="text-xs font-bold text-[#2A1048]/80 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Stat Boosts preview pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.hungerBoost && (
                    <span className="text-[10px] font-black bg-[#FF3D5A]/15 text-[#FF3D5A] px-2 py-0.5 rounded-lg border-[1.5px] border-[#FF3D5A]/40 flex items-center gap-1">
                      <Icon name="stat-hunger" size={14} /> +{item.hungerBoost} Hunger
                    </span>
                  )}
                  {item.happinessBoost && (
                    <span className="text-[10px] font-black bg-[#FFC93C]/25 text-[#2A1048] px-2 py-0.5 rounded-lg border-[1.5px] border-[#FFC93C] flex items-center gap-1">
                      <Icon name="stat-happiness" size={14} /> +{item.happinessBoost} Joy
                    </span>
                  )}
                  {item.energyBoost && (
                    <span className="text-[10px] font-black bg-[#22C55E]/15 text-[#22C55E] px-2 py-0.5 rounded-lg border-[1.5px] border-[#22C55E]/40 flex items-center gap-1">
                      <Icon name="stat-energy" size={14} /> +{item.energyBoost} Energy
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Section: Coin Price Badge & Purchase/Feed Controls */}
              <div className="mt-4 pt-3 border-t-[2.5px] border-[#2A1048]/15 space-y-2">
                <div className="flex items-center justify-between">
                  {/* Coin Price Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-[#FFC93C] border-[2.5px] border-[#2A1048] px-3 py-1 rounded-xl shadow-[2px_2px_0px_#2A1048] font-black text-sm text-[#2A1048]">
                    <Icon name="coin" size={20} />
                    <span>{item.price} Coins</span>
                  </div>

                  {isPetOwned && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#22C55E]">
                      <Icon name="check" size={16} /> Adopted
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {isPetOwned ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-gray-100 border-[2px] border-gray-300 text-gray-500 font-black text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      <Icon name="check" size={16} /> Already Adopted
                    </button>
                  ) : isLocked ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-gray-100 border-[2.5px] border-gray-300 text-gray-400 font-black text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      <Icon name="padlock" size={16} /> Level {item.levelRequired} Required
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleBuy(item)}
                        disabled={!canAfford}
                        className={`btn-squish flex-1 py-2.5 rounded-xl border-[2.5px] border-[#2A1048] font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                          canAfford
                            ? 'bg-[#B8F23A] text-[#2A1048] hover:bg-[#c8f75c] shadow-[2.5px_2.5px_0px_#2A1048]'
                            : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {item.category === 'pet' ? 'Adopt Companion' : 'Buy Item'}
                      </button>

                      {/* Direct Feeding shortcut if Food item and user owns at least 1 */}
                      {isFood && ownedCount > 0 && (
                        <button
                          onClick={() => handleDirectFeed(item)}
                          className="btn-squish px-3 py-2.5 rounded-xl bg-[#FF6FB5] text-white border-[2.5px] border-[#2A1048] font-black text-xs shadow-[2.5px_2.5px_0px_#2A1048] cursor-pointer hover:bg-[#ff82c0]"
                          title={`Feed ${item.name} to ${pet.name} right now!`}
                        >
                          Feed 😋
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
