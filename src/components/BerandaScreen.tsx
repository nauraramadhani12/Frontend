import React, { useState } from 'react';
import { PetState, PetType, PetVariety } from '../types/index.ts';
import { PetCharacter } from './PetCharacter.tsx';
import { PetVarietyModal } from './PetVarietyModal.tsx';

interface BerandaScreenProps {
  currentPet: PetState;
  onSelectPetType: (type: PetType) => void;
  onCyclePet: () => void;
  onSelectVariety: (variety: PetVariety, displayName: string) => void;
  onCareAction: (slot: 'action1' | 'action2' | 'action3') => void;
  onOpenChatAI: () => void;
  onOpenProfile?: () => void;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  currentPet,
  onSelectPetType,
  onCyclePet,
  onSelectVariety,
  onCareAction,
  onOpenChatAI,
  onOpenProfile,
}) => {
  const [sparkle, setSparkle] = useState<string | null>(null);
  const [careToast, setCareToast] = useState<string | null>(null);
  const [isVarietyModalOpen, setIsVarietyModalOpen] = useState(false);

  const triggerSparkle = (text: string) => {
    setSparkle(text);
    setTimeout(() => setSparkle(null), 1200);
  };

  const handleAction = (slot: 'action1' | 'action2' | 'action3', label: string) => {
    onCareAction(slot);
    triggerSparkle(label);

    // Contextual care toast matching screen_5db9919e
    let pillText = '';
    if (currentPet.type === 'koki') {
      if (slot === 'action3' || slot === 'action2') pillText = 'Kolam sudah bersih';
      else pillText = 'Ikan sudah kenyang';
    } else if (currentPet.type === 'tunas') {
      if (slot === 'action1') pillText = 'Tanaman sudah segar';
      else if (slot === 'action2') pillText = 'Nutrisi tercukupi';
      else pillText = 'Sinar mentari cukup';
    } else {
      if (slot === 'action3') pillText = 'Kandang sudah bersih';
      else if (slot === 'action1') pillText = 'Ayam sudah kenyang';
      else pillText = 'Ayam sudah segar';
    }
    setCareToast(pillText);
    setTimeout(() => setCareToast(null), 2500);
  };

  // Background per pet
  const bgImages = {
    tunas: '/assets/kebun_rumahan.jpg',
    koki: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFl0jAFY7xm6-SexwZV0AHrfcLWp2FrtrvXtvhLj1tuilWwRDWIHpYD1-S6rrCrL_sVPIr_7mIcWMNvgNglScDG9ieY4uazg5oGEJusUo4Yp6IB7-nbcVBqPPxBtFgcUqsU7-0QT4lkG1FqS-sevsRLOPmlVuky9yk_PunDlHo26nvN329EeHL0tkXDnS_GWv9FXyvLrc5T1IbYhclx7b15bRJQce_tg-CVTRWWw0r',
    kuning: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUn-IfxcHFGwvec_jk55_2NLIJqdoKZ3X0TuTwaI0j3TPRNHvfSHLS0bOGm1bdXuH2dpQQzmOckPVng8Sgvj9dzHdM2lbf4wpPs4G_lhtXzBgRwNluNQnSJCTvbIGnuxED9KleFyp_iGLHP47YEEaUSujBbRkZiy2qI8MbDrNGRZStlcb1UumPw678NhMmE79I-rhJXFx4CfYrK-c2EdwsQRXbRVtxzHi_F2s03s3n',
  };

  // Button configs per pet
  const actionConfigs = {
    tunas: [
      { slot: 'action1' as const, label: 'Siram', icon: 'water_drop', bg: 'bg-[#0B74C4]', border: 'border-[#085591]', text: 'text-white', iconColor: 'text-[#0B74C4]' },
      { slot: 'action2' as const, label: 'Pupuk', icon: 'eco', bg: 'bg-[#0E8551]', border: 'border-[#00522f]', text: 'text-white', iconColor: 'text-[#0E8551]' },
      { slot: 'action3' as const, label: 'Sinar Matahari', icon: 'wb_sunny', bg: 'bg-[#FFD84D]', border: 'border-[#C49800]', text: 'text-[#4A3500]', iconColor: 'text-[#715c00]' },
    ],
    koki: [
      { slot: 'action1' as const, label: 'Beri Makan', icon: 'bakery_dining', bg: 'bg-[#FFD84D]', border: 'border-[#C49800]', text: 'text-[#4A3500]', iconColor: 'text-[#715c00]' },
      { slot: 'action2' as const, label: 'Ganti Air', icon: 'water_drop', bg: 'bg-[#0B74C4]', border: 'border-[#085591]', text: 'text-white', iconColor: 'text-[#0B74C4]' },
      { slot: 'action3' as const, label: 'Kuras Air', icon: 'cleaning_services', bg: 'bg-[#0E8551]', border: 'border-[#095C37]', text: 'text-white', iconColor: 'text-[#0E8551]' },
    ],
    kuning: [
      { slot: 'action1' as const, label: 'Beri Makan', icon: 'grain', bg: 'bg-[#FFD84D]', border: 'border-[#C49800]', text: 'text-[#4A3500]', iconColor: 'text-[#4A3500]' },
      { slot: 'action2' as const, label: 'Beri Minum', icon: 'water_drop', bg: 'bg-[#0B74C4]', border: 'border-[#085591]', text: 'text-white', iconColor: 'text-[#0B74C4]' },
      { slot: 'action3' as const, label: 'Bersihkan', icon: 'cleaning_services', bg: 'bg-[#0E8551]', border: 'border-[#00522f]', text: 'text-white', iconColor: 'text-[#0E8551]' },
    ],
  };

  const currentActions = actionConfigs[currentPet.type];

  return (
    <div className="flex-1 flex flex-col relative w-full pb-20 bg-[#fff8f5] select-none">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#ffe4d6]">
        <div className="h-14 px-4 flex items-center justify-between relative max-w-md mx-auto">
          <div className="flex items-center gap-1.5 z-10">
            <span className="material-symbols-outlined text-[#006a3e] text-2xl font-bold">eco</span>
            <span className="font-extrabold text-base text-[#006a3e] tracking-tight">Dewi Sri</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="font-extrabold text-lg text-[#2b1704] tracking-tight">{currentPet.name}</h1>
          </div>
          <div className="z-10">
            <button
              onClick={onOpenProfile}
              aria-label="Buka Pengaturan Akun"
              className="w-9 h-9 rounded-full ring-2 ring-[#006a3e]/30 overflow-hidden shadow-xs active:scale-95 transition-all cursor-pointer bg-white"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAa3hIZEnYDems4sg1L3amF9TYgQxv7Jz89ITO89SzSu3TEvkb5mWMkZcyIf1ih1b0WAEcwWL9SA2xdYsynMuXrDXWfbELMMbw14TvHUG-I1y5fZ0tw7AwxBkblJ8eZ0OMmFd68RnI2Lof2wd8BxW-V_sWkSMpDYpE3KM6Jv1j-TrjhzNIYilS_ZSA7zFEjw3SscWDe0shBe93JLPm9g_0SSFC6cYE5Mf5lh7nRUtU"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col pt-14 max-w-md mx-auto w-full px-3">
        {/* 2. Compact 3-Vitals Pill Row */}
        <div className="pt-2 pb-2 z-20">
          <div className="grid grid-cols-3 gap-2 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-[0_4px_16px_rgba(43,23,4,0.05)] border border-[#ffeadb]">
            {/* Stat 1 */}
            <div className={`flex flex-col gap-1 rounded-xl p-2 ${currentPet.stat1 <= 20 ? 'bg-[#ffdad6]/60 border border-red-300' : 'bg-[#fff1e8]/70'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className={`material-symbols-outlined text-xs ${currentPet.stat1 <= 20 ? 'text-[#ba1a1a]' : 'text-[#715c00]'}`}>
                    {currentPet.type === 'tunas' ? 'eco' : 'grain'}
                  </span>
                  <span className="text-[11px] font-bold text-[#3e4941]">{currentPet.stat1Name}</span>
                  {currentPet.stat1 <= 20 && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>}
                </div>
                <span className={`text-[11px] font-extrabold ${currentPet.stat1 <= 20 ? 'text-[#ba1a1a]' : 'text-[#715c00]'}`}>
                  {currentPet.stat1}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#ffeadb] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${currentPet.stat1 <= 20 ? 'bg-[#ba1a1a]' : 'bg-[#715c00]'}`}
                  style={{ width: `${currentPet.stat1}%` }}
                ></div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className={`flex flex-col gap-1 rounded-xl p-2 ${currentPet.stat2 <= 20 ? 'bg-[#ffdad6]/60 border border-red-300' : 'bg-[#fff1e8]/70'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className={`material-symbols-outlined text-xs ${currentPet.stat2 <= 20 ? 'text-[#ba1a1a]' : 'text-[#0979bf]'}`}>
                    {currentPet.type === 'kuning' ? 'cleaning_services' : 'water_drop'}
                  </span>
                  <span className="text-[11px] font-bold text-[#3e4941]">{currentPet.stat2Name}</span>
                  {currentPet.stat2 <= 20 && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>}
                </div>
                <span className={`text-[11px] font-extrabold ${currentPet.stat2 <= 20 ? 'text-[#ba1a1a]' : 'text-[#0979bf]'}`}>
                  {currentPet.stat2}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#ffeadb] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${currentPet.stat2 <= 20 ? 'bg-[#ba1a1a]' : 'bg-[#0979bf]'}`}
                  style={{ width: `${currentPet.stat2}%` }}
                ></div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className={`flex flex-col gap-1 rounded-xl p-2 ${currentPet.stat3 <= 25 ? 'bg-[#ffdad6]/60 border border-red-300' : 'bg-[#fff1e8]/70'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className={`material-symbols-outlined text-xs ${currentPet.stat3 <= 25 ? 'text-[#ba1a1a]' : 'text-[#006a3e]'}`}>
                    favorite
                  </span>
                  <span className="text-[11px] font-bold text-[#3e4941]">{currentPet.stat3Name}</span>
                  {currentPet.stat3 <= 25 && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>}
                </div>
                <span className={`text-[11px] font-extrabold ${currentPet.stat3 <= 25 ? 'text-[#ba1a1a]' : 'text-[#006a3e]'}`}>
                  {currentPet.stat3}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#ffeadb] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${currentPet.stat3 <= 25 ? 'bg-[#ba1a1a]' : 'bg-[#006a3e]'}`}
                  style={{ width: `${currentPet.stat3}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Habitat Scene Container */}
        <div className="relative w-full h-[440px] rounded-3xl overflow-hidden shadow-[0_8px_0_0_#fad3b3] border border-[#ffeadb] flex flex-col justify-between items-center px-4 pt-3 bg-gradient-to-b from-sky-100 to-amber-50">
          {/* Habitat Background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url("${bgImages[currentPet.type]}")` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5]/20 via-transparent to-[#ffe3ce]/60 pointer-events-none"></div>
          </div>

          {/* Left Pet Switcher (🌱 🐟 🐣) */}
          <div className="absolute left-3 top-3 z-30 flex flex-col gap-2.5">
            <button
              onClick={() => onSelectPetType('tunas')}
              aria-label="Pilih Si Tunas (Padi)"
              className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                currentPet.type === 'tunas' ? 'ring-4 ring-[#0E8551] scale-105' : 'ring-[3px] ring-white opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-2xl">🌱</span>
            </button>
            <button
              onClick={() => onSelectPetType('koki')}
              aria-label="Pilih Si Koki (Ikan)"
              className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                currentPet.type === 'koki' ? 'ring-4 ring-[#0E8551] scale-105' : 'ring-[3px] ring-white opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-2xl">🐟</span>
            </button>
            <button
              onClick={() => onSelectPetType('kuning')}
              aria-label="Pilih Si Kuning (Ayam)"
              className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                currentPet.type === 'kuning' ? 'ring-4 ring-[#0E8551] scale-105' : 'ring-[3px] ring-white opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-2xl">🐣</span>
            </button>
          </div>

          {/* Care Feedback Toast Pill (Matching screen_5db9919e) */}
          {careToast && (
            <div className="absolute bottom-[275px] left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full shadow-md border border-emerald-200 flex items-center gap-1.5 animate-bounce">
              <span className="material-symbols-outlined text-xs text-[#0E8551] font-bold">check</span>
              <span className="text-[10.5px] font-extrabold text-[#006a3e]">{careToast}</span>
            </div>
          )}

          {/* Speech Bubble: Positioned right above the pet design, smaller text */}
          <div
            className="absolute bottom-[228px] left-1/2 -translate-x-1/2 z-30 max-w-[210px] w-max animate-bounce pointer-events-none"
            style={{ animationDuration: '3.5s' }}
          >
            <div className="bg-white/95 backdrop-blur-sm text-[#2b1704] rounded-2xl px-3 py-1.5 shadow-[0_4px_12px_rgba(43,23,4,0.1)] border border-[#ffeadb] relative">
              <p className="text-[10.5px] leading-snug font-bold text-center whitespace-normal">{currentPet.speech}</p>
              {/* Cloud Tail pointing directly downwards to the pet */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
            </div>
          </div>

          {/* Interactive Mascot Character */}
          <PetCharacter
            pet={currentPet}
            onPetClick={() => triggerSparkle('❤️ Sayang Pet!')}
            sparkleText={sparkle}
          />

          {/* Bottom Action Controls: Tanya AI and Ganti Jenis side-by-side (sejajar) */}
          <div className="absolute right-3 bottom-3 z-30 flex items-center gap-2">
            <button
              onClick={onOpenChatAI}
              aria-label="Tanya AI Dewi Sri"
              className="w-[48px] h-[48px] rounded-full bg-[#0E8551] text-white flex flex-col items-center justify-center shadow-md active:scale-95 transition-all group border-2 border-white/80 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] leading-none text-white">smart_toy</span>
              <span className="font-bold text-[9px] leading-tight tracking-tight mt-0.5 text-white">Tanya AI</span>
            </button>

            <button
              onClick={() => setIsVarietyModalOpen(true)}
              aria-label="Ganti Jenis Peliharaan"
              className="w-[48px] h-[48px] rounded-full bg-white flex flex-col items-center justify-center shadow-md border-[2.5px] border-[#0E8551] text-[#0E8551] active:scale-95 transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] leading-none text-[#0E8551]">swap_horiz</span>
              <span className="font-bold text-[9px] leading-tight tracking-tight text-[#0E8551] -mt-0.5">Ganti</span>
            </button>
          </div>
        </div>

        {/* Modal: Pilih Jenis Peliharaan (screen_2f0475d1, screen_bbc367bf, screen_55f863fc) */}
        {isVarietyModalOpen && (
          <PetVarietyModal
            petType={currentPet.type}
            currentVariety={currentPet.variety || (currentPet.type === 'tunas' ? 'padi' : currentPet.type === 'koki' ? 'koi' : 'kampung')}
            onSelectVariety={(variety, displayName) => {
              setIsVarietyModalOpen(false);
              onSelectVariety(variety, displayName);
              triggerSparkle(`✨ Memilih ${displayName}!`);
            }}
            onClose={() => setIsVarietyModalOpen(false)}
          />
        )}

        {/* 4. Chunky 3D Action Buttons */}
        <div className="pt-3 pb-2 z-20">
          <div className="grid grid-cols-3 gap-2.5">
            {currentActions.map((btn) => (
              <button
                key={btn.slot}
                onClick={() => handleAction(btn.slot, `✨ ${btn.label}!`)}
                className={`h-[86px] rounded-[20px] ${btn.bg} border-b-4 ${btn.border} ${btn.text} flex flex-col items-center justify-center gap-1.5 shadow-md active:translate-y-1 active:border-b-0 transition-all cursor-pointer group`}
              >
                <div className={`w-10 h-10 rounded-full bg-white ${btn.iconColor} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {btn.icon}
                  </span>
                </div>
                <span className="font-extrabold text-[13px] leading-tight tracking-tight">
                  {btn.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
