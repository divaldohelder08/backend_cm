import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'

export async function listArtigoFamiliaAreaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/:familia/:area',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            hasPrice: z.coerce.boolean().default(false),
          }),
          params: z.object({
            familia: z.enum(['PRODUCT', 'SERVICE']),
            area: z.enum([
              'COMERCIO_GERAL',
              'RESTAURANTE',
              'HOTELARIA',
              'OFICINA',
            ]),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-artigo')
        const {
          params: { familia, area },
          query: { hasPrice },
        } = request

        if (familia === 'PRODUCT') {
          if (hasPrice) {
            const result = await prisma.precoArtigo.findMany({
              include: {
                artigo: {
                  include: {
                    categoria: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    subCategoria: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                armazem: true,
                loja: true,
              },
              where: {
                artigo: {
                  familia: 'PRODUCT',
                },
                area,
              },
            })
            const a = result.map((e) => {
              const {
                artigo,
                armazem,
                loja,
                id,
                artigoId,
                controloStock,
                stockMin,
                stockMax,
                preco,
                precoImposto,
              } = e
              return {
                id,
                artigoId,
                controloStock,
                stockMin,
                stockMax,
                preco,
                precoImposto,
                categoria: artigo?.categoria,
                subCategoria: artigo?.subCategoria,
                name: artigo?.name,
                imagem: artigo?.imagem,
                armazem,
                loja,
              }
            })
            return reply.send(a)
          } else {
            return reply.send(
              await prisma.artigo.findMany({
                include: {
                  categoria: true,
                  subCategoria: true,
                },
                where: {
                  familia: 'PRODUCT',
                  PrecoArtigo: {
                    none: {},
                  },
                },
              }),
            )
          }
        } else if (familia === 'SERVICE') {
          if (hasPrice) {
            return reply.send(
              await prisma.precoArtigo.findMany({
                include: {
                  artigo: {
                    include: {
                      categoria: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                      subCategoria: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
                where: {
                  artigo: {
                    familia: 'SERVICE',
                  },
                  area,
                },
              }),
            )
          } else {
            return reply.send(
              await prisma.artigo.findMany({
                where: {
                  familia: 'SERVICE',
                },
              }),
            )
          }
        }
      },
    )
}
