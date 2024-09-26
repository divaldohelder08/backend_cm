import type { FastifyInstance } from 'fastify'

import { createCategoryController } from './categoria/create-category-controller'
import { deleteCategoryController } from './categoria/delete-category-controller'
import { getByNameCategoryController } from './categoria/getbyname-category-controller'
import { listCategoryController } from './categoria/list-category-controller'
import { updateCategoryController } from './categoria/update-category-controller'

export async function category(app: FastifyInstance) {
  app.register(createCategoryController)
  app.register(deleteCategoryController)
  app.register(getByNameCategoryController)
  app.register(updateCategoryController)
  app.register(listCategoryController)
}
