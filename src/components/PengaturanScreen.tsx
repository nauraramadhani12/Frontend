import { useEffect, useRef, useState } from 'react';
import { Bell, Check, ChevronRight, CircleHelp, Database, Languages, Leaf, LogOut, Settings, ShieldCheck, Trophy, Volume2, X } from 'lucide-react';
import type { FarmerRank, UserProfile } from '../types/index.ts';
import { playPop, playSparkle } from '../utils/audioEffects.ts';
import { Dialog } from './ui/Dialog.tsx';
import '../styles/secondary.css';

interface PengaturanScreenProps {
  userProfile: UserProfile;
  farmerRank: FarmerRank;
  onOpenEditProfile: () => void;
  onOpenRankPetani: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
}

type SettingsDialog = 'account' | 'about' | 'guide' | 'language' | 'logout' | null;

export function PengaturanScreen({ userProfile, farmerRank, onOpenEditProfile, onOpenRankPetani, onUpdateProfile, onLogout }: PengaturanScreenProps) {
  const [dialog, setDialog] = useState<SettingsDialog>(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progress = farmerRank.targetCare > 0 ? Math.min(100, Math.max(0, (farmerRank.currentCare / farmerRank.targetCare) * 100)) : 0;

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const notify = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(''), 2800);
  };

  const setSound = () => {
    const enabled = !userProfile.soundEnabled;
    onUpdateProfile({ soundEnabled: enabled });
    if (enabled) playSparkle(true);
    notify(enabled ? 'Suara diaktifkan.' : 'Suara dimatikan.');
  };

  const setReminder = () => {
    const enabled = !userProfile.reminderEnabled;
    onUpdateProfile({ reminderEnabled: enabled });
    playPop(userProfile.soundEnabled);
    notify(enabled ? 'Tanda pengingat di beranda diaktifkan.' : 'Tanda pengingat dimatikan.');
  };

  const setTextSize = (size: UserProfile['textSize']) => {
    onUpdateProfile({ textSize: size });
    playPop(userProfile.soundEnabled);
    notify(`Ukuran tulisan ${size === 'small' ? 'kecil' : size === 'large' ? 'besar' : 'normal'} dipilih.`);
  };

  return (
    <div className="sc-screen sc-settings">
      <header className="sc-header">
        <span className="sc-header-symbol" aria-hidden="true"><Settings size={23} /></span>
        <div><h1>Pengaturan</h1><p>Atur kenyamanan aplikasi</p></div>
      </header>

      <main className="sc-main">
        <section className="sc-profile-card" aria-label="Profil Anda">
          <img className="sc-profile-avatar" src={userProfile.avatarUrl || '/assets/generated/avatar-penyuluh.png'} alt="" onError={(event) => { event.currentTarget.src = '/assets/generated/avatar-penyuluh.png'; }} />
          <div className="sc-profile-copy"><h2>{userProfile.name || 'Sobat Tani'}</h2><p>{userProfile.region || 'Lokasi belum diatur'}</p><span>Profil di perangkat ini</span></div>
          <button className="sc-button sc-button-light sc-profile-edit" type="button" onClick={onOpenEditProfile}>Ubah profil<ChevronRight size={17} /></button>
        </section>

        <button className="sc-rank-card" type="button" onClick={onOpenRankPetani}>
          <span className="sc-rank-icon" aria-hidden="true"><Trophy size={24} /></span>
          <span className="sc-rank-copy"><small>Perjalanan merawat</small><strong>{farmerRank.title}</strong><span className="sc-rank-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></span><span>{farmerRank.currentCare} dari {farmerRank.targetCare} catatan perawatan</span></span>
          <ChevronRight size={20} aria-hidden="true" />
        </button>

        <section className="sc-section" aria-labelledby="sc-comfort-title">
          <h2 id="sc-comfort-title">Suara dan pengingat</h2>
          <div className="sc-card sc-preferences">
            <div className="sc-preference-row"><span className="sc-row-icon" aria-hidden="true"><Volume2 size={21} /></span><span className="sc-preference-copy"><strong>Suara aplikasi</strong><small>Bunyi saat memilih dan merawat</small></span><button className={`sc-switch ${userProfile.soundEnabled ? 'is-on' : ''}`} type="button" role="switch" aria-label="Suara aplikasi" aria-checked={userProfile.soundEnabled} onClick={setSound}><span /></button></div>
            <div className="sc-preference-row"><span className="sc-row-icon" aria-hidden="true"><Bell size={21} /></span><span className="sc-preference-copy"><strong>Tanda pengingat</strong><small>Tampil di beranda saat jadwal tiba</small></span><button className={`sc-switch ${userProfile.reminderEnabled ? 'is-on' : ''}`} type="button" role="switch" aria-label="Tanda pengingat" aria-checked={userProfile.reminderEnabled} onClick={setReminder}><span /></button></div>
          </div>
          <p className="sc-field-help">Pengingat muncul saat aplikasi dibuka. Notifikasi perangkat belum tersedia.</p>
        </section>

        <section className="sc-section" aria-labelledby="sc-text-title">
          <h2 id="sc-text-title">Ukuran tulisan</h2>
          <div className="sc-card sc-text-card">
            <div className="sc-text-options" role="group" aria-label="Pilih ukuran tulisan">
              {(['small', 'medium', 'large'] as const).map((size) => <button key={size} type="button" aria-pressed={userProfile.textSize === size} className={userProfile.textSize === size ? 'is-selected' : ''} onClick={() => setTextSize(size)}><span className={`sc-text-letter sc-text-letter-${size}`}>A</span><span>{size === 'small' ? 'Kecil' : size === 'large' ? 'Besar' : 'Normal'}</span>{userProfile.textSize === size && <Check size={15} aria-hidden="true" />}</button>)}
            </div>
            <p className="sc-text-preview">Tanaman dan ternak lebih terawat dengan rutinitas setiap hari.</p>
          </div>
        </section>

        <section className="sc-section" aria-labelledby="sc-help-title">
          <h2 id="sc-help-title">Profil dan bantuan</h2>
          <div className="sc-card sc-link-list">
            <button type="button" onClick={() => setDialog('account')}><ShieldCheck size={21} /><span><strong>Akses akun</strong><small>Informasi profil lokal</small></span><ChevronRight size={18} /></button>
            <button type="button" onClick={() => setDialog('language')}><Languages size={21} /><span><strong>Bahasa</strong><small>Bahasa Indonesia</small></span><ChevronRight size={18} /></button>
            <button type="button" onClick={() => setDialog('guide')}><CircleHelp size={21} /><span><strong>Cara memakai Dewi Sri</strong><small>Pilihan jenis, perawatan, dan foto</small></span><ChevronRight size={18} /></button>
            <button type="button" onClick={() => setDialog('about')}><Leaf size={21} /><span><strong>Tentang Dewi Sri</strong><small>Teman merawat kebun dan ternak</small></span><ChevronRight size={18} /></button>
          </div>
        </section>

        <div className="sc-storage-note"><Database size={20} aria-hidden="true" /><p><strong>Tersimpan di browser ini</strong><span>Profil, jadwal, dan riwayat belum tersinkron ke perangkat lain.</span></p></div>
        <button className="sc-logout-button" type="button" onClick={() => setDialog('logout')}><LogOut size={19} />Keluar ke layar awal</button>
      </main>

      {toast && <div className="sc-toast" role="status"><Check size={18} aria-hidden="true" />{toast}</div>}

      {dialog && <Dialog onClose={() => setDialog(null)} labelledBy="sc-settings-dialog-title" className="sc-dialog">
        <div className="sc-dialog-heading"><h2 id="sc-settings-dialog-title">{dialog === 'account' ? 'Profil lokal' : dialog === 'about' ? 'Tentang Dewi Sri' : dialog === 'language' ? 'Bahasa aplikasi' : dialog === 'logout' ? 'Keluar ke layar awal?' : 'Cara memakai Dewi Sri'}</h2><button type="button" className="sc-icon-button" aria-label="Tutup informasi" onClick={() => setDialog(null)}><X size={21} /></button></div>
        {dialog === 'account' && <><span className="sc-dialog-illustration" aria-hidden="true"><ShieldCheck size={34} /></span><p>Profil ini tersimpan di browser perangkat Anda. Login saat ini merupakan pratinjau lokal dan belum memakai akun server atau kata sandi.</p><p className="sc-dialog-note">Data profil dapat diubah melalui tombol Ubah profil.</p><button type="button" className="sc-button sc-button-primary" onClick={() => setDialog(null)}>Mengerti</button></>}
        {dialog === 'about' && <><span className="sc-dialog-illustration" aria-hidden="true"><Leaf size={34} /></span><p>Dewi Sri membantu petani rumahan mencatat perawatan tanaman, ikan, dan ayam dengan panduan yang mudah diikuti.</p><p className="sc-dialog-note">Versi frontend ini memakai data lokal. Cuaca langsung, analisis gambar AI, dan sinkronisasi akun belum terhubung.</p><button type="button" className="sc-button sc-button-primary" onClick={() => setDialog(null)}>Mengerti</button></>}
        {dialog === 'language' && <><p>Saat ini aplikasi tersedia dalam Bahasa Indonesia.</p><div className="sc-language-choice"><Check size={20} aria-hidden="true" />Bahasa Indonesia<span>Dipilih</span></div><button type="button" className="sc-button sc-button-primary" onClick={() => setDialog(null)}>Mengerti</button></>}
        {dialog === 'guide' && <><ol className="sc-guide-list"><li><strong>Pilih yang dirawat.</strong><span>Pilih kategori tanaman, ikan, atau ayam, lalu tentukan jenisnya.</span></li><li><strong>Catat perawatan.</strong><span>Gunakan tombol Rawat dan atur waktu kegiatan di Jadwal.</span></li><li><strong>Gunakan foto.</strong><span>Ambil atau pilih foto, lalu pilih jenis dan kebutuhan untuk melihat panduan lokal.</span></li><li><strong>Baca lagi jawabannya.</strong><span>Percakapan tersimpan di Riwayat konsultasi.</span></li></ol><p className="sc-dialog-note">Panduan foto berdasarkan pilihan Anda. Foto belum dianalisis secara otomatis.</p><button type="button" className="sc-button sc-button-primary" onClick={() => setDialog(null)}>Sudah mengerti</button></>}
        {dialog === 'logout' && <><span className="sc-dialog-illustration sc-dialog-illustration-danger" aria-hidden="true"><LogOut size={32} /></span><p>Profil dan catatan tetap tersimpan di browser ini. Anda dapat membukanya lagi saat kembali ke aplikasi.</p><div className="sc-dialog-actions"><button type="button" className="sc-button sc-button-light" onClick={() => setDialog(null)}>Batal</button><button type="button" className="sc-button sc-button-danger" onClick={() => { setDialog(null); onLogout(); }}>Ya, keluar</button></div></>}
      </Dialog>}
    </div>
  );
}
