import { prisma } from '@/lib/prisma'

export async function listIsencaoModel() {
  return await prisma.isencao.findMany({
    select: {
     id: true,
     codIsencao: true,
     mencaoConstarDoc: true,
    }
  })
}
