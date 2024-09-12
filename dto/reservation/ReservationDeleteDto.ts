import { z } from 'zod';
export const ReservationDeleteDTO = z.object({
  id: z.string().cuid(),
});
