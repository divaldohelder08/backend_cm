import { prisma } from '@/lib/prisma'

export async function createArmazemModel(params: any) {
  return await prisma.armazem.create({
    data: params,
  })
}
