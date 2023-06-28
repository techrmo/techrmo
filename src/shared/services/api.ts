import axios from 'axios';
import { parsedEnvs } from '../helpers/parseEnvs';

export const api = axios.create({
  baseURL: parsedEnvs.NEXT_PUBLIC_API_URL,
});
