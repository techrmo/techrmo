import { api } from '@/shared/services/api';
import { responseWord } from '../validators/responseWords';

export const verifyWord = async (value: string[]) => {
  try {
    const response = await api.post('/words', { value });
    const { results } = responseWord.parse(response.data);

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
