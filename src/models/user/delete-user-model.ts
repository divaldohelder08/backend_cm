import { prisma } from '@/lib/prisma'

export async function deleteUserModel(id: number) {
  return await prisma.user.delete({
    where: {
      id,
    },
  })
}
