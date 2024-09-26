import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'

export async function createArtigoServiceController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/service',
      {
        schema: {
          tags: ['Artigo', 'Serviço'],
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1, 'Nome do artigo é obrigatório'),
            imagem: z.string().nullable().optional(),
            categoriaId: z.number().nullable().optional(),
            subCategoriaId: z.number().nullable().optional(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        const data = request.body
        await request.verifyPermission('create-artigo')
        reply.send(
          await prisma.artigo.create({
            data: {
              familia: 'SERVICE',
              ...data,
            },
          }),
        )
      },
    )
}
