import type { FastifyInstance } from 'fastify'

import { createCarreira } from './rh/carreira/create-carreira'
import { deleteCarreira } from './rh/carreira/delete-carreira'
import { getCarreira } from './rh/carreira/get-carreira'
import { listCarreiras } from './rh/carreira/list-carreiras'
import { updateCarreira } from './rh/carreira/update-carreira'

export async function carreira(app: FastifyInstance) {
  app.register(listCarreiras)
  app.register(getCarreira)
  app.register(deleteCarreira)
  app.register(createCarreira)
  app.register(updateCarreira)
}
