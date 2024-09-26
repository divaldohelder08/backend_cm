import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function createArtigoProdutoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/product',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1, 'Nome do artigo é obrigatório'),
            imagem: z.string().nullable().optional(),
            categoriaId: z.number().nullable().optional(),
            subCategoriaId: z.number().nullable().optional(),
            unidadeId: z.number().nullable().optional(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-artigo')
        const { categoriaId, subCategoriaId, ...rest } = request.body
        categoriaId && (await Prisma.categoria.findError(categoriaId))
        subCategoriaId && (await Prisma.subCategoria.findError(subCategoriaId))

        reply.send(
          await prisma.artigo.create({
            data: {
              familia: 'PRODUCT',
              subCategoriaId,
              categoriaId,
              ...rest,
            },
          }),
        )
      },
    )
}
