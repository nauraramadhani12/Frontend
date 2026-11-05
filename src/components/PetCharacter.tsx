import React from 'react';
import { PetState } from '../types/index.ts';

interface PetCharacterProps {
  pet: PetState;
  onPetClick: () => void;
  sparkleText: string | null;
}

export const PetCharacter: React.FC<PetCharacterProps> = ({ pet, onPetClick, sparkleText }) => {
  const isSad = pet.isHungryOrThirsty || pet.stat1 <= 25 || pet.stat2 <= 25 || pet.stat3 <= 30;

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

      {/* Pet SVG rendering based on type */}
      <div className="w-48 h-48 relative flex items-center justify-center transition-transform duration-200 active:scale-95 group-hover:scale-105">
        {pet.type === 'tunas' && (
          isSad ? (
            /* Sad Sprout - Match Image 1 & 2 */
            <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7"></ellipse>
              <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a"></path>
              <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838"></path>
              <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2"></path>
              <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5"></ellipse>
              <path d="M80 110 C80 98 84 90 82 82" stroke="#709368" strokeLinecap="round" strokeWidth="9"></path>
              <path d="M80 92 C68 95 55 106 48 118 C46 122 52 124 60 118 C67 113 74 104 78 96 Z" fill="#8fae85"></path>
              <path d="M82 92 C94 95 107 106 114 118 C116 122 110 124 102 118 C95 113 88 104 84 96 Z" fill="#7e9f74"></path>
              <circle cx="80" cy="70" fill="#9bbd8f" r="34"></circle>
              <circle cx="80" cy="72" fill="#add0a2" r="31"></circle>
              <path d="M78 40 C70 30 54 36 50 48 C46 54 55 60 72 46" fill="#8fae85"></path>
              <path d="M82 40 C90 30 106 36 110 48 C114 54 105 60 88 46" fill="#7e9f74"></path>
              <circle cx="67" cy="70" fill="#1c281e" r="5"></circle>
              <circle cx="66" cy="69" fill="#ffffff" r="1.5"></circle>
              <circle cx="93" cy="70" fill="#1c281e" r="5"></circle>
              <circle cx="92" cy="69" fill="#ffffff" r="1.5"></circle>
              {/* Tear drop on right cheek */}
              <path d="M98 73 C101 76 103 80 100 83 C98 85 96 83 96 80 C96 77 98 74 98 73 Z" fill="#42a5f5"></path>
              <ellipse cx="59" cy="78" fill="#e08a98" opacity="0.55" rx="4.5" ry="2.5"></ellipse>
              <ellipse cx="101" cy="78" fill="#e08a98" opacity="0.55" rx="4.5" ry="2.5"></ellipse>
              {/* Sad downturned mouth */}
              <path d="M74 81 Q80 75 86 81" fill="none" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M67 62 Q72 65 77 62" stroke="#4e6b46" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M83 62 Q88 65 93 62" stroke="#4e6b46" strokeLinecap="round" strokeWidth="2.5"></path>
            </svg>
          ) : (
            /* Happy Sprout - Match Image 3 & 4 */
            <svg className="w-44 h-44 drop-shadow-[0_12px_16px_rgba(43,23,4,0.2)]" fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="80" cy="148" fill="#2b1704" opacity="0.2" rx="40" ry="7"></ellipse>
              <path d="M50 115 L56 142 C56.5 145 59 147 62 147 L98 147 C101 147 103.5 145 104 142 L110 115 Z" fill="#cf7a4a"></path>
              <path d="M46 112 C46 110 48 108 50 108 L110 108 C112 108 114 110 114 112 L114 116 C114 118 112 120 110 120 L50 120 C48 120 46 118 46 116 Z" fill="#bf6838"></path>
              <path d="M54 116 L106 116" stroke="#a35324" strokeLinecap="round" strokeWidth="2"></path>
              <ellipse cx="80" cy="110" fill="#5c3717" rx="27" ry="5"></ellipse>
              <path d="M80 110 C80 95 80 85 80 80" stroke="#34a853" strokeLinecap="round" strokeWidth="9"></path>
              <path d="M80 85 C65 78 50 82 46 95 C46 102 54 105 64 102 C72 100 78 92 80 85 Z" fill="#58cc02"></path>
              <path d="M80 85 C95 78 110 82 114 95 C114 102 106 105 96 102 C88 100 82 92 80 85 Z" fill="#46b500"></path>
              <circle cx="80" cy="66" fill="#6fcf37" r="34"></circle>
              <circle cx="80" cy="68" fill="#85e24c" r="31"></circle>
              <path d="M78 35 C74 20 62 15 54 22 C48 28 54 42 75 37" fill="#58cc02"></path>
              <path d="M82 35 C86 18 102 14 110 20 C116 26 110 40 85 37" fill="#46b500"></path>
              <circle cx="67" cy="66" fill="#1c281e" r="5.5"></circle>
              <circle cx="65.5" cy="64" fill="#ffffff" r="2"></circle>
              <circle cx="93" cy="66" fill="#1c281e" r="5.5"></circle>
              <circle cx="91.5" cy="64" fill="#ffffff" r="2"></circle>
              <ellipse cx="60" cy="74" fill="#ff7a93" opacity="0.75" rx="4.5" ry="2.5"></ellipse>
              <ellipse cx="100" cy="74" fill="#ff7a93" opacity="0.75" rx="4.5" ry="2.5"></ellipse>
              {/* Happy smile */}
              <path d="M75 74 Q80 80 85 74" fill="#ff5252" stroke="#1c281e" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M68 57 Q73 55 77 57" stroke="#347a16" strokeLinecap="round" strokeWidth="2"></path>
              <path d="M83 57 Q87 55 92 57" stroke="#347a16" strokeLinecap="round" strokeWidth="2"></path>
            </svg>
          )
        )}

        {pet.type === 'koki' && (
          isSad ? (
            /* Sad Droopy Koi - Match Image 9 & 10 */
            <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="152" cy="108" fill="#fb923c" opacity="0.85" rx="33" ry="18" transform="rotate(18 152 108)"></ellipse>
              <path d="M154 100 C176 84 190 98 184 116 C178 128 162 126 146 114 Z" fill="#fdba74"></path>
              <ellipse cx="100" cy="107" fill="#ea6c1c" rx="54" ry="42"></ellipse>
              <ellipse cx="100" cy="107" fill="#fb923c" rx="52" ry="40"></ellipse>
              <path d="M82 72 Q98 60 116 70 Q102 74 82 72 Z" fill="#ea6c1c"></path>
              <ellipse cx="102" cy="116" fill="#f8fafc" rx="42" ry="27"></ellipse>
              <ellipse cx="74" cy="98" fill="#ffffff" rx="12" ry="11"></ellipse>
              <circle cx="73" cy="100" fill="#1e293b" r="7.5"></circle>
              <circle cx="71" cy="98" fill="#ffffff" r="2.5"></circle>
              <circle cx="75" cy="102" fill="#ffffff" r="1.2"></circle>
              <path d="M62 92 Q74 97 86 93" fill="none" stroke="#c2410c" strokeLinecap="round" strokeWidth="2.5"></path>
              {/* Tear drop */}
              <path d="M63 103 C60 106 60 110 63 112 C66 110 66 106 63 103 Z" fill="#38bdf8" opacity="0.95"></path>
              <circle cx="63.8" cy="108" fill="#ffffff" opacity="0.8" r="1"></circle>
              <circle cx="60" cy="114" fill="#fb7185" opacity="0.45" r="5"></circle>
              {/* Downturned mouth */}
              <path d="M57 108 Q62 103 67 107" fill="none" stroke="#b43403" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M94 118 Q106 130 98 138 Q88 130 94 118 Z" fill="#fed7aa"></path>
              <path d="M118 106 Q126 122 120 128 Q114 122 118 106 Z" fill="#fdba74"></path>
            </svg>
          ) : (
            /* Happy Cheerful Koi - Match Image 7 & 8 */
            <svg className="w-full h-full drop-shadow-lg filter" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="152" cy="102" fill="#f97316" opacity="0.9" rx="34" ry="20" transform="rotate(12 152 102)"></ellipse>
              <path d="M154 94 C176 74 192 84 186 106 C180 122 164 120 148 106 Z" fill="#fb923c"></path>
              <ellipse cx="100" cy="105" fill="#ea580c" rx="54" ry="42"></ellipse>
              <ellipse cx="100" cy="105" fill="#f97316" rx="52" ry="40"></ellipse>
              <path d="M82 66 Q98 52 118 64 Q102 70 82 66 Z" fill="#ea580c"></path>
              <ellipse cx="102" cy="114" fill="#ffffff" rx="42" ry="28"></ellipse>
              <circle cx="74" cy="96" fill="#ffffff" r="12"></circle>
              <circle cx="72" cy="96" fill="#0f172a" r="8"></circle>
              <circle cx="70" cy="93" fill="#ffffff" r="3.5"></circle>
              <circle cx="75" cy="99" fill="#ffffff" r="1.5"></circle>
              <circle cx="62" cy="108" fill="#fb7185" opacity="0.7" r="6"></circle>
              <path d="M58 103 Q63 107 68 104" fill="none" stroke="#c2410c" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M94 112 Q108 126 100 136 Q88 128 94 112 Z" fill="#fed7aa"></path>
              <path d="M120 102 Q130 116 124 124 Q116 118 120 102 Z" fill="#fb923c"></path>
            </svg>
          )
        )}

        {pet.type === 'kuning' && (
          isSad ? (
            /* Sad Droopy Chick - Match Image 11 & 12 */
            <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="100" cy="37" fill="#f87171" rx="8" ry="11"></ellipse>
              <ellipse cx="93" cy="40" fill="#ef4444" rx="6.5" ry="9"></ellipse>
              <ellipse cx="107" cy="40" fill="#ef4444" rx="6.5" ry="9"></ellipse>
              <ellipse cx="53" cy="124" fill="#fde047" rx="15" ry="26" transform="rotate(35 53 124)"></ellipse>
              <ellipse cx="55" cy="124" fill="#fef08a" rx="13" ry="22" transform="rotate(35 55 124)"></ellipse>
              <ellipse cx="147" cy="124" fill="#fde047" rx="15" ry="26" transform="rotate(-35 147 124)"></ellipse>
              <ellipse cx="145" cy="124" fill="#fef08a" rx="13" ry="22" transform="rotate(-35 145 124)"></ellipse>
              <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6"></path>
              <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6"></path>
              <ellipse cx="100" cy="110" fill="#fef9c3" rx="54" ry="58" stroke="#facc15" strokeWidth="3.5"></ellipse>
              <ellipse cx="100" cy="122" fill="#ffffff" opacity="0.7" rx="36" ry="34"></ellipse>
              <circle cx="75" cy="117" fill="#fca5a5" opacity="0.4" r="8"></circle>
              <circle cx="125" cy="117" fill="#fca5a5" opacity="0.4" r="8"></circle>
              <path d="M74 84 Q82 89 89 86" fill="none" stroke="#78350f" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M126 84 Q118 89 111 86" fill="none" stroke="#78350f" strokeLinecap="round" strokeWidth="2.5"></path>
              <ellipse cx="82" cy="98" fill="#1c1917" rx="7" ry="9"></ellipse>
              <circle cx="80" cy="95" fill="#ffffff" r="3.5"></circle>
              <circle cx="84" cy="102" fill="#93c5fd" r="2"></circle>
              <ellipse cx="118" cy="98" fill="#1c1917" rx="7" ry="9"></ellipse>
              <circle cx="116" cy="95" fill="#ffffff" r="3.5"></circle>
              <circle cx="120" cy="102" fill="#93c5fd" r="2"></circle>
              {/* Tear drop on left cheek */}
              <path d="M73 111 C71 114 69 118 69 121 C69 124 71.5 126.5 74.5 126.5 C77.5 126.5 80 124 80 121 C80 118 76 114 74.5 111 Z" fill="#38bdf8" opacity="0.95"></path>
              <circle cx="73" cy="122" fill="#ffffff" opacity="0.8" r="1.5"></circle>
              {/* Sad Downturned Beak */}
              <path d="M88 114 Q100 106 112 114 Q100 118 88 114 Z" fill="#f97316" stroke="#ea580c" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          ) : (
            /* Happy Cheerful Chick - Match Image 13 & 14 */
            <svg className="w-full h-full drop-shadow-xl select-none pointer-events-none" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="100" cy="35" fill="#ef4444" rx="8" ry="12"></ellipse>
              <ellipse cx="93" cy="38" fill="#dc2626" rx="7" ry="10"></ellipse>
              <ellipse cx="107" cy="38" fill="#dc2626" rx="7" ry="10"></ellipse>
              <ellipse cx="55" cy="115" fill="#f59e0b" rx="16" ry="26" transform="rotate(18 55 115)"></ellipse>
              <ellipse cx="58" cy="115" fill="#fcd34d" rx="14" ry="23" transform="rotate(18 58 115)"></ellipse>
              <ellipse cx="145" cy="115" fill="#f59e0b" rx="16" ry="26" transform="rotate(-18 145 115)"></ellipse>
              <ellipse cx="142" cy="115" fill="#fcd34d" rx="14" ry="23" transform="rotate(-18 142 115)"></ellipse>
              <path d="M82 165 L82 176 M74 176 L90 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6"></path>
              <path d="M118 165 L118 176 M110 176 L126 176" stroke="#ea580c" strokeLinecap="round" strokeWidth="6"></path>
              <ellipse cx="100" cy="110" fill="#fef08a" rx="54" ry="58" stroke="#eab308" strokeWidth="4"></ellipse>
              <ellipse cx="100" cy="122" fill="#fffbeb" rx="38" ry="36"></ellipse>
              <circle cx="75" cy="115" fill="#fca5a5" opacity="0.6" r="9"></circle>
              <circle cx="125" cy="115" fill="#fca5a5" opacity="0.6" r="9"></circle>
              <ellipse cx="82" cy="96" fill="#1c1917" rx="7" ry="9"></ellipse>
              <circle cx="80" cy="93" fill="#ffffff" r="3.5"></circle>
              <circle cx="84" cy="99" fill="#ffffff" r="1.5"></circle>
              <ellipse cx="118" cy="96" fill="#1c1917" rx="7" ry="9"></ellipse>
              <circle cx="116" cy="93" fill="#ffffff" r="3.5"></circle>
              <circle cx="120" cy="99" fill="#ffffff" r="1.5"></circle>
              <polygon fill="#f97316" points="100,100 89,112 111,112" stroke="#ea580c" strokeLinejoin="round" strokeWidth="2"></polygon>
              {/* Sparkle star on head */}
              <path d="M126 62 L128 68 L134 70 L128 72 L126 78 L124 72 L118 70 L124 68 Z" fill="#facc15"></path>
            </svg>
          )
        )}
      </div>

      {/* Shadow under character */}
      <div className="w-36 h-4 bg-[#2b1704]/15 rounded-full blur-sm mt-[-10px]"></div>
    </div>
  );
};
