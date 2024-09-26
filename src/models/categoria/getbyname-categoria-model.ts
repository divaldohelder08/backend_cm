import { prisma } from '@/lib/prisma'

export async function getByNameCategoryModel(name: string) {
  return await prisma.categoria.findUnique({ where: { name } })
}
