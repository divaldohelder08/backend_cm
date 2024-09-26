import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import type { carreira } from '@/types/global'

export async function createCarreira(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['RH', 'Carreira'],
          summary: 'Criar carreira',
          security: [{ bearerAuth: [] }],
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
        await request.verifyPermission('create-carreira')
        const body = request.body
        const { data } = await api.post<carreira>('/carreira', body)
        return reply.code(201).send(data)
      },
    )
}
