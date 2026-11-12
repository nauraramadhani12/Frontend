import { useState } from 'react';
import { Info, Plus } from 'lucide-react';
import type { PetState, PetVariety } from '../types/index.ts';
import type { CareSlot } from '../data/care.ts';
import { ACTION_ART } from '../data/garden.ts';
import { getScheduledCare } from '../utils/careSchedule.ts';
import type { CareSchedules, ScheduledCare } from '../utils/careSchedule.ts';
import { ScheduleItems } from './garden/ScheduleItems.tsx';
import { ScheduleEditor } from './garden/ScheduleEditor.tsx';

export function ScheduleScreen({ currentPet, schedules, now, onSave, onRemove, onComplete }: { currentPet: PetState; schedules: CareSchedules; now: { date: string; time: string }; onSave: (variety: PetVariety, slot: CareSlot, time: string) => void; onRemove: (variety: PetVariety, slot: CareSlot) => void; onComplete: (entry: ScheduledCare) => void }) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');
  const [editor, setEditor] = useState<ScheduledCare | 'new' | null>(null);
  const entries = getScheduledCare(schedules);
  const completeCount = entries.filter((entry) => entry.doneOn === now.date).length;
  const visible = entries.filter((entry) => filter === 'all' || (filter === 'done' ? entry.doneOn === now.date : entry.doneOn !== now.date));
  const dateLabel = new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${now.date}T00:00:00+07:00`));
  return <main className="schedule-page app-content"><header className="page-heading"><div><span className="section-label">Rutinitas harian</span><h1>Jadwal perawatan</h1><p>{dateLabel} · WIB</p></div><button className="icon-button" type="button" onClick={() => setEditor('new')} aria-label="Tambah jadwal"><Plus size={23} /></button></header>
    <section className="schedule-summary" aria-label={`${completeCount} dari ${entries.length} kegiatan selesai`}><img src={ACTION_ART.schedule} alt="" /><div><strong>{entries.length ? `${completeCount} dari ${entries.length} selesai` : 'Sedikit, setiap hari'}</strong><p>{entries.length ? 'Perawatan hari ini sudah tercatat.' : 'Atur perawatan kebun dan ternak.'}</p>{entries.length > 0 && <progress value={completeCount} max={entries.length} />}</div></section>
    {entries.length > 0 && <><button className="app-button app-button--secondary app-button--wide" type="button" onClick={() => setEditor('new')}><Plus size={19} />Tambah jadwal</button><div className="schedule-filters" role="group" aria-label="Tampilkan jadwal">{[{ id: 'all', label: 'Semua' }, { id: 'pending', label: 'Belum selesai' }, { id: 'done', label: 'Selesai' }].map((item) => <button key={item.id} type="button" className={filter === item.id ? 'is-active' : ''} aria-pressed={filter === item.id} onClick={() => setFilter(item.id as typeof filter)}>{item.label}</button>)}</div></>}
    {visible.length ? <ScheduleItems entries={visible} today={now.date} onComplete={onComplete} onEdit={setEditor} /> : <div className="schedule-empty">{entries.length ? <><h2>{filter === 'done' ? 'Belum ada yang dicatat selesai' : 'Semua kegiatan sudah selesai'}</h2><p>{filter === 'done' ? 'Catat kegiatan setelah perawatan dilakukan.' : 'Jadwal kembali siap untuk besok.'}</p></> : <><img src={ACTION_ART.care} alt="" /><h2>Mulai dari satu kegiatan</h2><p>Pilih tanaman atau ternak, tentukan kegiatan dan waktunya.</p><button className="app-button" type="button" onClick={() => setEditor('new')}><Plus size={18} />Buat jadwal pertama</button></>}</div>}
    <p className="status-note"><Info size={18} /><span>Jadwal diulang setiap hari dan tersimpan di perangkat ini. Notifikasi perangkat belum aktif.</span></p>
    {editor && <ScheduleEditor currentPet={currentPet} entry={editor === 'new' ? undefined : editor} schedules={schedules} onSave={onSave} onRemove={onRemove} onClose={() => setEditor(null)} />}
  </main>;
}
