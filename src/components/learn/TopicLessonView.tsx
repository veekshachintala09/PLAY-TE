import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import {
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Zap,
  MessageCircle,
  Send,
  HelpCircle,
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { Icon } from '../common/Icon';

export const TopicLessonView: React.FC = () => {
  const {
    topics,
    activeTopicId,
    setView,
    currentDecision,
    pet,
  } = useGame();

  const currentTopic = topics.find((t) => t.id === activeTopicId) || topics[0];
  const { lesson } = currentTopic;

  const [askQuestion, setAskQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuestion.trim() || isAsking) return;

    setIsAsking(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/gemini/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: askQuestion.trim(),
          topic: currentTopic.title,
          domain: currentTopic.domain,
        }),
      });
      const data = await res.json();
      setAiAnswer(data.answer);
      sound.playCorrect();
    } catch {
      setAiAnswer(
        `Great question! Remember that in ${currentTopic.subCategory}, practice makes permanent. Try the 5-question challenge to test yourself!`
      );
    } finally {
      setIsAsking(false);
    }
  };

  const handleStartQuiz = () => {
    sound.playFanfare();
    setView('quiz');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView('learn')}
          className="btn-squish px-3.5 py-2 rounded-2xl bg-white border-[2.5px] border-[#2A1048] text-xs font-black text-[#2A1048] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Mastery Map
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#6C2BD9] bg-[#B8F23A] px-3 py-1 rounded-full border-[2px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048]">
            {currentTopic.subCategory} · Level {currentTopic.level}
          </span>
        </div>
      </div>

      {/* Hero Colored Header Block */}
      <div className="bg-[#6C2BD9] text-white border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-8 relative overflow-hidden">
        {/* Doodle sparkle in corner */}
        <div className="absolute top-3 right-4 text-3xl font-black opacity-30 select-none">
          ✦ ✦
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#B8F23A] bg-[#2A1048] px-3 py-0.5 rounded-full inline-block mb-2">
              Teaching Style: {currentDecision.teachingStyle.toUpperCase()}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {lesson.title}
            </h1>
            <p className="text-sm font-bold text-[#FFC93C] mt-1.5 italic">
              "{lesson.tagline}"
            </p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="btn-squish px-8 py-4 bg-[#FFC93C] hover:bg-[#ffd35c] text-[#2A1048] font-black text-sm md:text-base rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Zap className="w-5 h-5 fill-[#2A1048]" />
            Start 5-Question Quiz
          </button>
        </div>
      </div>

      {/* Pet Adaptation Note */}
      <div className="bg-[#FF6FB5]/20 border-[3px] border-[#2A1048] rounded-2xl p-4 shadow-[3px_3px_0px_#2A1048] flex items-center gap-3">
        <Icon name={`pet-${pet.id}`} size={32} />
        <div className="text-xs font-bold text-[#2A1048]">
          <strong className="block text-[#6C2BD9] font-black">{pet.name} says:</strong>
          "{currentDecision.petThought}"
        </div>
      </div>

      {/* 5 Digestible Explanation Cards */}
      <div className="space-y-4">
        {/* Card 1: What Is It? */}
        <div className="bg-white border-[3px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] rounded-2xl p-5 tilt-left">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-7 h-7 rounded-xl bg-[#FF3D5A] text-white flex items-center justify-center text-xs font-black border-[2px] border-[#2A1048]">
              1
            </span>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              What Is It?
            </h3>
          </div>
          <p className="text-sm text-[#2A1048] font-bold leading-relaxed pl-9">
            {lesson.whatIsIt}
          </p>
        </div>

        {/* Card 2: Why Does It Matter? */}
        <div className="bg-white border-[3px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] rounded-2xl p-5 tilt-right">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-7 h-7 rounded-xl bg-[#22C55E] text-white flex items-center justify-center text-xs font-black border-[2px] border-[#2A1048]">
              2
            </span>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              Why Does It Matter?
            </h3>
          </div>
          <p className="text-sm text-[#2A1048] font-bold leading-relaxed pl-9">
            {lesson.whyItMatters}
          </p>
        </div>

        {/* Card 3: How Does It Work? */}
        <div className="bg-white border-[3px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] rounded-2xl p-5 tilt-left">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-7 h-7 rounded-xl bg-[#FFC93C] text-[#2A1048] flex items-center justify-center text-xs font-black border-[2px] border-[#2A1048]">
              3
            </span>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              How Does It Work?
            </h3>
          </div>
          <p className="text-sm text-[#2A1048] font-bold leading-relaxed pl-9">
            {lesson.howItWorks}
          </p>
        </div>

        {/* Card 4: Quick Example */}
        <div className="bg-white border-[3px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] rounded-2xl p-5 tilt-right">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-7 h-7 rounded-xl bg-[#6C2BD9] text-white flex items-center justify-center text-xs font-black border-[2px] border-[#2A1048]">
              4
            </span>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              Quick Example
            </h3>
          </div>
          <div className="pl-9">
            <div className="bg-[#2A1048] text-[#B8F23A] border-[2px] border-[#2A1048] rounded-xl p-3.5 font-mono text-xs whitespace-pre-wrap shadow-inner">
              {lesson.quickExample}
            </div>
          </div>
        </div>

        {/* Card 5: Golden Rule */}
        <div className="bg-[#FFC93C]/30 border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-[#FF3D5A]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-[#2A1048]">
              Golden Rule to Remember
            </h3>
          </div>
          <p className="text-sm font-black text-[#2A1048] leading-relaxed pl-7">
            {lesson.rememberThis}
          </p>
        </div>
      </div>

      {/* Interactive "Ask AI" Panel */}
      <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#6C2BD9]" />
          <h3 className="text-base font-black text-[#2A1048]">
            Curious? Ask AI Guide a Question!
          </h3>
        </div>
        <p className="text-xs font-bold text-[#2A1048]/80">
          Want another example or wondering how this connects to game engines? Ask below!
        </p>

        <form onSubmit={handleAskAi} className="flex gap-2 pt-1">
          <input
            type="text"
            value={askQuestion}
            onChange={(e) => setAskQuestion(e.target.value)}
            placeholder={`Ask anything about ${currentTopic.title}...`}
            disabled={isAsking}
            className="flex-1 bg-white border-[2.5px] border-[#2A1048] rounded-xl px-4 py-2.5 text-xs font-bold text-[#2A1048] placeholder-[#2A1048]/40 shadow-[2px_2px_0px_#2A1048] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isAsking || !askQuestion.trim()}
            className="btn-squish px-5 py-2.5 bg-[#B8F23A] text-[#2A1048] font-black rounded-xl border-[2.5px] border-[#2A1048] text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {isAsking ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>

        {aiAnswer && (
          <div className="bg-white border-[2.5px] border-[#2A1048] rounded-xl p-4 text-xs font-bold text-[#2A1048] shadow-[2px_2px_0px_#2A1048] animate-fade-in flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#FF3D5A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#6C2BD9] font-black mb-0.5">AI Guide Response:</strong>
              {aiAnswer}
            </div>
          </div>
        )}
      </div>

      {/* Big Action Call To Start Quiz */}
      <div className="text-center pt-2">
        <button
          onClick={handleStartQuiz}
          className="btn-squish w-full md:w-auto px-12 py-4 bg-[#FFC93C] hover:bg-[#ffd35c] text-[#2A1048] font-black text-base md:text-lg rounded-2xl border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-5 h-5 fill-[#2A1048]" />
          START 5-QUESTION CHALLENGE
        </button>
        <p className="text-xs font-bold text-[#2A1048]/70 mt-2">
          Score 3/5 or higher to unlock Realm Runner and earn gold coins!
        </p>
      </div>
    </div>
  );
};
