import { prisma } from '@/lib/prisma'

export async function listArtigoFamiliaProdutoModel() {
  return await prisma.artigo.findMany({ where: { familia: 'PRODUCT' } })
}
