import { z } from 'zod';

export const panSchema = z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
