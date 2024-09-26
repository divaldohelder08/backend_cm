/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function transformFornecedorToClient(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:id/transform',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'Transformar um fornecedor em cliente',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            entidadeId: z.number(),
            tipoDesconto: z.enum(
              ['COMERCIAL', 'FINANCEIRO', 'DIVERSO', 'NENHUM'],
              {
                invalid_type_error:
                  "Tipo de desconto inválido. Escolha uma das seguintes opções: 'COMERCIAL', 'FINANCEIRO', 'DIVERSO' ou 'NENHUM'.",
              },
            ),
            valorDesconto: z.coerce
              .number()
              .nonnegative()
              .optional()
              .nullable(),
            percentagemDesconto: z.coerce
              .number()
              .min(0, 'Percentagem de desconto deve ser positiva')
              .max(100, 'Percentagem de desconto não pode exceder 100')
              .optional()
              .nullable(),
            efectuaRetencao: z.boolean(),
            saldo: z.number().min(0, 'Saldo deve ser positivo'),
            limiteSaldo: z.number().min(0, 'Limite de saldo deve ser positivo'),
            limiteCredito: z
              .number()
              .min(0, 'Limite de crédito deve ser positivo'),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-fornecedor')
        await request.verifyPermission('update-cliente')
        const { id } = request.params
        const { entidadeId, ...body } = request.body

        const {
          entidadeId: _,
          id: b,
          ...rest
        } = await Prisma.fornecedor.findError(id)
        await Prisma.entidade.findError(entidadeId)
        await prisma.entidadeTerceiros.update({
          where: { id: entidadeId },
          data: {
            cliente: {
              create: { ...body, ...rest },
            },
          },
        })
        return reply.status(200).send('Fornecedor transformado  com sucesso')
      },
    )
}
