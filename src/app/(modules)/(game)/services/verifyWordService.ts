import { api } from '@/shared/services/api';
import type { Keys } from '@/shared/constants/Keys';

import { responseWord } from '../validators/responseWords';

export const verifyWordService = async (values: Keys[], wordSize: number) => {
  const response = await api.post('/words', { values });
  return responseWord(wordSize).parse(response.data);
};
