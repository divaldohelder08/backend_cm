import type { FastifyInstance } from 'fastify'

import { CreateArtigoCodigoBarraController } from './artigo/create-artigo-codigo-barra-controller'
// import { createArtigoController } from './artigo/create-artigo-controller'
import { createArtigoProdutoController } from './artigo/create-artigo-produto-controller'
import { createArtigoServiceController } from './artigo/create-artigo-serviço-controller'
import { createPriceForServicoController } from './artigo/create-price-for-area-service-controller'
import { createPriceForArtigoController } from './artigo/create-price-for-product-controller'
import { DeleteArtigoController } from './artigo/delete-artigo-controller'
import { getArtigoController } from './artigo/get-artigo-controller'
import { listArtigoFamiliaAreaController } from './artigo/list-artigo-area-familia-controller'
import { ListArtigoController } from './artigo/list-artigo-controller'
import { listArtigoFamiliaController } from './artigo/list-artigo-familia-controller'
import { RemoveCodigoBarraController } from './artigo/remove-codigo-barra-controller'
import { updateArtigoProdutoController } from './artigo/update-artigo-produto-controller'
// import { UpdateArtigoController } from './artigo/update-artigo-controller'

export async function artigo(app: FastifyInstance) {
  // app.register(createArtigoController)
  app.register(createArtigoProdutoController)
  app.register(createArtigoServiceController)
  app.register(DeleteArtigoController)
  app.register(ListArtigoController)
  app.register(updateArtigoProdutoController)
  app.register(RemoveCodigoBarraController)
  app.register(CreateArtigoCodigoBarraController)
  app.register(listArtigoFamiliaController)
  app.register(listArtigoFamiliaAreaController)
  app.register(getArtigoController)
  app.register(createPriceForArtigoController)
  app.register(createPriceForServicoController)
}
