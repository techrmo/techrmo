import { z } from 'zod';

import {
  firstLineKeys,
  secondLineKeys,
  thirdLineKeys,
} from '../constants/Keys';
import { removeItemFromArray } from '../helpers/removeItemFromArray';

const secondLineValidKeys = removeItemFromArray(secondLineKeys, '<');
const thirdLineValidKeys = removeItemFromArray(thirdLineKeys, 'ENTER');

export const alphabetLetterSchema = z.enum([
  ...firstLineKeys,
  ...secondLineValidKeys,
  ...thirdLineValidKeys,
]);

export type AlphabetLetter = z.infer<typeof alphabetLetterSchema>;
