import { z } from 'zod';

import { removeItemFromArray } from '@/shared/helpers/removeItemFromArray';
import {
  firstLineKeys,
  secondLineKeys,
  thirdLineKeys,
} from '@/app/(game)/constants/Keys';

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
});

export const getCurrentAttemptPlayerSchema = z.object({
  attempts: z.array(
    z.object({
      id: z.string(),
      values: z.array(z.array(resultsValidation).length(5)),
    })
  ),
});
