import { z } from 'zod';

export const InstructorDeleteDTO = z.object({
  id: z.string().cuid(),
});
