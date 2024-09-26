import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listTipoDeImpostoModel } from '@/models/tipo-de-imposto/list-tipo-de-imposto-model'
import { auth } from '@/routes/middlewares/auth'

export async function listTipoDeImpostoControll(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '',
      {
        schema: {
          tags: ['tipo de imposto'],
          summary: 'Listar tipo de imposto',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.any({}),
          },
        },
      },
      async (response, reply) => {
        return reply.status(200).send(await listTipoDeImpostoModel())
      },
    )
}
