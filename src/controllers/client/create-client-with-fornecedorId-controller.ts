import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createClient } from '@/models/client/create-client-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function createClienteWithFornecedorController(
  app: FastifyInstance,
) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '-with-entidadeId',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'criar cliente a partir de uma entidade já cadastrada',
          security: [{ bearerAuth: [] }],
          body: z.object({
            countryId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional().nullable(),
            whatsapp: z.string().optional().nullable(),
            endereco: z.string().optional().nullable(),
            email: z.string().optional().nullable(), // email()
            subContaId: z.number(),
            entidadeId: z.number(),
            tipoDesconto: z.enum([
              'COMERCIAL',
              'FINANCEIRO',
              'DIVERSO',
              'NENHUM',
            ]),
            valorDesconto: z.number().optional().nullable(),
            percentagemDesconto: z.number().optional().nullable(),
            efectuaRetencao: z.boolean(),
            saldo: z.number(),
            limiteSaldo: z.number(),
            limiteCredito: z.number(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-cliente')
        const { entidadeId, ...rest } = request.body
        await Prisma.entidade.findError(entidadeId)
        const cliente = await createClient({
          entidadeId,
          client: { ...rest },
        })
        return reply.send(cliente)
      },
    )
}
