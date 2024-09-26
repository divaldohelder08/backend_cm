import { prisma } from '@/lib/prisma'

interface props {
  id: number
  name: string
}

export async function updateUnityModel({ id, name }: props) {
  return await prisma.unidade.update({
    data: {
      name,
    },
    where: {
      id,
    },
  })
}
