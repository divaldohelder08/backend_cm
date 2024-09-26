import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function AllPermissionsForARole(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:roleId/all',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Give all permission for some role',
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
        const { roleId } = request.params
        // verify if has the permissions
        await request.verifyPermission('update-role')

        // if role exist
        await Prisma.role.findError(roleId)

        const permissions = await prisma.permission.findMany({
          select: { id: true },
        })
        await prisma.rolePermission.deleteMany({
          where: {
            roleId,
          },
        })
        for (const permission of permissions) {
          await prisma.rolePermission.createMany({
            data: {
              roleId,
              permissionId: permission.id,
            },
          })
        }

        return reply.status(204).send({ message: 'Rolo resetada com sucesso' })
      },
    )
}
