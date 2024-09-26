import { prisma } from '@/lib/prisma'

export async function updateSubCategoryModel(id: number, name: string, categoriaId: number,) {
  return await prisma.subCategoria.update({ where: { id }, data: { name, categoriaId } })
}
