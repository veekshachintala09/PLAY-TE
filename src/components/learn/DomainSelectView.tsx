import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { DomainId, TopicItem } from '../../types';
import { sound } from '../../utils/audio';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { Icon } from '../common/Icon';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  Map,
  Grid,
} from 'lucide-react';

export const DomainSelectView: React.FC = () => {
  const {
    activeDomain,
    setActiveDomain,
    topics,
    setActiveTopicId,
    setView,
    setGameThemeToPlay,
    activeRevisionQuest,
    character,
    addCoins,
  } = useGame();

  const [selectedSubCat, setSelectedSubCat] = useState<string>('Python');
  const [viewMode, setViewMode] = useState<'path' | 'grid'>('path');
  const [openedChests, setOpenedChests] = useState<Record<string, boolean>>({});

  // Domain theme specs per revised prompt:
  // Programming = purple (#6C2BD9) + lime (#B8F23A)
  // Mathematics = red (#FF3D5A) + yellow (#FFC93C)
  // Science = green (#22C55E) + pink (#FF6FB5)
  // Environment = green (#22C55E) + sunshine yellow (#FFC93C)
  const DOMAIN_CARDS: {
    id: DomainId;
    name: string;
    tagline: string;
    primaryColor: string;
    accentColor: string;
    iconName: string;
    subCategories: string[];
    doodle: string;
  }[] = [
    {
      id: 'programming',
      name: 'Programming',
      tagline: 'Code spells, loops & game engines',
      primaryColor: '#6C2BD9', // Grape Purple
      accentColor: '#B8F23A', // Lime Pop
      iconName: 'domain-programming',
      subCategories: ['Python', 'C', 'JavaScript'],
      doodle: '{ }',
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      tagline: 'Patterns, fractions & algebra scales',
      primaryColor: '#FF3D5A', // Hot Red
      accentColor: '#FFC93C', // Sunshine Yellow
      iconName: 'domain-mathematics',
      subCategories: [
        'Arithmetic & Patterns',
        'Fractions & Percentages',
        'Algebra Basics',
        'Geometry & Shapes',
        'Coordinates & Vectors',
        'Probability & Statistics',
      ],
      doodle: 'π',
    },
    {
      id: 'science',
      name: 'Science',
      tagline: 'Gravity, light, cells & atomic bonds',
      primaryColor: '#22C55E', // Leaf Green
      accentColor: '#FF6FB5', // Bubblegum Pink
      iconName: 'domain-science',
      subCategories: ['Physics', 'Chemistry', 'Biology', 'Earth & Space'],
      doodle: '⚡',
    },
    {
      id: 'environment',
      name: 'Environment',
      tagline: 'Rainforests, clean oceans & green energy',
      primaryColor: '#22C55E', // Leaf Green
      accentColor: '#FFC93C', // Sunshine Yellow
      iconName: 'domain-environment',
      subCategories: [
        'Ecosystems',
        'Forests & Trees',
        'Oceans & Marine Life',
        'Water Conservation',
        'Waste Sorting',
        'Renewable Energy',
        'Climate Action',
        'Sustainable Living',
      ],
      doodle: '🌱',
    },
  ];

  const currentDomainMeta = DOMAIN_CARDS.find((d) => d.id === activeDomain) || DOMAIN_CARDS[0];

  const getSubCatIcon = (sub: string): string => {
    const s = sub.toLowerCase();
    if (s.includes('python')) return 'topic-python';
    if (s === 'c') return 'topic-c';
    if (s.includes('javascript') || s.includes('js')) return 'topic-js';
    if (s.includes('html')) return 'topic-html';
    if (s.includes('css')) return 'topic-css';
    if (s.includes('sql')) return 'topic-sql';
    if (s.includes('scratch')) return 'topic-scratch';
    if (s.includes('arithmetic') || s.includes('calculator')) return 'math-calculator';
    if (s.includes('fraction')) return 'math-pie-fraction';
    if (s.includes('algebra')) return 'math-symbols';
    if (s.includes('geometry') || s.includes('shape')) return 'math-triangle';
    if (s.includes('coordinate') || s.includes('vector')) return 'math-graph';
    if (s.includes('probability') || s.includes('statistic')) return 'math-dice';
    if (s.includes('physics')) return 'science-magnet';
    if (s.includes('chemistry')) return 'science-atom';
    if (s.includes('biology')) return 'science-dna';
    if (s.includes('space') || s.includes('earth')) return 'science-planet';
    if (s.includes('forest') || s.includes('tree')) return 'eco-tree';
    if (s.includes('ocean') || s.includes('marine')) return 'eco-fish';
    if (s.includes('water')) return 'eco-water-drop';
    if (s.includes('waste') || s.includes('sort')) return 'eco-recycle';
    if (s.includes('renewable') || s.includes('energy')) return 'eco-wind-turbine';
    if (s.includes('climate') || s.includes('sun')) return 'eco-sun';
    if (s.includes('sustainable') || s.includes('ecosystem')) return 'eco-leaf';
    return 'star';
  };

  // Filter topics for active domain & subCategory
  const displayedTopics = topics.filter(
    (t) =>
      t.domain === activeDomain &&
      (t.subCategory.toLowerCase() === selectedSubCat.toLowerCase() ||
        t.subCategory.toLowerCase().includes(selectedSubCat.toLowerCase()) ||
        selectedSubCat.toLowerCase().includes(t.subCategory.toLowerCase()))
  );

  const handleSelectTopic = (topic: TopicItem) => {
    if (!topic.unlocked) {
      sound.playIncorrect();
      return;
    }
    sound.playCorrect();
    setActiveTopicId(topic.id);
    setGameThemeToPlay(topic.gameTheme);
    setView('lesson');
  };

  const handleOpenChest = (chestId: string) => {
    if (openedChests[chestId]) return;
    sound.playFanfare();
    setOpenedChests((prev) => ({ ...prev, [chestId]: true }));
    addCoins(50);
  };

  // Find first uncompleted unlocked topic to place the player avatar
  const activeAvatarTopic =
    displayedTopics.find((t) => t.unlocked && !t.completed) ||
    displayedTopics[displayedTopics.length - 1] ||
    displayedTopics[0];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 select-none">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#6C2BD9] bg-[#B8F23A] border-[2.5px] border-[#2A1048] px-3.5 py-1 rounded-full shadow-[2.5px_2.5px_0px_#2A1048] inline-block mb-1.5">
            Adventure Map & Realms
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-[#2A1048]">
            Choose Your Learning Realm
          </h1>
          <p className="text-xs md:text-sm text-[#2A1048]/80 mt-1 max-w-xl font-bold">
            Follow the winding adventure trail or explore any realm freely. Score 3/5 on quizzes to unlock arcade mini-games!
          </p>
        </div>

        {/* Spaced Revision Banner if due */}
        {activeRevisionQuest && (
          <button
            onClick={() => {
              sound.playCorrect();
              setView('revision-quest');
            }}
            className="btn-squish px-4 py-3 bg-[#FF6FB5] hover:bg-[#ff85c4] text-[#2A1048] border-[3px] border-[#2A1048] rounded-2xl shadow-[4px_4px_0px_#2A1048] flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-5 h-5 text-[#2A1048]" />
            <div className="text-left">
              <span className="text-[10px] font-black uppercase block leading-none text-[#6C2BD9]">
                Pet Revision Due!
              </span>
              <span className="text-xs font-black">
                Review: {activeRevisionQuest.conceptName}
              </span>
            </div>
          </button>
        )}
      </div>

      {/* 4 Domain Cards with specific color identities & custom SVG icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DOMAIN_CARDS.map((dom) => {
          const isSelected = activeDomain === dom.id;
          const completedCount = topics.filter((t) => t.domain === dom.id && t.completed).length;
          const totalCount = topics.filter((t) => t.domain === dom.id).length;

          return (
            <div
              key={dom.id}
              onClick={() => {
                sound.playCorrect();
                setActiveDomain(dom.id);
                setSelectedSubCat(dom.subCategories[0]);
              }}
              className={`p-5 rounded-3xl border-[3.5px] border-[#2A1048] transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'shadow-[6px_6px_0px_#2A1048] scale-102 ring-4 ring-[#2A1048]/20'
                  : 'shadow-[4px_4px_0px_#2A1048] hover:shadow-[5px_5px_0px_#2A1048] hover:-translate-y-1'
              }`}
              style={{
                backgroundColor: isSelected ? dom.primaryColor : '#FFF4DC',
                color: isSelected ? '#FFFFFF' : '#2A1048',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl border-[3px] border-[#2A1048] flex items-center justify-center shadow-[2px_2px_0px_#2A1048]"
                    style={{ backgroundColor: dom.accentColor }}
                  >
                    <Icon name={dom.iconName} size={30} />
                  </div>

                  <span
                    className="text-[11px] font-black px-2.5 py-1 rounded-full border-[2px] border-[#2A1048]"
                    style={{
                      backgroundColor: dom.accentColor,
                      color: '#2A1048',
                    }}
                  >
                    {completedCount}/{totalCount} Done
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-black">{dom.name}</h3>
                <p
                  className="text-xs font-bold mt-1 line-clamp-2"
                  style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(42,16,72,0.8)' }}
                >
                  {dom.tagline}
                </p>
              </div>

              <div
                className="mt-4 pt-3 border-t-[2px] flex items-center justify-between text-xs font-black"
                style={{ borderColor: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(42,16,72,0.15)' }}
              >
                <span>{dom.subCategories.length} Topic Tracks</span>
                <span className="text-base">{dom.doodle}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-Category Tabs with Language / Topic Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Track Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 flex-1 scrollbar-none">
          {currentDomainMeta.subCategories.map((sub) => {
            const isSelected = selectedSubCat.toLowerCase() === sub.toLowerCase();
            const iconName = getSubCatIcon(sub);
            return (
              <button
                key={sub}
                onClick={() => {
                  sound.playCorrect();
                  setSelectedSubCat(sub);
                }}
                className={`btn-squish flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black border-[3px] border-[#2A1048] whitespace-nowrap cursor-pointer transition ${
                  isSelected
                    ? 'bg-[#B8F23A] text-[#2A1048] shadow-[3px_3px_0px_#2A1048]'
                    : 'bg-white text-[#2A1048] hover:bg-[#FFF4DC]'
                }`}
              >
                <Icon name={iconName} size={20} />
                <span>{sub}</span>
              </button>
            );
          })}
        </div>

        {/* View Switcher: Winding Path vs Grid */}
        <div className="flex items-center gap-1.5 bg-white border-[2.5px] border-[#2A1048] p-1 rounded-2xl shadow-[2.5px_2.5px_0px_#2A1048] shrink-0 self-start sm:self-auto">
          <button
            onClick={() => {
              sound.playCorrect();
              setViewMode('path');
            }}
            className={`btn-squish px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'path'
                ? 'bg-[#FFC93C] text-[#2A1048] border-[2px] border-[#2A1048]'
                : 'text-[#2A1048] hover:bg-[#FFF4DC]'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Adventure Path</span>
          </button>
          <button
            onClick={() => {
              sound.playCorrect();
              setViewMode('grid');
            }}
            className={`btn-squish px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#FFC93C] text-[#2A1048] border-[2px] border-[#2A1048]'
                : 'text-[#2A1048] hover:bg-[#FFF4DC]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid Cards</span>
          </button>
        </div>
      </div>

      {/* MAP-STYLE WINDING ADVENTURE PATH VIEW */}
      {viewMode === 'path' && (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-10 space-y-8 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-[2.5px] border-[#2A1048]/30 pb-4">
            <div className="flex items-center gap-3">
              <Icon name={getSubCatIcon(selectedSubCat)} size={36} />
              <div>
                <h2 className="font-heading text-2xl font-black text-[#2A1048] flex items-center gap-2">
                  <span>{selectedSubCat} Winding Quest Trail</span>
                </h2>
                <p className="text-xs font-bold text-[#2A1048]/75 mt-0.5">
                  Follow the cobblestone path. Unlock checkpoints, open mystery treasure chests, and earn 3 gold stars!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-black">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#B8F23A] border-[1.5px] border-[#2A1048]">
                <Icon name="star" size={14} /> Earn 3 Stars
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFC93C] border-[1.5px] border-[#2A1048]">
                <Icon name="treasure-chest" size={16} /> +50 Chests
              </span>
            </div>
          </div>

          {/* Winding S-Path Layout */}
          <div className="relative max-w-xl mx-auto py-6">
            {/* Background Winding SVG Trail Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              {displayedTopics.map((_, i) => {
                if (i === displayedTopics.length - 1) return null;
                const offsetCurrent = i % 3 === 0 ? 50 : i % 3 === 1 ? 25 : 75;
                const offsetNext = (i + 1) % 3 === 0 ? 50 : (i + 1) % 3 === 1 ? 25 : 75;
                const y1 = i * 140 + 40;
                const y2 = (i + 1) * 140 + 40;
                return (
                  <path
                    key={i}
                    d={`M ${offsetCurrent}% ${y1} C ${offsetCurrent}% ${(y1 + y2) / 2}, ${offsetNext}% ${(y1 + y2) / 2}, ${offsetNext}% ${y2}`}
                    fill="none"
                    stroke="#2A1048"
                    strokeWidth="8"
                    strokeDasharray="10 8"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Stepping Stone Nodes */}
            <div className="relative z-10 space-y-12">
              {displayedTopics.map((topic, i) => {
                const isUnlocked = topic.unlocked;
                const isCompleted = topic.completed;
                const isCurrentActive = activeAvatarTopic?.id === topic.id;
                const bestScore = topic.bestScore || 0;
                const starsCount = bestScore >= 5 ? 3 : bestScore >= 4 ? 2 : bestScore >= 3 ? 1 : 0;
                const topicIcon = getSubCatIcon(topic.subCategory);

                // Alternate horizontal positions: center, left, right
                const alignClass =
                  i % 3 === 0
                    ? 'justify-center'
                    : i % 3 === 1
                    ? 'justify-start md:pl-16'
                    : 'justify-end md:pr-16';

                return (
                  <div key={topic.id} className={`flex ${alignClass} items-center`}>
                    <div className="relative flex flex-col items-center group">
                      {/* PLAYER AVATAR STANDING ON CURRENT ACTIVE NODE */}
                      {isCurrentActive && (
                        <div className="absolute -top-16 z-20 flex flex-col items-center animate-bounce pointer-events-none">
                          <div className="px-2 py-0.5 rounded-full bg-[#B8F23A] border-[2px] border-[#2A1048] text-[9px] font-black text-[#2A1048] shadow-[2px_2px_0px_#2A1048] mb-0.5">
                            YOU ARE HERE
                          </div>
                          <div className="w-12 h-12">
                            <CharacterAvatar config={character} size="sm" action="cheering" />
                          </div>
                        </div>
                      )}

                      {/* Stepping Stone Node Button with Custom Icons */}
                      <button
                        onClick={() => handleSelectTopic(topic)}
                        disabled={!isUnlocked}
                        className={`w-20 h-20 rounded-3xl border-[4px] border-[#2A1048] shadow-[5px_5px_0px_#2A1048] flex flex-col items-center justify-center transition-transform cursor-pointer relative ${
                          isCompleted
                            ? 'bg-[#B8F23A] text-[#2A1048] hover:scale-110 active:scale-95'
                            : isUnlocked
                            ? 'bg-[#FFC93C] text-[#2A1048] hover:scale-110 active:scale-95 ring-4 ring-[#FF3D5A]/30 animate-pulse'
                            : 'bg-gray-200 text-[#2A1048]/40 opacity-60 cursor-not-allowed shadow-[2px_2px_0px_#2A1048]'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <Icon name="check" size={30} />
                            <span className="text-[10px] font-black">L{topic.level}</span>
                          </>
                        ) : isUnlocked ? (
                          <>
                            <Icon name={topicIcon} size={28} />
                            <span className="text-[10px] font-black">L{topic.level}</span>
                          </>
                        ) : (
                          <>
                            <Icon name="padlock" size={24} />
                            <span className="text-[9px] font-black">L{topic.level}</span>
                          </>
                        )}

                        {/* Star Rating Badges */}
                        {isCompleted && (
                          <div className="absolute -bottom-3 flex items-center gap-0.5 bg-white px-2 py-0.5 rounded-full border-[2px] border-[#2A1048] shadow-[1.5px_1.5px_0px_#2A1048]">
                            {[1, 2, 3].map((starIdx) => (
                              <Icon
                                key={starIdx}
                                name={starIdx <= starsCount ? 'star' : 'star-empty'}
                                size={12}
                              />
                            ))}
                          </div>
                        )}
                      </button>

                      {/* Topic Title Badge below Node */}
                      <div className="mt-4 bg-white border-[2.5px] border-[#2A1048] px-3.5 py-1.5 rounded-2xl shadow-[3px_3px_0px_#2A1048] text-center max-w-[180px] tilt-left flex items-center gap-1.5 justify-center">
                        <Icon name={topicIcon} size={16} />
                        <h4 className="font-heading font-black text-xs text-[#2A1048] truncate">
                          {topic.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Milestone Treasure Chest along the path! */}
              <div className="flex justify-center pt-4">
                <div className="bg-white border-[3.5px] border-[#2A1048] shadow-[5px_5px_0px_#2A1048] rounded-3xl p-5 text-center max-w-xs tilt-right">
                  <div className="w-18 h-18 rounded-2xl bg-[#FFC93C] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] mx-auto flex items-center justify-center mb-2">
                    <Icon name="treasure-chest" size={44} />
                  </div>
                  <h4 className="font-heading font-black text-sm text-[#2A1048]">
                    Realm Treasure Chest
                  </h4>
                  <p className="text-[11px] font-bold text-[#2A1048]/75 mt-0.5">
                    Click to claim +50 bonus coins for completing lessons!
                  </p>
                  <button
                    onClick={() => handleOpenChest(`chest-${selectedSubCat}`)}
                    disabled={openedChests[`chest-${selectedSubCat}`]}
                    className={`mt-3 btn-squish px-4 py-2 rounded-xl text-xs font-black border-[2px] border-[#2A1048] cursor-pointer flex items-center justify-center gap-1.5 mx-auto ${
                      openedChests[`chest-${selectedSubCat}`]
                        ? 'bg-gray-200 text-[#2A1048]/40 cursor-not-allowed'
                        : 'bg-[#B8F23A] text-[#2A1048] hover:bg-[#cbf55c] shadow-[2px_2px_0px_#2A1048]'
                    }`}
                  >
                    <Icon name="coin" size={16} />
                    <span>
                      {openedChests[`chest-${selectedSubCat}`]
                        ? 'Claimed! ⭐'
                        : 'Open Chest (+50)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALTERNATIVE GRID CARDS VIEW */}
      {viewMode === 'grid' && (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-[2.5px] border-[#2A1048]/30 pb-4">
            <div className="flex items-center gap-3">
              <Icon name={getSubCatIcon(selectedSubCat)} size={32} />
              <div>
                <h2 className="font-heading text-2xl font-black text-[#2A1048]">
                  {selectedSubCat} Topic Grid
                </h2>
                <p className="text-xs font-bold text-[#2A1048]/70 mt-0.5">
                  Quick grid access to all lesson stages and questions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedTopics.map((topic, i) => {
              const isUnlocked = topic.unlocked;
              const isCompleted = topic.completed;
              const topicIcon = getSubCatIcon(topic.subCategory);

              const masteryBg =
                topic.mastery === 'mastered'
                  ? 'bg-[#B8F23A]'
                  : topic.mastery === 'strong'
                  ? 'bg-[#FFC93C]'
                  : topic.mastery === 'learning'
                  ? 'bg-[#FF6FB5] text-white'
                  : 'bg-white';

              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`p-5 rounded-3xl border-[3.5px] border-[#2A1048] transition-all flex items-start gap-4 ${
                    isUnlocked
                      ? `bg-white shadow-[4px_4px_0px_#2A1048] hover:shadow-[6px_6px_0px_#2A1048] hover:-translate-y-1 cursor-pointer ${
                          i % 2 === 0 ? 'tilt-left' : 'tilt-right'
                        }`
                      : 'bg-[#FFF4DC]/60 opacity-50 cursor-not-allowed shadow-[2px_2px_0px_#2A1048]'
                  }`}
                >
                  {/* Level Badge Orb */}
                  <div
                    className={`w-14 h-14 rounded-2xl border-[3px] border-[#2A1048] flex items-center justify-center font-black text-sm shrink-0 shadow-[2px_2px_0px_#2A1048] ${
                      isCompleted
                        ? 'bg-[#B8F23A] text-[#2A1048]'
                        : isUnlocked
                        ? 'bg-[#FFC93C] text-[#2A1048]'
                        : 'bg-[#2A1048]/20 text-[#2A1048]/40'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="check" size={28} />
                    ) : isUnlocked ? (
                      <Icon name={topicIcon} size={28} />
                    ) : (
                      <Icon name="padlock" size={24} />
                    )}
                  </div>

                  {/* Topic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-black text-[#2A1048] text-base truncate">
                        {topic.title}
                      </h4>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border-[1.5px] border-[#2A1048] ${masteryBg}`}
                      >
                        {topic.mastery}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-[#2A1048]/75 mt-1 line-clamp-2 leading-relaxed">
                      {topic.shortDesc}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t-[1.5px] border-[#2A1048]/15 text-xs font-black">
                      <span className="text-[10px] text-[#6C2BD9]">
                        Theme: {topic.gameTheme.toUpperCase()}
                      </span>

                      {isUnlocked && (
                        <span className="text-[#FF3D5A] flex items-center gap-1 group-hover:underline">
                          <span>{isCompleted ? 'Review & Play' : 'Start Lesson'}</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
