import { prisma } from '@/lib/prisma'

export async function listLojaModel() {
  return await prisma.loja.findMany({
    include: {
      _count: true,
    },
  })
}
