import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function updateCompetencia(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['RH', 'Competencia'],
          summary: 'Atualizar informações da competencia',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            nome_competencia: z.string(),
            criterio: z.enum(['Comportamental', 'Tecnico'], {
              message: 'O critério só deve ser Comportamental ou Tecnico',
            }),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-competencia')
        const body = request.body
        const { id } = request.params

        try {
          const { data } = await api.put(`/competencia/${id}`, body)
          return reply.code(201).send(data)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}