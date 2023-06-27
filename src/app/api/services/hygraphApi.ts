import { GraphQLClient } from 'graphql-request';
import { envs } from '@/shared/helpers/parseEnvs';

export const client = new GraphQLClient(envs.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${envs.GRAPHCMS_MUTATION_TOKEN}`,
  },
});

export const requestGraphQl = (query: string) => client.request(query);
