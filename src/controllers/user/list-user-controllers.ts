import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listUserModel } from '@/models/user/list-user-model'
import { auth } from '@/routes/middlewares/auth'

export async function listControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Members'],
          summary: 'Listar members',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            name: z.string().optional(),
            email: z.string().optional(),
          }),
          response: {
            200: z.object({
              members: z
                .object({
                  id: z.number(),
                  name: z.string(),
                  email: z.string(),
                  avatar: z.string().nullable(),
                  isSuperAdmin: z.boolean(),
                  resetSentAt: z.boolean(),
                  status: z.boolean(),
                  createdAt: z.date(),
                  profiles: z.number(),
                })
                .array(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-user')
        const { name, email } = request.query
        const current = await request.getCurrentUserId()
        return reply
          .code(200)
          .send(await listUserModel({ name, email, current }))
      },
    )
}
