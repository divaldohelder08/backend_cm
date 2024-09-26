import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { listUnityModel } from '@/models/unidade/list-unity-model'
import { auth } from '@/routes/middlewares/auth'

export async function listUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '',
      {
        schema: {
          tags: ['unidade'],
          security: [{ bearerAuth: [] }],
          response: {
            200: z
              .object({
                id: z.number(),
                name: z.string(),
                artigos: z.number(),
              })
              .array(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('list-untiy')
        return reply.status(200).send(await listUnityModel())
      },
    )
}
