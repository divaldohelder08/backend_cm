import { prisma } from '@/lib/prisma'

export async function listArtigoModel() {
  return await prisma.artigo.findMany()
}
