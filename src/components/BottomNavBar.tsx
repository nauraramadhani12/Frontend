import { CalendarDays, House, MessageCircle, UserRound } from 'lucide-react';
import type { ActiveScreen } from '../types/index.ts';

export function BottomNavBar({ currentScreen, onNavigate }: { currentScreen: ActiveScreen; onNavigate: (screen: ActiveScreen) => void }) {
  const items = [
    { screen: 'beranda' as const, label: 'Beranda', icon: House, active: ['beranda', 'jurnal'].includes(currentScreen) },
    { screen: 'jadwal' as const, label: 'Jadwal', icon: CalendarDays, active: currentScreen === 'jadwal' },
    { screen: 'chat_ai' as const, label: 'Tanya Tani', icon: MessageCircle, active: ['chat_ai', 'chat_history'].includes(currentScreen) },
    { screen: 'pengaturan' as const, label: 'Profil', icon: UserRound, active: ['pengaturan', 'edit_profile', 'rank_petani'].includes(currentScreen) },
  ];
  return <nav className="app-nav" aria-label="Navigasi utama">{items.map(({ screen, label, icon: Icon, active }) => <button key={screen} type="button" className={`app-nav__item ${active ? 'is-active' : ''}`} onClick={() => onNavigate(screen)} aria-current={active ? 'page' : undefined}><Icon size={23} strokeWidth={active ? 2.4 : 1.8} aria-hidden="true" /><span>{label}</span></button>)}</nav>;
}
