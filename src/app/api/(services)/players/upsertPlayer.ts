import { gql } from 'graphql-request';
import type { User } from 'next-auth';

import { requestGraphQl } from '../hygraph';

export const upsertPlayer = async (data: User) => {
  try {
    const query = gql`
      mutation {
        upsertPlayer(
          upsert: {
            create: { 
              profileImage: "${data.image}", 
              name: "${data.name}", 
              email: "${data.email}" 
            }
            update: {
              profileImage: "${data.image}",
              name: "${data.name}"
            }
          }
          where: { email: "${data.email}" }
        ) {
          id
        }
        publishPlayer(where: {email: "${data.email}"}) {
          id
        }
      }
    `;

    await requestGraphQl(query);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
