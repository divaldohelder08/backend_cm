import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function createCompetencia(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['RH', 'Competencia'],
          summary: 'Criar competencia',
          security: [{ bearerAuth: [] }],
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
        await request.verifyPermission('create-competencia')
        const body = request.body

        try {
          const { data } = await api.post('/competencia', body)
          return reply.code(201).send(data)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
