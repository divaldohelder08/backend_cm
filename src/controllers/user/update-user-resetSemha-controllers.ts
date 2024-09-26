import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { updateUserModel } from '@/models/user/update-user-role-model'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function updateUserReseatSenhaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:id',
      {
        schema: {
          tags: ['Members'],
          summary: 'atualizar roles de um usuário',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            id: z.number(),
            value: z.boolean(),
          }),
          response: {
            204: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-user')
        const { id } = request.params
        const { id: roleId, value } = request.body

        await Prisma.user.findError(id)
        return reply.status(201).send(
          await updateUserModel({
            userId: id,
            value,
            id: roleId,
          }),
        )
      },
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:id/status',
      {
        schema: {
          tags: ['Members'],
          summary: 'atualizar status de um usuário',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            value: z.boolean(),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-user-activity')
        const { id } = request.params
        const { value } = request.body

        const user = (await Prisma.user.findError(id)) as {
          isSuperAdmin: boolean
        }
        console.log(user.isSuperAdmin)
        if (user.isSuperAdmin)
          throw new BadRequestError('Não é possível desativar um super admin')
        await prisma.user.update({
          where: { id },
          data: {
            active: value,
          },
        })
        return reply.status(201).send()
      },
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/:id/edit',
      {
        schema: {
          tags: ['Members'],
          summary: 'Editar email e nome de utilizador',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.coerce.number(),
          }),
          body: z.object({
            name: z.string(),
            email: z.string(),
          }),
          response: {
            201: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('update-user')
        const { id } = request.params
        const { name, email } = request.body

        await prisma.user.update({
          where: { id },
          data: {
            name,
            email,
          },
        })
        return reply.status(201).send()
      },
    )
}
