import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createOne, getAll, updateOne } from '../services/member';
import { MemberSaveDTO } from '../../dto/member/MemberSaveDto';
import { MemberUpdateDTO } from '../../dto/member/MemberUpdateDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const members = await getAll();
    res.status(200).json({ message: 'Member successfully found', data: members });
  } else if (req.method === 'POST') {
    try {
      const {name, email, iconUrl, fcmToken} = MemberSaveDTO.parse(req.body);
      const member = await createOne(name, email, iconUrl, fcmToken);  
      res.status(200).json({ message: 'Member successfully created', data: member});
    }  catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        console.log(error);
        res.status(500).json({ message: 'Error creating Member', error: error.message });
      }
    }
  } else if (req.method === 'PUT') {
    try {
      const {id, name, email, iconUrl, fcmToken} = MemberUpdateDTO.parse(req.body);
      const member = await updateOne(id, name, email, iconUrl, fcmToken);  
      res.status(200).json({ message: 'Member successfully updated', data: member});      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error updating member', error: error.message });
      }
    }
  }else{
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}