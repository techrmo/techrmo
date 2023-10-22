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

export const inputSchema = (wordSize: number) =>
  z.array(stringValidation).length(wordSize);

export type FormFields = z.infer<ReturnType<typeof inputSchema>>;
