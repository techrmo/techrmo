import { z } from 'zod';

import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';
import { Keys } from '../components/Keyboard';

export const stringValidation = z
  .string()
  .length(1)
  .transform<Keys>((string) => {
    const letterUpperCase = string.toUpperCase();

    if (verifyIsLetterKey(letterUpperCase)) {
      return letterUpperCase;
    }

    throw new Error('Could not interpret value as valid key');
  });

export const inputSchema = z.array(stringValidation).length(5);

export type FormFields = z.infer<typeof inputSchema>
