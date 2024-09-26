import { prisma } from '@/lib/prisma'

export async function deleteFornecedorModel(id: number) {
  return await prisma.fornecedor.delete({
    where: {
      id,
    },
  })
}
