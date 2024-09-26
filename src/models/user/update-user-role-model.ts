import { prisma } from '@/lib/prisma'
import { Prisma } from '@/utils/prisma-throws'
interface props {
  userId: number
  id: number
  value: boolean
}
export async function updateUserModel({ userId, id, value }: props) {
  await Prisma.role.findError(id)

  if (value === true) {
    await prisma.userProfile.upsert({
      where: {
        roleId_userId: {
          userId,
          roleId: id,
        },
      },
      update: {}, // Não é necessário fazer nada, a permissão já existe
      create: {
        userId,
        roleId: id,
      },
    })
  } else {
    // Remove a permissão
    await prisma.userProfile.deleteMany({
      where: {
        userId,
        roleId: id,
      },
    })
  }
  return 'Role do usuário atualizada com sucesso!'
}
