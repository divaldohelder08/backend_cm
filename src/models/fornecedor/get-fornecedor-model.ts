import { prisma } from '@/lib/prisma'

export async function getFornecedorModel(id: number) {
  return await prisma.fornecedor.findUnique({
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
