import { Member, Reservation, TimeSlot } from '@prisma/client';
import { prisma } from '../../lib/prisma';

async function getAll(): Promise<(Member & {Reservation: Reservation[]})[]> {
  const members = await prisma.member.findMany({
    include: {
      Reservation: true
    }
  });
  await prisma.$disconnect();
  return members;
}
async function getOne(id: string): Promise<Member & {Reservation: (Reservation & {timeSlot: TimeSlot})[]} | null> {
  return await prisma.member.findUnique({
    where: { id },
    include: {
      Reservation: {
        include: {
          timeSlot: true
        }
      }
    }
  });
}
async function getOneByEmail(email: string): Promise<Member & {Reservation: (Reservation & {timeSlot: TimeSlot})[]} | null> {
  return await prisma.member.findUnique({
    where: { email: email},
    include: {
      Reservation: {
        include: {
          timeSlot: true
        }
      }
    }
  });
}

async function createOne(name: string, email: string, iconUrl: string, fcmToken: string): Promise<Member> {
  const existMember: Member | null = await prisma.member.findFirst({where: {email}});
  if(!existMember){
    return await prisma.member.create({data: {
      name, email, iconUrl, fcmToken
    }});  
  }else{
    return existMember;
  }
}
async function updateOne(id: string, name: string, email: string, iconUrl: string, fcmToken: string): Promise<Member> {
  return await prisma.member.update({where: {id: id}, data: {
    name, email, iconUrl, fcmToken
  }});
}
async function deleteOne(id: string): Promise<Member> {
  return await prisma.member.delete({where: {id: id}});
}

export {getAll, getOne, getOneByEmail, createOne, updateOne, deleteOne}