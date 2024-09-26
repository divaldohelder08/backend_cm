import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateFornecedorModel } from '@/models/fornecedor/update-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateFornecedorController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'Actualizar fornecedor',
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
            email: z.string().email().nullable(),
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
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        const data = request.body
        await request.verifyPermission('update-fornecedor')
        const { id } = request.params
        await Prisma.fornecedor.findError(id)
        return reply.code(201).send(
          await updateFornecedorModel({
            data,
            id,
          }),
        )
      },
    )
}
