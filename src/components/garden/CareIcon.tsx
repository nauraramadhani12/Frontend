import { Droplets, House, Sprout, Sun, Wheat } from 'lucide-react';
import type { CareIcon as CareIconName } from '../../data/care.ts';

const ICONS = { water: Droplets, plant: Sprout, sun: Sun, feed: Wheat, clean: House };
export function CareIcon({ name, size = 22 }: { name: CareIconName; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} aria-hidden="true" />;
}
