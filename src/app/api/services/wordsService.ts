import { gql } from 'graphql-request';
import { requestGraphQl } from './hygraphApi';

export const getFirstWordHasNotBeenUsed = async () => {
  const query = `
    query Words {
      words(where: { hasBeenUsed: false }, skip: 1) {
        value
        id
      }
    }
  `;

  const response = await requestGraphQl(query);
  console.log(response);

  return response.words[0];
};

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
  console.log(response);
  return response.words[0];
};

export const updateWordById = async (data, id: string) => {
  const query = gql`
    mutation {
      updateWord(data: ${JSON.stringify(data).replaceAll('"', '')}, where: {id: "${id}"}) {
        id
      }
      publishWord(where: {id: "${id}"}, to: PUBLISHED) {
        id
      }
    }
  `;

  return requestGraphQl(query);
};
