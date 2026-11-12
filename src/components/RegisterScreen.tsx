import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, Check, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { Brand } from './ui/Brand.tsx';
import { playSparkle } from '../utils/audioEffects.ts';
import '../styles/onboarding.css';

interface RegisterScreenProps {
  onRegisterSuccess: (name: string, email: string) => void;
  onNavigateLogin: () => void;
  onBackToWelcome?: () => void;
}

export function RegisterScreen({ onRegisterSuccess, onNavigateLogin, onBackToWelcome }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) { setErrors({ name: 'Tulis nama yang ingin ditampilkan.' }); nameRef.current?.focus(); return; }
    if (email.trim() && emailRef.current?.validity.typeMismatch) { setErrors({ email: 'Periksa alamat email, misalnya nama@email.com.' }); emailRef.current.focus(); return; }
    setErrors({});
    playSparkle();
    onRegisterSuccess(name.trim(), email.trim().toLocaleLowerCase('id-ID'));
  };

  return (
    <div className="ob-screen ob-auth">
      <header className="ob-auth-header">{onBackToWelcome && <button type="button" className="icon-button" aria-label="Kembali ke layar awal" onClick={onBackToWelcome}><ArrowLeft size={22} /></button>}<Brand /></header>
      <main className="ob-auth-main">
        <div className="ob-auth-art ob-auth-art-plant"><img src="/assets/generated/sawi.webp" alt="" /></div>
        <div className="ob-auth-heading"><span className="section-label">Kenalan dulu</span><h1>Buat profil Anda</h1><p>Gunakan nama yang mudah dikenali saat membuka kebun.</p></div>
        <form className="ob-auth-form" noValidate onSubmit={saveProfile}>
          <div className="field"><label htmlFor="ob-register-name">Nama panggilan <span className="ob-field-requirement">Wajib</span></label><div className="ob-auth-input"><UserRound size={20} aria-hidden="true" /><input ref={nameRef} id="ob-register-name" type="text" autoComplete="nickname" maxLength={60} value={name} onChange={(event) => { setName(event.target.value); if (errors.name) setErrors((previous) => ({ ...previous, name: '' })); }} placeholder="Nama Anda" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'ob-register-name-error' : undefined} required /></div>{errors.name && <p id="ob-register-name-error" className="field-error" role="alert">{errors.name}</p>}</div>
          <div className="field"><label htmlFor="ob-register-email">Email <span className="ob-field-requirement">Opsional</span></label><div className="ob-auth-input"><Mail size={20} aria-hidden="true" /><input ref={emailRef} id="ob-register-email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => { setEmail(event.target.value); if (errors.email) setErrors((previous) => ({ ...previous, email: '' })); }} placeholder="nama@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'ob-register-email-error' : 'ob-register-email-help'} /></div>{errors.email ? <p id="ob-register-email-error" className="field-error" role="alert">{errors.email}</p> : <p id="ob-register-email-help" className="ob-field-help">Boleh dikosongkan. Belum ada pengiriman atau verifikasi email.</p>}</div>
          <div className="status-note"><ShieldCheck size={19} /><span>Profil dan catatan tersimpan di browser ini. Tidak perlu membuat kata sandi.</span></div>
          <button type="submit" className="app-button app-button--wide"><Check size={20} />Simpan profil dan mulai</button>
        </form>
        <div className="ob-auth-footer"><span>Sudah punya profil di perangkat ini?</span><button type="button" className="text-button" onClick={onNavigateLogin}>Kembali ke profil</button></div>
      </main>
    </div>
  );
}
