import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { QuizQuestion } from '../../types';
import { sound } from '../../utils/audio';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Award,
  ArrowLeft,
} from 'lucide-react';

export const RevisionQuestView: React.FC = () => {
  const { activeRevisionQuest, resolveRevisionQuest, setView, addCoins } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Fallback questions if none exist
  const defaultQuestions: QuizQuestion[] = [
    {
      id: 'rev-def-1',
      question: 'What is the most effective approach to mastering new concepts?',
      options: ['Connecting them to real-world analogies', 'Memorizing without understanding', 'Skipping practice', 'Guessing randomly'],
      correctIndex: 0,
      hint: 'Think about relating ideas to what you already know.',
      explanation: 'Analogies connect fresh ideas to familiar mental models.',
    },
    {
      id: 'rev-def-2',
      question: 'How does spaced revision help your brain retain knowledge?',
      options: ['It strengthens long-term neural pathways before you forget', 'It erases old data', 'It only works for numbers', 'It stops thinking'],
      correctIndex: 0,
      hint: 'Revisiting right when recall begins to fade.',
      explanation: 'Spaced repetition actively interrupts the forgetting curve.',
    },
    {
      id: 'rev-def-3',
      question: 'When a code or math challenge feels difficult, what should you do first?',
      options: ['Break it down into smaller, simpler steps', 'Close the app', 'Panic', 'Change your name'],
      correctIndex: 0,
      hint: 'Divide and conquer.',
      explanation: 'Decomposing complex problems into smaller parts makes them solvable.',
    },
  ];

  const questions =
    activeRevisionQuest?.questions && activeRevisionQuest.questions.length > 0
      ? activeRevisionQuest.questions
      : defaultQuestions;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sound.playIncorrect();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const passed = score + (selectedOption === currentQ.correctIndex ? 0 : 0) >= 2;
      if (passed) {
        sound.playFanfare();
        addCoins(75, false);
        if (activeRevisionQuest) {
          resolveRevisionQuest(activeRevisionQuest.topicId);
        }
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 select-none">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setView('learn')}
          className="btn-squish px-3 py-1.5 rounded-xl bg-white border-[2.5px] border-[#2A1048] text-xs font-black text-[#2A1048] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Quest
        </button>

        <span className="text-xs font-black uppercase text-[#6C2BD9] bg-[#B8F23A] px-2.5 py-1 rounded-full border-[2px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048]">
          Spaced Revision Quest
        </span>
      </div>

      {!isFinished ? (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <div className="flex justify-between text-xs font-black text-[#2A1048] mb-1.5">
              <span>Question {currentIndex + 1} of 3</span>
              <span>Targeting: {activeRevisionQuest?.conceptName || 'Core Concept'}</span>
            </div>
            <div className="w-full h-3 bg-white rounded-full border-[2px] border-[#2A1048] overflow-hidden p-0.5">
              <div
                className="h-full bg-[#FF3D5A] rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-black text-[#2A1048] leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt: string, idx: number) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-white border-[#2A1048] text-[#2A1048] hover:bg-[#FFC93C]/20';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-[#B8F23A] border-[#2A1048] text-[#2A1048] shadow-[3px_3px_0px_#2A1048]';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-[#FF3D5A] border-[#2A1048] text-white shadow-[3px_3px_0px_#2A1048]';
                } else {
                  btnStyle = 'bg-white/60 border-[#2A1048]/40 text-[#2A1048]/40';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-[3px] font-bold text-xs md:text-sm flex items-center justify-between transition cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#6C2BD9] text-white flex items-center justify-center text-xs font-black shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#2A1048]" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-white" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className="bg-white border-[2.5px] border-[#2A1048] rounded-2xl p-4 space-y-1.5 shadow-[2px_2px_0px_#2A1048] animate-fade-in">
              <span className="text-xs font-black text-[#6C2BD9] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#FFC93C]" />
                Key Concept Insight:
              </span>
              <p className="text-xs text-[#2A1048] leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="btn-squish px-6 py-2.5 bg-[#FFC93C] text-[#2A1048] font-black text-xs md:text-sm rounded-xl border-[3px] border-[#2A1048] flex items-center gap-2 cursor-pointer"
              >
                {currentIndex + 1 === 3 ? 'Finish Quest' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Finished Revision Screen */
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#B8F23A] border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center text-4xl mx-auto">
            🧠
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#2A1048]">
              Revision Quest Completed!
            </h2>
            <p className="text-xs text-[#2A1048]/80 mt-1 max-w-sm mx-auto">
              Your score: <strong className="text-base text-[#6C2BD9]">{score} / 3</strong>. Your AI companion has upgraded this topic's mastery meter!
            </p>
          </div>

          <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 max-w-xs mx-auto shadow-[3px_3px_0px_#2A1048]">
            <span className="text-[10px] font-black uppercase text-[#2A1048]/60 block">Bounty Earned</span>
            <span className="text-xl font-black text-[#FF3D5A]">+75 🪙 Gold Coins!</span>
          </div>

          <button
            onClick={() => setView('learn')}
            className="btn-squish px-8 py-3 bg-[#6C2BD9] text-white font-black text-xs md:text-sm rounded-2xl border-[3px] border-[#2A1048] cursor-pointer"
          >
            Return to Mastery Map
          </button>
        </div>
      )}
    </div>
  );
};
