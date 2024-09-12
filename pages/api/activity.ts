import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createOne, getAll, updateOne } from '../services/activity';
import { ActivitySaveDTO } from '../../dto/activity/ActivitySlotSaveDto';
import { ActivityUpdateDTO } from '../../dto/activity/ActivitySlotUpdateDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const activities = await getAll();
    res.status(200).json({ message: 'Activities successfully found', data: activities });
  } else if (req.method === 'POST') {
    try {
      const {name, description, categoryId, instructorId} = ActivitySaveDTO.parse(req.body);
      const activity = await createOne(name, description, categoryId, instructorId);  
      res.status(200).json({ message: 'Activity successfully created', data: activity});
    }  catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error creating activity', error: error.message });
      }
    }
  } else if (req.method === 'PUT') {
    try {
      const {id, name, description, categoryId, instructorId} = ActivityUpdateDTO.parse(req.body);
      const activity = await updateOne(id, name, description, categoryId,instructorId);  
      res.status(200).json({ message: 'Activity successfully updated', data: activity});      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error updating activity', error: error.message });
      }
    }
  }else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}