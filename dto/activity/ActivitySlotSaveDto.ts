import { z } from 'zod';

export const ActivitySaveDTO = z.object({
  name: z.string(),
  description: z.string(),
  instructorId: z.string().cuid(),
  categoryId: z.string().cuid(),
});