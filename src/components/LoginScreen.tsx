import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, ArrowRight, CircleHelp, Mail, ShieldCheck } from 'lucide-react';
import { Brand } from './ui/Brand.tsx';
import { playPop } from '../utils/audioEffects.ts';
import '../styles/onboarding.css';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onBackToWelcome?: () => void;
}

export function LoginScreen({ onLoginSuccess, onNavigateRegister, onNavigateForgotPassword, onBackToWelcome }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  const continueWithEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) { setError('Tulis email profil atau pilih Lanjut tanpa email.'); emailRef.current?.focus(); return; }
    if (emailRef.current?.validity.typeMismatch) { setError('Periksa alamat email, misalnya nama@email.com.'); emailRef.current.focus(); return; }
    playPop();
    onLoginSuccess(email.trim().toLocaleLowerCase('id-ID'));
  };

  return (
    <div className="ob-screen ob-auth">
      <header className="ob-auth-header">{onBackToWelcome && <button type="button" className="icon-button" aria-label="Kembali ke layar awal" onClick={onBackToWelcome}><ArrowLeft size={22} /></button>}<Brand /></header>
      <main className="ob-auth-main">
        <div className="ob-auth-art"><img src="/assets/generated/care-tools-v1.webp" alt="" /></div>
        <div className="ob-auth-heading"><span className="section-label">Profil di perangkat ini</span><h1>Selamat datang kembali</h1><p>Lanjutkan merawat tanaman dan ternak Anda.</p></div>
        <div className="status-note"><ShieldCheck size={19} /><span>Ini profil lokal tanpa kata sandi. Email hanya menjadi keterangan profil dan belum diverifikasi.</span></div>
        <form className="ob-auth-form" noValidate onSubmit={continueWithEmail}>
          <div className="field"><label htmlFor="ob-login-email">Email profil</label><div className="ob-auth-input"><Mail size={20} aria-hidden="true" /><input ref={emailRef} id="ob-login-email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} placeholder="nama@email.com" aria-invalid={Boolean(error)} aria-describedby={error ? 'ob-login-email-error' : undefined} required /></div>{error && <p id="ob-login-email-error" className="field-error" role="alert">{error}</p>}</div>
          <button type="submit" className="app-button app-button--wide">Lanjut dengan email<ArrowRight size={18} /></button>
        </form>
        <button type="button" className="app-button app-button--plain app-button--wide" onClick={() => { playPop(); onLoginSuccess(''); }}>Lanjut tanpa email</button>
        <button type="button" className="text-button ob-access-help" onClick={onNavigateForgotPassword}><CircleHelp size={17} />Tentang akses dan data</button>
        <div className="ob-auth-footer"><span>Ingin memakai nama sendiri?</span><button type="button" className="text-button" onClick={onNavigateRegister}>Buat profil lokal</button></div>
      </main>
    </div>
  );
}
