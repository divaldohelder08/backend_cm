import { prisma } from '@/lib/prisma'

export async function CreateArtigoCodigoBarra(
  artigoId: number,
  forncedorId: number | null,
  codigoBarra: string,
) {
  return await prisma.artigoCodigoBarra.create({
    data: {
      codigoBarra,
      artigoId,
      forncedorId,
    },
  })
}
