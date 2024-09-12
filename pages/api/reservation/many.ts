import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ReservationSaveManyDTO } from '../../../dto/reservation/ReservationSaveManyDto';
import { createMany } from '../../services/reservation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {memberId, timeSlotIds, reminderEnabled} = ReservationSaveManyDTO.parse(req.body);
      const reservation = await createMany(memberId, timeSlotIds, reminderEnabled);  
      res.status(200).json({ message: 'Reservation successfully created', data: reservation});
    }  catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error creating reservation', error: error.message });
      }
    }
  }else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}