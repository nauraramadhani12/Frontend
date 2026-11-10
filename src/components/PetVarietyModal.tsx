import React, { useState } from 'react';
import { PetType, PetVariety, PlantVariety, FishVariety, ChickenVariety } from '../types/index.ts';

interface PetVarietyModalProps {
  petType: PetType;
  currentVariety: PetVariety;
  onSelectVariety: (variety: PetVariety, displayName: string, shouldClose?: boolean) => void;
  onClose: () => void;
}

interface VarietyOption {
  id: PetVariety;
  name: string;
  desc: string;
  badge?: string;
  harvest?: string;
  svg: React.ReactNode;
}

export const PetVarietyModal: React.FC<PetVarietyModalProps> = ({
  petType,
  currentVariety,
  onSelectVariety,
  onClose,
}) => {
  const [selected, setSelected] = useState<PetVariety>(currentVariety);

  // Variety definitions matching the mockups (screen_2f0475d1, screen_bbc367bf, screen_55f863fc)
  const plantOptions: VarietyOption[] = [
    {
      id: 'padi' as PlantVariety,
      name: 'Padi',
      desc: 'Tanaman pokok sawah',
      badge: 'Pokok Nusantara',
      harvest: '🌾 65 Hari',
      svg: (
        <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="92" fill="#2b1704" opacity="0.15" rx="24" ry="4" />
          <path d="M35 70 L40 88 C40.5 90 42 91 44 91 L56 91 C58 91 59.5 90 60 88 L65 70 Z" fill="#cf7a4a" />
          <path d="M32 68 H68 V72 H32 Z" fill="#bf6838" rx="2" />
          <ellipse cx="50" cy="70" fill="#5c3717" rx="16" ry="3" />
          <path d="M50 70 V38" stroke="#34a853" strokeWidth="4" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M50 48 C38 42 32 46 28 54 C36 58 44 54 50 48 Z" fill="#58cc02" />
          <path d="M50 48 C62 42 68 46 72 54 C64 58 56 54 50 48 Z" fill="#46b500" />
          {/* Top rice grains */}
          <ellipse cx="50" cy="30" fill="#facc15" rx="3.5" ry="6" />
          <ellipse cx="44" cy="34" fill="#facc15" rx="3" ry="5" transform="rotate(-30 44 34)" />
          <ellipse cx="56" cy="34" fill="#facc15" rx="3" ry="5" transform="rotate(30 56 34)" />
          {/* Cute face on pot */}
          <circle cx="45" cy="80" fill="#1c281e" r="2" />
          <circle cx="55" cy="80" fill="#1c281e" r="2" />
          <path d="M48 83 Q50 86 52 83" stroke="#1c281e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      id: 'pisang' as PlantVariety,
      name: 'Pisang',
      desc: 'Buah manis tropis',
      badge: 'Tropis Segar',
      harvest: '🍌 8 Bulan',
      svg: (
        <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="92" fill="#2b1704" opacity="0.15" rx="24" ry="4" />
          <path d="M35 70 L40 88 C40.5 90 42 91 44 91 L56 91 C58 91 59.5 90 60 88 L65 70 Z" fill="#cf7a4a" />
          <path d="M32 68 H68 V72 H32 Z" fill="#bf6838" rx="2" />
          <ellipse cx="50" cy="70" fill="#5c3717" rx="16" ry="3" />
          <path d="M50 70 V44" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" />
          {/* Wide banana leaves */}
          <ellipse cx="32" cy="48" fill="#16a34a" rx="16" ry="8" transform="rotate(-25 32 48)" />
          <ellipse cx="68" cy="48" fill="#15803d" rx="16" ry="8" transform="rotate(25 68 48)" />
          <ellipse cx="50" cy="36" fill="#22c55e" rx="8" ry="14" />
          {/* Cute face on pot */}
          <circle cx="45" cy="80" fill="#1c281e" r="2" />
          <circle cx="55" cy="80" fill="#1c281e" r="2" />
          <path d="M48 83 Q50 86 52 83" stroke="#1c281e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      id: 'sorgum' as PlantVariety,
      name: 'Sorgum',
      desc: 'Tahan kering, bergizi',
      badge: 'Tahan Kemarau',
      harvest: '🌾 90 Hari',
      svg: (
        <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="92" fill="#2b1704" opacity="0.15" rx="24" ry="4" />
          <path d="M35 70 L40 88 C40.5 90 42 91 44 91 L56 91 C58 91 59.5 90 60 88 L65 70 Z" fill="#cf7a4a" />
          <path d="M32 68 H68 V72 H32 Z" fill="#bf6838" rx="2" />
          <ellipse cx="50" cy="70" fill="#5c3717" rx="16" ry="3" />
          <path d="M50 70 V32" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
          {/* Sorghum cluster seed head */}
          <ellipse cx="50" cy="26" fill="#ea580c" rx="8" ry="12" />
          <ellipse cx="50" cy="26" fill="#f97316" rx="6" ry="10" />
          <circle cx="46" cy="24" fill="#fed7aa" r="1.5" />
          <circle cx="53" cy="28" fill="#fed7aa" r="1.5" />
          {/* Slender leaves */}
          <path d="M50 56 Q36 50 30 58 Q42 58 50 56 Z" fill="#22c55e" />
          <path d="M50 48 Q64 42 70 50 Q58 52 50 48 Z" fill="#16a34a" />
          {/* Cute face on pot */}
          <circle cx="45" cy="80" fill="#1c281e" r="2" />
          <circle cx="55" cy="80" fill="#1c281e" r="2" />
          <path d="M48 83 Q50 86 52 83" stroke="#1c281e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      id: 'berry' as PlantVariety,
      name: 'Berry',
      desc: 'Buah kecil segar',
      badge: 'Superfood Manis',
      harvest: '🍓 35 Hari',
      svg: (
        <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="92" fill="#2b1704" opacity="0.15" rx="24" ry="4" />
          <path d="M35 70 L40 88 C40.5 90 42 91 44 91 L56 91 C58 91 59.5 90 60 88 L65 70 Z" fill="#cf7a4a" />
          <path d="M32 68 H68 V72 H32 Z" fill="#bf6838" rx="2" />
          <ellipse cx="50" cy="70" fill="#5c3717" rx="16" ry="3" />
          {/* Bushy round crown */}
          <circle cx="50" cy="46" fill="#16a34a" r="20" />
          <circle cx="50" cy="44" fill="#22c55e" r="18" />
          {/* Red berries on bush */}
          <circle cx="42" cy="42" fill="#ef4444" r="4.5" />
          <circle cx="56" cy="40" fill="#dc2626" r="4.5" />
          <circle cx="48" cy="52" fill="#f87171" r="4" />
          <circle cx="43" cy="41" fill="#ffffff" r="1" />
          <circle cx="57" cy="39" fill="#ffffff" r="1" />
          {/* Cute face on pot */}
          <circle cx="45" cy="80" fill="#1c281e" r="2" />
          <circle cx="55" cy="80" fill="#1c281e" r="2" />
          <path d="M48 83 Q50 86 52 83" stroke="#1c281e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
  ];

  const fishOptions: VarietyOption[] = [
    {
      id: 'koi' as FishVariety,
      name: 'Koi',
      desc: 'Cantik & jinak',
      badge: 'Ikan Hias',
      harvest: '✨ Estetis & Jinak',
      svg: (
        <svg className="w-20 h-16 drop-shadow-sm" viewBox="0 0 120 80" fill="none">
          <ellipse cx="90" cy="42" fill="#f97316" rx="20" ry="12" />
          <ellipse cx="60" cy="40" fill="#ea580c" rx="30" ry="24" />
          <ellipse cx="60" cy="40" fill="#f97316" rx="28" ry="22" />
          <ellipse cx="62" cy="46" fill="#ffffff" rx="22" ry="14" />
          <circle cx="46" cy="34" fill="#ffffff" r="7" />
          <circle cx="45" cy="34" fill="#0f172a" r="5" />
          <circle cx="44" cy="32" fill="#ffffff" r="2" />
          <circle cx="39" cy="42" fill="#fb7185" opacity="0.7" r="3.5" />
          <path d="M37 38 Q40 41 43 38" fill="none" stroke="#c2410c" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'lele' as FishVariety,
      name: 'Lele',
      desc: 'Mudah dipelihara',
      badge: 'Tangguh',
      harvest: '🐟 60 Hari',
      svg: (
        <svg className="w-20 h-16 drop-shadow-sm" viewBox="0 0 120 80" fill="none">
          <ellipse cx="88" cy="42" fill="#44403c" rx="20" ry="10" />
          <ellipse cx="58" cy="40" fill="#292524" rx="30" ry="22" />
          <ellipse cx="58" cy="40" fill="#57534e" rx="28" ry="20" />
          <ellipse cx="60" cy="46" fill="#a8a29e" opacity="0.6" rx="20" ry="12" />
          {/* Whiskers (sungut lele) */}
          <path d="M40 38 Q28 32 20 40" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M40 44 Q26 48 18 46" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="46" cy="34" fill="#ffffff" r="6" />
          <circle cx="45" cy="34" fill="#0c0a09" r="4" />
          <circle cx="44" cy="33" fill="#ffffff" r="1.5" />
          <circle cx="40" cy="42" fill="#fb7185" opacity="0.6" r="3" />
        </svg>
      ),
    },
    {
      id: 'nila' as FishVariety,
      name: 'Nila',
      desc: 'Cepat besar & tangguh',
      badge: 'Sahabat Kolam',
      harvest: '🐟 90 Hari',
      svg: (
        <svg className="w-20 h-16 drop-shadow-sm" viewBox="0 0 120 80" fill="none">
          <ellipse cx="88" cy="42" fill="#0d9488" rx="20" ry="12" />
          <ellipse cx="58" cy="40" fill="#0f766e" rx="30" ry="24" />
          <ellipse cx="58" cy="40" fill="#14b8a6" rx="28" ry="22" />
          {/* Vertical stripes on tilapia */}
          <path d="M52 24 V56" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M62 22 V58" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 26 V54" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="60" cy="46" fill="#ccfbf1" opacity="0.7" rx="20" ry="14" />
          <circle cx="44" cy="34" fill="#ffffff" r="7" />
          <circle cx="43" cy="34" fill="#115e59" r="5" />
          <circle cx="42" cy="32" fill="#ffffff" r="2" />
          <circle cx="38" cy="42" fill="#fda4af" opacity="0.7" r="3.5" />
          <path d="M36 38 Q39 41 42 38" fill="none" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const chickenOptions: VarietyOption[] = [
    {
      id: 'kampung' as ChickenVariety,
      name: 'Ayam Kampung',
      desc: 'Tangguh dan lincah',
      badge: 'Daging Lezat',
      harvest: '🥚 Telur Alami',
      svg: (
        <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
          {/* Comb */}
          <ellipse cx="50" cy="18" fill="#ef4444" rx="4" ry="7" />
          <ellipse cx="46" cy="20" fill="#dc2626" rx="3.5" ry="6" />
          <ellipse cx="54" cy="20" fill="#dc2626" rx="3.5" ry="6" />
          {/* Wings */}
          <ellipse cx="26" cy="58" fill="#f59e0b" rx="8" ry="14" transform="rotate(20 26 58)" />
          <ellipse cx="74" cy="58" fill="#f59e0b" rx="8" ry="14" transform="rotate(-20 74 58)" />
          {/* Body */}
          <ellipse cx="50" cy="56" fill="#fef08a" rx="28" ry="30" stroke="#eab308" strokeWidth="2" />
          <circle cx="37" cy="58" fill="#fca5a5" opacity="0.6" r="4.5" />
          <circle cx="63" cy="58" fill="#fca5a5" opacity="0.6" r="4.5" />
          <ellipse cx="41" cy="48" fill="#1c1917" rx="3.5" ry="4.5" />
          <circle cx="40" cy="46" fill="#ffffff" r="1.5" />
          <ellipse cx="59" cy="48" fill="#1c1917" rx="3.5" ry="4.5" />
          <circle cx="58" cy="46" fill="#ffffff" r="1.5" />
          <polygon points="50,50 44,57 56,57" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
          {/* Legs */}
          <path d="M42 84 V90 M38 90 H46" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
          <path d="M58 84 V90 M54 90 H62" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'petelur' as ChickenVariety,
      name: 'Ayam Petelur',
      desc: 'Penghasil telur',
      badge: 'Produksi Tinggi',
      harvest: '🥚 Harian',
      svg: (
        <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
          {/* Red comb */}
          <ellipse cx="50" cy="18" fill="#dc2626" rx="4.5" ry="8" />
          <ellipse cx="45" cy="20" fill="#b91c1c" rx="3.5" ry="6.5" />
          <ellipse cx="55" cy="20" fill="#b91c1c" rx="3.5" ry="6.5" />
          {/* Wings */}
          <ellipse cx="26" cy="58" fill="#e2e8f0" rx="8" ry="14" transform="rotate(20 26 58)" />
          <ellipse cx="74" cy="58" fill="#e2e8f0" rx="8" ry="14" transform="rotate(-20 74 58)" />
          {/* White Hen Body */}
          <ellipse cx="50" cy="56" fill="#ffffff" rx="28" ry="30" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="37" cy="58" fill="#fca5a5" opacity="0.6" r="4.5" />
          <circle cx="63" cy="58" fill="#fca5a5" opacity="0.6" r="4.5" />
          <ellipse cx="41" cy="48" fill="#1c1917" rx="3.5" ry="4.5" />
          <circle cx="40" cy="46" fill="#ffffff" r="1.5" />
          <ellipse cx="59" cy="48" fill="#1c1917" rx="3.5" ry="4.5" />
          <circle cx="58" cy="46" fill="#ffffff" r="1.5" />
          <polygon points="50,50 44,57 56,57" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
          {/* Legs */}
          <path d="M42 84 V90 M38 90 H46" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
          <path d="M58 84 V90 M54 90 H62" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'pedaging' as ChickenVariety,
      name: 'Ayam Pedaging',
      desc: 'Cepat besar',
      badge: 'Pilihan Peternak',
      harvest: '🍗 35 Hari',
      svg: (
        <svg className="w-20 h-16 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
          {/* Chubby Broiler Hen */}
          <ellipse cx="50" cy="20" fill="#f87171" rx="4" ry="7" />
          {/* Wide plump body */}
          <ellipse cx="50" cy="58" fill="#fef9c3" rx="34" ry="28" stroke="#facc15" strokeWidth="2.5" />
          <ellipse cx="22" cy="58" fill="#fde047" rx="10" ry="12" />
          <ellipse cx="78" cy="58" fill="#fde047" rx="10" ry="12" />
          <circle cx="36" cy="60" fill="#fca5a5" opacity="0.5" r="5" />
          <circle cx="64" cy="60" fill="#fca5a5" opacity="0.5" r="5" />
          <circle cx="42" cy="50" fill="#1c1917" r="3.5" />
          <circle cx="41" cy="49" fill="#ffffff" r="1.2" />
          <circle cx="58" cy="50" fill="#1c1917" r="3.5" />
          <circle cx="57" cy="49" fill="#ffffff" r="1.2" />
          <polygon points="50,52 45,58 55,58" fill="#ea580c" />
          <path d="M42 84 V90 M38 90 H46" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M58 84 V90 M54 90 H62" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const modalConfig = {
    tunas: {
      title: 'Pilih Jenis Tanaman',
      subtitle: 'Pilihanmu jadi tanaman utama di beranda',
      options: plantOptions,
      isGrid2x2: true,
    },
    koki: {
      title: 'Pilih Jenis Ikan',
      subtitle: 'Pilihanmu jadi ikan utama di kolam beranda',
      options: fishOptions,
      isGrid2x2: false,
    },
    kuning: {
      title: 'Pilih Jenis Ayam',
      subtitle: 'Pilihanmu jadi ayam utama di kandang beranda',
      options: chickenOptions,
      isGrid2x2: false,
    },
  }[petType];

  const handleCardClick = (opt: VarietyOption) => {
    setSelected(opt.id);
    // Immediately apply selection to default view so it changes seamlessly
    onSelectVariety(opt.id, opt.name, false);
  };

  const handleConfirm = () => {
    const selectedItem = modalConfig.options.find((opt) => opt.id === selected);
    if (selectedItem) {
      onSelectVariety(selected, selectedItem.name, true);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#fff8f5] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-[#ffeadb] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Handle Bar */}
        <div className="w-12 h-1.5 bg-[#fad3b3] rounded-full mx-auto mt-3 mb-1"></div>

        {/* Header */}
        <div className="px-5 pt-2 pb-3 flex items-start justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-[#2b1704] tracking-tight">{modalConfig.title}</h2>
            <p className="text-xs text-[#3e4941] mt-0.5">{modalConfig.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-[#ffdad6]/60 text-[#93000a] flex items-center justify-center hover:bg-[#ffdad6] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg font-bold">close</span>
          </button>
        </div>

        {/* Content list / grid matching mockups */}
        <div className="px-4 py-2 overflow-y-auto flex-1">
          {modalConfig.isGrid2x2 ? (
            /* 2x2 Grid for Plants (screen_2f0475d1) */
            <div className="grid grid-cols-2 gap-3">
              {modalConfig.options.map((opt) => {
                const isSelected = selected === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleCardClick(opt)}
                    className={`relative rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#e8f5e9] border-2 border-[#006a3e] shadow-[0_4px_12px_rgba(0,106,62,0.12)]'
                        : 'bg-white border border-[#ffeadb] hover:border-[#006a3e]/40 shadow-sm'
                    }`}
                  >
                    {/* Active Check Badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#006a3e] text-white flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                      </div>
                    )}
                    <div className="my-1">{opt.svg}</div>
                    <h3 className="font-extrabold text-sm text-[#2b1704] mt-1">{opt.name}</h3>
                    <p className="text-[11px] text-[#3e4941] mt-0.5 leading-tight">{opt.desc}</p>
                    {opt.harvest && (
                      <span className="text-[9px] font-extrabold text-[#006a3e] bg-[#e8f5e9] border border-emerald-200 px-2 py-0.5 rounded-full mt-1.5 shadow-2xs">
                        {opt.harvest}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Top 2 columns + 1 full width card for Fish & Chickens (screen_bbc367bf & screen_55f863fc) */
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                {modalConfig.options.slice(0, 2).map((opt) => {
                  const isSelected = selected === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleCardClick(opt)}
                      className={`relative rounded-2xl p-3.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#e8f5e9] border-2 border-[#006a3e] shadow-[0_4px_12px_rgba(0,106,62,0.12)]'
                          : 'bg-white border border-[#ffeadb] hover:border-[#006a3e]/40 shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#006a3e] text-white flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                      )}
                      <div className="my-1">{opt.svg}</div>
                      <h3 className="font-extrabold text-sm text-[#2b1704] mt-1">{opt.name}</h3>
                      <p className="text-[11px] text-[#3e4941] mt-0.5 leading-tight">{opt.desc}</p>
                      {opt.harvest && (
                        <span className="text-[9px] font-extrabold text-[#006a3e] bg-[#e8f5e9] border border-emerald-200 px-2 py-0.5 rounded-full mt-1.5 shadow-2xs">
                          {opt.harvest}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 3rd Option Full Width Card */}
              {modalConfig.options[2] && (
                <div
                  onClick={() => handleCardClick(modalConfig.options[2])}
                  className={`relative rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                    selected === modalConfig.options[2].id
                      ? 'bg-[#e8f5e9] border-2 border-[#006a3e] shadow-[0_4px_12px_rgba(0,106,62,0.12)]'
                      : 'bg-white border border-[#ffeadb] hover:border-[#006a3e]/40 shadow-sm'
                  }`}
                >
                  {selected === modalConfig.options[2].id && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#006a3e] text-white flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </div>
                  )}
                  <div className="flex-shrink-0">{modalConfig.options[2].svg}</div>
                  <div className="flex-1 pr-6">
                    <h3 className="font-extrabold text-base text-[#2b1704]">{modalConfig.options[2].name}</h3>
                    <p className="text-xs text-[#3e4941] mt-0.5">{modalConfig.options[2].desc}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {modalConfig.options[2].badge && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e8f5e9] border border-[#a3e635]/40 text-[#006a3e] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-xs">eco</span>
                          <span>{modalConfig.options[2].badge}</span>
                        </div>
                      )}
                      {modalConfig.options[2].harvest && (
                        <span className="text-[9px] font-extrabold text-[#006a3e] bg-[#e8f5e9] border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs">
                          {modalConfig.options[2].harvest}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with "Pilih sebagai Default" button */}
        <div className="p-4 bg-white/80 border-t border-[#ffeadb]">
          <button
            onClick={handleConfirm}
            className="w-full h-12 rounded-2xl bg-[#006a3e] hover:bg-[#0e8551] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,106,62,0.3)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg font-bold">check_circle</span>
            <span>Pilih sebagai Default</span>
          </button>
        </div>
      </div>
    </div>
  );
};
