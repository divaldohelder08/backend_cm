import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

interface carreiras {
  id: number
  nome_carreira: string
  regime: string
  createdAt: Date
  updatedAt: Date
}

export async function listCarreiras(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['RH', 'Carreira'],
          summary: 'Listar carreiras',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-carreira')
        // const { name, email } = request.query
        try {
          const { data: carreiras } = await api.get<carreiras[]>('/carreira')
          return reply.code(200).send(carreiras)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
