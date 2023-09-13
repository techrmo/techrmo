import { api } from '@/shared/services/api';

import type { Keys } from '../constants/Keys';
import { responseWord } from '../validators/responseWords';

export const verifyWord = async (values: Keys[]) => {
  const response = await api.post('/words', { values });
  const { results } = responseWord.parse(response.data);

  return results;
};
