import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateSubCategoryModel } from '@/models/sub-categoria/update-subcategory-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['sub-categoria'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            name: z.string(),
            categoriaId: z.number()
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-subcategory')
        const {
          body: { name, categoriaId },
          params: { id },
        } = request
        await Prisma.subCategoria.findError(id)
        await Prisma.categoria.findError(categoriaId)
        
        return reply.status(200).send(await updateSubCategoryModel(id, name, categoriaId))
      },
    )
}
