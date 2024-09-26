import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createCategoryModel } from '@/models/categoria/create-categoria-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function createCategoryController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      'y',
      {
        schema: {
          tags: ['Categoria'],
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z
              .string()
              .min(1, 'O nome têm que conter no mínimo um carácter'),
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
        await request.verifyPermission('create-category')
        const { name } = request.body
        return reply.status(200).send(await createCategoryModel(name))
      },
    )
}
