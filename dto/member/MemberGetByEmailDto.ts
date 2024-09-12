import { z } from 'zod';

export const MemberGetByEmailDTO = z.object({
  email: z.string().email(),
});
