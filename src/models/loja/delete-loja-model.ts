import { prisma } from '@/lib/prisma'

export async function deleteLojaModel(id: number) {
  return await prisma.loja.delete({
    where: {
      id,
    },
  })
}
