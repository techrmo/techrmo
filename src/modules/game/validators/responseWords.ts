import { z } from 'zod';

import { firstLineKeys, secondLineKeys, thirdLineKeys } from '../components/Keyboard';

import { removeItemFromArray } from '@/shared/helpers/removeItemFromArray';

const secondLineValidKeys = removeItemFromArray(secondLineKeys, '<')

const thirdLineValidKeys = removeItemFromArray(thirdLineKeys, 'ENTER')

const letterResult = z.enum(['correct', 'incorrect', 'bad-position']);
const valueValidation = z.enum([...firstLineKeys, ...secondLineValidKeys, ...thirdLineValidKeys])

const resultsValidation = z.object({
  value: valueValidation,
  result: letterResult,
});

export const responseWord = z.object({
  results: z.array(resultsValidation).length(5),
});

export type LetterResult = z.infer<typeof letterResult>
export type ResponseWord = z.infer<typeof responseWord>
