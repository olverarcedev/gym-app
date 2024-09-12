import { z } from 'zod';

export const TimeSlotGetDTO = z.object({
  id: z.string().cuid(),
});
