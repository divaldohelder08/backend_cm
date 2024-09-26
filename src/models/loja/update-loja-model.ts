import { prisma } from '@/lib/prisma'
import type { Loja } from '@/types/global'

interface props {
  data: Loja
  id: number
}

export async function updateLojaModel({ data, id }: props) {
  return await prisma.loja.update({
    data,
    where: {
      id,
    },
  })
}
