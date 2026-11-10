import React, { useState, useEffect } from 'react';
import { playPop, playSparkle } from '../utils/audioEffects.ts';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onOpenLogin,
  onOpenRegister,
}) => {
  const [loadingText, setLoadingText] = useState('Menyiapkan kebun virtualmu...');
  const [progressPct, setProgressPct] = useState('85%');
  const [petGreeting, setPetGreeting] = useState<string | null>(null);

  useEffect(() => {
    const funnySteps = [
      { text: 'Menyiapkan kebun virtualmu...', pct: '85%' },
      { text: 'Menyapa bulir padi pagi...', pct: '92%' },
      { text: 'Mengisi air kolam segar...', pct: '98%' },
      { text: 'Semua siap! Mari bertani!', pct: '100%' },
    ];
    let step = 0;
    const timer = setInterval(() => {
      step = (step + 1) % funnySteps.length;
      setLoadingText(funnySteps[step].text);
      setProgressPct(funnySteps[step].pct);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const handlePetTap = (emoji: string, greeting: string) => {
    playSparkle();
    setPetGreeting(`${emoji} ${greeting}`);
    setTimeout(() => setPetGreeting(null), 2500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full h-full min-h-screen relative overflow-hidden select-none bg-[#FFF9F5] px-6 py-8 max-w-md mx-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 left-0 right-0 h-48 opacity-30 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
            <path d="M0,70 C100,120 220,30 400,80 L400,150 L0,150 Z" fill="#a7f3d0"></path>
            <path d="M0,100 C150,50 280,130 400,95 L400,150 L0,150 Z" fill="#6ee7b7" opacity="0.6"></path>
          </svg>
        </div>
      </div>

      {/* Center Branding Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-4">
        {/* Logo with Soft Glowing Ripple */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 m-auto w-44 h-44 bg-emerald-200/40 rounded-full blur-2xl animate-pulse-glow"></div>
          <div className="relative w-36 h-36 rounded-full bg-white shadow-xl p-2.5 flex items-center justify-center ring-4 ring-emerald-100/80 animate-float-gentle">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw-tYysOfVwxYMn-FcT5ti_uf5yiAsWGYB1PmvdVQ7Oxga_tnLEf_KCPvtY0xBBM_5qwNT89lpjMDNgoyE3GmJ8Aem39rn7BXuNac1JKK0HoVbOqiGaVAE6XWxcykIe3wCr757EZDUNpDj67VGd8HYzBP7E8ywqfVgZCtEGl4apV5G73jW6I2jedOjal2RFrZEgI8gunyVvWhbWIdwFzfAWc9KIYfJM1OmxKN_5sFA"
              alt="Dewi Sri Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#1b4d3e] tracking-tight text-center flex items-center gap-1.5 justify-center">
          Dewi Sri
          <span className="text-emerald-600 text-2xl">🌱</span>
        </h1>
        <p className="text-sm text-stone-600 font-semibold text-center mt-2 max-w-[280px] leading-relaxed">
          Sahabat Tani Pintar: Rawat Peliharaan &amp; Konsultasi Cerdas Bersama Asisten AI
        </p>

        {/* Floating Speech Reaction */}
        {petGreeting && (
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-white text-[#006a3e] font-extrabold text-xs shadow-md border border-emerald-200 animate-bounce">
            {petGreeting}
          </div>
        )}

        {/* 3 Interactive Pet Floating Icons */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            onClick={() => handlePetTap('🌱', 'Si Tunas: Halo Kak, ayo rawat aku!')}
            title="Sapa Si Tunas"
            className="w-13 h-13 rounded-2xl bg-emerald-100/90 border border-emerald-200 flex items-center justify-center text-2xl shadow-xs active:scale-95 hover:scale-110 transition-all cursor-pointer"
          >
            🌱
          </button>
          <button
            onClick={() => handlePetTap('🐟', 'Si Koki: Blub blub, air kolamnya segar!')}
            title="Sapa Si Koki"
            className="w-13 h-13 rounded-2xl bg-sky-100/90 border border-sky-200 flex items-center justify-center text-2xl shadow-xs active:scale-95 hover:scale-110 transition-all cursor-pointer"
          >
            🐟
          </button>
          <button
            onClick={() => handlePetTap('🐥', 'Si Kuning: Kukuruyuk, aku lincah sekali!')}
            title="Sapa Si Kuning"
            className="w-13 h-13 rounded-2xl bg-amber-100/90 border border-amber-200 flex items-center justify-center text-2xl shadow-xs active:scale-95 hover:scale-110 transition-all cursor-pointer"
          >
            🐥
          </button>
        </div>

        {/* Dynamic Loading Simulation */}
        <div className="mt-7 flex flex-col items-center gap-1.5 w-full max-w-[240px]">
          <span className="text-[11px] font-extrabold text-[#006a3e]">{loadingText}</span>
          <div className="w-full h-2 bg-[#ffeadb] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#0E8551] rounded-full transition-all duration-700 ease-out"
              style={{ width: progressPct }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Mulai Button */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center pb-2">
        <button
          onClick={() => {
            playPop();
            onStart();
          }}
          id="btn-start"
          type="button"
          className="w-full h-14 bg-[#0E8551] hover:bg-[#0b6e43] text-white font-extrabold text-base rounded-full shadow-[0_5px_0_0_#00522f] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Mulai Bertani</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
        <p className="text-xs text-stone-500 text-center mt-3 font-medium">
          <button
            type="button"
            onClick={() => {
              playPop();
              if (onOpenLogin) onOpenLogin();
              else onStart();
            }}
            className="font-extrabold text-[#006a3e] hover:underline cursor-pointer"
          >
            Masuk
          </button>{' '}
          atau{' '}
          <button
            type="button"
            onClick={() => {
              playPop();
              if (onOpenRegister) onOpenRegister();
              else onStart();
            }}
            className="font-extrabold text-[#006a3e] hover:underline cursor-pointer"
          >
            Daftar
          </button>{' '}
          untuk menyimpan kebun virtualmu
        </p>
      </div>
    </div>
  );
};