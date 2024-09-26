import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { createFornecedorModel } from '@/models/fornecedor/create-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'
import { Prisma } from '@/utils/prisma-throws'

export async function createFornecedorWithFornecedorController(
  app: FastifyInstance,
) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '-with-entidadeId',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'criar fornecedor a partir de uma entidade já cadastrada',
          security: [{ bearerAuth: [] }],
          body: z.object({
            countryId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional().nullable(),
            whatsapp: z.string().optional().nullable(),
            endereco: z.string().optional().nullable(),
            email: z.string().email().optional().nullable(),
            subContaId: z.number(),
            entidadeId: z.number(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-fornecedor')
        const { entidadeId, ...rest } = request.body
        await Prisma.entidade.findError(entidadeId)
        try {
          const fornecedor = await createFornecedorModel({
            entidadeId,
            fornecedor: { ...rest },
          })
          return reply.send(fornecedor)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
