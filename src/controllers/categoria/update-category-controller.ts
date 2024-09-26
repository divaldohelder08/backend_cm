import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateCategoryModel } from '@/models/categoria/update-categoria-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      'y/:id',
      {
        schema: {
          tags: ['Categoria'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
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
        await request.verifyPermission('update-category')
        const { id } = request.params
        const { name } = request.body
        await Prisma.categoria.findError(id)
        return reply.status(200).send(await updateCategoryModel(id, name))
      },
    )
}
