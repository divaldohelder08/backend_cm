import { prisma } from '@/lib/prisma'

export async function deleteUnityModel(id: number) {
  return await prisma.unidade.delete({ where: { id } })
}