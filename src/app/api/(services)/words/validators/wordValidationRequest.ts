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

export const wordValidationRequest = (wordSize: number) =>
  z.object({
    values: z.array(stringValidation).length(wordSize),
  });

export type WordValidation = z.infer<ReturnType<typeof wordValidationRequest>>;
