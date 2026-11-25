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
  },
} as const;
