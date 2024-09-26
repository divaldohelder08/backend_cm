import type { FastifyInstance } from 'fastify'

import { createArmazemController } from './armazem/create-armazem-controller'
import { deleteArmazemController } from './armazem/delete-armazem-controllers'
import { getArmazemController } from './armazem/get-armazem-controller'
import { listArmazemController } from './armazem/list-armazem-controller'
import { updateArmazemController } from './armazem/update-armazem-controller'

export async function armazem(app: FastifyInstance) {
  app.register(createArmazemController)
  app.register(deleteArmazemController)
  app.register(listArmazemController)
  app.register(updateArmazemController)
  app.register(getArmazemController)
}
