import React from 'react';
import { ActiveScreen } from '../types/index.ts';

interface BottomNavBarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: 'beranda' | 'chat_ai' | 'pengaturan') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentScreen, onNavigate }) => {
  // Determine which tab is active (rank_petani and edit_profile belong under pengaturan; chat_history belongs under chat_ai)
  const isBeranda = currentScreen === 'beranda';
  const isChat = currentScreen === 'chat_ai' || currentScreen === 'chat_history';
  const isPengaturan = currentScreen === 'pengaturan' || currentScreen === 'rank_petani' || currentScreen === 'edit_profile';

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(43,23,4,0.06)] border-t border-[#ffeadb]">
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        {/* Beranda */}
        <button
          onClick={() => onNavigate('beranda')}
          aria-label="Navigasi ke Beranda"
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-200 cursor-pointer ${
            isBeranda ? 'bg-[#e8f7ee] text-[#0E8551]' : 'text-[#6e7a70] hover:text-[#0E8551]'
          }`}
        >
          <svg className="w-5 h-5 fill-current mb-0.5" viewBox="0 0 24 24">
            <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6zm0 2.25L18 9.75V19h-2v-7H8v7H6V9.75L12 5.25z"></path>
          </svg>
          <span className={`text-[11px] leading-tight tracking-tight ${isBeranda ? 'font-extrabold' : 'font-semibold'}`}>
            Beranda
          </span>
        </button>

        {/* Chat AI */}
        <button
          onClick={() => onNavigate('chat_ai')}
          aria-label="Navigasi ke Chat AI"
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-200 cursor-pointer ${
            isChat ? 'bg-[#e8f7ee] text-[#0E8551]' : 'text-[#6e7a70] hover:text-[#0E8551]'
          }`}
        >
          <svg className="w-5 h-5 fill-current mb-0.5" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zm-9-5h2v2h-2zm0-6h2v4h-2z"></path>
          </svg>
          <span className={`text-[11px] leading-tight tracking-tight ${isChat ? 'font-extrabold' : 'font-semibold'}`}>
            Chat AI
          </span>
        </button>

        {/* Pengaturan */}
        <button
          onClick={() => onNavigate('pengaturan')}
          aria-label="Navigasi ke Pengaturan"
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-200 cursor-pointer ${
            isPengaturan ? 'bg-[#e8f7ee] text-[#0E8551]' : 'text-[#6e7a70] hover:text-[#0E8551]'
          }`}
        >
          <svg className="w-5 h-5 fill-current mb-0.5" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
          </svg>
          <span className={`text-[11px] leading-tight tracking-tight ${isPengaturan ? 'font-extrabold' : 'font-semibold'}`}>
            Pengaturan
          </span>
        </button>
      </div>
    </nav>
  );
};
