import type { FastifyInstance } from 'fastify'

import { listPermissionsController } from './permissions/list-permissions-controller'

export async function permission(app: FastifyInstance) {
  app.register(listPermissionsController)
}
