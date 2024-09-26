import { prisma } from '@/lib/prisma'

export async function deleteCategoryModel(id: number) {
  return await prisma.categoria.delete({ where: { id } })
}
