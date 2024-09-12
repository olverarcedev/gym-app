import { z } from 'zod';

export const MemberGetDTO = z.object({
  id: z.string().cuid(),
});
