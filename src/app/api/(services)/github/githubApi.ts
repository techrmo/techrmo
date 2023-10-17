import axios from 'axios';

import { privateEnvs } from '@/shared/config/envs';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${privateEnvs.GITHUB_TOKEN}`,
  },
});
