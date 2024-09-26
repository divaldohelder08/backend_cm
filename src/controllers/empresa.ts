import type { FastifyInstance } from 'fastify'

import { findEmpresaController } from './empresa/find-empresa-controller'
import { upsertEmpresaController } from './empresa/upsert-empresa-controller'

export async function empresa(app: FastifyInstance) {
  app.register(findEmpresaController)
  app.register(upsertEmpresaController)
}
