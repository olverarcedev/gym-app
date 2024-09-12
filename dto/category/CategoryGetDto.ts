import { z } from 'zod';

export const CategoryGetDTO = z.object({
  id: z.string().cuid(),
});
