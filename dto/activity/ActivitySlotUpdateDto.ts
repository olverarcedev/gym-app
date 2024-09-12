import { z } from 'zod';

export const ActivityUpdateDTO = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().optional(),
  instructorId: z.string().cuid().optional(),
  categoryId: z.string().cuid().optional(),
});