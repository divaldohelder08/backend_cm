import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateLojaModel } from '@/models/loja/update-loja-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateLojaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/:id',
      {
        schema: {
          tags: ['Loja'],
          summary: 'Actualizar loja',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            name: z.string(),
            identificacao: z.string(),
            funcionarioId: z.number().optional().nullable(),
            address: z.string(),
            provinciaId: z.number(),
            telefone: z.string(),
            telefone2: z.string().optional(),
            email: z.string().email(),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-loja')
        const {
          params: { id },
          body: data,
        } = request
        await Prisma.loja.findError(id)
        await Prisma.provincia.findError(data.provinciaId)
       data.funcionarioId && await Prisma.funcionario.findError(data.funcionarioId)

        return reply.code(201).send(await updateLojaModel({ data, id }))
      },
    )
}
