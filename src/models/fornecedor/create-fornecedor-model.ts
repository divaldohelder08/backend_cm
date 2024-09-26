import { prisma } from '@/lib/prisma'
import type { entidade, fornecedor as forner } from '@/types/global'

import { createEntidadeModel } from '../entidade/create-entidade-model'

interface fornecedor {
  fornecedor: forner
}
interface props extends fornecedor {
  entidadeId: number
}
interface props1 extends fornecedor {
  entidade: entidade
}

export async function createFornecedorAndEntidadeModel({
  fornecedor,
  entidade,
}: props1) {
  const { id } = await createEntidadeModel({ entidade })
  await createFornecedorModel({ fornecedor, entidadeId: id })
}

export async function createFornecedorModel({
  entidadeId,
  fornecedor: { ...rest },
}: props) {
  return await prisma.fornecedor.create({
    data: {
      entidadeId,
      ...rest,
    },
  })
}
