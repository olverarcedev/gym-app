import { z } from 'zod';


const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

export const TimeSlotSaveDTO = z.object({
  activityId: z.string(),
  startTime: z.string().regex(timeRegex, 'Invalid time format. Must be HH:MM:SS'),
  endTime: z.string().regex(timeRegex, 'Invalid time format. Must be HH:MM:SS'),
  dayOfWeek: z.number()
});