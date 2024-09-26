import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteCategoryModel } from '@/models/categoria/delete-categoria-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      'y/:id',
      {
        schema: {
          tags: ['Categoria'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            200: z.string(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('delete-category')
        const { id } = request.params
        await Prisma.categoria.findError(id)
        await deleteCategoryModel(id)
        return reply.status(200).send('User deletado.')
      },
    )
}
