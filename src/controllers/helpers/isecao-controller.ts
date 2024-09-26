import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listIsencaoModel } from '@/models/isencao/list-isencao-model'
import { auth } from '@/routes/middlewares/auth'

export async function listIsencaoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/insencoes',
      {
        schema: {
          tags: ['Helpers', 'isencao'],
          summary: 'Listar isencao',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.any(),
          },
        },
      },
      async (_, reply) => {
        const isencao = await listIsencaoModel()
        return reply.status(200).send(isencao)
      },
    )
}
