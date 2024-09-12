import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { ActivityGetDTO } from '../../../dto/activity/ActivityGetDto';
import { deleteOne, getOne } from '../../services/activity';
import { ActivityDeleteDTO } from '../../../dto/activity/ActivityDeleteDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = ActivityGetDTO.parse(req.query);
    const activity = await getOne(id);
    res.status(200).json({ message: 'Activity successfully found', data: activity });
  }
  else if(req.method === 'DELETE'){
    try {
      const {id} = ActivityDeleteDTO.parse(req.query);
      const activity = await deleteOne(id);
      res.status(200).json({ message: 'Activity successfully deleted', data: activity});  
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error deleting activity', error: error.message });
      }
    }
  }
}