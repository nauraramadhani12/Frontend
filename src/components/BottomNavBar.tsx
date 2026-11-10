import React from 'react';
import { ActiveScreen } from '../types/index.ts';

interface BottomNavBarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: 'beranda' | 'chat_ai' | 'pengaturan') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentScreen, onNavigate }) => {
  const isBeranda = currentScreen === 'beranda';
  const isChat = currentScreen === 'chat_ai' || currentScreen === 'chat_history';
  const isPengaturan = currentScreen === 'pengaturan' || currentScreen === 'rank_petani' || currentScreen === 'edit_profile';

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(43,23,4,0.08)] border-t border-[#ffeadb]/80 pb-safe">
      <div className="flex justify-around items-center h-[68px] px-3 max-w-md mx-auto">
        {/* 1. Beranda */}
        <button
          onClick={() => onNavigate('beranda')}
          aria-label="Navigasi ke Beranda"
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer relative group ${
            isBeranda
              ? 'text-[#006a3e] font-extrabold scale-105'
              : 'text-[#6e7a70] hover:text-[#006a3e] font-bold'
          }`}
        >
          {isBeranda && (
            <div className="absolute inset-0 bg-[#e8f7ee] rounded-2xl border border-emerald-200/60 shadow-xs -z-10 animate-pop-in"></div>
          )}
          <span
            className="material-symbols-outlined text-[23px] transition-transform group-hover:scale-110"
            style={{ fontVariationSettings: isBeranda ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-[11px] leading-tight tracking-tight mt-0.5">
            Beranda
          </span>
          {isBeranda && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a3e] mt-0.5 animate-pulse"></span>
          )}
        </button>

        {/* 2. Chat AI */}
        <button
          onClick={() => onNavigate('chat_ai')}
          aria-label="Navigasi ke Chat AI"
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer relative group ${
            isChat
              ? 'text-[#006a3e] font-extrabold scale-105'
              : 'text-[#6e7a70] hover:text-[#006a3e] font-bold'
          }`}
        >
          {isChat && (
            <div className="absolute inset-0 bg-[#e8f7ee] rounded-2xl border border-emerald-200/60 shadow-xs -z-10 animate-pop-in"></div>
          )}
          <div className="relative">
            <span
              className="material-symbols-outlined text-[23px] transition-transform group-hover:scale-110"
              style={{ fontVariationSettings: isChat ? "'FILL' 1" : "'FILL' 0" }}
            >
              smart_toy
            </span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white"></span>
          </div>
          <span className="text-[11px] leading-tight tracking-tight mt-0.5">
            Chat AI
          </span>
          {isChat && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a3e] mt-0.5 animate-pulse"></span>
          )}
        </button>

        {/* 3. Pengaturan */}
        <button
          onClick={() => onNavigate('pengaturan')}
          aria-label="Navigasi ke Pengaturan"
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer relative group ${
            isPengaturan
              ? 'text-[#006a3e] font-extrabold scale-105'
              : 'text-[#6e7a70] hover:text-[#006a3e] font-bold'
          }`}
        >
          {isPengaturan && (
            <div className="absolute inset-0 bg-[#e8f7ee] rounded-2xl border border-emerald-200/60 shadow-xs -z-10 animate-pop-in"></div>
          )}
          <span
            className="material-symbols-outlined text-[23px] transition-transform group-hover:scale-110"
            style={{ fontVariationSettings: isPengaturan ? "'FILL' 1" : "'FILL' 0" }}
          >
            settings
          </span>
          <span className="text-[11px] leading-tight tracking-tight mt-0.5">
            Pengaturan
          </span>
          {isPengaturan && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a3e] mt-0.5 animate-pulse"></span>
          )}
        </button>
      </div>
    </nav>
  );
};