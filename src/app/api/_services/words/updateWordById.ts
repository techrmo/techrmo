import { gql } from 'graphql-request';

import { requestGraphQl } from '../hygraph';

type UpdateWordData = {
  isCurrent?: boolean;
  hasBeenUsed?: boolean;
  explantion?: string;
  usedAt?: Date;
};

export const updateWordById = async (id: string, data: UpdateWordData) => {
  const query = gql`
    mutation {
      updateWord(data: ${JSON.stringify(data).replaceAll(
        '"',
        ''
      )}, where: {id: "${id}"}) {
        id
      }
      publishWord(where: {id: "${id}"}, to: PUBLISHED) {
        id
      }
    }
  `;

  return requestGraphQl(query);
};
