import { GraphQLClient } from 'graphql-request';
import { parsedEnvs } from '../../_config/parseEnvs';

const client = new GraphQLClient(parsedEnvs.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${parsedEnvs.GRAPHCMS_MUTATION_TOKEN}`,
  },
});

export const requestGraphQl = (query: string) => client.request(query);
