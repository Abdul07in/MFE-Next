import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { AppError } from './errors';

const RETRY_HEADER = 'x-retry-once';

function createCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function refreshSessionToken(): Promise<boolean> {
  return false;
}

function sanitizeRequestConfig(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const nextHeaders = {
    ...config.headers,
    'x-correlation-id': createCorrelationId(),
  };

  return {
    ...config,
    headers: nextHeaders,
  };
}

/**
 * Applies request and response interceptors with typed error normalization.
 * @param client Axios instance configured for platform transport.
 */
export function applyInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config) => sanitizeRequestConfig(config));

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ code?: string; message?: string; requestId?: string }>) => {
      const status = error.response?.status;
      const requestConfig = error.config;

      if (status === 401 && requestConfig && !requestConfig.headers?.[RETRY_HEADER]) {
        const refreshed = await refreshSessionToken();

        if (refreshed) {
          requestConfig.headers = {
            ...requestConfig.headers,
            [RETRY_HEADER]: '1',
          };
          return client(requestConfig);
        }
      }

      const payload = error.response?.data;
      throw new AppError({
        code: payload?.code ?? 'TRANSPORT_ERROR',
        message: payload?.message ?? 'Request failed. Please try again.',
        requestId: payload?.requestId,
        status,
        recoverable: status !== 401,
      });
    },
  );
}
