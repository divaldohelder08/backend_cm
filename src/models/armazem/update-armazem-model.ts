import { prisma } from '@/lib/prisma'

interface props {
  data: any
  id: number
}

export async function updateArmazemModel({ data, id }: props) {
  return await prisma.armazem.update({
    data,
    where: {
      id,
    },
  })
}
