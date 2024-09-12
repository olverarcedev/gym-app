import { z } from 'zod';

export const TimeSlotDeleteDTO = z.object({
  id: z.string().cuid(),
});
