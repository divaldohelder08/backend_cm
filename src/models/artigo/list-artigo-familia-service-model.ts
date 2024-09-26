import { prisma } from '@/lib/prisma'

export async function listArtigoFamiliaServicoModel() {
  return await prisma.artigo.findMany({ where: { familia: 'SERVICE' } })
}
