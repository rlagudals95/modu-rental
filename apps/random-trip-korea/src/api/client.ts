import axios from 'axios';

import { env } from '@/src/config/env';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 12000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message ?? error.message ?? 'Unknown API error';
    return Promise.reject(new Error(message));
  },
);
