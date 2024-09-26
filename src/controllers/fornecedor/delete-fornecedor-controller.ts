import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteFornecedorModel } from '@/models/fornecedor/delete-fornecedor-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteFornecedorController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['Fornecedor'],
          summary: 'Apagar um fornecedor',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            204: z.any(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        await request.verifyPermission('delete-fornecedor')
        await Prisma.fornecedor.findError(id)
        await deleteFornecedorModel(id)
        return reply.status(204).send('Fornecedor deletado com sucesso')
      },
    )
}
