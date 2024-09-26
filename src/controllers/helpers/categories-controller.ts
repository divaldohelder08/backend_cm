import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function listCategoriesControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/categories',
    {
      schema: {
        tags: ['Helpers'],
        summary: 'Pegara todos os Países',
        response: {
          200: z
            .object({
              id: z.number(),
              name: z.string(),
              subCategoria: z
                .object({
                  id: z.number(),
                  name: z.string(),
                })
                .array(),
            })
            .array(),
        },
      },
    },
    async (request, reply) => {
      return reply.send(
        await prisma.categoria.findMany({
          include: {
            subCategoria: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
      )
    },
  )
}
