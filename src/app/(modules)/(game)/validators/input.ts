import { z } from 'zod';

import { AlphabetLetter } from '@/shared/schema/alphabetLetterSchema';
import { verifyIsAlphabetLetter } from '@/shared/helpers/verifyIsAlphabetLetter';

export const stringValidation = z
  .string()
  .length(1)
  .transform<AlphabetLetter>((arg) => {
    const letterUpperCase = arg.toUpperCase();

    if (verifyIsAlphabetLetter(letterUpperCase)) {
      return letterUpperCase;
    }

    throw new Error('Could not interpret value as valid key');
  });

export const inputSchema = z.array(stringValidation).length(5);

export type FormFields = z.infer<typeof inputSchema>;
