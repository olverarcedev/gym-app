import { Category } from '@prisma/client';
import { prisma } from '../../lib/prisma';

async function getAll(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  await prisma.$disconnect();
  return categories;
}
async function getOne(id: string): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: { id: id },
  });
}
async function createOne(name: string, description: string, iconUrl: string): Promise<Category> {
  return await prisma.category.create({
    data: {
      name, description, iconUrl
    }
  });
}
async function updateOne(id: string, name: string, description: string, iconUrl: string): Promise<Category> {
  return await prisma.category.update({
    where: { id: id }, data: {
      name, description, iconUrl
    }
  });
}
async function deleteOne(id: string): Promise<Category> {
  return await prisma.category.delete({ where: { id: id } });
}

export { getAll, getOne, createOne, updateOne, deleteOne }