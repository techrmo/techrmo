import { gql } from 'graphql-request';

import { requestGraphQl } from '../hygraph';

import { playerSchema } from './validators/playerSchema';

export const getPlayerByEmail = async (email: string) => {
  try {
    const query = gql`
      query getPlayer {
        player(where: { email: "${email}" }) {
          id
          name
          profileImage
          email
        }
      }
    `;

    const response = await requestGraphQl(query);

    const { player } = playerSchema.parse(response);

    return player;
  } catch (error) {
    console.error(error);

    return null;
  }
};
