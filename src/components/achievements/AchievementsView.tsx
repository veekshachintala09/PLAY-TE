import React from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';
import { Trophy, Clock } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const {
    achievements,
    dailyQuests,
    canClaimDailyReward,
    claimDailyReward,
    streakDays,
  } = useGame();

  const completedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 select-none">
      {/* Top Header */}
      <div>
        <span className="text-xs uppercase tracking-wider text-[#6C2BD9] bg-[#B8F23A] px-3 py-1 rounded-full border-[2px] border-[#2A1048] font-black inline-block shadow-[2px_2px_0px_#2A1048] mb-1">
          Hall of Laurels
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-[#2A1048]">
          Achievements & Daily Bounties
        </h1>
        <p className="text-xs md:text-sm font-bold text-[#2A1048]/80">
          Complete quests, maintain your learning streak, and claim shiny gold trophies!
        </p>
      </div>

      {/* Daily Reward Box & Streak Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Mystery Chest */}
        <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 shadow-[5px_5px_0px_#2A1048] flex items-center justify-between tilt-left">
          <div className="flex items-center gap-3">
            <Icon name="daily-gift" size={36} />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6C2BD9] font-black block mb-0.5">
                Daily Explorer Chest
              </span>
              <h3 className="font-heading text-base font-black text-[#2A1048]">Daily Login Bonus</h3>
              <p className="text-xs font-bold text-[#2A1048]/70 mt-0.5">
                Claim 100 Free Gold Coins!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (canClaimDailyReward) {
                sound.playFanfare();
                claimDailyReward();
              }
            }}
            disabled={!canClaimDailyReward}
            className={`btn-squish px-3.5 py-2.5 rounded-2xl font-black text-xs border-[2.5px] border-[#2A1048] flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
              canClaimDailyReward
                ? 'bg-[#FFC93C] text-[#2A1048] shadow-[3px_3px_0px_#2A1048] animate-bounce'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
            }`}
          >
            <Icon name="coin" size={16} />
            <span>{canClaimDailyReward ? 'Claim 100' : 'Claimed'}</span>
          </button>
        </div>

        {/* Streak Flame Banner */}
        <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-5 shadow-[5px_5px_0px_#2A1048] flex items-center gap-4 tilt-right">
          <div className="w-14 h-14 rounded-2xl bg-[#FF3D5A] border-[2.5px] border-[#2A1048] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#2A1048]">
            <Icon name="flame" size={32} />
          </div>
          <div>
            <h3 className="font-heading text-base font-black text-[#2A1048]">
              {streakDays}-Day Learning Streak!
            </h3>
            <p className="text-xs font-bold text-[#2A1048]/70 mt-0.5">
              Keep learning every day to keep the flame alive and earn companion bonuses.
            </p>
          </div>
        </div>
      </div>

      {/* Daily Quests Section */}
      <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 shadow-[6px_6px_0px_#2A1048] space-y-4">
        <h3 className="font-heading text-lg font-black text-[#2A1048] flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#6C2BD9]" />
          Today's Adventure Quests
        </h3>

        <div className="space-y-3">
          {dailyQuests.map((quest) => {
            const isDone = quest.completed;
            const pct = Math.min(100, Math.round((quest.progress / quest.target) * 100));

            return (
              <div
                key={quest.id}
                className="bg-[#FFF4DC] border-[2.5px] border-[#2A1048] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[2.5px_2.5px_0px_#2A1048]"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-[#2A1048]">{quest.title}</span>
                    {isDone && (
                      <span className="text-[10px] font-black text-[#22C55E] bg-white px-2 py-0.5 rounded-md border-[1.5px] border-[#2A1048] flex items-center gap-1">
                        <Icon name="check" size={12} /> Completed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-36 h-2.5 bg-white border-[1.5px] border-[#2A1048] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B8F23A] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-[#2A1048]">
                      {quest.progress}/{quest.target}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="px-3 py-1 rounded-xl bg-[#FFC93C] text-[#2A1048] text-xs font-black border-[1.5px] border-[#2A1048] flex items-center gap-1">
                    <Icon name="coin" size={14} /> +{quest.reward}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trophies Grid with SVG Icons */}
      <div className="bg-white border-[3.5px] border-[#2A1048] rounded-3xl p-6 shadow-[6px_6px_0px_#2A1048] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-black text-[#2A1048] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FFC93C]" />
            Hall of Badges ({completedCount}/{achievements.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {achievements.map((ach) => {
            const isUnlocked = ach.unlocked;
            const pct = Math.min(100, Math.round((ach.currentProgress / ach.targetProgress) * 100));

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border-[2.5px] border-[#2A1048] flex items-start gap-3.5 transition ${
                  isUnlocked
                    ? 'bg-[#B8F23A]/30 shadow-[3px_3px_0px_#2A1048]'
                    : 'bg-[#FFF4DC] opacity-75'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border-[2px] border-[#2A1048] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#2A1048] ${
                    isUnlocked ? 'bg-[#FFC93C]' : 'bg-gray-100 opacity-60'
                  }`}
                >
                  <Icon
                    name={ach.iconName || 'trophy'}
                    size={32}
                    silhouette={!isUnlocked}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-black text-xs text-[#2A1048] truncate">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-black text-[#6C2BD9] flex items-center gap-1">
                      <Icon name="coin" size={12} /> +{ach.rewardCoins}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-[#2A1048]/75 mt-0.5 leading-snug">
                    {ach.description}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white border-[1px] border-[#2A1048] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF3D5A] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-black text-[#2A1048]">
                      {ach.currentProgress}/{ach.targetProgress}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
