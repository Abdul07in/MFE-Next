export const ENDPOINTS = {
  platform: {
    ping: '/v1/platform/ping',
  },
  auth: {
    login: '/v1/auth/login',
    refresh: '/v1/auth/refresh',
    logout: '/v1/auth/logout',
  },
  funds: {
    list: '/v1/funds',
    detail: (fundCode: string) => `/v1/funds/${fundCode}`,
  },
  distributor: {
    leads: '/v1/distributor/leads',
    reports: '/v1/distributor/reports',
  },
} as const;
