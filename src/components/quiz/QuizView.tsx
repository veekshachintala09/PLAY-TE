import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { LiveAnimatedPet } from '../pet/LiveAnimatedPet';
import { Icon } from '../common/Icon';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Play,
  CheckCircle2,
  XCircle,
  Lightbulb,
  MessageCircle,
  Brain,
  Zap,
  Clock,
  Heart,
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const {
    topics,
    activeTopicId,
    completeQuiz,
    setView,
    setGameThemeToPlay,
    pet,
    character,
    currentDecision,
    difficulty,
  } = useGame();

  const currentTopic = topics.find((t) => t.id === activeTopicId) || topics[0];
  const questions = currentTopic.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [retriesCount, setRetriesCount] = useState(0);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);

  // Rephrased question
  const [simplifiedQuestion, setSimplifiedQuestion] = useState<string | null>(null);
  const [isSimplifying, setIsSimplifying] = useState(false);

  // Hesitation detection (> 10 seconds on question)
  const [hesitationSeconds, setHesitationSeconds] = useState(0);
  const [hesitationHelpPiped, setHesitationHelpPiped] = useState(false);
  const hesitationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Pet Animation State in Quiz
  const [petAction, setPetAction] = useState<'idle' | 'hop' | 'dance' | 'tilt' | 'eat' | 'sleep'>('idle');
  const [petMood, setPetMood] = useState<'happy' | 'curious' | 'worried' | 'proud' | 'excited'>('curious');
  const [petLiveThought, setPetLiveThought] = useState<string>('Analyzing learner pace...');

  // Adaptive alternative explanation
  const [altExplanation, setAltExplanation] = useState<string | null>(null);
  const [isLoadingAlt, setIsLoadingAlt] = useState(false);

  const [quizFinished, setQuizFinished] = useState(false);
  const [earnedReward, setEarnedReward] = useState<{ unlockedGame: boolean; earnedCoins: number } | null>(null);

  const currentQuestion = questions[currentIndex];

  // Hesitation Timer
  useEffect(() => {
    setHesitationSeconds(0);
    setHesitationHelpPiped(false);
    setSimplifiedQuestion(null);

    if (hesitationTimerRef.current) clearInterval(hesitationTimerRef.current);

    if (!isAnswered && !quizFinished) {
      setPetLiveThought(`Observing question #${currentIndex + 1} processing...`);
      hesitationTimerRef.current = setInterval(() => {
        setHesitationSeconds((prev) => {
          const next = prev + 1;
          if (next >= 10 && !hesitationHelpPiped) {
            setHesitationHelpPiped(true);
            setPetAction('tilt');
            setPetMood('curious');
            setPetLiveThought(`Learner paused > 10s. Scaffolding hint activated!`);
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (hesitationTimerRef.current) clearInterval(hesitationTimerRef.current);
    };
  }, [currentIndex, isAnswered, quizFinished]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    if (hesitationTimerRef.current) clearInterval(hesitationTimerRef.current);

    setSelectedOption(index);
    setIsAnswered(true);
    setAltExplanation(null);

    const isCorrect = index === currentQuestion.correctIndex;
    const answeredTime = hesitationSeconds;

    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);

      if (newStreak >= 3) {
        setPetAction('dance');
        setPetMood('excited');
        setPetLiveThought(`Streak of 3! Learner in high-flow state!`);
      } else {
        setPetAction('hop');
        setPetMood('proud');
        setPetLiveThought(`Answered correctly in ${answeredTime}s. Reinforcing confidence!`);
      }
    } else {
      sound.playIncorrect();
      setStreak(0);
      setPetAction('tilt');
      setPetMood('worried');
      setPetLiveThought(`Missed #${currentIndex + 1}. Preparing gentle scaffolding & concept review.`);
    }
  };

  const handleRephraseQuestion = async () => {
    if (isSimplifying) return;
    setIsSimplifying(true);
    sound.playPetReaction();

    try {
      const res = await fetch('/api/gemini/explain-differently', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          chosenOption: '',
          correctOption: currentQuestion.options[currentQuestion.correctIndex],
          explanation: currentQuestion.explanation,
          mode: 'different-angle',
        }),
      });
      const data = await res.json();
      setSimplifiedQuestion(data.response);
      setPetLiveThought(`Rephrased question in friendly, intuitive words.`);
    } catch {
      setSimplifiedQuestion(
        `Let's break it down: Focus on what happens step-by-step when this code or rule runs!`
      );
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleFetchAlternativeExplanation = async (mode: 'why-wrong' | 'different-angle') => {
    if (selectedOption === null || isLoadingAlt) return;
    setIsLoadingAlt(true);

    try {
      const res = await fetch('/api/gemini/explain-differently', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          chosenOption: currentQuestion.options[selectedOption],
          correctOption: currentQuestion.options[currentQuestion.correctIndex],
          explanation: currentQuestion.explanation,
          mode,
        }),
      });
      const data = await res.json();
      setAltExplanation(data.response);
      sound.playPetReaction();
      setPetLiveThought(`Alternative reasoning explanation provided.`);
    } catch {
      setAltExplanation(
        mode === 'why-wrong'
          ? `That choice doesn't quite match the required rule. The correct answer works because it satisfies the fundamental logic!`
          : `Imagine it like gears in a clock: each part triggers the next in exact sequence!`
      );
    } finally {
      setIsLoadingAlt(false);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setAltExplanation(null);
      setPetAction('idle');
      setPetMood('happy');
    } else {
      // Finalize quiz
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 0 : 0);
      const reward = completeQuiz(currentTopic.id, finalScore);
      setEarnedReward(reward);
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setRetriesCount((prev) => prev + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setAltExplanation(null);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
    setEarnedReward(null);
    setPetAction('idle');
    setPetMood('happy');
  };

  const handleLaunchGame = () => {
    setGameThemeToPlay(currentTopic.gameTheme);
    setView('game');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 select-none space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#6C2BD9] bg-[#B8F23A] px-2.5 py-0.5 rounded-full border-[2px] border-[#2A1048] inline-block mb-1 shadow-[2px_2px_0px_#2A1048]">
            {currentTopic.subCategory} · Level {currentTopic.level}
          </span>
          <h2 className="font-heading text-xl md:text-2xl font-black text-[#2A1048] truncate">
            {currentTopic.title}
          </h2>
        </div>

        <button
          onClick={() => setView('lesson')}
          className="btn-squish px-3.5 py-1.5 rounded-xl bg-white border-[2.5px] border-[#2A1048] text-xs font-black text-[#2A1048] cursor-pointer shadow-[2px_2px_0px_#2A1048]"
        >
          Review Lesson
        </button>
      </div>

      {/* QUIZ IN PROGRESS */}
      {!quizFinished && (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-8 space-y-6">
          {/* Progress Bar & Question Counter & Streak */}
          <div>
            <div className="flex items-center justify-between text-xs font-black text-[#2A1048] mb-2">
              <span>Question {currentIndex + 1} of 5</span>
              <div className="flex items-center gap-3">
                {streak >= 2 && (
                  <span className="flex items-center gap-1 text-[#FF3D5A] bg-white px-2 py-0.5 rounded-lg border-[1.5px] border-[#2A1048] animate-bounce">
                    <Icon name="flame" size={16} /> {streak} Streak!
                  </span>
                )}
                <span>Score: {score}/5</span>
              </div>
            </div>
            <div className="w-full h-4 bg-white rounded-full overflow-hidden border-[2.5px] border-[#2A1048] p-0.5 shadow-[2px_2px_0px_#2A1048]">
              <div
                className="h-full bg-[#FF3D5A] rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* PET LIVE REACTION & THOUGHT STREAM */}
          <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-3.5 shadow-[3px_3px_0px_#2A1048] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FFC93C] border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center shrink-0">
                <LiveAnimatedPet
                  type={pet.id}
                  mood={petMood}
                  action={petAction}
                  size="sm"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase text-[#6C2BD9] bg-[#B8F23A] px-2 py-0.2 rounded-md border-[1.5px] border-[#2A1048]">
                    {pet.name}'s Live Brain
                  </span>
                  <span className="text-[10px] text-[#2A1048]/60 font-bold">
                    ⏱️ {hesitationSeconds}s
                  </span>
                </div>
                <p className="text-xs font-bold text-[#2A1048] italic mt-0.5 leading-snug">
                  "{petLiveThought}"
                </p>
              </div>
            </div>

            {/* Streak celebration high-five */}
            {streak >= 3 && (
              <span className="hidden sm:inline-block px-3 py-1 rounded-xl bg-[#FF6FB5] text-white border-[2px] border-[#2A1048] text-[11px] font-black shadow-[2px_2px_0px_#2A1048]">
                🐾 High-Five!
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="font-heading text-lg md:text-xl font-black text-[#2A1048] leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Simplified rephrasing if requested */}
            {simplifiedQuestion && (
              <div className="bg-[#B8F23A]/30 border-[2px] border-[#2A1048] rounded-xl p-3 text-xs font-bold text-[#2A1048] animate-fade-in">
                <strong className="block text-[#6C2BD9] font-black mb-0.5">
                  Simpler Wording:
                </strong>
                {simplifiedQuestion}
              </div>
            )}
          </div>

          {/* 4 Options Buttons */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQuestion.correctIndex;

              let btnStyle = 'bg-white border-[#2A1048] text-[#2A1048] hover:bg-[#FFC93C]/20';
              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-[#B8F23A] border-[#2A1048] text-[#2A1048] shadow-[3px_3px_0px_#2A1048]';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-[#FF3D5A] border-[#2A1048] text-white shadow-[3px_3px_0px_#2A1048]';
                } else {
                  btnStyle = 'bg-white/50 border-[#2A1048]/30 text-[#2A1048]/40';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-[3px] font-bold text-xs md:text-sm flex items-center justify-between transition cursor-pointer shadow-[3px_3px_0px_#2A1048] ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#6C2BD9] text-white flex items-center justify-center text-xs font-black shrink-0 border-[1.5px] border-[#2A1048]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrectAnswer ? (
                        <CheckCircle2 className="w-5 h-5 text-[#2A1048] stroke-[3]" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-white stroke-[3]" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Hesitation Scaffold Notification (> 10s auto hint) */}
          {hesitationHelpPiped && !isAnswered && (
            <div className="bg-[#FFC93C]/30 border-[2.5px] border-[#2A1048] rounded-2xl p-3.5 flex items-start gap-3 animate-fade-in">
              <Lightbulb className="w-5 h-5 text-[#FF3D5A] shrink-0 mt-0.5" />
              <div className="text-xs font-bold text-[#2A1048]">
                <strong className="block font-black text-[#6C2BD9]">
                  {pet.name}'s Friendly Nudge:
                </strong>
                {currentQuestion.hint}
              </div>
            </div>
          )}

          {/* Immediate Feedback Box with Adaptive Buttons */}
          {isAnswered && (
            <div className="bg-white border-[3px] border-[#2A1048] rounded-2xl p-4 space-y-3 shadow-[3px_3px_0px_#2A1048] animate-fade-in">
              <div className="flex items-center gap-2">
                {selectedOption === currentQuestion.correctIndex ? (
                  <>
                    <Sparkles className="w-5 h-5 text-[#22C55E]" />
                    <span className="text-xs font-black text-[#22C55E]">
                      Spot on! Awesome reasoning! 🎉
                    </span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5 text-[#FF3D5A]" />
                    <span className="text-xs font-black text-[#FF3D5A]">
                      Almost there! Here's why:
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs font-bold text-[#2A1048] leading-relaxed">
                {currentQuestion.explanation}
              </p>

              {/* Adaptive Explanation Triggers for Incorrect Answers */}
              {selectedOption !== currentQuestion.correctIndex && (
                <div className="pt-2 border-t-[2px] border-[#2A1048]/15 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFetchAlternativeExplanation('why-wrong')}
                      disabled={isLoadingAlt}
                      className="btn-squish px-3 py-1.5 bg-[#FFC93C] text-[#2A1048] text-[11px] font-black rounded-xl border-[2px] border-[#2A1048] flex items-center gap-1.5 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      Why is that wrong?
                    </button>

                    <button
                      onClick={() => handleFetchAlternativeExplanation('different-angle')}
                      disabled={isLoadingAlt}
                      className="btn-squish px-3 py-1.5 bg-[#FF6FB5] text-white text-[11px] font-black rounded-xl border-[2px] border-[#2A1048] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      Explain differently
                    </button>
                  </div>

                  {altExplanation && (
                    <div className="bg-[#FFF4DC] border-[2px] border-[#2A1048] rounded-xl p-3 text-xs font-bold text-[#2A1048] leading-relaxed animate-fade-in">
                      <strong className="block text-[#6C2BD9] font-black mb-0.5">
                        {pet.name}'s Fresh Angle:
                      </strong>
                      {altExplanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Hint Toggle & Controls */}
          <div className="flex items-center justify-between pt-2">
            {!isAnswered ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    setHintsUsedCount((prev) => prev + 1);
                    sound.playPetReaction();
                  }}
                  className="btn-squish px-3.5 py-1.5 bg-white text-[#2A1048] text-xs font-black rounded-xl border-[2px] border-[#2A1048] flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#2A1048]"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-[#FF3D5A]" />
                  {showHint ? 'Hide Clue' : 'Clue Hint'}
                </button>

                <button
                  onClick={handleRephraseQuestion}
                  disabled={isSimplifying}
                  className="btn-squish px-3 py-1.5 bg-[#B8F23A] text-[#2A1048] text-xs font-black rounded-xl border-[2px] border-[#2A1048] flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#2A1048]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#6C2BD9]" />
                  Simpler Words
                </button>
              </div>
            ) : (
              <div />
            )}

            {isAnswered && (
              <button
                onClick={handleNext}
                className="btn-squish px-6 py-2.5 bg-[#B8F23A] hover:bg-[#cbf55c] text-[#2A1048] font-black text-xs md:text-sm rounded-xl border-[3px] border-[#2A1048] shadow-[3px_3px_0px_#2A1048] flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>

          {/* Active Hint display if toggled */}
          {showHint && !isAnswered && (
            <div className="bg-[#FFF4DC] border-[2px] border-[#2A1048] rounded-xl p-3 text-xs font-bold text-[#2A1048] animate-fade-in">
              <strong className="block text-[#FF3D5A] font-black mb-0.5">Hint:</strong>
              {currentQuestion.hint}
            </div>
          )}
        </div>
      )}

      {/* QUIZ COMPLETED SUMMARY SCREEN */}
      {quizFinished && (
        <div className="bg-[#FFF4DC] border-[4px] border-[#2A1048] shadow-[8px_8px_0px_#2A1048] rounded-3xl p-6 md:p-10 space-y-6 text-center animate-fade-in">
          {/* Trophy Header */}
          <div className="w-20 h-20 rounded-3xl bg-[#FFC93C] border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] mx-auto flex items-center justify-center">
            <Icon name={score >= 3 ? 'trophy' : 'nav-learn'} size={48} />
          </div>

          <div>
            <span className="text-xs uppercase font-black tracking-wider text-[#6C2BD9] bg-[#B8F23A] px-3 py-1 rounded-full border-[2px] border-[#2A1048] inline-block mb-2 shadow-[2px_2px_0px_#2A1048]">
              {score >= 3 ? 'CHALLENGE CONQUERED!' : 'KEEP PRACTICING!'}
            </span>
            <h2 className="font-heading text-3xl font-black text-[#2A1048]">
              You Scored {score} out of 5
            </h2>
            <p className="text-xs md:text-sm font-bold text-[#2A1048]/80 mt-1 max-w-md mx-auto">
              {score >= 3
                ? 'Fantastic mastery! You unlocked the realm arcade game and earned shiny gold coins!'
                : 'Great effort! You need at least 3/5 to unlock the realm mini-game. Review the notes and try again!'}
            </p>
          </div>

          {/* Reward Badges */}
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="bg-white border-[2.5px] border-[#2A1048] rounded-2xl p-3 shadow-[3px_3px_0px_#2A1048]">
              <span className="text-[10px] uppercase font-black text-[#2A1048]/70 block">
                Coins Earned
              </span>
              <span className="text-xl font-black text-[#2A1048] flex items-center justify-center gap-1.5 mt-0.5">
                <Icon name="coin" size={20} />
                <span>+{earnedReward?.earnedCoins || score * 10}</span>
              </span>
            </div>

            <div className="bg-white border-[2.5px] border-[#2A1048] rounded-2xl p-3 shadow-[3px_3px_0px_#2A1048]">
              <span className="text-[10px] uppercase font-black text-[#2A1048]/70 block">
                Mini-Game
              </span>
              <span
                className={`text-sm font-black mt-1 flex items-center justify-center gap-1.5 ${
                  score >= 3 ? 'text-[#22C55E]' : 'text-[#FF3D5A]'
                }`}
              >
                {score >= 3 ? (
                  <>
                    <Icon name="nav-games" size={16} />
                    <span>UNLOCKED!</span>
                  </>
                ) : (
                  <>
                    <Icon name="padlock" size={16} />
                    <span>LOCKED (3/5)</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            {score >= 3 ? (
              <button
                onClick={handleLaunchGame}
                className="btn-squish w-full sm:w-auto px-8 py-3.5 bg-[#B8F23A] text-[#2A1048] font-black text-sm rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#cbf55c]"
              >
                <Play className="w-4 h-4 fill-[#2A1048]" />
                Launch Realm Runner Game
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="btn-squish w-full sm:w-auto px-6 py-3.5 bg-[#FFC93C] text-[#2A1048] font-black text-sm rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 stroke-[3]" />
                Try Quiz Again
              </button>
            )}

            <button
              onClick={() => setView('learn')}
              className="btn-squish w-full sm:w-auto px-6 py-3.5 bg-white text-[#2A1048] font-black text-sm rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] cursor-pointer hover:bg-[#FFF4DC]"
            >
              Back to Realm Trail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
