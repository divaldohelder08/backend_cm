import { prisma } from '@/lib/prisma'

export async function deleteArtigoModel(id: number) {
  return await prisma.artigo.delete({ where: { id } })
}
