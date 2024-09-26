import { prisma } from '@/lib/prisma'

export async function findByIdSubCategoryModel(id: number) {
  return await prisma.subCategoria.findUnique({ where: { id } })
}
