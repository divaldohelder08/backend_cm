import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateRoleModel } from '@/models/role/update-role-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:id',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Atualizar as informações de uma name',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            name: z.string(),
            description: z.string().optional(),
          }),
          response: {
            204: z.object({
              id: z.number(),
              name: z.string(),
              description: z.string().optional().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-role')
        const {
          params: { id },
          body: { name, description },
        } = request
        await Prisma.role.findError(id)

        return reply
          .status(204)
          .send(await updateRoleModel({ name, description, id }))
      },
    )
}
