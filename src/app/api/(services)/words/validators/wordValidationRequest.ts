import { z } from 'zod';

import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';
import type { Keys } from '@/app/(game)/constants/Keys';

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

export const wordValidationRequest = z.object({
  values: z.array(stringValidation).length(5),
});

export type WordValidation = z.infer<typeof wordValidationRequest>;
