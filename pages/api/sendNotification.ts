import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { sendNotificationDTO } from '../../dto/notification/SendNotificationDTO';
import getAccessToken from '../services/accessToken';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { fcmToken, title, body } = sendNotificationDTO.parse(req.body);
            const message = {
                message: {
                    token: fcmToken,
                    notification: {
                        title: title,
                        body: body,
                    }
                }

            };
            const accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error("Error obteniendo access token");
            }
            const response = await fetch('https://fcm.googleapis.com/v1/projects/uta-sport-734ef/messages:send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            const responseData = await response.json();
            console.log(responseData);
            res.status(200).json({ message: 'Send Notification successfully' });
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else {
                console.log(error);
                res.status(500).json({ message: 'Error sending Notification', error: error.message });
            }
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}