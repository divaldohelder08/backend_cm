import { prisma } from '@/lib/prisma'

export async function RemoveCodigoBarraModel(id: number) {
  return await prisma.artigoCodigoBarra.delete({ where: { id } })
}
