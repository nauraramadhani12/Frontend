import React, { useState, useEffect } from 'react';

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
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between w-full h-full min-h-screen relative overflow-hidden select-none bg-[#FFF9F5] px-6 py-8 max-w-md mx-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 left-0 right-0 h-48 opacity-25 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
            <path d="M0,70 C100,120 220,30 400,80 L400,150 L0,150 Z" fill="#a7f3d0"></path>
            <path d="M0,100 C150,50 280,130 400,95 L400,150 L0,150 Z" fill="#6ee7b7" opacity="0.6"></path>
          </svg>
        </div>
      </div>

      {/* Center Branding Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-6">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 m-auto w-40 h-40 bg-emerald-200/40 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-36 h-36 rounded-full bg-white shadow-xl p-2 flex items-center justify-center ring-4 ring-emerald-50">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw-tYysOfVwxYMn-FcT5ti_uf5yiAsWGYB1PmvdVQ7Oxga_tnLEf_KCPvtY0xBBM_5qwNT89lpjMDNgoyE3GmJ8Aem39rn7BXuNac1JKK0HoVbOqiGaVAE6XWxcykIe3wCr757EZDUNpDj67VGd8HYzBP7E8ywqfVgZCtEGl4apV5G73jW6I2jedOjal2RFrZEgI8gunyVvWhbWIdwFzfAWc9KIYfJM1OmxKN_5sFA"
              alt="Dewi Sri Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#1b4d3e] tracking-tight text-center">Dewi Sri</h1>
        <p className="text-sm text-stone-600 font-medium text-center mt-2 max-w-[260px]">
          Rawat ternak &amp; tanaman jadi lebih mudah
        </p>

        {/* 3 Pet Floating Icons */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shadow-sm hover:scale-110 transition-transform duration-200">
            🌱
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl shadow-sm hover:scale-110 transition-transform duration-200">
            🐟
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl shadow-sm hover:scale-110 transition-transform duration-200">
            🐥
          </div>
        </div>

        {/* Dynamic Loading Simulation */}
        <div className="mt-8 flex flex-col items-center gap-1.5 w-full max-w-[220px]">
          <span className="text-[11px] font-bold text-[#006a3e]">{loadingText}</span>
          <div className="w-full h-1.5 bg-[#ffeadb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0E8551] rounded-full transition-all duration-700"
              style={{ width: progressPct }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Mulai Button */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center pb-2">
        <button
          onClick={onStart}
          id="btn-start"
          type="button"
          className="w-full h-14 bg-[#0E8551] hover:bg-[#0b6e43] text-white font-extrabold text-base rounded-full shadow-lg flex items-center justify-center transition-all duration-150 active:translate-y-1 active:border-b-0 border-b-4 border-[#095c37] cursor-pointer"
        >
          Mulai
        </button>
        <p className="text-xs text-stone-500 text-center mt-3 font-medium">
          <button
            type="button"
            onClick={onOpenLogin || onStart}
            className="font-bold text-[#006a3e] hover:underline cursor-pointer"
          >
            Masuk
          </button>{' '}
          atau{' '}
          <button
            type="button"
            onClick={onOpenRegister || onStart}
            className="font-bold text-[#006a3e] hover:underline cursor-pointer"
          >
            daftar
          </button>{' '}
          untuk menyimpan peliharaanmu
        </p>
      </div>
    </div>
  );
};
