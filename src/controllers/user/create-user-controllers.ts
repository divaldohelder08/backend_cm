import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { createUserModel } from '@/models/user/create-user-model'
import { auth } from '@/routes/middlewares/auth'

export async function createControllersUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Members'],
          summary: 'Create new member',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
          }),
          response: {
            200: z.object({
              id: z.number(),
              name: z.string(),
              email: z.string().email(),
              avatar: z.string().nullable(),
              password: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-user')
        const { name, email, password: pws } = request.body

        const userWithSameEmail = await prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (userWithSameEmail) {
          throw new BadRequestError('Já existe um usuário com o mesmo e-mail.')
        }
        const password = await bcrypt.hash(pws, 6)
        const user = await createUserModel({
          name,
          email,
          password,
        })
        return reply.code(201).send({
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          password: user.password,
        })
      },
    )
}
