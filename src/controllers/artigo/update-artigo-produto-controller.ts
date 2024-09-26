import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateArtigoProdutoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:id/:familia',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
            familia: z.enum(['PRODUCT', 'SERVICE']),
          }),
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
        await request.verifyPermission('update-artigo')
        const {
          params: { id, familia },
          body: { categoriaId, subCategoriaId, unidadeId, ...rest },
        } = request

        categoriaId && (await Prisma.categoria.findError(categoriaId))
        subCategoriaId && (await Prisma.subCategoria.findError(subCategoriaId))
        unidadeId && (await Prisma.unidade.findError(unidadeId))

        reply.send(
          await prisma.artigo.update({
            where: {
              id,
            },
            data: {
              familia,
              unidadeId,
              categoriaId,
              subCategoriaId,
              ...rest,
            },
          }),
        )
      },
    )
}
