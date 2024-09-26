import { prisma } from '@/lib/prisma'

interface props {
  name: string
  email: string
  password: string
}

export async function createUserModel(data: props) {
  return await prisma.user.create({
    data,
  })
}
