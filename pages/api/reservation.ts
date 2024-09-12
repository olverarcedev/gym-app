import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ReservationSaveDTO } from '../../dto/reservation/ReservationSaveDto';
import { createOne, getAll, updateOne } from '../services/reservation';
import { ReservationUpdateDTO } from '../../dto/reservation/ReservationUpdateDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const reservations = await getAll();
    res.status(200).json({ message: 'Reservations successfully found', data: reservations });
  } else if (req.method === 'POST') {
    try {
      const {memberId, timeSlotId,reminderEnabled} = ReservationSaveDTO.parse(req.body);
      const reservation = await createOne(memberId, timeSlotId, reminderEnabled);  
      res.status(200).json({ message: 'Reservation successfully created', data: reservation});
    }  catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error creating reservation', error: error.message });
      }
    }
  } else if (req.method === 'PUT') {
    try {
      const {id, memberId, timeSlotId, reminderEnabled} = ReservationUpdateDTO.parse(req.body);
      const reservation = await updateOne(id, memberId, timeSlotId, reminderEnabled);  
      res.status(200).json({ message: 'Reservation successfully updated', data: reservation});      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error updating reservation', error: error.message });
      }
    }
  }else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}