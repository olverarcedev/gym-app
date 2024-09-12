import { z } from 'zod';

export const ReservationUpdateDTO = z.object({
  id: z.string().cuid(),
  memberId: z.string().cuid().optional(),
  timeSlotId: z.string().cuid().optional(),
  reminderEnabled: z.boolean().optional()
});