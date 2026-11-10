import React, { useState } from 'react';
import { UserProfile } from '../types/index.ts';
import { playPop, playSparkle } from '../utils/audioEffects.ts';

interface EditProfileScreenProps {
  userProfile: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
  onBack: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  userProfile,
  onSaveProfile,
  onBack,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [region, setRegion] = useState(userProfile.region);
  const [focusList, setFocusList] = useState<('tanaman' | 'ikan' | 'ayam')[]>(userProfile.careFocus || ['tanaman']);
  const [showToast, setShowToast] = useState(false);

  const toggleFocus = (item: 'tanaman' | 'ikan' | 'ayam') => {
    playPop();
    setFocusList((prev) =>
      prev.includes(item) ? (prev.length > 1 ? prev.filter((f) => f !== item) : prev) : [...prev, item]
    );
  };

  const handleSave = () => {
    playSparkle();
    onSaveProfile({
      name: name.trim() || 'Sobat Tani',
      region: region.trim() || 'Bandung, Jawa Barat',
      careFocus: focusList,
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onBack();
    }, 900);
  };

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
              <h1 className="font-extrabold text-base text-[#2b1704]">Edit Profil Petani</h1>
              <span className="text-[10px] text-[#0E8551] font-bold">Identitas Digital Sobat Tani</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 px-4 max-w-md mx-auto w-full gap-5 pb-12 mt-2">
        {/* Live Preview: Kartu Tanda Petani Digital (Digital Farmer Pass) */}
        <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#0E8551] via-[#006a3e] to-[#004a29] text-white shadow-[0_6px_0_0_#00381f] border border-emerald-300/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/20">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-300 text-lg">eco</span>
              <span className="font-extrabold text-xs uppercase tracking-wider text-amber-200">
                Kartu Tani Digital Dewi Sri
              </span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">#DS-2026</span>
          </div>

          {/* Card Body */}
          <div className="flex items-center gap-4 mt-3">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-white/20 p-1 backdrop-blur-xs border-2 border-white/40 overflow-hidden shadow-md">
                <img
                  src={userProfile.avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-[#564500] flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined text-[13px] font-bold">photo_camera</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    onSaveProfile({ avatarUrl: url });
                  }
                }}
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center gap-1">
                <h3 className="font-extrabold text-lg text-white truncate leading-tight">
                  {name || 'Sobat Tani'}
                </h3>
                <span className="material-symbols-outlined text-amber-300 text-sm">verified</span>
              </div>
              <span className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5 truncate">
                <span className="material-symbols-outlined text-xs">location_on</span>
                {region || 'Jawa Barat, Indonesia'}
              </span>
              <div className="flex items-center gap-1 mt-2">
                {focusList.map((f) => (
                  <span
                    key={f}
                    className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-white/25 text-white backdrop-blur-xs uppercase"
                  >
                    {f === 'tanaman' ? '🌱 Tanaman' : f === 'ikan' ? '🐟 Ikan' : '🐣 Ayam'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Form Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-[#ffeadb] flex flex-col gap-4">
          <h4 className="font-extrabold text-sm text-[#2b1704]">Informasi Pribadi</h4>

          {/* Nama Panggilan */}
          <div>
            <label className="block text-xs font-bold text-[#2b1704] mb-1.5" htmlFor="nama-panggilan">
              Nama Petani
            </label>
            <div className="relative flex items-center">
              <input
                id="nama-panggilan"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis nama panggilanmu"
                className="w-full h-12 rounded-2xl bg-[#fff8f5] px-4 text-[#2b1704] text-xs font-bold outline-none border border-[#ffeadb] focus:border-[#0E8551] focus:bg-white transition-all shadow-inner"
              />
              <span className="material-symbols-outlined absolute right-4 text-[#6e7a70] text-[20px] pointer-events-none">
                badge
              </span>
            </div>
          </div>

          {/* Asal Daerah */}
          <div>
            <label className="block text-xs font-bold text-[#2b1704] mb-1.5" htmlFor="asal-daerah">
              Daerah / Wilayah Sawah
            </label>
            <div className="relative flex items-center">
              <input
                id="asal-daerah"
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Bandung, Jawa Barat"
                className="w-full h-12 rounded-2xl bg-[#fff8f5] px-4 text-[#2b1704] text-xs font-bold outline-none border border-[#ffeadb] focus:border-[#0E8551] focus:bg-white transition-all shadow-inner"
              />
              <span className="material-symbols-outlined absolute right-4 text-[#6e7a70] text-[20px] pointer-events-none">
                location_on
              </span>
            </div>
          </div>

          {/* Fokus Tani Spesialisasi */}
          <div>
            <label className="block text-xs font-bold text-[#2b1704] mb-2">
              Fokus Perawatan Utama
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'tanaman' as const, label: 'Tanaman', icon: '🌱' },
                { key: 'ikan' as const, label: 'Kolam Ikan', icon: '🐟' },
                { key: 'ayam' as const, label: 'Ternak Ayam', icon: '🐣' },
              ].map((opt) => {
                const isSelected = focusList.includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggleFocus(opt.key)}
                    className={`h-11 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#e8f7ee] border-[#006a3e] text-[#006a3e] shadow-xs'
                        : 'bg-white border-[#ffeadb] text-[#6e7a70] hover:border-emerald-300'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-xs font-bold text-[#2b1704] mb-1.5" htmlFor="email-field">
              Alamat Email Terdaftar
            </label>
            <div className="relative flex items-center opacity-85">
              <input
                id="email-field"
                type="email"
                value={userProfile.email}
                readOnly
                className="w-full h-12 rounded-2xl bg-[#fff1e8] px-4 text-[#6e7a70] text-xs font-medium outline-none cursor-not-allowed border border-[#ffeadb]"
              />
              <span className="material-symbols-outlined absolute right-4 text-[#6e7a70] text-[18px] pointer-events-none">
                lock
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleSave}
            type="button"
            className="w-full h-12 rounded-full bg-[#0E8551] hover:bg-[#0b6e43] text-white font-extrabold text-sm shadow-[0_4px_0_0_#00522f] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            <span>Simpan Perubahan</span>
          </button>
          <button
            onClick={() => {
              playPop();
              onBack();
            }}
            type="button"
            className="w-full py-2.5 text-center text-[#6e7a70] font-bold text-xs hover:text-[#2b1704] cursor-pointer"
          >
            Kembali
          </button>
        </div>

        {/* Success Toast Banner */}
        {showToast && (
          <div className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto bg-[#0E8551] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in z-50">
            <span className="material-symbols-outlined text-[24px]">task_alt</span>
            <div className="flex-1">
              <div className="font-extrabold text-sm">Profil Berhasil Disimpan!</div>
              <div className="text-xs opacity-90">Data Kartu Tani digitalmu telah diperbarui.</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};