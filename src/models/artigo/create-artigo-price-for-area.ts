import type { Area } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@/utils/prisma-throws'
// cSpell:disable
interface props {
  artigo: {
    area: Area
    artigoId: number
    controloStock: boolean | null
    stockMin: number | null
    stockMax: number | null
    lojaId: number
    armazemId: number
    preco: number
    precoImposto: number
    taxaImpostoId: number | null
    isencaoId: number | null
  }
}

export async function createProductAreaPrice({ artigo }: props) {
  const { armazemId, lojaId, taxaImpostoId, isencaoId, ...rest } = artigo
  await Prisma.armazem.findError(armazemId)
  await Prisma.loja.findError(lojaId)
  taxaImpostoId && (await Prisma.taxa.findError(taxaImpostoId))
  isencaoId && (await Prisma.isencao.findError(isencaoId))

  await prisma.precoArtigo.create({
    data: {
      lojaId,
      armazemId,
      taxaImpostoId,
      isencaoId,
      ...rest,
    },
  })
}
