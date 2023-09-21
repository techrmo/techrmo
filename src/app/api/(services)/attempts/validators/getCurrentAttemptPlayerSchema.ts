import { z } from 'zod';

import { alphabetLetterSchema } from '@/shared/schema/alphabetLetterSchema';

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
    })
  ),
});

export type ResultValidation = z.infer<typeof resultsValidation>;
