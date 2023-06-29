import { getCurrentWordSchema } from './validators/getCurrentWord';
import { requestGraphQl } from '../hygraph';

export const getCurrentWord = async () => {
  const query = `
    query Words {
      words(where: { isCurrent: true }) {
        id
        value
      }
    }
  `;

  const response = await requestGraphQl(query);
  const { words } = getCurrentWordSchema.parse(response);

  const word = words[0];

  return word;
};
