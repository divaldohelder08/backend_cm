import { prisma } from '@/lib/prisma'

export async function getClientModel(id: number) {
  return await prisma.cliente.findUnique({
    where: {
      id,
    },
    include: {
      entidade: {
        select: {
          name: true,
          tipo: true,
          identificacao: true,
          tipodeIdentificacao: true,
        },
      },
      country: {
        select: {
          name: true,
          code: true,
        },
      },
    },
  })
}
