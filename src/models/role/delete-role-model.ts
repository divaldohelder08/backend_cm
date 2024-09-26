import { prisma } from '@/lib/prisma'

export async function deleteRoleModel(id: number) {
  return await prisma.role.delete({
    where: { id },
  })
}
