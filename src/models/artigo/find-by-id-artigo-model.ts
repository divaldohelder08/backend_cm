import { prisma } from '@/lib/prisma'

export async function FindByIdArtigo(id: number) {
  return await prisma.artigo.findUnique({ where: { id } })
}
