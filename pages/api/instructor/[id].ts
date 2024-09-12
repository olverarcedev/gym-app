import { NextApiRequest, NextApiResponse } from 'next';
import { deleteOne, getOne } from '../../services/instructor';
import { InstructorDeleteDTO } from '../../../dto/instructor/InstructorDeleteDto';
import { InstructorGetDTO } from '../../../dto/instructor/InstructorGetDto';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = InstructorGetDTO.parse(req.query);
    const instructor = await getOne(id);
    res.status(200).json({ message: 'Instructor successfully found', data: instructor });
  }
  else if(req.method === 'DELETE'){
    try {
      const {id} = InstructorDeleteDTO.parse(req.query);
      const instructor = await deleteOne(id);  
      res.status(200).json({ message: 'Instructor successfully deleted', data: instructor});  
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error deleting instructor', error: error.message });
      }
    }
  }
}