import { TipoIdentificacao } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listFornecedoresModel } from '@/models/fornecedor/list-fornecedores-model'
import { auth } from '@/routes/middlewares/auth'

export async function listFornecedoresController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      'es',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'listas fornecedores',
          security: [{ bearerAuth: [] }],
          response: {
            200: z
              .object({
                id: z.number(),
                entidadeId: z.number(),
                email: z.string().nullable(),
                estado: z.enum(['ACTIVO', 'REMOVIDO']),
                country: z.object({
                  code: z.string(),
                  name: z.string(),
                }),
                entidade: z.object({
                  id: z.number(),
                  name: z.string(),
                  identificacao: z.string(),
                  tipodeIdentificacao: z.nativeEnum(TipoIdentificacao),
                  isCliente: z.boolean(),
                }),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-fornecedor')
        return reply.code(200).send(await listFornecedoresModel())
      },
    )
}
