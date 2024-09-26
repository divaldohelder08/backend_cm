import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteRoleModel } from '@/models/role/delete-role-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Apagar uma role',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            204: z.string(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('delete-role')
        const { id } = request.params

        await Prisma.role.findError(id)
        await deleteRoleModel(id)

        return reply.status(204).send('Role apagada com sucesso')
      },
    )
}
