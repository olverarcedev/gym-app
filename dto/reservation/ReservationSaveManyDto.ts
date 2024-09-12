import { z } from 'zod';

export const ReservationSaveManyDTO = z.object({
  memberId: z.string().cuid(),
  timeSlotIds: z.array(z.string().cuid()),
  reminderEnabled: z.boolean()
});