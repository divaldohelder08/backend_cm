import { prisma } from '@/lib/prisma'

interface props {
  name: string
  description?: string
}
export async function createRoleModel({ name, description }: props) {
  return await prisma.role.create({
    data: {
      name,
      description,
    },
  })
}
