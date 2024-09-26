import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

// cSpell:disable
export async function createPriceForServicoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:area/SERVICE/:servicoId',
      {
        schema: {
          tags: ['Serviço'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            servicoId: z.coerce.number(),
            area: z.enum([
              'COMERCIO_GERAL',
              'RESTAURANTE',
              'HOTELARIA',
              'OFICINA',
            ]),
          }),
          body: z.object({
            preco: z.number(),
            precoImposto: z.number(),
            reterFonte: z.boolean(),
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
          params: { servicoId, area },
          body: { reterFonte, isencaoId, taxaImpostoId, ...rest },
        } = request

        // Valida a existência do serviço
        await Prisma.artigo.findError(servicoId)

        // Verificação do campo obrigatório 'reterFonte'
        if (!reterFonte) {
          throw new BadRequestError('O campo reter_fonte é obrigatório.')
        }

        // Verificação entre taxa de imposto e isenção
        if ((taxaImpostoId && isencaoId) || (!taxaImpostoId && !isencaoId)) {
          throw new BadRequestError(
            'Escolha entre isenção ou taxa de imposto, apenas um deles deve ser selecionado.',
          )
        }

        taxaImpostoId && (await Prisma.taxa.findError(taxaImpostoId))
        isencaoId && (await Prisma.isencao.findError(isencaoId))

        await prisma.precoArtigo.create({
          data: {
            artigoId: servicoId,
            taxaImpostoId,
            isencaoId,
            area,
            ...rest,
          },
        })

        // Resposta final
        reply.send('Preço do serviço criado com sucesso')
      },
    )
}
