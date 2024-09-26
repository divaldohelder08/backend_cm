import { prisma } from '@/lib/prisma'

export async function createSubCategoryModel(name: string, categoriaId: number) {
  return await prisma.subCategoria.create({
    data: {
      name,
      categoriaId
    },
  })
}
