import type { FastifyInstance } from 'fastify'

import { createSubCategoryController } from './sub-categoria/create-subcategoria-controller'
import { deleteSubCategoryController } from './sub-categoria/delete-subcategoria-controller'
import { getByNameSubCategoryController } from './sub-categoria/getbyname-subcategoria-controller'
import { listSubCategoryController } from './sub-categoria/list-subcategoria-controller'
import { updateSubCategoryController } from './sub-categoria/update-subcategoria-controller'

export async function subcategory(app: FastifyInstance) {
  app.register(createSubCategoryController)
  app.register(deleteSubCategoryController)
  app.register(getByNameSubCategoryController)
  app.register(updateSubCategoryController)
  app.register(listSubCategoryController)
}
