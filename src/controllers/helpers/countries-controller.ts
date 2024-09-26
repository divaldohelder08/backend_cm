import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function listCountriesControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/countries',
    {
      schema: {
        tags: ['Helpers'],
        summary: 'Pegara todos os Países',
        response: {
          200: z.object({
            countries: z
              .object({
                id: z.number(),
                name: z.string(),
                code: z.string(),
                provincias: z
                  .object({
                    id: z.number(),
                    name: z.string(),
                  })
                  .array(),
              })
              .array(),
          }),
        },
      },
    },
    async (request, reply) => {
      const countries = await prisma.country.findMany({
        include: {
          provincias: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          id: 6,
        },
      })
      return reply.send({ countries })
    },
  )
}
