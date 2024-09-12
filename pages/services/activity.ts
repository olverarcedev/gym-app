import { Activity, Category, Instructor, TimeSlot } from '@prisma/client';
import { prisma } from '../../lib/prisma';

async function getAll(): Promise<(Activity & { category: Category, instructor: Instructor, TimeSlot: TimeSlot[] })[]> {
  const activities = await prisma.activity.findMany({
    include: {
      category: true,
      instructor: true,
      TimeSlot: true
    },
  });
  await prisma.$disconnect();
  return activities;
}
async function getOne(id: string): Promise<Activity | null> {
  return await prisma.activity.findUnique({
    where: { id: id },
  });
}
async function createOne(name: string, description: string, categoryId: string, instructorId: string): Promise<Activity> {
  return await prisma.activity.create({
    data: {
      name, description, categoryId, instructorId
    },
    include: {
      category: true,
      instructor: true,
      TimeSlot: true
    }

  });
}
async function updateOne(id: string, name: string, description: string, categoryId: string, instructorId: string): Promise<Activity> {
  return await prisma.activity.update({
    where: { id: id }, data: {
      name, description, categoryId, instructorId
    },
    include: {
      category: true,
      instructor: true,
      TimeSlot: true
    }
  }
  );
}
async function deleteOne(id: string): Promise<Activity> {
  return await prisma.activity.delete({ where: { id: id } });
}

export { getAll, getOne, createOne, updateOne, deleteOne }