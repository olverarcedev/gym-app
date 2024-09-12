import { z } from 'zod';

export const ReservationSaveDTO = z.object({
  memberId: z.string().cuid(),
  timeSlotId: z.string().cuid(),
  reminderEnabled: z.boolean()
});