import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { readStoredValue, writeStoredValue } from '../utils/storage.ts';
import type { StorageReadStatus, StorageWriteStatus } from '../utils/storage.ts';

export interface PersistenceState {
  status: StorageWriteStatus;
  readStatus: StorageReadStatus;
  isPersistent: boolean;
}

export function usePersistentState<T>(
  key: string,
  initialValue: T | (() => T),
  normalize: (value: unknown) => T,
): readonly [T, Dispatch<SetStateAction<T>>, PersistenceState] {
  const [initial] = useState(() => readStoredValue(key, initialValue, normalize));
  const [value, setValue] = useState<T>(initial.value);
  const [status, setStatus] = useState<StorageWriteStatus>(initial.status === 'unavailable' ? 'unavailable' : 'saved');

  useEffect(() => {
    setStatus(writeStoredValue(key, value));
  }, [key, value]);

  return [value, setValue, { status, readStatus: initial.status, isPersistent: status === 'saved' }] as const;
}
