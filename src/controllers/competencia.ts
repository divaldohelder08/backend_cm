import type { FastifyInstance } from 'fastify'

import { createCompetencia } from './rh/competencia/create-competencia'
import { deleteCompetencia } from './rh/competencia/delete-competencia'
import { getCompetencia } from './rh/competencia/get-competencia'
import { listCompetencia } from './rh/competencia/list-competencia'
import { updateCompetencia } from './rh/competencia/update-competencia'

export async function competencia(app: FastifyInstance) {
  app.register(createCompetencia)
  app.register(deleteCompetencia)
  app.register(listCompetencia)
  app.register(getCompetencia)
  app.register(updateCompetencia)
}
