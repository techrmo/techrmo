import { z } from 'zod';

import { alphabetLetterSchema } from '@/shared/schema/alphabetLetterSchema';
import { GAME_STATUS } from '@/shared/constants/GameStatus';

const letterResult = z.enum(['correct', 'incorrect', 'bad-position']);

const resultsValidation = z.object({
  value: alphabetLetterSchema,
  result: letterResult,
});

export const responseWord = z.object({
  results: z.array(resultsValidation),
});

const valuesAttempt = z.record(z.string(), z.array(resultsValidation));

export const getCurrentAttemptPlayerSchema = z.object({
  values: valuesAttempt,
  status: z.enum(GAME_STATUS),
});

export type ResultValidation = z.infer<typeof resultsValidation>;
export type ValuesAttempt = z.infer<typeof valuesAttempt>;
