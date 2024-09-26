import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { createProductAreaPrice } from '@/models/artigo/create-artigo-price-for-area'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

// cSpell:disable
export async function createPriceForArtigoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:area/PRODUCT/:artigoId',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            artigoId: z.coerce.number(),
            area: z.enum([
              'COMERCIO_GERAL',
              'RESTAURANTE',
              'HOTELARIA',
              'OFICINA',
            ]),
          }),
          body: z.object({
            lojaId: z.number(),
            armazemId: z.number(),
            preco: z.number(),
            precoImposto: z.number(),
            controloStock: z.boolean(),
            stockMax: z.number().optional(),
            stockMin: z.number().optional(),
            taxaImpostoId: z.number().nullable(),
            isencaoId: z.number().nullable(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        request.verifyPermission('create-price')

        const {
          params: { artigoId, area },
          body: {
            stockMax,
            stockMin,
            controloStock,
            taxaImpostoId,
            isencaoId,
            ...rest
          },
        } = request

        // Valida a existência do artigo
        await Prisma.artigo.findError(artigoId)

        // Verificação de controle de estoque
        const resolvedStockMax = controloStock ? stockMax ?? null : null
        const resolvedStockMin = controloStock ? stockMin ?? null : null

        if (
          controloStock &&
          (resolvedStockMax === null || resolvedStockMin === null)
        ) {
          throw new BadRequestError(
            'Os valores de stock são obrigatórios quando o controlo de estoque está ativado.',
          )
        }

        // Verificação entre taxa de imposto e isenção
        if ((taxaImpostoId && isencaoId) || (!taxaImpostoId && !isencaoId)) {
          throw new BadRequestError(
            'Escolha entre isenção ou taxa de imposto, apenas um deles deve ser selecionado.',
          )
        }

        // Chamada única para criação do preço
        await createProductAreaPrice({
          artigo: {
            artigoId,
            area,
            controloStock,
            stockMax: resolvedStockMax,
            stockMin: resolvedStockMin,
            taxaImpostoId,
            isencaoId,
            ...rest,
          },
        })

        // Resposta final
        reply.send('Preço criado com sucesso')
      },
    )
}
