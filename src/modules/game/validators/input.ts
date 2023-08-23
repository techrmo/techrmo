import { z } from 'zod';

import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';

import type { Keys } from '../constants/Keys';

export const stringValidation = z
  .string()
  .length(1)
  .transform<Keys>((arg) => {
    const letterUpperCase = arg.toUpperCase();

    if (verifyIsLetterKey(letterUpperCase)) {
      return letterUpperCase;
    }

    throw new Error('Could not interpret value as valid key');
  });

export const inputSchema = z.array(stringValidation).length(5);

export type FormFields = z.infer<typeof inputSchema>;
