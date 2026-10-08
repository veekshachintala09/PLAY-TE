import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { CharacterAvatar } from './CharacterAvatar';
import { CharacterConfig } from '../../types';
import {
  Camera,
  Upload,
  Sparkles,
  Sliders,
  ShieldCheck,
  Check,
  RotateCcw,
  AlertCircle,
  Dices,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface PhotoCharacterCreatorProps {
  onComplete: () => void;
}

export const PhotoCharacterCreator: React.FC<PhotoCharacterCreatorProps> = ({ onComplete }) => {
  const { character, setCharacter, setIsFirstTimeUser, showToast } = useGame();

  // Mode: choice, camera, analyzing, review
  const [step, setStep] = useState<'choice' | 'camera' | 'analyzing' | 'review'>('choice');
  const [hasCameraConsent, setHasCameraConsent] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [analyzingStage, setAnalyzingStage] = useState(0);
  const [draft, setDraft] = useState<CharacterConfig>(character);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      setHasCameraConsent(true);
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera access was not granted. You can upload a photo or build manually!');
      setCameraActive(false);
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 480, 480);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    // Stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      setCameraActive(false);
    }

    processPhotoWithAI(dataUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        processPhotoWithAI(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const processPhotoWithAI = async (photoBase64: string) => {
    setStep('analyzing');
    sound.playPetReaction();

    // Stage simulation for delightful "Creating your hero..." animation
    const stages = [
      'Scanning facial features & lighting...',
      'Mapping eye color and hairstyle...',
      'Styling cartoon game gear & palette...',
      'Polishing hand-crafted hero avatar!',
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < stages.length) {
        setAnalyzingStage(current);
      }
    }, 700);

    try {
      const res = await fetch('/api/gemini/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoBase64 }),
      });
      const data = await res.json();
      clearInterval(interval);

      if (data.success && data.traits) {
        const t = data.traits;
        setDraft((prev) => ({
          ...prev,
          skinTone: t.skinTone || prev.skinTone,
          hairColor: t.hairColor || prev.hairColor,
          hairStyle: t.hairStyle || prev.hairStyle,
          eyeStyle: t.glasses ? 'glasses' : 'cheerful',
          outfitColor: t.suggestedOutfitColor || '#6C2BD9',
        }));
      }
    } catch {
      clearInterval(interval);
      // Fallback traits already set
    } finally {
      setTimeout(() => {
        sound.playFanfare();
        setStep('review');
      }, 500);
    }
  };

  const handleRandomize = () => {
    sound.playCoin();
    const skins = ['#FDE68A', '#FCD34D', '#F59E0B', '#D97706', '#B45309', '#78350F'];
    const hairs = ['#1E293B', '#451A03', '#D97706', '#DC2626', '#6C2BD9', '#FF3D5A'];
    const styles: CharacterConfig['hairStyle'][] = [
      'short-spike',
      'curly-afro',
      'bob-cut',
      'wavy-long',
      'cap',
      'ponytail',
    ];
    const outfits = ['#6C2BD9', '#FF3D5A', '#22C55E', '#B8F23A', '#FFC93C', '#FF6FB5'];

    setDraft((prev) => ({
      ...prev,
      skinTone: skins[Math.floor(Math.random() * skins.length)],
      hairColor: hairs[Math.floor(Math.random() * hairs.length)],
      hairStyle: styles[Math.floor(Math.random() * styles.length)],
      outfitColor: outfits[Math.floor(Math.random() * outfits.length)],
    }));
  };

  const handleConfirmHero = () => {
    sound.playFanfare();
    setCharacter(draft);
    setIsFirstTimeUser(false);
    showToast(`Hero ${draft.name || 'Wayfarer'} created! Adventure begins! ⭐`);
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 select-none">
      {/* 1. CHOICE SCREEN */}
      {step === 'choice' && (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-8 text-center space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#6C2BD9] bg-[#B8F23A] border-[2px] border-[#2A1048] px-3 py-1 rounded-full shadow-[2px_2px_0px_#2A1048] inline-block mb-2">
              Character Forge
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#2A1048] leading-tight">
              Create Your Game Hero!
            </h1>
            <p className="text-sm text-[#2A1048]/80 max-w-md mx-auto mt-2">
              Your hero runs through arcade realms, dodges obstacles, and learns with your AI pet.
            </p>
          </div>

          {/* Privacy Note */}
          <div className="bg-[#FFC93C]/20 border-[2.5px] border-[#2A1048] rounded-2xl p-3.5 max-w-lg mx-auto text-left flex items-start gap-3 shadow-[2px_2px_0px_#2A1048]">
            <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
            <div className="text-xs text-[#2A1048]">
              <strong className="block font-black text-[#2A1048] mb-0.5">Privacy Promise</strong>
              Your photo stays private and is only used by Gemini to generate your cartoon traits. The photo is never stored.
            </div>
          </div>

          {/* Two Big Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
            {/* Main Option: SNAP PHOTO */}
            <button
              onClick={() => {
                sound.playCorrect();
                setStep('camera');
                startCamera();
              }}
              className="btn-squish bg-[#FF3D5A] hover:bg-[#ff556e] text-white p-6 rounded-3xl border-[3.5px] border-[#2A1048] flex flex-col items-center text-center cursor-pointer tilt-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FFC93C] border-[3px] border-[#2A1048] flex items-center justify-center text-3xl mb-3 shadow-[3px_3px_0px_#2A1048]">
                📸
              </div>
              <span className="text-lg font-black block">SNAP MY PHOTO</span>
              <span className="text-xs text-white/90 font-bold mt-1">
                Take a selfie or upload image
              </span>
            </button>

            {/* Manual Customizer */}
            <button
              onClick={() => {
                sound.playCorrect();
                setStep('review');
              }}
              className="btn-squish bg-[#B8F23A] hover:bg-[#cbf55c] text-[#2A1048] p-6 rounded-3xl border-[3.5px] border-[#2A1048] flex flex-col items-center text-center cursor-pointer tilt-right"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6C2BD9] text-white border-[3px] border-[#2A1048] flex items-center justify-center text-3xl mb-3 shadow-[3px_3px_0px_#2A1048]">
                🎨
              </div>
              <span className="text-lg font-black block">BUILD MY OWN</span>
              <span className="text-xs text-[#2A1048]/80 font-bold mt-1">
                Pick hairstyles & gear by hand
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 2. CAMERA SNAPSHOT SCREEN */}
      {step === 'camera' && (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 text-center space-y-4">
          <h2 className="text-2xl font-black text-[#2A1048]">
            Snap Your Hero Selfie
          </h2>
          <p className="text-xs text-[#2A1048]/80 max-w-sm mx-auto">
            Position your face in the center and click snap!
          </p>

          {/* Camera Viewport */}
          <div className="relative w-72 h-72 mx-auto rounded-3xl border-[3.5px] border-[#2A1048] bg-[#2A1048] overflow-hidden shadow-[4px_4px_0px_#2A1048] flex items-center justify-center">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="p-4 text-white text-xs space-y-2">
                <Camera className="w-10 h-10 mx-auto text-[#FFC93C] mb-2" />
                <p>{cameraError || 'Activating camera...'}</p>
                <button
                  onClick={startCamera}
                  className="px-3 py-1.5 bg-[#B8F23A] text-[#2A1048] font-black rounded-xl border-[2px] border-[#2A1048] text-xs"
                >
                  Grant Camera Access
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {cameraActive && (
              <button
                onClick={handleCapturePhoto}
                className="btn-squish px-8 py-3.5 bg-[#FF3D5A] text-white font-black text-sm rounded-2xl border-[3px] border-[#2A1048] flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                Take Snapshot
              </button>
            )}

            {/* Upload File Alternative */}
            <label className="btn-squish px-6 py-3.5 bg-[#FFC93C] text-[#2A1048] font-black text-sm rounded-2xl border-[3px] border-[#2A1048] flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              Upload Image Instead
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={() => setStep('review')}
              className="px-4 py-2 text-xs font-bold text-[#6C2BD9] hover:underline cursor-pointer"
            >
              Skip to Manual Customizer →
            </button>
          </div>
        </div>
      )}

      {/* 3. CREATING YOUR HERO ANIMATION */}
      {step === 'analyzing' && (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-10 text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-[#B8F23A] border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center text-4xl animate-bounce">
            ✨
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#2A1048]">
              Creating Your Hero...
            </h2>
            <p className="text-sm font-bold text-[#6C2BD9] mt-2">
              {[
                'Scanning facial traits & expressions...',
                'Synthesizing cartoon hair & shiny eyes...',
                'Forging game hero sticker palette...',
                'Assembling your custom avatar!',
              ][analyzingStage] || 'Polishing final hero layers!'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto h-4 bg-[#2A1048] rounded-full p-0.5 overflow-hidden border-[2px] border-[#2A1048]">
            <div
              className="h-full bg-[#FF3D5A] rounded-full transition-all duration-500"
              style={{ width: `${((analyzingStage + 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 4. REVIEW & FINE-TUNE HERO */}
      {step === 'review' && (
        <div className="bg-[#FFF4DC] border-[3.5px] border-[#2A1048] shadow-[6px_6px_0px_#2A1048] rounded-3xl p-6 md:p-8 space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#6C2BD9] bg-[#B8F23A] border-[2px] border-[#2A1048] px-3 py-0.5 rounded-full shadow-[2px_2px_0px_#2A1048] inline-block mb-1">
              Ta-da! Meet Your Hero
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#2A1048]">
              Fine-Tune Your Appearance
            </h2>
            <p className="text-xs text-[#2A1048]/80">
              Customize traits or click randomize before diving into the adventure realms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Avatar Stage */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-52 h-56 rounded-3xl bg-[#FFC93C]/30 border-[3.5px] border-[#2A1048] shadow-[4px_4px_0px_#2A1048] flex items-center justify-center p-4">
                <CharacterAvatar config={draft} size="xl" pose="idle" />
              </div>

              <div className="mt-3 flex gap-2 w-full max-w-[200px]">
                <button
                  onClick={handleRandomize}
                  className="btn-squish flex-1 py-2 bg-[#B8F23A] text-[#2A1048] border-[2.5px] border-[#2A1048] rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Dices className="w-3.5 h-3.5" /> Randomize
                </button>
              </div>
            </div>

            {/* Quick Trait Tweaks */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-1">
                  Hero Name
                </label>
                <input
                  type="text"
                  maxLength={18}
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Enter name..."
                  className="w-full bg-white border-[3px] border-[#2A1048] rounded-xl px-3 py-2 text-sm text-[#2A1048] font-bold shadow-[2px_2px_0px_#2A1048] focus:outline-none"
                />
              </div>

              {/* Hairstyle */}
              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-1.5">
                  Hairstyle
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'short-spike', label: 'Spiky' },
                    { id: 'curly-afro', label: 'Afro' },
                    { id: 'bob-cut', label: 'Bob' },
                    { id: 'wavy-long', label: 'Wavy' },
                    { id: 'cap', label: 'Cap' },
                    { id: 'ponytail', label: 'Ponytail' },
                  ].map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setDraft({ ...draft, hairStyle: h.id as any })}
                      className={`py-1.5 px-2 rounded-xl border-[2.5px] border-[#2A1048] text-xs font-bold transition cursor-pointer ${
                        draft.hairStyle === h.id
                          ? 'bg-[#FF3D5A] text-white shadow-[2px_2px_0px_#2A1048]'
                          : 'bg-white text-[#2A1048] hover:bg-[#FFF4DC]'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outfit Color (Bold Game Palette) */}
              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-1.5">
                  Outfit Color
                </label>
                <div className="flex gap-2">
                  {[
                    { hex: '#6C2BD9', label: 'Grape Purple' },
                    { hex: '#FF3D5A', label: 'Hot Red' },
                    { hex: '#22C55E', label: 'Leaf Green' },
                    { hex: '#B8F23A', label: 'Lime Pop' },
                    { hex: '#FFC93C', label: 'Sunshine Yellow' },
                    { hex: '#FF6FB5', label: 'Bubblegum Pink' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setDraft({ ...draft, outfitColor: c.hex })}
                      className={`w-8 h-8 rounded-full border-[3px] border-[#2A1048] transition-transform cursor-pointer ${
                        draft.outfitColor === c.hex ? 'scale-120 shadow-[2px_2px_0px_#2A1048]' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <label className="block text-xs font-black text-[#2A1048] mb-1.5">
                  Gear & Artifacts
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'none', label: 'None' },
                    { id: 'headphones', label: '🎧 Headphones' },
                    { id: 'wizard-hat', label: '🧙 Magic Hat' },
                    { id: 'cape', label: '🦸 Hero Cape' },
                    { id: 'crown', label: '👑 Sun Crown' },
                  ].map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setDraft({ ...draft, accessory: a.id as any })}
                      className={`py-1.5 px-2 rounded-xl border-[2.5px] border-[#2A1048] text-xs font-bold transition cursor-pointer truncate ${
                        draft.accessory === a.id
                          ? 'bg-[#6C2BD9] text-white shadow-[2px_2px_0px_#2A1048]'
                          : 'bg-white text-[#2A1048] hover:bg-[#FFF4DC]'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="pt-4 border-t-[2.5px] border-[#2A1048]/30 flex justify-end">
            <button
              onClick={handleConfirmHero}
              className="btn-squish px-8 py-3.5 bg-[#22C55E] hover:bg-[#20b857] text-[#2A1048] font-black text-sm rounded-2xl border-[3.5px] border-[#2A1048] flex items-center gap-2 cursor-pointer shadow-[4px_4px_0px_#2A1048]"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Confirm & Embark On Adventure!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
