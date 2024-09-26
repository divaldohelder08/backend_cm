import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function createDepartamento(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['RH', 'Departamento'],
          summary: 'Criar departamento',
          security: [{ bearerAuth: [] }],
          body: z.object({
            nome_departamento: z.string(),
            Id_funcionario_chefe: z.number(),
            Id_funcionario_supervisor: z.number(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-departamento')
        const body = request.body

        try {
          const { data } = await api.post('/departamento', body)
          return reply.code(201).send(data)
        } catch (error) {
          console.log(error)
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
