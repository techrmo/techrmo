import { api } from '@/shared/services/api';
import type { Keys } from '@/shared/constants/Keys';

import { responseWord } from '../validators/responseWords';

export const verifyWord = async (values: Keys[]) => {
  const response = await api.post('/words', { values });
  return responseWord.parse(response.data);
};
