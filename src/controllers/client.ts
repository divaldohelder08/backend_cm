import type { FastifyInstance } from 'fastify'

import { createClienteAndFornecedorController } from './client/create-client-and-fornecedor-controller'
import { createClienteWithFornecedorController } from './client/create-client-with-fornecedorId-controller'
import { deleteClienteController } from './client/delete-cliente-controller'
import { getClientController } from './client/get-client-controller'
import { listClienteController } from './client/list-client-controller'
import { transformClientToFornecedor } from './client/transform-client-to-fornecedor'
import { updateClienteController } from './client/update-cliente-controller'

export async function cliente(app: FastifyInstance) {
  app.register(createClienteWithFornecedorController)
  app.register(createClienteAndFornecedorController)
  app.register(transformClientToFornecedor)
  app.register(deleteClienteController)
  app.register(getClientController)
  app.register(listClienteController)
  app.register(updateClienteController)
}
