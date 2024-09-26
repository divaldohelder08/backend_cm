import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { listArtigoModel } from '@/models/artigo/list-artigo-model'
import { auth } from '@/routes/middlewares/auth'

export async function ListArtigoController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      's',
      {
        schema: {
          tags: ['Artigo'],
          security: [{ bearerAuth: [] }],
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-artigo')
        const listArtigos = await listArtigoModel()
        return reply.status(200).send(listArtigos)
      },
    )
}
