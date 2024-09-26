import { prisma } from '@/lib/prisma'

export async function deleteArmazemModel(id: number) {
  return await prisma.armazem.delete({
    where: {
      id,
    },
  })
}
