export type PetType = 'tunas' | 'koki' | 'kuning';

export type PlantVariety = 'padi' | 'pisang' | 'sorgum' | 'berry';
export type FishVariety = 'koi' | 'lele' | 'nila';
export type ChickenVariety = 'kampung' | 'petelur' | 'pedaging';
export type PetVariety = PlantVariety | FishVariety | ChickenVariety;

export interface PetState {
  type: PetType;
  variety?: PetVariety;
  name: string;
  species: string;
  stat1Name: string; // e.g. Nutrisi, Pakan, Kenyang
  stat1: number;
  stat2Name: string; // e.g. Air, Air, Kandang
  stat2: number;
  stat3Name: string; // e.g. Senang
  stat3: number;
  speech: string;
  isHungryOrThirsty: boolean;
}

export interface FarmerRank {
  level: number;
  title: string;
  subtitle: string;
  currentCare: number;
  targetCare: number;
  description: string;
}

export interface UserProfile {
  name: string;
  region: string;
  email: string;
  careFocus: ('tanaman' | 'ikan' | 'ayam')[];
  soundEnabled: boolean;
  reminderEnabled: boolean;
  textSize: 'small' | 'medium' | 'large';
  language: string;
  avatarUrl: string;
  isLoggedIn?: boolean;
}

export interface DiagnosisDetails {
  title: string;
  subtitle: string;
  explanation: string;
  steps: string[];
  tips: string;
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  photoUrl?: string;
  photoName?: string;
  diagnosis?: DiagnosisDetails;
}

export interface ChatConversation {
  id: string;
  title: string;
  snippet: string;
  dateCategory: 'hari_ini' | 'kemarin' | 'minggu_ini' | 'lebih_lama';
  dateLabel: string;
  timestamp: string;
  messages: ChatMessage[];
  isActive?: boolean;
}

export type ActiveScreen =
  | 'welcome'
  | 'login'
  | 'register'
  | 'forgot_password'
  | 'beranda'
  | 'chat_ai'
  | 'chat_history'
  | 'pengaturan'
  | 'rank_petani'
  | 'edit_profile';

