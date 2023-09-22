import { z } from 'zod';

import { alphabetLetterSchema } from '@/shared/schema/alphabetLetterSchema';
import { GAME_STATUS } from '@/shared/constants/GameStatus';

const letterResult = z.enum(['correct', 'incorrect', 'bad-position']);

const resultsValidation = z.object({
  value: alphabetLetterSchema,
  result: letterResult,
});

export const responseWord = z.object({
  results: z.array(resultsValidation).length(5),
});

export const getCurrentAttemptPlayerSchema = z.object({
  attempts: z.array(
    z.object({
      id: z.string(),
      values: z.array(z.array(resultsValidation).length(5)),
      statusAttempt: z.enum(GAME_STATUS),
    })
  ),
});

export type ResultValidation = z.infer<typeof resultsValidation>;