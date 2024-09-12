import { z } from 'zod';

export const InstructorSaveDTO = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  iconUrl: z.string().url().optional(),
});
