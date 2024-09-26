import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getUserRolesController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:id/roles',
      {
        schema: {
          tags: ['Settings', 'Members'],
          summary: 'Pegar as roles do usuário logado',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            200: z
              .object({
                id: z.number(),
                name: z.string(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        await Prisma.user.findError(id)
        const { roles } = await request.getUserRoles()
        return reply.send(roles)
      },
    )
}
