import { useState } from 'react';
import { ArrowRight, Bell, Bird, BookOpen, CalendarDays, Camera, Check, ChevronRight, CloudSun, Fish, History, MapPin, NotebookPen, Sprout, Trophy, Volume2, VolumeX, X } from 'lucide-react';
import type { ActiveScreen, PetState, PetType, PetVariety, UserProfile } from '../types/index.ts';
import type { CareSlot } from '../data/care.ts';
import { ACTION_ART, GARDEN_CATEGORIES } from '../data/garden.ts';
import { getSpecies } from '../data/species.ts';
import { getScheduledCare } from '../utils/careSchedule.ts';
import type { CareSchedules, ScheduledCare } from '../utils/careSchedule.ts';
import { Brand } from './ui/Brand.tsx';
import { Dialog } from './ui/Dialog.tsx';
import { PetVarietyModal } from './PetVarietyModal.tsx';
import { CareDialog } from './garden/CareDialog.tsx';
import { GuideDialog } from './garden/GuideDialog.tsx';
import { ScheduleItems } from './garden/ScheduleItems.tsx';

interface BerandaScreenProps {
  currentPet: PetState;
  allPets: Record<PetType, PetState>;
  userProfile: UserProfile;
  now: { date: string; time: string };
  schedules: CareSchedules;
  totalCareCount: number;
  totalPoints: number;
  streakDays: number;
  dailyClaimed: boolean;
  onClaimDailyReward: () => void;
  onSelectVariety: (type: PetType, variety: PetVariety) => void;
  onCareAction: (slot: CareSlot) => void;
  onCompleteScheduled: (entry: ScheduledCare) => void;
  onToggleSound: () => void;
  onPhoto: () => void;
  onNavigate: (screen: ActiveScreen) => void;
}

const CATEGORY_ICONS = { tunas: Sprout, koki: Fish, kuning: Bird };
type HomePanel = 'care' | 'guide' | 'species' | 'weather' | null;

export function BerandaScreen({ currentPet, allPets, userProfile, now, schedules, totalCareCount, totalPoints, streakDays, dailyClaimed, onClaimDailyReward, onSelectVariety, onCareAction, onCompleteScheduled, onToggleSound, onPhoto, onNavigate }: BerandaScreenProps) {
  const [panel, setPanel] = useState<HomePanel>(null);
  const [choiceType, setChoiceType] = useState(currentPet.type);
  const species = getSpecies(currentPet.type, currentPet.variety);
  const category = GARDEN_CATEGORIES[currentPet.type];
  const entries = getScheduledCare(schedules);
  const pending = entries.filter((entry) => entry.doneOn !== now.date);
  const due = userProfile.reminderEnabled ? pending.filter((entry) => entry.time <= now.time) : [];
  const visibleEntries = [...pending, ...entries.filter((entry) => entry.doneOn === now.date)].slice(0, 2);
  const hour = Number(now.time.slice(0, 2));
  const greeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam';
  const name = userProfile.name === 'Sobat Tani' ? 'Sobat Tani' : userProfile.name.split(' ')[0];
  const openSpecies = (type: PetType) => { setChoiceType(type); setPanel('species'); };
  const openPhoto = () => { setPanel(null); onPhoto(); };

  return <main className="garden-home-v2 app-content">
    <header className="gh-header"><Brand /><div className="gh-header-actions"><button className="icon-button gh-sound" type="button" onClick={onToggleSound} aria-label={userProfile.soundEnabled ? 'Matikan suara' : 'Aktifkan suara'} aria-pressed={userProfile.soundEnabled}>{userProfile.soundEnabled ? <Volume2 size={19} /> : <VolumeX size={19} />}</button><button type="button" className="gh-profile" onClick={() => onNavigate('pengaturan')}><img src={userProfile.avatarUrl} alt="" /><span>Profil</span></button></div></header>
    <div className="gh-greeting"><p>{greeting}, {name}.</p><h1>Kebun hari ini</h1><button className="gh-schedule-bell" type="button" onClick={() => onNavigate('jadwal')} aria-label={due.length ? `Buka jadwal, ${due.length} kegiatan sudah waktunya` : 'Buka jadwal perawatan'}><Bell size={21} />{due.length > 0 && <span>{due.length}</span>}</button></div>

    <section className="gh-garden" aria-label="Pilihan tanaman dan ternak">
      <div className="gh-categories">{(Object.keys(GARDEN_CATEGORIES) as PetType[]).map((type) => { const Icon = CATEGORY_ICONS[type]; return <button key={type} type="button" className={type === currentPet.type ? 'is-active' : ''} onClick={() => openSpecies(type)} aria-haspopup="dialog" aria-label={`Pilih jenis ${GARDEN_CATEGORIES[type].label.toLowerCase()}`}><Icon size={19} aria-hidden="true" /><span>{GARDEN_CATEGORIES[type].label}</span></button>; })}</div>
      <div className={`gh-habitat gh-habitat--${currentPet.type}`} style={{ backgroundImage: `url('${category.image}')` }}>
        <div className="gh-habitat-heading"><div><span>{category.habitat}</span><h2>{species.label}</h2></div><button type="button" onClick={() => openSpecies(currentPet.type)} aria-label={`Ganti jenis ${category.label.toLowerCase()}`}>Ganti <ChevronRight size={15} /></button></div>
        <button type="button" className="gh-subject" onClick={() => setPanel('care')} aria-label={`Buka perawatan ${species.label}`}><img key={species.id} src={species.image} alt={species.label} width={260} height={250} fetchPriority="high" draggable={false} /></button>
        <span className="gh-habitat-note">{species.note}</span>
      </div>
    </section>

    <section className="gh-main-actions" aria-label="Kegiatan utama">
      <button type="button" onClick={() => setPanel('care')}><span className="gh-action-art"><img src={ACTION_ART.care} alt="" width={100} height={90} /></span><strong>Rawat</strong><span>{currentPet.type === 'tunas' ? 'Siram & pupuk' : currentPet.type === 'koki' ? 'Pakan & air' : 'Pakan & kandang'}</span></button>
      <button type="button" onClick={openPhoto}><span className="gh-action-art"><img src={ACTION_ART.photo} alt="" width={100} height={90} /></span><strong>Foto kondisi</strong><span>Cari panduan</span></button>
      <button type="button" onClick={() => onNavigate('jadwal')}><span className="gh-action-art"><img src={ACTION_ART.schedule} alt="" width={100} height={90} /></span><strong>Jadwal</strong><span>Rutinitas harian</span></button>
    </section>

    <section className="gh-today" aria-labelledby="today-heading"><div className="section-title"><h2 id="today-heading">Jadwal hari ini</h2><button className="text-button" type="button" onClick={() => onNavigate('jadwal')}>Lihat semua <ChevronRight size={16} /></button></div>
      {entries.length ? <><p className="gh-today-count">{entries.length - pending.length} dari {entries.length} kegiatan selesai</p><ScheduleItems entries={visibleEntries} today={now.date} onComplete={onCompleteScheduled} /></> : <div className="gh-empty-schedule"><img src={ACTION_ART.schedule} alt="" width={82} height={82} /><div><h3>Belum ada jadwal</h3><p>Atur waktu untuk merawat.</p><button className="text-button" type="button" onClick={() => onNavigate('jadwal')}>Buat jadwal <ArrowRight size={16} /></button></div></div>}
    </section>

    <section className="gh-more" aria-labelledby="more-heading"><h2 id="more-heading">Panduan & catatan</h2><div className="gh-feature-grid">
      <button type="button" onClick={() => setPanel('guide')}><BookOpen size={23} /><span>{currentPet.type === 'tunas' ? 'Panduan budidaya' : currentPet.type === 'kuning' ? 'Panduan ayam & telur' : 'Panduan ikan'}</span><ChevronRight size={17} /></button>
      <button type="button" onClick={() => onNavigate('jurnal')}><NotebookPen size={23} /><span>Jurnal perawatan</span><ChevronRight size={17} /></button>
      <button type="button" onClick={() => onNavigate('chat_history')}><History size={23} /><span>Riwayat konsultasi</span><ChevronRight size={17} /></button>
      <button type="button" onClick={() => setPanel('weather')}><CloudSun size={23} /><span>Cuaca tani</span><ChevronRight size={17} /></button>
    </div></section>

    <section className="gh-journey" aria-label="Perjalanan tani"><button className="gh-journey-link" type="button" onClick={() => onNavigate('rank_petani')}><span className="gh-journey-icon"><Trophy size={22} /></span><span><strong>Perjalanan tani</strong><small>{totalCareCount} perawatan · {totalPoints} poin{streakDays > 0 ? ` · ${streakDays} hari rutin` : ''}</small></span><ChevronRight size={18} /></button><button className={`gh-checkin ${dailyClaimed ? 'is-done' : ''}`} type="button" onClick={onClaimDailyReward} disabled={dailyClaimed}>{dailyClaimed ? <><Check size={17} />Kunjungan hari ini tercatat</> : <>Catat kunjungan hari ini <span>+5 poin</span></>}</button></section>

    {panel === 'species' && <PetVarietyModal petType={choiceType} pets={allPets} onSelectVariety={onSelectVariety} onClose={() => setPanel(null)} />}
    {panel === 'care' && <CareDialog pet={currentPet} onCare={onCareAction} onClose={() => setPanel(null)} />}
    {panel === 'guide' && <GuideDialog pet={currentPet} onClose={() => setPanel(null)} onPhoto={openPhoto} />}
    {panel === 'weather' && <Dialog onClose={() => setPanel(null)} labelledBy="weather-title"><div className="dialog-top"><div><span className="section-label">Cuaca tani</span><h2 id="weather-title">Rencanakan perawatan</h2></div><button type="button" className="icon-button" onClick={() => setPanel(null)} aria-label="Tutup cuaca"><X size={21} /></button></div><div className="weather-placeholder"><CloudSun size={57} /><strong>Prakiraan belum terhubung</strong><p>Cuaca langsung akan tersedia setelah layanan cuaca disambungkan.</p></div><p className="weather-location"><MapPin size={18} />{userProfile.region || 'Lokasi belum diatur'}</p><button className="app-button app-button--secondary app-button--wide" type="button" onClick={() => onNavigate('edit_profile')}>Atur lokasi kebun</button><p className="dialog-footer-note">Untuk sekarang, cek prakiraan resmi sebelum menyiram atau memupuk.</p></Dialog>}
  </main>;
}
