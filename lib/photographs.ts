import 'server-only';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export type CouplePhoto = { index: number; src: string; alt: string };

/** Detecta 1, 2, 3 en jpg/jpeg/png/webp dentro de public/Nat_Emma(1). */
export function getCouplePhotos(): CouplePhoto[] {
  const directory = join(process.cwd(), 'public', 'Nat_Emma(1)');
  if (!existsSync(directory)) return [];
  const all = readdirSync(directory);
  return [1, 2, 3].flatMap(index => {
    const match = all.find(name => new RegExp(`^${index}\\.(jpe?g|png|webp)$`, 'i').test(name));
    if (!match) return [];
    return [{ index, src: `/Nat_Emma(1)/${encodeURIComponent(match)}`, alt: `Natalia y Emmanuel, fotografía ${index}` }];
  });
}
