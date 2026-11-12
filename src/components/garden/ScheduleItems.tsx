import { Check, ChevronRight, Clock3, Pencil } from 'lucide-react';
import type { ScheduledCare } from '../../utils/careSchedule.ts';
import { getSpecies } from '../../data/species.ts';
import { getCareAction } from '../../data/care.ts';

export function ScheduleItems({ entries, today, onComplete, onEdit }: { entries: ScheduledCare[]; today: string; onComplete: (entry: ScheduledCare) => void; onEdit?: (entry: ScheduledCare) => void }) {
  return <div className="schedule-cards">{entries.map((entry) => {
    const species = getSpecies(entry.type, entry.variety);
    const action = getCareAction(entry.type, entry.slot);
    const done = entry.doneOn === today;
    return <article className={`schedule-card ${done ? 'is-done' : ''}`} key={entry.key}><img src={species.image} alt="" /><div className="schedule-card-copy"><span><Clock3 size={13} />{entry.time} WIB</span><h3>{action.label} {species.label}</h3>{done && <small><Check size={13} />Sudah dicatat hari ini</small>}</div><div className="schedule-card-actions"><button className={done ? 'schedule-complete is-done' : 'schedule-complete'} type="button" disabled={done} onClick={() => onComplete(entry)} aria-label={done ? `${action.label} ${species.label} selesai` : `Tandai ${action.label.toLowerCase()} ${species.label} selesai`}><Check size={19} /><span>{done ? 'Selesai' : 'Catat'}</span></button>{onEdit && <button className="schedule-edit" type="button" onClick={() => onEdit(entry)} aria-label={`Ubah jadwal ${action.label.toLowerCase()} ${species.label}`}><Pencil size={15} /><span>Ubah</span></button>}</div></article>;
  })}</div>;
}
