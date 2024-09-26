import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getFornecedorModel } from '@/models/fornecedor/get-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getFornecedorController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:id',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'Encontrar Fornecedor',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-fornecedor')
        const { id } = request.params
        await Prisma.fornecedor.findError(id)
        return reply.send(await getFornecedorModel(id))
      },
    )
}
