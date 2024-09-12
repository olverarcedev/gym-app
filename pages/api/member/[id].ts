import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { MemberGetDTO } from '../../../dto/member/MemberGetDto';
import { deleteOne, getOne } from '../../services/member';
import { MemberDeleteDTO } from '../../../dto/member/MemberDeleteDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = MemberGetDTO.parse(req.query);
    const member = await getOne(id);
    res.status(200).json({ message: 'Member successfully found', data: member});
  }
  else if(req.method === 'DELETE'){
    try {
      const {id} = MemberDeleteDTO.parse(req.query);
      const member = await deleteOne(id);  
      res.status(200).json({ message: 'Member successfully deleted', data: member});  
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error deleting member', error: error.message });
      }
    }
  }
}