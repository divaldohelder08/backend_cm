import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteArmazemModel } from '@/models/armazem/delete-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:armazemId',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'Apagar armazemId',
          security: [{ bearerAuth: [] }],
          params: z.object({
            armazemId: z.coerce.number(),
          }),
          response: {
            201: z.object({ message: z.string() }),
          },
        },
      },
      async (request, reply) => {
        const { armazemId } = request.params
        await request.verifyPermission('delete-armazem')
        await Prisma.armazem.findError(armazemId)
        await deleteArmazemModel(armazemId)
        return reply
          .status(201)
          .send({ message: 'Armazem apagado com sucesso' })
      },
    )
}
