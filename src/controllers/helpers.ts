import type { FastifyInstance } from 'fastify'

import { listCategoriesControllers } from './helpers/categories-controller'
import { listCountriesControllers } from './helpers/countries-controller'
import { listIsencaoController } from './helpers/isecao-controller'
import { listMultSubAccountsControllers } from './helpers/mult-sub-conta-controller'
import { listProvinciasControllers } from './helpers/provinces-controller'
import { listRegimesControllers } from './helpers/regime-controller'
import { listSubAccountsControllers } from './helpers/sub-conta-controller'
import { listTaxasController } from './helpers/taxas-controller copy'

export async function helpers(app: FastifyInstance) {
  app.register(listCountriesControllers)
  app.register(listProvinciasControllers)
  app.register(listSubAccountsControllers)
  app.register(listCategoriesControllers)
  app.register(listRegimesControllers)
  app.register(listIsencaoController)
  app.register(listTaxasController)
  app.register(listMultSubAccountsControllers)
}
