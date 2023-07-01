import { getFirstWordHasNotBeenUsedSchema } from './validators/getFirstWordHasNotBeenUsed';
import { requestGraphQl } from '../hygraph';

export const getFirstWordHasNotBeenUsed = async () => {
  const query = `
    query Words {
      words(where: { hasBeenUsed: false }, first: 1) {
        value
        id
      }
    }
  `;

  const response = await requestGraphQl(query);
  const { words } = getFirstWordHasNotBeenUsedSchema.parse(response);

  const word = words[0];

  return word;
};
