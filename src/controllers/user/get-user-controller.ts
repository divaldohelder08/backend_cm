import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getUserModel } from '@/models/user/get-user-model'
import { auth } from '@/routes/middlewares/auth'

export async function getControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:id',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get member by Id',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            200: z.object({
              roles: z.any(),
              user: z.any(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-user')
        const { id } = request.params
        const users = await getUserModel(id)
        return reply.status(200).send(users)
      },
    )
}
