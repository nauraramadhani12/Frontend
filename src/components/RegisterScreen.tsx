import React, { useState } from 'react';

interface RegisterScreenProps {
  onRegisterSuccess: (name: string, email: string) => void;
  onNavigateLogin: () => void;
  onBackToWelcome?: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateLogin,
  onBackToWelcome,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      onRegisterSuccess(name, email);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#fff8f5] select-none relative overflow-x-hidden">
      {onBackToWelcome && (
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={onBackToWelcome}
            aria-label="Kembali"
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-[#ffeadb] flex items-center justify-center text-[#2b1704] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-6 max-w-sm mx-auto w-full z-10">
        {/* Logo */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-emerald-100/60 blur-xl"></div>
          <div className="w-20 h-20 rounded-full bg-white shadow-[0_8px_24px_rgba(0,106,62,0.12)] border border-[#ffeadb] p-2 flex items-center justify-center relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw-tYysOfVwxYMn-FcT5ti_uf5yiAsWGYB1PmvdVQ7Oxga_tnLEf_KCPvtY0xBBM_5qwNT89lpjMDNgoyE3GmJ8Aem39rn7BXuNac1JKK0HoVbOqiGaVAE6XWxcykIe3wCr757EZDUNpDj67VGd8HYzBP7E8ywqfVgZCtEGl4apV5G73jW6I2jedOjal2RFrZEgI8gunyVvWhbWIdwFzfAWc9KIYfJM1OmxKN_5sFA"
              alt="Dewi Sri"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-extrabold text-2xl text-[#2b1704] tracking-tight text-center">
          Buat Akun Baru
        </h1>
        <p className="text-xs text-[#3e4941] text-center mt-1 mb-5">
          Daftar gratis dan mulai merawat peliharaanmu
        </p>

        {/* Google Register Button */}
        <button
          onClick={() => onRegisterSuccess('Sobat Tani', 'sobat.tani@gmail.com')}
          className="w-full h-11 rounded-full bg-white hover:bg-neutral-50 border border-[#ffeadb] shadow-sm flex items-center justify-center gap-2.5 text-xs font-bold text-[#2b1704] active:scale-[0.98] transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Daftar dengan Google</span>
        </button>

        {/* Divider "atau" */}
        <div className="w-full flex items-center my-4">
          <div className="flex-1 h-px bg-[#ffeadb]"></div>
          <span className="px-3 text-xs text-[#6e7a70] font-medium">atau</span>
          <div className="flex-1 h-px bg-[#ffeadb]"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          {/* Nama Panggilan */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-[#2b1704]">Nama Panggilan</label>
            <div className="h-11 bg-white rounded-2xl border border-[#ffeadb] px-3.5 flex items-center gap-2.5 focus-within:border-[#006a3e] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[#6e7a70] text-base">person</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Sobat Tani"
                className="w-full bg-transparent text-xs text-[#2b1704] outline-none placeholder:text-[#6e7a70]/50"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-[#2b1704]">Email</label>
            <div className="h-11 bg-white rounded-2xl border border-[#ffeadb] px-3.5 flex items-center gap-2.5 focus-within:border-[#006a3e] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[#6e7a70] text-base">mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-transparent text-xs text-[#2b1704] outline-none placeholder:text-[#6e7a70]/50"
                required
              />
            </div>
          </div>

          {/* Kata Sandi */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-[#2b1704]">Kata Sandi</label>
            <div className="h-11 bg-white rounded-2xl border border-[#ffeadb] px-3.5 flex items-center gap-2.5 focus-within:border-[#006a3e] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[#6e7a70] text-base">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full bg-transparent text-xs text-[#2b1704] outline-none placeholder:text-[#6e7a70]/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#6e7a70] hover:text-[#2b1704] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <span className="text-[10px] text-[#6e7a70] pl-1">Minimal 8 karakter</span>
          </div>

          {/* Ulangi Kata Sandi */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-[#2b1704]">Ulangi Kata Sandi</label>
            <div className="h-11 bg-white rounded-2xl border border-[#ffeadb] px-3.5 flex items-center gap-2.5 focus-within:border-[#006a3e] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[#6e7a70] text-base">lock</span>
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full bg-transparent text-xs text-[#2b1704] outline-none placeholder:text-[#6e7a70]/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="text-[#6e7a70] hover:text-[#2b1704] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">
                  {showRepeatPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Daftar Button */}
          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-full bg-[#006a3e] hover:bg-[#0e8551] text-white font-extrabold text-sm shadow-[0_4px_12px_rgba(0,106,62,0.3)] active:scale-[0.98] transition-all cursor-pointer"
          >
            Daftar
          </button>
        </form>

        {/* Sudah punya akun? Masuk */}
        <p className="text-xs text-[#3e4941] text-center mt-4">
          Sudah punya akun?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="font-extrabold text-[#006a3e] hover:underline cursor-pointer"
          >
            Masuk
          </button>
        </p>
      </div>

      {/* Decorative Wavy Ground Bottom Banners */}
      <div className="w-full relative h-20 pointer-events-none mt-auto">
        <svg className="w-full h-full" viewBox="0 0 390 80" preserveAspectRatio="none" fill="none">
          <path
            d="M0 45 Q90 15 195 40 T390 30 V80 H0 Z"
            fill="#fef08a"
            opacity="0.55"
          />
          <path
            d="M0 55 Q100 35 200 50 T390 42 V80 H0 Z"
            fill="#a7f3d0"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};
