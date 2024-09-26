import { prisma } from '@/lib/prisma'

export async function createLojaModel(data: any) {
  return await prisma.loja.create({
    data,
  })
}
