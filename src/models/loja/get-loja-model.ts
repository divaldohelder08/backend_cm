import { prisma } from '@/lib/prisma'

export async function getLojaModel(id: number) {
  return await prisma.loja.findUnique({
    where: {
      id,
    },
  })
}
