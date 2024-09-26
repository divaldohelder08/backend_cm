import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listRoleModel } from '@/models/role/list-role-model'
import { auth } from '@/routes/middlewares/auth'

export async function listRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Roles'],
          summary: 'Listar todas as roles',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            name: z.string().optional(),
          }),
          response: {
            200: z.object({
              roles: z
                .object({
                  id: z.number(),
                  name: z.string(),
                  description: z.string().nullable(),
                  permissions: z.number(),
                  users: z.number(),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-role')
        const { name } = request.query
        const roles = await listRoleModel(name)
        return reply.code(200).send({ roles })
      },
    )
}
