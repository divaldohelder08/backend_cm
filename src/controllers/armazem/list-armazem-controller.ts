import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listArmazemModel } from '@/models/armazem/list-armazem-model'
import { auth } from '@/routes/middlewares/auth'

export async function listArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'listas Armazem',
          security: [{ bearerAuth: [] }],
          response: {
            200: z
              .object({
                id: z.number(),
                name: z.string(),
                loja: z
                  .object({
                    id: z.number(),
                    name: z.string(),
                  })
                  .nullable(),
                description: z.string().nullable(),
                localidade: z.string().nullable(),
                bloqueioEntrada: z.boolean(),
                bloqueioSaida: z.boolean(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-armazem')
        return reply.code(200).send(await listArmazemModel())
      },
    )
}
