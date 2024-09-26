import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listCategoryModel } from '@/models/categoria/list-categoria-model'
import { auth } from '@/routes/middlewares/auth'
export async function listCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      'ies',
      {
        schema: {
          tags: ['Categoria'],
          security: [{ bearerAuth: [] }],
          response: {
            200: z
              .object({
                id: z.number(),
                name: z.string(),
                artigos: z.number(),
                subCategorias: z.number(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-category')
        return reply.status(200).send(await listCategoryModel())
      },
    )
}
