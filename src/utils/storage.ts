export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem?(key: string): void;
}

export type StorageReadStatus = 'stored' | 'empty' | 'recovered' | 'unavailable';
export type StorageWriteStatus = 'saved' | 'unavailable' | 'full' | 'error';

export interface StorageReadResult<T> {
  value: T;
  status: StorageReadStatus;
}

export function getBrowserStorage(): StorageLike | null {
  try {
    return typeof globalThis.localStorage === 'undefined' ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}

export function readStoredValue<T>(
  key: string,
  fallback: T | (() => T),
  normalize: (value: unknown) => T,
  storage: StorageLike | null = getBrowserStorage(),
): StorageReadResult<T> {
  const defaultValue = () => typeof fallback === 'function' ? (fallback as () => T)() : fallback;
  if (!storage) return { value: defaultValue(), status: 'unavailable' };

  try {
    const raw = storage.getItem(key);
    if (raw === null) return { value: defaultValue(), status: 'empty' };

    let parsed: unknown;
    let status: StorageReadStatus = 'stored';
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Earlier app versions stored the active category as an unquoted string.
      parsed = raw;
      status = 'recovered';
    }
    try {
      return { value: normalize(parsed), status };
    } catch {
      return { value: defaultValue(), status: 'recovered' };
    }
  } catch {
    return { value: defaultValue(), status: 'unavailable' };
  }
}

export function writeStoredValue(
  key: string,
  value: unknown,
  storage: StorageLike | null = getBrowserStorage(),
): StorageWriteStatus {
  if (!storage) return 'unavailable';
  try {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) return 'error';
    storage.setItem(key, serialized);
    return 'saved';
  } catch (error) {
    const details = error as { name?: string; code?: number } | null;
    if (details?.name === 'SecurityError') return 'unavailable';
    return details?.name === 'QuotaExceededError' || details?.name === 'NS_ERROR_DOM_QUOTA_REACHED' || details?.code === 22 || details?.code === 1014
      ? 'full'
      : 'error';
  }
}

export function removeStoredValue(key: string, storage: StorageLike | null = getBrowserStorage()): boolean {
  if (!storage?.removeItem) return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}
