import { gql } from 'graphql-request';

import { requestGraphQl } from '../hygraph';

interface UpsertPlayerData {
  image?: string;
  name?: string;
  email: string;
}

export const upsertPlayer = async ({
  name,
  email,
  image,
}: UpsertPlayerData) => {
  try {
    const query = gql`
      mutation {
        upsertPlayer(
          upsert: {
            create: { 
              email: "${email}",
              profileImage: "${image}", 
              ${name ? `name: "${name}"` : ''} 
            }
            update: {
              profileImage: "${image}",
            }
          }
          where: { email: "${email}" }
        ) {
          id
        }
        publishPlayer(where: {email: "${email}"}) {
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
