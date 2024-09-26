import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { getError } from '@/utils/error-utils'
import { getErrorMessage } from '@/utils/get-error-message'

import { BadRequestError } from './bad-request-error'
import { UnauthorizedError } from './unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Erro de validação',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError || error instanceof Error) {
    const { message } = getError(error)
    reply.status(400).send({
      message,
    })
  }

  if (error instanceof UnauthorizedError) {
    reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  // send error to some observability platform
  reply.status(500).send({ message: getErrorMessage(error) })
}
