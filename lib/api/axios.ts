import axios, { type AxiosInstance } from 'axios';

import { applyInterceptors } from './interceptors';

const timeoutMs = Number(process.env.API_TIMEOUT_MS ?? 10000);

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: Number.isFinite(timeoutMs) ? timeoutMs : 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

applyInterceptors(apiClient);
