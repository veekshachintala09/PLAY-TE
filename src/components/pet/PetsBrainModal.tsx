import React from 'react';
import { useGame } from '../../context/GameContext';
import {
  Brain,
  Sparkles,
  Compass,
  CheckCircle2,
  Clock,
  X,
  Target,
  Zap,
  BookOpen,
} from 'lucide-react';

interface PetsBrainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PetsBrainModal: React.FC<PetsBrainModalProps> = ({ isOpen, onClose }) => {
  const { pet, currentDecision, decisionLog, topics, setView } = useGame();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1048]/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-[#FFF4DC] border-[4px] border-[#2A1048] shadow-[8px_8px_0px_#2A1048] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b-[3px] border-[#2A1048] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC93C] border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] flex items-center justify-center text-2xl">
              🧠
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#6C2BD9] bg-[#B8F23A] px-2 py-0.5 rounded-full border-[2px] border-[#2A1048]">
                Agentic Cognition
              </span>
              <h2 className="text-2xl font-black text-[#2A1048]">
                {pet.name}’s Brain
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-[#FF3D5A] hover:bg-[#ff556e] text-white border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] flex items-center justify-center cursor-pointer transition"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* 1. WHAT I NOTICED ABOUT YOU */}
        <div className="bg-[#FF6FB5]/20 border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF3D5A]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              What I Noticed About You
            </h3>
          </div>
          <p className="text-xs md:text-sm font-bold text-[#2A1048] leading-relaxed">
            {currentDecision.observedPattern}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-black">
            <span className="bg-[#FFC93C] border-[2px] border-[#2A1048] px-2.5 py-0.5 rounded-lg text-[#2A1048]">
              Learner State: {currentDecision.learnerState.toUpperCase()}
            </span>
            <span className="bg-[#B8F23A] border-[2px] border-[#2A1048] px-2.5 py-0.5 rounded-lg text-[#2A1048]">
              Teaching Style: {currentDecision.teachingStyle.toUpperCase()}
            </span>
            <span className="bg-[#6C2BD9] border-[2px] border-[#2A1048] px-2.5 py-0.5 rounded-lg text-white">
              Game Pace: {currentDecision.miniGameAdjustment.hazardDensity.toUpperCase()}
            </span>
          </div>
        </div>

        {/* 2. WHY I CHOSE THIS */}
        <div className="bg-[#B8F23A]/30 border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#6C2BD9]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              Why I Chose This Adaptation
            </h3>
          </div>
          <p className="text-xs md:text-sm font-bold text-[#2A1048] leading-relaxed italic">
            "{currentDecision.petThought}"
          </p>
        </div>

        {/* 3. MY PLAN FOR YOU (NEXT 3 STEPS) */}
        <div className="bg-[#FFC93C]/20 border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#22C55E]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              My 3-Step Plan For You
            </h3>
          </div>

          <div className="space-y-2">
            {currentDecision.nextStepsPlan.map((step: string, idx: number) => (
              <div
                key={idx}
                className="bg-white border-[2.5px] border-[#2A1048] rounded-xl p-2.5 flex items-center gap-3 text-xs font-bold text-[#2A1048] shadow-[2px_2px_0px_#2A1048]"
              >
                <span className="w-6 h-6 rounded-lg bg-[#6C2BD9] text-white flex items-center justify-center text-xs font-black shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TOPIC MASTERY METER */}
        <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] space-y-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FFC93C]" />
            Topic Mastery Map
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {topics.slice(0, 9).map((t) => {
              const bg =
                t.mastery === 'mastered'
                  ? 'bg-[#B8F23A] text-[#2A1048]'
                  : t.mastery === 'strong'
                  ? 'bg-[#FFC93C] text-[#2A1048]'
                  : t.mastery === 'learning'
                  ? 'bg-[#FF6FB5] text-white'
                  : 'bg-[#FFF4DC] text-[#2A1048]/60';

              return (
                <div
                  key={t.id}
                  className={`p-2 rounded-xl border-[2px] border-[#2A1048] text-[11px] font-bold text-center truncate ${bg}`}
                >
                  <p className="truncate font-black">{t.title}</p>
                  <span className="text-[9px] uppercase tracking-wider block mt-0.5">
                    {t.mastery}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. DECISION LOG (LAST 10 AGENT DECISIONS) */}
        <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] space-y-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#6C2BD9]" />
            Agent Decision History (Last 10 Actions)
          </h3>

          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {decisionLog.map((log: any, i: number) => (
              <div
                key={log.decisionId || i}
                className="bg-[#FFF4DC] border-[2px] border-[#2A1048] rounded-xl p-2.5 text-xs text-[#2A1048]"
              >
                <div className="flex items-center justify-between font-black text-[10px] text-[#6C2BD9] mb-1">
                  <span>DECISION #{i + 1}</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="font-bold leading-tight line-clamp-2">
                  "{log.petThought}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="btn-squish px-6 py-2.5 bg-[#B8F23A] text-[#2A1048] font-black text-xs rounded-xl border-[3px] border-[#2A1048] cursor-pointer"
          >
            Got It, Companion!
          </button>
        </div>
      </div>
    </div>
  );
};
