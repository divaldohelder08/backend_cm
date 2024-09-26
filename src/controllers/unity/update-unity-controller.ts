import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateUnityModel } from '@/models/unidade/upadate-unity-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['unidade'],
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
        const { name } = request.body
        const { id } = request.params
        await Prisma.unidade.findError(id)
        const update = await updateUnityModel({ id, name })
        return reply.status(200).send(update)
      },
    )
}
