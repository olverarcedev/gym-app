import { NextApiRequest, NextApiResponse } from 'next';
import { TimeSlotGetDTO } from '../../../dto/timeSlot/TimeSlotGetDto';
import { deleteOne, getOne } from '../../services/timeSlot';
import { z } from 'zod';
import { TimeSlotDeleteDTO } from '../../../dto/timeSlot/TimeSlotDeleteDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = TimeSlotGetDTO.parse(req.query);
    const timeSlot = await getOne(id);
    res.status(200).json({ message: 'TimeSlot successfully found', data: timeSlot});
  }
  else if(req.method === 'DELETE'){
    try {
      const {id} = TimeSlotDeleteDTO.parse(req.query);
      const timeSlot = await deleteOne(id);  
      res.status(200).json({ message: 'TimeSlot successfully deleted', data: timeSlot});  
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error deleting timeSlot', error: error.message });
      }
    }
  }
}