import { z } from 'zod';

export const InstructorGetDTO = z.object({
  id: z.string().cuid(),
});
