import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createClientAndEntidadeModel } from '@/models/client/create-client-model'
import { auth } from '@/routes/middlewares/auth'

export async function createClienteAndFornecedorController(
  app: FastifyInstance,
) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '-and-entidade',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'criar cliente a e uma entidade',
          security: [{ bearerAuth: [] }],
          body: z.object({
            countryId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional().nullable(),
            whatsapp: z.string().optional().nullable(),
            endereco: z.string().optional().nullable(),
            email: z.string().optional().nullable(), // .email() fazer aquela merda do transform para ver se [e email
            subContaId: z.number(),
            entidade: z.object({
              name: z.string(),
              tipo: z.enum(['SINGULAR', 'COLECTIVO']),
              identificacao: z.string(),
              tipodeIdentificacao: z.enum([
                'BI',
                'NIF',
                'PASSAPORTE',
                'CARTAO_DE_RESIDENTE',
              ]),
            }),
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
        const { entidade, ...rest } = request.body
        const cliente = await createClientAndEntidadeModel({
          entidade,
          client: { ...rest },
        })
        return reply.send(cliente)
      },
    )
}
