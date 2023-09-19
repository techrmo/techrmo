import { gql } from 'graphql-request';

import { requestGraphQl } from '../hygraph';

interface AttemptData {
  id?: string | undefined; // ativar opção no tsconfig
  status: 'PLAYING' | 'WIN' | 'LOST';
  word: string;
  email: string;
  values: any;
}

export const upsertAttempt = async (data: AttemptData) => {
  console.log('oq checjou', data);
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
