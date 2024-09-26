import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function deleteFuncao(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['RH', 'Função'],
          summary: 'Deletar função pelo id',
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
        await request.verifyPermission('delete-funcao')
        const { id } = request.params
        try {
          await api.delete(`/funcao/${id}`)
          return reply.code(200).send('função deletada com sucesso')
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
