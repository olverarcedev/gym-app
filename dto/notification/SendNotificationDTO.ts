import { z } from 'zod';
export const sendNotificationDTO = z.object({
    fcmToken: z.string(),
    title: z.string(),
    body: z.string()
});
