import { Keys } from '../constants/Keys';

export const verifyIsLetterKey = (key: string): key is Keys =>
  /^[a-zA-Z]$/.test(key);
