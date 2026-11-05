import React from 'react';
import { FarmerRank } from '../types/index.ts';

interface RankPetaniScreenProps {
  farmerRank: FarmerRank;
  onBack: () => void;
}

export const RankPetaniScreen: React.FC<RankPetaniScreenProps> = ({ farmerRank, onBack }) => {
  const ranksList = [
    {
      level: 1,
      title: 'Benih Harapan',
      icon: 'grain',
      status: 'tercapai',
      isCurrent: false,
    },
    {
      level: 2,
      title: 'Tunas Muda',
      icon: 'yard',
      status: 'tercapai',
      isCurrent: false,
    },
    {
      level: 3,
      title: 'Padi Berisi',
      icon: 'potted_plant',
      status: 'tercapai',
      isCurrent: false,
    },
    {
      level: 4,
      title: 'Lumbung Padi Lestari',
      icon: 'agriculture',
      status: 'saat_ini',
      isCurrent: true,
    },
    {
      level: 5,
      title: 'Petani Teladan',
      icon: 'workspace_premium',
      status: 'terkunci',
      isCurrent: false,
    },
  ];

  return (
    <div className="flex-1 flex flex-col relative w-full pb-24 bg-[#fff8f5] select-none">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#ffe4d6]">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              aria-label="Kembali"
              className="w-11 h-11 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#2b1704] active:translate-y-0.5 transition-all shadow-[0_2px_0_0_#fad3b3] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h1 className="font-extrabold text-lg text-[#2b1704]">Rank Petani</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 px-4 max-w-md mx-auto w-full gap-5 pb-12 mt-2">
        {/* 1. Hero Card: Current Rank */}
        <section className="relative overflow-hidden bg-[#006a3e] text-white rounded-3xl p-5 shadow-[0_8px_0_0_#00522f] transition-all">
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#0e8551]/30 pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-28 h-28 rounded-full bg-[#0e8551]/20 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md text-[#006a3e]">
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    eco
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#91f8b8] bg-[#002110]/30 px-2.5 py-0.5 rounded-full inline-block">
                    Level {farmerRank.level}
                  </span>
                  <span className="text-xs text-[#74db9d] mt-0.5 font-medium">Peringkat Tani Saat Ini</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#feda5a] flex items-center justify-center text-[#745f00] shadow-sm">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
            </div>

            <div className="mt-1">
              <h2 className="text-xl font-extrabold tracking-tight text-white">{farmerRank.title}</h2>
              <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">{farmerRank.subtitle}</p>
            </div>

            {/* Tactile Gauge */}
            <div className="mt-1 bg-black/20 p-3.5 rounded-2xl flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">spa</span>
                  Progres Perawatan
                </span>
                <span className="font-extrabold text-[#ffe17c] text-sm">
                  {farmerRank.currentCare} / {farmerRank.targetCare}
                </span>
              </div>
              <div className="w-full h-3.5 bg-[#0e8551]/80 rounded-full p-0.5 shadow-inner overflow-hidden">
                <div
                  className="h-full bg-[#ffe17c] rounded-full shadow-sm transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, (farmerRank.currentCare / farmerRank.targetCare) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-emerald-100 font-semibold mt-0.5">
                {Math.max(0, farmerRank.targetCare - farmerRank.currentCare)} kali perawatan lagi menuju Level{' '}
                {farmerRank.level + 1}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Section: Cara Naik Level */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-[#2b1704]">
            <span className="material-symbols-outlined text-[#006a3e] text-[22px]">lightbulb</span>
            <h3 className="font-extrabold text-base">Cara Naik Level</h3>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#ffeadb] flex flex-col gap-3">
            <div className="bg-[#fff1e8] text-[#2b1704] p-3 rounded-xl flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#006a3e] text-[20px] shrink-0 mt-0.5">info</span>
              <p className="text-xs leading-relaxed">
                Naik level dengan merawat peliharaan secara rutin dan berkonsultasi kepada Asisten Dewi Sri.
              </p>
            </div>

            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#006a3e] shrink-0 shadow-[0_2px_0_0_#fad3b3]">
                <span className="material-symbols-outlined text-[22px]">calendar_month</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-sm text-[#2b1704]">Merawat pet setiap hari</h4>
                <p className="text-xs text-[#6e7a70] mt-0.5">
                  Buka aplikasi untuk melihat kondisi padi, ikan, dan ayam binaanmu.
                </p>
              </div>
            </div>

            <div className="h-px bg-[#ffeadb] rounded-full w-full"></div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#00609a] shrink-0 shadow-[0_2px_0_0_#fad3b3]">
                <span className="material-symbols-outlined text-[22px]">water_drop</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-sm text-[#2b1704]">Menyiram, memberi makan, &amp; memupuk</h4>
                <p className="text-xs text-[#6e7a70] mt-0.5">
                  Penuhi kebutuhan harian agar tanaman dan ternak tumbuh subur berkala.
                </p>
              </div>
            </div>

            <div className="h-px bg-[#ffeadb] rounded-full w-full"></div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#715c00] shrink-0 shadow-[0_2px_0_0_#fad3b3]">
                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-sm text-[#2b1704]">Bertanya ke Asisten Dewi Sri</h4>
                <p className="text-xs text-[#6e7a70] mt-0.5">
                  Diskusikan kendala hama atau pencegahan penyakit melalui menu Tanya AI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Section: Tahapan Peringkat */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#2b1704]">
              <span className="material-symbols-outlined text-[#006a3e] text-[22px]">military_tech</span>
              <h3 className="font-extrabold text-base">Tahapan Peringkat</h3>
            </div>
            <span className="text-xs text-[#6e7a70] font-bold">5 Jenjang Tani</span>
          </div>

          <div className="flex flex-col gap-2">
            {ranksList.map((rk) => {
              const isLocked = rk.status === 'terkunci';
              const isCurrent = rk.isCurrent;

              return (
                <div
                  key={rk.level}
                  className={`rounded-2xl p-3.5 flex items-center justify-between shadow-sm transition-all ${
                    isCurrent
                      ? 'bg-[#fff1e8] border-2 border-[#006a3e] shadow-[0_4px_0_0_#006a3e]'
                      : isLocked
                      ? 'bg-white/60 border border-gray-200 opacity-70'
                      : 'bg-white border border-[#ffeadb]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-[#006a3e] text-white shadow-sm'
                          : isLocked
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-[#ffe3ce] text-[#715c00]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{rk.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold uppercase text-[#6e7a70]">
                          Level {rk.level}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#006a3e] text-white rounded-full">
                            Aktif
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-sm text-[#2b1704] truncate">{rk.title}</span>
                    </div>
                  </div>

                  {isCurrent ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#006a3e] text-white rounded-full text-xs font-bold shadow-xs">
                      <span className="material-symbols-outlined text-[14px]">done_all</span>
                      <span>Saat Ini</span>
                    </div>
                  ) : isLocked ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      <span>Terkunci</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-[#006a3e] rounded-full text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      <span>Tercapai</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Friendly Farmer Encouragement */}
        <div className="bg-[#ffeadb] rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-amber-200/50">
          <div className="w-10 h-10 rounded-full bg-[#ffe17c] flex items-center justify-center text-[#715c00] shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">favorite</span>
          </div>
          <p className="text-xs text-[#2b1704] leading-relaxed">
            Setiap sentuhan kasih sayang dan siraman air membimbingmu selangkah lebih dekat menuju gelar{' '}
            <strong>Petani Teladan</strong>.
          </p>
        </div>
      </main>
    </div>
  );
};
