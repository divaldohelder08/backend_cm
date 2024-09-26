import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteUnityModel } from '@/models/unidade/delete-unity-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['unidade'],
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
        const { id } = request.params
        await Prisma.unidade.findError(id)
        await deleteUnityModel(id)
        reply.status(200).send('Unidade deletado')
      },
    )
}
