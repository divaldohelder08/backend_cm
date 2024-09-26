import type { FastifyInstance } from 'fastify'

import { createRoleController } from './role/create-role-controller'
import { deleteRoleController } from './role/delete-role-controller'
import { getRoleController } from './role/get-role-controller'
import { listRoleController } from './role/list-role-controller'
import { restRoleController } from './role/reset-role'
import { updateRoleController } from './role/update-role-controller'
import { updateRolePermissionController } from './role/update-role-permission-controller'

export async function role(app: FastifyInstance) {
  app.register(createRoleController)
  app.register(deleteRoleController)
  app.register(getRoleController)
  app.register(listRoleController)
  app.register(restRoleController)
  app.register(updateRoleController)
  app.register(updateRolePermissionController)
}
