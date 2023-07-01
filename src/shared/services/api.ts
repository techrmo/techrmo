import axios from 'axios';
import { publicEnvs } from '../config/envs/publicEnvs';

export const api = axios.create({
  baseURL: publicEnvs.NEXT_PUBLIC_API_URL,
});
