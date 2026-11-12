import { useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import type { PetState, PetType, PetVariety } from '../types/index.ts';
import { SPECIES } from '../data/species.ts';
import { GARDEN_CATEGORIES } from '../data/garden.ts';
import { Dialog } from './ui/Dialog.tsx';

interface PetVarietyModalProps {
  petType: PetType;
  pets: Record<PetType, PetState>;
  onSelectVariety: (type: PetType, variety: PetVariety) => void;
  onClose: () => void;
}

export function PetVarietyModal({ petType, pets, onSelectVariety, onClose }: PetVarietyModalProps) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const speciesList = SPECIES[petType].filter((species) => (group === 'all' || species.group === group) && species.label.toLocaleLowerCase('id-ID').includes(query.trim().toLocaleLowerCase('id-ID')));
  return <Dialog onClose={onClose} labelledBy="choose-species-title" className="species-dialog"><div className="dialog-top"><div><span className="section-label">Kebun & ternak</span><h2 id="choose-species-title">Pilih jenis {GARDEN_CATEGORIES[petType].label.toLowerCase()}</h2><p>Ketuk pilihan untuk ditampilkan di beranda.</p></div><button type="button" className="icon-button" onClick={onClose} aria-label="Tutup pilihan jenis"><X size={21} /></button></div>
    {SPECIES[petType].length > 3 && <><div className="species-search"><Search size={20} aria-hidden="true" /><label className="sr-only" htmlFor="species-query">Cari jenis tanaman</label><input id="species-query" type="search" placeholder="Cari tanaman…" value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="species-filters" role="group" aria-label="Kelompok tanaman">{[{ id: 'all', label: 'Semua' }, { id: 'sayuran', label: 'Sayuran' }, { id: 'buah', label: 'Buah' }, { id: 'bijian', label: 'Biji-bijian' }].map((filter) => <button type="button" key={filter.id} className={group === filter.id ? 'is-active' : ''} aria-pressed={group === filter.id} onClick={() => setGroup(filter.id)}>{filter.label}</button>)}</div></>}
    <div className="species-grid">{speciesList.map((species) => { const selected = pets[petType].variety === species.id; return <button type="button" key={species.id} className={`species-option ${selected ? 'is-selected' : ''}`} aria-pressed={selected} onClick={() => { onSelectVariety(petType, species.id); onClose(); }}>{selected && <span className="species-check" aria-label="Dipilih"><Check size={16} /></span>}<img src={species.image} alt="" loading="lazy" width={103} height={98} /><strong>{species.label}</strong><small>{species.note}</small></button>; })}</div>
    {!speciesList.length && <p className="species-no-results" role="status">Jenis itu belum ditemukan. Coba nama lain.</p>}
  </Dialog>;
}
