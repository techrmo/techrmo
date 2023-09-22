import { gql } from 'graphql-request';

import type { GameStatus } from '@/shared/constants/GameStatus';

import { requestGraphQl } from '../hygraph';

import { ResultValidation } from './validators';

interface AttemptData {
  id?: string;
  status: GameStatus;
  word: string;
  email: string;
  values: ResultValidation[][];
}

export const upsertAttempt = async (data: AttemptData) => {
  const query = gql`
    mutation UpsertAttempt($values: Json) {
      upsertAttempt(
        upsert: {
          create: {
            statusAttempt: ${data.status}
            values: $values
            players: { connect: { email: "${data.email}" } }
            word: { connect: { value: "${data.word}" } }
          }
          update: { 
            statusAttempt: ${data.status} 
            values: $values
          }
        }
        where: { id: "${data.id}" }
      ) {
        id
      }
      publishManyAttempts(where: {
        players_some: {
          email: "${data.email}"}
          word: {value: "${data.word}"
        }
      }) {
        count
      }
    }
  `;

  await requestGraphQl(query, { values: data.values });
};
