import { z } from 'zod';
export const ReservationGetDTO = z.object({
  id: z.string().cuid(),
});
