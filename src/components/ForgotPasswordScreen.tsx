import { ArrowLeft, Database, ShieldCheck } from 'lucide-react';
import { Brand } from './ui/Brand.tsx';
import '../styles/onboarding.css';

interface ForgotPasswordScreenProps { onBackToLogin: () => void; }

export function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  return (
    <div className="ob-screen ob-auth">
      <header className="ob-auth-header"><button type="button" className="icon-button" onClick={onBackToLogin} aria-label="Kembali ke profil"><ArrowLeft size={22} /></button><Brand /></header>
      <main className="ob-auth-main ob-access-main">
        <span className="ob-access-symbol" aria-hidden="true"><ShieldCheck size={43} /></span>
        <div className="ob-auth-heading"><span className="section-label">Tentang akses</span><h1>Profil tersimpan di sini</h1><p>Dewi Sri saat ini memakai profil lokal di browser perangkat Anda.</p></div>
        <div className="ob-access-card"><h2>Bagaimana cara masuk?</h2><p>Anda dapat langsung melanjutkan tanpa email, atau mengisi email sebagai keterangan profil. Aplikasi belum memakai kata sandi atau akun server.</p></div>
        <div className="ob-access-card"><h2>Bagaimana dengan catatan saya?</h2><p>Keluar ke layar awal tetap menyimpan profil dan progres. Data belum dicadangkan atau disinkron ke perangkat lain.</p></div>
        <div className="status-note status-note--warning"><Database size={20} /><span>Menghapus data browser dapat menghapus profil, jadwal, dan riwayat yang tersimpan.</span></div>
        <button type="button" className="app-button app-button--wide" onClick={onBackToLogin}><ArrowLeft size={19} />Kembali ke profil</button>
      </main>
    </div>
  );
}
