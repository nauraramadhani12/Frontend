import React, { useState } from 'react';
import { playPop } from '../utils/audioEffects.ts';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onBackToWelcome?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateRegister,
  onNavigateForgotPassword,
  onBackToWelcome,
}) => {
  const [email, setEmail] = useState('sobat.tani@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPop();
    if (email) {
      onLoginSuccess(email);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#fff8f5] select-none relative overflow-x-hidden">
      {/* Top back button */}
      {onBackToWelcome && (
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => {
              playPop();
              onBackToWelcome();
            }}
            aria-label="Kembali"
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-[#ffeadb] flex items-center justify-center text-[#2b1704] active:scale-95 transition-all cursor-pointer hover:bg-neutral-50"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6 max-w-sm mx-auto w-full z-10">
        {/* Logo with circular glow */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full bg-emerald-100/70 blur-xl"></div>
          <div className="w-24 h-24 rounded-full bg-white shadow-[0_8px_24px_rgba(0,106,62,0.12)] border border-[#ffeadb] p-2 flex items-center justify-center relative animate-float-gentle">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw-tYysOfVwxYMn-FcT5ti_uf5yiAsWGYB1PmvdVQ7Oxga_tnLEf_KCPvtY0xBBM_5qwNT89lpjMDNgoyE3GmJ8Aem39rn7BXuNac1JKK0HoVbOqiGaVAE6XWxcykIe3wCr757EZDUNpDj67VGd8HYzBP7E8ywqfVgZCtEGl4apV5G73jW6I2jedOjal2RFrZEgI8gunyVvWhbWIdwFzfAWc9KIYfJM1OmxKN_5sFA"
              alt="Dewi Sri"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-extrabold text-2xl text-[#2b1704] tracking-tight text-center">
          Selamat Datang, Petani!
        </h1>
        <p className="text-xs text-[#3e4941] text-center mt-1 mb-6 font-medium">
          Masuk untuk mulai merawat peliharaan kebunmu
        </p>

        {/* Google Login Button */}
        <button
          onClick={() => {
            playPop();
            onLoginSuccess('sobat.tani@gmail.com');
          }}
          className="w-full h-12 rounded-full bg-white hover:bg-neutral-50 border border-[#ffeadb] shadow-xs flex items-center justify-center gap-2.5 text-xs font-bold text-[#2b1704] active:scale-[0.98] transition-all cursor-pointer"
        >
          {/* Google 4-color G icon */}
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
          <span>Lanjutkan dengan Google</span>
        </button>

        {/* Divider "atau" */}
        <div className="w-full flex items-center my-4">
          <div className="flex-1 h-px bg-[#ffeadb]"></div>
          <span className="px-3 text-xs text-[#6e7a70] font-bold">atau</span>
          <div className="flex-1 h-px bg-[#ffeadb]"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
          {/* Email */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-[#2b1704]">Email</label>
            <div className="h-12 bg-white rounded-2xl border border-[#ffeadb] px-3.5 flex items-center gap-2.5 focus-within:border-[#006a3e] transition-colors shadow-2xs">
              <span className="material-symbols-outlined text-[#6e7a70] text-lg">mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-transparent text-xs font-bold text-[#2b1704] outline-none placeholder:text-[#6e7a70]/50"
                required
              />
            </div>
          </div>

          {/* Kata Sandi */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-[#2b1704]">Kata Sandi</label>
            <div className="h-12 bg-white rounded-2xl border border-[#ffeadb] px-3.5 flex items-center gap-2.5 focus-within:border-[#006a3e] transition-colors shadow-2xs">
              <span className="material-symbols-outlined text-[#6e7a70] text-lg">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full bg-transparent text-xs font-bold text-[#2b1704] outline-none placeholder:text-[#6e7a70]/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#6e7a70] hover:text-[#2b1704] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Lupa Kata Sandi Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                playPop();
                onNavigateForgotPassword();
              }}
              className="text-xs font-extrabold text-[#006a3e] hover:underline cursor-pointer"
            >
              Lupa kata sandi?
            </button>
          </div>

          {/* Masuk Button */}
          <button
            type="submit"
            className="w-full h-12 mt-1 rounded-full bg-[#006a3e] hover:bg-[#0e8551] text-white font-extrabold text-sm shadow-[0_4px_0_0_#004a29] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Masuk ke Kebun</span>
            <span className="material-symbols-outlined text-lg">login</span>
          </button>
        </form>

        {/* Belum punya akun? Daftar */}
        <p className="text-xs text-[#3e4941] text-center mt-5">
          Belum punya akun?{' '}
          <button
            type="button"
            onClick={() => {
              playPop();
              onNavigateRegister();
            }}
            className="font-extrabold text-[#006a3e] hover:underline cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </p>
      </div>

      {/* Decorative Wavy Ground Bottom */}
      <div className="w-full relative h-16 pointer-events-none mt-auto">
        <svg className="w-full h-full" viewBox="0 0 390 80" preserveAspectRatio="none" fill="none">
          <path d="M0 45 Q90 15 195 40 T390 30 V80 H0 Z" fill="#fef08a" opacity="0.55" />
          <path d="M0 55 Q100 35 200 50 T390 42 V80 H0 Z" fill="#a7f3d0" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};