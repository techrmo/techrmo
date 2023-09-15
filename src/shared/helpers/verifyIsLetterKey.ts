import { Keys } from '@/app/(game)/constants/Keys';

export const verifyIsLetterKey = (key: string): key is Keys =>
  /^[a-zA-Z]$/.test(key);
