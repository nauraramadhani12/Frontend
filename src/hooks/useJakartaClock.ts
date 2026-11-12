import { useEffect, useState } from 'react';
import { getJakartaDateTime } from '../utils/dateTime.ts';

export function useJakartaClock() {
  const [now, setNow] = useState(getJakartaDateTime);
  useEffect(() => {
    const update = () => setNow(getJakartaDateTime());
    const timer = window.setInterval(update, 30_000);
    document.addEventListener('visibilitychange', update);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', update); };
  }, []);
  return now;
}
