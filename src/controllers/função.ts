import type { FastifyInstance } from 'fastify'

import { createFuncao } from './rh/funcao/create-funcao'
import { deleteFuncao } from './rh/funcao/delete-funcao'
import { getFuncao } from './rh/funcao/get-funcao'
import { listFuncoes } from './rh/funcao/list-funcao'
import { updateFuncao } from './rh/funcao/update-funcao'

export async function funcao(app: FastifyInstance) {
  app.register(createFuncao)
  app.register(deleteFuncao)
  app.register(listFuncoes)
  app.register(updateFuncao)
  app.register(getFuncao)
}
