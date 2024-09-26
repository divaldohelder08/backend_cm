import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import type { carreira } from '@/types/global'
import { getError } from '@/utils/error-utils'

export async function updateCarreira(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['RH', 'Carreira'],
          summary: 'Atualizar informações da categoria',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            nome_carreira: z
              .string()
              .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
            regime: z.enum(['geral', 'especial'], {
              message: 'O Regime somente deve ser geral ou especial!',
            }),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-carreira')
        const body = request.body
        const { id } = request.params

        try {
          const { data } = await api.put<carreira>(`/carreira/${id}`, body)
          return reply.code(201).send(data)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
