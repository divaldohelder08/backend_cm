import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { UnauthorizedError } from '@/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'

export async function reset(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/reset',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Reset password from token code',
        body: z.object({
          code: z.string(),
          password: z.string().min(6),
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
      const { code, password } = request.body

      const tokenFromCode = await prisma.token.findUnique({
        where: { code },
      })

      if (!tokenFromCode) throw new UnauthorizedError()

      const passwordHash = await hash(password, 6)

      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: tokenFromCode.userId,
          },
          data: {
            password: passwordHash,
          },
        }),
        prisma.token.delete({
          where: {
            code,
          },
        }),
      ])

      const user = await prisma.user.findUnique({
        where: {
          id: tokenFromCode.userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      })

      const token = await reply.jwtSign(
        {
          sub: user?.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      console.log(token)

      if (!user) throw new BadRequestError('Aconteceu algum tipo de error')
      return reply.status(201).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token,
      })
    },
  )
}
