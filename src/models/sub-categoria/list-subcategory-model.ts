import { prisma } from '@/lib/prisma'

export async function listSubCategoryModel() {
  return await prisma.subCategoria.findMany({
    include: {
      categoria: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
}
