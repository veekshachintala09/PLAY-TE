/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/layout/Toast';
import { HomeView } from './components/home/HomeView';
import { DomainSelectView } from './components/learn/DomainSelectView';
import { TopicLessonView } from './components/learn/TopicLessonView';
import { QuizView } from './components/quiz/QuizView';
import { GameHubView } from './components/game/GameHubView';
import { PetRoom } from './components/pet/PetRoom';
import { PetShop } from './components/shop/PetShop';
import { AchievementsView } from './components/achievements/AchievementsView';
import { ProfileView } from './components/profile/ProfileView';
import { CharacterCreator } from './components/character/CharacterCreator';
import { PetCompanionWidget } from './components/pet/PetCompanionWidget';

const AppContent: React.FC = () => {
  const { view, setView, isFirstTimeUser } = useGame();

  // If first time opening the game, launch the Hero Character Creation studio!
  if (isFirstTimeUser) {
    return (
      <div className="min-h-screen bg-[#FFF4DC] text-[#2A1048] flex flex-col justify-center py-10 px-4">
        <Toast />
        <CharacterCreator onComplete={() => setView('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#2A1048] flex flex-col pb-16 md:pb-6">
      {/* Top Navigation */}
      <Navbar />

      {/* Toast Notification Banner */}
      <Toast />

      {/* Main Dynamic View Router */}
      <main className="flex-1 w-full animate-fade-in">
        {view === 'home' && <HomeView />}
        {view === 'learn' && <DomainSelectView />}
        {view === 'lesson' && <TopicLessonView />}
        {view === 'quiz' && <QuizView />}
        {view === 'game' && <GameHubView />}
        {view === 'pet' && <PetRoom />}
        {view === 'shop' && <PetShop />}
        {view === 'achievements' && <AchievementsView />}
        {view === 'profile' && <ProfileView />}
        {view === 'character-customizer' && (
          <div className="py-6">
            <CharacterCreator onComplete={() => setView('profile')} />
          </div>
        )}
      </main>

      {/* Floating Animated AI Pet Companion */}
      {view !== 'character-customizer' && <PetCompanionWidget />}

      {/* Mobile Bottom Thumb Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
