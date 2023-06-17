import axios from 'axios';
import { envs } from '../helpers/parseEnvs';

export const api = axios.create({
  baseURL: envs.NEXT_PUBLIC_API_URL,
});
