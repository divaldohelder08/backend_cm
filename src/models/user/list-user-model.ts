import { prisma } from '@/lib/prisma'
interface props {
  name: string | undefined
  email: string | undefined
  current: number
}

export async function listUserModel({ name, email, current }: props) {
  const res = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      active: true,
      createdAt: true,
      isSuperAdmin: true,
      resetSentAt: true,
      profiles: {
        select: {
          role: {
            select: {
              _count: true,
            },
          },
        },
      },
    },
    where: {
      id: {
        not: current,
      },
      name: {
        contains: name,
      },
      email: {
        contains: email,
      },
    },
  })
  const members = res.map((e) => {
    return {
      id: e.id,
      name: e.name,
      email: e.email,
      avatar: e.avatar,
      status: e.active,
      createdAt: e.createdAt,
      isSuperAdmin: e.isSuperAdmin,
      resetSentAt: e.resetSentAt,
      profiles: e.profiles
        .map((b) => b.role._count.usersProfiles)
        .reduce((acc, e) => e + acc, 0),
    }
  })
  return { members }
}
