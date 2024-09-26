import { prisma } from '@/lib/prisma'

export async function createUnityModels(name: string) {
  return await prisma.unidade.create({
    data: {
      name,
    },
  })
}
