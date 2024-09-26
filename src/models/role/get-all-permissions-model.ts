import { prisma } from '@/lib/prisma'

export async function getAllPermissionsModel() {
  return await prisma.permission.findMany()
}
