/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function transformClientToFornecedor(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:id/transform',
      {
        schema: {
          tags: ['Cliente'],
          summary: 'Transformar um cliente em fornecedor',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            entidadeId: z.number(),
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
        const { entidadeId } = request.body
        const {
          entidadeId: a,
          id: b,
          tipoDesconto,
          valorDesconto,
          percentagemDesconto,
          efectuaRetencao,
          saldo,
          limiteSaldo,
          limiteCredito,
          ...rest
        } = await Prisma.client.findError(id)
        await Prisma.entidade.findError(entidadeId)
        await prisma.entidadeTerceiros.update({
          where: { id: entidadeId },
          data: {
            // Cliente: {
            //   create: { ...body, ...rest },
            // },
            fornecedor: {
              create: {
                ...rest,
              },
            },
          },
        })
        return reply.status(200).send('Fornecedor transformado  com sucesso')
      },
    )
}
