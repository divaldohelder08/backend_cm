import { prisma } from '@/lib/prisma'

export async function findByIdCategoryModel(id: number) {
  return await prisma.categoria.findUnique({ where: { id } })
}
