import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { auth } from '@/routes/middlewares/auth'
import { Prisma } from '@/utils/prisma-throws'

export async function upsertEmpresaController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['Empresa'],
          summary: 'upsert empresa',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            type: z.enum(['SEDE', 'FILIAL']),
            avatar: z.string().optional().nullable(),
            countryId: z.number(),
            provinciaId: z.number(),
            endereco: z.string().optional(),
            cidade: z.string().optional(),
            telefone: z.string(),
            telefone1: z.string().optional(),
            email: z.string().email('Email inválido').optional(),
            nif: z.string(),
            alvara: z.string().optional(),
            regimeId: z.number(),
            indicadorFactura: z.string(),
            valorInicialRetencaoFonte: z.number(),
            retencaoFonteServico: z.boolean(),
            percentagemRetencaoFonte: z.number(),
            comercioGeral: z.boolean(),
            restaurante: z.boolean(),
            hotelaria: z.boolean(),
            oficina: z.boolean(),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('upsert-empresa')

        const { countryId, provinciaId, regimeId, ...data } = request.body

        const country = await prisma.country.findFirst({
          where: {
            id: countryId,
            provincias: {
              some: {
                id: provinciaId,
              },
            },
          },
          select: {
            id: true,
            code: true,
            provincias: {
              select: {
                id: true,
              },
            },
          },
        })

        if (!country)
          throw new BadRequestError('País ou província não encontrada')
        await Prisma.regime.findError(regimeId)

        const organization = await prisma.empresa.upsert({
          where: { id: 1 },
          create: {
            countryId: country.id,
            provinciaId: country.provincias[0].id,
            regimeId,
            ...data,
          },
          update: {
            countryId: country.id,
            provinciaId: country.provincias[0].id,
            ...data,
          },
        })

        return reply.code(201).send(organization)
      },
    )
}
