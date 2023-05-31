import { z } from 'zod';
import { stringValidation } from './input';

const letterResult = z.enum(['correct', 'incorrect', 'bad-position']);

const resultsValidation = z.object({
  value: stringValidation,
  result: letterResult,
});

export const responseWord = z.object({
  results: z.array(resultsValidation).length(5),
});

export type LetterResult = z.infer<typeof letterResult>
export type ResponseWord = z.infer<typeof responseWord>
