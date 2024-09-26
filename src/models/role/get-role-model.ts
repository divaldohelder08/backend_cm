import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

export async function getRoleModel(id: number) {
  const role = await prisma.role.findUnique({
    where: {
      id,
    },
  })
  if (!role) throw new BadRequestError('Role não encontrada')
  return role
}
