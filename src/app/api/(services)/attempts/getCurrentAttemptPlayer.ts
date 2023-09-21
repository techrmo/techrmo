import { gql } from 'graphql-request';

import { requestGraphQl } from '../hygraph';

import { getCurrentAttemptPlayerSchema } from './validators';

export const getCurrentAttemptPlayer = async (playerEmail: string) => {
  const query = gql`
    query {
      attempts(
        where: {
          word: { isCurrent: true }
          players_some: { email: "${playerEmail}" }
        }
      ) {
        id
        values
      }
    }
  `;

  const response = await requestGraphQl(query);

  const {
    attempts: [firstAttempt],
  } = getCurrentAttemptPlayerSchema.parse(response);

  return firstAttempt;
};
