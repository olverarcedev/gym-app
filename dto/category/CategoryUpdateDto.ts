import { z } from 'zod';

export const CategoryUpdateDTO = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  iconUrl: z.string().url().optional(),
});