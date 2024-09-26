import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateRolePermissionController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:roleId/permission',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Atualiza as permissões de uma role',
          security: [{ bearerAuth: [] }],
          params: z.object({
            roleId: z.coerce.number(),
          }),
          body: z.object({
            permissionId: z.number(),
            has: z.boolean(),
          }),
          response: {
            204: z.string(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-role')
        const { roleId } = request.params
        const { permissionId, has } = request.body

        await Prisma.role.findError(roleId)
        await Prisma.permission.findError(permissionId)

        if (has) {
          // Adiciona a permissão
          await prisma.rolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId,
                permissionId,
              },
            },
            update: {}, // Não é necessário fazer nada, a permissão já existe
            create: {
              roleId,
              permissionId,
            },
          })
        } else {
          // Remove a permissão
          await prisma.rolePermission.deleteMany({
            where: {
              roleId,
              permissionId,
            },
          })
        }
        console.log('role updated')
        return reply.status(204).send('Permissão atualizada com sucesso!')
      },
    )
}
