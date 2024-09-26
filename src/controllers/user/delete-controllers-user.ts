import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { deleteUserModel } from '@/models/user/delete-user-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function deleteControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/:id',
      {
        schema: {
          tags: ['Members'],
          summary: 'Delete a member',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          response: {
            204: z.string(),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        await request.verifyPermission('delete-user')
        await Prisma.user.findError(id)
        await deleteUserModel(id)
        return reply.status(204).send('Usuario deletado com sucesso')
      },
    )
}
