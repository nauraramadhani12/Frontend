import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, Camera, Check, Fish, Leaf, MapPin, Save, UserRound, Wheat } from 'lucide-react';
import type { UserProfile } from '../types/index.ts';
import { playPop, playSparkle } from '../utils/audioEffects.ts';
import '../styles/secondary.css';

interface EditProfileScreenProps {
  userProfile: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
  onBack: () => void;
}

type CareFocus = UserProfile['careFocus'][number];

export function EditProfileScreen({ userProfile, onSaveProfile, onBack }: EditProfileScreenProps) {
  const [name, setName] = useState(userProfile.name);
  const [region, setRegion] = useState(userProfile.region);
  const [focusList, setFocusList] = useState<CareFocus[]>(userProfile.careFocus?.length ? userProfile.careFocus : ['tanaman']);
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || '/assets/generated/avatar-penyuluh.png');
  const [avatarError, setAvatarError] = useState('');
  const [nameError, setNameError] = useState('');
  const [focusError, setFocusError] = useState('');
  const [isReadingPhoto, setIsReadingPhoto] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, []);

  const handleAvatarUpload = async (file?: File) => {
    if (!file) return;
    setAvatarError('');
    if (!file.type.startsWith('image/')) { setAvatarError('Pilih berkas foto seperti JPG, PNG, atau WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { setAvatarError('Ukuran foto maksimal 12 MB. Pilih foto yang lebih kecil.'); return; }
    setIsReadingPhoto(true);
    const objectUrl = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = objectUrl;
      await image.decode();
      if (!image.naturalWidth || !image.naturalHeight) throw new Error('Invalid image');
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      const side = Math.min(image.naturalWidth, image.naturalHeight);
      context.fillStyle = '#fff8f5';
      context.fillRect(0, 0, 256, 256);
      context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, 256, 256);
      if (mounted.current) setAvatarUrl(canvas.toDataURL('image/jpeg', 0.8));
    } catch {
      if (mounted.current) setAvatarError('Foto belum bisa dibaca. Coba pilih foto lain.');
    } finally {
      URL.revokeObjectURL(objectUrl);
      if (mounted.current) setIsReadingPhoto(false);
    }
  };

  const toggleFocus = (focus: CareFocus) => {
    playPop(userProfile.soundEnabled);
    setFocusList((previous) => previous.includes(focus) ? previous.filter((item) => item !== focus) : [...previous, focus]);
    setFocusError('');
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saved || isReadingPhoto) return;
    if (!name.trim()) { setNameError('Tulis nama yang ingin ditampilkan.'); nameInputRef.current?.focus(); return; }
    if (!focusList.length) { setFocusError('Pilih setidaknya satu jenis yang ingin dirawat.'); firstFocusRef.current?.focus(); return; }
    setNameError('');
    onSaveProfile({ name: name.trim(), region: region.trim(), careFocus: focusList, avatarUrl });
    playSparkle(userProfile.soundEnabled);
    setSaved(true);
    returnTimer.current = setTimeout(onBack, 1000);
  };

  return (
    <div className="sc-screen sc-edit-profile">
      <header className="sc-header"><button type="button" className="sc-icon-button" onClick={onBack} aria-label="Kembali ke pengaturan"><ArrowLeft size={23} /></button><div><h1>Ubah profil</h1><p>Nama dan kebun Anda</p></div></header>
      <main className="sc-main">
        <form className="sc-profile-form" onSubmit={handleSave} noValidate>
          <section className="sc-avatar-section" aria-labelledby="sc-photo-label">
            <div className="sc-avatar-preview"><img src={avatarUrl} alt="Pratinjau foto profil" onError={(event) => { event.currentTarget.src = '/assets/generated/avatar-penyuluh.png'; }} /></div>
            <div><h2 id="sc-photo-label">Foto profil</h2><p>Foto disimpan di perangkat ini.</p><button type="button" className="sc-button sc-button-light" onClick={() => fileInputRef.current?.click()} disabled={isReadingPhoto || saved}><Camera size={17} />{isReadingPhoto ? 'Membaca foto…' : 'Ganti foto'}</button></div>
            <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" tabIndex={-1} aria-label="Pilih foto profil" onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; void handleAvatarUpload(file); }} />
          </section>
          {avatarError && <p className="sc-field-error" role="alert">{avatarError}</p>}

          <div className="sc-card sc-form-card">
            <div className="sc-field"><label htmlFor="sc-name">Nama panggilan <span>Wajib</span></label><div className="sc-input-wrap"><UserRound size={19} aria-hidden="true" /><input ref={nameInputRef} id="sc-name" type="text" autoComplete="nickname" maxLength={60} value={name} onChange={(event) => { setName(event.target.value); if (nameError) setNameError(''); }} placeholder="Nama yang ingin ditampilkan" aria-invalid={Boolean(nameError)} aria-describedby={nameError ? 'sc-name-error' : undefined} disabled={saved} /></div>{nameError && <p id="sc-name-error" className="sc-field-error" role="alert">{nameError}</p>}</div>
            <div className="sc-field"><label htmlFor="sc-region">Daerah tempat tinggal <span>Opsional</span></label><div className="sc-input-wrap"><MapPin size={19} aria-hidden="true" /><input id="sc-region" type="text" autoComplete="address-level2" maxLength={100} value={region} onChange={(event) => setRegion(event.target.value)} placeholder="Contoh: Bandung, Jawa Barat" disabled={saved} /></div><p className="sc-field-help">Cukup nama kota atau kabupaten, tanpa alamat lengkap.</p></div>
            <fieldset className="sc-focus-field" aria-describedby={focusError ? 'sc-focus-error' : undefined}><legend>Yang ingin dirawat</legend><p>Pilih satu atau lebih.</p><div className="sc-focus-options">{[{ id: 'tanaman' as const, label: 'Tanaman', Icon: Leaf }, { id: 'ikan' as const, label: 'Ikan', Icon: Fish }, { id: 'ayam' as const, label: 'Ayam', Icon: Wheat }].map(({ id, label, Icon }, index) => <button ref={index === 0 ? firstFocusRef : undefined} key={id} type="button" className={focusList.includes(id) ? 'is-selected' : ''} aria-pressed={focusList.includes(id)} onClick={() => toggleFocus(id)} disabled={saved}><Icon size={23} /><span>{label}</span>{focusList.includes(id) && <Check size={15} className="sc-focus-check" />}</button>)}</div>{focusError && <p id="sc-focus-error" className="sc-field-error" role="alert">{focusError}</p>}</fieldset>
            <div className="sc-field"><label htmlFor="sc-profile-email">Email profil <span>Pratinjau lokal</span></label><input id="sc-profile-email" type="email" className="sc-readonly-input" value={userProfile.email || ''} readOnly placeholder="Belum diisi" /><p className="sc-field-help">Email belum diverifikasi dan belum terhubung ke akun server.</p></div>
          </div>
          <div className="sc-form-actions"><button type="submit" className="sc-button sc-button-primary" disabled={isReadingPhoto || saved}>{saved ? <Check size={20} /> : <Save size={20} />}{saved ? 'Perubahan tersimpan' : 'Simpan perubahan'}</button><button type="button" className="sc-button sc-button-plain" onClick={onBack} disabled={saved}>Batal</button></div>
          {saved && <p className="sc-save-confirmation" role="status"><Check size={18} />Profil tersimpan di browser ini.</p>}
        </form>
      </main>
    </div>
  );
}
