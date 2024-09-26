import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function getArtigoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/find/:id',
      {
        schema: {
          tags: ['Artigo'],
          summary: 'Pesquisar artigo por id',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-artigo')
        const { id } = request.params
        await Prisma.artigo.findError(id)
        return reply.status(200).send(
          await prisma.artigo.findUnique({
            where: {
              id,
            },
            select: {
              name: true,
              imagem: true,
              categoriaId: true,
              subCategoriaId: true,
              unidadeId: true,
            },
          }),
        )
      },
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/find',
      {
        schema: {
          tags: ['Artigo'],
          summary: 'Pesquisar artigo por id',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            name: z.string(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('read-artigo')
        const { name } = request.query
        return reply.status(200).send(
          await prisma.artigo.findMany({
            where: {
              name: {
                contains: name,
                mode: 'insensitive', // Torna a busca case-insensitive
              },
              PrecoArtigo: {
                none: {},
              },
            },
            select: {
              id: true,
              name: true,
              imagem: true,
              familia: true,
            },
          }),
        )
      },
    )
}
