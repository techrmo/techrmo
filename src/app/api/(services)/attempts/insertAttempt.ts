import { gql } from 'graphql-request';
import type { User } from 'next-auth';

import { requestGraphQl } from '../hygraph';

interface AttemptData {
  status: 'PLAYING' | 'WIN' | 'LOST';
  word: string;
  values: any;
  email: string;
}

export const upsertAttempt = async (data: User) => {
  const query = gql`
    mutation {
      createAttempt(
        data: {
          statusAttempt: PLAYING
          players: { connect: { email: "gabrieltsunoda@gmail.com" } }
          word: { connect: { value: "REACT" } }
          values: "[1, 2]"
        }
      ) {
        id
      }
    }
  `;

  await requestGraphQl(query);
};
