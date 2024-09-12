import { Instructor } from '@prisma/client';
import { prisma } from '../../lib/prisma';


async function getAll(): Promise<Instructor[]> {
    const instructors: Instructor[] = await prisma.instructor.findMany();
    await prisma.$disconnect();
    return instructors;
}
async function getOne(id: string): Promise<Instructor | null> {
  return await prisma.instructor.findUnique({
    where: { id: id},
  });
}
async function createOne(name: string, description?: string, iconUrl?: string): Promise<Instructor> {
  return await prisma.instructor.create({data: {
    name, description, iconUrl
  }});
}
async function updateOne(id: string, name?: string, description?: string, iconUrl?: string): Promise<Instructor> {
  return await prisma.instructor.update({where: {id: id}, data: {name, description, iconUrl}});
}
async function deleteOne(id: string): Promise<Instructor> {
  return await prisma.instructor.delete({where: {id: id}});
}

export {getAll, getOne, createOne, updateOne, deleteOne}