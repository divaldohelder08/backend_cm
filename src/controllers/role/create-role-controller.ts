import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { createRoleModel } from '@/models/role/create-role-model'
import { auth } from '@/routes/middlewares/auth'

export async function createRoleController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Roles'],
          summary: 'criar uma nova role',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string().optional(),
          }),
          response: {
            204: z.object({
              role: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string().optional().nullable(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-role')
        const { name, description } = request.body
        const roleWithSameName = await prisma.role.findUnique({
          where: {
            name,
          },
        })
        if (roleWithSameName)
          throw new BadRequestError('Já existe uma role com esse  nome.')

        const role = await createRoleModel({ name, description })
        return reply.code(201).send({ role })
      },
    )
}
