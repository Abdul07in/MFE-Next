export const queryKeys = {
  platform: {
    ping: ['platform', 'ping'] as const,
  },
  funds: {
    all: ['funds'] as const,
    detail: (fundCode: string) => ['funds', 'detail', fundCode] as const,
  },
  distributor: {
    leads: ['distributor', 'leads'] as const,
    panVerify: (pan: string) => ['distributor', 'pan-verify', pan] as const,
    fatca: (pan: string) => ['distributor', 'fatca', pan] as const,
  },
} as const;
