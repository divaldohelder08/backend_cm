import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { CreatePrecoArtigoModel } from '@/models/precoArtigo/create-precoArtigo-model'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

import { GetByIdTaxaDeImposto } from '../tax-de-imposto/get-by-id-taxa-de-imposto-controller'

export async function CreatePrecoArtigoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/create',
      {
        schema: {
          tags: ['Preco Artigo'],
          security: [{ bearerAuth: [] }],
          body: z.object({
            controlo_stock: z.boolean().optional().nullable(),
            area: z.enum([
              'COMERCIO_GERAL',
              'RESTAURANTE',
              'HOTELARIA',
              'OFICINA',
            ]),
            stockMin: z.number().optional().nullable(),
            stockMax: z.number().optional().nullable(),
            preco: z.number(),
            idTaxaImposto: z.number(),
            calcPreco: z.number(),
            armazemId: z.number().optional().nullable(),
            lojaId: z.number().optional().nullable(),
            isencaoId: z.number().optional().nullable(),
            artigoId: z.number().optional(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (response, reply) => {
        response.verifyPermission('create-preco-artigo')
        try {
          const {
            area,
            preco,
            armazemId,
            controloStock,
            idTaxaImposto,
            isencaoId,
            lojaId,
            stockMax,
            stockMin,
            calcPreco,
            artigoId,
          } = response.body
          let precoImposto
          const taxaDeImpost = await GetByIdTaxaDeImposto(idTaxaImposto)
          if (taxaDeImpost) precoImposto = preco + (preco * taxaDeImpost) / 100
          console.log()

          if (calcPreco !== precoImposto) {
            return new BadRequestError(
              'O preco de Imposto são diferentes.' +
                precoImposto +
                '---' +
                calcPreco +
                '-----' +
                taxaDeImpost,
            )
          }

          const createPrecoArtigo = await CreatePrecoArtigoModel({
            area,
            artigoId,
            preco,
            armazemId,
            stockMin,
            stockMax,
            controloStock,
            idTaxaImposto,
            isencaoId,
            lojaId,
            precoImposto,
          })
          return reply.status(200).send({
            data: createPrecoArtigo,
            message: 'Preço criado com sucesso',
          })
        } catch (error: any) {
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
