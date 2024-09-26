import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function listMultSubAccountsControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/mult-sub-accounts',
    {
      schema: {
        tags: ['Helpers'],
        summary: 'Listar todas as sub contas',
        response: {
          200: z
            .object({
              name: z.string(),
              id: z.number(),
              numero: z.string(),
              conta: z.array(
                z.object({
                  id: z.number(),
                  name: z.string(),
                  numero: z.number(),
                  subConta: z.array(
                    z.object({
                      id: z.number(),
                      description: z.string(),
                      numero: z.string(),
                    }),
                  ),
                }),
              ),
            })
            .array(),
        },
      },
    },
    async (request, reply) => {
      return reply.send(
        await prisma.classe.findMany({
          select: {
            id: true,
            numero: true,
            name: true,
            conta: {
              select: {
                id: true,
                name: true,
                numero: true,
                subConta: {
                  select: {
                    id: true,
                    numero: true,
                    description: true,
                  },
                },
              },
            },
          },
        }),
      )
    },
  )
}
