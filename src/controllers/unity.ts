import type { FastifyInstance } from 'fastify'

import { createUnityController } from './unity/create-unity-controller'
import { deleteUnityController } from './unity/delete-unity-controller'
import { getByNameUnityController } from './unity/getbyname-unity-controller'
import { listUnityController } from './unity/list-unity-controller'
import { updateUnityController } from './unity/update-unity-controller'

export async function unity(app: FastifyInstance) {
  app.register(createUnityController)
  app.register(deleteUnityController)
  app.register(getByNameUnityController)
  app.register(updateUnityController)
  app.register(listUnityController)
}
