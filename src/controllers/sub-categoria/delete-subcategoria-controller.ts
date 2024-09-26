import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteSubCategoryModel } from '@/models/sub-categoria/delete-subcategory-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['sub-categoria'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: { 200: z.string() },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('delete-subcategory')
        const { id } = request.params
        await Prisma.subCategoria.findError(id)
        await deleteSubCategoryModel(id)
        return reply.status(200).send('Categoria deletado com sucesso.')
      },
    )
}
