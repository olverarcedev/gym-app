import { z } from 'zod';

export const MemberDeleteDTO = z.object({
  id: z.string().cuid(),
});
