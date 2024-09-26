import type { FastifyInstance } from 'fastify'

import { createLojaController } from './loja/create-loja-controller'
import { deleteLojaController } from './loja/delete-loja-controllers'
import { getLojaController } from './loja/get-loja-controller'
import { listLojasController } from './loja/list-loja-controller'
import { updateLojaController } from './loja/update-loja-controller'

export async function loja(app: FastifyInstance) {
  app.register(createLojaController)
  app.register(deleteLojaController)
  app.register(listLojasController)
  app.register(updateLojaController)
  app.register(getLojaController)
}
