import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createSubCategoryModel } from '@/models/sub-categoria/create-subcategory-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function createSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['sub-categoria'],
          security: [{ bearerAuth: [] }],
          body: z.object({
            categoriaId: z.number(),
            name: z.string(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-subcategory')
        const { name, categoriaId } = request.body
        await Prisma.subCategoria.findToError(name)
        await createSubCategoryModel(name, categoriaId)
        return reply.status(200).send('Subcategoria criada com sucesso')
      },
    )
}
