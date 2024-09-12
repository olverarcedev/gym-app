import { z } from 'zod';

export const CategorySaveDTO = z.object({
  name: z.string(),
  description: z.string().optional(),
  iconUrl: z.string().url().optional(),
});