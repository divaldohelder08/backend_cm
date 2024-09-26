import { prisma } from '@/lib/prisma'

export async function findByIdUnityModel(id: number) {
  return await prisma.unidade.findUnique({ where: { id } })
}
