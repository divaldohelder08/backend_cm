import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { updateArmazemModel } from '@/models/armazem/update-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:id',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'Actualizar Armazem',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            name: z.string(),
            lojaId: z.number().nullable(),
            description: z.string().nullable().optional(),
            localidade: z.string().nullable().optional(),
            bloqueioEntrada: z.boolean(),
            bloqueioSaida: z.boolean(),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-armazem')
        const {
          params: { id },
          body: data,
        } = request
        await Prisma.armazem.findError(id)
        data.lojaId && (await Prisma.loja.findError(data.lojaId))

        return reply.code(201).send(await updateArmazemModel({ data, id }))
      },
    )
}
