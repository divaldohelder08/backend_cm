import { prisma } from '@/lib/prisma'
import type { Role } from '@/types/global'

export async function updateRoleModel({ name, id, description }: Role) {
  return await prisma.role.update({
    where: { id },
    data: {
      name,
      description,
    },
  })
}
