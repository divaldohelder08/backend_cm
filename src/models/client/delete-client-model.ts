import { prisma } from '@/lib/prisma'

export async function deleteClientModel(id: number) {
  return await prisma.cliente.delete({
    where: {
      id,
    },
  })
}
