import { Reservation } from '@prisma/client';
import { prisma } from '../../lib/prisma';

async function getAll(): Promise<Reservation[]> {
  const reservations = await prisma.reservation.findMany({
    include: {
      member: true,
      timeSlot: {
        include: {
          activity: true
        }
      }
    }
  });
  await prisma.$disconnect();
  return reservations;
}
async function getOne(id: string): Promise<Reservation | null> {
  return await prisma.reservation.findUnique({
    where: { id: id },
  });
}
async function createOne(memberId: string, timeSlotId: string, reminderEnabled: boolean): Promise<Reservation> {
  return await prisma.reservation.create({
    data: {
      memberId, timeSlotId, reminderEnabled
    },
    include: {
      member: true,
      timeSlot: {
        include: {
          activity: true
        }
      }
    }

  });
}
async function createMany(memberId: string, timeSlotIds: string[], reminderEnabled: boolean): Promise<Reservation[]> {
  const reservations = timeSlotIds.map((timeSlotId) => {
    return {
      memberId, timeSlotId, reminderEnabled
    };
  })
  return await prisma.reservation.createManyAndReturn({ data: reservations });
}

async function updateOne(id: string, memberId: string, timeSlotId: string, reminderEnabled: boolean): Promise<Reservation> {
  return await prisma.reservation.update({
    where: { id: id }, data: {
      memberId, timeSlotId, reminderEnabled
    },
    include: {
      member: true,
      timeSlot: {
        include: {
          activity: true
        }
      }
    }

  });
}
async function deleteOne(id: string): Promise<Reservation> {
  return await prisma.reservation.delete({ where: { id: id } });
}

export { getAll, getOne, createOne, createMany, updateOne, deleteOne }