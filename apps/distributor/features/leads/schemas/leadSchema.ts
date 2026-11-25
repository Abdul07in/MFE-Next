import { z } from 'zod';

export const leadSchema = z.object({
  leadId: z.string().min(1),
  investorName: z.string().min(1),
  status: z.string().min(1),
});
