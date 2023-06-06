import type { Keys } from '@/modules/game/components/Keyboard';

export const verifyIsLetterKey = (key: string): key is Keys => /^[a-zA-Z]$/.test(key);
