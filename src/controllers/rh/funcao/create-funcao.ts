import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import type { Funcao } from '@/types/global'
import { getError } from '@/utils/error-utils'

export async function createFuncao(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['RH', 'Função'],
          summary: 'Criar função no modulo do recurso humanos',
          security: [{ bearerAuth: [] }],
          body: z.object({
            nome_funcao: z
              .string()
              .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-funcao')
        const body = request.body
        try {
          const { data } = await api.post<Funcao>('/funcao', body)
          return reply.code(201).send(data)
        } catch (error) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
