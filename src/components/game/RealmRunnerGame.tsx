import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { ArrowLeft, Play, RotateCcw, Volume2, VolumeX, Shield, Heart, Zap, Sparkles, Magnet } from 'lucide-react';
import { QuizQuestion } from '../../types';
import { Icon } from '../common/Icon';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'air';
  color: string;
}

interface Collectible {
  x: number;
  y: number;
  radius: number;
  type: 'coin' | 'orb' | 'heart';
  collected: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export const RealmRunnerGame: React.FC<{ initialTheme?: string }> = ({ initialTheme }) => {
  const {
    character,
    gameThemeToPlay,
    addCoins,
    setView,
    audioEnabled,
    toggleAudio,
    showToast,
    currentDecision,
    pet,
    topics,
    activeTopicId,
  } = useGame();

  const theme = initialTheme || gameThemeToPlay || 'cyber';
  const currentTopic = topics.find((t) => t.id === activeTopicId) || topics[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'GATE' | 'GAMEOVER'>('READY');
  const [score, setScore] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lives, setLives] = useState(3);
  const [hasShield, setHasShield] = useState(false);
  const [hasMagnet, setHasMagnet] = useState(false);
  const [doubleCoins, setDoubleCoins] = useState(false);
  const [screenShake, setScreenShake] = useState(false);

  // Knowledge gate question
  const [gateQuestion, setGateQuestion] = useState<QuizQuestion | null>(null);
  const [gateAnswered, setGateAnswered] = useState(false);
  const [gateResultMsg, setGateResultMsg] = useState<string | null>(null);

  // Adaptive speed from agent
  const baseSpeed = currentDecision?.miniGameAdjustment?.speed || 5.5;

  // Runtime references
  const runnerRef = useRef({
    x: 90,
    y: 280,
    vy: 0,
    width: 38,
    height: 52,
    isGrounded: true,
    isSliding: false,
    slideTimer: 0,
    jumpCount: 0,
    shieldDuration: 0,
    magnetDuration: 0,
    doubleDuration: 0,
  });

  const stateRef = useRef({
    gameState: 'READY',
    speed: baseSpeed,
    distance: 0,
    score: 0,
    coinsCollected: 0,
    lives: 3,
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
    particles: [] as Particle[],
    lastObstacleSpawn: 0,
    lastCollectibleSpawn: 0,
    checkpointBanner: 0,
    lastGateDistance: 0,
  });

  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  // VIBRANT HAND-CRAFTED PALETTES (NO BLUE DOMINATED!)
  const getThemePalette = () => {
    switch (theme) {
      case 'forest':
        return {
          skyTop: '#064E3B',
          skyBottom: '#22C55E',
          groundColor: '#FFC93C', // Sunshine Yellow path
          groundDetail: '#2A1048',
          accent: '#B8F23A',
          name: '🌳 Enchanted Canopy Forest',
          narration: `I chose this lush forest so the fresh pine breeze clears your mind for creative coding!`,
        };
      case 'space':
        return {
          skyTop: '#2A1048', // Deep Plum
          skyBottom: '#6C2BD9', // Grape Purple
          groundColor: '#FF6FB5', // Bubblegum Pink platform
          groundDetail: '#2A1048',
          accent: '#FFC93C',
          name: '🌌 Cosmic Starlight Lab',
          narration: `Orbiting through starlight to test your high-velocity reflexes under cosmic physics!`,
        };
      case 'geometry':
        return {
          skyTop: '#2A1048',
          skyBottom: '#FF3D5A', // Hot Red sunset
          groundColor: '#FFC93C', // Sunshine Yellow
          groundDetail: '#2A1048',
          accent: '#B8F23A',
          name: '📐 Geometric Polyhedra Realm',
          narration: `Golden angle spirals and tessellations to strengthen your pattern intuition!`,
        };
      case 'ocean':
        return {
          skyTop: '#0D9488', // Teal (not navy/blue)
          skyBottom: '#FF6FB5', // Coral pink sunset
          groundColor: '#FFC93C', // Sandy gold
          groundDetail: '#2A1048',
          accent: '#B8F23A',
          name: '🌊 Coral Reef & Sunset Waters',
          narration: `Coral nurseries and gentle seafoam to reward your steady revision progress!`,
        };
      case 'cyber':
      default:
        return {
          skyTop: '#2A1048', // Deep Plum
          skyBottom: '#6C2BD9', // Grape Purple
          groundColor: '#B8F23A', // Lime Pop
          groundDetail: '#2A1048',
          accent: '#FF3D5A', // Hot Red
          name: '⚡ Cyber Grid Frontier',
          narration: `High-voltage neon logic grids tailored to your current coding pace!`,
        };
    }
  };

  const palette = getThemePalette();

  const handleJump = useCallback(() => {
    const runner = runnerRef.current;
    if (runner.jumpCount < 2) {
      runner.vy = -12.5;
      runner.jumpCount += 1;
      runner.isGrounded = false;
      runner.isSliding = false;
      sound.playJump();

      for (let i = 0; i < 6; i++) {
        stateRef.current.particles.push({
          x: runner.x + runner.width / 2,
          y: runner.y + runner.height,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2 + 1,
          life: 0,
          maxLife: 15,
          color: palette.accent,
        });
      }
    }
  }, [palette.accent]);

  const handleSlide = useCallback(() => {
    const runner = runnerRef.current;
    if (runner.isGrounded && !runner.isSliding) {
      runner.isSliding = true;
      runner.slideTimer = 28;
      runner.height = 28;
      runner.y += 24;
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (stateRef.current.gameState === 'GATE') return;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        if (stateRef.current.gameState === 'READY') {
          startGame();
        } else if (stateRef.current.gameState === 'PLAYING') {
          handleJump();
        }
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        if (stateRef.current.gameState === 'PLAYING') {
          handleSlide();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleJump, handleSlide]);

  const startGame = () => {
    runnerRef.current = {
      x: 90,
      y: 280,
      vy: 0,
      width: 38,
      height: 52,
      isGrounded: true,
      isSliding: false,
      slideTimer: 0,
      jumpCount: 0,
      shieldDuration: 0,
      magnetDuration: 0,
      doubleDuration: 0,
    };

    stateRef.current = {
      gameState: 'PLAYING',
      speed: baseSpeed,
      distance: 0,
      score: 0,
      coinsCollected: 0,
      lives: 3,
      obstacles: [],
      collectibles: [],
      particles: [],
      lastObstacleSpawn: 0,
      lastCollectibleSpawn: 0,
      checkpointBanner: 0,
      lastGateDistance: 0,
    };

    setLives(3);
    setScore(0);
    setCoinsCollected(0);
    setDistance(0);
    setHasShield(false);
    setHasMagnet(false);
    setDoubleCoins(false);
    setGameState('PLAYING');
    sound.playCorrect();
  };

  const triggerKnowledgeGate = () => {
    setGameState('GATE');
    const randomQ =
      currentTopic.questions[Math.floor(Math.random() * currentTopic.questions.length)];
    setGateQuestion(randomQ);
    setGateAnswered(false);
    setGateResultMsg(null);
    sound.playFanfare();
  };

  const handleGateAnswer = (optionIdx: number) => {
    if (!gateQuestion || gateAnswered) return;
    setGateAnswered(true);

    const isCorrect = optionIdx === gateQuestion.correctIndex;
    if (isCorrect) {
      sound.playFanfare();
      const rewards = ['Shield Armor', 'Coin Magnet', '2x Coin Multiplier'];
      const pick = rewards[Math.floor(Math.random() * rewards.length)];

      if (pick === 'Shield Armor') {
        runnerRef.current.shieldDuration = 360;
        setHasShield(true);
      } else if (pick === 'Coin Magnet') {
        runnerRef.current.magnetDuration = 360;
        setHasMagnet(true);
      } else {
        runnerRef.current.doubleDuration = 360;
        setDoubleCoins(true);
      }

      setGateResultMsg(`Correct! Unlocked Power-Up: ${pick}! ⚡`);
    } else {
      sound.playIncorrect();
      setGateResultMsg(`Good attempt! Keep running with determination!`);
    }

    setTimeout(() => {
      setGameState('PLAYING');
    }, 1800);
  };

  const endGame = () => {
    const earned = stateRef.current.coinsCollected;
    setGameState('GAMEOVER');
    sound.playIncorrect();

    if (earned > 0) {
      addCoins(earned, false);
      showToast(`Run Completed! +${earned} Gold Coins saved! 🪙`);
    }
  };

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const groundY = 330;

    const spawnObstacle = () => {
      const isAir = Math.random() < 0.35;
      const width = isAir ? 36 : 32 + Math.random() * 14;
      const height = isAir ? 26 : 40 + Math.random() * 18;
      const y = isAir ? groundY - 72 : groundY - height;

      stateRef.current.obstacles.push({
        x: canvas.width + 40,
        y,
        width,
        height,
        type: isAir ? 'air' : 'ground',
        color: isAir ? '#FF3D5A' : '#6C2BD9',
      });
    };

    const spawnCollectibles = () => {
      const roll = Math.random();
      const type: Collectible['type'] = roll < 0.75 ? 'coin' : roll < 0.9 ? 'orb' : 'heart';
      const isAir = Math.random() < 0.5;
      const y = isAir ? groundY - 80 : groundY - 30;

      stateRef.current.collectibles.push({
        x: canvas.width + 30,
        y,
        radius: type === 'coin' ? 10 : 13,
        type,
        collected: false,
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // PARALLAX BACKGROUND
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
      skyGrad.addColorStop(0, palette.skyTop);
      skyGrad.addColorStop(1, palette.skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decorative silhouettes
      const offset = (stateRef.current.distance * 0.4) % 180;
      ctx.fillStyle = 'rgba(42, 16, 72, 0.25)';
      for (let i = -1; i < canvas.width / 90 + 2; i++) {
        const h = 75 + (i % 3) * 28;
        ctx.beginPath();
        ctx.moveTo(i * 120 - offset, groundY);
        ctx.lineTo(i * 120 + 60 - offset, groundY - h);
        ctx.lineTo(i * 120 + 120 - offset, groundY);
        ctx.fill();
      }

      // Ground Block
      ctx.fillStyle = palette.groundColor;
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Thick Dark Plum Ground Outline
      ctx.strokeStyle = palette.groundDetail;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Chunky ground tiles
      const groundOffset = (stateRef.current.distance * 3) % 40;
      ctx.strokeStyle = '#2A1048';
      ctx.lineWidth = 3;
      for (let gx = -groundOffset; gx < canvas.width; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, groundY);
        ctx.lineTo(gx - 20, canvas.height);
        ctx.stroke();
      }

      // PARTICLES
      for (let i = stateRef.current.particles.length - 1; i >= 0; i--) {
        const p = stateRef.current.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2A1048';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (p.life >= p.maxLife) {
          stateRef.current.particles.splice(i, 1);
        }
      }

      // RUNNING LOGIC
      if (stateRef.current.gameState === 'PLAYING') {
        const runner = runnerRef.current;

        // Gravity
        runner.vy += 0.65;
        runner.y += runner.vy;

        if (runner.y + runner.height >= groundY) {
          runner.y = groundY - runner.height;
          runner.vy = 0;
          runner.isGrounded = true;
          runner.jumpCount = 0;
        }

        // Sliding
        if (runner.isSliding) {
          runner.slideTimer--;
          if (runner.slideTimer <= 0) {
            runner.isSliding = false;
            runner.height = 52;
            runner.y -= 24;
          }
        }

        // Buffs countdown
        if (runner.shieldDuration > 0) {
          runner.shieldDuration--;
          if (runner.shieldDuration === 0) setHasShield(false);
        }
        if (runner.magnetDuration > 0) {
          runner.magnetDuration--;
          if (runner.magnetDuration === 0) setHasMagnet(false);
        }
        if (runner.doubleDuration > 0) {
          runner.doubleDuration--;
          if (runner.doubleDuration === 0) setDoubleCoins(false);
        }

        // Progression
        stateRef.current.distance += 0.22;
        stateRef.current.score += Math.round(stateRef.current.speed / 2);

        // Checkpoint & Knowledge Gate trigger every 200m
        if (
          stateRef.current.distance - stateRef.current.lastGateDistance >= 200 &&
          stateRef.current.distance > 50
        ) {
          stateRef.current.lastGateDistance = stateRef.current.distance;
          triggerKnowledgeGate();
          return;
        }

        setDistance(Math.floor(stateRef.current.distance));
        setScore(stateRef.current.score);

        // Spawn obstacles
        stateRef.current.lastObstacleSpawn++;
        const spawnInterval = Math.max(70, 130 - stateRef.current.speed * 4);
        if (stateRef.current.lastObstacleSpawn > spawnInterval) {
          spawnObstacle();
          stateRef.current.lastObstacleSpawn = 0;
        }

        // Spawn collectibles
        stateRef.current.lastCollectibleSpawn++;
        if (stateRef.current.lastCollectibleSpawn > 80) {
          spawnCollectibles();
          stateRef.current.lastCollectibleSpawn = 0;
        }

        // Obstacles collision
        for (let i = stateRef.current.obstacles.length - 1; i >= 0; i--) {
          const obs = stateRef.current.obstacles[i];
          obs.x -= stateRef.current.speed;

          if (
            runner.x < obs.x + obs.width &&
            runner.x + runner.width > obs.x &&
            runner.y < obs.y + obs.height &&
            runner.y + runner.height > obs.y
          ) {
            if (runner.shieldDuration > 0) {
              runner.shieldDuration = 0;
              setHasShield(false);
              stateRef.current.obstacles.splice(i, 1);
              sound.playIncorrect();
              continue;
            } else {
              stateRef.current.lives--;
              setLives(stateRef.current.lives);
              sound.playIncorrect();

              setScreenShake(true);
              setTimeout(() => setScreenShake(false), 250);

              for (let p = 0; p < 10; p++) {
                stateRef.current.particles.push({
                  x: runner.x + runner.width / 2,
                  y: runner.y + runner.height / 2,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  life: 0,
                  maxLife: 20,
                  color: '#FF3D5A',
                });
              }

              stateRef.current.obstacles.splice(i, 1);
              if (stateRef.current.lives <= 0) {
                endGame();
                break;
              }
              continue;
            }
          }

          if (obs.x + obs.width < -10) {
            stateRef.current.obstacles.splice(i, 1);
          }
        }

        // Collectibles & Magnet
        for (let i = stateRef.current.collectibles.length - 1; i >= 0; i--) {
          const c = stateRef.current.collectibles[i];
          c.x -= stateRef.current.speed;

          // Magnet pull
          if (runner.magnetDuration > 0 && c.type === 'coin') {
            const mdx = runner.x - c.x;
            const mdy = runner.y - c.y;
            c.x += mdx * 0.12;
            c.y += mdy * 0.12;
          }

          const dx = runner.x + runner.width / 2 - c.x;
          const dy = runner.y + runner.height / 2 - c.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < c.radius + runner.width / 2) {
            c.collected = true;
            if (c.type === 'coin') {
              const add = runner.doubleDuration > 0 ? 10 : 5;
              stateRef.current.coinsCollected += add;
              stateRef.current.score += 50;
              setCoinsCollected(stateRef.current.coinsCollected);
              sound.playCoin();
            } else if (c.type === 'orb') {
              stateRef.current.score += 200;
              runner.shieldDuration = 240;
              setHasShield(true);
              sound.playCorrect();
            } else if (c.type === 'heart') {
              stateRef.current.lives = Math.min(3, stateRef.current.lives + 1);
              setLives(stateRef.current.lives);
              sound.playCorrect();
            }

            stateRef.current.collectibles.splice(i, 1);
            continue;
          }

          if (c.x + c.radius < -10) {
            stateRef.current.collectibles.splice(i, 1);
          }
        }
      }

      // DRAW COLLECTIBLES
      stateRef.current.collectibles.forEach((c) => {
        ctx.save();
        if (c.type === 'coin') {
          ctx.fillStyle = '#FFC93C'; // Sunshine Yellow
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#2A1048';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.fillStyle = '#2A1048';
          ctx.font = '900 11px Fredoka, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', c.x, c.y);
        } else if (c.type === 'orb') {
          ctx.fillStyle = '#B8F23A';
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#2A1048';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (c.type === 'heart') {
          ctx.fillStyle = '#FF3D5A';
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#2A1048';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        ctx.restore();
      });

      // DRAW OBSTACLES
      stateRef.current.obstacles.forEach((obs) => {
        ctx.save();
        ctx.fillStyle = obs.color;
        ctx.strokeStyle = '#2A1048';
        ctx.lineWidth = 3.5;

        if (obs.type === 'air') {
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Drone eye
          ctx.fillStyle = '#B8F23A';
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 8);
          ctx.fill();
          ctx.stroke();
          // Warning diagonal line
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + 10);
          ctx.lineTo(obs.x + obs.width, obs.y + 20);
          ctx.stroke();
        }
        ctx.restore();
      });

      // DRAW RUNNER CHARACTER (CUSTOMIZED TO USER TRAITS)
      const runner = runnerRef.current;
      ctx.save();

      // Shield Aura
      if (runner.shieldDuration > 0) {
        ctx.strokeStyle = '#B8F23A';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(runner.x + runner.width / 2, runner.y + runner.height / 2, runner.width * 0.9, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Runner Torso & Clothes
      ctx.fillStyle = character.outfitColor || '#6C2BD9';
      ctx.strokeStyle = '#2A1048';
      ctx.lineWidth = 3.5;

      if (runner.isSliding) {
        ctx.beginPath();
        ctx.roundRect(runner.x, runner.y + 6, runner.width + 14, runner.height - 6, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = character.skinTone || '#FCD34D';
        ctx.beginPath();
        ctx.arc(runner.x + runner.width + 6, runner.y + 12, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        const legPhase = Math.sin(stateRef.current.distance * 0.8);

        // Cape
        if (character.accessory === 'cape') {
          ctx.fillStyle = '#FF3D5A';
          ctx.beginPath();
          ctx.moveTo(runner.x + 8, runner.y + 18);
          ctx.lineTo(runner.x - 16, runner.y + 36 + Math.sin(stateRef.current.distance) * 4);
          ctx.lineTo(runner.x + 12, runner.y + 38);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        // Legs
        ctx.fillStyle = '#2A1048';
        ctx.fillRect(runner.x + 6 + legPhase * 6, runner.y + runner.height - 14, 8, 14);
        ctx.fillRect(runner.x + 22 - legPhase * 6, runner.y + runner.height - 14, 8, 14);

        // Body
        ctx.fillStyle = character.outfitColor || '#6C2BD9';
        ctx.beginPath();
        ctx.roundRect(runner.x + 5, runner.y + 16, runner.width - 10, 24, 6);
        ctx.fill();
        ctx.stroke();

        // Head
        ctx.fillStyle = character.skinTone || '#FCD34D';
        ctx.beginPath();
        ctx.arc(runner.x + runner.width / 2, runner.y + 12, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hair
        ctx.fillStyle = character.hairColor || '#451A03';
        ctx.beginPath();
        ctx.arc(runner.x + runner.width / 2, runner.y + 8, 12, Math.PI * 1.1, Math.PI * 1.9);
        ctx.fill();
        ctx.stroke();
      }

      // DRAW COMPANION PET RUNNING BESIDE PLAYER!
      const petBob = Math.sin(stateRef.current.distance * 1.2) * 5;
      const petX = runner.x - 42;
      const petY = runner.y + 10 + petBob;

      ctx.fillStyle =
        pet.id === 'cat' ? '#6C2BD9' : pet.id === 'robot' ? '#22C55E' : '#FF3D5A';
      ctx.beginPath();
      ctx.arc(petX, petY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#2A1048';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Pet face detail
      ctx.fillStyle = '#2A1048';
      ctx.beginPath();
      ctx.arc(petX + 3, petY - 2, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [character, palette, pet]);

  return (
    <div className={`max-w-4xl mx-auto p-4 md:p-6 select-none ${screenShake ? 'animate-wiggle' : ''}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setView('learn')}
          className="btn-squish px-3.5 py-2 rounded-2xl bg-white border-[2.5px] border-[#2A1048] text-xs font-black text-[#2A1048] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Exit to Lessons
        </button>

        <div className="text-center">
          <span className="text-xs font-black uppercase text-[#2A1048] bg-[#B8F23A] border-[2px] border-[#2A1048] px-3 py-1 rounded-full shadow-[2px_2px_0px_#2A1048]">
            {palette.name}
          </span>
        </div>

        <button
          onClick={toggleAudio}
          className="w-10 h-10 rounded-2xl bg-white border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] flex items-center justify-center text-[#2A1048] cursor-pointer"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Game Screen Stage */}
      <div className="relative bg-[#2A1048] border-[4px] border-[#2A1048] rounded-3xl overflow-hidden shadow-[8px_8px_0px_#2A1048]">
        {/* HUD Overlay Bar */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          {/* Hearts */}
          <div className="flex items-center gap-1.5 bg-[#FFF4DC] border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] px-3 py-1.5 rounded-2xl">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-4 h-4 ${
                  h <= lives ? 'text-[#FF3D5A] fill-[#FF3D5A]' : 'text-[#2A1048]/30'
                }`}
              />
            ))}
            {hasShield && <Shield className="w-4 h-4 text-[#B8F23A] fill-[#B8F23A] ml-1" />}
            {hasMagnet && <Magnet className="w-4 h-4 text-[#FFC93C] fill-[#FFC93C] ml-1" />}
          </div>

          {/* Meters */}
          <div className="flex items-center gap-2">
            <div className="bg-[#FFF4DC] border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] px-3 py-1.5 rounded-2xl text-xs font-black text-[#2A1048] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#FF3D5A]" />
              <span>{distance} m</span>
            </div>

            <div className="bg-[#FFF4DC] border-[2.5px] border-[#2A1048] shadow-[2px_2px_0px_#2A1048] px-3 py-1.5 rounded-2xl text-xs font-black text-[#2A1048] flex items-center gap-1.5">
              <Icon name="coin" size={16} />
              <span>+{coinsCollected}</span>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={800}
          height={420}
          className="w-full h-auto block aspect-[800/420]"
        />

        {/* START SCREEN OVERLAY */}
        {gameState === 'READY' && (
          <div className="absolute inset-0 bg-[#2A1048]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-[#B8F23A] border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center">
              <Icon name="ach-first-game" size={44} />
            </div>

            <div>
              <h2 className="text-3xl font-black text-white">{palette.name}</h2>
              <p className="text-xs text-[#FFF4DC] max-w-md mx-auto mt-1 italic">
                "{palette.narration}"
              </p>
            </div>

            <button
              onClick={startGame}
              className="btn-squish px-10 py-4 bg-[#FFC93C] hover:bg-[#ffd35c] text-[#2A1048] font-black text-base rounded-2xl border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-[#2A1048]" /> Start Adventure Run
            </button>
          </div>
        )}

        {/* KNOWLEDGE GATE CHECKPOINT MODAL */}
        {gameState === 'GATE' && gateQuestion && (
          <div className="absolute inset-0 bg-[#2A1048]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fade-in">
            <div className="bg-[#FFF4DC] border-[4px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 max-w-md w-full space-y-4">
              <span className="text-[10px] uppercase font-black text-[#6C2BD9] bg-[#B8F23A] px-3 py-0.5 rounded-full border-[2px] border-[#2A1048]">
                ⚡ Knowledge Gate Checkpoint ⚡
              </span>

              <h3 className="text-base font-black text-[#2A1048] leading-snug">
                {gateQuestion.question}
              </h3>

              {!gateAnswered ? (
                <div className="space-y-2">
                  {gateQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleGateAnswer(i)}
                      className="w-full text-left p-3 rounded-xl border-[2.5px] border-[#2A1048] bg-white hover:bg-[#FFC93C]/20 text-xs font-black text-[#2A1048] transition cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-[#B8F23A] border-[2px] border-[#2A1048] rounded-xl p-3 text-xs font-black text-[#2A1048] animate-bounce">
                  {gateResultMsg}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GAME OVER MODAL */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-[#2A1048]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-[#FF3D5A] border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center">
              <Icon name="finish-flag" size={38} />
            </div>

            <div>
              <h2 className="text-3xl font-black text-white">Run Completed!</h2>
              <p className="text-xs text-[#FFF4DC]/80 mt-1">
                You gathered treasure and dodged obstacles across the realm!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              <div className="bg-[#FFF4DC] border-[2.5px] border-[#2A1048] rounded-2xl p-3 shadow-[2px_2px_0px_#2A1048]">
                <span className="text-[10px] font-black uppercase text-[#2A1048]/60">Distance</span>
                <p className="text-lg font-black text-[#2A1048]">{distance}m</p>
              </div>
              <div className="bg-[#FFF4DC] border-[2.5px] border-[#2A1048] rounded-2xl p-3 shadow-[2px_2px_0px_#2A1048]">
                <span className="text-[10px] font-black uppercase text-[#2A1048]/60">Score</span>
                <p className="text-lg font-black text-[#6C2BD9]">{score}</p>
              </div>
              <div className="bg-[#FFF4DC] border-[2.5px] border-[#2A1048] rounded-2xl p-3 shadow-[2px_2px_0px_#2A1048]">
                <span className="text-[10px] font-black uppercase text-[#2A1048]/60">Gold</span>
                <p className="text-lg font-black text-[#FF3D5A] flex items-center justify-center gap-1">
                  <Icon name="coin" size={14} />
                  <span>+{coinsCollected}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={startGame}
                className="btn-squish px-6 py-3 bg-[#FFC93C] text-[#2A1048] font-black text-xs rounded-2xl border-[3px] border-[#2A1048] flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 stroke-[3]" /> Run Again
              </button>
              <button
                onClick={() => setView('learn')}
                className="btn-squish px-6 py-3 bg-white text-[#2A1048] font-black text-xs rounded-2xl border-[3px] border-[#2A1048] cursor-pointer"
              >
                Continue Lessons
              </button>
            </div>
          </div>
        )}
      </div>

      {/* On-Screen Mobile & Touch Game Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={handleSlide}
          className="btn-squish flex-1 max-w-[170px] py-3.5 bg-white text-[#2A1048] font-black text-sm rounded-2xl border-[3px] border-[#2A1048] cursor-pointer"
        >
          ⬇️ Slide / Duck
        </button>

        <button
          onClick={handleJump}
          className="btn-squish flex-1 max-w-[210px] py-3.5 bg-[#FFC93C] text-[#2A1048] font-black text-sm rounded-2xl border-[3px] border-[#2A1048] cursor-pointer"
        >
          ⬆️ Jump (Double Jump!)
        </button>
      </div>
    </div>
  );
};
