import { prisma } from '@/lib/prisma'

export async function listArmazemModel() {
  return await prisma.armazem.findMany({
    include: {
      loja: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
}
