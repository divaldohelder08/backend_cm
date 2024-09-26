import { prisma } from '@/lib/prisma'

export async function deleteSubCategoryModel(id: number) {
  return await prisma.subCategoria.delete({ where: { id } })
}
