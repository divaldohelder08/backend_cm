import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function listSubAccountsControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/sub-accounts',
    {
      schema: {
        tags: ['Helpers'],
        summary: 'Listar todas as sub contas',
        response: {
          200: z
            .object({
              id: z.number(),
              numero: z.string(),
              description: z.string(),
            })
            .array(),
        },
      },
    },
    async (request, reply) => {
      return reply.send(
        await prisma.subConta.findMany({
          select: {
            id: true,
            numero: true,
            description: true,
          },
        }),
      )
    },
  )
}
