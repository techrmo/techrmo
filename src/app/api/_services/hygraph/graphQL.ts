import { GraphQLClient } from 'graphql-request';
import { privateEnvs, publicEnvs } from '@/shared/config/envs';

const client = new GraphQLClient(publicEnvs.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${privateEnvs.GRAPHCMS_MUTATION_TOKEN}`,
  },
});

export const requestGraphQl = (query: string) => client.request(query);
