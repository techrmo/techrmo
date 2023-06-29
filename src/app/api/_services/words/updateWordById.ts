import { gql } from 'graphql-request';

import { requestGraphQl } from '../hygraph';

interface UpdateWordByIdRequest {
  isCurrent: boolean
  hasBeenUsed?: boolean
  id: string
}

export const updateWordById = async ({ isCurrent, hasBeenUsed, id }: UpdateWordByIdRequest) => {
  const query = gql`
    mutation {
      updateWord(data: ${JSON.stringify({ isCurrent, hasBeenUsed }).replaceAll('"', '')}, where: {id: "${id}"}) {
        id
      }
      publishWord(where: {id: "${id}"}, to: PUBLISHED) {
        id
      }
    }
  `;

  return requestGraphQl(query);
};
