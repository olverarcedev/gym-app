import { NextApiRequest, NextApiResponse } from 'next';
import {getAll, createOne, updateOne} from '../services/instructor';
import { InstructorSaveDTO } from '../../dto/instructor/InstructorSaveDto';
import { z } from 'zod';
import { InstructorUpdateDTO } from '../../dto/instructor/InstructorUpdateDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await getAll();
    res.status(200).json({ message: 'Instructors successfully found', data: users });
  } else if (req.method === 'POST') {
    try {
      const {name, description, iconUrl} = InstructorSaveDTO.parse(req.body);
      const instructor = await createOne(name, description, iconUrl);  
      res.status(200).json({ message: 'Instructor successfully created', data: instructor});
    }  catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error creating instructor', error: error.message });
      }
    }
  } else if (req.method === 'PUT') {
    try {
      const {id, name, description, iconUrl} = InstructorUpdateDTO.parse(req.body);
      const instructor = await updateOne(id, name, description, iconUrl);  
      res.status(200).json({ message: 'Instructor successfully updated', data: instructor});      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error updating instructor', error: error.message });
      }
    }
  }else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}