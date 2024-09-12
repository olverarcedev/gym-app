import { z } from 'zod';

export const MemberSaveDTO = z.object({
  name: z.string(),
  email: z.string(),
  iconUrl: z.string().optional(),
  fcmToken: z.string().optional(),
});