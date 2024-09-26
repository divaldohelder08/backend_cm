import { prisma } from '@/lib/prisma'

export async function updateCategoryModel(id: number, name: string) {
  return await prisma.categoria.update({ where: { id }, data: { name } })
}
