import type { FastifyInstance } from 'fastify'

import { createCategoria } from './rh/categoria/create-categoria'
import { deleteCategoria } from './rh/categoria/delete-categoria'
import { getCategoria } from './rh/categoria/get-categoria'
import { listCategoria } from './rh/categoria/list-categoria'
import { updateCategoria } from './rh/categoria/update-categoria'

export async function categoria(app: FastifyInstance) {
  app.register(createCategoria)
  app.register(listCategoria)
  app.register(getCategoria)
  app.register(deleteCategoria)
  app.register(updateCategoria)
}
