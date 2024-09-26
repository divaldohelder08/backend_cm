import { prisma } from '@/lib/prisma'
import type { Artigo } from '@/types/global'

interface props {
  artigo: Artigo
}
export async function createArtigoModel({
  artigo: { Estado, Familia, name },
}: props) {
  return await prisma.artigo.create({
    data: {
      name,
      familia: Familia,
      estado: Estado,
    },
  })
}
