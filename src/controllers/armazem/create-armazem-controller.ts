import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createArmazemModel } from '@/models/armazem/create-armazem-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function createArmazemController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Armazem'],
          summary: 'criar armazem',
          security: [{ bearerAuth: [] }],
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
        await request.verifyPermission('create-armazem')
        const data = request.body
        data.lojaId && (await Prisma.loja.findError(data.lojaId))
        return reply.code(204).send(await createArmazemModel(data))
      },
    )
}
