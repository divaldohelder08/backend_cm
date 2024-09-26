import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getByNameUnityModel } from '@/models/unidade/getbyname-unity-model'
import { auth } from '@/routes/middlewares/auth'

export async function getByNameUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/getUnity',
      {
        schema: {
          tags: ['unidade'],
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
        const { name } = request.query
        const unity = await getByNameUnityModel(name)
        return reply.status(200).send(unity)
      },
    )
}
