import { prisma } from '@/lib/prisma'

export async function listTipoDeImpostoModel() {
  return await prisma.impostType.findMany()
}
