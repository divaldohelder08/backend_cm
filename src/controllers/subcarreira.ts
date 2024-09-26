import type { FastifyInstance } from 'fastify'

import { createSubCarreira } from './rh/subcarreira/create-subcarreira'
import { deleteSubCarreira } from './rh/subcarreira/delete-subcarreira'
import { getSubCarreira } from './rh/subcarreira/get-subcarreira'
import { listarSubcarreira } from './rh/subcarreira/list-subcarreira'
import { updateSubCarreira } from './rh/subcarreira/update-subcarreira'

export async function subCarreira(app: FastifyInstance) {
  app.register(listarSubcarreira)
  app.register(deleteSubCarreira)
  app.register(createSubCarreira)
  app.register(getSubCarreira)
  app.register(updateSubCarreira)
}
