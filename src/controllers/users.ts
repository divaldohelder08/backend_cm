import type { FastifyInstance } from 'fastify'

import { createControllersUser } from './user/create-user-controllers'
import { deleteControllersUser } from './user/delete-controllers-user'
import { getControllersUser } from './user/get-user-controller'
import { getUserRolesController } from './user/get-user-roles-controller'
import { listControllersUser } from './user/list-user-controllers'
import { updateUser } from './user/update-controllers-user'
import { updateUserController } from './user/update-profile-controller'

export async function users(app: FastifyInstance) {
  app.register(updateUserController)
  app.register(createControllersUser)
  app.register(listControllersUser)
  app.register(deleteControllersUser)
  app.register(updateUser)
  app.register(getUserRolesController)
  app.register(getControllersUser)
}
