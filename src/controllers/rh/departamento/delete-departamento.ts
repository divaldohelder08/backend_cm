import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function deleteDepartamento(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['RH', 'Departamento'],
          summary: 'Deletar departamento pelo id',
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
        await request.verifyPermission('delete-departamento')
        try {
          await api.delete(`/departamento/${id}`)
          return reply.code(200).send('departamento deletado com sucesso')
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}