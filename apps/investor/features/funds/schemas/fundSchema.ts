import { z } from 'zod';

export const fundSchema = z.object({
  fundCode: z.string().min(1),
  fundName: z.string().min(1),
  riskLevel: z.string().min(1),
});
