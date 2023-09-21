import { GraphQLClient } from 'graphql-request';

import { privateEnvs, publicEnvs } from '@/shared/config/envs';

const client = new GraphQLClient(publicEnvs.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${privateEnvs.GRAPHCMS_MUTATION_TOKEN}`,
  },
  cache: 'force-cache',
});

export const requestGraphQl = (
  query: string,
  variables?: Record<string, unknown>
) => client.request(query, variables);
