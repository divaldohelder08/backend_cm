import { prisma } from '@/lib/prisma'

export async function getByNameUnityModel(name: string) {
  return await prisma.unidade.findUnique({ where: { name } })
}
