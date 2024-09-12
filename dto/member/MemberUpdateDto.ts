import { z } from 'zod';

export const MemberUpdateDTO = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  email: z.string().optional(),
  iconUrl: z.string().optional(),
  fcmToken: z.string().optional(),
});