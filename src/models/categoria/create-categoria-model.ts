import { prisma } from '@/lib/prisma'

export async function createCategoryModel(name: string) {
  return await prisma.categoria.create({
    data: {
      name,
    },
  })
}
