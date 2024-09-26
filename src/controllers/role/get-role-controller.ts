import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getRoleModel } from '@/models/role/get-role-model'
import { getRolePermissionsModel } from '@/models/role/get-role-permissions-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:id',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Pesquisar role pelo id',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            200: z.object({
              role: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string().nullable(),
              }),
              permissions: z.any(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-role')
        const { id } = request.params
        await Prisma.role.findError(id)
        const role = await getRoleModel(id)
        const permissions = await getRolePermissionsModel(id)
        return reply.send({ role, permissions })
      },
    )
}
