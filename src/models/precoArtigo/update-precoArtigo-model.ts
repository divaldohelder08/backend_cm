import { prisma } from '@/lib/prisma'
import type { precoArtigo } from '@/types/global'

interface props extends precoArtigo {}

export async function UpdatePrecoArtigoModel(
  id: number,
  {
    area,
    armazemId,
    controloStock,
    idTaxaImposto,
    isencaoId,
    lojaId,
    preco,
    precoImposto,
    stockMax,
    stockMin,
  }: props,
) {
  const updatePrecoArtigoModel = await prisma.precoArtigo.update({
    where: { id },
    data: {
      area,
      preco,
      armazemId,
      controloStock,
      idTaxaImposto,
      isencaoId,
      lojaId,
      precoImposto,
      stockMax,
      stockMin,
    },
  })

  return updatePrecoArtigoModel
}
