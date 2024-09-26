import { prisma } from '@/lib/prisma'

export async function getUserModel(userId: number) {
  const rol: {
    id: number
    name: string
  }[] = await prisma.$queryRaw`
    SELECT name, id FROM roles 
        WHERE id IN (
          SELECT role_id
          FROM user_profiles 
          WHERE role_id IN (
            SELECT role_id 
            FROM user_profiles
            WHERE user_id = ${userId}
          )
        )
     `

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  const roles = await prisma.role.findMany({
    where: {
      id: {
        in: rol.map((e) => e.id),
      },
    },
    include: {
      rolePermissions: {
        select: {
          permission: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  })
  return { roles, user }
}
