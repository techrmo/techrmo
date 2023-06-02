import { api } from '@/shared/services/api';

import { responseWord } from '../validators/responseWords';
import { Keys } from '../stores/KeysStore';

export const verifyWord = async (value: Keys[]) => {
  try {
    const response = await api.post('/words', { value });
    const { results } = responseWord.parse(response.data);

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};