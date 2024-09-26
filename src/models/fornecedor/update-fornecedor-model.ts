import type { TipoEntidade, TipoIdentificacao } from '@prisma/client'

import { prisma } from '@/lib/prisma'

interface props {
  data: {
    countryId: number
    telefone: string
    telefone2: string | null
    whatsapp: string | null
    endereco: string | null
    email: string | null
    subContaId: number
    entidade: {
      id: number
      name: string
      tipo: TipoEntidade
      identificacao: string
      tipodeIdentificacao: TipoIdentificacao
    }
  }
  id: number
}

export async function updateFornecedorModel({
  data: {
    entidade: { id: entidadeId, ...ent },
    ...rest
  },
  id,
}: props) {
  await prisma.entidadeTerceiros.update({
    data: {
      ...ent,
    },
    where: {
      id: entidadeId,
    },
  })
  return await prisma.fornecedor.update({
    data: {
      ...rest,
    },
    where: {
      id,
    },
  })
}
