import { Activity, TimeSlot } from '@prisma/client';
import { prisma } from '../../lib/prisma';

async function getAll(): Promise<(TimeSlot & { activity: Activity })[]> {
  const timeSlots = await prisma.timeSlot.findMany({
    include: {
      activity: true,
    },
  });
  await prisma.$disconnect();
  return timeSlots;
}
async function getOne(id: string): Promise<TimeSlot | null> {
  return await prisma.timeSlot.findUnique({
    where: { id: id },
  });
}
async function createOne(startTime: string, endTime: string, dayOfWeek: number, activityId: string): Promise<TimeSlot> {
  return await prisma.timeSlot.create({
    data: {
      startTime, endTime, dayOfWeek, activityId
    },
    include: {
      activity: true
    }
  });
}
async function updateOne(id: string, startTime: string, endTime: string, activityId: string, dayOfWeek: number): Promise<TimeSlot> {
  return await prisma.timeSlot.update({
    where: { id: id }, data: {
      startTime, endTime, activityId, dayOfWeek
    },
    include: {
      activity: true
    }
  });
}
async function deleteOne(id: string): Promise<TimeSlot> {
  return await prisma.timeSlot.delete({ where: { id: id } });
}

export { getAll, getOne, createOne, updateOne, deleteOne }