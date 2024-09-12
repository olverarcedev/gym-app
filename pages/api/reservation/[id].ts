import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ReservationGetDTO } from '../../../dto/reservation/ReservationGetDto';
import { ReservationDeleteDTO } from '../../../dto/reservation/ReservationDeleteDto';
import { deleteOne, getOne } from '../../services/reservation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = ReservationGetDTO.parse(req.query);
    const reservation = await getOne(id);
    res.status(200).json({ message: 'Reservation successfully found', data: reservation});
  }
  else if(req.method === 'DELETE'){
    try {
      const {id} = ReservationDeleteDTO.parse(req.query);
      const reservation = await deleteOne(id);  
      res.status(200).json({ message: 'Reservation successfully deleted', data: reservation});  
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error deleting reservation', error: error.message });
      }
    }
  }
}