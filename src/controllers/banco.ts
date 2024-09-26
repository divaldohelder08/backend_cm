import type { FastifyInstance } from 'fastify'

import { createBanco } from './rh/banco/create-banco'
import { deleteBanco } from './rh/banco/delete-banco'
import { getBanco } from './rh/banco/get-banco'
import { listBanco } from './rh/banco/list-banco'
import { updateBanco } from './rh/banco/update-carreira'

export async function banco(app: FastifyInstance) {
  app.register(listBanco)
  app.register(getBanco)
  app.register(deleteBanco)
  app.register(createBanco)
  app.register(updateBanco)
}
