import React, { useState } from 'react';
import { UserProfile } from '../types/index.ts';

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
  const [showToast, setShowToast] = useState(false);
  const handleSave = () => {
    onSaveProfile({
      name: name.trim() || 'Sobat Tani',
      region: region.trim() || 'Bandung, Jawa Barat',
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
            <h1 className="font-extrabold text-lg text-[#2b1704]">Edit Profile</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 px-4 max-w-md mx-auto w-full gap-4 pb-12 mt-2">
        {/* Avatar Section */}
        <div className="flex flex-col items-center pt-2 pb-2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#ffe3ce] p-1 shadow-md flex items-center justify-center overflow-hidden border-2 border-white">
              <img
                src={userProfile.avatarUrl}
                alt="Avatar Petani"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              aria-label="Ganti Foto Profil"
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#0E8551] text-white flex items-center justify-center shadow-[0_3px_0_0_#00522f] active:translate-y-0.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
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
          <label
            htmlFor="avatar-upload"
            className="mt-2.5 font-bold text-xs text-[#006a3e] hover:text-emerald-700 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Ganti Foto
          </label>
        </div>

        {/* Input Form Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ffeadb] flex flex-col gap-4">
          {/* Nama Panggilan */}
          <div>
            <label className="block text-xs font-bold text-[#2b1704] mb-1.5" htmlFor="nama-panggilan">
              Nama Panggilan
            </label>
            <div className="relative flex items-center">
              <input
                id="nama-panggilan"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis nama panggilanmu"
                className="w-full h-[50px] rounded-2xl bg-[#fff1e8] px-4 text-[#2b1704] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#0E8551] transition-all shadow-inner"
              />
              <span className="material-symbols-outlined absolute right-4 text-[#6e7a70] text-[20px] pointer-events-none">
                sentiment_satisfied
              </span>
            </div>
          </div>

          {/* Asal Daerah */}
          <div>
            <label className="block text-xs font-bold text-[#2b1704] mb-1.5" htmlFor="asal-daerah">
              Asal Daerah
            </label>
            <div className="relative flex items-center">
              <input
                id="asal-daerah"
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Contoh: Bandung, Jawa Barat"
                className="w-full h-[50px] rounded-2xl bg-[#fff1e8] px-4 text-[#2b1704] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#0E8551] transition-all shadow-inner"
              />
              <span className="material-symbols-outlined absolute right-4 text-[#6e7a70] text-[20px] pointer-events-none">
                location_on
              </span>
            </div>
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-xs font-bold text-[#2b1704] mb-1.5" htmlFor="email-field">
              Email
            </label>
            <div className="relative flex items-center opacity-80 cursor-not-allowed">
              <input
                id="email-field"
                type="email"
                value={userProfile.email}
                readOnly
                className="w-full h-[50px] rounded-2xl bg-[#fff1e8] px-4 text-[#3e4941] text-sm outline-none cursor-not-allowed shadow-inner"
              />
              <span className="material-symbols-outlined absolute right-4 text-[#6e7a70] text-[20px] pointer-events-none">
                lock
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={handleSave}
            type="button"
            className="w-full h-[52px] rounded-full bg-[#0E8551] hover:bg-emerald-700 text-white font-extrabold text-sm shadow-[0_4px_0_0_#00522f] active:translate-y-1 active:shadow-[0_1px_0_0_#00522f] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Simpan Perubahan
          </button>
          <button
            onClick={onBack}
            type="button"
            className="w-full py-2.5 text-center text-[#6e7a70] font-bold text-xs hover:text-[#2b1704] active:scale-95 transition-all cursor-pointer"
          >
            Batal
          </button>
        </div>

        {/* Success Toast Banner */}
        {showToast && (
          <div className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto bg-[#0E8551] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in z-50">
            <span className="material-symbols-outlined text-[24px]">task_alt</span>
            <div className="flex-1">
              <div className="font-extrabold text-sm">Tersimpan!</div>
              <div className="text-xs opacity-90">Profil Sobat Tani berhasil diperbarui.</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
