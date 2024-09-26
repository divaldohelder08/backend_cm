import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'

export async function seedUsers() {
  const first = await prisma.user.findFirst({
    where: {
      email: 'john@acme.com',
    },
  })
  if (first) return

  const password = await bcrypt.hash('123456', 6)

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@acme.com',
      password,
      isSuperAdmin: true,
    },
  })
}
