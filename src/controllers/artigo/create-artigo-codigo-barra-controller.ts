import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { CreateArtigoCodigoBarra } from '@/models/artigo/create-artigo-codigo-barra-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function CreateArtigoCodigoBarraController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/:id/barra',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            codigoBarra: z.string(),
            forncedorId: z.number().nullable(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        request.verifyPermission('create-codigo-barra')
        const {
          params: { id: artigoId },
          body: { codigoBarra, forncedorId },
        } = request
        forncedorId && (await Prisma.fornecedor.findError(forncedorId))
        reply
          .status(200)
          .send(
            await CreateArtigoCodigoBarra(artigoId, forncedorId, codigoBarra),
          )
      },
    )
}
