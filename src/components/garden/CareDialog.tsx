import { Check, ChevronRight, Info, X } from 'lucide-react';
import type { PetState } from '../../types/index.ts';
import { CARE_ACTIONS } from '../../data/care.ts';
import type { CareSlot } from '../../data/care.ts';
import { getSpecies } from '../../data/species.ts';
import { CareIcon } from './CareIcon.tsx';
import { Dialog } from '../ui/Dialog.tsx';
import { useState } from 'react';

export function CareDialog({ pet, onCare, onClose }: { pet: PetState; onCare: (slot: CareSlot) => void; onClose: () => void }) {
  const species = getSpecies(pet.type, pet.variety);
  const [feedback, setFeedback] = useState('');
  const metrics = [{ label: pet.stat1Name, value: pet.stat1 }, { label: pet.stat2Name, value: pet.stat2 }, { label: 'Perawatan', value: pet.stat3 }];
  return <Dialog onClose={onClose} labelledBy="care-title" className="care-panel">
    <div className="dialog-top"><div><span className="section-label">Catatan perawatan</span><h2 id="care-title">Rawat {species.label}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Tutup perawatan"><X size={21} /></button></div>
    <div className="care-subject-card"><img src={species.image} alt="" /><div><strong>{species.label}</strong><p>{species.note}</p><small>Catat kegiatan yang sudah dilakukan.</small></div></div>
    <div className="care-buttons">{CARE_ACTIONS[pet.type].map((action) => <button type="button" key={action.slot} onClick={() => { onCare(action.slot); setFeedback(`${action.label} ${species.label} sudah dicatat.`); }}><span className="care-button-icon"><CareIcon name={action.icon} /></span><span><strong>{action.label}</strong><small>{action.description}</small></span><ChevronRight size={18} /></button>)}</div>
    {feedback && <p role="status" className="care-saved"><Check size={18} />{feedback}</p>}
    <details className="care-simulation"><summary>Indikator latihan perawatan</summary><div>{metrics.map((metric) => <div className="care-metric" key={metric.label}><span>{metric.label}<b>{metric.value}%</b></span><meter value={metric.value} min={0} max={100} aria-label={`${metric.label} ${metric.value} persen`} /></div>)}</div><p><Info size={15} />Angka ini simulasi aplikasi, bukan pengukuran kondisi asli.</p></details>
  </Dialog>;
}
