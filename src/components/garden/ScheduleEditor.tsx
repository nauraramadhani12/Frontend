import { useState } from 'react';
import { CalendarDays, X } from 'lucide-react';
import type { PetState, PetType, PetVariety } from '../../types/index.ts';
import { CARE_ACTIONS } from '../../data/care.ts';
import type { CareSlot } from '../../data/care.ts';
import { SPECIES, getSpecies } from '../../data/species.ts';
import { GARDEN_CATEGORIES } from '../../data/garden.ts';
import { getSchedule } from '../../utils/careSchedule.ts';
import type { CareSchedules, ScheduledCare } from '../../utils/careSchedule.ts';
import { isTimeKey } from '../../utils/dateTime.ts';
import { Dialog } from '../ui/Dialog.tsx';

export function ScheduleEditor({ currentPet, entry, schedules, onSave, onRemove, onClose }: { currentPet: PetState; entry?: ScheduledCare; schedules: CareSchedules; onSave: (variety: PetVariety, slot: CareSlot, time: string) => void; onRemove: (variety: PetVariety, slot: CareSlot) => void; onClose: () => void }) {
  const [type, setType] = useState<PetType>(entry?.type || currentPet.type);
  const [variety, setVariety] = useState<PetVariety>(entry?.variety || currentPet.variety || SPECIES[currentPet.type][0].id);
  const [slot, setSlot] = useState<CareSlot>(entry?.slot || 'action1');
  const [time, setTime] = useState(entry?.time || '07:00');
  const [error, setError] = useState('');
  const species = getSpecies(type, variety);
  const existing = getSchedule(schedules, variety, slot);
  return <Dialog onClose={onClose} labelledBy="schedule-editor-title"><div className="dialog-top"><div><span className="section-label">Rutinitas harian</span><h2 id="schedule-editor-title">{entry ? 'Ubah jadwal' : 'Buat jadwal'}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Tutup pengaturan jadwal"><X size={21} /></button></div>
    <form className="schedule-editor-form" onSubmit={(event) => { event.preventDefault(); if (!isTimeKey(time)) { setError('Pilih waktu perawatan.'); return; } onSave(variety, slot, time); onClose(); }}>
      {entry ? <div className="schedule-editor-summary"><img src={species.image} alt="" /><div><strong>{species.label}</strong><small>{CARE_ACTIONS[type].find((action) => action.slot === slot)?.label}</small></div></div> : <>
        <div className="field"><label htmlFor="schedule-category">Yang ingin dirawat</label><select id="schedule-category" value={type} onChange={(event) => { const next = event.target.value as PetType; setType(next); setVariety(SPECIES[next][0].id); setSlot('action1'); }}>{(Object.keys(GARDEN_CATEGORIES) as PetType[]).map((type) => <option value={type} key={type}>{GARDEN_CATEGORIES[type].label}</option>)}</select></div>
        <div className="field"><label htmlFor="schedule-species">Jenis {GARDEN_CATEGORIES[type].label.toLowerCase()}</label><select id="schedule-species" value={variety} onChange={(event) => setVariety(event.target.value as PetVariety)}>{SPECIES[type].map((species) => <option value={species.id} key={species.id}>{species.label}</option>)}</select></div>
        <div className="field"><label htmlFor="schedule-action">Kegiatan</label><select id="schedule-action" value={slot} onChange={(event) => setSlot(event.target.value as CareSlot)}>{CARE_ACTIONS[type].map((action) => <option value={action.slot} key={action.slot}>{action.label}</option>)}</select></div>
      </>}
      <div className="field"><label htmlFor="schedule-time">Waktu (WIB)</label><input id="schedule-time" type="time" value={time} required onChange={(event) => { setTime(event.target.value); setError(''); }} aria-describedby={error ? 'schedule-time-error' : undefined} />{error && <p id="schedule-time-error" className="field-error" role="alert">{error}</p>}</div>
      <p className="schedule-editor-repeat"><CalendarDays size={19} />Diulang setiap hari</p>
      {!entry && existing?.enabled && <p className="status-note">Kegiatan ini sudah dijadwalkan. Waktunya akan diperbarui.</p>}
      <button className="app-button app-button--wide" type="submit">Simpan jadwal</button>
      {entry && <button className="schedule-delete" type="button" onClick={() => { onRemove(variety, slot); onClose(); }}>Hapus jadwal ini</button>}
    </form>
  </Dialog>;
}
