import { prisma } from '@/lib/prisma'

export async function listPermissions() {
  const res = await prisma.permission.findMany({
    include: {
      _count: {
        select: {
          profilePermissions: true,
        },
      },
    },
  })
  return res.map((e) => {
    return {
      id: e.id,
      slug: e.slug,
      description: e.description,
      perfis: e._count.profilePermissions,
    }
  })
}
