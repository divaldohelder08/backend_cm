import type { FastifyInstance } from 'fastify'

import { listFormacoes } from './rh/formacao/list-formacao'

export async function formacao(app: FastifyInstance) {
  app.register(listFormacoes)
}
