import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getByNameCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      'y/:name',
      {
        schema: {
          tags: ['Categoria'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            name: z.string(),
          }),
          response: {
            200: z.object({
              id: z.number(),
              name: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-category')
        const { name } = request.params
        return reply.status(200).send(await Prisma.categoria.findError(name))
      },
    )
}
