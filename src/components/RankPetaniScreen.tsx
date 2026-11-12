import { ArrowLeft, Check, ChevronRight, Gift, Leaf, Sprout, Trophy } from 'lucide-react';
import type { FarmerRank } from '../types/index.ts';
import '../styles/onboarding.css';

interface RankPetaniScreenProps {
  farmerRank: FarmerRank;
  onBack: () => void;
  onClaimDailyReward?: () => void;
  dailyClaimed?: boolean;
  totalPoints?: number;
}

const RANK_STEPS = [
  { level: 1, title: 'Benih Harapan', minimum: 0 },
  { level: 2, title: 'Tunas Muda', minimum: 3 },
  { level: 3, title: 'Padi Berisi', minimum: 6 },
  { level: 4, title: 'Lumbung Padi Lestari', minimum: 10 },
  { level: 5, title: 'Petani Teladan', minimum: 20 },
] as const;

export function RankPetaniScreen({ farmerRank, onBack, onClaimDailyReward, dailyClaimed = false, totalPoints = 0 }: RankPetaniScreenProps) {
  const totalCare = Math.max(0, Math.floor(farmerRank.currentCare));
  const level = Math.min(5, Math.max(1, farmerRank.level));
  const currentStep = RANK_STEPS[level - 1];
  const nextStep = RANK_STEPS[level];
  const remaining = nextStep ? Math.max(0, nextStep.minimum - totalCare) : 0;
  const progress = nextStep ? Math.min(100, Math.max(0, ((totalCare - currentStep.minimum) / (nextStep.minimum - currentStep.minimum)) * 100)) : 100;

  return (
    <div className="ob-screen rank-screen">
      <header className="rank-header page-heading"><button type="button" className="icon-button" onClick={onBack} aria-label="Kembali ke pengaturan"><ArrowLeft size={22} /></button><div><h1>Perjalanan merawat</h1><p>Catatan kecil, kebiasaan baik</p></div></header>
      <main className="rank-main">
        <section className="rank-current" aria-labelledby="rank-current-title">
          <div className="rank-current-top"><span className="rank-current-icon" aria-hidden="true"><Trophy size={31} /></span><span className="rank-level">Level {level} dari 5</span></div>
          <p className="rank-kicker">Peringkat Anda saat ini</p><h2 id="rank-current-title">{farmerRank.title}</h2>
          <div className="rank-care-total"><strong>{totalCare}</strong><span>catatan perawatan</span></div>
          <div className="rank-progress-label"><span>{nextStep ? `Menuju ${nextStep.title}` : 'Jenjang tertinggi tercapai'}</span><strong>{Math.round(progress)}%</strong></div>
          <div className="rank-progress" role="progressbar" aria-label={nextStep ? `Kemajuan menuju level ${nextStep.level}` : 'Jenjang tertinggi tercapai'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><i style={{ width: `${progress}%` }} /></div>
          <p className="rank-current-note">{nextStep ? `${remaining} catatan perawatan lagi menuju level ${nextStep.level}.` : 'Tetap lanjutkan perawatan sesuai kebutuhan tanaman dan ternak.'}</p>
        </section>

        <section className="rank-daily" aria-labelledby="rank-daily-title">
          <div className="rank-daily-art"><img src="/assets/generated/daily-calendar-v2.webp" alt="" /></div>
          <div className="rank-daily-copy"><span className="section-label">Poin harian</span><h2 id="rank-daily-title">{Math.max(0, totalPoints)} poin terkumpul</h2><p>Poin harian dicatat terpisah dari jumlah perawatan.</p></div>
          {onClaimDailyReward && <button type="button" className={`app-button app-button--wide ${dailyClaimed ? 'app-button--secondary' : ''}`} disabled={dailyClaimed} onClick={onClaimDailyReward}>{dailyClaimed ? <Check size={20} /> : <Gift size={20} />}{dailyClaimed ? 'Poin hari ini sudah dicatat' : 'Ambil 5 poin hari ini'}</button>}
        </section>

        <section className="rank-path" aria-labelledby="rank-path-title"><div className="section-title"><h2 id="rank-path-title">Jenjang perawatan</h2><Leaf size={21} aria-hidden="true" /></div><ol>{RANK_STEPS.map((step) => {
          const attained = totalCare >= step.minimum;
          const current = step.level === level;
          return <li key={step.level} className={`${current ? 'is-current' : ''} ${attained ? 'is-attained' : ''}`} aria-current={current ? 'step' : undefined}><span className="rank-path-number" aria-hidden="true">{attained && !current ? <Check size={20} /> : step.level}</span><span className="rank-path-copy"><small>Level {step.level}{current && <em>Sekarang</em>}</small><strong>{step.title}</strong><span>{step.minimum === 0 ? 'Mulai perjalanan merawat' : `${step.minimum} catatan perawatan`}</span></span>{current ? <Sprout size={23} aria-hidden="true" /> : !attained ? <span className="rank-unreached">{Math.max(0, step.minimum - totalCare)} lagi</span> : <span className="rank-attained">Tercapai</span>}</li>;
        })}</ol></section>

        <section className="rank-how"><img src="/assets/generated/care-tools-v1.webp" alt="" /><div><h2>Rawat sesuai kebutuhan</h2><p>Catat kegiatan yang benar-benar dilakukan melalui tombol Rawat. Jenjang bertambah mengikuti catatan perawatan Anda.</p></div></section>
        <button type="button" className="app-button app-button--plain app-button--wide" onClick={onBack}>Kembali ke pengaturan<ChevronRight size={18} /></button>
      </main>
    </div>
  );
}
