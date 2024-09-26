import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'

export async function updateBanco(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['RH', 'Banco'],
          summary: 'Atualizar informações de um banco',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            nome_banco: z.string().min(3, {
              message: 'O nome precisa ter no mínimo 3 caracteres',
            }),
            codigo: z.string().min(3, {
              message: 'O nome precisa ter no mínimo 1 caractere',
            }),
            sigla: z.string().min(2, {
              message: 'A sigla precisa ter no mínimo 2 caracteres',
            }),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-banco')
        const body = request.body
        const { id } = request.params
        const { data } = await api.put(`/banco/${id}`, body)
        return reply.code(201).send(data)
      },
    )
}
