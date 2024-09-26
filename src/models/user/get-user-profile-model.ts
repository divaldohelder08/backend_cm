import { prisma } from '@/lib/prisma'

export async function getUserProfileModel(id: number) {
  return await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
    where: {
      id,
    },
  })
}
