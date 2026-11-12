import { ArrowRight, CalendarDays, Camera, Leaf } from 'lucide-react';
import { Brand } from './ui/Brand.tsx';
import '../styles/onboarding.css';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export function WelcomeScreen({ onStart, onOpenLogin, onOpenRegister }: WelcomeScreenProps) {
  return (
    <main className="ob-screen ob-welcome">
      <header className="ob-welcome-header"><Brand /></header>
      <div className="ob-welcome-intro"><span className="section-label">Kebun dan ternak rumahan</span><h1>Merawat setiap hari,<br />jadi lebih mudah.</h1><p>Pilih yang dirawat, atur jadwal, lalu cari panduan lewat foto.</p></div>
      <div className="ob-welcome-landscape" aria-hidden="true"><img className="ob-welcome-plant" src="/assets/generated/kangkung.webp" alt="" /><span className="ob-welcome-garden-label"><Leaf size={16} />Kebun kecil Anda</span></div>
      <div className="ob-species-strip" aria-label="Untuk tanaman, ikan, dan ayam">
        <div><img src="/assets/generated/selada.webp" alt="" /><span>Tanaman</span></div>
        <div><img src="/assets/generated/nila.webp" alt="" /><span>Ikan</span></div>
        <div><img src="/assets/generated/ayam-petelur.webp" alt="" /><span>Ayam</span></div>
      </div>
      <div className="ob-welcome-benefits"><span><CalendarDays size={17} />Jadwal harian</span><span><Camera size={17} />Panduan foto</span></div>
      <div className="ob-welcome-actions"><button id="btn-start" type="button" className="app-button app-button--wide" onClick={onStart}>Mulai merawat<ArrowRight size={19} /></button><p>Bisa langsung digunakan tanpa akun.</p>{(onOpenLogin || onOpenRegister) && <div className="ob-welcome-profile-links">{onOpenLogin && <button type="button" onClick={onOpenLogin}>Buka profil</button>}{onOpenRegister && <button type="button" onClick={onOpenRegister}>Buat profil lokal</button>}</div>}</div>
    </main>
  );
}
