import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createOne, getAll, updateOne } from '../services/timeSlot';
import { TimeSlotSaveDTO } from '../../dto/timeSlot/TimeSlotSaveDto';
import { TimeSlotUpdateDTO } from '../../dto/timeSlot/TimeSlotUpdateDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const timeSlot = await getAll();
    res.status(200).json({ message: 'TimeSlots successfully found', data: timeSlot });
  } else if (req.method === 'POST') {
    try {
      const { startTime, endTime, dayOfWeek, activityId} = TimeSlotSaveDTO.parse(req.body);
      const timeSlot = await createOne(startTime, endTime, dayOfWeek, activityId);  
      res.status(200).json({ message: 'TimeSlot successfully created', data: timeSlot});
    }  catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error creating timeSlot', error: error.message });
      }
    }
  } else if (req.method === 'PUT') {
    try {
      const {id, startTime, endTime, activityId, dayOfWeek} = TimeSlotUpdateDTO.parse(req.body);
      const timeSlot = await updateOne(id, startTime, endTime, activityId, dayOfWeek);  
      res.status(200).json({ message: 'TimeSlot successfully updated', data: timeSlot});      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error updating timeSlot', error: error.message });
      }
    }
  }else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}