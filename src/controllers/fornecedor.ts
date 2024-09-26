import type { FastifyInstance } from 'fastify'

import { createFornecedorAndEntidadeController } from './fornecedor/create-fornecedor-and-entidade-controller'
import { createFornecedorWithFornecedorController } from './fornecedor/create-fornecedor-with-entidadeId-controller'
import { deleteFornecedorController } from './fornecedor/delete-fornecedor-controller'
import { getFornecedorController } from './fornecedor/get-fornecedor-controller'
import { listFornecedoresController } from './fornecedor/list-fornecedor-controller'
import { transformFornecedorToClient } from './fornecedor/transform-fornecedor-to-client'
import { updateFornecedorController } from './fornecedor/update-fornecedor-controller'

export async function fornecedor(app: FastifyInstance) {
  app.register(updateFornecedorController)
  app.register(createFornecedorAndEntidadeController)
  app.register(createFornecedorWithFornecedorController)
  app.register(deleteFornecedorController)
  app.register(getFornecedorController)
  app.register(listFornecedoresController)
  app.register(transformFornecedorToClient)
}
