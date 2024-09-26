import { prisma } from '@/lib/prisma'
import type { precoArtigo } from '@/types/global'

interface props extends precoArtigo {}

export async function CreatePrecoArtigoModel({
  area,
  armazemId,
  artigoId,
  controlo_stock,
  idTaxaImposto,
  isencaoId,
  lojaId,
  preco,
  precoImposto,
  stockMax,
  stockMin,
}: props) {
  const createPrecoArtigoModel = await prisma.precoArtigo.create({
    data: {
      area,
      artigoId,
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

  return createPrecoArtigoModel
}
