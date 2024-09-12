import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createOne, getAll, updateOne } from '../services/categories';
import { CategorySaveDTO } from '../../dto/category/CategorySaveDto';
import { CategoryUpdateDTO } from '../../dto/category/CategoryUpdateDto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const categories = await getAll();
    res.status(200).json({ message: 'Categories successfully found', data: categories });
  } else if (req.method === 'POST') {
    try {
      const { name, description, iconUrl } = CategorySaveDTO.parse(req.body);
      const category = await createOne(name, description, iconUrl);
      res.status(200).json({ message: 'Category successfully created', data: category });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error creating category', error: error.message });
      }
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, name, description, iconUrl } = CategoryUpdateDTO.parse(req.body);
      const category = await updateOne(id, name, description, iconUrl);
      res.status(200).json({ message: 'Category successfully updated', data: category });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Error updating category', error: error.message });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}