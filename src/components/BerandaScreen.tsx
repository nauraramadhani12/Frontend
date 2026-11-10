import React, { useState, useEffect } from 'react';
import { PetState, PetType, PetVariety } from '../types/index.ts';
import { PetCharacter } from './PetCharacter.tsx';
import { PetVarietyModal } from './PetVarietyModal.tsx';
import { playWaterDrop, playSparkle, playWarmSun, playPop, playHeartPop, playLevelUpFanfare } from '../utils/audioEffects.ts';

interface BerandaScreenProps {
  currentPet: PetState;
  allPets?: Record<PetType, PetState>;
  streakDays?: number;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onSelectPetType: (type: PetType) => void;
  onCyclePet: () => void;
  onSelectVariety: (variety: PetVariety, displayName: string) => void;
  onCareAction: (slot: 'action1' | 'action2' | 'action3') => void;
  onOpenChatAI: () => void;
  onOpenProfile?: () => void;
  onOpenRankPetani?: () => void;
  onOpenHistory?: () => void;
}

interface FloatingParticle {
  id: number;
  emoji: string;
  leftPct: number;
  bottomPx: number;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  currentPet,
  allPets,
  streakDays = 5,
  soundEnabled = true,
  onToggleSound,
  onSelectPetType,
  onCyclePet: _onCyclePet,
  onSelectVariety,
  onCareAction,
  onOpenChatAI,
  onOpenProfile,
  onOpenRankPetani,
  onOpenHistory,
}) => {
  const [sparkle, setSparkle] = useState<string | null>(null);
  const [careToast, setCareToast] = useState<string | null>(null);
  const [isVarietyModalOpen, setIsVarietyModalOpen] = useState(false);
  const [greeting, setGreeting] = useState({ text: 'Pagi Cerah di Kebun', icon: 'wb_sunny' });
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [dailyQuestClaimed, setDailyQuestClaimed] = useState(false);
  const [selectedVital, setSelectedVital] = useState<{
    name: string;
    value: number;
    icon: string;
    status: string;
    advice: string;
    actionSlot: 'action1' | 'action2' | 'action3';
    actionLabel: string;
  } | null>(null);

  // Dynamic particle spawner for tactile animations
  const spawnParticles = (emojis: string[]) => {
    const newItems: FloatingParticle[] = emojis.map((emoji, index) => ({
      id: Date.now() + index + Math.random(),
      emoji,
      leftPct: 42 + (Math.random() * 20 - 10),
      bottomPx: 95 + Math.random() * 35,
    }));
    setParticles((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)));
    }, 1100);
  };

  // Calculate dynamic greeting based on current local hour
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      setGreeting({ text: 'Pagi Cerah di Kebun', icon: 'wb_sunny' });
    } else if (hour >= 11 && hour < 15) {
      setGreeting({ text: 'Siang Hangat Bertani', icon: 'light_mode' });
    } else if (hour >= 15 && hour < 18) {
      setGreeting({ text: 'Sore Teduh di Sawah', icon: 'wb_twilight' });
    } else {
      setGreeting({ text: 'Malam Damai di Gubuk', icon: 'bedtime' });
    }
  }, []);

  const triggerSparkle = (text: string) => {
    setSparkle(text);
    setTimeout(() => setSparkle(null), 1200);
  };

  const handleAction = (slot: 'action1' | 'action2' | 'action3', label: string) => {
    // Play organic audio chime based on action
    if (slot === 'action1') {
      playWaterDrop(soundEnabled);
    } else if (slot === 'action2') {
      playSparkle(soundEnabled);
    } else {
      playWarmSun(soundEnabled);
    }

    // Spawn tactile micro-particles
    let particlesToSpawn: string[] = ['✨', '✨'];
    if (slot === 'action1') {
      particlesToSpawn = currentPet.type === 'tunas' ? ['💧', '💦', '💧'] : currentPet.type === 'koki' ? ['🍞', '🫧', '✨'] : ['🌾', '🌽', '✨'];
    } else if (slot === 'action2') {
      particlesToSpawn = currentPet.type === 'tunas' ? ['🌿', '🌱', '✨'] : currentPet.type === 'koki' ? ['💧', '🫧', '🌊'] : ['💧', '🥛', '✨'];
    } else {
      particlesToSpawn = currentPet.type === 'tunas' ? ['☀️', '✨', '🌤️'] : currentPet.type === 'koki' ? ['🫧', '🧼', '✨'] : ['🧹', '✨', '🌿'];
    }
    spawnParticles(particlesToSpawn);

    onCareAction(slot);
    triggerSparkle(label);

    // Contextual care toast matching screen_5db9919e
    let pillText = '';
    if (currentPet.type === 'koki') {
      if (slot === 'action3' || slot === 'action2') pillText = 'Kolam sudah bersih & jernih';
      else pillText = 'Ikan sudah kenyang & lincah';
    } else if (currentPet.type === 'tunas') {
      if (currentPet.variety === 'berry') {
        if (slot === 'action1') pillText = 'Buah berry sudah segar';
        else if (slot === 'action2') pillText = 'Nutrisi berry tercukupi';
        else pillText = 'Mentari hangatkan buah berry';
      } else if (slot === 'action1') {
        pillText = 'Tanaman sudah segar';
      } else if (slot === 'action2') {
        pillText = 'Nutrisi organik tercukupi';
      } else {
        pillText = 'Sinar mentari melimpah';
      }
    } else {
      if (slot === 'action3') pillText = 'Kandang sudah bersih & wangi';
      else if (slot === 'action1') pillText = 'Ayam sudah kenyang';
      else pillText = 'Air minum ayam sudah segar';
    }
    setCareToast(pillText);
    setTimeout(() => setCareToast(null), 2500);
  };

  const handleMascotTap = () => {
    playHeartPop(soundEnabled);
    spawnParticles(['❤️', '💖', '✨']);
    const petReactions = [
      '❤️ Sayang Pet!',
      '✨ Merasa dicintai!',
      '🌿 Makin segar & ceria!',
      '💚 Senang sekali dielus!',
      '🥰 Tumbuh makin subur!',
    ];
    const randomReaction = petReactions[Math.floor(Math.random() * petReactions.length)];
    triggerSparkle(randomReaction);
  };

  const getVitalDetails = (statIndex: 1 | 2 | 3) => {
    if (statIndex === 1) {
      const val = currentPet.stat1;
      const name = currentPet.stat1Name;
      let status = 'Optimal & Cukup';
      let advice = 'Kandungan nutrisi tercukupi dengan baik. Pertumbuhan jaringan dan sel tanaman berjalan sangat sehat.';
      if (val <= 25) {
        status = 'Kritis! Butuh Segera';
        advice = currentPet.type === 'tunas' ? 'Tanaman kekurangan hara organik! Segera berikan pupuk NPK/kompos agar tidak layu.' : 'Peliharaan sangat lapar! Segera berikan pakan berprotein.';
      } else if (val < 65) {
        status = 'Wajar';
        advice = 'Kondisi nutrisi stabil. Berikan pakan/pupuk teratur dalam beberapa jam ke depan.';
      }
      return {
        name,
        value: val,
        icon: currentPet.type === 'tunas' ? 'eco' : 'grain',
        status,
        advice,
        actionSlot: (currentPet.type === 'tunas' ? 'action2' : 'action1') as 'action1' | 'action2' | 'action3',
        actionLabel: currentPet.type === 'tunas' ? 'Beri Pupuk' : 'Beri Makan',
      };
    } else if (statIndex === 2) {
      const val = currentPet.stat2;
      const name = currentPet.stat2Name;
      let status = 'Optimal & Segar';
      let advice = 'Kadar air tanah seimbang sempurna. Sirkulasi kapiler akar berjalan lancar tanpa genangan.';
      if (val <= 25) {
        status = 'Kering / Kritis';
        advice = currentPet.type === 'tunas' ? 'Tanah mulai retak dan kering! Segera siram dengan air segar.' : 'Air kolam/minum mulai kotor atau surut. Segera bersihkan/ganti air!';
      } else if (val < 65) {
        status = 'Wajar';
        advice = 'Tingkat hidrasi mulai menurun. Siram atau berikan air segar sebelum siang hari.';
      }
      return {
        name,
        value: val,
        icon: currentPet.type === 'kuning' ? 'cleaning_services' : 'water_drop',
        status,
        advice,
        actionSlot: (currentPet.type === 'kuning' ? 'action2' : 'action1') as 'action1' | 'action2' | 'action3',
        actionLabel: currentPet.type === 'kuning' ? 'Beri Minum' : 'Siram Air',
      };
    } else {
      const val = currentPet.stat3;
      const name = currentPet.stat3Name;
      let status = 'Sangat Bahagia';
      let advice = 'Peliharaan merasa sangat nyaman, lincah, dan gembira dirawat oleh Sobat Tani.';
      if (val <= 25) {
        status = 'Gelisah / Butuh Perhatian';
        advice = 'Peliharaan butuh interaksi! Berikan sinar matahari, bersihkan lingkungan, atau sentuh maskot untuk mengelusnya.';
      } else if (val < 65) {
        status = 'Cukup Ceria';
        advice = 'Kondisi suasana hati stabil. Ajak bermain atau jemur peliharaan di bawah sinar matahari pagi.';
      }
      return {
        name,
        value: val,
        icon: 'favorite',
        status,
        advice,
        actionSlot: 'action3' as const,
        actionLabel: currentPet.type === 'tunas' ? 'Sinar Mentari' : currentPet.type === 'koki' ? 'Kuras Air' : 'Bersihkan',
      };
    }
  };

  // Dynamic switcher emojis per pet variety
  const getPetEmoji = (type: PetType) => {
    const pet = allPets ? allPets[type] : type === currentPet.type ? currentPet : null;
    const variety = pet?.variety;
    if (type === 'tunas') {
      if (variety === 'berry') return '🍓';
      if (variety === 'pisang') return '🍌';
      if (variety === 'sorgum') return '🌾';
      return '🌱';
    }
    if (type === 'koki') {
      if (variety === 'lele') return '🐡';
      if (variety === 'nila') return '🐠';
      return '🐟';
    }
    if (type === 'kuning') {
      if (variety === 'petelur') return '🐔';
      if (variety === 'pedaging') return '🐥';
      return '🐣';
    }
    return '🌱';
  };

  // Background per pet
  const bgImages = {
    tunas: '/assets/kebun_rumahan.jpg',
    koki: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFl0jAFY7xm6-SexwZV0AHrfcLWp2FrtrvXtvhLj1tuilWwRDWIHpYD1-S6rrCrL_sVPIr_7mIcWMNvgNglScDG9ieY4uazg5oGEJusUo4Yp6IB7-nbcVBqPPxBtFgcUqsU7-0QT4lkG1FqS-sevsRLOPmlVuky9yk_PunDlHo26nvN329EeHL0tkXDnS_GWv9FXyvLrc5T1IbYhclx7b15bRJQce_tg-CVTRWWw0r',
    kuning: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUn-IfxcHFGwvec_jk55_2NLIJqdoKZ3X0TuTwaI0j3TPRNHvfSHLS0bOGm1bdXuH2dpQQzmOckPVng8Sgvj9dzHdM2lbf4wpPs4G_lhtXzBgRwNluNQnSJCTvbIGnuxED9KleFyp_iGLHP47YEEaUSujBbRkZiy2qI8MbDrNGRZStlcb1UumPw678NhMmE79I-rhJXFx4CfYrK-c2EdwsQRXbRVtxzHi_F2s03s3n',
  };

  // Enhanced Button configs per pet - Modern Gojek style with benefit badges & elegant gradients
  const actionConfigs = {
    tunas: [
      {
        slot: 'action1' as const,
        label: 'Siram',
        badge: '+25% Air',
        icon: 'water_drop',
        gradient: 'from-sky-500 via-sky-600 to-blue-600',
        shadow: 'shadow-sky-500/25',
        border: 'border-sky-300/40',
        iconBg: 'bg-white/95 text-sky-600',
      },
      {
        slot: 'action2' as const,
        label: 'Pupuk',
        badge: '+25% Nutrisi',
        icon: 'eco',
        gradient: 'from-emerald-500 via-emerald-600 to-teal-700',
        shadow: 'shadow-emerald-500/25',
        border: 'border-emerald-300/40',
        iconBg: 'bg-white/95 text-emerald-700',
      },
      {
        slot: 'action3' as const,
        label: 'Sinar Mentari',
        badge: '+20% Senang',
        icon: 'wb_sunny',
        gradient: 'from-amber-400 via-amber-500 to-orange-500',
        shadow: 'shadow-amber-500/25',
        border: 'border-amber-200/50',
        iconBg: 'bg-white/95 text-amber-600',
      },
    ],
    koki: [
      {
        slot: 'action1' as const,
        label: 'Beri Makan',
        badge: '+25% Pakan',
        icon: 'bakery_dining',
        gradient: 'from-amber-400 via-amber-500 to-orange-500',
        shadow: 'shadow-amber-500/25',
        border: 'border-amber-200/50',
        iconBg: 'bg-white/95 text-amber-600',
      },
      {
        slot: 'action2' as const,
        label: 'Ganti Air',
        badge: '+25% Air',
        icon: 'water_drop',
        gradient: 'from-sky-500 via-sky-600 to-blue-600',
        shadow: 'shadow-sky-500/25',
        border: 'border-sky-300/40',
        iconBg: 'bg-white/95 text-sky-600',
      },
      {
        slot: 'action3' as const,
        label: 'Kuras Air',
        badge: '+20% Kolam',
        icon: 'cleaning_services',
        gradient: 'from-emerald-500 via-emerald-600 to-teal-700',
        shadow: 'shadow-emerald-500/25',
        border: 'border-emerald-300/40',
        iconBg: 'bg-white/95 text-emerald-700',
      },
    ],
    kuning: [
      {
        slot: 'action1' as const,
        label: 'Beri Makan',
        badge: '+25% Pakan',
        icon: 'grain',
        gradient: 'from-amber-400 via-amber-500 to-orange-500',
        shadow: 'shadow-amber-500/25',
        border: 'border-amber-200/50',
        iconBg: 'bg-white/95 text-amber-600',
      },
      {
        slot: 'action2' as const,
        label: 'Beri Minum',
        badge: '+25% Air',
        icon: 'water_drop',
        gradient: 'from-sky-500 via-sky-600 to-blue-600',
        shadow: 'shadow-sky-500/25',
        border: 'border-sky-300/40',
        iconBg: 'bg-white/95 text-sky-600',
      },
      {
        slot: 'action3' as const,
        label: 'Bersihkan',
        badge: '+20% Bersih',
        icon: 'cleaning_services',
        gradient: 'from-emerald-500 via-emerald-600 to-teal-700',
        shadow: 'shadow-emerald-500/25',
        border: 'border-emerald-300/40',
        iconBg: 'bg-white/95 text-emerald-700',
      },
    ],
  };

  const currentActions = actionConfigs[currentPet.type];
  const isPetNeedsCare = currentPet.isHungryOrThirsty || currentPet.stat1 <= 25 || currentPet.stat2 <= 25 || currentPet.stat3 <= 30;

  return (
    <div className="flex-1 flex flex-col relative w-full pb-20 bg-[#fff8f5] select-none overflow-x-hidden">
      {/* 1. Clean 2-Row Header (Gojek-style: no overlap) */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/98 backdrop-blur-xl border-b border-[#f0e8e0] shadow-[0_1px_12px_rgba(43,23,4,0.07)]">
        <div className="max-w-md mx-auto px-4">

          {/* ── Row 1: Branding left · Profile actions right ── */}
          <div className="h-[52px] flex items-center justify-between">

            {/* Left: Logo + App name */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-[#006a3e] flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-[15px] text-[#1b4332] tracking-tight flex items-center gap-1">
                  Dewi Sri
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <span className="text-[10px] font-semibold text-[#7a8c7d] tracking-wide">Asisten Pertanian Cerdas</span>
              </div>
            </div>

            {/* Right: sound toggle · streak · avatar */}
            <div className="flex items-center gap-1.5">
              {onToggleSound && (
                <button
                  onClick={onToggleSound}
                  title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
                  aria-label="Toggle Suara"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer border ${
                    soundEnabled
                      ? 'bg-emerald-50 text-[#006a3e] border-emerald-200 shadow-sm'
                      : 'bg-stone-100 text-stone-400 border-stone-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {soundEnabled ? 'volume_up' : 'volume_off'}
                  </span>
                </button>
              )}

              <div
                title={`Streak ${streakDays} hari berturut-turut!`}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 border border-amber-200 cursor-default"
              >
                <span className="text-[13px]">🔥</span>
                <span className="font-black text-[11px] text-amber-700">{streakDays}h</span>
              </div>

              <button
                onClick={onOpenProfile}
                aria-label="Buka Profil"
                className="w-9 h-9 rounded-full ring-[2.5px] ring-emerald-300 overflow-hidden shadow-sm active:scale-90 transition-all cursor-pointer"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAa3hIZEnYDems4sg1L3amF9TYgQxv7Jz89ITO89SzSu3TEvkb5mWMkZcyIf1ih1b0WAEcwWL9SA2xdYsynMuXrDXWfbELMMbw14TvHUG-I1y5fZ0tw7AwxBkblJ8eZ0OMmFd68RnI2Lof2wd8BxW-V_sWkSMpDYpE3KM6Jv1j-TrjhzNIYilS_ZSA7zFEjw3SscWDe0shBe93JLPm9g_0SSFC6cYE5Mf5lh7nRUtU"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          {/* ── Row 2: Greeting left · Pet name + species right ── */}
          <div className="h-[36px] flex items-center justify-between pb-1.5 border-t border-[#f5ede8]">
            {/* Greeting (time-of-day) - Interactive with Weather Modal */}
            <button
              onClick={() => {
                playPop(soundEnabled);
                setShowWeatherModal(true);
              }}
              title="Lihat Prakiraan Cuaca Sawah"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-stone-100/80 active:scale-95 transition-all cursor-pointer border border-transparent hover:border-amber-200/60 group"
            >
              <span className="material-symbols-outlined text-[14px] text-amber-500 leading-none group-hover:rotate-12 transition-transform">{greeting.icon}</span>
              <span className="text-[11px] font-bold text-[#556958]">{greeting.text} • 28°C</span>
              <span className="material-symbols-outlined text-[12px] text-amber-600/70">chevron_right</span>
            </button>

            {/* Pet name + species pill */}
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-[13px] text-[#1b4332] tracking-tight leading-none">{currentPet.name}</h1>
              <span className="text-[10px] font-bold text-[#006a3e] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 leading-none">
                {currentPet.species}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col pt-[88px] pb-24 max-w-md mx-auto w-full px-3 overflow-x-hidden">
        {/* 2. Enhanced 3-Vitals Gauges Row (Interactive Gojek-style metrics) */}
        <div className="pt-2 pb-2 z-20">
          <div className="grid grid-cols-3 gap-2">
            {/* Stat 1 */}
            <div
              onClick={() => {
                playPop(soundEnabled);
                setSelectedVital(getVitalDetails(1));
              }}
              className={`flex flex-col gap-1 rounded-2xl p-2.5 bg-white border transition-all duration-200 shadow-xs cursor-pointer active:scale-95 hover:border-emerald-300 hover:shadow-sm ${
                currentPet.stat1 <= 20 ? 'border-red-300 ring-2 ring-red-100' : 'border-[#ffeadb]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${currentPet.stat1 <= 20 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
                    <span className="material-symbols-outlined text-[13px]">
                      {currentPet.type === 'tunas' ? 'eco' : 'grain'}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#2b1704] truncate">{currentPet.stat1Name}</span>
                </div>
                <span className={`text-[11px] font-black ${currentPet.stat1 <= 20 ? 'text-red-600' : 'text-amber-700'}`}>
                  {currentPet.stat1}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#ffeadb] rounded-full overflow-hidden shadow-inner mt-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    currentPet.stat1 <= 20
                      ? 'bg-gradient-to-r from-red-500 to-rose-600'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500'
                  }`}
                  style={{ width: `${currentPet.stat1}%` }}
                />
              </div>
              <span className={`text-[9px] font-bold mt-0.5 truncate ${currentPet.stat1 <= 20 ? 'text-red-600' : currentPet.stat1 < 65 ? 'text-amber-700' : 'text-emerald-700'}`}>
                {currentPet.stat1 <= 20 ? 'Kritis ⚠️' : currentPet.stat1 < 65 ? 'Cukup' : 'Optimal ✨'}
              </span>
            </div>

            {/* Stat 2 */}
            <div
              onClick={() => {
                playPop(soundEnabled);
                setSelectedVital(getVitalDetails(2));
              }}
              className={`flex flex-col gap-1 rounded-2xl p-2.5 bg-white border transition-all duration-200 shadow-xs cursor-pointer active:scale-95 hover:border-sky-300 hover:shadow-sm ${
                currentPet.stat2 <= 20 ? 'border-red-300 ring-2 ring-red-100' : 'border-[#ffeadb]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${currentPet.stat2 <= 20 ? 'bg-red-100 text-red-600' : 'bg-sky-100 text-sky-700'}`}>
                    <span className="material-symbols-outlined text-[13px]">
                      {currentPet.type === 'kuning' ? 'cleaning_services' : 'water_drop'}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#2b1704] truncate">{currentPet.stat2Name}</span>
                </div>
                <span className={`text-[11px] font-black ${currentPet.stat2 <= 20 ? 'text-red-600' : 'text-sky-700'}`}>
                  {currentPet.stat2}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#ffeadb] rounded-full overflow-hidden shadow-inner mt-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    currentPet.stat2 <= 20
                      ? 'bg-gradient-to-r from-red-500 to-rose-600'
                      : 'bg-gradient-to-r from-sky-400 to-blue-600'
                  }`}
                  style={{ width: `${currentPet.stat2}%` }}
                />
              </div>
              <span className={`text-[9px] font-bold mt-0.5 truncate ${currentPet.stat2 <= 20 ? 'text-red-600' : currentPet.stat2 < 65 ? 'text-sky-700' : 'text-emerald-700'}`}>
                {currentPet.stat2 <= 20 ? 'Kering ⚠️' : currentPet.stat2 < 65 ? 'Cukup' : 'Segar ✨'}
              </span>
            </div>

            {/* Stat 3 */}
            <div
              onClick={() => {
                playPop(soundEnabled);
                setSelectedVital(getVitalDetails(3));
              }}
              className={`flex flex-col gap-1 rounded-2xl p-2.5 bg-white border transition-all duration-200 shadow-xs cursor-pointer active:scale-95 hover:border-emerald-300 hover:shadow-sm ${
                currentPet.stat3 <= 25 ? 'border-red-300 ring-2 ring-red-100' : 'border-[#ffeadb]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${currentPet.stat3 <= 25 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                    <span className="material-symbols-outlined text-[13px]">
                      favorite
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#2b1704] truncate">{currentPet.stat3Name}</span>
                </div>
                <span className={`text-[11px] font-black ${currentPet.stat3 <= 25 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {currentPet.stat3}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#ffeadb] rounded-full overflow-hidden shadow-inner mt-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    currentPet.stat3 <= 25
                      ? 'bg-gradient-to-r from-red-500 to-rose-600'
                      : 'bg-gradient-to-r from-emerald-400 to-green-600'
                  }`}
                  style={{ width: `${currentPet.stat3}%` }}
                />
              </div>
              <span className={`text-[9px] font-bold mt-0.5 truncate ${currentPet.stat3 <= 25 ? 'text-red-600' : currentPet.stat3 < 65 ? 'text-amber-700' : 'text-emerald-700'}`}>
                {currentPet.stat3 <= 25 ? 'Gelisah ⚠️' : currentPet.stat3 < 65 ? 'Stabil' : 'Bahagia ✨'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Habitat Scene Container (Cleanly framed, no blurry text or cutoffs) */}
        <div className="relative w-full h-[330px] sm:h-[350px] rounded-3xl overflow-hidden shadow-[0_6px_20px_rgba(43,23,4,0.08)] border border-[#ffeadb] flex flex-col justify-between items-center px-4 pt-3 bg-gradient-to-b from-sky-100 to-amber-50">
          {/* Habitat Background Image (Cropped by -inset-6 to completely eliminate any baked-in screenshot headers/footers) */}
          <div
            className="absolute -inset-6 bg-cover transition-all duration-700 ease-in-out pointer-events-none"
            style={{
              backgroundImage: `url("${bgImages[currentPet.type]}")`,
              backgroundPosition: currentPet.type === 'koki' ? 'center 46%' : currentPet.type === 'kuning' ? 'center 46%' : 'center center',
            }}
          >
            {/* Top soft blend to guarantee pure clean sky with zero header text */}
            <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-sky-100/90 via-sky-100/40 to-transparent pointer-events-none" />
            {/* Bottom soft blend to guarantee clean pond bed/ground with zero footer text */}
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-amber-100/80 via-amber-100/30 to-transparent pointer-events-none" />
          </div>

          {/* Floating Atmospheric Butterfly / Pet Particle */}
          <div className="absolute top-3.5 right-4 z-20 pointer-events-none animate-float-gentle text-base opacity-85">
            {currentPet.type === 'tunas' ? '🦋' : currentPet.type === 'koki' ? '🫧' : '🌾'}
          </div>

          {/* Left Pet Switcher (Dynamic Variety Emojis) */}
          <div className="absolute left-3 top-3 z-30 flex flex-col gap-2">
            <button
              onClick={() => onSelectPetType('tunas')}
              aria-label={`Pilih Tanaman (${allPets?.tunas?.name || 'Tunas'})`}
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                currentPet.type === 'tunas' ? 'ring-3 ring-[#0E8551] scale-105 shadow-emerald-700/20' : 'ring-2 ring-white/90 opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-xl transition-transform hover:scale-110">{getPetEmoji('tunas')}</span>
            </button>
            <button
              onClick={() => onSelectPetType('koki')}
              aria-label={`Pilih Ikan (${allPets?.koki?.name || 'Koki'})`}
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                currentPet.type === 'koki' ? 'ring-3 ring-[#0E8551] scale-105 shadow-emerald-700/20' : 'ring-2 ring-white/90 opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-xl transition-transform hover:scale-110">{getPetEmoji('koki')}</span>
            </button>
            <button
              onClick={() => onSelectPetType('kuning')}
              aria-label={`Pilih Ayam (${allPets?.kuning?.name || 'Kuning'})`}
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                currentPet.type === 'kuning' ? 'ring-3 ring-[#0E8551] scale-105 shadow-emerald-700/20' : 'ring-2 ring-white/90 opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-xl transition-transform hover:scale-110">{getPetEmoji('kuning')}</span>
            </button>
          </div>

          {/* Top Pet Mood Indicator Pill */}
          <div className="z-30 mt-0.5">
            <div className={`px-3 py-0.5 rounded-full backdrop-blur-md shadow-xs border flex items-center gap-1.5 transition-all ${
              isPetNeedsCare
                ? 'bg-[#ffdad6]/90 border-red-300 text-[#ba1a1a] animate-pulse'
                : 'bg-white/90 border-emerald-200 text-[#006a3e]'
            }`}>
              <span className="text-xs">{isPetNeedsCare ? '🥺' : '✨'}</span>
              <span className="text-[10px] font-extrabold tracking-tight">
                {isPetNeedsCare ? 'Butuh Dirawat Segera!' : 'Sangat Sehat & Bahagia'}
              </span>
            </div>
          </div>

          {/* Care Feedback Toast Pill */}
          {careToast && (
            <div className="absolute bottom-[225px] left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full shadow-lg border border-emerald-300 flex items-center gap-1.5 animate-bounce">
              <span className="material-symbols-outlined text-sm text-[#0E8551] font-bold">check_circle</span>
              <span className="text-[10.5px] font-extrabold text-[#006a3e]">{careToast}</span>
            </div>
          )}

          {/* Speech Bubble: Positioned right above the pet mascot */}
          <div
            className="absolute bottom-[180px] left-1/2 -translate-x-1/2 z-30 max-w-[210px] w-max animate-bounce pointer-events-none"
            style={{ animationDuration: '3.5s' }}
          >
            <div className="bg-white/95 backdrop-blur-sm text-[#2b1704] rounded-2xl px-3 py-1 shadow-[0_4px_14px_rgba(43,23,4,0.12)] border border-[#ffeadb] relative">
              <p className="text-[10px] leading-snug font-bold text-center whitespace-normal">{currentPet.speech}</p>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white"></div>
            </div>
          </div>

          {/* Dynamic Floating Particles Overlay */}
          <div className="absolute inset-0 pointer-events-none z-35 overflow-hidden">
            {particles.map((p) => (
              <span
                key={p.id}
                className="absolute text-2xl select-none animate-particle-rise"
                style={{
                  left: `${p.leftPct}%`,
                  bottom: `${p.bottomPx}px`,
                }}
              >
                {p.emoji}
              </span>
            ))}
          </div>

          {/* Interactive Mascot Character */}
          <PetCharacter
            pet={currentPet}
            onPetClick={handleMascotTap}
            sparkleText={sparkle}
          />

          {/* Bottom Action Controls: Tanya AI and Ganti Jenis side-by-side */}
          <div className="absolute right-3 bottom-3 z-30 flex items-center gap-2">
            <button
              onClick={onOpenChatAI}
              aria-label="Tanya AI Dewi Sri"
              className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#0E8551] to-[#00522f] text-white flex flex-col items-center justify-center shadow-md active:scale-95 transition-all group border-2 border-white/90 cursor-pointer hover:shadow-emerald-700/40"
            >
              <span className="material-symbols-outlined text-[19px] leading-none text-white group-hover:scale-110 transition-transform">
                smart_toy
              </span>
              <span className="font-extrabold text-[8.5px] leading-tight tracking-tight mt-0.5 text-white">Tanya AI</span>
            </button>

            <button
              onClick={() => {
                playPop(soundEnabled);
                setIsVarietyModalOpen(true);
              }}
              aria-label="Ganti Jenis Peliharaan"
              className="w-[46px] h-[46px] rounded-full bg-white flex flex-col items-center justify-center shadow-md border-[2px] border-[#0E8551] text-[#0E8551] active:scale-95 transition-all cursor-pointer group hover:bg-[#e8f5e9]"
            >
              <span className="material-symbols-outlined text-[19px] leading-none text-[#0E8551] group-hover:rotate-180 transition-transform duration-300">
                swap_horiz
              </span>
              <span className="font-extrabold text-[8.5px] leading-tight tracking-tight text-[#0E8551] -mt-0.5">Ganti</span>
            </button>
          </div>
        </div>

        {/* Modal: Pilih Jenis Peliharaan */}
        {isVarietyModalOpen && (
          <PetVarietyModal
            petType={currentPet.type}
            currentVariety={currentPet.variety || (currentPet.type === 'tunas' ? 'padi' : currentPet.type === 'koki' ? 'koi' : 'kampung')}
            onSelectVariety={(variety, displayName, shouldClose = true) => {
              onSelectVariety(variety, displayName);
              if (shouldClose) {
                setIsVarietyModalOpen(false);
                triggerSparkle(`✨ Memilih ${displayName}!`);
              }
            }}
            onClose={() => setIsVarietyModalOpen(false)}
          />
        )}

        {/* 3.5 Growth Stage & Farm Progression Card (Compact Gojek-style bar) */}
        <div className="pt-2 z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 px-3 shadow-xs border border-[#ffeadb] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#e8f7ee] border border-emerald-200 text-[#006a3e] flex items-center justify-center flex-shrink-0 text-sm shadow-2xs">
                {currentPet.type === 'tunas' ? '🌱' : currentPet.type === 'koki' ? '🐟' : '🐣'}
              </div>
              <div className="flex flex-col min-w-0 leading-tight">
                <span className="text-[10.5px] font-black text-[#1b4332] truncate">
                  Fase 2: {currentPet.type === 'tunas' ? 'Pertumbuhan Vegetatif' : currentPet.type === 'koki' ? 'Ikan Remaja Lincah' : 'Ayam Dara Unggul'}
                </span>
                <span className="text-[9.5px] font-semibold text-[#6e7a70] truncate">
                  Kebugaran: {Math.round((currentPet.stat1 + currentPet.stat2 + currentPet.stat3) / 3)}% Menuju Panen
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
              <span className="text-[9.5px] font-extrabold text-[#006a3e]">
                +5 EXP / Aksi
              </span>
              <div className="w-14 h-1.5 bg-[#ffeadb] rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-[#006a3e] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((currentPet.stat1 + currentPet.stat2 + currentPet.stat3) / 3))}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Modern Tactile Action Buttons (Gojek-style with benefit badges) */}
        <div className="pt-2.5 pb-2 z-20">
          <div className="grid grid-cols-3 gap-2">
            {currentActions.map((btn) => (
              <button
                key={btn.slot}
                onClick={() => handleAction(btn.slot, `✨ ${btn.label}!`)}
                className={`relative h-[82px] rounded-2xl bg-gradient-to-b ${btn.gradient} text-white border ${btn.border} p-1.5 flex flex-col items-center justify-between shadow-lg ${btn.shadow} active:scale-95 active:brightness-95 transition-all duration-150 cursor-pointer overflow-hidden group`}
              >
                {/* Subtle top gloss highlight */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />

                {/* Circular Icon with inner glow */}
                <div className={`w-9 h-9 rounded-full ${btn.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0 mt-0.5`}>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {btn.icon}
                  </span>
                </div>

                {/* Label & Benefit Badge */}
                <div className="flex flex-col items-center w-full leading-tight">
                  <span className="font-black text-[12px] tracking-tight text-white drop-shadow-xs truncate max-w-full">
                    {btn.label}
                  </span>
                  <span className="text-[9px] font-extrabold text-white/90 bg-white/20 px-2 py-0.2 rounded-full mt-0.5 leading-none backdrop-blur-xs">
                    {btn.badge}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Gojek/Grab-Style Quick Services Launcher Grid (Fitur Pintar Tani) */}
        <div className="pt-2 pb-2 z-20">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="font-black text-xs text-[#1b4332] tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded-full bg-[#0E8551]" />
              Layanan Pintar Pertanian
            </span>
            <span className="text-[10px] font-bold text-[#0E8551] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Menu Cepat
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 bg-white rounded-2xl p-3 border border-[#ffeadb] shadow-[0_2px_12px_rgba(43,23,4,0.04)]">
            {/* Tile 1: Deteksi Hama */}
            <button
              onClick={() => {
                playPop(soundEnabled);
                onOpenChatAI();
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-1 rounded-xl active:scale-90 transition-transform cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">photo_camera</span>
              </div>
              <span className="font-extrabold text-[10px] text-[#2b1704] text-center leading-tight">
                Cek Hama AI
              </span>
            </button>

            {/* Tile 2: Cuaca Sawah */}
            <button
              onClick={() => {
                playPop(soundEnabled);
                setShowWeatherModal(true);
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-1 rounded-xl active:scale-90 transition-transform cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">partly_cloudy_day</span>
              </div>
              <span className="font-extrabold text-[10px] text-[#2b1704] text-center leading-tight">
                Cuaca Tani
              </span>
            </button>

            {/* Tile 3: Jenjang Karir */}
            <button
              onClick={() => {
                playPop(soundEnabled);
                if (onOpenRankPetani) onOpenRankPetani();
                else if (onOpenProfile) onOpenProfile();
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-1 rounded-xl active:scale-90 transition-transform cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">military_tech</span>
              </div>
              <span className="font-extrabold text-[10px] text-[#2b1704] text-center leading-tight">
                Jenjang Karir
              </span>
            </button>

            {/* Tile 4: Jurnal Tani */}
            <button
              onClick={() => {
                playPop(soundEnabled);
                if (onOpenHistory) onOpenHistory();
                else onOpenChatAI();
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-1 rounded-xl active:scale-90 transition-transform cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">book_2</span>
              </div>
              <span className="font-extrabold text-[10px] text-[#2b1704] text-center leading-tight">
                Jurnal Tani
              </span>
            </button>
          </div>
        </div>

        {/* 6. Grab/Gojek-Style Daily Quest & Rewards Banner */}
        <div className="pt-1 pb-4 z-20">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-[#006a3e] to-[#0E8551] text-white p-3 px-3.5 shadow-md flex items-center justify-between border border-emerald-600/40">
            {/* Background shimmer effect */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

            <div className="flex items-center gap-2.5 min-w-0 z-10">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center flex-shrink-0 text-lg shadow-sm font-black">
                🎯
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black tracking-tight text-white truncate">
                    Misi Harian: Rawat Pet 3x
                  </span>
                  <span className="text-[9px] font-extrabold bg-amber-300 text-amber-950 px-1.5 py-0.2 rounded-full leading-none">
                    +50 EXP
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 h-1.5 bg-black/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: dailyQuestClaimed ? '100%' : '66%' }}
                    />
                  </div>
                  <span className="text-[9.5px] font-bold text-emerald-100">
                    {dailyQuestClaimed ? 'Selesai!' : '2/3 Selesai'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (dailyQuestClaimed) return;
                playLevelUpFanfare(soundEnabled);
                setDailyQuestClaimed(true);
                triggerSparkle('🎉 +50 EXP Diklaim!');
              }}
              disabled={dailyQuestClaimed}
              className={`z-10 px-3 py-1.5 rounded-xl font-black text-[11px] flex items-center gap-1 transition-all active:scale-95 cursor-pointer flex-shrink-0 shadow-sm ${
                dailyQuestClaimed
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-[#fef08a] text-[#715c00] border border-amber-300 hover:brightness-105 animate-pulse'
              }`}
            >
              <span>{dailyQuestClaimed ? 'Terklaim' : 'Klaim'}</span>
              <span className="text-xs">✨</span>
            </button>
          </div>
        </div>

        {/* Modal: Cuaca & Iklim Pertanian Mikro */}
        {showWeatherModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-emerald-100 animate-scaleUp">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">partly_cloudy_day</span>
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-[#1b4332]">Prakiraan Cuaca Kebun</h3>
                    <p className="text-[11px] text-[#6e7a70] font-semibold">Bandung, Jawa Barat • Real-time</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWeatherModal(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center active:scale-90 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm font-bold">close</span>
                </button>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 my-4">
                <div className="flex flex-col items-center p-2.5 rounded-2xl bg-sky-50/70 border border-sky-100">
                  <span className="material-symbols-outlined text-sky-600 text-xl">thermostat</span>
                  <span className="font-black text-base text-[#1b4332] mt-0.5">28°C</span>
                  <span className="text-[10px] text-sky-800 font-bold">Suhu Sejuk</span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <span className="material-symbols-outlined text-blue-600 text-xl">humidity_mid</span>
                  <span className="font-black text-base text-[#1b4332] mt-0.5">74%</span>
                  <span className="text-[10px] text-blue-800 font-bold">Kelembapan</span>
                </div>
                <div className="flex flex-col items-center p-2.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <span className="material-symbols-outlined text-amber-600 text-xl">sunny</span>
                  <span className="font-black text-base text-[#1b4332] mt-0.5">Sedang</span>
                  <span className="text-[10px] text-amber-800 font-bold">Indeks UV</span>
                </div>
              </div>

              {/* Agronomy Recommendation Box */}
              <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/60 p-3 mb-4">
                <div className="flex items-center gap-1.5 mb-1 text-[#006a3e] font-black text-xs">
                  <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                  <span>Rekomendasi Agronomi Hari Ini</span>
                </div>
                <p className="text-[11px] text-[#2b1704] leading-relaxed font-semibold">
                  Suhu dan kelembapan sangat ideal untuk pertumbuhan vegetatif. Waktu penyiraman terbaik adalah pukul <strong>07:00 - 08:30</strong> atau <strong>16:30 - 17:30</strong> agar penyerapan akar maksimal tanpa penguapan ekstrem.
                </p>
              </div>

              <button
                onClick={() => setShowWeatherModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#006a3e] text-white font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Mengerti & Terapkan
              </button>
            </div>
          </div>
        )}

        {/* Modal: Detail Indikator Vital */}
        {selectedVital && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#ffeadb] animate-scaleUp">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#006a3e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">{selectedVital.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-[#1b4332]">{selectedVital.name}</h3>
                    <span className="text-[11px] font-extrabold text-[#0E8551]">{selectedVital.value}% • {selectedVital.status}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVital(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center active:scale-90 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm font-bold">close</span>
                </button>
              </div>

              <div className="my-4 p-3 rounded-2xl bg-[#fff8f5] border border-[#ffeadb]">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0E8551] block mb-1">
                  Analisis Kondisi & Rekomendasi
                </span>
                <p className="text-xs text-[#2b1704] leading-relaxed font-semibold">
                  {selectedVital.advice}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleAction(selectedVital.actionSlot, `✨ ${selectedVital.actionLabel}!`);
                    setSelectedVital(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-[#006a3e] text-white font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">bolt</span>
                  <span>{selectedVital.actionLabel} Sekarang</span>
                </button>
                <button
                  onClick={() => setSelectedVital(null)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-600 font-bold text-xs active:scale-95 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};