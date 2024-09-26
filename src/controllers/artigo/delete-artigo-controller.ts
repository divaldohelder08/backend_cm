import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteArtigoModel } from '@/models/artigo/delete-artigo-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function DeleteArtigoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
        },
      },
      async (request, reply) => {
        const { id } = request.params
        await request.verifyPermission('delete-artigo')
        await Prisma.artigo.findError(id)
        await deleteArtigoModel(id)
        return reply.code(204).send('Artigo deletado com sucesso')
      },
    )
}
