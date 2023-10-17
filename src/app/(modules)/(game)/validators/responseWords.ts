import { z } from 'zod';

import { removeItemFromArray } from '@/shared/helpers/removeItemFromArray';
import { GAME_STATUS } from '@/shared/constants/GameStatus';

import {
  firstLineKeys,
  secondLineKeys,
  thirdLineKeys,
} from '../../../../shared/constants/Keys';

const secondLineValidKeys = removeItemFromArray(secondLineKeys, '<');
const thirdLineValidKeys = removeItemFromArray(thirdLineKeys, 'ENTER');

export const valueValidation = z.enum([
  ...firstLineKeys,
  ...secondLineValidKeys,
  ...thirdLineValidKeys,
]);

const letterResult = z.enum(['correct', 'incorrect', 'bad-position']);

const resultsValidation = z.object({
  value: valueValidation,
  result: letterResult,
});

export const responseWord = z.object({
  results: z.array(resultsValidation).length(5),
  status: z.enum(GAME_STATUS),
  explanations: z.array(z.string()),
  response: z.string().optional(),
});

export const responseCookieAttempt = z.array(
  z.array(resultsValidation).length(5)
);

export type LetterResult = z.infer<typeof letterResult>;
export type ResponseWord = z.infer<typeof responseWord>;
