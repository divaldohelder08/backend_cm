import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getArmazemModel } from '@/models/armazem/get-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:id',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'Pesquisar armazem por id',
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
        await request.verifyPermission('read-armazem')
        const { id } = request.params
        await Prisma.armazem.findError(id)
        const armazem = await getArmazemModel(id)
        return reply.status(200).send(armazem)
      },
    )
}
