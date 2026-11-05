import React, { useState } from 'react';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('nama@email.com');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#fff8f5] select-none relative overflow-x-hidden">
      {/* Header */}
      <header className="h-14 px-4 flex items-center justify-between border-b border-[#ffeadb] bg-white/70 backdrop-blur-md">
        <button
          onClick={onBackToLogin}
          aria-label="Kembali ke Masuk"
          className="w-10 h-10 rounded-full bg-[#fff1e8] flex items-center justify-center text-[#2b1704] active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="font-extrabold text-base text-[#2b1704]">Lupa Kata Sandi</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-sm mx-auto w-full z-10">
        {/* Padlock Mascot Illustration with Leaf & Stars (screen_6a044f1b) */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-[#ffeadb]/60 flex items-center justify-center p-2 relative">
            {/* Sparkle star */}
            <div className="absolute right-0 bottom-3 text-amber-400 text-lg">✦</div>
            <svg className="w-20 h-20 drop-shadow-md" viewBox="0 0 100 100" fill="none">
              {/* Shackle */}
              <path
                d="M32 46 V30 C32 20 40 12 50 12 C60 12 68 20 68 30 V46"
                stroke="#eab308"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Sprout leaf on shackle */}
              <path
                d="M66 22 C74 16 84 20 84 26 C84 32 74 34 66 28 Z"
                fill="#22c55e"
              />
              {/* Lock body */}
              <circle cx="50" cy="58" r="26" fill="#facc15" stroke="#eab308" strokeWidth="2" />
              {/* Eyes & mouth */}
              <circle cx="43" cy="54" r="2.5" fill="#1c1917" />
              <circle cx="57" cy="54" r="2.5" fill="#1c1917" />
              <ellipse cx="50" cy="62" rx="3" ry="4" fill="#1c1917" />
            </svg>
          </div>
        </div>

        {/* Headings */}
        <h2 className="font-extrabold text-xl text-[#2b1704] text-center tracking-tight">
          Kunci Lumbung Terkunci?
        </h2>
        <p className="text-xs text-[#3e4941] text-center mt-2 mb-6 leading-relaxed max-w-[280px]">
          Masukkan email akunmu, kami kirim tautan untuk mengatur ulang kata sandi
        </p>

        {/* Card Form */}
        <div className="w-full bg-white rounded-3xl p-5 border border-[#ffeadb] shadow-[0_4px_16px_rgba(43,23,4,0.04)] flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-[#2b1704]">
                Alamat Email <span className="text-red-500">*</span>
              </label>
              <div className="h-12 bg-[#fff8f5] rounded-2xl border border-[#ffeadb] px-3.5 flex items-center gap-2.5 focus-within:border-[#006a3e] transition-colors">
                <span className="material-symbols-outlined text-[#6e7a70] text-lg">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-transparent text-xs text-[#2b1704] outline-none"
                  required
                />
              </div>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-[#6e7a70]">
                <span className="material-symbols-outlined text-xs">info</span>
                <span>Pastikan email aktif dan terdaftar di kebunmu.</span>
              </div>
            </div>

            {sent ? (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <p className="text-xs font-bold text-[#006a3e]">
                  ✓ Tautan pemulihan telah dikirim ke {email}!
                </p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full h-12 mt-2 rounded-2xl bg-[#006a3e] hover:bg-[#0e8551] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,106,62,0.3)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>Kirim Tautan</span>
              </button>
            )}
          </form>
        </div>

        {/* Back Link */}
        <button
          onClick={onBackToLogin}
          className="mt-6 flex items-center gap-1 text-xs font-extrabold text-[#715c00] hover:text-[#2b1704] cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Kembali ke Masuk</span>
        </button>
      </div>

      {/* Decorative Wavy Ground Bottom */}
      <div className="w-full h-16 pointer-events-none mt-auto flex items-end">
        <div className="w-full h-10 bg-[#ffe3ce]/70 border-t border-[#fad3b3] flex items-center justify-between px-6 opacity-70">
          <span className="material-symbols-outlined text-emerald-700 text-sm">grass</span>
          <span className="material-symbols-outlined text-amber-700 text-sm">local_florist</span>
        </div>
      </div>
    </div>
  );
};
