export const JAKARTA_TIME_ZONE = 'Asia/Jakarta';

export function getJakartaDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: JAKARTA_TIME_ZONE,
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function getJakartaTimeKey(date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: JAKARTA_TIME_ZONE,
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(date);
}

export function getJakartaDateTime(date = new Date()): { date: string; time: string } {
  return { date: getJakartaDateKey(date), time: getJakartaTimeKey(date) };
}

export function isDateKey(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function isTimeKey(value: unknown): value is string {
  return typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function offsetDateKey(key: string, days: number): string {
  if (!isDateKey(key) || !Number.isInteger(days)) return key;
  const [year, month, day] = key.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}
