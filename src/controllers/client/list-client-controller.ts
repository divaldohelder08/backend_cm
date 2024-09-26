import { Estado, TipoDesconto, TipoIdentificacao } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listClientModel } from '@/models/client/list-client-model'
import { auth } from '@/routes/middlewares/auth'

export async function listClienteController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'listas clientes',
          security: [{ bearerAuth: [] }],
          response: {
            200: z
              .object({
                id: z.number(),
                entidadeId: z.number(),
                tipoDesconto: z.nativeEnum(TipoDesconto),
                saldo: z.number(),
                estado: z.nativeEnum(Estado),
                country: z.object({
                  code: z.string(),
                  name: z.string(),
                }),
                entidade: z.object({
                  name: z.string(),
                  identificacao: z.string(),
                  tipodeIdentificacao: z.nativeEnum(TipoIdentificacao),
                  isFornecedor: z.boolean(),
                }),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-cliente')
        return reply.code(200).send(await listClientModel())
      },
    )
}
