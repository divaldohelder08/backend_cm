import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'

export async function listFuncionario(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['RH', 'Funcionario'],
          summary: 'Listar Funcionários',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-funcionario')
        const { data } = await api.get('/funcionario')
        return reply.code(200).send(data)
      },
    )
}
