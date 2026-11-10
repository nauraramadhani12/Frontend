import React from 'react';
import { PetState, PlantVariety, FishVariety, ChickenVariety } from '../types/index.ts';

interface PetCharacterProps {
  pet: PetState;
  onPetClick: () => void;
  sparkleText: string | null;
}

export const PetCharacter: React.FC<PetCharacterProps> = ({ pet, onPetClick, sparkleText }) => {
  const isSad = pet.isHungryOrThirsty || pet.stat1 <= 25 || pet.stat2 <= 25 || pet.stat3 <= 30;

  // Resolve variety with fallback to default for each pet type
  const plantVariety: PlantVariety = (pet.variety as PlantVariety) || 'padi';
  const fishVariety: FishVariety = (pet.variety as FishVariety) || 'koi';
  const chickenVariety: ChickenVariety = (pet.variety as ChickenVariety) || 'kampung';

  return (
    <div
      id="pet-character-root"
      onClick={onPetClick}
      className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center cursor-pointer group select-none"
      style={{ bottom: '30px' }}
    >
      {/* Floating Sparkle / Heart Reaction */}
      {sparkleText && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 animate-bounce pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-white/95 text-emerald-800 font-extrabold text-xs shadow-lg border border-amber-200 flex items-center gap-1">
            <span>{sparkleText}</span>
          </div>
        </div>
      )}

      {/* Ambient Glow */}
      <div className="absolute w-52 h-52 rounded-full bg-emerald-200/40 blur-2xl -z-10 group-hover:scale-110 transition-transform"></div>

      {/* Pet SVG rendering based on type and selected variety */}
      <div className="w-48 h-48 relative flex items-center justify-center transition-transform duration-200 active:scale-95 group-hover:scale-105">
        {/* ===================== 1. TANAMAN (TUNAS) ===================== */}
        {pet.type === 'tunas' && (
          <>
            {/* VARIETY: BERRY */}
            {plantVariety === 'berry' && (
              isSad ? (
                /* Sad Berry Bush */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 V82" stroke="#4b6354" strokeLinecap="round" strokeWidth="8" />

                  {/* Drooping/Muted Bush Foliage */}
                  <circle cx="80" cy="66" r="38" fill="#526e5d" />
                  <circle cx="56" cy="64" r="22" fill="#678572" />
                  <circle cx="104" cy="64" r="22" fill="#678572" />
                  <circle cx="80" cy="48" r="22" fill="#7d9e89" />

                  {/* Dull Berries */}
                  <circle cx="48" cy="52" r="6.5" fill="#b91c1c" />
                  <circle cx="112" cy="52" r="6.5" fill="#b91c1c" />
                  <circle cx="80" cy="34" r="7" fill="#b91c1c" />
                  <circle cx="42" cy="76" r="5.5" fill="#991b1b" />
                  <circle cx="118" cy="76" r="5.5" fill="#991b1b" />

                  {/* Sad Face */}
                  <circle cx="68" cy="68" fill="#1c281e" r="5" />
                  <circle cx="67" cy="67" fill="#ffffff" r="1.5" />
                  <circle cx="92" cy="68" fill="#1c281e" r="5" />
                  <circle cx="91" cy="67" fill="#ffffff" r="1.5" />
                  {/* Tear */}
                  <path d="M96 72 C99 75 101 79 98 82 C96 84 94 82 94 79 Z" fill="#38bdf8" />
                  <ellipse cx="60" cy="76" fill="#e08a98" opacity="0.5" rx="4.5" ry="2.5" />
                  <ellipse cx="100" cy="76" fill="#e08a98" opacity="0.5" rx="4.5" ry="2.5" />
                  <path d="M74 78 Q80 72 86 78" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              ) : (
                /* Happy Cheerful Berry Bush */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 V80" stroke="#15803d" strokeLinecap="round" strokeWidth="9" />

                  {/* Lush Round Bush Foliage */}
                  <circle cx="80" cy="62" r="42" fill="#15803d" />
                  <circle cx="54" cy="58" r="23" fill="#16a34a" />
                  <circle cx="106" cy="58" r="23" fill="#16a34a" />
                  <circle cx="80" cy="42" r="25" fill="#22c55e" />
                  <circle cx="80" cy="64" r="33" fill="#22c55e" />
                  <circle cx="80" cy="65" r="29" fill="#4ade80" />
                  <ellipse cx="70" cy="38" rx="10" ry="6" transform="rotate(-15 70 38)" fill="#86efac" opacity="0.6" />
                  <ellipse cx="90" cy="38" rx="10" ry="6" transform="rotate(15 90 38)" fill="#86efac" opacity="0.6" />

                  {/* Glossy Red Berries */}
                  <circle cx="48" cy="46" r="7.5" fill="#ef4444" />
                  <circle cx="47" cy="45" r="6" fill="#dc2626" />
                  <circle cx="45.5" cy="43.5" r="2" fill="#ffffff" />

                  <circle cx="112" cy="46" r="7.5" fill="#ef4444" />
                  <circle cx="111" cy="45" r="6" fill="#dc2626" />
                  <circle cx="109.5" cy="43.5" r="2" fill="#ffffff" />

                  <circle cx="80" cy="27" r="8" fill="#ef4444" />
                  <circle cx="79" cy="26" r="6.5" fill="#dc2626" />
                  <circle cx="77.5" cy="24.5" r="2.2" fill="#ffffff" />
                  <polygon points="80,20 78,23 82,23" fill="#16a34a" />

                  <circle cx="40" cy="72" r="6.5" fill="#f87171" />
                  <circle cx="39" cy="71" r="5" fill="#ef4444" />
                  <circle cx="38" cy="69.5" r="1.6" fill="#ffffff" />

                  <circle cx="120" cy="72" r="6.5" fill="#f87171" />
                  <circle cx="119" cy="71" r="5" fill="#ef4444" />
                  <circle cx="118" cy="69.5" r="1.6" fill="#ffffff" />

                  {/* Cute Kawaii Face */}
                  <circle cx="68" cy="65" fill="#1c281e" r="5.5" />
                  <circle cx="66.5" cy="63" fill="#ffffff" r="2" />
                  <circle cx="69.5" cy="66.5" fill="#ffffff" r="1" />
                  <circle cx="92" cy="65" fill="#1c281e" r="5.5" />
                  <circle cx="90.5" cy="63" fill="#ffffff" r="2" />
                  <circle cx="93.5" cy="66.5" fill="#ffffff" r="1" />

                  <ellipse cx="60" cy="73" fill="#ff7a93" opacity="0.8" rx="5" ry="3" />
                  <ellipse cx="100" cy="73" fill="#ff7a93" opacity="0.8" rx="5" ry="3" />

                  <path d="M74 72 Q80 79 86 72" fill="#ff5252" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M68 56 Q73 54 77 56" stroke="#15803d" strokeLinecap="round" strokeWidth="2" />
                  <path d="M83 56 Q87 54 92 56" stroke="#15803d" strokeLinecap="round" strokeWidth="2" />
                </svg>
              )
            )}

            {/* VARIETY: PISANG */}
            {plantVariety === 'pisang' && (
              isSad ? (
                /* Sad Banana Plant */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 V70" stroke="#4b6354" strokeWidth="12" strokeLinecap="round" />

                  {/* Drooping banana leaves */}
                  <ellipse cx="38" cy="75" rx="34" ry="14" transform="rotate(-45 38 75)" fill="#678572" />
                  <ellipse cx="122" cy="75" rx="34" ry="14" transform="rotate(45 122 75)" fill="#526e5d" />
                  <ellipse cx="80" cy="52" rx="14" ry="24" fill="#7d9e89" />

                  <circle cx="80" cy="74" r="22" fill="#9bbd8f" />
                  <circle cx="73" cy="74" fill="#1c281e" r="4.5" />
                  <circle cx="72" cy="73" fill="#ffffff" r="1.5" />
                  <circle cx="87" cy="74" fill="#1c281e" r="4.5" />
                  <circle cx="86" cy="73" fill="#ffffff" r="1.5" />
                  <path d="M91 78 C94 81 96 84 93 87 C91 89 89 87 89 84 Z" fill="#38bdf8" />
                  <path d="M75 84 Q80 78 85 84" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              ) : (
                /* Happy Banana Plant */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 V64" stroke="#15803d" strokeWidth="12" strokeLinecap="round" />

                  {/* Wide banana leaves */}
                  <ellipse cx="36" cy="56" rx="36" ry="16" transform="rotate(-26 36 56)" fill="#16a34a" />
                  <path d="M22 62 Q36 56 50 50" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="124" cy="56" rx="36" ry="16" transform="rotate(26 124 56)" fill="#15803d" />
                  <path d="M110 50 Q124 56 138 62" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="80" cy="36" rx="16" ry="30" fill="#22c55e" />
                  <path d="M80 20 V50" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />

                  {/* Miniature Banana Bunch Accent */}
                  <path d="M100 80 Q108 86 104 94 Q100 88 100 80 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
                  <path d="M106 82 Q114 88 110 96 Q106 90 106 82 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />

                  {/* Cute Face on banana plant */}
                  <circle cx="80" cy="72" r="23" fill="#86efac" />
                  <circle cx="80" cy="73" r="20" fill="#bbf7d0" />
                  <circle cx="73" cy="72" fill="#1c281e" r="5" />
                  <circle cx="71.5" cy="70.5" fill="#ffffff" r="2" />
                  <circle cx="87" cy="72" fill="#1c281e" r="5" />
                  <circle cx="85.5" cy="70.5" fill="#ffffff" r="2" />
                  <ellipse cx="66" cy="78" fill="#ff7a93" opacity="0.8" rx="4.5" ry="2.5" />
                  <ellipse cx="94" cy="78" fill="#ff7a93" opacity="0.8" rx="4.5" ry="2.5" />
                  <path d="M75 78 Q80 84 85 78" fill="#ff5252" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              )
            )}

            {/* VARIETY: SORGUM */}
            {plantVariety === 'sorgum' && (
              isSad ? (
                /* Sad Sorghum Plant */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 V56" stroke="#4b6354" strokeWidth="8" strokeLinecap="round" />

                  {/* Seed Cluster */}
                  <ellipse cx="80" cy="38" rx="14" ry="20" fill="#c2410c" />
                  <ellipse cx="80" cy="38" rx="11" ry="16" fill="#ea580c" />

                  {/* Slender Drooping Leaves */}
                  <path d="M80 84 Q44 80 34 100 Q56 96 80 84 Z" fill="#678572" />
                  <path d="M80 74 Q116 70 126 90 Q104 86 80 74 Z" fill="#526e5d" />

                  {/* Face */}
                  <circle cx="80" cy="74" r="21" fill="#9bbd8f" />
                  <circle cx="73" cy="74" fill="#1c281e" r="4.5" />
                  <circle cx="72" cy="73" fill="#ffffff" r="1.5" />
                  <circle cx="87" cy="74" fill="#1c281e" r="4.5" />
                  <circle cx="86" cy="73" fill="#ffffff" r="1.5" />
                  <path d="M91 78 C94 81 96 84 93 87 C91 89 89 87 89 84 Z" fill="#38bdf8" />
                  <path d="M75 84 Q80 78 85 84" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              ) : (
                /* Happy Sorghum Plant */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 V50" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />

                  {/* Seed head cluster (Sorghum grain head) */}
                  <ellipse cx="80" cy="32" rx="16" ry="24" fill="#ea580c" />
                  <ellipse cx="80" cy="32" rx="13" ry="20" fill="#f97316" />
                  <circle cx="74" cy="24" fill="#fed7aa" r="2.5" />
                  <circle cx="86" cy="26" fill="#fed7aa" r="2.5" />
                  <circle cx="80" cy="32" fill="#facc15" r="2.5" />
                  <circle cx="74" cy="38" fill="#fed7aa" r="2.5" />
                  <circle cx="86" cy="40" fill="#fed7aa" r="2.5" />

                  {/* Arching Slender Leaves */}
                  <path d="M80 84 Q44 72 30 88 Q54 90 80 84 Z" fill="#22c55e" />
                  <path d="M80 74 Q116 62 130 78 Q106 80 80 74 Z" fill="#16a34a" />

                  {/* Face */}
                  <circle cx="80" cy="72" r="22" fill="#86efac" />
                  <circle cx="80" cy="73" r="19" fill="#bbf7d0" />
                  <circle cx="73" cy="72" fill="#1c281e" r="5" />
                  <circle cx="71.5" cy="70.5" fill="#ffffff" r="2" />
                  <circle cx="87" cy="72" fill="#1c281e" r="5" />
                  <circle cx="85.5" cy="70.5" fill="#ffffff" r="2" />
                  <ellipse cx="66" cy="78" fill="#ff7a93" opacity="0.8" rx="4.5" ry="2.5" />
                  <ellipse cx="94" cy="78" fill="#ff7a93" opacity="0.8" rx="4.5" ry="2.5" />
                  <path d="M75 78 Q80 84 85 78" fill="#ff5252" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              )
            )}

            {/* VARIETY: PADI (DEFAULT TUNAS) */}
            {plantVariety === 'padi' && (
              isSad ? (
                /* Sad Sprout - Original Padi */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 C80 98 84 90 82 82" stroke="#709368" strokeLinecap="round" strokeWidth="9" />
                  <path d="M80 92 C68 95 55 106 48 118 C46 122 52 124 60 118 C67 113 74 104 78 96 Z" fill="#8fae85" />
                  <path d="M82 92 C94 95 107 106 114 118 C116 122 110 124 102 118 C95 113 88 104 84 96 Z" fill="#7e9f74" />
                  <circle cx="80" cy="70" fill="#9bbd8f" r="34" />
                  <circle cx="80" cy="72" fill="#add0a2" r="31" />
                  <path d="M78 40 C70 30 54 36 50 48 C46 54 55 60 72 46" fill="#8fae85" />
                  <path d="M82 40 C90 30 106 36 110 48 C114 54 105 60 88 46" fill="#7e9f74" />
                  <circle cx="67" cy="70" fill="#1c281e" r="5" />
                  <circle cx="66" cy="69" fill="#ffffff" r="1.5" />
                  <circle cx="93" cy="70" fill="#1c281e" r="5" />
                  <circle cx="92" cy="69" fill="#ffffff" r="1.5" />
                  <path d="M98 73 C101 76 103 80 100 83 C98 85 96 83 96 80 C96 77 98 74 98 73 Z" fill="#42a5f5" />
                  <ellipse cx="59" cy="78" fill="#e08a98" opacity="0.55" rx="4.5" ry="2.5" />
                  <ellipse cx="101" cy="78" fill="#e08a98" opacity="0.55" rx="4.5" ry="2.5" />
                  <path d="M74 81 Q80 75 86 81" fill="none" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M67 62 Q72 65 77 62" stroke="#4e6b46" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M83 62 Q88 65 93 62" stroke="#4e6b46" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              ) : (
                /* Happy Sprout - Original Padi */
                <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7" />
                  <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a" />
                  <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838" />
                  <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2" />
                  <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5" />
                  <path d="M80 110 C80 95 80 85 80 80" stroke="#34a853" strokeLinecap="round" strokeWidth="9" />
                  <path d="M80 85 C65 78 50 82 46 95 C46 102 54 105 64 102 C72 100 78 92 80 85 Z" fill="#58cc02" />
                  <path d="M80 85 C95 78 110 82 114 95 C114 102 106 105 96 102 C88 100 82 92 80 85 Z" fill="#46b500" />
                  <circle cx="80" cy="66" fill="#6fcf37" r="34" />
                  <circle cx="80" cy="68" fill="#85e24c" r="31" />
                  <path d="M78 35 C74 20 62 15 54 22 C48 28 54 42 75 37" fill="#58cc02" />
                  <path d="M82 35 C86 18 102 14 110 20 C116 26 110 40 85 37" fill="#46b500" />
                  <circle cx="67" cy="66" fill="#1c281e" r="5.5" />
                  <circle cx="65.5" cy="64" fill="#ffffff" r="2" />
                  <circle cx="93" cy="66" fill="#1c281e" r="5.5" />
                  <circle cx="91.5" cy="64" fill="#ffffff" r="2" />
                  <ellipse cx="60" cy="74" fill="#ff7a93" opacity="0.75" rx="4.5" ry="2.5" />
                  <ellipse cx="100" cy="74" fill="#ff7a93" opacity="0.75" rx="4.5" ry="2.5" />
                  <path d="M75 74 Q80 80 85 74" fill="#ff5252" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M68 57 Q73 55 77 57" stroke="#347a16" strokeLinecap="round" strokeWidth="2" />
                  <path d="M83 57 Q87 55 92 57" stroke="#347a16" strokeLinecap="round" strokeWidth="2" />
                </svg>
              )
            )}
          </>
        )}

        {/* ===================== 2. IKAN (KOKI) ===================== */}
        {pet.type === 'koki' && (
          <>
            {/* VARIETY: LELE */}
            {fishVariety === 'lele' && (
              isSad ? (
                /* Sad Catfish (Lele) */
                <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="152" cy="108" fill="#44403c" opacity="0.85" rx="33" ry="16" transform="rotate(18 152 108)" />
                  <path d="M154 100 C176 86 190 98 184 116 C178 126 162 124 146 114 Z" fill="#57534e" />
                  <ellipse cx="100" cy="107" fill="#292524" rx="54" ry="40" />
                  <ellipse cx="100" cy="107" fill="#44403c" rx="51" ry="38" />
                  <path d="M82 72 Q98 62 116 70 Q102 74 82 72 Z" fill="#292524" />
                  <ellipse cx="102" cy="116" fill="#a8a29e" opacity="0.6" rx="40" ry="24" />

                  {/* Drooping Whiskers */}
                  <path d="M62 102 Q40 114 26 130" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M64 112 Q44 128 32 138" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />

                  <circle cx="74" cy="98" fill="#ffffff" r="11" />
                  <circle cx="73" cy="100" fill="#1c1917" r="7" />
                  <circle cx="71" cy="98" fill="#ffffff" r="2.2" />
                  <path d="M63 103 C60 106 60 110 63 112 C66 110 66 106 63 103 Z" fill="#38bdf8" />
                  <circle cx="60" cy="114" fill="#fb7185" opacity="0.45" r="5" />
                  <path d="M57 108 Q62 103 67 107" fill="none" stroke="#1c1917" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              ) : (
                /* Happy Catfish (Lele) */
                <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="152" cy="104" fill="#44403c" opacity="0.9" rx="34" ry="18" transform="rotate(12 152 104)" />
                  <path d="M154 94 C176 76 190 86 186 106 C180 120 164 118 148 106 Z" fill="#57534e" />
                  <ellipse cx="100" cy="105" fill="#292524" rx="54" ry="40" />
                  <ellipse cx="100" cy="105" fill="#44403c" rx="51" ry="38" />
                  <path d="M82 68 Q98 56 118 66 Q102 72 82 68 Z" fill="#292524" />
                  <ellipse cx="102" cy="115" fill="#a8a29e" opacity="0.7" rx="42" ry="25" />

                  {/* Flowing Catfish Whiskers (Sungut Lele) */}
                  <path d="M62 96 Q38 84 20 98" stroke="#1c1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M64 106 Q42 116 26 112" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M74 98 Q84 88 94 92" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />

                  <circle cx="74" cy="95" fill="#ffffff" r="12" />
                  <circle cx="72" cy="95" fill="#0f172a" r="8" />
                  <circle cx="70" cy="92" fill="#ffffff" r="3.5" />
                  <circle cx="75" cy="98" fill="#ffffff" r="1.5" />
                  <circle cx="62" cy="107" fill="#fb7185" opacity="0.6" r="6" />
                  <path d="M58 103 Q63 107 68 104" fill="none" stroke="#1c1917" strokeLinecap="round" strokeWidth="2.5" />

                  {/* Playful Bubbles */}
                  <circle cx="44" cy="74" r="5" fill="#38bdf8" opacity="0.7" />
                  <circle cx="34" cy="62" r="3" fill="#38bdf8" opacity="0.5" />
                </svg>
              )
            )}

            {/* VARIETY: NILA */}
            {fishVariety === 'nila' && (
              isSad ? (
                /* Sad Tilapia (Nila) */
                <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="152" cy="108" fill="#0f766e" opacity="0.85" rx="33" ry="18" transform="rotate(18 152 108)" />
                  <path d="M154 100 C176 84 190 98 184 116 C178 128 162 126 146 114 Z" fill="#14b8a6" />
                  <ellipse cx="100" cy="107" fill="#0d9488" rx="54" ry="42" />
                  <ellipse cx="100" cy="107" fill="#0f766e" rx="52" ry="40" />
                  <path d="M82 72 Q98 60 116 70 Q102 74 82 72 Z" fill="#0d9488" />
                  <ellipse cx="102" cy="116" fill="#ccfbf1" opacity="0.6" rx="42" ry="27" />

                  {/* Vertical stripes */}
                  <path d="M90 80 V124" stroke="#042f2e" strokeWidth="4" strokeLinecap="round" />
                  <path d="M106 78 V126" stroke="#042f2e" strokeWidth="4" strokeLinecap="round" />
                  <path d="M122 82 V122" stroke="#042f2e" strokeWidth="4" strokeLinecap="round" />

                  <circle cx="74" cy="98" fill="#ffffff" r="11" />
                  <circle cx="73" cy="100" fill="#042f2e" r="7.5" />
                  <circle cx="71" cy="98" fill="#ffffff" r="2.5" />
                  <path d="M63 103 C60 106 60 110 63 112 C66 110 66 106 63 103 Z" fill="#38bdf8" />
                  <circle cx="60" cy="114" fill="#fda4af" opacity="0.45" r="5" />
                  <path d="M57 108 Q62 103 67 107" fill="none" stroke="#042f2e" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              ) : (
                /* Happy Tilapia (Nila) */
                <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="152" cy="102" fill="#0d9488" opacity="0.9" rx="34" ry="20" transform="rotate(12 152 102)" />
                  <path d="M154 94 C176 74 192 84 186 106 C180 122 164 120 148 106 Z" fill="#14b8a6" />
                  <ellipse cx="100" cy="105" fill="#0d9488" rx="54" ry="42" />
                  <ellipse cx="100" cy="105" fill="#14b8a6" rx="52" ry="40" />
                  {/* Spiny Dorsal Fin */}
                  <path d="M78 64 Q100 48 124 60 Q106 66 78 64 Z" fill="#0f766e" />
                  <ellipse cx="102" cy="114" fill="#ccfbf1" opacity="0.8" rx="42" ry="28" />

                  {/* Tilapia Vertical Tiger Stripes */}
                  <path d="M88 74 V128" stroke="#0f766e" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M104 70 V132" stroke="#0f766e" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M120 74 V128" stroke="#0f766e" strokeWidth="4.5" strokeLinecap="round" />

                  <circle cx="74" cy="96" fill="#ffffff" r="12" />
                  <circle cx="72" cy="96" fill="#0f766e" r="8" />
                  <circle cx="70" cy="93" fill="#ffffff" r="3.5" />
                  <circle cx="75" cy="99" fill="#ffffff" r="1.5" />
                  <circle cx="62" cy="108" fill="#fda4af" opacity="0.7" r="6" />
                  <path d="M58 103 Q63 107 68 104" fill="none" stroke="#0f766e" strokeLinecap="round" strokeWidth="2.5" />

                  {/* Bubbles */}
                  <circle cx="44" cy="74" r="5" fill="#38bdf8" opacity="0.7" />
                  <circle cx="34" cy="62" r="3" fill="#38bdf8" opacity="0.5" />
                </svg>
              )
            )}

            {/* VARIETY: KOI (DEFAULT KOKI) */}
            {fishVariety === 'koi' && (
              isSad ? (
                /* Sad Droopy Koi */
                <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="152" cy="108" fill="#fb923c" opacity="0.85" rx="33" ry="18" transform="rotate(18 152 108)" />
                  <path d="M154 100 C176 84 190 98 184 116 C178 128 162 126 146 114 Z" fill="#fdba74" />
                  <ellipse cx="100" cy="107" fill="#ea6c1c" rx="54" ry="42" />
                  <ellipse cx="100" cy="107" fill="#fb923c" rx="52" ry="40" />
                  <path d="M82 72 Q98 60 116 70 Q102 74 82 72 Z" fill="#ea6c1c" />
                  <ellipse cx="102" cy="116" fill="#f8fafc" rx="42" ry="27" />
                  <ellipse cx="74" cy="98" fill="#ffffff" rx="12" ry="11" />
                  <circle cx="73" cy="100" fill="#1e293b" r="7.5" />
                  <circle cx="71" cy="98" fill="#ffffff" r="2.5" />
                  <circle cx="75" cy="102" fill="#ffffff" r="1.2" />
                  <path d="M62 92 Q74 97 86 93" fill="none" stroke="#c2410c" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M63 103 C60 106 60 110 63 112 C66 110 66 106 63 103 Z" fill="#38bdf8" opacity="0.95" />
                  <circle cx="63.8" cy="108" fill="#ffffff" opacity="0.8" r="1" />
                  <circle cx="60" cy="114" fill="#fb7185" opacity="0.45" r="5" />
                  <path d="M57 108 Q62 103 67 107" fill="none" stroke="#b43403" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M94 118 Q106 130 98 138 Q88 130 94 118 Z" fill="#fed7aa" />
                  <path d="M118 106 Q126 122 120 128 Q114 122 118 106 Z" fill="#fdba74" />
                </svg>
              ) : (
                /* Happy Cheerful Koi */
                <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="152" cy="102" fill="#f97316" opacity="0.9" rx="34" ry="20" transform="rotate(12 152 102)" />
                  <path d="M154 94 C176 74 192 84 186 106 C180 122 164 120 148 106 Z" fill="#fb923c" />
                  <ellipse cx="100" cy="105" fill="#ea580c" rx="54" ry="42" />
                  <ellipse cx="100" cy="105" fill="#f97316" rx="52" ry="40" />
                  <path d="M82 66 Q98 52 118 64 Q102 70 82 66 Z" fill="#ea580c" />
                  <ellipse cx="102" cy="114" fill="#ffffff" rx="42" ry="28" />
                  <circle cx="74" cy="96" fill="#ffffff" r="12" />
                  <circle cx="72" cy="96" fill="#0f172a" r="8" />
                  <circle cx="70" cy="93" fill="#ffffff" r="3.5" />
                  <circle cx="75" cy="99" fill="#ffffff" r="1.5" />
                  <circle cx="62" cy="108" fill="#fb7185" opacity="0.7" r="6" />
                  <path d="M58 103 Q63 107 68 104" fill="none" stroke="#c2410c" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M94 112 Q108 126 100 136 Q88 128 94 112 Z" fill="#fed7aa" />
                  <path d="M120 102 Q130 116 124 124 Q116 118 120 102 Z" fill="#fb923c" />
                </svg>
              )
            )}
          </>
        )}

        {/* ===================== 3. AYAM (KUNING) ===================== */}
        {pet.type === 'kuning' && (
          <>
            {/* VARIETY: PETELUR (WHITE HEN) */}
            {chickenVariety === 'petelur' && (
              isSad ? (
                /* Sad White Hen (Petelur) */
                <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="100" cy="37" fill="#dc2626" rx="7" ry="10" />
                  <ellipse cx="93" cy="40" fill="#b91c1c" rx="6" ry="8" />
                  <ellipse cx="107" cy="40" fill="#b91c1c" rx="6" ry="8" />
                  <ellipse cx="53" cy="124" fill="#e2e8f0" rx="15" ry="26" transform="rotate(35 53 124)" />
                  <ellipse cx="147" cy="124" fill="#e2e8f0" rx="15" ry="26" transform="rotate(-35 147 124)" />
                  <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />

                  <ellipse cx="100" cy="110" fill="#ffffff" rx="54" ry="58" stroke="#cbd5e1" strokeWidth="3.5" />
                  <ellipse cx="100" cy="122" fill="#f8fafc" rx="36" ry="34" />
                  <circle cx="75" cy="117" fill="#fca5a5" opacity="0.4" r="8" />
                  <circle cx="125" cy="117" fill="#fca5a5" opacity="0.4" r="8" />

                  <ellipse cx="82" cy="98" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="80" cy="95" fill="#ffffff" r="3.5" />
                  <ellipse cx="118" cy="98" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="116" cy="95" fill="#ffffff" r="3.5" />

                  {/* Tear */}
                  <path d="M73 111 C71 114 69 118 69 121 C69 124 71.5 126.5 74.5 126.5 C77.5 126.5 80 124 80 121 C80 118 76 114 74.5 111 Z" fill="#38bdf8" />
                  <path d="M88 114 Q100 106 112 114 Q100 118 88 114 Z" fill="#f97316" stroke="#ea580c" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              ) : (
                /* Happy White Hen (Petelur) */
                <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Red Comb */}
                  <ellipse cx="100" cy="34" fill="#dc2626" rx="8" ry="13" />
                  <ellipse cx="92" cy="38" fill="#b91c1c" rx="7" ry="10" />
                  <ellipse cx="108" cy="38" fill="#b91c1c" rx="7" ry="10" />
                  {/* Wattle */}
                  <ellipse cx="100" cy="118" fill="#dc2626" rx="4" ry="7" />

                  {/* White Hen Body & Wings */}
                  <ellipse cx="55" cy="115" rx="16" ry="26" transform="rotate(18 55 115)" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  <ellipse cx="145" cy="115" rx="16" ry="26" transform="rotate(-18 145 115)" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />

                  <ellipse cx="100" cy="110" fill="#ffffff" rx="54" ry="58" stroke="#cbd5e1" strokeWidth="3.5" />
                  <ellipse cx="100" cy="122" fill="#f8fafc" rx="38" ry="36" />

                  <circle cx="75" cy="115" fill="#fca5a5" opacity="0.6" r="9" />
                  <circle cx="125" cy="115" fill="#fca5a5" opacity="0.6" r="9" />
                  <ellipse cx="82" cy="96" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="80" cy="93" fill="#ffffff" r="3.5" />
                  <circle cx="84" cy="99" fill="#ffffff" r="1.5" />
                  <ellipse cx="118" cy="96" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="116" cy="93" fill="#ffffff" r="3.5" />
                  <circle cx="120" cy="99" fill="#ffffff" r="1.5" />

                  <polygon fill="#f97316" points="100,100 89,112 111,112" stroke="#ea580c" strokeLinejoin="round" strokeWidth="2" />

                  {/* Egg Accent nearby */}
                  <ellipse cx="152" cy="154" rx="11" ry="14" fill="#fef3c7" stroke="#fcd34d" strokeWidth="2" />
                  <ellipse cx="150" cy="150" rx="3" ry="5" fill="#ffffff" opacity="0.8" />
                </svg>
              )
            )}

            {/* VARIETY: PEDAGING (CHUBBY BROILER) */}
            {chickenVariety === 'pedaging' && (
              isSad ? (
                /* Sad Chubby Broiler Hen */
                <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="100" cy="46" fill="#f87171" rx="7" ry="10" />
                  <ellipse cx="46" cy="124" fill="#fde047" rx="14" ry="22" transform="rotate(35 46 124)" />
                  <ellipse cx="154" cy="124" fill="#fde047" rx="14" ry="22" transform="rotate(-35 154 124)" />
                  <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />

                  {/* Plump Broiler Body */}
                  <ellipse cx="100" cy="115" fill="#fef9c3" rx="62" ry="54" stroke="#facc15" strokeWidth="3.5" />
                  <circle cx="70" cy="120" fill="#fca5a5" opacity="0.4" r="9" />
                  <circle cx="130" cy="120" fill="#fca5a5" opacity="0.4" r="9" />

                  <ellipse cx="84" cy="102" fill="#1c1917" rx="7" ry="8" />
                  <circle cx="82" cy="99" fill="#ffffff" r="3" />
                  <ellipse cx="116" cy="102" fill="#1c1917" rx="7" ry="8" />
                  <circle cx="114" cy="99" fill="#ffffff" r="3" />

                  <path d="M75 113 C73 116 71 120 71 123 C71 126 73.5 128 76.5 128 C79.5 128 82 126 82 123 Z" fill="#38bdf8" />
                  <path d="M88 116 Q100 108 112 116 Q100 120 88 116 Z" fill="#f97316" stroke="#ea580c" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              ) : (
                /* Happy Chubby Broiler Hen */
                <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="100" cy="42" fill="#f87171" rx="8" ry="12" />
                  {/* Fluffy Round Wings */}
                  <ellipse cx="44" cy="116" rx="14" ry="22" transform="rotate(22 44 116)" fill="#fde047" stroke="#eab308" strokeWidth="2" />
                  <ellipse cx="156" cy="116" rx="14" ry="22" transform="rotate(-22 156 116)" fill="#fde047" stroke="#eab308" strokeWidth="2" />

                  <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />

                  {/* Extra Plump Body */}
                  <ellipse cx="100" cy="114" fill="#fef9c3" rx="64" ry="54" stroke="#facc15" strokeWidth="4" />
                  <ellipse cx="100" cy="126" fill="#fffbeb" rx="46" ry="34" />

                  <circle cx="68" cy="118" fill="#fca5a5" opacity="0.6" r="10" />
                  <circle cx="132" cy="118" fill="#fca5a5" opacity="0.6" r="10" />

                  <ellipse cx="84" cy="100" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="82" cy="97" fill="#ffffff" r="3.5" />
                  <circle cx="86" cy="103" fill="#ffffff" r="1.5" />
                  <ellipse cx="116" cy="100" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="114" cy="97" fill="#ffffff" r="3.5" />
                  <circle cx="118" cy="103" fill="#ffffff" r="1.5" />

                  <polygon fill="#ea580c" points="100,104 89,116 111,116" stroke="#c2410c" strokeLinejoin="round" strokeWidth="2" />

                  {/* Sparkle star */}
                  <path d="M136 68 L138 74 L144 76 L138 78 L136 84 L134 78 L128 76 L134 74 Z" fill="#facc15" />
                </svg>
              )
            )}

            {/* VARIETY: KAMPUNG (DEFAULT KUNING) */}
            {chickenVariety === 'kampung' && (
              isSad ? (
                /* Sad Droopy Chick - Match Image 11 & 12 */
                <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="100" cy="37" fill="#f87171" rx="8" ry="11" />
                  <ellipse cx="93" cy="40" fill="#ef4444" rx="6.5" ry="9" />
                  <ellipse cx="107" cy="40" fill="#ef4444" rx="6.5" ry="9" />
                  <ellipse cx="53" cy="124" fill="#fde047" rx="15" ry="26" transform="rotate(35 53 124)" />
                  <ellipse cx="55" cy="124" fill="#fef08a" rx="13" ry="22" transform="rotate(35 55 124)" />
                  <ellipse cx="147" cy="124" fill="#fde047" rx="15" ry="26" transform="rotate(-35 147 124)" />
                  <ellipse cx="145" cy="124" fill="#fef08a" rx="13" ry="22" transform="rotate(-35 145 124)" />
                  <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <ellipse cx="100" cy="110" fill="#fef9c3" rx="54" ry="58" stroke="#facc15" strokeWidth="3.5" />
                  <ellipse cx="100" cy="122" fill="#ffffff" opacity="0.7" rx="36" ry="34" />
                  <circle cx="75" cy="117" fill="#fca5a5" opacity="0.4" r="8" />
                  <circle cx="125" cy="117" fill="#fca5a5" opacity="0.4" r="8" />
                  <path d="M74 84 Q82 89 89 86" fill="none" stroke="#78350f" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M126 84 Q118 89 111 86" fill="none" stroke="#78350f" strokeLinecap="round" strokeWidth="2.5" />
                  <ellipse cx="82" cy="98" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="80" cy="95" fill="#ffffff" r="3.5" />
                  <circle cx="84" cy="102" fill="#93c5fd" r="2" />
                  <ellipse cx="118" cy="98" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="116" cy="95" fill="#ffffff" r="3.5" />
                  <circle cx="120" cy="102" fill="#93c5fd" r="2" />
                  <path d="M73 111 C71 114 69 118 69 121 C69 124 71.5 126.5 74.5 126.5 C77.5 126.5 80 124 80 121 C80 118 76 114 74.5 111 Z" fill="#38bdf8" opacity="0.95" />
                  <circle cx="73" cy="122" fill="#ffffff" opacity="0.8" r="1.5" />
                  <path d="M88 114 Q100 106 112 114 Q100 118 88 114 Z" fill="#f97316" stroke="#ea580c" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              ) : (
                /* Happy Cheerful Chick - Match Image 13 & 14 */
                <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="100" cy="35" fill="#ef4444" rx="8" ry="12" />
                  <ellipse cx="93" cy="38" fill="#dc2626" rx="7" ry="10" />
                  <ellipse cx="107" cy="38" fill="#dc2626" rx="7" ry="10" />
                  <ellipse cx="55" cy="115" fill="#f59e0b" rx="16" ry="26" transform="rotate(18 55 115)" />
                  <ellipse cx="58" cy="115" fill="#fcd34d" rx="14" ry="23" transform="rotate(18 58 115)" />
                  <ellipse cx="145" cy="115" fill="#f59e0b" rx="16" ry="26" transform="rotate(-18 145 115)" />
                  <ellipse cx="142" cy="115" fill="#fcd34d" rx="14" ry="23" transform="rotate(-18 142 115)" />
                  <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6" />
                  <ellipse cx="100" cy="110" fill="#fef08a" rx="54" ry="58" stroke="#eab308" strokeWidth="4" />
                  <ellipse cx="100" cy="122" fill="#fffbeb" rx="38" ry="36" />
                  <circle cx="75" cy="115" fill="#fca5a5" opacity="0.6" r="9" />
                  <circle cx="125" cy="115" fill="#fca5a5" opacity="0.6" r="9" />
                  <ellipse cx="82" cy="96" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="80" cy="93" fill="#ffffff" r="3.5" />
                  <circle cx="84" cy="99" fill="#ffffff" r="1.5" />
                  <ellipse cx="118" cy="96" fill="#1c1917" rx="7" ry="9" />
                  <circle cx="116" cy="93" fill="#ffffff" r="3.5" />
                  <circle cx="120" cy="99" fill="#ffffff" r="1.5" />
                  <polygon fill="#f97316" points="100,100 89,112 111,112" stroke="#ea580c" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M126 62 L128 68 L134 70 L128 72 L126 78 L124 72 L118 70 L124 68 Z" fill="#facc15" />
                </svg>
              )
            )}
          </>
        )}
      </div>

      {/* Shadow under character */}
      <div className="w-36 h-4 bg-[#2b1704]/15 rounded-full blur-sm mt-[-10px]"></div>
    </div>
  );
};