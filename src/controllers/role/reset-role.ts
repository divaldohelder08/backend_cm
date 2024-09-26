// Spell:ignore resetada
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function restRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:roleId/reset',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Resetar todas as permissões de uma role',
          security: [{ bearerAuth: [] }],
          params: z.object({
            roleId: z.coerce.number(),
          }),
          response: {
            204: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-role')
        const { roleId } = request.params
        await Prisma.role.findError(roleId)
        await prisma.rolePermission.deleteMany({
          where: { roleId },
        })

        return reply.status(204).send({ message: 'Rolo resetada com sucesso' })
      },
    )
}
