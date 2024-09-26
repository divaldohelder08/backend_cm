import { prisma } from '@/lib/prisma'

export async function listRoleModel(name: string | undefined) {
  const res = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      _count: {
        select: {
          rolePermissions: true,
          usersProfiles: true,
        },
      },
    },
    where: {
      name: {
        contains: name,
      },
    },
    orderBy: {
      id: 'asc',
    },
  })
  return res.map((e) => {
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      permissions: e._count.rolePermissions,
      users: e._count.usersProfiles,
    }
  })
}
