import { Camera, X } from 'lucide-react';
import type { PetState } from '../../types/index.ts';
import { getSpecies } from '../../data/species.ts';
import { GROW_GUIDES } from '../../data/guides.ts';
import { Dialog } from '../ui/Dialog.tsx';

export function GuideDialog({ pet, onClose, onPhoto }: { pet: PetState; onClose: () => void; onPhoto: () => void }) {
  const species = getSpecies(pet.type, pet.variety);
  const steps = pet.type === 'tunas' ? GROW_GUIDES[species.id] || [] : pet.type === 'koki' ? ['Berikan pakan secukupnya, sedikit demi sedikit. Amati apakah pakan habis.', 'Periksa warna, bau, dan kebersihan air. Lakukan pergantian air secara bertahap.', 'Amati perilaku ikan. Pisahkan ikan yang tampak sakit dan minta saran petugas setempat.'] : ['Sediakan ransum sesuai umur ayam dan air minum bersih sepanjang hari.', 'Jaga kandang dan sarang tetap kering, bersih, serta memiliki aliran udara.', 'Periksa sarang, ambil telur setiap hari, dan catat hasilnya.'];
  return <Dialog onClose={onClose} labelledBy="guide-title" className="guide-panel"><div className="dialog-top"><div><span className="section-label">Panduan dasar</span><h2 id="guide-title">{pet.type === 'tunas' ? 'Budidaya' : 'Merawat'} {species.label}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Tutup panduan"><X size={21} /></button></div><div className="guide-subject"><img src={species.image} alt={species.label} /></div><ol className="garden-guide-steps">{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol><button className="app-button app-button--secondary app-button--wide" type="button" onClick={onPhoto}><Camera size={19} />Konsultasikan kondisi</button><p className="dialog-footer-note">Panduan umum yang tersimpan di aplikasi. Sesuaikan dengan kondisi lahan dan saran penyuluh.</p></Dialog>;
}
