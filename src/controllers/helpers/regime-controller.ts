import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function listRegimesControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/regimes',
    {
      schema: {
        tags: ['Helpers'],
        summary: 'Pegara todos os regimes',
        response: {
          200: z
            .object({
              id: z.number(),
              name: z.string(),
            })
            .array(),
        },
      },
    },
    async (request, reply) => {
      return reply.send(
        await prisma.regimeFiscal.findMany({
          select: {
            id: true,
            name: true,
          },
        }),
      )
    },
  )
}
