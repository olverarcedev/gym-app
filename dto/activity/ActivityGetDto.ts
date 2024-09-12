import { z } from 'zod';

export const ActivityGetDTO = z.object({
  id: z.string().cuid(),
});
