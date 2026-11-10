import React, { useState } from 'react';
import { FarmerRank } from '../types/index.ts';
import { playPop, playLevelUpFanfare } from '../utils/audioEffects.ts';

interface RankPetaniScreenProps {
  farmerRank: FarmerRank;
  onBack: () => void;
}

export const RankPetaniScreen: React.FC<RankPetaniScreenProps> = ({ farmerRank, onBack }) => {
  const [claimedReward, setClaimedReward] = useState(false);

  const handleClaimReward = () => {
    if (claimedReward) return;
    playLevelUpFanfare();
    setClaimedReward(true);
  };

  const ranksList = [
    {
      level: 1,
      title: 'Benih Harapan',
      icon: 'grain',
      perk: 'Membuka kebun tanaman padi dasar',
      status: 'tercapai',
      isCurrent: false,
    },
    {
      level: 2,
      title: 'Tunas Muda',
      icon: 'yard',
      perk: 'Membuka fitur konsultasi Asisten Dewi Sri',
      status: 'tercapai',
      isCurrent: false,
    },
    {
      level: 3,
      title: 'Padi Berisi',
      icon: 'potted_plant',
      perk: 'Membuka varietas kolam Lele & Nila',
      status: 'tercapai',
      isCurrent: false,
    },
    {
      level: 4,
      title: 'Lumbung Padi Lestari',
      icon: 'agriculture',
      perk: 'Membuka varietas Berry Manis & Ayam Pedaging',
      status: 'saat_ini',
      isCurrent: true,
    },
    {
      level: 5,
      title: 'Petani Teladan',
      icon: 'workspace_premium',
      perk: 'Lencana Kehormatan Nusantara & Gelar Teladan',
      status: 'terkunci',
      isCurrent: false,
    },
  ];

  return (
    <div className="flex-1 flex flex-col relative w-full pb-24 bg-[#fff8f5] select-none">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5]/95 backdrop-blur-md shadow-xs border-b border-[#ffe4d6]">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playPop();
                onBack();
              }}
              aria-label="Kembali"
              className="w-10 h-10 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#2b1704] active:translate-y-0.5 transition-all shadow-[0_2px_0_0_#fad3b3] cursor-pointer hover:bg-[#ffe3ce]"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <h1 className="font-extrabold text-base text-[#2b1704]">Jenjang Karir Petani</h1>
              <span className="text-[10px] text-[#0E8551] font-bold">Dedikasi Tani Nusantara</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#fef08a] border border-amber-300 flex items-center justify-center text-sm shadow-2xs">
            🏆
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 px-4 max-w-md mx-auto w-full gap-5 pb-12 mt-2">
        {/* 1. Hero Card: Current Rank (VIP Gojek Club / GrabRewards Style) */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#004a29] via-[#006a3e] to-[#0E8551] text-white rounded-3xl p-5 shadow-[0_10px_25px_rgba(0,106,62,0.25)] border border-emerald-400/30 transition-all">
          {/* Holographic metallic background shapes */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-gradient-to-br from-amber-300/25 to-yellow-500/10 pointer-events-none blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-emerald-300/20 pointer-events-none blur-xl" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-3.5">
            {/* Top Bar: Member Tier & Club Badge */}
            <div className="flex items-center justify-between pb-2 border-b border-white/15">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-200">
                  DEWI SRI CLUB • VIP FARMER
                </span>
              </div>
              <span className="text-[10px] font-extrabold bg-black/30 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-emerald-200 border border-emerald-400/30">
                Level {farmerRank.level} of 5
              </span>
            </div>

            {/* Rank Identity */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-500 p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#004a29] rounded-[14px] flex items-center justify-center text-amber-300">
                    <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-black tracking-tight text-white">{farmerRank.title}</h2>
                  <p className="text-xs text-emerald-100/90 font-medium">{farmerRank.subtitle}</p>
                </div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shadow-sm animate-bounce">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
              </div>
            </div>

            {/* Tactile Gauge with Visual Milestone */}
            <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl flex flex-col gap-2 border border-white/10 shadow-inner">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1.5 font-extrabold text-emerald-200">
                  <span className="material-symbols-outlined text-[16px] text-amber-300">spa</span>
                  Kemajuan Menuju Level {farmerRank.level + 1}
                </span>
                <span className="font-black text-amber-300 text-sm tracking-tight">
                  {farmerRank.currentCare} / {farmerRank.targetCare} XP
                </span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full p-0.5 shadow-inner overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 rounded-full shadow-sm transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, (farmerRank.currentCare / farmerRank.targetCare) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-200/90 font-bold">
                <span>{Math.round((farmerRank.currentCare / farmerRank.targetCare) * 100)}% Tercapai</span>
                <span>Tersisa {Math.max(0, farmerRank.targetCare - farmerRank.currentCare)} XP lagi</span>
              </div>
            </div>

            {/* Claim Daily Bonus */}
            <div>
              <button
                onClick={handleClaimReward}
                disabled={claimedReward}
                className={`w-full h-11 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  claimedReward
                    ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-700/50 cursor-default'
                    : 'bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 text-amber-950 active:scale-[0.98] hover:brightness-105 border border-amber-200 shadow-amber-500/20'
                }`}
              >
                <span className="text-base">{claimedReward ? '✓' : '🎁'}</span>
                <span>
                  {claimedReward
                    ? 'Bonus Harian Telah Diklaim Hari Ini!'
                    : 'Klaim Bonus Rawatan Harian (+20 EXP)'}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Section: Cara Naik Level */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-[#2b1704]">
            <span className="material-symbols-outlined text-[#006a3e] text-[22px]">lightbulb</span>
            <h3 className="font-extrabold text-base">Panduan Meningkatkan Rank</h3>
          </div>
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#ffeadb] flex flex-col gap-3">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#e8f7ee] flex items-center justify-center text-[#006a3e] shrink-0 border border-emerald-200">
                <span className="material-symbols-outlined text-[22px]">calendar_today</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-extrabold text-sm text-[#2b1704]">Rawat Pet Rutin Tiap Hari</h4>
                <p className="text-xs text-[#6e7a70] mt-0.5">
                  Siram tanaman, beri pakan ikan, dan bersihkan kandang ayam setiap hari.
                </p>
              </div>
            </div>

            <div className="h-px bg-[#ffeadb] rounded-full w-full"></div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0 border border-sky-200">
                <span className="material-symbols-outlined text-[22px]">eco</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-extrabold text-sm text-[#2b1704]">Ganti Varietas Unggulan</h4>
                <p className="text-xs text-[#6e7a70] mt-0.5">
                  Coba varietas Berry, Pisang, Lele, dan Ayam Petelur untuk memperkaya pengalaman.
                </p>
              </div>
            </div>

            <div className="h-px bg-[#ffeadb] rounded-full w-full"></div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#fef3c7] flex items-center justify-center text-[#b45309] shrink-0 border border-amber-200">
                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-extrabold text-sm text-[#2b1704]">Konsultasi AI Dewi Sri</h4>
                <p className="text-xs text-[#6e7a70] mt-0.5">
                  Tanyakan kendala hama atau diagnosis foto tanaman untuk wawasan agronomi.
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
              <h3 className="font-extrabold text-base">5 Jenjang Peringkat Tani</h3>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {ranksList.map((rk) => {
              const isLocked = rk.status === 'terkunci';
              const isCurrent = rk.isCurrent;

              return (
                <div
                  key={rk.level}
                  className={`rounded-3xl p-4 flex items-center justify-between shadow-xs transition-all ${
                    isCurrent
                      ? 'bg-[#fff1e8] border-2 border-[#006a3e] shadow-[0_4px_12px_rgba(0,106,62,0.12)]'
                      : isLocked
                      ? 'bg-white/70 border border-gray-200 opacity-65'
                      : 'bg-white border border-[#ffeadb]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                        isCurrent
                          ? 'bg-[#006a3e] text-white shadow-emerald-700/20'
                          : isLocked
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-[#ffe3ce] text-[#715c00]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">{rk.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold uppercase text-[#6e7a70]">
                          Level {rk.level}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-extrabold px-2 py-0.5 bg-[#006a3e] text-white rounded-full">
                            Peringkatmu
                          </span>
                        )}
                      </div>
                      <span className="font-extrabold text-sm text-[#2b1704] truncate">{rk.title}</span>
                      <span className="text-[11px] text-[#6e7a70] truncate mt-0.5">{rk.perk}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-2">
                    {isCurrent ? (
                      <div className="flex items-center gap-1 px-3 py-1 bg-[#006a3e] text-white rounded-full text-xs font-extrabold shadow-xs">
                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                        <span>Aktif</span>
                      </div>
                    ) : isLocked ? (
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-400 rounded-full text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-[#006a3e] rounded-full text-xs font-extrabold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Friendly Farmer Encouragement */}
        <div className="bg-gradient-to-r from-[#ffeadb] to-[#ffe3ce] rounded-3xl p-4 flex items-center gap-3 shadow-xs border border-amber-200">
          <div className="w-10 h-10 rounded-2xl bg-[#ffe17c] flex items-center justify-center text-[#715c00] shrink-0 shadow-xs text-xl">
            🌾
          </div>
          <p className="text-xs text-[#2b1704] leading-relaxed font-semibold">
            Setiap sentuhan kasih sayang dan rawatan harian membawamu selangkah lebih dekat menuju gelar tertinggi{' '}
            <strong>Petani Teladan Nusantara</strong>.
          </p>
        </div>
      </main>
    </div>
  );
};