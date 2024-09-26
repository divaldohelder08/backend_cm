import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listSubCategoryModel } from '@/models/sub-categoria/list-subcategory-model'
import { auth } from '@/routes/middlewares/auth'

export async function listSubCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['sub-categoria'],
          security: [{ bearerAuth: [] }],
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-subcategory')
        return reply.status(200).send(await listSubCategoryModel())
      },
    )
}
