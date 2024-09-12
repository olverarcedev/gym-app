import { z } from 'zod';

export const CategoryDeleteDTO = z.object({
  id: z.string().cuid(),
});
