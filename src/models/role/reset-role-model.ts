import { prisma } from '@/lib/prisma'

export async function restRoleModel(roleId: number) {
  await prisma.rolePermission.deleteMany({
    where: { roleId },
  })
}
