import { prisma } from '@/lib/prisma'

export async function getArmazemModel(id: number) {
  return await prisma.armazem.findUnique({
    where: {
      id,
    },
  })
}
