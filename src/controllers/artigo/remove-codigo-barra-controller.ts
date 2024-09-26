import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { RemoveCodigoBarraModel } from '@/models/artigo/remove-codigo-barra-model'
import { auth } from '@/routes/middlewares/auth'

export async function RemoveCodigoBarraController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id/barra',
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
        request.verifyPermission('remove-codigo-barra')
        await RemoveCodigoBarraModel(id)
        reply.status(200).send('código barra deletado com sucesso')
      },
    )
}
