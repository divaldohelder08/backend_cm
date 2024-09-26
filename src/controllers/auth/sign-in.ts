import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { seed } from 'prisma/seed'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
export async function auth(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with e-mail & password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.number(),
              name: z.string(),
              email: z.string(),
              avatar: z.string().nullable(),
            }),
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })
      if (!userFromEmail) throw new BadRequestError('Credencias invalidas.')
    
      const isPasswordValid = await bcrypt.compare(
        password,
        userFromEmail.password,
      )
    console.log(userFromEmail)

      if (!isPasswordValid) throw new BadRequestError('Credencias invalidas.')
      if (!userFromEmail.active)
        throw new BadRequestError('A sua conta está inativa.')

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )
      console.log({
        user: {
          id: userFromEmail.id,
          name: userFromEmail.name,
          email: userFromEmail.email,
          avatar: userFromEmail.avatar,
        },
        token,
      })
      return reply.status(201).send({
        user: {
          id: userFromEmail.id,
          name: userFromEmail.name,
          email: userFromEmail.email,
          avatar: userFromEmail.avatar,
        },
        token,
      })
    },
  ).addHook('preHandler', async (request) => {
    // verificar se a base de dados está vazia
    await seed()
   
  })

}
