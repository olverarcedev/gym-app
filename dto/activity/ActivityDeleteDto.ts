import { z } from 'zod';

export const ActivityDeleteDTO = z.object({
  id: z.string().cuid(),
});
