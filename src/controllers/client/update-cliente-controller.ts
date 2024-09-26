import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

import { updateClientModel } from '../../models/client/update-client-model'

export async function updateClienteController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'Actualizar cliente',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            countryId: z.number(),
            telefone: z.string(),
            telefone2: z.string().nullable(),
            whatsapp: z.string().nullable(),
            endereco: z.string().nullable(),
            email: z.string().nullable(), // .email()
            subContaId: z.number(),
            entidade: z.object({
              id: z.number(),
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
            valorDesconto: z.number().nullable(),
            percentagemDesconto: z.number().nullable(),
            efectuaRetencao: z.boolean(),
            saldo: z.number(),
            limiteSaldo: z.number(),
            limiteCredito: z.number(),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-cliente')
        const {
          params: { id },
          body: data,
        } = request
        await Prisma.client.findError(id)
        return reply.code(201).send(await updateClientModel({ data, id }))
      },
    )
}
