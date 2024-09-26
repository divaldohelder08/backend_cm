import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function listTaxasController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/taxas',
    {
      schema: {
        tags: ['Helpers', 'taxas'],
        summary: 'Listar taxas',
        security: [{ bearerAuth: [] }],
        response: {
          200: z
            .object({
              id: z.string(),
              value: z.number(),
              name: z.string(),
            })
            .array(),
        },
      },
    },
    async (_, reply) => {
      const result = await prisma.impostTax.findMany({
        select: {
          id: true,
          value: true,
          impost: {
            select: {
              name: true,
            },
          },
        },
      })
      return reply.status(200).send(
        result.map((item) => {
          return {
            id: item.id.toString(),
            value: item.value,
            name: item.impost.name,
          }
        }),
      )
    },
  )
}
