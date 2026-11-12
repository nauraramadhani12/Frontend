import type { ChatConversation, ChatMessage, DiagnosisDetails } from '../types/index.ts';
import { getJakartaDateKey, JAKARTA_TIME_ZONE } from './dateTime.ts';
import { isRecord, readStoredValue, writeStoredValue } from './storage.ts';
import type { StorageWriteStatus } from './storage.ts';

export const CHAT_STORAGE_KEY = 'dewi_sri_chat_history';
const MAX_CONVERSATIONS = 60;
const MAX_PHOTO_LENGTH = 1_500_000;

function dayOrdinal(key: string): number {
  const [year, month, day] = key.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

function getDateGroup(updatedAt: Date) {
  const today = getJakartaDateKey();
  const dateKey = getJakartaDateKey(updatedAt);
  const daysAgo = Math.floor((dayOrdinal(today) - dayOrdinal(dateKey)) / 86_400_000);
  if (daysAgo <= 0) return { dateCategory: 'hari_ini' as const, dateLabel: 'Hari ini' };
  if (daysAgo === 1) return { dateCategory: 'kemarin' as const, dateLabel: 'Kemarin' };
  if (daysAgo < 7) return { dateCategory: 'minggu_ini' as const, dateLabel: '7 hari terakhir' };
  return { dateCategory: 'lebih_lama' as const, dateLabel: new Intl.DateTimeFormat('id-ID', { timeZone: JAKARTA_TIME_ZONE, day: 'numeric', month: 'short' }).format(updatedAt) };
}

function compact(value: string, limit: number): string {
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}

function validDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

function updateTime(conversation: ChatConversation): number {
  return validDate(conversation.updatedAt)?.getTime() || 0;
}

function safePhotoUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > MAX_PHOTO_LENGTH) return undefined;
  return /^data:image\/(?:jpeg|png|webp|gif|avif);base64,[A-Za-z0-9+/=\r\n]+$/.test(value) || /^\/assets\/[a-zA-Z0-9/_.-]+$/.test(value)
    ? value
    : undefined;
}

function normalizeDiagnosis(value: unknown): DiagnosisDetails | undefined {
  if (!isRecord(value) || typeof value.title !== 'string' || typeof value.explanation !== 'string' || !Array.isArray(value.steps)) return undefined;
  return {
    title: value.title.slice(0, 160),
    subtitle: typeof value.subtitle === 'string' ? value.subtitle.slice(0, 500) : '',
    explanation: value.explanation.slice(0, 5000),
    steps: value.steps.filter((step): step is string => typeof step === 'string').slice(0, 20).map((step) => step.slice(0, 2000)),
    tips: typeof value.tips === 'string' ? value.tips.slice(0, 2000) : '',
    disclaimer: typeof value.disclaimer === 'string' ? value.disclaimer.slice(0, 1000) : '',
  };
}

function normalizeMessage(value: unknown, conversationId: string, index: number): ChatMessage | undefined {
  if (!isRecord(value) || (value.sender !== 'user' && value.sender !== 'assistant')) return undefined;
  const photoUrl = safePhotoUrl(value.photoUrl);
  const text = typeof value.text === 'string' ? value.text.slice(0, 20_000) : '';
  if (!text.trim() && !photoUrl) return undefined;
  const diagnosis = normalizeDiagnosis(value.diagnosis);
  return {
    id: typeof value.id === 'string' && value.id ? value.id.slice(0, 200) : `${conversationId}-message-${index}`,
    sender: value.sender,
    text,
    timestamp: typeof value.timestamp === 'string' ? value.timestamp.slice(0, 30) : '',
    ...(photoUrl ? { photoUrl, photoName: typeof value.photoName === 'string' ? value.photoName.slice(0, 200) : 'Foto kebun' } : {}),
    ...(diagnosis ? { diagnosis } : {}),
  };
}

function normalizeConversation(value: unknown): ChatConversation | undefined {
  if (!isRecord(value) || typeof value.id !== 'string' || !value.id || typeof value.title !== 'string' || typeof value.snippet !== 'string' || !Array.isArray(value.messages)) return undefined;
  const id = value.id.slice(0, 200);
  const messageIds = new Set<string>();
  const messages = value.messages.map((message, index) => {
    const normalized = normalizeMessage(message, id, index);
    if (!normalized) return undefined;
    if (messageIds.has(normalized.id)) normalized.id = `${normalized.id}-${index}`;
    messageIds.add(normalized.id);
    return normalized;
  }).filter((message): message is ChatMessage => Boolean(message));
  const updatedAt = validDate(value.updatedAt);
  return {
    id,
    title: compact(value.title, 160) || 'Konsultasi tani',
    snippet: compact(value.snippet, 500),
    ...(updatedAt ? getDateGroup(updatedAt) : { dateCategory: 'lebih_lama' as const, dateLabel: 'Tanggal belum tersedia' }),
    timestamp: updatedAt
      ? new Intl.DateTimeFormat('id-ID', { timeZone: JAKARTA_TIME_ZONE, hour: '2-digit', minute: '2-digit' }).format(updatedAt)
      : typeof value.timestamp === 'string' ? value.timestamp.slice(0, 30) : '',
    ...(updatedAt ? { updatedAt: updatedAt.toISOString() } : {}),
    messages,
  };
}

export function normalizeConversations(value: unknown): ChatConversation[] {
  if (!Array.isArray(value)) return [];
  const unique = new Map<string, ChatConversation>();
  for (const item of value) {
    const conversation = normalizeConversation(item);
    if (!conversation) continue;
    const existing = unique.get(conversation.id);
    if (!existing || updateTime(conversation) > updateTime(existing)) unique.set(conversation.id, conversation);
  }
  return [...unique.values()].sort((a, b) => updateTime(b) - updateTime(a)).slice(0, MAX_CONVERSATIONS);
}

export function createChatId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `chat-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function buildConversation(id: string, messages: ChatMessage[], updatedAt = new Date()): ChatConversation | null {
  const userMessage = messages.find((message) => message.sender === 'user');
  if (!userMessage) return null;
  const titleSource = userMessage.text || userMessage.photoName || 'Konsultasi foto';
  const lastMessage = messages.at(-1);
  return normalizeConversation({
    id,
    title: compact(titleSource, 48),
    snippet: compact(lastMessage?.text || lastMessage?.photoName || titleSource, 88),
    updatedAt: (Number.isFinite(updatedAt.getTime()) ? updatedAt : new Date()).toISOString(),
    messages,
  }) || null;
}

export function loadConversations(): ChatConversation[] {
  return readStoredValue(CHAT_STORAGE_KEY, [], normalizeConversations).value;
}

export function saveConversations(conversations: ChatConversation[]): StorageWriteStatus {
  return writeStoredValue(CHAT_STORAGE_KEY, normalizeConversations(conversations));
}

export function upsertConversation(conversations: ChatConversation[], conversation: ChatConversation): ChatConversation[] {
  return normalizeConversations([conversation, ...conversations.filter((item) => item.id !== conversation.id)]);
}
