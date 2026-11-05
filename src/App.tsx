import { useState, useEffect } from 'react';
import { ActiveScreen, PetType, PetState, UserProfile, PetVariety } from './types/index.ts';
import { INITIAL_PETS, performCareAction, getRankInfo } from './utils/petRules.ts';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { RegisterScreen } from './components/RegisterScreen.tsx';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen.tsx';
import { BerandaScreen } from './components/BerandaScreen.tsx';
import { ChatAIScreen } from './components/ChatAIScreen.tsx';
import { RiwayatChatScreen } from './components/RiwayatChatScreen.tsx';
import { PengaturanScreen } from './components/PengaturanScreen.tsx';
import { RankPetaniScreen } from './components/RankPetaniScreen.tsx';
import { EditProfileScreen } from './components/EditProfileScreen.tsx';
import { BottomNavBar } from './components/BottomNavBar.tsx';

export default function App() {
  // Check for autostart query param
  const urlParams = new URLSearchParams(window.location.search);
  const autostart = urlParams.get('autostart') === '1';

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(autostart ? 'beranda' : 'welcome');
  const [pets, setPets] = useState<Record<PetType, PetState>>(() => {
    const saved = localStorage.getItem('dewi_sri_pets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_PETS;
  });

  const [activePetType, setActivePetType] = useState<PetType>('tunas');
  const [totalCareCount, setTotalCareCount] = useState<number>(() => {
    const saved = localStorage.getItem('dewi_sri_care_count');
    return saved ? parseInt(saved, 10) : 12; // Start at 12 as per mockups (Level 4, 12 / 20)
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dewi_sri_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      name: 'Sobat Tani',
      region: 'Bandung, Jawa Barat',
      email: 'sobat.tani@gmail.com',
      careFocus: ['tanaman'],
      soundEnabled: true,
      reminderEnabled: true,
      textSize: 'medium',
      language: 'Indonesia',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCAa3hIZEnYDems4sg1L3amF9TYgQxv7Jz89ITO89SzSu3TEvkb5mWMkZcyIf1ih1b0WAEcwWL9SA2xdYsynMuXrDXWfbELMMbw14TvHUG-I1y5fZ0tw7AwxBkblJ8eZ0OMmFd68RnI2Lof2wd8BxW-V_sWkSMpDYpE3KM6Jv1j-TrjhzNIYilS_ZSA7zFEjw3SscWDe0shBe93JLPm9g_0SSFC6cYE5Mf5lh7nRUtU',
    };
  });

  const [levelUpAlert, setLevelUpAlert] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('dewi_sri_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('dewi_sri_care_count', totalCareCount.toString());
  }, [totalCareCount]);

  useEffect(() => {
    localStorage.setItem('dewi_sri_profile', JSON.stringify(userProfile));
    const size = userProfile.textSize || 'medium';
    document.documentElement.setAttribute('data-text-size', size);
    if (size === 'small') {
      document.documentElement.style.fontSize = '14px';
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '19px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  }, [userProfile]);

  const currentPet = pets[activePetType];
  const rankInfo = getRankInfo(totalCareCount);

  const handleCareAction = (slot: 'action1' | 'action2' | 'action3') => {
    const { updatedPet } = performCareAction(currentPet, slot);
    setPets((prev) => ({
      ...prev,
      [activePetType]: updatedPet,
    }));

    const nextCount = totalCareCount + 1;
    setTotalCareCount(nextCount);

    const oldRank = getRankInfo(totalCareCount);
    const newRank = getRankInfo(nextCount);
    if (newRank.level > oldRank.level) {
      setLevelUpAlert(`🎉 SELAMAT! Peringkatmu naik ke ${newRank.title} (Level ${newRank.level})!`);
      setTimeout(() => setLevelUpAlert(null), 3500);
    }
  };

  const handleSelectVariety = (variety: PetVariety, displayName: string) => {
    setPets((prev) => ({
      ...prev,
      [activePetType]: {
        ...prev[activePetType],
        variety,
        name: displayName.startsWith('Ayam') ? displayName : `Si ${displayName}`,
      },
    }));
  };

  const handleLogin = (email: string) => {
    setUserProfile((prev) => ({ ...prev, email, isLoggedIn: true }));
    setActiveScreen('beranda');
  };

  const handleRegister = (name: string, email: string) => {
    setUserProfile((prev) => ({ ...prev, name, email, isLoggedIn: true }));
    setActiveScreen('beranda');
  };

  const handleCyclePet = () => {
    if (activePetType === 'tunas') setActivePetType('koki');
    else if (activePetType === 'koki') setActivePetType('kuning');
    else setActivePetType('tunas');
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const textSizeClass =
    userProfile.textSize === 'small'
      ? 'text-xs'
      : userProfile.textSize === 'large'
      ? 'text-base'
      : 'text-sm';

  const isAuthScreen = ['welcome', 'login', 'register', 'forgot_password'].includes(activeScreen);

  return (
    <div className={`min-h-screen bg-[#fff8f5] flex flex-col items-center justify-start text-[#2b1704] ${textSizeClass}`}>
      {/* Level Up Announcement Banner */}
      {levelUpAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-[#0E8551] text-white font-extrabold text-xs rounded-full shadow-2xl border-2 border-amber-300 animate-bounce">
          {levelUpAlert}
        </div>
      )}

      {/* Screen Router */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col relative min-h-screen">
        {activeScreen === 'welcome' && (
          <WelcomeScreen
            onStart={() => setActiveScreen('beranda')}
            onOpenLogin={() => setActiveScreen('login')}
            onOpenRegister={() => setActiveScreen('register')}
          />
        )}

        {activeScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLogin}
            onNavigateRegister={() => setActiveScreen('register')}
            onNavigateForgotPassword={() => setActiveScreen('forgot_password')}
            onBackToWelcome={() => setActiveScreen('welcome')}
          />
        )}

        {activeScreen === 'register' && (
          <RegisterScreen
            onRegisterSuccess={handleRegister}
            onNavigateLogin={() => setActiveScreen('login')}
            onBackToWelcome={() => setActiveScreen('welcome')}
          />
        )}

        {activeScreen === 'forgot_password' && (
          <ForgotPasswordScreen
            onBackToLogin={() => setActiveScreen('login')}
          />
        )}

        {activeScreen === 'beranda' && (
          <BerandaScreen
            currentPet={currentPet}
            onSelectPetType={setActivePetType}
            onCyclePet={handleCyclePet}
            onSelectVariety={handleSelectVariety}
            onCareAction={handleCareAction}
            onOpenChatAI={() => setActiveScreen('chat_ai')}
            onOpenProfile={() => setActiveScreen('pengaturan')}
          />
        )}

        {activeScreen === 'chat_ai' && (
          <ChatAIScreen
            onOpenHistory={() => setActiveScreen('chat_history')}
            onNewChat={() => {}}
          />
        )}

        {activeScreen === 'chat_history' && (
          <RiwayatChatScreen
            onBackToChat={() => setActiveScreen('chat_ai')}
            onSelectConversation={() => setActiveScreen('chat_ai')}
            onNewChat={() => setActiveScreen('chat_ai')}
          />
        )}

        {activeScreen === 'pengaturan' && (
          <PengaturanScreen
            userProfile={userProfile}
            farmerRank={{
              level: rankInfo.level,
              title: rankInfo.title,
              subtitle: rankInfo.subtitle,
              currentCare: rankInfo.current,
              targetCare: rankInfo.max,
              description: '',
            }}
            onOpenEditProfile={() => setActiveScreen('edit_profile')}
            onOpenRankPetani={() => setActiveScreen('rank_petani')}
            onUpdateProfile={handleUpdateProfile}
            onLogout={() => setActiveScreen('login')}
          />
        )}

        {activeScreen === 'rank_petani' && (
          <RankPetaniScreen
            farmerRank={{
              level: rankInfo.level,
              title: rankInfo.title,
              subtitle: rankInfo.subtitle,
              currentCare: rankInfo.current,
              targetCare: rankInfo.max,
              description: '',
            }}
            onBack={() => setActiveScreen('pengaturan')}
          />
        )}

        {activeScreen === 'edit_profile' && (
          <EditProfileScreen
            userProfile={userProfile}
            onSaveProfile={handleUpdateProfile}
            onBack={() => setActiveScreen('pengaturan')}
          />
        )}

        {/* Global Bottom Navigation (Visible except on Auth & Onboarding screens) */}
        {!isAuthScreen && (
          <BottomNavBar
            currentScreen={activeScreen}
            onNavigate={(screen) => setActiveScreen(screen)}
          />
        )}
      </div>
    </div>
  );
}
