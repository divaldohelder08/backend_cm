import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listLojaModel } from '@/models/loja/list-loja-model'
import { auth } from '@/routes/middlewares/auth'

export async function listLojasController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Loja'],
          summary: 'listas lojas',
          security: [{ bearerAuth: [] }],
          response: {
            200: z
              .object({
                id: z.number(),
                name: z.string(),
                identificacao: z.string(),
                address: z.string(),
                provinciaId: z.number(),
                telefone: z.string(),
                telefone2: z.string().nullable(),
                email: z.string().email(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-loja')
        return reply.code(200).send(await listLojaModel())
      },
    )
}
