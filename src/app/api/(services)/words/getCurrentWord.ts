import { requestGraphQl } from '../hygraph';

import { getCurrentWordSchema } from './validators/getCurrentWord';

export const getCurrentWord = async () => {
  return {
    value: 'TESTE',
    explanations: [],
  };

  const query = `
    query Words {
      words(where: { isCurrent: true }) {
        id
        value
        explanations
      }
    }
  `;

  const response = await requestGraphQl(query);
  const { words } = getCurrentWordSchema.parse(response);

  const [word] = words;

  return word;
};
