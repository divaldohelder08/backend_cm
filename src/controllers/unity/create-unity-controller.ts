import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createUnityModels } from '@/models/unidade/create-unity-model'
import { auth } from '@/routes/middlewares/auth'

export async function createUnityController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['unidade'],
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
          }),
          response: {
            201: z.object({
              id: z.number(),
              name: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-unidade')
        const { name } = request.body
        const unity = await createUnityModels(name)
        return reply.code(201).send(unity)
      },
    )
}
