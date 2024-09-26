import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function listProvinciasControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/provincias',
    {
      schema: {
        tags: ['Helpers', 'Provincia'],
        summary: 'Listar todas as provincias',
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
        await prisma.provincia.findMany({
          where: {
            countryCode: 'AO',
          },
        }),
      )
    },
  )
}
