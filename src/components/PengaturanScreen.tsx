import React, { useState, useEffect } from 'react';
import { UserProfile, FarmerRank } from '../types/index.ts';

interface PengaturanScreenProps {
  userProfile: UserProfile;
  farmerRank: FarmerRank;
  onOpenEditProfile: () => void;
  onOpenRankPetani: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const PengaturanScreen: React.FC<PengaturanScreenProps> = ({
  userProfile,
  farmerRank,
  onOpenEditProfile,
  onOpenRankPetani,
  onUpdateProfile,
  onLogout,
}) => {
  const [soundOn, setSoundOn] = useState(userProfile.soundEnabled);
  const [reminderOn, setReminderOn] = useState(userProfile.reminderEnabled);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>(userProfile.textSize || 'medium');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile.textSize) {
      setTextSize(userProfile.textSize);
    }
  }, [userProfile.textSize]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    onUpdateProfile({ soundEnabled: next });
    showToast(next ? 'Suara efek diaktifkan 🎵' : 'Suara dinonaktifkan 🔇');
  };

  const handleToggleReminder = () => {
    const next = !reminderOn;
    setReminderOn(next);
    onUpdateProfile({ reminderEnabled: next });
    showToast(next ? 'Pengingat harian aktif ⏰' : 'Pengingat dimatikan');
  };

  const handleTextSizeChange = (size: 'small' | 'medium' | 'large') => {
    setTextSize(size);
    onUpdateProfile({ textSize: size });
    showToast(`Ukuran teks: ${size === 'small' ? 'Kecil' : size === 'medium' ? 'Sedang' : 'Besar'}`);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pb-24 bg-[#fff8f5] select-none">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5]/85 backdrop-blur-xl shadow-[0_2px_12px_rgba(43,23,4,0.04)] border-b border-[#ffe4d6]">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#feda5a] text-[#745f00] flex items-center justify-center shadow-[0_2px_0_0_#e6c446]">
              <span className="material-symbols-outlined text-[20px]">potted_plant</span>
            </div>
            <h1 className="font-extrabold text-lg text-[#2b1704] tracking-tight">Pengaturan</h1>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 flex flex-col pt-16 px-4 max-w-md mx-auto w-full gap-4 pb-12">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#0E8551] text-white font-bold text-xs rounded-full shadow-lg animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#ffeadb] mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center shadow-[0_3px_0_0_#e6c446] overflow-hidden">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#006a3e] flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[12px] text-white">eco</span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-[15px] text-[#2b1704] truncate">{userProfile.name}</span>
                <span className="material-symbols-outlined text-[18px] text-[#006a3e]">verified</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0 mt-0.5">
                <span className="text-xs text-[#6e7a70] truncate">{userProfile.email}</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#fff1e8] text-[10px] font-bold text-[#6e7a70] flex-shrink-0 shadow-xs">
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                  </svg>
                  Google
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onOpenEditProfile}
            aria-label="Edit Profil"
            className="flex-shrink-0 flex items-center gap-1 bg-[#ffeadb] hover:bg-[#ffe3ce] active:translate-y-0.5 text-[#2b1704] font-extrabold text-[12px] px-3.5 py-1.5 rounded-full shadow-[0_2px_0_0_#ffdcc1] transition-all border border-amber-200/40 cursor-pointer"
          >
            <span>Ubah</span>
            <span className="material-symbols-outlined text-[16px] text-[#006a3e]">edit</span>
          </button>
        </div>

        {/* Decorative Farm Status Pill (Clicking opens Rank Petani screen!) */}
        <div
          onClick={onOpenRankPetani}
          role="button"
          tabIndex={0}
          aria-label="Buka Rank Petani"
          className="bg-[#feda5a] text-[#745f00] px-4 py-3 rounded-2xl flex flex-col gap-2 shadow-[0_3px_0_0_#e6c446] active:translate-y-0.5 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">agriculture</span>
              <div>
                <p className="font-extrabold text-sm leading-tight">{farmerRank.title}</p>
                <p className="text-xs opacity-90">{farmerRank.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs bg-white text-[#715c00] px-2.5 py-0.5 rounded-full shadow-xs font-extrabold">
                Level {farmerRank.level}
              </span>
              <span className="material-symbols-outlined text-[20px] opacity-80">chevron_right</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-0.5">
            <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#0E8551] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (farmerRank.currentCare / farmerRank.targetCare) * 100)}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-bold tracking-tight">
              {farmerRank.currentCare} dari {farmerRank.targetCare} perawatan menuju Level {farmerRank.level + 1}
            </p>
          </div>
        </div>

        {/* Section: Preferensi Suara & Notifikasi */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-1.5 px-1">
            <span className="material-symbols-outlined text-[18px] text-[#006a3e]">tune</span>
            <h2 className="text-xs font-extrabold text-[#2b1704] uppercase tracking-wider">
              Preferensi Suara &amp; Notifikasi
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#ffeadb] flex flex-col gap-3">
            {/* Suara */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#715c00] shadow-[0_2px_0_0_#e6c446]">
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2b1704] block">Suara</span>
                  <span className="text-xs text-[#6e7a70]">Efek audio &amp; kicau peliharaan</span>
                </div>
              </div>
              <button
                onClick={handleToggleSound}
                role="switch"
                aria-checked={soundOn}
                className={`relative w-[52px] h-[30px] rounded-full transition-all duration-200 flex items-center px-[3px] flex-shrink-0 cursor-pointer ${
                  soundOn ? 'bg-[#0E8551] shadow-sm' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`w-[24px] h-[24px] bg-white rounded-full shadow-md transition-transform duration-200 ease-out flex items-center justify-center ${
                    soundOn ? 'translate-x-[22px]' : 'translate-x-0'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[14px] ${soundOn ? 'text-[#0E8551]' : 'text-gray-400'}`}>
                    music_note
                  </span>
                </span>
              </button>
            </div>

            <div className="h-px bg-[#ffeadb] w-full"></div>

            {/* Pengingat Perawatan */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#006a3e] shadow-[0_2px_0_0_#ffdcc1]">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2b1704] block">Pengingat Perawatan</span>
                  <span className="text-xs text-[#6e7a70]">Jadwal siram &amp; pakan rutin</span>
                </div>
              </div>
              <button
                onClick={handleToggleReminder}
                role="switch"
                aria-checked={reminderOn}
                className={`relative w-[52px] h-[30px] rounded-full transition-all duration-200 flex items-center px-[3px] flex-shrink-0 cursor-pointer ${
                  reminderOn ? 'bg-[#0E8551] shadow-sm' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`w-[24px] h-[24px] bg-white rounded-full shadow-md transition-transform duration-200 ease-out flex items-center justify-center ${
                    reminderOn ? 'translate-x-[22px]' : 'translate-x-0'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[14px] ${reminderOn ? 'text-[#0E8551]' : 'text-gray-400'}`}>
                    alarm
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Section: Tampilan */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-1">
            <span className="material-symbols-outlined text-[18px] text-[#006a3e]">format_size</span>
            <h2 className="text-xs font-extrabold text-[#2b1704] uppercase tracking-wider">Tampilan</h2>
          </div>
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#ffeadb] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#2b1704]">Ukuran Teks</span>
              <span className="text-[11px] font-extrabold text-[#006a3e] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full border border-emerald-200">
                {textSize === 'small' ? 'Kecil (85%)' : textSize === 'large' ? 'Besar (120%)' : 'Sedang (Normal)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              <button
                type="button"
                onClick={() => handleTextSizeChange('small')}
                aria-pressed={textSize === 'small'}
                className={`min-h-[52px] rounded-2xl transition-all flex flex-col items-center justify-center py-2 active:scale-95 cursor-pointer shadow-xs ${
                  textSize === 'small'
                    ? 'bg-[#0E8551] text-white shadow-[0_2px_0_0_#00522f]'
                    : 'bg-[#fff1e8] hover:bg-[#ffeadb] text-[#2b1704]'
                }`}
              >
                <span className="font-bold text-[14px] leading-tight">A</span>
                <span className={`text-[11px] font-semibold ${textSize === 'small' ? 'text-white' : 'text-[#6e7a70]'}`}>
                  Kecil
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleTextSizeChange('medium')}
                aria-pressed={textSize === 'medium'}
                className={`min-h-[52px] rounded-2xl transition-all flex flex-col items-center justify-center py-2 active:scale-95 cursor-pointer shadow-xs ${
                  textSize === 'medium'
                    ? 'bg-[#0E8551] text-white shadow-[0_2px_0_0_#00522f]'
                    : 'bg-[#fff1e8] hover:bg-[#ffeadb] text-[#2b1704]'
                }`}
              >
                <span className="font-bold text-[16px] leading-tight">A</span>
                <span className={`text-[11px] font-bold ${textSize === 'medium' ? 'text-white' : 'text-[#6e7a70]'}`}>
                  Sedang
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleTextSizeChange('large')}
                aria-pressed={textSize === 'large'}
                className={`min-h-[52px] rounded-2xl transition-all flex flex-col items-center justify-center py-2 active:scale-95 cursor-pointer shadow-xs ${
                  textSize === 'large'
                    ? 'bg-[#0E8551] text-white shadow-[0_2px_0_0_#00522f]'
                    : 'bg-[#fff1e8] hover:bg-[#ffeadb] text-[#2b1704]'
                }`}
              >
                <span className="font-bold text-[19px] leading-tight">A</span>
                <span className={`text-[11px] font-semibold ${textSize === 'large' ? 'text-white' : 'text-[#6e7a70]'}`}>
                  Besar
                </span>
              </button>
            </div>

            {/* Pratinjau Teks Langsung */}
            <div className="mt-0.5 p-3 rounded-xl bg-[#fff8f5] border border-[#ffeadb] flex flex-col gap-1 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6e7a70]">
                  Pratinjau Langsung
                </span>
                <span className="text-[10px] text-[#006a3e] font-bold">
                  {textSize === 'small' ? 'Mode Ringkas' : textSize === 'large' ? 'Mode Sangat Jelas' : 'Mode Standar'}
                </span>
              </div>
              <p className="font-bold text-[#2b1704] transition-all leading-snug">
                "Rawat ternak &amp; tanaman jadi lebih mudah bersama Dewi Sri."
              </p>
            </div>
          </div>
        </div>

        {/* Section: Akun */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-1">
            <span className="material-symbols-outlined text-[18px] text-[#006a3e]">manage_accounts</span>
            <h2 className="text-xs font-extrabold text-[#2b1704] uppercase tracking-wider">Akun</h2>
          </div>
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#ffeadb] flex flex-col gap-3">
            {/* Ubah Kata Sandi */}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center justify-between text-left active:translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#715c00] shadow-[0_2px_0_0_#e6c446]">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2b1704] block">Ubah Kata Sandi</span>
                  <span className="text-xs text-[#6e7a70]">Ganti kata sandi akunmu</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#6e7a70]">chevron_right</span>
            </button>

            <div className="h-px bg-[#ffeadb] w-full"></div>

            {/* Keluar */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center justify-between text-left active:translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#ba1a1a] block">Keluar</span>
                  <span className="text-xs text-[#6e7a70]">Keluar dari akun ini</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Section: Umum */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-1">
            <span className="material-symbols-outlined text-[18px] text-[#006a3e]">public</span>
            <h2 className="text-xs font-extrabold text-[#2b1704] uppercase tracking-wider">Umum</h2>
          </div>
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#ffeadb] flex flex-col gap-3">
            {/* Bahasa */}
            <button
              onClick={() => showToast('Bahasa saat ini: Bahasa Indonesia')}
              className="w-full flex items-center justify-between text-left active:translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-[#00609a] shadow-[0_2px_0_0_#99cbff]">
                  <span className="material-symbols-outlined text-[20px]">language</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2b1704] block">Bahasa</span>
                  <span className="text-xs text-[#6e7a70]">Pengaturan bahasa sistem</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#006a3e] bg-emerald-100 px-2 py-0.5 rounded-full">
                  Indonesia
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#6e7a70]">chevron_right</span>
              </div>
            </button>

            <div className="h-px bg-[#ffeadb] w-full"></div>

            {/* Tentang Aplikasi */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full flex items-center justify-between text-left active:translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#006a3e] shadow-[0_2px_0_0_#74db9d]">
                  <span className="material-symbols-outlined text-[20px]">eco</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2b1704] block">Tentang Aplikasi</span>
                  <span className="text-xs text-[#6e7a70]">Versi 1.4.0 &amp; filosofi Dewi Sri</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#6e7a70]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Section: Bantuan & Lainnya */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-1">
            <span className="material-symbols-outlined text-[18px] text-[#006a3e]">support</span>
            <h2 className="text-xs font-extrabold text-[#2b1704] uppercase tracking-wider">Bantuan &amp; Lainnya</h2>
          </div>
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#ffeadb] flex flex-col gap-3">
            <button
              onClick={() => setShowGuideModal(true)}
              className="w-full flex items-center justify-between text-left active:translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#715c00] shadow-[0_2px_0_0_#ffe17c]">
                  <span className="material-symbols-outlined text-[20px]">help_outline</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2b1704] block">Panduan Asisten Dewi Sri</span>
                  <span className="text-xs text-[#6e7a70]">Tips memaksimalkan diagnosis AI</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#6e7a70]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Backup Status Pill */}
        <div className="bg-[#fff1e8] rounded-2xl p-4 flex items-center gap-3 border border-[#ffeadb] shadow-xs">
          <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[22px] text-[#006a3e]">waving_hand</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#2b1704]">Semua data tersimpan aman</span>
            <span className="text-[11px] text-[#6e7a70] leading-snug">
              Kemajuan panenmu otomatis dicadangkan di perangkat ini.
            </span>
          </div>
        </div>
      </main>

      {/* Modal: Ubah Kata Sandi */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full border border-[#ffeadb] shadow-2xl flex flex-col gap-3">
            <h3 className="font-extrabold text-base text-[#2b1704]">Ubah Kata Sandi</h3>
            <p className="text-xs text-[#6e7a70]">Masukkan kata sandi baru untuk mengamankan akun Sobat Tani.</p>
            <input
              type="password"
              placeholder="Kata sandi baru..."
              className="w-full h-11 rounded-xl bg-[#fff1e8] px-3 text-sm focus:outline-none"
            />
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#6e7a70] hover:text-black cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  showToast('Kata sandi berhasil diperbarui! 🔒');
                }}
                className="px-4 py-2 bg-[#0E8551] text-white text-xs font-bold rounded-full shadow-sm cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Tentang Aplikasi */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full border border-[#ffeadb] shadow-2xl flex flex-col gap-3 text-[#2b1704]">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base">Dewi Sri Companion</h3>
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-7 h-7 rounded-full bg-[#fff1e8] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <p className="text-xs leading-relaxed text-[#3e4941]">
              Dewi Sri terinspirasi dari kearifan lokal dewi kesuburan dan pertanian Nusantara. Aplikasi ini
              menggabungkan kehangatan memelihara pet virtual dengan kecerdasan diagnosis agronomis untuk membantu
              petani dan penghobi tanaman merawat flora dan fauna mereka.
            </p>
            <div className="bg-[#fff1e8] rounded-xl p-3 text-xs text-[#6e7a70]">
              <p>• Versi: 1.4.0 (Agro-Companion)</p>
              <p>• Desain: Playful Tactile Toylike System</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Panduan */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full border border-[#ffeadb] shadow-2xl flex flex-col gap-3 text-[#2b1704]">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base">Panduan Asisten Dewi Sri</h3>
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-7 h-7 rounded-full bg-[#fff1e8] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2 text-xs leading-relaxed text-[#3e4941]">
              <p>1. <strong>Rawat Rutin:</strong> Beri air, pakan, dan sinar mentari agar peliharaanmu tetap riang.</p>
              <p>2. <strong>Konsultasi Hama:</strong> Foto daun bermasalah lewat menu Chat AI untuk deteksi instan.</p>
              <p>3. <strong>Tingkatkan Rank:</strong> Capai Level 5 Petani Teladan dengan konsistensi harian.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Konfirmasi Keluar (Matching screen_80c14162) */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-[#2b1704]/40 backdrop-blur-xs flex flex-col justify-between animate-in fade-in duration-150 select-none">
          {/* Top Header Bar matching screen_80c14162 */}
          <div className="h-16 px-4 bg-white flex items-center justify-between border-b border-[#ffeadb]">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="w-10 h-10 rounded-full bg-[#fff1e8] flex items-center justify-center text-[#2b1704] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <h2 className="font-extrabold text-base text-[#2b1704]">Konfirmasi Keluar</h2>
            <div className="w-10 h-10 rounded-full bg-[#006a3e] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
          </div>

          {/* Centered Modal Content Card */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white rounded-[36px] p-6 max-w-sm w-full shadow-2xl border border-[#ffeadb] flex flex-col items-center text-center animate-in zoom-in-95 duration-150">
              {/* Pink circular container with red door icon */}
              <div className="w-20 h-20 rounded-full bg-[#ffdad6]/70 border border-red-200/50 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#ba1a1a] text-3xl font-bold">meeting_room</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-extrabold text-xl text-[#2b1704] tracking-tight">
                Keluar dari Akun?
              </h3>
              <p className="text-xs text-[#3e4941] mt-1.5 mb-6">
                Kamu bisa masuk lagi kapan saja
              </p>

              {/* Buttons side-by-side */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="h-12 rounded-full bg-[#fff1e8] hover:bg-[#ffeadb] border border-[#fad3b3] text-[#006a3e] font-extrabold text-xs active:scale-95 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogoutModal(false);
                    onLogout();
                  }}
                  className="h-12 rounded-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-extrabold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>

          <div className="h-6"></div>
        </div>
      )}
    </div>
  );
};
