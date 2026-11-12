import { useState } from 'react';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import type { CareRecord } from '../utils/careJournal.ts';
import { groupCareRecordsByDate } from '../utils/careJournal.ts';
import { getSpecies } from '../data/species.ts';
import { getCareAction } from '../data/care.ts';
import { ACTION_ART } from '../data/garden.ts';

export function CareJournalScreen({ records, onBack, onOpenSchedule }: { records: CareRecord[]; onBack: () => void; onOpenSchedule: () => void }) {
  const [visibleCount, setVisibleCount] = useState(30);
  const groups = groupCareRecordsByDate(records.slice(0, visibleCount));
  return <main className="schedule-page app-content"><header className="page-heading"><button className="icon-button" type="button" onClick={onBack} aria-label="Kembali ke beranda"><ArrowLeft size={21} /></button><div><h1>Jurnal perawatan</h1><p>Catatan kegiatan yang sudah dilakukan</p></div></header>
    {records.length ? <><p className="journal-count"><strong>{records.length} kegiatan</strong> sudah dicatat di perangkat ini.</p><div className="journal-groups">{groups.map((group) => <section className="journal-group" key={group.date}><h2>{new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${group.date}T00:00:00+07:00`))}</h2>{group.records.map((record) => { const species = getSpecies(record.type, record.variety); return <article key={record.id} className="journal-entry"><img src={species.image} alt="" /><div><h3>{getCareAction(record.type, record.slot).label} {species.label}</h3><p>Perawatan dicatat</p></div><time dateTime={record.createdAt}>{new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' }).format(new Date(record.createdAt))}</time></article>; })}</section>)}</div>{visibleCount < records.length && <button className="app-button app-button--plain" type="button" onClick={() => setVisibleCount((previous) => previous + 30)}>Tampilkan catatan sebelumnya</button>}</> : <div className="schedule-empty"><img src={ACTION_ART.care} alt="" /><h2>Catatan pertamamu dimulai di sini</h2><p>Setelah merawat, tekan Catat pada jadwal atau pilih aksi di menu Rawat.</p><button className="app-button" type="button" onClick={onOpenSchedule}><CalendarDays size={18} />Buka jadwal</button></div>}
  </main>;
}
