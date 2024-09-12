import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.instructor.create({
    data: {
      name: 'John Doe',
      description: 'Expert in fitness',
      iconUrl: 'http://example.com/icon.png'
    }
  })

  await prisma.member.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      iconUrl: 'http://example.com/member-icon.png',
      fcmToken: 'some-fcm-token'
    }
  })

}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
