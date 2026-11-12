import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Info } from 'lucide-react';
import type { ActiveScreen, ChatConversation, PetType, PetVariety, UserProfile } from './types/index.ts';
import { usePersistentState } from './hooks/usePersistentState.ts';
import { useJakartaClock } from './hooks/useJakartaClock.ts';
import { DEFAULT_PROFILE, getSpeciesPet, normalizeNonNegativeInteger, normalizePets, normalizePetType, normalizeProfile, normalizeSpeciesPets, selectedVarieties } from './utils/gardenState.ts';
import type { SpeciesPets } from './utils/gardenState.ts';
import { CARE_SCHEDULE_STORAGE_KEY, markScheduleDone, normalizeSchedules, updateSchedule } from './utils/careSchedule.ts';
import type { CareSchedules, ScheduledCare } from './utils/careSchedule.ts';
import { getJakartaDateKey, isDateKey, offsetDateKey } from './utils/dateTime.ts';
import { CHAT_STORAGE_KEY, createChatId, normalizeConversations, upsertConversation } from './utils/chatStorage.ts';
import { createCareRecord, normalizeCareRecords } from './utils/careJournal.ts';
import type { CareRecord } from './utils/careJournal.ts';
import { getRankInfo, performCareAction } from './utils/petRules.ts';
import { getSpecies } from './data/species.ts';
import type { CareSlot } from './data/care.ts';
import { playLevelUpFanfare, playPop, setAudioEnabled } from './utils/audioEffects.ts';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { RegisterScreen } from './components/RegisterScreen.tsx';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen.tsx';
import { BerandaScreen } from './components/BerandaScreen.tsx';
import { ScheduleScreen } from './components/ScheduleScreen.tsx';
import { CareJournalScreen } from './components/CareJournalScreen.tsx';
import { ChatAIScreen } from './components/ChatAIScreen.tsx';
import { RiwayatChatScreen } from './components/RiwayatChatScreen.tsx';
import { PengaturanScreen } from './components/PengaturanScreen.tsx';
import { RankPetaniScreen } from './components/RankPetaniScreen.tsx';
import { EditProfileScreen } from './components/EditProfileScreen.tsx';
import { BottomNavBar } from './components/BottomNavBar.tsx';

const SCREENS: ActiveScreen[] = ['welcome', 'login', 'register', 'forgot_password', 'beranda', 'jadwal', 'jurnal', 'chat_ai', 'chat_history', 'pengaturan', 'rank_petani', 'edit_profile'];
const TITLES: Record<ActiveScreen, string> = { welcome: 'Selamat datang', login: 'Masuk profil', register: 'Buat profil', forgot_password: 'Akses profil', beranda: 'Beranda', jadwal: 'Jadwal', jurnal: 'Jurnal perawatan', chat_ai: 'Tanya Tani', chat_history: 'Riwayat konsultasi', pengaturan: 'Profil & pengaturan', rank_petani: 'Perjalanan tani', edit_profile: 'Ubah profil' };
function requestedScreen(): ActiveScreen {
  const screen = new URLSearchParams(window.location.search).get('screen') as ActiveScreen;
  return SCREENS.includes(screen) ? screen : 'beranda';
}
const normalizeDate = (value: unknown) => isDateKey(value) ? value : '';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(requestedScreen);
  const [pets, setPets, petsPersistence] = usePersistentState('dewi_sri_pets', () => normalizePets(null), normalizePets);
  const [speciesPets, setSpeciesPets, speciesPersistence] = usePersistentState<SpeciesPets>('dewi_sri_species_pets', () => normalizeSpeciesPets(null, pets), (value) => normalizeSpeciesPets(value, pets));
  const [activePetType, setActivePetType, categoryPersistence] = usePersistentState<PetType>('dewi_sri_active_pet', 'tunas', normalizePetType);
  const [userProfile, setUserProfile, profilePersistence] = usePersistentState<UserProfile>('dewi_sri_profile', DEFAULT_PROFILE, normalizeProfile);
  const [schedules, setSchedules, schedulePersistence] = usePersistentState<CareSchedules>(CARE_SCHEDULE_STORAGE_KEY, {}, (value) => normalizeSchedules(value, selectedVarieties(pets)));
  const [careRecords, setCareRecords, journalPersistence] = usePersistentState<CareRecord[]>('dewi_sri_care_journal', [], normalizeCareRecords);
  const [totalCareCount, setTotalCareCount, careCountPersistence] = usePersistentState('dewi_sri_care_count', 0, normalizeNonNegativeInteger);
  const [streakDays, setStreakDays, streakPersistence] = usePersistentState('dewi_sri_streak_real', 0, normalizeNonNegativeInteger);
  const [totalPoints, setTotalPoints, pointsPersistence] = usePersistentState('dewi_sri_points', 0, normalizeNonNegativeInteger);
  const [lastClaimDate, setLastClaimDate, claimPersistence] = usePersistentState('dewi_sri_last_claim_date', '', normalizeDate);
  const [dailyRewardDate, setDailyRewardDate, rewardPersistence] = usePersistentState('dewi_sri_daily_reward_date', '', normalizeDate);
  const [conversations, setConversations, chatPersistence] = usePersistentState<ChatConversation[]>(CHAT_STORAGE_KEY, [], normalizeConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [photoHelpRequested, setPhotoHelpRequested] = useState(false);
  const [toast, setToast] = useState('');
  const now = useJakartaClock();
  const currentPet = getSpeciesPet(speciesPets, activePetType, pets[activePetType].variety);
  const allPets = Object.fromEntries((Object.keys(pets) as PetType[]).map((type) => [type, getSpeciesPet(speciesPets, type, pets[type].variety)])) as typeof pets;
  const rankInfo = getRankInfo(totalCareCount);
  const previousLevel = useRef(rankInfo.level);
  const dailyClaimed = dailyRewardDate === now.date || lastClaimDate === now.date;
  const isAuthScreen = ['welcome', 'login', 'register', 'forgot_password'].includes(activeScreen);
  const storageUnavailable = [petsPersistence, speciesPersistence, categoryPersistence, profilePersistence, schedulePersistence, journalPersistence, chatPersistence, careCountPersistence, streakPersistence, pointsPersistence, claimPersistence, rewardPersistence].some((status) => !status.isPersistent);

  const navigate = useCallback((screen: ActiveScreen) => {
    setActiveScreen(screen);
    const url = new URL(window.location.href);
    url.searchParams.set('screen', screen);
    if (window.location.search !== url.search) window.history.pushState({ screen }, '', url);
  }, []);

  useEffect(() => {
    const onPopState = () => setActiveScreen(requestedScreen());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  useEffect(() => { document.title = `${TITLES[activeScreen]} · Dewi Sri`; window.scrollTo({ top: 0, behavior: 'instant' }); }, [activeScreen]);
  useEffect(() => { document.documentElement.dataset.textSize = userProfile.textSize; document.documentElement.style.fontSize = userProfile.textSize === 'large' ? '18px' : userProfile.textSize === 'small' ? '15px' : '16px'; setAudioEnabled(userProfile.soundEnabled); }, [userProfile.textSize, userProfile.soundEnabled]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 3500); return () => window.clearTimeout(timer); }, [toast]);
  useEffect(() => {
    if (rankInfo.level > previousLevel.current) { setToast(`Peringkat naik: ${rankInfo.title}.`); playLevelUpFanfare(userProfile.soundEnabled); }
    previousLevel.current = rankInfo.level;
  }, [rankInfo.level, rankInfo.title, userProfile.soundEnabled]);

  const selectVariety = (type: PetType, variety: PetVariety) => {
    const next = getSpeciesPet(speciesPets, type, variety);
    setPets((previous) => ({ ...previous, [type]: next }));
    setSpeciesPets((previous) => ({ ...previous, [next.variety!]: next }));
    setActivePetType(type);
    playPop(userProfile.soundEnabled);
  };
  const recordCare = (type: PetType, variety: PetVariety, slot: CareSlot) => {
    const { updatedPet } = performCareAction(getSpeciesPet(speciesPets, type, variety), slot);
    const record = createCareRecord(type, variety, slot);
    const today = getJakartaDateKey();
    setSpeciesPets((previous) => ({ ...previous, [variety]: updatedPet }));
    if (pets[type].variety === variety) setPets((previous) => ({ ...previous, [type]: updatedPet }));
    setTotalCareCount((previous) => previous + 1);
    setCareRecords((previous) => normalizeCareRecords([record, ...previous]));
    setSchedules((previous) => markScheduleDone(previous, variety, slot, today));
    playPop(userProfile.soundEnabled);
  };
  const completeScheduledCare = (entry: ScheduledCare) => {
    if (schedules[entry.key]?.doneOn === getJakartaDateKey()) return;
    recordCare(entry.type, entry.variety, entry.slot);
    setToast(`Perawatan ${getSpecies(entry.type, entry.variety).label} sudah dicatat.`);
  };
  const saveSchedule = (variety: PetVariety, slot: CareSlot, time: string) => { setSchedules((previous) => updateSchedule(previous, variety, slot, { enabled: true, time })); setToast('Jadwal harian tersimpan.'); };
  const removeSchedule = (variety: PetVariety, slot: CareSlot) => { setSchedules((previous) => updateSchedule(previous, variety, slot, { enabled: false })); setToast('Jadwal dihapus.'); };
  const claimDailyReward = () => {
    const today = getJakartaDateKey();
    if (dailyRewardDate === today || lastClaimDate === today) return;
    setTotalPoints((previous) => previous + 5);
    setStreakDays((previous) => lastClaimDate === offsetDateKey(today, -1) ? previous + 1 : 1);
    setLastClaimDate(today); setDailyRewardDate(today); setToast('Kunjungan hari ini tercatat. 5 poin ditambahkan.');
  };
  const updateProfile = (updated: Partial<UserProfile>) => setUserProfile((previous) => normalizeProfile({ ...previous, ...updated }));
  const openPhoto = () => { setActiveConversationId(createChatId()); setPhotoHelpRequested(true); navigate('chat_ai'); };
  const newChat = () => { setActiveConversationId(createChatId()); navigate('chat_ai'); };
  const onConversationChange = useCallback((conversation: ChatConversation) => { setConversations((previous) => upsertConversation(previous, conversation)); setActiveConversationId(conversation.id); }, [setConversations]);
  const acknowledgePhotoPrompt = useCallback(() => setPhotoHelpRequested(false), []);
  const farmerRank = { level: rankInfo.level, title: rankInfo.title, subtitle: rankInfo.subtitle, currentCare: rankInfo.current, targetCare: rankInfo.max, description: '' };

  return <div className={`garden-app garden-app--${activeScreen}`}><a className="skip-link" href="#page-content">Lewati ke isi halaman</a><div className={`garden-shell garden-shell--${activeScreen}`} data-screen={activeScreen}>
    {storageUnavailable && <div className="status-note status-note--warning storage-notice" role="status"><Info size={18} /><span>Penyimpanan perangkat sedang tidak tersedia atau penuh. Perubahan tetap bisa dipakai selama halaman ini terbuka.</span></div>}
    <div id="page-content" tabIndex={-1}>
      {activeScreen === 'welcome' && <WelcomeScreen onStart={() => navigate('beranda')} onOpenLogin={() => navigate('login')} onOpenRegister={() => navigate('register')} />}
      {activeScreen === 'login' && <LoginScreen onLoginSuccess={(email) => { updateProfile({ ...(email ? { email } : {}), isLoggedIn: Boolean(email) }); navigate('beranda'); }} onNavigateRegister={() => navigate('register')} onNavigateForgotPassword={() => navigate('forgot_password')} onBackToWelcome={() => navigate('welcome')} />}
      {activeScreen === 'register' && <RegisterScreen onRegisterSuccess={(name, email) => { updateProfile({ name, email, isLoggedIn: true }); navigate('beranda'); }} onNavigateLogin={() => navigate('login')} onBackToWelcome={() => navigate('welcome')} />}
      {activeScreen === 'forgot_password' && <ForgotPasswordScreen onBackToLogin={() => navigate('login')} />}
      {activeScreen === 'beranda' && <BerandaScreen currentPet={currentPet} allPets={allPets} userProfile={userProfile} now={now} schedules={schedules} totalCareCount={totalCareCount} totalPoints={totalPoints} streakDays={streakDays} dailyClaimed={dailyClaimed} onClaimDailyReward={claimDailyReward} onSelectVariety={selectVariety} onCareAction={(slot) => recordCare(currentPet.type, currentPet.variety!, slot)} onCompleteScheduled={completeScheduledCare} onToggleSound={() => updateProfile({ soundEnabled: !userProfile.soundEnabled })} onPhoto={openPhoto} onNavigate={navigate} />}
      {activeScreen === 'jadwal' && <ScheduleScreen currentPet={currentPet} schedules={schedules} now={now} onSave={saveSchedule} onRemove={removeSchedule} onComplete={completeScheduledCare} />}
      {activeScreen === 'jurnal' && <CareJournalScreen records={careRecords} onBack={() => navigate('beranda')} onOpenSchedule={() => navigate('jadwal')} />}
      {activeScreen === 'chat_ai' && <ChatAIScreen conversationId={activeConversationId} conversation={conversations.find((item) => item.id === activeConversationId)} onConversationChange={onConversationChange} onOpenHistory={() => navigate('chat_history')} onNewChat={newChat} openPhotoOnMount={photoHelpRequested} onPhotoPromptOpened={acknowledgePhotoPrompt} />}
      {activeScreen === 'chat_history' && <RiwayatChatScreen conversations={conversations} activeConversationId={activeConversationId} onBackToChat={() => navigate('chat_ai')} onSelectConversation={(conversation) => { setActiveConversationId(conversation.id); navigate('chat_ai'); }} onDeleteConversation={(id) => { setConversations((previous) => previous.filter((conversation) => conversation.id !== id)); if (id === activeConversationId) setActiveConversationId(null); }} onNewChat={newChat} />}
      {activeScreen === 'pengaturan' && <PengaturanScreen userProfile={userProfile} farmerRank={farmerRank} onOpenEditProfile={() => navigate('edit_profile')} onOpenRankPetani={() => navigate('rank_petani')} onUpdateProfile={updateProfile} onLogout={() => { updateProfile({ isLoggedIn: false }); navigate('welcome'); }} />}
      {activeScreen === 'rank_petani' && <RankPetaniScreen farmerRank={farmerRank} onBack={() => navigate('pengaturan')} onClaimDailyReward={claimDailyReward} dailyClaimed={dailyClaimed} totalPoints={totalPoints} />}
      {activeScreen === 'edit_profile' && <EditProfileScreen userProfile={userProfile} onSaveProfile={updateProfile} onBack={() => navigate('pengaturan')} />}
    </div>
    {!isAuthScreen && <BottomNavBar currentScreen={activeScreen} onNavigate={navigate} />}
    {toast && <div className="app-toast" role="status"><Check size={20} /><span>{toast}</span></div>}
  </div></div>;
}
