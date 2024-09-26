import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'

export async function updateUserController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '',
      {
        schema: {
          tags: ['User', 'Perfil'],
          summary: 'usuário',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
          response: {
            200: z.string(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-user')
        const id = await request.getCurrentUserId()
        const { name, email } = request.body

        const userWithSameEmail = await prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (userWithSameEmail) {
          throw new BadRequestError('Já existe um usuário com o mesmo e-mail.')
        }
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            name,
            email,
          },
        })

        return reply.code(200).send('Usuário atualizado com sucesso')
      },
    )
}
