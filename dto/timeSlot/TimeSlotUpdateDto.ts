import { z } from 'zod';

const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

export const TimeSlotUpdateDTO = z.object({
  id: z.string().cuid(),
  activityId: z.string().optional(),
  startTime: z.string().regex(timeRegex, 'Invalid time format. Must be HH:MM:SS').optional(),
  endTime: z.string().regex(timeRegex, 'Invalid time format. Must be HH:MM:SS').optional(),
  dayOfWeek: z.number().optional()
});