import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'

export async function listArtigoFamiliaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:familia',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            familia: z.enum(['PRODUCT', 'SERVICE']),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-artigo')
        const {
          params: { familia },
        } = request

        switch (familia) {
          case 'PRODUCT':
            reply.send(
              await prisma.artigo.findMany({
                where: {
                  familia: 'PRODUCT',
                },
              }),
            )
            break
          case 'SERVICE':
            reply.send(
              await prisma.artigo.findMany({
                where: {
                  familia: 'SERVICE',
                },
                select: {
                  id: true,
                  name: true,
                  imagem: true,
                  estado: true,
                  createdAt: true,
                },
              }),
            )
            break
          default:
            break
        }
      },
    )
}
